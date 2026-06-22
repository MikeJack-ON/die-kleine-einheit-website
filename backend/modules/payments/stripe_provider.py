import logging

import stripe
from emergentintegrations.payments.stripe.checkout import (
    CheckoutSessionResponse,
    StripeCheckout,
)

from .provider import PaymentProvider

logger = logging.getLogger("app")

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

        # PayPal is enabled on the live Stripe account. The shared Emergent test
        # proxy (sk_test_emergent) does not support it, so it is added only for
        # real keys to avoid breaking the preview checkout.
        is_emergent_proxy = "sk_test_emergent" in self._api_key
        key_prefix = self._api_key[:8]
        payment_method_types = ["card"]
        if not is_emergent_proxy:
            payment_method_types.append("paypal")

        logger.info(
            "stripe.checkout.create requested key_prefix=%s emergent_proxy=%s "
            "requested_pmt=%s mode=payment currency=%s",
            key_prefix, is_emergent_proxy, payment_method_types, currency,
        )

        session = stripe.checkout.Session.create(
            payment_method_types=payment_method_types,
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
        logger.info(
            "stripe.checkout.create accepted session=%s mode=%s currency=%s "
            "accepted_pmt=%s automatic_pm=%s",
            session.id,
            getattr(session, "mode", None),
            getattr(session, "currency", None),
            getattr(session, "payment_method_types", None),
            getattr(session, "automatic_payment_methods", None),
        )
        return CheckoutSessionResponse(url=session.url, session_id=session.id)

    async def get_status(self, session_id: str):
        return await self._client.get_checkout_status(session_id)

    async def handle_webhook(self, body: bytes, signature: str):
        return await self._client.handle_webhook(body, signature)
