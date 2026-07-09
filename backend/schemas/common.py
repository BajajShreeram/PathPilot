"""
Common response schemas for API endpoints
"""

from pydantic import BaseModel
from typing import Any, Optional


class HealthResponse(BaseModel):
    """Health check response"""

    status: str
    service: str
    timestamp: str
    version: str


class ErrorResponse(BaseModel):
    """Error response"""

    error: str
    detail: Optional[str] = None
    code: Optional[str] = None


class SuccessResponse(BaseModel):
    """Generic success response"""

    success: bool
    message: str
    data: Optional[Any] = None
