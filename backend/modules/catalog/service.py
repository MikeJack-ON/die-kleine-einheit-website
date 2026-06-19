from datetime import date

from core.database import get_db
from core.errors import AppError

from .models import Workshop, WorkshopPrice, WorkshopSession

COLLECTION = "workshops"

DEFAULT_WORKSHOP = Workshop(
    slug="koerperintelligenz-2026-07-04",
    title="Körperintelligenz",
    brand="Die kleine Einheit",
    currency="eur",
    session=WorkshopSession(
        date="Sa, 4. Juli 2026",
        time="10–14 Uhr",
        location="Naturplatz Draußen Zuhause, Schledehausen",
    ),
    prices=[
        WorkshopPrice(tier="early", amount=49, label="Frühbucher bis 26.6."),
        WorkshopPrice(tier="regular", amount=79, label="Regulär"),
    ],
    early_cutoff="2026-06-26",
    status="published",
)


async def ensure_indexes():
    db = get_db()
    await db[COLLECTION].create_index("slug", unique=True)


async def seed_default_workshop():
    db = get_db()
    await db[COLLECTION].update_one(
        {"slug": DEFAULT_WORKSHOP.slug},
        {"$setOnInsert": DEFAULT_WORKSHOP.to_mongo()},
        upsert=True,
    )


async def get_workshop(slug: str) -> Workshop:
    db = get_db()
    doc = await db[COLLECTION].find_one({"slug": slug})
    if not doc:
        raise AppError("Workshop nicht gefunden.", status_code=404, code="workshop_not_found")
    return Workshop.from_mongo(doc)


def resolve_active_price(workshop: Workshop) -> WorkshopPrice:
    today = date.today()
    cutoff = date.fromisoformat(workshop.early_cutoff)
    tier = "early" if today <= cutoff else "regular"
    return next((p for p in workshop.prices if p.tier == tier), workshop.prices[-1])
