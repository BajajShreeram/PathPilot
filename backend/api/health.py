"""
Health check endpoint
"""

from fastapi import APIRouter
from datetime import datetime

router = APIRouter()


@router.get("/health")
async def health_check():
    """
    Health check endpoint to verify API is running
    """
    return {
        "status": "healthy",
        "service": "PathPilot API",
        "timestamp": datetime.utcnow().isoformat(),
        "version": "1.0.0",
    }
