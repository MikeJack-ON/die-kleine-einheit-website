from fastapi import APIRouter

from modules.bookings.router import router as bookings_router
from modules.catalog.router import router as catalog_router
from modules.legal.router import router as legal_router
from modules.notifications.router import router as notifications_router
from modules.payments.router import router as payments_router

api_router = APIRouter(prefix="/api")


@api_router.get("/health", tags=["system"])
async def health():
    return {"status": "ok", "service": "die-kleine-einheit", "release": "1.0.0"}


for _router in (
    catalog_router,
    bookings_router,
    payments_router,
    notifications_router,
    legal_router,
):
    api_router.include_router(_router)
