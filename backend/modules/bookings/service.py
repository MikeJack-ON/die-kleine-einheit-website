from typing import Optional

from bson import ObjectId
from bson.errors import InvalidId

from core.database import get_db
from core.errors import AppError
from core.events import EventType, event_bus
from core.models import utcnow_iso
from modules.catalog import service as catalog_service

from .models import Booking, BookingCreate, BookingStatus, Consent, StatusEvent

COLLECTION = "bookings"

# Booking lifecycle: Draft -> Pending -> Paid -> Confirmed -> Cancelled
ALLOWED_TRANSITIONS = {
    BookingStatus.draft: {BookingStatus.pending, BookingStatus.cancelled},
    BookingStatus.pending: {BookingStatus.paid, BookingStatus.cancelled},
    BookingStatus.paid: {BookingStatus.confirmed, BookingStatus.cancelled},
    BookingStatus.confirmed: {BookingStatus.cancelled},
    BookingStatus.cancelled: set(),
}


async def ensure_indexes():
    db = get_db()
    await db[COLLECTION].create_index("email")
    await db[COLLECTION].create_index("status")
    await db[COLLECTION].create_index("created_at")
    await db[COLLECTION].create_index("stripe_session_id", sparse=True)


def _oid(booking_id: str) -> ObjectId:
    try:
        return ObjectId(booking_id)
    except (InvalidId, TypeError):
        raise AppError("Buchung nicht gefunden.", status_code=404, code="booking_not_found")


async def create_booking(data: BookingCreate) -> Booking:
    workshop = await catalog_service.get_workshop(data.workshop_slug)
    price = catalog_service.resolve_active_price(workshop)
    now = utcnow_iso()

    booking = Booking(
        workshop_slug=workshop.slug,
        name=data.name,
        email=data.email,
        phone=(data.phone or None),
        consent=Consent(
            terms=data.consent_terms,
            privacy=data.consent_privacy,
            photo_video=data.consent_photo_video,
        ),
        status=BookingStatus.draft,
        price_tier=price.tier,
        amount=price.amount,
        currency=workshop.currency,
        created_at=now,
        updated_at=now,
        status_history=[StatusEvent(status=BookingStatus.draft, at=now)],
    )

    db = get_db()
    result = await db[COLLECTION].insert_one(booking.to_mongo())
    booking.id = str(result.inserted_id)
    await event_bus.publish(
        EventType.BookingCreated,
        {"booking_id": booking.id, "workshop_slug": booking.workshop_slug, "amount": booking.amount},
    )
    return booking


async def get_booking(booking_id: str) -> Booking:
    db = get_db()
    doc = await db[COLLECTION].find_one({"_id": _oid(booking_id)})
    if not doc:
        raise AppError("Buchung nicht gefunden.", status_code=404, code="booking_not_found")
    return Booking.from_mongo(doc)


async def transition(booking_id: str, new_status: BookingStatus, extra: Optional[dict] = None) -> Booking:
    booking = await get_booking(booking_id)
    if new_status not in ALLOWED_TRANSITIONS[booking.status]:
        raise AppError(
            f"Ungültiger Statuswechsel: {booking.status.value} → {new_status.value}",
            status_code=409,
            code="invalid_transition",
        )
    now = utcnow_iso()
    update = {"status": new_status.value, "updated_at": now}
    if extra:
        update.update(extra)

    db = get_db()
    await db[COLLECTION].update_one(
        {"_id": _oid(booking_id)},
        {
            "$set": update,
            "$push": {"status_history": StatusEvent(status=new_status, at=now).model_dump(mode="json")},
        },
    )
    return await get_booking(booking_id)
