from typing import List

from pydantic import BaseModel

from core.models import BaseDocument


class WorkshopPrice(BaseModel):
    tier: str
    amount: int
    label: str


class WorkshopSession(BaseModel):
    date: str
    time: str
    location: str


class Workshop(BaseDocument):
    slug: str
    title: str
    brand: str
    currency: str = "eur"
    session: WorkshopSession
    prices: List[WorkshopPrice]
    early_cutoff: str
    status: str = "published"
