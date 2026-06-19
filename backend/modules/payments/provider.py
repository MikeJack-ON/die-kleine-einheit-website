from abc import ABC, abstractmethod

# Stripe stays fully behind this seam. The booking flow and notifications never
# import Stripe directly — they depend on this interface.


class PaymentProvider(ABC):
    @abstractmethod
    async def create_checkout_session(self, *, amount: float, currency: str, success_url: str, cancel_url: str, metadata: dict):
        """Create a hosted checkout session and return an object with `url` and `session_id`."""

    @abstractmethod
    async def get_status(self, session_id: str):
        """Return the current status of a checkout session."""

    @abstractmethod
    async def handle_webhook(self, body: bytes, signature: str):
        """Verify the provider signature and return a normalized event."""
