from abc import ABC, abstractmethod


class EmailProvider(ABC):
    @abstractmethod
    async def send(self, *, to: str, subject: str, text: str, html: str) -> dict:
        """Send a transactional email. Returns a normalized result dict."""


class MessagingProvider(ABC):
    @abstractmethod
    def prepare(self, *, phone: str, message: str) -> str:
        """Prepare an outbound message and return a deliverable artifact (e.g. a deep link)."""
