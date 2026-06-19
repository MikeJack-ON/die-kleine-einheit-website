import os
from pathlib import Path
from dotenv import load_dotenv

ROOT_DIR = Path(__file__).resolve().parent.parent
load_dotenv(ROOT_DIR / ".env")


class Settings:
    def __init__(self) -> None:
        self.mongo_url: str = os.environ["MONGO_URL"]
        self.db_name: str = os.environ["DB_NAME"]
        self.cors_origins = os.environ.get("CORS_ORIGINS", "*").split(",")

    def require(self, key: str) -> str:
        value = os.environ.get(key)
        if not value:
            raise RuntimeError(f"Missing required environment variable: {key}")
        return value

    def optional(self, key: str, default: str = "") -> str:
        return os.environ.get(key, default)


settings = Settings()
