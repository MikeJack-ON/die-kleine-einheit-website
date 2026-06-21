import asyncio
import logging

import resend

from .provider import EmailProvider

logger = logging.getLogger("app")


class ResendEmailProvider(EmailProvider):
    def __init__(self, api_key: str, sender: str):
        self._sender = sender
        self._enabled = bool(api_key)
        if api_key:
            resend.api_key = api_key

    async def send(self, *, to: str, subject: str, text: str, html: str) -> dict:
        if not self._enabled:
            logger.warning("Resend not configured — email to %s skipped.", to)
            return {"status": "skipped", "reason": "resend_not_configured"}

        params = {
            "from": self._sender,
            "to": [to],
            "subject": subject,
            "text": text,
            "html": html,
        }
        try:
            result = await asyncio.to_thread(resend.Emails.send, params)
            return {"status": "sent", "id": result.get("id")}
        except Exception as e:
            logger.error("Resend send failed: %s", e)
            return {"status": "failed", "reason": str(e)}
