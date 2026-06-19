from emergentintegrations.payments.stripe.checkout import (
    CheckoutSessionRequest,
    StripeCheckout,
)

from .provider import PaymentProvider


class StripePaymentProvider(PaymentProvider):
    """First concrete PaymentProvider. Encapsulates all Stripe specifics."""

    def __init__(self, api_key: str, webhook_url: str):
        self._client = StripeCheckout(api_key=api_key, webhook_url=webhook_url)

    async def create_checkout_session(self, *, amount: float, currency: str, success_url: str, cancel_url: str, metadata: dict):
        request = CheckoutSessionRequest(
            amount=amount,
            currency=currency,
            success_url=success_url,
            cancel_url=cancel_url,
            metadata=metadata,
        )
        return await self._client.create_checkout_session(request)

    async def get_status(self, session_id: str):
        return await self._client.get_checkout_status(session_id)

    async def handle_webhook(self, body: bytes, signature: str):
        return await self._client.handle_webhook(body, signature)
