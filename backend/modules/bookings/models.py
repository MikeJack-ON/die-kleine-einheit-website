from enum import Enum
from typing import List, Optional

from pydantic import BaseModel, EmailStr, Field, field_validator

from core.models import BaseDocument, utcnow_iso


class BookingStatus(str, Enum):
    draft = "draft"
    pending = "pending"
    paid = "paid"
    confirmed = "confirmed"
    cancelled = "cancelled"


class Consent(BaseModel):
    terms: bool = False
    privacy: bool = False
    photo_video: bool = False


class StatusEvent(BaseModel):
    status: BookingStatus
    at: str


class Booking(BaseDocument):
    workshop_slug: str
    name: str
    email: EmailStr
    phone: Optional[str] = None
    consent: Consent
    status: BookingStatus = BookingStatus.draft
    price_tier: str
    amount: int
    currency: str = "eur"
    stripe_session_id: Optional[str] = None
    created_at: str = Field(default_factory=utcnow_iso)
    updated_at: str = Field(default_factory=utcnow_iso)
    paid_at: Optional[str] = None
    status_history: List[StatusEvent] = Field(default_factory=list)


class BookingCreate(BaseModel):
    workshop_slug: str
    name: str
    email: EmailStr
    phone: Optional[str] = None
    consent_terms: bool
    consent_privacy: bool
    consent_photo_video: bool = False

    @field_validator("name")
    @classmethod
    def _name_not_empty(cls, v: str) -> str:
        if not v or not v.strip():
            raise ValueError("Name ist erforderlich.")
        return v.strip()

    @field_validator("consent_terms")
    @classmethod
    def _terms_required(cls, v: bool) -> bool:
        if v is not True:
            raise ValueError("Die Teilnahmebedingungen müssen akzeptiert werden.")
        return v

    @field_validator("consent_privacy")
    @classmethod
    def _privacy_required(cls, v: bool) -> bool:
        if v is not True:
            raise ValueError("Die Datenschutzerklärung muss akzeptiert werden.")
        return v
