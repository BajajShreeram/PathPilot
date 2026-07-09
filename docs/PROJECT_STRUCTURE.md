# PathPilot - Project Structure

This document explains the complete project structure, folders, and important files.

## Root Structure

```
PathFinder/
├── frontend/           # React + Vite frontend application
├── backend/            # FastAPI backend application
├── docs/              # Project documentation
├── .gitignore         # Root gitignore
└── README.md          # Project overview and setup guide
```

---

## Frontend Structure (`/frontend`)

```
frontend/
├── public/                 # Static assets
│   ├── manifest.json      # PWA manifest
│   ├── sw.js             # Service worker for offline support
│   ├── icon-192.png      # PWA icon (192x192) - to be added
│   └── icon-512.png      # PWA icon (512x512) - to be added
│
├── src/
│   ├── components/        # Reusable React components
│   │   └── index.ts      # Component exports
│   │
│   ├── pages/            # Page components (routes)
│   │   ├── HomePage.tsx  # Landing page placeholder
│   │   ├── NotFoundPage.tsx # 404 page
│   │   └── index.ts      # Page exports
│   │
│   ├── layouts/          # Layout components
│   │   ├── MainLayout.tsx # Root layout with header/footer
│   │   └── index.ts      # Layout exports
│   │
│   ├── hooks/            # Custom React hooks
│   │   └── index.ts      # Hook exports
│   │
│   ├── services/         # API client and external services
│   │   └── index.ts      # Service exports
│   │
│   ├── lib/              # Utility functions and helpers
│   │   └── index.ts      # Utility exports
│   │
│   ├── types/            # TypeScript type definitions
│   │   └── index.ts      # Type exports
│   │
│   ├── assets/           # Images, fonts, media files
│   │
│   ├── styles/           # Additional CSS/styling files
│   │
│   ├── App.tsx           # Main App component with routing
│   ├── main.tsx          # Application entry point
│   └── index.css         # Global styles with Tailwind
│
├── index.html            # HTML template
├── package.json          # Frontend dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── postcss.config.js     # PostCSS configuration
├── eslint.config.js      # ESLint configuration
├── .prettierrc           # Prettier configuration
├── .env.example          # Environment variables template
├── .gitignore            # Frontend gitignore
└── README.md             # Frontend setup instructions
```

### Frontend Folder Details

#### `/src/components`
Reusable UI components organized by feature or function. Examples:
- `Button.tsx`
- `Card.tsx`
- `Header.tsx`
- `Footer.tsx`
- Feature-specific folders: `career/`, `university/`, `roadmap/`

#### `/src/pages`
Page components that correspond to routes. Each page represents a distinct view:
- `HomePage.tsx` - Landing page
- `CareersPage.tsx` - Career exploration
- `UniversitiesPage.tsx` - University search
- `ScholarshipsPage.tsx` - Scholarship finder
- `RoadmapPage.tsx` - Personalized roadmap
- `DashboardPage.tsx` - Student dashboard
- `ProfilePage.tsx` - User profile

#### `/src/layouts`
Layout wrappers that provide consistent structure across pages:
- `MainLayout.tsx` - Primary layout with navigation
- `AuthLayout.tsx` - Layout for auth pages (login/signup)
- `DashboardLayout.tsx` - Layout for dashboard pages

#### `/src/hooks`
Custom React hooks for reusable logic:
- `useAuth.ts` - Authentication state
- `useApi.ts` - API call management
- `useLocalStorage.ts` - Local storage helper

#### `/src/services`
API client and external service integrations:
- `api.ts` - Axios/Fetch wrapper
- `authService.ts` - Supabase auth methods
- `aiService.ts` - Mesh API integration

#### `/src/lib`
Utility functions and helpers:
- `constants.ts` - App-wide constants
- `formatters.ts` - Date, text formatters
- `validators.ts` - Input validation

#### `/src/types`
TypeScript interfaces and types:
- `user.ts` - User-related types
- `career.ts` - Career data types
- `api.ts` - API response types

---

## Backend Structure (`/backend`)

```
backend/
├── api/                   # API endpoints
│   ├── __init__.py
│   └── health.py         # Health check endpoint
│
├── routes/               # Route handlers (future)
│   └── __init__.py
│
├── services/             # Business logic
│   ├── __init__.py
│   ├── mesh_api.py      # Mesh API service (AI gateway)
│   └── supabase_service.py # Supabase database service
│
├── models/               # Database models
│   └── __init__.py
│
├── schemas/              # Pydantic validation schemas
│   ├── __init__.py
│   └── common.py        # Common response schemas
│
├── database/             # Database utilities
│   └── __init__.py
│
├── auth/                 # Authentication logic
│   └── __init__.py
│
├── prompts/              # AI prompt templates
│   ├── __init__.py
│   └── templates.py     # Prompt templates for AI
│
├── utils/                # Helper functions
│   ├── __init__.py
│   └── helpers.py       # Common utilities
│
├── venv/                 # Python virtual environment
│
├── main.py               # FastAPI application entry point
├── config.py             # Configuration and settings
├── requirements.txt      # Python dependencies
├── .env.example          # Environment variables template
├── .gitignore            # Backend gitignore
└── README.md             # Backend setup instructions
```

### Backend Folder Details

#### `/api`
API endpoint definitions. Each file handles a specific feature area:
- `health.py` - Health check
- `auth.py` - Authentication endpoints
- `careers.py` - Career discovery endpoints
- `universities.py` - University search endpoints

#### `/routes`
Router modules that group related endpoints:
- Separation between endpoint logic and business logic

#### `/services`
Business logic layer. Services contain the core functionality:
- `mesh_api.py` - AI model interactions
- `supabase_service.py` - Database operations
- `career_service.py` - Career discovery logic
- `roadmap_service.py` - Roadmap generation logic

#### `/models`
Database models (when using ORM):
- `user.py` - User model
- `career.py` - Career data model
- `roadmap.py` - Roadmap model

#### `/schemas`
Pydantic schemas for request/response validation:
- `user_schema.py` - User request/response schemas
- `career_schema.py` - Career data schemas
- Type-safe API contracts

#### `/database`
Database connection and utilities:
- `supabase_client.py` - Supabase client initialization
- `migrations/` - Database migrations

#### `/auth`
Authentication and authorization:
- `jwt_handler.py` - JWT token management
- `supabase_auth.py` - Supabase Auth integration
- `dependencies.py` - Auth dependencies for routes

#### `/prompts`
AI prompt templates and prompt engineering:
- `templates.py` - Reusable prompt templates
- `career_prompts.py` - Career-specific prompts
- `roadmap_prompts.py` - Roadmap generation prompts

#### `/utils`
Common utilities and helpers:
- `helpers.py` - General helper functions
- `validators.py` - Input validators
- `constants.py` - App constants

---

## Documentation Structure (`/docs`)

```
docs/
├── PROJECT_STRUCTURE.md      # This file - project structure explanation
├── DEVELOPMENT_GUIDE.md      # Setup and development workflow
├── CODING_STANDARDS.md       # Coding conventions and best practices
├── TECH_STACK.md             # Technology explanations
├── DESIGN_SYSTEM.md          # UI/UX design guidelines
└── FUTURE_EXPANSION.md       # Future feature roadmap
```

---

## Configuration Files

### Frontend Configuration

- **`package.json`** - Node dependencies, scripts, metadata
- **`tsconfig.json`** - TypeScript compiler options
- **`vite.config.ts`** - Vite bundler configuration
- **`tailwind.config.js`** - Tailwind CSS theme customization
- **`postcss.config.js`** - PostCSS plugins (Tailwind, Autoprefixer)
- **`eslint.config.js`** - ESLint rules for code quality
- **`.prettierrc`** - Code formatting rules
- **`.env.example`** - Template for environment variables

### Backend Configuration

- **`requirements.txt`** - Python dependencies
- **`config.py`** - Centralized configuration using Pydantic
- **`.env.example`** - Template for environment variables
- **`main.py`** - FastAPI app initialization and CORS setup

---

## Key Files Explained

### Frontend

**`src/main.tsx`**
- Application entry point
- React root rendering
- Global CSS import

**`src/App.tsx`**
- Main App component
- React Router configuration
- Route definitions

**`src/index.css`**
- Global styles
- Tailwind directives
- Custom CSS variables

**`public/manifest.json`**
- PWA configuration
- App metadata (name, icons, theme)
- Install behavior

**`public/sw.js`**
- Service Worker
- Offline caching strategy
- PWA functionality

### Backend

**`main.py`**
- FastAPI app instance
- CORS middleware setup
- Route registration
- App metadata (title, version)

**`config.py`**
- Centralized settings management
- Environment variable loading
- Type-safe configuration

**`api/health.py`**
- Health check endpoint
- Verifies API is running
- Returns service status

---

## Environment Variables

### Frontend (`.env`)

```bash
VITE_API_URL=http://localhost:8000/api
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
VITE_APP_NAME=PathPilot
VITE_ENABLE_PWA=true
```

### Backend (`.env`)

```bash
APP_NAME=PathPilot API
DEBUG=false
PORT=8000
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
MESH_API_KEY=your_mesh_api_key
MESH_API_URL=https://api.mesh.ai/v1
```

---

## Build Outputs

### Frontend Build
- **`frontend/dist/`** - Production build output
- Contains optimized HTML, CSS, JS bundles
- Ready for deployment to Vercel

### Backend
- No build step required
- Deployed directly to Render/Railway
- Virtual environment excluded via `.gitignore`

---

## Future Additions

As features are built, the structure will expand:

### Frontend
- `/src/contexts/` - React Context providers
- `/src/store/` - State management (Redux/Zustand)
- `/src/tests/` - Unit and integration tests

### Backend
- `/tests/` - Backend tests
- `/migrations/` - Database migrations
- `/scripts/` - Utility scripts
- `/logs/` - Application logs

---

## Notes

- **Modularity**: Each folder has a clear, single responsibility
- **Scalability**: Structure supports growth without refactoring
- **Beginner-friendly**: Clear naming and organization
- **Production-ready**: Follows industry best practices
