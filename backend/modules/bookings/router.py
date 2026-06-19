from fastapi import APIRouter

from . import service
from .models import BookingCreate

router = APIRouter(prefix="/bookings", tags=["bookings"])


@router.post("")
async def create_booking(payload: BookingCreate):
    booking = await service.create_booking(payload)
    return {
        "id": booking.id,
        "status": booking.status.value,
        "workshop_slug": booking.workshop_slug,
        "price_tier": booking.price_tier,
        "amount": booking.amount,
        "currency": booking.currency,
    }
