# PathPilot Deployment Configuration Guide

## Environment Variables

### Frontend (`.env`)

Required environment variables for the frontend application:

```bash
# Backend API URL
# Development: http://localhost:8000
# Production: https://your-backend-api.vercel.app or your custom domain
VITE_API_URL=http://localhost:8000

# Supabase Configuration (if using Supabase)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

**Important Notes:**
- `VITE_API_URL` must NOT include `/api` suffix - it will be added automatically
- For production, set `VITE_API_URL` to your deployed backend URL
- Never commit `.env` file to Git (already in .gitignore)
- Use `.env.example` as template for new deployments

---

### Backend (`.env`)

Required environment variables for the backend application:

```bash
# Mesh API Configuration (REQUIRED)
MESH_API_KEY=your_mesh_api_key_here
MESH_MODEL=openai/gpt-4o

# Supabase Configuration (Optional - for future database integration)
# SUPABASE_URL=your_supabase_url
# SUPABASE_KEY=your_supabase_key
# SUPABASE_JWT_SECRET=your_jwt_secret
```

**Security Notes:**
- **NEVER** commit `MESH_API_KEY` to Git
- **NEVER** expose `MESH_API_KEY` in frontend code or browser
- Only backend should have access to `MESH_API_KEY`
- Use environment variables in deployment platforms (Vercel, Railway, etc.)

---

## Deployment Platforms

### Frontend Deployment (Vercel)

1. **Push code to GitHub**
2. **Connect to Vercel**
3. **Set Environment Variables in Vercel:**
   - `VITE_API_URL` → `https://your-backend-url.vercel.app`
   - `VITE_SUPABASE_URL` → Your Supabase URL
   - `VITE_SUPABASE_PUBLISHABLE_KEY` → Your Supabase key

4. **Build Settings:**
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

---

### Backend Deployment (Vercel/Railway)

#### Option 1: Vercel

1. **Create `vercel.json` in backend folder:**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "main.py",
      "use": "@vercel/python"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "main.py"
    }
  ]
}
```

2. **Set Environment Variables:**
   - `MESH_API_KEY` → Your Mesh API key
   - `MESH_MODEL` → `openai/gpt-4o`

#### Option 2: Railway

1. **Connect GitHub repository**
2. **Set Environment Variables:**
   - `MESH_API_KEY`
   - `MESH_MODEL`
3. **Railway auto-detects Python and installs dependencies**

---

## CORS Configuration

The backend is configured to allow requests from:
- `http://localhost:5173` (development)
- `http://localhost:3000` (alternative dev port)
- `https://*.vercel.app` (Vercel deployments)

**For production with custom domain:**

Update `backend/config.py`:
```python
CORS_ORIGINS: List[str] = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://*.vercel.app",
    "https://your-custom-domain.com",  # Add your domain
]
```

---

## Security Checklist

### ✅ Frontend
- [x] No hardcoded API keys
- [x] API URL from environment variable
- [x] `.env` in `.gitignore`
- [x] Production URL configured separately

### ✅ Backend
- [x] Mesh API key in environment only
- [x] API key never logged
- [x] CORS properly configured
- [x] Error messages don't expose sensitive data
- [x] `.env` in `.gitignore`

---

## Testing Deployment

### Local Testing
```bash
# Terminal 1: Backend
cd backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
python main.py

# Terminal 2: Frontend
cd frontend
npm run dev
```

### Production Testing
1. Deploy backend first
2. Get backend URL (e.g., `https://pathpilot-api.vercel.app`)
3. Update frontend `VITE_API_URL` to backend URL
4. Deploy frontend
5. Test AI Mentor functionality

---

## Troubleshooting

### "AI service is not configured"
- Backend `MESH_API_KEY` not set
- Check environment variables in deployment platform

### "Network error"
- Frontend `VITE_API_URL` incorrect
- Backend not deployed or crashed
- CORS not allowing frontend domain

### "Failed to get response"
- Mesh API key invalid or expired
- Insufficient Mesh API balance
- Check backend logs for detailed error

---

## Quick Reference

### Development URLs
- Frontend: http://localhost:5173
- Backend: http://localhost:8000
- API Docs: http://localhost:8000/api/docs

### Production URLs (Update these)
- Frontend: https://your-app.vercel.app
- Backend: https://your-api.vercel.app
- AI Mentor Endpoint: https://your-api.vercel.app/api/mentor

---

## Environment Variables Summary

| Variable | Location | Required | Example |
|----------|----------|----------|---------|
| `VITE_API_URL` | Frontend | Yes | `https://api.pathpilot.com` |
| `VITE_SUPABASE_URL` | Frontend | Optional | `https://xxx.supabase.co` |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Frontend | Optional | `eyJ...` |
| `MESH_API_KEY` | Backend | Yes | `rsk_...` |
| `MESH_MODEL` | Backend | No (has default) | `openai/gpt-4o` |

---

**Last Updated:** December 2024
**Version:** 1.0.0
