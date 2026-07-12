"""
Quick test script to verify Mesh API integration
"""
import asyncio
import httpx
import json

async def test_mentor_endpoint():
    """Test the /api/mentor endpoint"""
    
    test_request = {
        "message": "What should I do to become a software engineer?",
        "profile": {
            "name": "Test Student",
            "gradeClass": "12th",
            "stream": "Engineering",
            "careerInterests": ["Software Development"],
            "favouriteSubjects": ["Computer Science", "Mathematics"]
        }
    }
    
    print("Testing /api/mentor endpoint...")
    print(f"Request: {json.dumps(test_request, indent=2)}\n")
    
    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(
                "http://localhost:8000/api/mentor",
                json=test_request
            )
            
            print(f"Status: {response.status_code}")
            
            if response.status_code == 200:
                data = response.json()
                print(f"\n✓ SUCCESS!")
                print(f"\nAI Response:\n{data['reply'][:200]}...")
            else:
                print(f"\n✗ ERROR: {response.status_code}")
                print(f"Response: {response.text}")
                
    except Exception as e:
        print(f"\n✗ EXCEPTION: {type(e).__name__}: {e}")

if __name__ == "__main__":
    print("=" * 60)
    print("PathPilot AI Mentor Integration Test")
    print("=" * 60)
    print("\nMake sure the backend is running:")
    print("  cd backend && python main.py")
    print("\n" + "=" * 60 + "\n")
    
    asyncio.run(test_mentor_endpoint())
