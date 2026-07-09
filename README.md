# PathPilot

**Build Your Future.**

PathPilot is an AI-powered Progressive Web App that serves as a comprehensive student mentor, helping students discover careers, explore universities, find scholarships, prepare for exams, generate personalized roadmaps, and guide them toward their dream future.

---

## 🎯 Purpose

PathPilot empowers students from Grade 8 onwards, college aspirants, and students planning to study abroad by providing:

- **Career Discovery**: Explore careers aligned with interests and strengths
- **University Exploration**: Find and research universities worldwide
- **Scholarship Finder**: Discover funding opportunities
- **Exam Preparation**: Prepare for entrance exams with AI guidance
- **Personalized Roadmaps**: AI-generated step-by-step plans
- **Deadline Tracking**: Never miss important dates
- **Opportunity Discovery**: Find relevant opportunities
- **AI Mentorship**: Get personalized guidance and support

---

## 🚀 Technology Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **React Router** - Navigation
- **PWA** - Mobile-first, installable

### Backend
- **FastAPI** - Python web framework
- **Python** - Backend language
- **Uvicorn** - ASGI server
- **Pydantic** - Data validation

### Database & Auth
- **Supabase** - Database, authentication, storage

### AI
- **Mesh API** - Model-agnostic AI gateway

### Deployment
- **Vercel** - Frontend hosting
- **Render/Railway** - Backend hosting

---

## 📁 Project Structure

```
PathFinder/
├── frontend/           # React + Vite frontend
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Page components
│   │   ├── layouts/    # Layout components
│   │   ├── hooks/      # Custom React hooks
│   │   ├── services/   # API client services
│   │   ├── lib/        # Utility functions
│   │   ├── types/      # TypeScript types
│   │   ├── assets/     # Images, fonts, media
│   │   └── styles/     # Additional styles
│   └── public/         # Static assets, PWA files
│
├── backend/            # FastAPI backend
│   ├── api/           # API endpoints
│   ├── routes/        # Route handlers
│   ├── services/      # Business logic
│   ├── models/        # Database models
│   ├── schemas/       # Pydantic schemas
│   ├── database/      # Database utilities
│   ├── auth/          # Authentication
│   ├── prompts/       # AI prompt templates
│   └── utils/         # Helper functions
│
└── docs/              # Documentation
    ├── PROJECT_STRUCTURE.md
    ├── DEVELOPMENT_GUIDE.md
    ├── CODING_STANDARDS.md
    ├── TECH_STACK.md
    ├── DESIGN_SYSTEM.md
    └── FUTURE_EXPANSION.md
```

---

## 🛠️ Quick Start

### Prerequisites
- Node.js (v18+)
- Python (v3.9+)
- Git

### Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start development server
npm run dev
```

Frontend runs at: **http://localhost:5173**

### Backend Setup

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create environment file
cp .env.example .env

# Start development server
python main.py
```

Backend runs at: **http://localhost:8000**

API Documentation: **http://localhost:8000/api/docs**

---

## 📖 Documentation

Comprehensive documentation is available in the `/docs` folder:

- **[PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md)** - Complete project structure explanation
- **[DEVELOPMENT_GUIDE.md](docs/DEVELOPMENT_GUIDE.md)** - Setup and development workflow
- **[CODING_STANDARDS.md](docs/CODING_STANDARDS.md)** - Coding conventions and best practices
- **[TECH_STACK.md](docs/TECH_STACK.md)** - Technology explanations and justifications
- **[DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md)** - UI/UX design guidelines and components
- **[FUTURE_EXPANSION.md](docs/FUTURE_EXPANSION.md)** - Future features roadmap

---

## 🎨 Design System

### Colors
- **Primary Blue**: `#2563EB` - Trust, professionalism
- **Success Green**: `#10B981` - Growth, achievement
- **AI Purple**: `#8B5CF6` - Intelligence, innovation
- **Warning Orange**: `#F59E0B` - Attention, urgency
- **Error Red**: `#EF4444` - Errors, alerts
- **Background**: `#F8FAFC` - Clean, spacious
- **Text**: `#111827` - Readable, professional

### Typography
- **Headings**: Poppins (600, 700, 800)
- **Body**: Inter (300, 400, 500, 600, 700)

### Design Inspiration
- **Apple** - Clean, minimal layout
- **Notion** - Organized, functional
- **ChatGPT** - Conversational, simple
- **Duolingo** - Motivating, friendly

---

## ✨ Features (Planned)

### Phase 1: MVP (Current)
- [x] Project structure and setup
- [x] Design system
- [x] Documentation
- [ ] User authentication
- [ ] Career discovery
- [ ] University search
- [ ] AI roadmap generation

### Phase 2: Enhanced Features
- [ ] Resume builder
- [ ] Portfolio analyzer
- [ ] Internship finder
- [ ] Parent dashboard
- [ ] Teacher dashboard

### Phase 3: Advanced
- [ ] Voice AI mentor
- [ ] Native mobile apps
- [ ] Community features
- [ ] Premium features

See [FUTURE_EXPANSION.md](docs/FUTURE_EXPANSION.md) for complete roadmap.

---

## 🔐 Environment Variables

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

## 🤝 Contributing

We follow these principles:

1. **Clean Code**: Self-documenting, readable code
2. **Modularity**: Reusable, testable components
3. **Consistency**: Follow established patterns
4. **Documentation**: Comment complex logic
5. **Type Safety**: Use TypeScript/type hints

See [CODING_STANDARDS.md](docs/CODING_STANDARDS.md) for detailed guidelines.

---

## 📝 Development Workflow

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/feature-name

# Make changes and commit
git add .
git commit -m "feat: add feature description"

# Push to remote
git push origin feature/feature-name
```

### Commit Convention
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code formatting
- `refactor:` Code restructuring
- `test:` Adding tests
- `chore:` Maintenance tasks

---

## 🧪 Testing (Future)

### Frontend
```bash
npm run test           # Run tests
npm run test:coverage  # Coverage report
```

### Backend
```bash
pytest                # Run tests
pytest --cov          # Coverage report
```

---

## 🚢 Deployment

### Frontend (Vercel)
1. Connect GitHub repository
2. Set environment variables
3. Deploy automatically on push

### Backend (Render/Railway)
1. Connect GitHub repository
2. Set environment variables
3. Deploy automatically on push

---

## 📊 Project Status

**Current Phase**: Phase 1 - Foundation & Setup

**Status**: ✅ Infrastructure Complete

**Next Steps**:
1. Implement authentication (Supabase Auth)
2. Build frontend UI components
3. Create backend API endpoints
4. Integrate Mesh API for AI features

---

## 🎓 Target Users

- **Students**: Grade 8 onwards
- **College Aspirants**: Undergraduate and graduate students
- **International Students**: Planning to study abroad
- **Career Changers**: Exploring new career paths

---

## 💡 Why PathPilot?

Traditional career guidance is:
- ❌ Limited by counselor availability
- ❌ Generic, one-size-fits-all advice
- ❌ Expensive
- ❌ Time-consuming

PathPilot provides:
- ✅ 24/7 AI-powered guidance
- ✅ Personalized recommendations
- ✅ Affordable and accessible
- ✅ Instant, actionable insights

---

## 📞 Support

For questions or issues:
1. Check the [DEVELOPMENT_GUIDE.md](docs/DEVELOPMENT_GUIDE.md)
2. Review [PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md)
3. Read [CODING_STANDARDS.md](docs/CODING_STANDARDS.md)
4. Open a GitHub issue

---

## 📜 License

[License information to be added]

---

## 🌟 Vision

**Empower every student to discover their potential and build their dream future with confidence and clarity.**

---

## 🙏 Acknowledgments

Built with modern technologies and best practices:
- React Team for React
- Vite Team for Vite
- FastAPI Team for FastAPI
- Tailwind Labs for Tailwind CSS
- Supabase Team for Supabase
- Open source community

---

**PathPilot** - *Build Your Future.*

Start your journey today! 🚀
