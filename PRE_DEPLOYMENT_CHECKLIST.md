# Pre-Deployment Checklist

Before deploying PrayaPass to production, complete this checklist.

## 📋 Quick Checklist

- [ ] Backend deployed and accessible
- [ ] Backend health check passes
- [ ] Frontend `.env.production` updated with backend URL
- [ ] Frontend builds successfully
- [ ] GitHub Pages settings configured
- [ ] GitHub Actions workflow permissions enabled
- [ ] Test deployment performed
- [ ] Registration tested
- [ ] Login tested

---

## Step-by-Step Checklist

### 1️⃣ Backend Deployment

- [ ] **Choose deployment platform**
  - [ ] Railway (recommended)
  - [ ] Render
  - [ ] Vercel

- [ ] **Deploy backend**
  - [ ] Root directory set to `backend`
  - [ ] Environment variables configured:
    - [ ] `NODE_ENV=production`
    - [ ] `PORT` set (5000 for Railway, 10000 for Render)
    - [ ] `JWT_SECRET` generated
    - [ ] `JWT_EXPIRES_IN=7d`
    - [ ] `FRONTEND_URL=https://jeffbai996.github.io`

- [ ] **Get backend URL**
  - [ ] Domain generated/configured
  - [ ] URL saved (e.g., `https://praya-api.railway.app`)

- [ ] **Test backend**
  ```bash
  curl https://your-backend-url.com/api/health
  ```
  - [ ] Returns `{"status":"ok","timestamp":"..."}`

---

### 2️⃣ Frontend Configuration

- [ ] **Update production config**
  - [ ] Edit `frontend/.env.production`
  - [ ] Set `VITE_API_URL=https://your-backend-url.com/api`
  - [ ] Verify `/api` suffix is included

- [ ] **Build frontend**
  ```bash
  cd frontend
  npm run build
  ```
  - [ ] Build completes without errors
  - [ ] Files generated in root directory:
    - [ ] `index.html` updated
    - [ ] `assets/` directory has new files

---

### 3️⃣ GitHub Configuration

- [ ] **Repository settings**
  - [ ] Go to: Settings > Pages
  - [ ] Source set to: **GitHub Actions**

- [ ] **Workflow permissions**
  - [ ] Go to: Settings > Actions > General
  - [ ] Workflow permissions: **Read and write permissions**
  - [ ] Allow GitHub Actions to create PRs: **Checked**

- [ ] **Workflow file exists**
  - [ ] `.github/workflows/deploy.yml` present
  - [ ] Workflow configured correctly

---

### 4️⃣ Deployment

- [ ] **Commit changes**
  ```bash
  git add .
  git commit -m "Configure production deployment"
  git push
  ```

- [ ] **Trigger deployment** (choose one):
  - [ ] Merge PR to main
  - [ ] Manual trigger via Actions tab
  - [ ] Push directly to main

- [ ] **Monitor deployment**
  - [ ] Go to Actions tab
  - [ ] Watch "Deploy to GitHub Pages" workflow
  - [ ] Build completes successfully
  - [ ] Deploy completes successfully

---

### 5️⃣ Verification

- [ ] **Site accessibility**
  - [ ] Visit: https://jeffbai996.github.io
  - [ ] Page loads without errors
  - [ ] No console errors (check DevTools F12)

- [ ] **Backend connectivity**
  - [ ] Open Network tab in DevTools
  - [ ] Navigate to /register or /login
  - [ ] API calls go to production backend (not localhost)

- [ ] **Registration flow**
  - [ ] Go to /register
  - [ ] Fill registration form
  - [ ] Submit registration
  - [ ] Check backend logs for OTP code
  - [ ] Enter OTP code
  - [ ] Registration succeeds

- [ ] **Login flow**
  - [ ] Go to /login
  - [ ] Enter credentials
  - [ ] Check disclaimer radio button
  - [ ] Submit login
  - [ ] Login succeeds
  - [ ] Redirected to dashboard

- [ ] **Authentication features**
  - [ ] Protected routes work
  - [ ] Token refresh works
  - [ ] Logout works
  - [ ] Session persists on page reload

---

## 🔍 Common Issues & Solutions

### ❌ Backend Not Accessible

**Symptoms:**
- API calls fail
- CORS errors
- Network errors

**Check:**
- [ ] Backend is deployed and running
- [ ] Backend URL is correct
- [ ] CORS configured: `FRONTEND_URL=https://jeffbai996.github.io`
- [ ] No trailing slash in FRONTEND_URL

---

### ❌ Frontend Calls Localhost

**Symptoms:**
- API calls go to `http://localhost:5000`
- ERR_CONNECTION_REFUSED

**Solution:**
1. Update `frontend/.env.production`
2. Rebuild: `cd frontend && npm run build`
3. Commit and push
4. Redeploy

---

### ❌ GitHub Actions Fails

**Symptoms:**
- Workflow fails
- "Resource not accessible" error
- Build errors

**Check:**
- [ ] Workflow permissions enabled
- [ ] Dependencies install successfully
- [ ] Build command works locally
- [ ] All required files committed

---

### ❌ Routes Give 404

**Symptoms:**
- Direct navigation to /login gives 404
- Refresh on /register gives 404

**Solution:**
- [ ] Check `404.html` exists
- [ ] Verify it redirects to `index.html`
- [ ] Clear browser cache

---

### ❌ Registration Fails

**Symptoms:**
- Registration returns error
- OTP not generated

**Check:**
- [ ] Backend is running
- [ ] Backend logs show request
- [ ] Email validation passes
- [ ] Password meets requirements
- [ ] Check backend console for OTP code

---

## 🎯 Post-Deployment Tasks

After successful deployment:

- [ ] **Document backend URL**
  - [ ] Add to team documentation
  - [ ] Share with team members

- [ ] **Test all features**
  - [ ] Registration
  - [ ] Email verification
  - [ ] Login
  - [ ] 2FA (if enabled)
  - [ ] Password reset
  - [ ] Profile update
  - [ ] Session management

- [ ] **Monitor performance**
  - [ ] Check backend logs
  - [ ] Monitor error rates
  - [ ] Check response times

- [ ] **Set up monitoring** (optional)
  - [ ] Error tracking (Sentry)
  - [ ] Uptime monitoring (UptimeRobot)
  - [ ] Analytics (Google Analytics)

---

## 📊 Deployment Status

Mark your deployment progress:

| Environment | Status | URL | Last Updated |
|-------------|--------|-----|--------------|
| **Development** | ✅ Ready | http://localhost:5173 | - |
| **Backend (Prod)** | ⏳ Pending | - | - |
| **Frontend (Prod)** | ⏳ Pending | https://jeffbai996.github.io | - |

---

## 🚀 Ready to Deploy?

Once all checkboxes are marked:

1. **Backend deployed** → ✅
2. **Frontend configured** → ✅
3. **GitHub set up** → ✅
4. **Tests passing** → ✅

**You're ready to deploy!** 🎉

Run the deployment:
```bash
./scripts/deploy-production.sh https://your-backend-url.com
```

Or follow [GITHUB_PAGES_SETUP.md](GITHUB_PAGES_SETUP.md) for manual deployment.

---

## 📚 Related Documentation

- **GITHUB_PAGES_SETUP.md** - GitHub Pages configuration
- **QUICKSTART.md** - Fast deployment guide
- **DEPLOYMENT.md** - Detailed deployment guide
- **DEVELOPMENT.md** - Local development guide

---

**Last Updated**: 2025-12-01
