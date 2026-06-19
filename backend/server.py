import logging

from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from core.api import api_router
from core.config import settings
from core.database import db_client
from core.errors import register_exception_handlers

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)


def create_app() -> FastAPI:
    app = FastAPI(title="Die kleine Einheit — API", version="1.0.0")

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    register_exception_handlers(app)
    app.include_router(api_router)

    @app.on_event("startup")
    async def _startup():
        from modules.catalog import service as catalog_service
        from modules.bookings import service as bookings_service
        from modules.payments import service as payments_service

        await catalog_service.ensure_indexes()
        await catalog_service.seed_default_workshop()
        await bookings_service.ensure_indexes()
        await payments_service.ensure_indexes()

    @app.on_event("shutdown")
    async def _shutdown():
        db_client.close()

    return app


app = create_app()
