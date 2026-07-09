# PathPilot - Development Guide

Complete guide for setting up and developing PathPilot locally.

---

## Prerequisites

Before starting, ensure you have:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **Python** (v3.9 or higher) - [Download](https://www.python.org/)
- **Git** - [Download](https://git-scm.com/)
- **Code Editor** - VS Code recommended

---

## Initial Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd PathFinder
```

---

## Frontend Setup

### 1. Navigate to Frontend Directory

```bash
cd frontend
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages:
- React
- React Router
- Tailwind CSS
- TypeScript
- Vite
- ESLint & Prettier

### 3. Create Environment File

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```bash
VITE_API_URL=http://localhost:8000/api
VITE_APP_NAME=PathPilot
VITE_ENABLE_PWA=true

# Add when integrating Supabase:
# VITE_SUPABASE_URL=your_supabase_url
# VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Start Development Server

```bash
npm run dev
```

Frontend will be available at: **http://localhost:5173**

### 5. Verify Installation

Open your browser and navigate to `http://localhost:5173`. You should see the PathPilot placeholder page.

---

## Backend Setup

### 1. Navigate to Backend Directory

Open a new terminal window:

```bash
cd backend
```

### 2. Create Virtual Environment

**Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**Linux/Mac:**
```bash
python -m venv venv
source venv/bin/activate
```

You should see `(venv)` in your terminal prompt.

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

This installs:
- FastAPI
- Uvicorn
- Pydantic
- python-dotenv
- httpx (for API calls)
- Supabase client
- JWT libraries

### 4. Create Environment File

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```bash
APP_NAME=PathPilot API
DEBUG=false
PORT=8000
CORS_ORIGINS=http://localhost:5173,http://localhost:3000

# Add when integrating:
# SUPABASE_URL=your_supabase_url
# SUPABASE_KEY=your_supabase_key
# MESH_API_KEY=your_mesh_api_key
```

### 5. Start Development Server

```bash
python main.py
```

Or with uvicorn:

```bash
uvicorn main:app --reload --port 8000
```

Backend will be available at: **http://localhost:8000**

### 6. Verify Installation

Open your browser and navigate to:
- API Root: `http://localhost:8000`
- Health Check: `http://localhost:8000/api/health`
- Swagger Docs: `http://localhost:8000/api/docs`
- ReDoc: `http://localhost:8000/api/redoc`

---

## Development Workflow

### Frontend Development

#### Running Development Server

```bash
cd frontend
npm run dev
```

- Hot Module Replacement (HMR) enabled
- Changes reflect instantly in browser
- Runs on port 5173 by default

#### Linting Code

```bash
npm run lint
```

#### Formatting Code

```bash
npm run format
```

#### Building for Production

```bash
npm run build
```

Output will be in `frontend/dist/`

#### Preview Production Build

```bash
npm run preview
```

### Backend Development

#### Running Development Server

```bash
cd backend
# Activate virtual environment first
python main.py
```

Or with auto-reload:

```bash
uvicorn main:app --reload --port 8000
```

#### Testing Health Endpoint

```bash
curl http://localhost:8000/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "service": "PathPilot API",
  "timestamp": "2024-01-01T00:00:00.000000",
  "version": "1.0.0"
}
```

---

## Common Commands

### Frontend Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |

### Backend Commands

| Command | Description |
|---------|-------------|
| `python main.py` | Start FastAPI server |
| `uvicorn main:app --reload` | Start with auto-reload |
| `pip install -r requirements.txt` | Install dependencies |
| `pip freeze > requirements.txt` | Update requirements |

---

## Development Tips

### Frontend Tips

1. **Component Organization**
   - Create feature-based folders in `components/`
   - Keep components small and focused
   - Use TypeScript interfaces for props

2. **Styling**
   - Use Tailwind utility classes
   - Follow the design system colors
   - Keep custom CSS minimal

3. **State Management**
   - Start with React hooks (useState, useEffect)
   - Add Context API when needed
   - Consider Zustand/Redux for complex state

4. **API Calls**
   - Create service functions in `services/`
   - Handle loading and error states
   - Use React Query for advanced needs

### Backend Tips

1. **Route Organization**
   - Group related endpoints in route files
   - Keep endpoint handlers thin
   - Move logic to service layer

2. **Error Handling**
   - Use FastAPI's HTTPException
   - Return consistent error formats
   - Log errors appropriately

3. **Database Operations**
   - Always validate input with Pydantic
   - Use service layer for database calls
   - Handle connection errors gracefully

4. **API Documentation**
   - Add docstrings to all endpoints
   - Use Pydantic models for request/response
   - Test endpoints via Swagger UI

---

## Debugging

### Frontend Debugging

1. **Browser DevTools**
   - Use React DevTools extension
   - Check Network tab for API calls
   - Use Console for error messages

2. **Vite Debug Mode**
   ```bash
   DEBUG=vite:* npm run dev
   ```

3. **TypeScript Errors**
   - Check `tsconfig.json` settings
   - Run `npm run build` to see all errors
   - Use VS Code TypeScript features

### Backend Debugging

1. **Enable Debug Mode**
   In `.env`:
   ```bash
   DEBUG=true
   ```

2. **Check Logs**
   - FastAPI shows detailed errors in console
   - Use `print()` or proper logging

3. **Test API Endpoints**
   - Use Swagger UI at `/api/docs`
   - Use Postman or curl
   - Check request/response in browser DevTools

---

## Testing

### Frontend Testing (Future)

```bash
npm run test          # Run tests
npm run test:coverage # Coverage report
```

### Backend Testing (Future)

```bash
pytest                # Run tests
pytest --cov          # Coverage report
```

---

## Environment Management

### Frontend Environment Variables

- Must start with `VITE_`
- Accessible via `import.meta.env.VITE_VARIABLE_NAME`
- Committed: `.env.example`
- Not committed: `.env`, `.env.local`

### Backend Environment Variables

- Loaded via `python-dotenv`
- Managed in `config.py`
- Accessed via `settings.VARIABLE_NAME`
- Committed: `.env.example`
- Not committed: `.env`

---

## Troubleshooting

### Frontend Issues

**Port Already in Use**
```bash
# Change port in package.json or run:
npm run dev -- --port 3000
```

**Module Not Found**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Build Errors**
```bash
npm run build -- --debug
```

### Backend Issues

**Port Already in Use**
```bash
# Change port in .env or run:
uvicorn main:app --reload --port 8001
```

**Module Not Found**
```bash
pip install -r requirements.txt
```

**Virtual Environment Issues**
```bash
# Deactivate and recreate
deactivate
rm -rf venv
python -m venv venv
# Activate and reinstall
pip install -r requirements.txt
```

---

## Git Workflow

### Basic Workflow

```bash
# Create feature branch
git checkout -b feature/feature-name

# Make changes and commit
git add .
git commit -m "feat: add feature description"

# Push to remote
git push origin feature/feature-name

# Create Pull Request on GitHub
```

### Commit Message Convention

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Formatting changes
- `refactor:` Code restructuring
- `test:` Adding tests
- `chore:` Maintenance tasks

---

## IDE Setup (VS Code)

### Recommended Extensions

**Frontend:**
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- ES7+ React/Redux/React-Native snippets
- Auto Rename Tag

**Backend:**
- Python
- Pylance
- Python Docstring Generator
- Thunder Client (API testing)

### VS Code Settings

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[python]": {
    "editor.defaultFormatter": "ms-python.black-formatter"
  },
  "tailwindCSS.experimental.classRegex": [
    ["clsx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

---

## Next Steps

1. **Phase 2**: Build frontend UI components and pages
2. **Phase 3**: Implement backend API endpoints
3. **Phase 4**: Integrate Supabase authentication
4. **Phase 5**: Integrate Mesh API for AI features
5. **Phase 6**: Testing and deployment

---

## Getting Help

- Check documentation in `/docs` folder
- Review project structure in `PROJECT_STRUCTURE.md`
- Read coding standards in `CODING_STANDARDS.md`
- Open issues for bugs or questions

---

## Quick Start Summary

```bash
# Terminal 1 - Frontend
cd frontend
npm install
cp .env.example .env
npm run dev

# Terminal 2 - Backend
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
cp .env.example .env
python main.py
```

**Frontend**: http://localhost:5173  
**Backend**: http://localhost:8000  
**API Docs**: http://localhost:8000/api/docs
