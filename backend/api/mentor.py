from typing import Any, Dict

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field, field_validator

from services.mesh_api import MeshAPIError, mesh_service

router = APIRouter()


class MentorRequest(BaseModel):
    message: str = Field(min_length=1)
    profile: Dict[str, Any] = Field(default_factory=dict)

    @field_validator("message")
    @classmethod
    def message_must_not_be_blank(cls, value: str) -> str:
        value = value.strip()
        if not value:
            raise ValueError("message must not be blank")
        return value


class MentorResponse(BaseModel):
    reply: str


@router.post("/mentor", response_model=MentorResponse)
async def mentor(request: MentorRequest) -> MentorResponse:
    try:
        reply = await mesh_service.generate_completion(
            message=request.message,
            profile=request.profile,
        )
        return MentorResponse(reply=reply)
    except MeshAPIError as exc:
        raise HTTPException(
            status_code=exc.status_code,
            detail={"code": exc.code, "message": exc.message},
        ) from exc
