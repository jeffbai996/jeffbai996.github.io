# GitHub Pages Auto-Deployment Setup

This guide will help you set up automatic deployment to GitHub Pages.

## ✅ Prerequisites Checklist

Before enabling auto-deployment, make sure you have:

- [x] ✅ GitHub Actions workflow created (`.github/workflows/deploy.yml`)
- [ ] ⏳ Backend deployed to Railway/Render/Vercel
- [ ] ⏳ `frontend/.env.production` updated with backend URL
- [ ] ⏳ GitHub Pages settings configured

---

## Step 1: Deploy Your Backend First ⚠️

**IMPORTANT**: The frontend needs a backend API to function. Deploy your backend before enabling GitHub Pages.

### Quick Backend Deployment (Choose One)

#### Option A: Railway (Recommended) ⭐
```bash
# Follow QUICKSTART.md or:
# 1. Go to https://railway.app
# 2. Deploy from GitHub repo
# 3. Set root directory to: backend
# 4. Add environment variables
# 5. Generate domain
# 6. Copy your URL (e.g., https://praya-api.railway.app)
```

#### Option B: Render
```bash
# See DEPLOYMENT.md for full instructions
```

#### Option C: Vercel
```bash
cd backend
vercel --prod
# Copy deployment URL
```

**Save your backend URL!** You'll need it in Step 2.

---

## Step 2: Update Frontend Configuration

After deploying the backend, update the frontend to use it:

### Method A: Use the Deployment Script (Easiest)

```bash
./scripts/deploy-production.sh https://your-backend-url.com
```

This automatically:
- Updates `frontend/.env.production`
- Builds the frontend
- Commits changes

### Method B: Manual Update

Edit `frontend/.env.production`:

```env
VITE_API_URL=https://your-backend-url.com/api
```

⚠️ **Don't forget `/api` at the end!**

Then build:
```bash
cd frontend
npm run build
git add ../index.html ../assets/ .env.production
git commit -m "Configure production backend"
git push
```

---

## Step 3: Configure GitHub Pages

1. **Go to Repository Settings**
   - Navigate to: `https://github.com/jeffbai996/jeffbai996.github.io/settings`

2. **Go to Pages Section**
   - Click "Pages" in the left sidebar

3. **Configure Source**
   - Source: **GitHub Actions** (not "Deploy from a branch")
   - This uses the workflow we created

4. **Save Settings**

---

## Step 4: Enable Workflow Permissions

1. **Go to Actions Settings**
   - Navigate to: `Settings > Actions > General`

2. **Workflow Permissions**
   - Scroll to "Workflow permissions"
   - Select: **"Read and write permissions"**
   - Check: **"Allow GitHub Actions to create and approve pull requests"**
   - Click "Save"

---

## Step 5: Trigger Deployment

### Option A: Merge Pull Request

If you're on a feature branch:

```bash
# Push your changes
git push origin your-branch

# Go to GitHub and create a PR to main
# Merge the PR
# GitHub Actions will automatically deploy!
```

### Option B: Manual Trigger

1. Go to: `Actions` tab on GitHub
2. Click: `Deploy to GitHub Pages`
3. Click: `Run workflow`
4. Select branch: `main`
5. Click: `Run workflow`

### Option C: Push to Main

If you're working directly on main:

```bash
git checkout main
git merge your-branch
git push origin main
# Auto-deployment triggered!
```

---

## Step 6: Monitor Deployment

1. **Go to Actions Tab**
   - `https://github.com/jeffbai996/jeffbai996.github.io/actions`

2. **Watch the Workflow**
   - You'll see "Deploy to GitHub Pages" running
   - Build job: ~1-2 minutes
   - Deploy job: ~30 seconds

3. **Check Deployment**
   - Once complete, visit: `https://jeffbai996.github.io`
   - Test registration and login!

---

## Verification Checklist

After deployment, verify everything works:

### ✅ Backend Check
```bash
curl https://your-backend-url.com/api/health
# Should return: {"status":"ok","timestamp":"..."}
```

### ✅ Frontend Check
1. Visit: https://jeffbai996.github.io
2. Open browser DevTools (F12)
3. Go to Network tab
4. Try to register
5. Verify API calls go to your backend (not localhost!)

### ✅ Registration Test
1. Go to: https://jeffbai996.github.io/register
2. Fill in registration form
3. Submit (OTP code will be in backend logs)
4. Check backend logs for OTP code
5. Complete verification

### ✅ Login Test
1. Go to: https://jeffbai996.github.io/login
2. Enter credentials
3. Check disclaimer radio button
4. Sign in successfully

---

## Troubleshooting

### Deployment Fails

**Error: "Resource not accessible by integration"**
- Go to Settings > Actions > General
- Enable "Read and write permissions"

**Error: "Pages must be enabled"**
- Go to Settings > Pages
- Set Source to "GitHub Actions"

### Frontend Still Calls Localhost

**Problem**: API calls going to `http://localhost:5000`

**Solutions**:
1. Check `frontend/.env.production` has correct backend URL
2. Rebuild: `cd frontend && npm run build`
3. Commit and push the new build
4. Clear browser cache

### CORS Errors

**Problem**: Backend rejects requests from GitHub Pages

**Solution**: Check backend environment variables:
```env
FRONTEND_URL=https://jeffbai996.github.io
```

No trailing slash! Redeploy backend if needed.

### 404 Errors on Routes

**Problem**: Direct navigation to `/login` or `/register` gives 404

**Solution**: GitHub Pages doesn't support client-side routing out of the box.

Add `404.html` that redirects to `index.html` (already configured).

---

## Workflow File Explanation

The GitHub Actions workflow (`.github/workflows/deploy.yml`) does:

1. **Triggers**:
   - On push to `main` or `master`
   - Manual trigger via Actions tab

2. **Build Job**:
   - Checks out code
   - Installs Node.js 18
   - Installs dependencies
   - Builds frontend
   - Uploads artifact

3. **Deploy Job**:
   - Takes build artifact
   - Deploys to GitHub Pages
   - Returns deployment URL

---

## Environment Variables

### GitHub Secrets (Optional)

If you want to add backend URL as a secret:

1. Go to: Settings > Secrets and variables > Actions
2. Click: "New repository secret"
3. Name: `VITE_API_URL`
4. Value: `https://your-backend-url.com/api`
5. Update workflow to use: `${{ secrets.VITE_API_URL }}`

**Note**: Not required if you update `.env.production` directly.

---

## Automatic Deployment Flow

```
┌─────────────────────────────────────────────────────────────┐
│  Push to main/master or Manual trigger                      │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│  GitHub Actions Workflow Starts                              │
│  ├─ Checkout code                                            │
│  ├─ Setup Node.js 18                                         │
│  ├─ Install dependencies (npm ci)                            │
│  ├─ Build frontend (npm run build)                           │
│  │  └─ Uses .env.production                                  │
│  │  └─ Outputs to root directory                             │
│  └─ Upload artifact                                          │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│  Deploy to GitHub Pages                                      │
│  ├─ Download artifact                                        │
│  ├─ Deploy to pages environment                              │
│  └─ Provide deployment URL                                   │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│  Site Live! 🎉                                               │
│  https://jeffbai996.github.io                                │
└─────────────────────────────────────────────────────────────┘
```

---

## Next Steps After Setup

1. ✅ Auto-deployment is working
2. 🔄 Future pushes to main automatically deploy
3. 🎯 Focus on features, not deployment!

**Optional enhancements**:
- Add preview deployments for PRs
- Add build caching for faster builds
- Add deployment notifications (Slack, Discord)
- Add automatic testing before deployment

---

## Useful Commands

```bash
# Check workflow status
gh workflow view "Deploy to GitHub Pages"

# Trigger manual deployment
gh workflow run deploy.yml

# View recent workflow runs
gh run list --workflow=deploy.yml

# View workflow logs
gh run view --log
```

---

## Summary

✅ GitHub Actions workflow created
✅ Automatic deployment on push to main
✅ Manual deployment trigger available
✅ Build and deploy in ~2-3 minutes
✅ Zero-downtime deployments

**All done!** Your PrayaPass system is ready for automatic deployment! 🚀

Just deploy your backend, update the frontend config, and push to main!
