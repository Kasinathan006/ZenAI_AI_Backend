from pydantic_settings import BaseSettings
from functools import lru_cache
from typing import Optional, List


class Settings(BaseSettings):
    PROJECT_NAME: str = "ZenAI Backend"
    DEBUG: bool = True

    # Core API keys
    OPENAI_API_KEY: Optional[str] = None
    GROQ_API_KEY: Optional[str] = None
    NOTION_API_KEY: Optional[str] = None

    # Integration IDs
    NOTION_DATABASE_ID: Optional[str] = None

    # Server config
    BACKEND_CORS_ORIGINS: List[str] = ["*"]

    # Database
    DATABASE_URL: Optional[str] = None

    class Config:
        env_file = ".env"
        extra = "ignore"  # 👈 allows extra .env fields safely


@lru_cache()
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
