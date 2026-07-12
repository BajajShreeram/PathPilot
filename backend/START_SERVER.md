# PathPilot Backend - Quick Start Guide

## Start the Backend Server

### Option 1: Using the Virtual Environment (Recommended)

**Windows:**
```bash
cd backend
venv\Scripts\activate
python main.py
```

**macOS/Linux:**
```bash
cd backend
source venv/bin/activate
python main.py
```

### Option 2: Using uvicorn directly

```bash
cd backend
venv\Scripts\activate
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

---

## Quick Commands

### Check if server is running:
Open browser: http://localhost:8000

### API Documentation:
- Swagger UI: http://localhost:8000/api/docs
- ReDoc: http://localhost:8000/api/redoc

### Test the AI Mentor endpoint:
```bash
cd backend
venv\Scripts\activate
python test_mentor.py
```

---

## Expected Output

When server starts successfully:
```
INFO:     Will watch for changes in these directories: ['C:\\Users\\HP\\Desktop\\PathFinder\\backend']
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started reloader process [XXXX] using WatchFiles
INFO:     Started server process [XXXX]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

---

## Troubleshooting

### If you see "module not found" errors:
```bash
cd backend
venv\Scripts\activate
pip install -r requirements.txt
```

### If port 8000 is already in use:
Change port in `backend/main.py` or stop the process using port 8000

### Check if dependencies are installed:
```bash
cd backend
venv\Scripts\activate
pip list | findstr "fastapi httpx uvicorn"
```

---

## Stop the Server

Press `CTRL + C` in the terminal where the server is running
