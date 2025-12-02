# Vercel Backend Deployment - Step-by-Step Guide

Follow these steps to deploy your Gemini chatbot backend to Vercel.

---

## 📋 Prerequisites

✅ Vercel configuration files created (`vercel.json`, `.vercelignore`)
✅ Gemini API key: `AIzaSyAJ092WalfsQZMcRLzXsPiZ9FzEW4_BaxU`
✅ Backend code ready in `/backend` directory

---

## 🚀 Step 1: Deploy to Vercel

### Option A: Deploy via Vercel CLI (Fastest - 2 minutes)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```
   - Follow prompts to authenticate (email or GitHub)

3. **Deploy the backend:**
   ```bash
   cd backend
   vercel
   ```

4. **Answer the prompts:**
   ```
   ? Set up and deploy "~/backend"? [Y/n] y
   ? Which scope? [Select your account]
   ? Link to existing project? [N/y] n
   ? What's your project's name? praya-chatbot-backend
   ? In which directory is your code located? ./
   ```

5. **Wait for deployment** (takes ~30 seconds)

6. **You'll get a URL like:**
   ```
   ✅ Production: https://praya-chatbot-backend.vercel.app
   ```

7. **Copy this URL!** You'll need it for GitHub secrets.

---

### Option B: Deploy via Vercel Web Interface (5 minutes)

If you prefer a visual interface:

1. **Go to [Vercel Dashboard](https://vercel.com/new)**

2. **Import Git Repository:**
   - Click "Add New..." → "Project"
   - Import your GitHub repository: `jeffbai996/jeffbai996.github.io`

3. **Configure Project:**
   - **Root Directory:** `backend`
   - **Framework Preset:** Other
   - **Build Command:** `npm install`
   - **Output Directory:** (leave empty)
   - **Install Command:** `npm install`

4. **Add Environment Variables** (see Step 2 below)

5. **Click "Deploy"**

6. **Wait ~1 minute** for deployment

7. **Copy your deployment URL** (e.g., `https://praya-chatbot-backend.vercel.app`)

---

## 🔐 Step 2: Configure Vercel Environment Variables

After deployment, add your secrets to Vercel:

### Via Vercel Dashboard (Recommended):

1. **Go to your project:** https://vercel.com/dashboard
2. **Click on your project:** `praya-chatbot-backend`
3. **Go to:** Settings → Environment Variables
4. **Add these variables one by one:**

```plaintext
Name: GEMINI_API_KEY
Value: AIzaSyAJ092WalfsQZMcRLzXsPiZ9FzEW4_BaxU
Environment: Production, Preview, Development

Name: FRONTEND_URL
Value: https://jeffbai996.github.io
Environment: Production, Preview, Development

Name: NODE_ENV
Value: production
Environment: Production

Name: PORT
Value: 5000
Environment: Production, Preview, Development
```

5. **Click "Save"** for each variable

6. **Redeploy** (go to Deployments tab → click "..." → Redeploy)

---

### Via Vercel CLI (Alternative):

```bash
vercel env add GEMINI_API_KEY
# Paste: AIzaSyAJ092WalfsQZMcRLzXsPiZ9FzEW4_BaxU
# Select: Production, Preview, Development

vercel env add FRONTEND_URL
# Paste: https://jeffbai996.github.io
# Select: Production, Preview, Development

vercel env add NODE_ENV
# Paste: production
# Select: Production

vercel env add PORT
# Paste: 5000
# Select: Production, Preview, Development
```

Then redeploy:
```bash
vercel --prod
```

---

## ✅ Step 3: Test Your Deployed Backend

Test each endpoint to make sure everything works:

### 1. Health Check:
```bash
curl https://YOUR-VERCEL-URL.vercel.app/health
```

**Expected response:**
```json
{
  "status": "ok",
  "service": "praya-chatbot-backend",
  "timestamp": "2025-12-02T10:00:00.000Z",
  "uptime": 123
}
```

### 2. Gemini Status:
```bash
curl https://YOUR-VERCEL-URL.vercel.app/api/gemini/status
```

**Expected response:**
```json
{
  "available": true,
  "model": "gemini-2.0-flash-exp",
  "rateLimit": {
    "requestsUsed": 0,
    "requestsRemaining": 15,
    "windowResetIn": 60
  }
}
```

### 3. Test Gemini Chat:
```bash
curl -X POST https://YOUR-VERCEL-URL.vercel.app/api/gemini/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What are the hours for the Interior Department?",
    "departmentContext": []
  }'
```

**Expected response:**
```json
{
  "success": true,
  "response": "The Interior Department is open Monday through Friday...",
  "tokensUsed": {
    "prompt": 450,
    "completion": 120,
    "total": 570
  }
}
```

If all tests pass, your backend is working! ✅

---

## 🔑 Step 4: Update GitHub Repository Secrets

Now configure GitHub Actions to use your deployed backend:

### How to Add GitHub Secrets:

1. **Go to your GitHub repository:**
   ```
   https://github.com/jeffbai996/jeffbai996.github.io
   ```

2. **Navigate to:**
   ```
   Settings → Secrets and variables → Actions
   ```

3. **Click "New repository secret"** and add these **4 secrets:**

---

### Secret 1: VITE_SUPABASE_URL

```
Name: VITE_SUPABASE_URL
Value: https://mhltdqarqjngztiiiibk.supabase.co
```

Click "Add secret"

---

### Secret 2: VITE_SUPABASE_ANON_KEY

```
Name: VITE_SUPABASE_ANON_KEY
Value: sb_publishable_MJhh7WtpbcyWaPoTAphMiA_dUyD2jSg
```

Click "Add secret"

---

### Secret 3: VITE_GEMINI_ENABLED

```
Name: VITE_GEMINI_ENABLED
Value: true
```

Click "Add secret"

**Important:** Set this to `true` since your backend is now deployed!

---

### Secret 4: VITE_API_URL

```
Name: VITE_API_URL
Value: https://YOUR-VERCEL-URL.vercel.app/api
```

**⚠️ IMPORTANT:** Replace `YOUR-VERCEL-URL` with your actual Vercel deployment URL!

For example:
```
https://praya-chatbot-backend.vercel.app/api
```

Click "Add secret"

---

### Verify Your Secrets:

After adding all 4 secrets, you should see:

```
✅ VITE_SUPABASE_URL
✅ VITE_SUPABASE_ANON_KEY
✅ VITE_GEMINI_ENABLED
✅ VITE_API_URL
```

---

## 📤 Step 5: Trigger GitHub Pages Deployment

Now that everything is configured, merge your PR to deploy:

### Option A: Create and Merge PR via GitHub Web:

1. **Go to:**
   ```
   https://github.com/jeffbai996/jeffbai996.github.io/compare/main...claude/gemini-api-integration-01UtyftZm2XyjxaxE8wyu3HB
   ```

2. **Click "Create pull request"**

3. **Title:** "Integrate Google Gemini 2.0 API with Supabase"

4. **Review changes** (you'll see all the new backend files, ChatWidget updates, etc.)

5. **Click "Create pull request"**

6. **Click "Merge pull request"**

7. **Confirm merge**

8. **Wait 2-3 minutes** for GitHub Actions to build and deploy

9. **Check deployment status:**
   - Go to Actions tab
   - Watch the "Deploy to GitHub Pages" workflow
   - Wait for green checkmark ✅

10. **Visit your site:**
    ```
    https://jeffbai996.github.io
    ```

---

### Option B: Create PR via GitHub CLI:

If you have `gh` CLI installed:

```bash
gh pr create \
  --title "Integrate Google Gemini 2.0 API with Supabase" \
  --body "Complete Gemini AI integration with Vercel backend deployment" \
  --base main \
  --head claude/gemini-api-integration-01UtyftZm2XyjxaxE8wyu3HB

# Then merge it:
gh pr merge --merge --delete-branch
```

---

## 🧪 Step 6: Test Your Live Site

After GitHub Pages finishes deploying (2-3 minutes):

1. **Visit:** https://jeffbai996.github.io

2. **Open the chatbot** (bottom right corner)

3. **Test simple query (rule-based):**
   ```
   "What are your hours?"
   ```
   - Should respond instantly
   - Check browser console (F12) - should see no "Using Gemini" message

4. **Test complex query (AI-powered):**
   ```
   "Can you explain the difference between applying for a new passport versus renewing an existing one, and what documents I need for each situation?"
   ```
   - Should take 2-3 seconds
   - Check browser console - should see:
     ```
     Using Gemini AI for complex query
     ```
   - Response should be detailed and intelligent

5. **If you see any errors:**
   - Open browser console (F12)
   - Look for error messages
   - Common issues:
     - CORS errors → Check `FRONTEND_URL` in Vercel env vars
     - 404 errors → Check `VITE_API_URL` in GitHub secrets
     - "Not found" → Make sure URL includes `/api` at the end

---

## 🎉 Success Checklist

After completing all steps, verify:

- [ ] Backend deployed to Vercel with custom URL
- [ ] Vercel environment variables configured (4 vars)
- [ ] Backend health check returns 200 OK
- [ ] Gemini status endpoint works
- [ ] GitHub secrets added (4 secrets)
- [ ] PR created and merged to main
- [ ] GitHub Actions deployment succeeded
- [ ] Site accessible at jeffbai996.github.io
- [ ] Simple queries work (instant, rule-based)
- [ ] Complex queries work (AI-powered, 2-3 sec delay)
- [ ] Browser console shows "Using Gemini AI" for complex queries

---

## 🆘 Troubleshooting

### Backend deployment failed:

**Error:** "Build failed"
**Solution:** Check that `package.json` is in the `backend` directory

**Error:** "Cannot find module"
**Solution:** Run `npm install` in backend directory and redeploy

---

### CORS errors on live site:

**Error:** "Access to fetch blocked by CORS policy"
**Solution:**
1. Check Vercel env var `FRONTEND_URL` is exactly: `https://jeffbai996.github.io`
2. No trailing slash!
3. Redeploy Vercel project after fixing

---

### Gemini not working in production:

**Check:**
1. Is `VITE_GEMINI_ENABLED` set to `true` in GitHub secrets?
2. Is `VITE_API_URL` correct with `/api` at the end?
3. Open browser console - any errors?
4. Test backend directly: `curl https://your-vercel-url.vercel.app/health`

---

### 404 Not Found errors:

**Error:** "POST https://jeffbai996.github.io/api/gemini/chat 404"
**Problem:** `VITE_API_URL` is wrong - it's trying to use GitHub Pages, not Vercel
**Solution:** Update GitHub secret `VITE_API_URL` to your full Vercel URL:
```
https://praya-chatbot-backend.vercel.app/api
```

Then trigger a new deployment (merge another commit or manually trigger workflow)

---

## 📊 Monitoring Your Deployment

### Check Vercel Logs:
1. Go to Vercel Dashboard
2. Click your project
3. Go to "Logs" tab
4. See real-time requests and errors

### Check GitHub Actions:
1. Go to your repo's Actions tab
2. See deployment history
3. View build logs for any errors

### Monitor Rate Limits:
```bash
# Check current usage:
curl https://your-vercel-url.vercel.app/api/gemini/status
```

---

## 💰 Vercel Free Tier Limits

Your deployment should stay within free tier:

- **100GB bandwidth/month** (plenty for chatbot)
- **Serverless functions** (no always-on server needed)
- **1000 GB-hours compute time**
- **Unlimited projects**

For a chatbot with moderate traffic (~1000 AI queries/day), you'll likely use:
- ~5GB bandwidth/month
- ~$0 on Vercel (free tier)
- ~$4/month on Gemini API (or free tier if under 1500 queries/day)

---

## 🎯 Quick Reference

**Your deployment URLs:**
- Frontend: `https://jeffbai996.github.io`
- Backend: `https://YOUR-VERCEL-URL.vercel.app`
- Backend Health: `https://YOUR-VERCEL-URL.vercel.app/health`
- Backend Status: `https://YOUR-VERCEL-URL.vercel.app/api/gemini/status`

**Key files:**
- Backend config: `/backend/vercel.json`
- GitHub workflow: `/.github/workflows/deploy.yml`
- Frontend env: `/frontend/.env.production`

---

## ✅ Next Steps After Deployment

1. **Monitor usage** for first few days
2. **Check Vercel logs** for any errors
3. **Test thoroughly** with various query types
4. **Consider caching** common AI responses (future optimization)
5. **Set up error alerts** in Vercel (optional)

---

Need help? Check:
- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Actions Logs](https://github.com/jeffbai996/jeffbai996.github.io/actions)
- Backend logs in Vercel dashboard

Good luck with your deployment! 🚀
