# PrayaPass Production Deployment Guide

This guide will walk you through deploying the PrayaPass backend API and updating the frontend to use it.

## Quick Start - Choose Your Platform

We've created configurations for three popular platforms:
- **Railway.app** ⭐ **RECOMMENDED** - Easiest, free tier available
- **Render.com** - Good free tier
- **Vercel** - Serverless option

---

## Option 1: Railway.app (Recommended) ⭐

### Why Railway?
- Simple one-click deployment
- Generous free tier ($5/month credit)
- Automatic HTTPS
- Easy environment variable management

### Step-by-Step Deployment

1. **Create a Railway Account**
   - Go to https://railway.app
   - Sign up with GitHub (recommended for easy repo access)

2. **Create a New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your `jeffbai996/jeffbai996.github.io` repository
   - Railway will detect the Node.js project

3. **Configure the Service**
   - **Root Directory**: Set to `backend` (important!)
   - Click on your service → Settings
   - Under "Root Directory", enter: `backend`

4. **Add Environment Variables**
   - Go to Variables tab
   - Add these variables:
     ```
     NODE_ENV=production
     PORT=5000
     JWT_SECRET=<generate-a-random-secret>
     JWT_EXPIRES_IN=7d
     FRONTEND_URL=https://jeffbai996.github.io
     ```
   - For `JWT_SECRET`, generate a random string (or let Railway generate it)

5. **Deploy**
   - Railway will automatically build and deploy
   - Wait for deployment to complete (1-2 minutes)

6. **Get Your API URL**
   - Go to Settings → Domains
   - Click "Generate Domain"
   - Copy your domain (e.g., `https://your-app.railway.app`)
   - **Save this URL** - you'll need it for the frontend!

### Testing Your Railway Deployment

```bash
# Replace with your actual Railway URL
curl https://your-app.railway.app/api/health

# Should return:
# {"status":"ok","timestamp":"..."}
```

---

## Option 2: Render.com

### Step-by-Step Deployment

1. **Create a Render Account**
   - Go to https://render.com
   - Sign up with GitHub

2. **Create a New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select `jeffbai996/jeffbai996.github.io`

3. **Configure the Service**
   - **Name**: `praya-government-api`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (or choose paid plan)

4. **Add Environment Variables**
   - Scroll to "Environment Variables"
   - Add:
     ```
     NODE_ENV=production
     PORT=10000
     JWT_SECRET=<generate-a-random-secret>
     JWT_EXPIRES_IN=7d
     FRONTEND_URL=https://jeffbai996.github.io
     ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (may take 3-5 minutes on free tier)

6. **Get Your API URL**
   - Copy your service URL (e.g., `https://praya-government-api.onrender.com`)
   - **Save this URL** for the frontend!

**Note**: Free tier on Render spins down after inactivity. First request may take 30-60 seconds.

---

## Option 3: Vercel (Serverless)

### Step-by-Step Deployment

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from Backend Directory**
   ```bash
   cd backend
   vercel --prod
   ```

4. **Configure Environment Variables**
   - Go to https://vercel.com/dashboard
   - Select your project
   - Go to Settings → Environment Variables
   - Add:
     ```
     NODE_ENV=production
     JWT_SECRET=<generate-random-secret>
     JWT_EXPIRES_IN=7d
     FRONTEND_URL=https://jeffbai996.github.io
     ```

5. **Redeploy with Variables**
   ```bash
   vercel --prod
   ```

6. **Get Your API URL**
   - Copy the deployment URL (e.g., `https://your-backend.vercel.app`)

---

## Part 2: Update Frontend Configuration

After deploying your backend, update the frontend:

### 1. Update Production Environment File

Edit `frontend/.env.production`:

```env
# Replace with your actual deployed backend URL
VITE_API_URL=https://your-app.railway.app/api
```

**Examples:**
- Railway: `https://your-app.railway.app/api`
- Render: `https://praya-government-api.onrender.com/api`
- Vercel: `https://your-backend.vercel.app/api`

⚠️ **Important**: Don't forget the `/api` at the end!

### 2. Rebuild Frontend

```bash
cd frontend
npm run build
```

This will:
- Use `.env.production` (not `.env`)
- Build optimized production files
- Output to the root directory (`../`)

### 3. Commit and Deploy

```bash
cd ..
git add index.html assets/ frontend/.env.production
git commit -m "Update production build with deployed backend API"
git push origin claude/prayapass-login-redesign-01YQLjo3fTJvmnNvsABScoYk
```

### 4. Create Pull Request

Go to GitHub and create a pull request to merge your branch into `main` (or deploy branch).

---

## Part 3: Verification

### Test Your Production Deployment

1. **Test Backend API**
   ```bash
   # Health check
   curl https://your-backend-url.com/api/health

   # Test registration (should work)
   curl -X POST https://your-backend-url.com/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{
       "email": "test@example.com",
       "password": "Test1234!",
       "firstName": "Test",
       "lastName": "User"
     }'
   ```

2. **Test Frontend**
   - Visit https://jeffbai996.github.io (after PR is merged)
   - Try to register a new account
   - Check browser console for any errors
   - Verify the API calls are going to your deployed backend

---

## Troubleshooting

### Backend not responding

**Railway:**
- Check Deployments tab for logs
- Verify environment variables are set
- Check that Root Directory is set to `backend`

**Render:**
- Free tier spins down - first request takes 30-60 seconds
- Check Logs tab for errors
- Verify Build and Start commands

### CORS Errors

Make sure `FRONTEND_URL` environment variable matches exactly:
```
FRONTEND_URL=https://jeffbai996.github.io
```

No trailing slash!

### Frontend still calling localhost

1. Verify `.env.production` has the correct backend URL
2. Make sure you rebuilt after updating `.env.production`
3. Clear browser cache
4. Check Network tab to see which URL is being called

### 404 on API routes

Make sure your backend URL includes `/api` in the frontend config:
```env
VITE_API_URL=https://your-backend.com/api
```

---

## Environment Variables Reference

### Backend Required Variables

| Variable | Example | Description |
|----------|---------|-------------|
| `NODE_ENV` | `production` | Environment mode |
| `PORT` | `5000` (Railway), `10000` (Render) | Server port |
| `JWT_SECRET` | Random string | Secret for JWT tokens |
| `JWT_EXPIRES_IN` | `7d` | Token expiration |
| `FRONTEND_URL` | `https://jeffbai996.github.io` | CORS origin |

### Frontend Production Variable

| Variable | Example | Description |
|----------|---------|-------------|
| `VITE_API_URL` | `https://api.example.com/api` | Backend API base URL |

---

## Cost Estimates

| Platform | Free Tier | Paid Plans Start At |
|----------|-----------|-------------------|
| Railway | $5/month credit (1GB RAM, 1GB disk) | $5/month |
| Render | 750 hours/month (sleeps after inactivity) | $7/month |
| Vercel | 100GB bandwidth, serverless | $20/month |

**Recommendation**: Start with Railway's free tier. It's more than enough for testing and moderate usage.

---

## Next Steps After Deployment

1. ✅ Backend deployed and accessible
2. ✅ Frontend updated and rebuilt
3. ✅ Production site working

**Optional enhancements:**
- Set up a custom domain
- Add database (PostgreSQL) instead of in-memory storage
- Set up monitoring and error tracking
- Add email/SMS service integration
- Enable real 2FA with actual OTP delivery

---

## Need Help?

- Railway: https://docs.railway.app
- Render: https://render.com/docs
- Vercel: https://vercel.com/docs

Check the deployment logs for errors and consult the platform-specific documentation.
