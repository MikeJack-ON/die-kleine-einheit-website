import logging

from core.config import settings
from core.database import get_db
from core.errors import AppError
from core.events import EventType, event_bus
from core.models import utcnow_iso
from modules.bookings import service as bookings_service
from modules.bookings.models import BookingStatus

from .resend_provider import ResendEmailProvider
from .templates.confirmation import render_confirmation_email, render_whatsapp_message
from .whatsapp_provider import WhatsAppClickToChatProvider

logger = logging.getLogger("app")

NOTIFICATIONS_LOG = "notifications_log"


def _email_provider() -> ResendEmailProvider:
    return ResendEmailProvider(
        api_key=settings.optional("RESEND_API_KEY"),
        sender=settings.optional("SENDER_EMAIL", "info@die-kleine-einheit.de"),
    )


def _whatsapp_provider() -> WhatsAppClickToChatProvider:
    return WhatsAppClickToChatProvider(
        business_number=settings.optional("WHATSAPP_BUSINESS_NUMBER", "491792589296")
    )


async def ensure_indexes():
    db = get_db()
    await db[NOTIFICATIONS_LOG].create_index("booking_id")


async def _log(booking_id: str, channel: str, status: str, provider_id=None, detail=None):
    db = get_db()
    await db[NOTIFICATIONS_LOG].insert_one(
        {
            "booking_id": booking_id,
            "channel": channel,
            "status": status,
            "provider_id": provider_id,
            "detail": detail,
            "at": utcnow_iso(),
        }
    )


async def handle_payment_confirmed(payload: dict):
    """Event consumer. Reacts to a booking 'PaymentConfirmed' event.
    Contains NO payment logic and NO Stripe dependency."""
    booking_id = payload.get("booking_id")
    if not booking_id:
        return

    booking = await bookings_service.get_booking(booking_id)

    # --- Email (Resend) ---
    subject, text, html = render_confirmation_email(booking.name)
    result = await _email_provider().send(to=booking.email, subject=subject, text=text, html=html)
    await _log(booking_id, "email", result.get("status"), result.get("id"), result.get("reason"))
    if result.get("status") == "sent":
        await event_bus.publish(
            EventType.ConfirmationEmailSent, {"booking_id": booking_id, "email": booking.email}
        )

    # --- WhatsApp (click-to-chat link) ---
    if booking.phone:
        message = render_whatsapp_message(booking.name)
        link = _whatsapp_provider().prepare(phone=booking.phone, message=message)
        await _log(booking_id, "whatsapp", "prepared", detail=link)
        await event_bus.publish(
            EventType.WhatsAppPrepared, {"booking_id": booking_id, "link": link}
        )

    # --- Finalize booking lifecycle: paid -> confirmed ---
    try:
        await bookings_service.transition(booking_id, BookingStatus.confirmed)
    except AppError:
        pass


def register_handlers():
    event_bus.subscribe(EventType.PaymentConfirmed, handle_payment_confirmed)
