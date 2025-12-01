# fictional projectPass Quick Start Guide

Get your fictional projectPass authentication system running in production in **3 easy steps**!

## 🚀 Option A: Automated Deployment (Recommended)

### Step 1: Deploy Backend to Railway ⭐

1. Go to https://railway.app and sign up with GitHub
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select `jeffbai996/jeffbai996.github.io`
4. **Important**: Set Root Directory to `backend`
   - Click your service → Settings → Root Directory → `backend`
5. Add environment variables (Variables tab):
   ```
   NODE_ENV=production
   PORT=5000
   JWT_SECRET=<click "Generate" or enter random string>
   JWT_EXPIRES_IN=7d
   FRONTEND_URL=https://jeffbai996.github.io
   ```
6. Go to Settings → Domains → **"Generate Domain"**
7. **Copy your Railway URL** (e.g., `https://praya-api.railway.app`)

**Deployment time:** ~2 minutes ⏱️

### Step 2: Update & Deploy Frontend

Run the deployment script with your Railway URL:

```bash
./scripts/deploy-production.sh https://your-app.railway.app
```

This script will:
- ✅ Update `frontend/.env.production` with your backend URL
- ✅ Test backend health
- ✅ Build the frontend
- ✅ Commit and push changes

**Build time:** ~30 seconds ⏱️

### Step 3: Create Pull Request & Merge

1. Go to your GitHub repository
2. Create a pull request from your branch to `main`
3. Merge the pull request
4. GitHub Pages will auto-deploy

**Done!** 🎉 Visit https://jeffbai996.github.io

---

## 🔧 Option B: Manual Deployment

### 1. Deploy Backend

Choose a platform and follow the guide:
- [Railway](DEPLOYMENT.md#option-1-railwayapp-recommended-) (Recommended)
- [Render](DEPLOYMENT.md#option-2-rendercom)
- [Vercel](DEPLOYMENT.md#option-3-vercel-serverless)

### 2. Update Frontend Config

Edit `frontend/.env.production`:

```env
VITE_API_URL=https://your-backend-url.com/api
```

### 3. Build & Deploy

```bash
cd frontend
npm run build
cd ..
git add frontend/.env.production index.html assets/
git commit -m "Deploy production with backend"
git push
```

---

## 📝 Development Mode (Local Testing)

Already set up! Just start both servers:

```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd frontend
npm run dev
```

Visit: http://localhost:5173

---

## ✅ Verify Deployment

### Test Backend
```bash
curl https://your-backend-url.com/api/health
# Should return: {"status":"ok","timestamp":"..."}
```

### Test Frontend
1. Go to https://jeffbai996.github.io/register
2. Create a new account
3. Check browser console (no errors should appear)
4. Verify registration works!

---

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| Backend 404 | Check Root Directory is set to `backend` |
| CORS errors | Verify `FRONTEND_URL=https://jeffbai996.github.io` (no trailing slash) |
| Frontend calling localhost | Rebuild frontend: `cd frontend && npm run build` |
| Registration fails | Check backend logs on Railway/Render dashboard |

---

## 📚 Documentation

- **DEPLOYMENT.md** - Detailed deployment guide for all platforms
- **DEVELOPMENT.md** - Local development setup and API reference
- **README.md** - Project overview

---

## 🎯 What You Get

✅ Secure authentication with 2FA
✅ Email verification (OTP in dev mode)
✅ Password reset functionality
✅ Session management
✅ Modern, responsive UI
✅ Bank-level security

**Free tier costs:** $0/month (Railway free credit covers it!)

---

## 🚀 Next Steps

After deployment:
- [ ] Test registration flow
- [ ] Test login with 2FA
- [ ] Test password reset
- [ ] Add real email service (SendGrid, AWS SES)
- [ ] Add real SMS service (Twilio)
- [ ] Set up database (PostgreSQL)
- [ ] Add custom domain

---

**Need help?** See DEPLOYMENT.md for detailed instructions or check the troubleshooting section above.
