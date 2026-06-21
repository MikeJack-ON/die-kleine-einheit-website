import urllib.parse

from .provider import MessagingProvider


class WhatsAppClickToChatProvider(MessagingProvider):
    """Release 1.0 WhatsApp provider: builds a click-to-chat (wa.me) deep link.
    No API send yet — a future Twilio/Meta provider implements MessagingProvider
    without any change to the Booking or Payment domains."""

    def __init__(self, business_number: str):
        # digits only, no '+' or spaces, for wa.me
        self._number = "".join(ch for ch in business_number if ch.isdigit())

    def prepare(self, *, phone: str, message: str) -> str:
        return f"https://wa.me/{self._number}?text={urllib.parse.quote(message)}"
