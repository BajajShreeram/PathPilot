"""
Mesh API Service
Handles AI requests through Mesh API gateway
Supports multiple AI models (GPT, Claude, Gemini, etc.)
"""

import json

import httpx
from typing import Any, Dict
from config import settings

SYSTEM_PROMPT = (
    "You are PathPilot, a personalized AI student mentor. Use the student's "
    "profile to give practical guidance about careers, entrance exams, courses, "
    "universities, scholarships, study plans, deadlines, and next actions. Do not "
    "guarantee admission or invent facts."
)


class MeshAPIError(Exception):
    """A safe, categorized error returned by the Mesh integration."""

    def __init__(self, code: str, message: str, status_code: int = 502):
        super().__init__(message)
        self.code = code
        self.message = message
        self.status_code = status_code


class MeshAPIService:
    """
    Service for interacting with Mesh API
    Model-agnostic design for flexibility
    """

    def __init__(self):
        self.api_key = settings.MESH_API_KEY
        self.api_url = settings.MESH_API_URL

    async def generate_completion(
        self,
        message: str,
        profile: Dict[str, Any],
        model: str | None = None,
        max_tokens: int = 1000,
        temperature: float = 0.7,
    ) -> str:
        """
        Generate an AI mentor response through Mesh API.
        """
        if not self.api_key.strip():
            raise MeshAPIError(
                "missing_key",
                "Mesh API key is not configured on the server.",
                503,
            )

        payload = {
            "model": model or settings.MESH_MODEL,
            "messages": [
                {"role": "system", "content": SYSTEM_PROMPT},
                {
                    "role": "user",
                    "content": (
                        "Student profile:\n"
                        f"{json.dumps(profile, ensure_ascii=False)}\n\n"
                        f"Student question:\n{message}"
                    ),
                },
            ],
            "max_tokens": max_tokens,
            "temperature": temperature,
        }

        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.post(
                    self.api_url,
                    headers={
                        "Authorization": f"Bearer {self.api_key}",
                        "Content-Type": "application/json",
                    },
                    json=payload,
                )
        except httpx.TimeoutException as exc:
            raise MeshAPIError("timeout", "Mesh API request timed out.", 504) from exc
        except httpx.RequestError as exc:
            raise MeshAPIError(
                "network_error", "Could not connect to the Mesh API.", 502
            ) from exc

        if response.status_code in (401, 403):
            raise MeshAPIError("invalid_key", "The Mesh API key is invalid.", 502)
        if response.status_code == 429:
            raise MeshAPIError("rate_limit", "Mesh API rate limit reached.", 429)

        if response.is_error:
            response_text = response.text.lower()
            if response.status_code == 402 or any(
                term in response_text
                for term in ("insufficient credit", "insufficient balance", "out of credit")
            ):
                raise MeshAPIError(
                    "insufficient_credits", "The Mesh account has insufficient credits.", 402
                )
            raise MeshAPIError(
                "mesh_error", "Mesh API could not complete the request.", 502
            )

        try:
            data = response.json()
            reply = data["choices"][0]["message"]["content"]
            if not isinstance(reply, str) or not reply.strip():
                raise ValueError("Empty assistant content")
            return reply.strip()
        except (ValueError, KeyError, IndexError, TypeError) as exc:
            raise MeshAPIError(
                "malformed_response", "Mesh API returned an invalid response.", 502
            ) from exc


# Global instance (will be initialized during app startup)
mesh_service = MeshAPIService()
