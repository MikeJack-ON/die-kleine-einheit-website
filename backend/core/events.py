import logging

from core.database import get_db
from core.models import utcnow_iso

logger = logging.getLogger("app")

EVENT_LOG = "event_log"


class EventType:
    BookingCreated = "BookingCreated"
    CheckoutStarted = "CheckoutStarted"
    CheckoutCancelled = "CheckoutCancelled"
    PaymentConfirmed = "PaymentConfirmed"
    ConfirmationEmailSent = "ConfirmationEmailSent"
    WhatsAppPrepared = "WhatsAppPrepared"
    WebhookReceived = "WebhookReceived"


class EventBus:
    """In-process pub/sub. Domains publish events; consumers subscribe.
    Every published event is also persisted to the structured event log."""

    def __init__(self):
        self._subscribers = {}

    def subscribe(self, event_type: str, handler):
        self._subscribers.setdefault(event_type, []).append(handler)

    async def publish(self, event_type: str, data: dict | None = None):
        data = data or {}
        await self._persist(event_type, data)
        for handler in list(self._subscribers.get(event_type, [])):
            try:
                await handler(data)
            except Exception:
                logger.exception("Event handler failed for %s", event_type)

    async def _persist(self, event_type: str, data: dict):
        try:
            db = get_db()
            await db[EVENT_LOG].insert_one(
                {"type": event_type, "data": data, "at": utcnow_iso()}
            )
        except Exception:
            logger.exception("Failed to persist event %s", event_type)


event_bus = EventBus()


async def ensure_indexes():
    db = get_db()
    await db[EVENT_LOG].create_index("type")
    await db[EVENT_LOG].create_index("at")
