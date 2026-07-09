"""
Common utility functions
"""

from datetime import datetime
from typing import Any, Dict


def get_timestamp() -> str:
    """Get current UTC timestamp in ISO format"""
    return datetime.utcnow().isoformat()


def format_response(success: bool, message: str, data: Any = None) -> Dict:
    """Format API response consistently"""
    response = {"success": success, "message": message, "timestamp": get_timestamp()}

    if data is not None:
        response["data"] = data

    return response


def format_error(error: str, detail: str = None, code: str = None) -> Dict:
    """Format error response consistently"""
    error_response = {"error": error, "timestamp": get_timestamp()}

    if detail:
        error_response["detail"] = detail
    if code:
        error_response["code"] = code

    return error_response
