import stripe
from emergentintegrations.payments.stripe.checkout import (
    CheckoutSessionResponse,
    StripeCheckout,
)

from .provider import PaymentProvider

EMERGENT_PROXY_BASE = "https://integrations.emergentagent.com/stripe"


class StripePaymentProvider(PaymentProvider):
    """First concrete PaymentProvider. Encapsulates all Stripe specifics."""

    def __init__(self, api_key: str, webhook_url: str, webhook_secret: str | None = None):
        self._api_key = api_key
        self._webhook_url = webhook_url
        # Reused for status polling and webhook handling (unchanged behaviour).
        self._client = StripeCheckout(
            api_key=api_key,
            webhook_url=webhook_url,
            webhook_secret=webhook_secret or None,
        )

    async def create_checkout_session(
        self,
        *,
        amount: float,
        currency: str,
        success_url: str,
        cancel_url: str,
        metadata: dict,
        product_name: str = "Payment",
        product_description: str | None = None,
    ):
        """Raw Stripe session creation so the line item shows a dynamic product
        name + description (the bundled wrapper hardcodes the name to "Payment").
        """
        stripe.api_key = self._api_key
        if "sk_test_emergent" in self._api_key:
            stripe.api_base = EMERGENT_PROXY_BASE

        merged_metadata = {**(metadata or {})}
        if self._webhook_url:
            merged_metadata["webhook_url"] = self._webhook_url

        product_data = {"name": product_name}
        if product_description:
            product_data["description"] = product_description

        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=[
                {
                    "price_data": {
                        "currency": currency,
                        "product_data": product_data,
                        "unit_amount": int(round(amount * 100)),
                    },
                    "quantity": 1,
                }
            ],
            mode="payment",
            success_url=success_url,
            cancel_url=cancel_url,
            metadata=merged_metadata,
        )
        return CheckoutSessionResponse(url=session.url, session_id=session.id)

    async def get_status(self, session_id: str):
        return await self._client.get_checkout_status(session_id)

    async def handle_webhook(self, body: bytes, signature: str):
        return await self._client.handle_webhook(body, signature)
