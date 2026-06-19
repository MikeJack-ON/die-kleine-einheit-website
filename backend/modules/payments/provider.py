from abc import ABC, abstractmethod

# Stripe stays fully behind this seam. The booking flow and notifications never
# import Stripe directly — they depend on this interface. Implemented in Sprint 3.


class PaymentProvider(ABC):
    @abstractmethod
    async def create_checkout_session(self, *, booking, success_url: str, cancel_url: str) -> str:
        """Create a hosted checkout session for a booking and return its redirect URL."""

    @abstractmethod
    def parse_webhook_event(self, payload: bytes, signature: str) -> dict:
        """Verify the provider signature and return a normalized event."""
