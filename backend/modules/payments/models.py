from typing import Dict, Optional

from pydantic import BaseModel, Field

from core.models import BaseDocument, utcnow_iso
from modules.bookings.models import BookingCreate


class CheckoutRequest(BookingCreate):
    origin_url: str


class PaymentTransaction(BaseDocument):
    booking_id: Optional[str] = None
    session_id: str
    amount: float
    currency: str
    email: Optional[str] = None
    metadata: Dict[str, str] = Field(default_factory=dict)
    status: str = "initiated"  # initiated | complete | expired
    payment_status: str = "pending"  # pending | paid | failed
    created_at: str = Field(default_factory=utcnow_iso)
    updated_at: str = Field(default_factory=utcnow_iso)
