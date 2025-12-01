# PrayaPass Development Guide

This guide explains how to set up and run the PrayaPass authentication system locally.

## Architecture Overview

The PrayaPass system consists of two parts:

1. **Frontend**: React application (located in `/frontend`)
2. **Backend**: Node.js/Express API (located in `/backend`)

## Local Development Setup

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Step 1: Start the Backend API

The backend API handles authentication, user management, and 2FA.

```bash
# Navigate to backend directory
cd backend

# Install dependencies (if not already installed)
npm install

# Start the backend server
npm start
```

The backend will run on **http://localhost:5000**

You should see: `Praya Government API running on port 5000`

### Step 2: Start the Frontend

The frontend is a React app built with Vite.

```bash
# Navigate to frontend directory (from root)
cd frontend

# Install dependencies (if not already installed)
npm install

# Start the development server
npm run dev
```

The frontend will run on **http://localhost:5173**

Open http://localhost:5173 in your browser to access the application.

## Testing Registration & Login

### Register a New Account

1. Navigate to http://localhost:5173/register
2. Fill in the registration form
3. **Important**: In development mode, the OTP code is displayed in the console and API response
4. Check the backend console logs or API response for the `debugOtp` field
5. Enter the OTP code to verify your email

### Login

1. Navigate to http://localhost:5173/login
2. Enter your email and password
3. Agree to the terms (radio button)
4. Click "Sign in"
5. If 2FA is enabled, you'll receive an OTP code (check console in dev mode)

## Environment Variables

### Backend (.env)

Located in `/backend/.env`:

```env
PORT=5000
NODE_ENV=development
JWT_SECRET=praya-pass-super-secret-key-change-in-production
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
```

### Frontend

**Development** (`.env`):
```env
VITE_API_URL=http://localhost:5000/api
```

**Production** (`.env.production`):
```env
# Update this to point to your deployed backend
VITE_API_URL=https://your-backend-domain.com/api
```

## API Endpoints

The backend provides these endpoints:

- `POST /api/auth/register` - Register new user
- `POST /api/auth/verify-email` - Verify email with OTP
- `POST /api/auth/login` - Login (step 1)
- `POST /api/auth/verify-2fa` - Verify 2FA code (step 2)
- `GET /api/auth/me` - Get current user profile
- `POST /api/auth/logout` - Logout
- And more... (see `/backend/src/routes/auth.js`)

## Development Features

### Debug OTP Codes

In development mode (`NODE_ENV=development`), OTP codes are included in API responses:

```json
{
  "message": "Verification code sent",
  "debugOtp": "123456"
}
```

This makes testing easier without needing to set up real email/SMS services.

### In-Memory Storage

The backend uses in-memory storage (Map) for users and sessions. Data is lost when the server restarts. For production, you would use a real database (PostgreSQL with Prisma).

## Production Deployment

### Frontend (GitHub Pages)

The frontend is already configured to deploy to GitHub Pages:

```bash
cd frontend
npm run build
# Files are output to the root directory
```

### Backend Deployment Options

The backend needs to be deployed to a Node.js hosting service:

1. **Railway.app** (Recommended)
   - Connect your GitHub repo
   - Deploy from the `/backend` directory
   - Add environment variables
   - Get your API URL: `https://your-app.railway.app`

2. **Render.com**
   - Create a new Web Service
   - Point to `/backend` directory
   - Add environment variables
   - Get your API URL: `https://your-app.onrender.com`

3. **Vercel**
   - Deploy as a serverless function
   - Configure build settings
   - Get your API URL: `https://your-app.vercel.app`

### Update Frontend for Production

After deploying the backend, update `/frontend/.env.production`:

```env
VITE_API_URL=https://your-deployed-backend.com/api
```

Then rebuild and deploy the frontend:

```bash
cd frontend
npm run build
git add ../index.html ../assets/
git commit -m "Update production build"
git push
```

## Troubleshooting

### "405 Method Not Allowed" Error

This means the frontend is trying to call the API but the backend isn't running. Make sure:

1. Backend server is running on port 5000
2. Frontend `.env` has `VITE_API_URL=http://localhost:5000/api`
3. You've restarted the frontend dev server after changing `.env`

### CORS Errors

If you see CORS errors, check:

1. Backend `.env` has correct `FRONTEND_URL`
2. Frontend URL matches the backend CORS configuration

### OTP Not Working

In development mode, OTP codes are logged to the console and included in API responses. Check:

1. Backend console logs
2. Network tab in browser DevTools (look for `debugOtp` field)

## Project Structure

```
jeffbai996.github.io/
├── frontend/               # React frontend
│   ├── src/
│   │   ├── pages/
│   │   │   └── auth/      # Login, Register, etc.
│   │   ├── components/    # Reusable components
│   │   └── utils/         # AuthContext, etc.
│   ├── .env              # Local dev config
│   └── .env.production   # Production config
│
├── backend/               # Node.js API
│   ├── src/
│   │   ├── routes/       # API routes
│   │   ├── services/     # OTP, sessions, etc.
│   │   └── middleware/   # Auth middleware
│   └── .env             # Backend config
│
└── DEVELOPMENT.md        # This file
```

## Additional Resources

- [Vite Documentation](https://vitejs.dev/)
- [Express Documentation](https://expressjs.com/)
- [React Router](https://reactrouter.com/)
