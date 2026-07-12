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

    # Frontend URL for CORS (deployed frontend)
    FRONTEND_URL: str = ""

    # Supabase Configuration (will be added when integrating)
    SUPABASE_URL: str = ""
    SUPABASE_KEY: str = ""
    SUPABASE_JWT_SECRET: str = ""

    # Mesh API Configuration
    MESH_API_KEY: str = ""
    MESH_MODEL: str = "openai/gpt-4o"
    MESH_API_URL: str = "https://api.meshapi.ai/v1/chat/completions"

    class Config:
        env_file = ".env"
        case_sensitive = True
    
    @property
    def cors_origins(self) -> List[str]:
        """Get CORS origins including environment-based frontend URL"""
        origins = [
            "http://localhost:5173",  # Local Vite dev
            "http://localhost:3000",  # Alternative local port
        ]
        
        # Add deployed frontend URL if configured
        if self.FRONTEND_URL:
            origins.append(self.FRONTEND_URL)
        
        return origins


# Create global settings instance
settings = Settings()
