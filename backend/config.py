"""
Configuration settings for PathPilot Backend
Using Pydantic Settings for environment variable management
"""

from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    """Application settings"""

    # App Configuration
    APP_NAME: str = "PathPilot API"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = False

    # API Configuration
    API_PREFIX: str = "/api"
    HOST: str = "0.0.0.0"
    PORT: int = 8000

    # CORS Origins
    CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://localhost:3000",
    ]

    # Supabase Configuration (will be added when integrating)
    SUPABASE_URL: str = ""
    SUPABASE_KEY: str = ""
    SUPABASE_JWT_SECRET: str = ""

    # Mesh API Configuration (will be added when integrating)
    MESH_API_KEY: str = ""
    MESH_API_URL: str = ""

    class Config:
        env_file = ".env"
        case_sensitive = True


# Create global settings instance
settings = Settings()
