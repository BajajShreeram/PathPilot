"""
AI Mentor API endpoint
Handles AI chat requests through Mesh API
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict, Any, Optional
import httpx
import json
from config import settings

router = APIRouter()


class MentorRequest(BaseModel):
    """Request model for AI mentor"""
    message: str
    profile: Optional[Dict[str, Any]] = None


class MentorResponse(BaseModel):
    """Response model for AI mentor"""
    reply: str


def build_system_prompt(profile: Optional[Dict[str, Any]] = None) -> str:
    """Build system prompt with profile context"""
    base_prompt = (
        "You are PathPilot AI Mentor. Give practical, personalized guidance about careers, "
        "entrance exams, universities, scholarships, study plans, applications and next steps. "
        "Use the student's profile carefully. Do not guarantee admission or invent facts."
    )
    
    if not profile:
        return base_prompt
    
    # Build profile context
    profile_parts = []
    
    if profile.get('name'):
        profile_parts.append(f"Name: {profile['name']}")
    
    if profile.get('gradeClass'):
        profile_parts.append(f"Grade: {profile['gradeClass']}")
    
    if profile.get('stream') or profile.get('field'):
        stream = profile.get('stream') or profile.get('field')
        profile_parts.append(f"Stream: {stream}")
    
    # Career interests
    career_interests = profile.get('careerInterests') or profile.get('career') or []
    if career_interests and isinstance(career_interests, list):
        profile_parts.append(f"Career interests: {', '.join(career_interests)}")
    
    # Subjects
    fav_subjects = profile.get('favouriteSubjects') or profile.get('subjects') or []
    if fav_subjects and isinstance(fav_subjects, list):
        profile_parts.append(f"Favourite subjects: {', '.join(fav_subjects)}")
    
    strong_subjects = profile.get('strongSubjects', [])
    if strong_subjects and isinstance(strong_subjects, list):
        profile_parts.append(f"Strong subjects: {', '.join(strong_subjects)}")
    
    weak_subjects = profile.get('weakSubjects', [])
    if weak_subjects and isinstance(weak_subjects, list):
        profile_parts.append(f"Weak subjects: {', '.join(weak_subjects)}")
    
    # Dream university and exam
    if profile.get('dreamUniversity'):
        profile_parts.append(f"Dream university: {profile['dreamUniversity']}")
    
    if profile.get('examPreference'):
        profile_parts.append(f"Exam preference: {profile['examPreference']}")
    
    # Study abroad
    if profile.get('studyAbroad') is not None:
        profile_parts.append(f"Study abroad: {'Yes' if profile['studyAbroad'] else 'No'}")
    
    if profile.get('preferredCountry') or profile.get('country'):
        country = profile.get('preferredCountry') or profile.get('country')
        profile_parts.append(f"Preferred country: {country}")
    
    # Budget and scholarships
    if profile.get('budget'):
        profile_parts.append(f"Budget: {profile['budget']}")
    
    if profile.get('needScholarships') is not None:
        profile_parts.append(f"Needs scholarships: {'Yes' if profile['needScholarships'] else 'No'}")
    
    # Achievements
    achievements = profile.get('achievements', [])
    if achievements and isinstance(achievements, list) and len(achievements) > 0:
        profile_parts.append(f"Achievements: {len(achievements)} recorded")
    
    if profile_parts:
        profile_context = "Student profile:\n" + "\n".join(profile_parts)
        return f"{base_prompt}\n\n{profile_context}"
    
    return base_prompt


@router.post("/mentor", response_model=MentorResponse)
async def get_mentor_response(request: MentorRequest):
    """
    Get AI mentor response from Mesh API
    """
    # Validate API key
    if not settings.MESH_API_KEY:
        raise HTTPException(
            status_code=500,
            detail="AI service is not configured. Please contact support."
        )
    
    # Build messages for Mesh API
    system_prompt = build_system_prompt(request.profile)
    
    messages = [
        {
            "role": "system",
            "content": system_prompt
        },
        {
            "role": "user",
            "content": request.message
        }
    ]
    
    # Prepare Mesh API request
    mesh_request = {
        "model": settings.MESH_MODEL,
        "messages": messages
    }
    
    # Call Mesh API
    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(
                settings.MESH_API_URL,
                json=mesh_request,
                headers={
                    "Content-Type": "application/json",
                    "Authorization": f"Bearer {settings.MESH_API_KEY}"
                }
            )
            
            # Handle different error responses
            if response.status_code == 401:
                print("ERROR: Invalid Mesh API key")
                raise HTTPException(
                    status_code=500,
                    detail="AI service authentication failed. Please contact support."
                )
            
            elif response.status_code == 402:
                print("ERROR: Insufficient Mesh API balance")
                raise HTTPException(
                    status_code=500,
                    detail="AI service quota exceeded. Please contact support."
                )
            
            elif response.status_code == 429:
                print("ERROR: Mesh API rate limit exceeded")
                raise HTTPException(
                    status_code=429,
                    detail="Too many requests. Please try again in a moment."
                )
            
            elif response.status_code != 200:
                error_text = response.text
                print(f"ERROR: Mesh API returned status {response.status_code}: {error_text}")
                raise HTTPException(
                    status_code=500,
                    detail="AI service encountered an error. Please try again."
                )
            
            # Parse response
            data = response.json()
            
            if not data.get('choices') or len(data['choices']) == 0:
                print("ERROR: Mesh API returned no choices")
                raise HTTPException(
                    status_code=500,
                    detail="AI service returned an invalid response."
                )
            
            assistant_message = data['choices'][0]['message']['content']
            
            return MentorResponse(reply=assistant_message)
    
    except httpx.TimeoutException:
        print("ERROR: Mesh API request timed out")
        raise HTTPException(
            status_code=504,
            detail="AI service request timed out. Please try again."
        )
    
    except httpx.NetworkError as e:
        print(f"ERROR: Network error calling Mesh API: {str(e)}")
        raise HTTPException(
            status_code=503,
            detail="Network error connecting to AI service. Please check your connection."
        )
    
    except json.JSONDecodeError:
        print("ERROR: Failed to parse Mesh API response as JSON")
        raise HTTPException(
            status_code=500,
            detail="AI service returned an invalid response format."
        )
    
    except Exception as e:
        print(f"ERROR: Unexpected error in mentor endpoint: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="An unexpected error occurred. Please try again."
        )
