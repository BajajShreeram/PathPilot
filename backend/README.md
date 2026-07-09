# PathPilot Backend

AI-powered student mentor backend API built with FastAPI.

## Setup

1. Create virtual environment:
```bash
python -m venv venv
```

2. Activate virtual environment:
```bash
# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create `.env` file from template:
```bash
cp .env.example .env
```

5. Run development server:
```bash
python main.py
```

Or with uvicorn:
```bash
uvicorn main:app --reload --port 8000
```

## API Documentation

Once running, access interactive docs at:
- Swagger UI: http://localhost:8000/api/docs
- ReDoc: http://localhost:8000/api/redoc

## Project Structure

```
backend/
├── api/            # API endpoints
├── routes/         # Route handlers
├── services/       # Business logic
├── models/         # Database models
├── schemas/        # Pydantic schemas
├── database/       # Database utilities
├── auth/           # Authentication
├── prompts/        # AI prompt templates
├── utils/          # Helper functions
├── config.py       # Configuration
├── main.py         # Application entry
└── requirements.txt
```

## Health Check

```bash
curl http://localhost:8000/api/health
```
