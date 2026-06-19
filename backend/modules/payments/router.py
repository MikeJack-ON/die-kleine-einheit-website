from fastapi import APIRouter, Request

from . import service
from .models import CheckoutRequest

router = APIRouter(prefix="/payments", tags=["payments"])
webhook_router = APIRouter(prefix="/webhook", tags=["payments"])


@router.post("/checkout")
async def create_checkout(payload: CheckoutRequest, request: Request):
    return await service.create_checkout(payload, base_url=str(request.base_url))


@router.get("/status/{session_id}")
async def checkout_status(session_id: str, request: Request):
    return await service.get_status(session_id, base_url=str(request.base_url))


@webhook_router.post("/stripe")
async def stripe_webhook(request: Request):
    body = await request.body()
    signature = request.headers.get("Stripe-Signature", "")
    return await service.handle_webhook(body, signature, base_url=str(request.base_url))
