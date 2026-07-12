"""
PathPilot Backend API
Main application entry point
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.health import router as health_router

app = FastAPI(
    title="PathPilot API",
    description="AI-powered student mentor backend API",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite dev server
        "http://localhost:3000",  # Alternative port
        "https://*.vercel.app",   # Vercel deployments
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(health_router, prefix="/api", tags=["Health"])

# Future route registrations:
# app.include_router(auth_router, prefix="/api/auth", tags=["Authentication"])
# app.include_router(careers_router, prefix="/api/careers", tags=["Careers"])
# app.include_router(universities_router, prefix="/api/universities", tags=["Universities"])
# app.include_router(scholarships_router, prefix="/api/scholarships", tags=["Scholarships"])
# app.include_router(roadmap_router, prefix="/api/roadmap", tags=["Roadmap"])
# app.include_router(ai_router, prefix="/api/ai", tags=["AI"])


@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "PathPilot API",
        "tagline": "Build Your Future",
        "version": "1.0.0",
        "docs": "/api/docs",
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
