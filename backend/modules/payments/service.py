import logging

from typing import Optional

from core.config import settings
from core.database import get_db
from core.errors import AppError
from core.models import utcnow_iso
from modules.bookings import service as bookings_service
from modules.bookings.models import BookingStatus

from .models import CheckoutRequest, PaymentTransaction
from .stripe_provider import StripePaymentProvider

logger = logging.getLogger("app")

TX = "payment_transactions"
WORKSHOP_META_ID = "koerperintelligenz-2026-07-04"


async def ensure_indexes():
    db = get_db()
    await db[TX].create_index("session_id", unique=True)
    await db[TX].create_index("booking_id")


def _api_key() -> str:
    key = settings.optional("STRIPE_API_KEY")
    if not key:
        raise AppError("Zahlung ist derzeit nicht verfügbar.", status_code=503, code="stripe_not_configured")
    return key


def _webhook_url(base_url: str) -> str:
    return f"{base_url.rstrip('/')}/api/webhook/stripe"


def _provider(base_url: str) -> StripePaymentProvider:
    return StripePaymentProvider(api_key=_api_key(), webhook_url=_webhook_url(base_url))


async def create_checkout(data: CheckoutRequest, base_url: str) -> dict:
    # 1. Booking domain creates the draft booking and owns price resolution.
    booking = await bookings_service.create_booking(data)

    # 2. Amount/currency are server-authoritative (from the booking, never the client).
    amount = float(booking.amount)
    currency = booking.currency

    origin = data.origin_url.rstrip("/")
    success_url = f"{origin}/danke?session_id={{CHECKOUT_SESSION_ID}}"
    cancel_url = f"{origin}/#buchung"

    metadata = {
        "booking_id": booking.id,
        "workshop": WORKSHOP_META_ID,
        "name": booking.name,
        "email": booking.email,
        "phone": booking.phone or "",
        "photo_video": "true" if booking.consent.photo_video else "false",
    }

    provider = _provider(base_url)
    session = await provider.create_checkout_session(
        amount=amount,
        currency=currency,
        success_url=success_url,
        cancel_url=cancel_url,
        metadata=metadata,
    )

    # 3. Record the transaction BEFORE the user reaches Stripe.
    tx = PaymentTransaction(
        booking_id=booking.id,
        session_id=session.session_id,
        amount=amount,
        currency=currency,
        email=booking.email,
        metadata=metadata,
        status="initiated",
        payment_status="pending",
    )
    db = get_db()
    await db[TX].insert_one(tx.to_mongo())

    # 4. Booking domain advances its own state: draft -> pending.
    await bookings_service.transition(
        booking.id, BookingStatus.pending, extra={"stripe_session_id": session.session_id}
    )

    return {"url": session.url, "session_id": session.session_id, "booking_id": booking.id}


async def _apply_paid(session_id: str) -> Optional[str]:
    """Idempotently mark a transaction paid and advance the booking. Returns booking_id if newly paid."""
    db = get_db()
    now = utcnow_iso()
    # Atomically claim the paid transition (guards against webhook + poll races).
    tx = await db[TX].find_one_and_update(
        {"session_id": session_id, "payment_status": {"$ne": "paid"}},
        {"$set": {"payment_status": "paid", "status": "complete", "updated_at": now}},
    )
    if not tx:
        return None  # already processed or unknown

    booking_id = tx.get("booking_id")
    if booking_id:
        try:
            await bookings_service.transition(booking_id, BookingStatus.paid, extra={"paid_at": now})
        except AppError:
            pass  # booking already advanced
    # Sprint 4: a booking "paid" event is consumed here by the notifications domain.
    return booking_id


async def get_status(session_id: str, base_url: str) -> dict:
    db = get_db()
    tx = await db[TX].find_one({"session_id": session_id})
    if not tx:
        raise AppError("Zahlung nicht gefunden.", status_code=404, code="transaction_not_found")

    provider = _provider(base_url)
    result = await provider.get_status(session_id)

    if result.payment_status == "paid":
        await _apply_paid(session_id)

    return {
        "session_id": session_id,
        "status": result.status,
        "payment_status": result.payment_status,
        "amount_total": result.amount_total,
        "currency": result.currency,
        "booking_id": tx.get("booking_id"),
    }


async def handle_webhook(body: bytes, signature: str, base_url: str) -> dict:
    provider = _provider(base_url)
    event = await provider.handle_webhook(body, signature)
    if getattr(event, "payment_status", None) == "paid" and getattr(event, "session_id", None):
        await _apply_paid(event.session_id)
    return {"received": True}
