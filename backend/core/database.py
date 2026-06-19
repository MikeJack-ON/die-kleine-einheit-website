from motor.motor_asyncio import AsyncIOMotorClient

from core.config import settings

db_client = AsyncIOMotorClient(settings.mongo_url)
db = db_client[settings.db_name]


def get_db():
    return db
