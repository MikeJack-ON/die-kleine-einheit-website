from fastapi import APIRouter

from . import service

router = APIRouter(prefix="/catalog", tags=["catalog"])


@router.get("/workshops/{slug}")
async def get_workshop(slug: str):
    workshop = await service.get_workshop(slug)
    price = service.resolve_active_price(workshop)
    regular = next((p for p in workshop.prices if p.tier == "regular"), None)
    return {
        "slug": workshop.slug,
        "title": workshop.title,
        "brand": workshop.brand,
        "currency": workshop.currency,
        "session": workshop.session.model_dump(),
        "active_price": {"tier": price.tier, "amount": price.amount, "label": price.label},
        "regular_price": regular.amount if regular else None,
        "early_cutoff": workshop.early_cutoff,
    }
