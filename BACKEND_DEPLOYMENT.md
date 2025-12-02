# Backend Deployment Guide for Production

Your Gemini AI chatbot backend needs to be deployed separately from GitHub Pages since GitHub Pages only hosts static files. This guide covers deploying the backend to popular platforms.

## ⚠️ Current Status

- ✅ **Frontend**: Deployed to GitHub Pages (jeffbai996.github.io)
- ✅ **Supabase**: Configured with production credentials
- ❌ **Backend API**: Not deployed yet (Gemini AI disabled in production)

To enable Gemini AI in production, deploy the backend using one of the options below.

---

## 🚀 Deployment Options

### Option 1: Vercel (Recommended - Free Tier Available)

**Pros:** Easy deployment, automatic HTTPS, good free tier, serverless
**Cons:** Function timeout limits on free tier

#### Steps:

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Create `vercel.json` in backend directory:**
   ```bash
   cd backend
   ```

   Create `vercel.json`:
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "server.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "server.js"
       }
     ],
     "env": {
       "NODE_ENV": "production"
     }
   }
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Set environment variables in Vercel dashboard:**
   - Go to your project settings
   - Add these secrets:
     ```
     GEMINI_API_KEY=AIzaSyAJ092WalfsQZMcRLzXsPiZ9FzEW4_BaxU
     FRONTEND_URL=https://jeffbai996.github.io
     NODE_ENV=production
     ```

5. **Get your deployment URL** (e.g., `https://praya-chatbot-backend.vercel.app`)

6. **Update frontend `.env.production`:**
   ```env
   VITE_GEMINI_ENABLED=true
   VITE_API_URL=https://praya-chatbot-backend.vercel.app/api
   ```

7. **Rebuild and push frontend:**
   ```bash
   cd ../frontend
   npm run build
   git add .
   git commit -m "Enable Gemini with Vercel backend"
   git push
   ```

---

### Option 2: Railway (Free $5 Credit, Then Paid)

**Pros:** Simple setup, persistent storage, automatic deployments
**Cons:** No free tier after credits expire

#### Steps:

1. **Install Railway CLI:**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login and initialize:**
   ```bash
   railway login
   cd backend
   railway init
   ```

3. **Add environment variables:**
   ```bash
   railway variables set GEMINI_API_KEY=AIzaSyAJ092WalfsQZMcRLzXsPiZ9FzEW4_BaxU
   railway variables set FRONTEND_URL=https://jeffbai996.github.io
   railway variables set NODE_ENV=production
   railway variables set PORT=5000
   ```

4. **Deploy:**
   ```bash
   railway up
   ```

5. **Get your deployment URL** from Railway dashboard

6. **Update frontend** (same as Vercel step 6-7)

---

### Option 3: Render (Free Tier Available)

**Pros:** Free tier, easy setup, persistent deployment
**Cons:** Free tier has cold starts (slower initial response)

#### Steps:

1. **Push backend to GitHub** (if not already):
   ```bash
   cd backend
   git init
   git add .
   git commit -m "Backend for deployment"
   git remote add origin <your-backend-repo-url>
   git push -u origin main
   ```

2. **Go to [Render Dashboard](https://dashboard.render.com/)**

3. **Create New Web Service:**
   - Connect your GitHub repo
   - Select the `backend` directory
   - Build command: `npm install`
   - Start command: `npm start`

4. **Add Environment Variables:**
   ```
   GEMINI_API_KEY=AIzaSyAJ092WalfsQZMcRLzXsPiZ9FzEW4_BaxU
   FRONTEND_URL=https://jeffbai996.github.io
   NODE_ENV=production
   PORT=5000
   ```

5. **Deploy** and get your URL

6. **Update frontend** (same as Vercel step 6-7)

---

### Option 4: AWS Lambda + API Gateway (Advanced)

**Pros:** Highly scalable, pay-per-use, very cheap for low traffic
**Cons:** More complex setup, requires AWS knowledge

#### Quick Steps:

1. Install Serverless Framework:
   ```bash
   npm install -g serverless
   ```

2. Create `serverless.yml` in backend:
   ```yaml
   service: praya-chatbot-backend

   provider:
     name: aws
     runtime: nodejs18.x
     region: us-east-1
     environment:
       GEMINI_API_KEY: ${env:GEMINI_API_KEY}
       FRONTEND_URL: https://jeffbai996.github.io
       NODE_ENV: production

   functions:
     api:
       handler: server.handler
       events:
         - http:
             path: /{proxy+}
             method: ANY
             cors: true
   ```

3. Modify `server.js` to export handler for Lambda

4. Deploy:
   ```bash
   serverless deploy
   ```

---

## 🔧 Post-Deployment Configuration

After deploying to any platform:

### 1. Update Frontend Production Config

Edit `frontend/.env.production`:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://mhltdqarqjngztiiiibk.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_MJhh7WtpbcyWaPoTAphMiA_dUyD2jSg

# Chatbot Configuration (Production)
VITE_GEMINI_ENABLED=true
VITE_API_URL=https://YOUR-BACKEND-URL.com/api  # ← Update this!
```

### 2. Update Backend CORS Settings

Make sure `backend/server.js` allows your GitHub Pages domain:

```javascript
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200,
};
```

Your `FRONTEND_URL` environment variable should be set to:
```
https://jeffbai996.github.io
```

### 3. Rebuild and Deploy Frontend

```bash
cd frontend
npm run build
git add .
git commit -m "Enable Gemini AI with deployed backend"
git push
```

---

## 🧪 Testing Production Deployment

1. **Test backend directly:**
   ```bash
   curl https://your-backend-url.com/health
   ```

   Should return:
   ```json
   {
     "status": "ok",
     "service": "praya-chatbot-backend",
     "timestamp": "2025-12-02T10:00:00.000Z",
     "uptime": 123
   }
   ```

2. **Test Gemini endpoint:**
   ```bash
   curl -X POST https://your-backend-url.com/api/gemini/chat \
     -H "Content-Type: application/json" \
     -d '{"message":"What are your hours?","departmentContext":[]}'
   ```

3. **Test on GitHub Pages:**
   - Visit https://jeffbai996.github.io
   - Open browser console (F12)
   - Ask a complex question
   - Look for: `"Using Gemini AI for complex query"`

---

## 💰 Cost Estimation

### Free Tier Comparison

| Platform | Free Tier | Best For |
|----------|-----------|----------|
| **Vercel** | 100GB bandwidth/month, serverless | Quick deployment |
| **Railway** | $5 credit (then ~$5/month) | Small-medium traffic |
| **Render** | 750 hours/month (with cold starts) | Low-moderate traffic |
| **AWS Lambda** | 1M requests/month, 400K GB-seconds | Pay-per-use |

### Expected Costs (assuming 10,000 AI queries/month)

- **Gemini API**: ~$4/month (free tier: 1,500 queries/day)
- **Backend Hosting**: $0-5/month (depends on platform)
- **Total**: ~$4-9/month

Most small sites stay within free tiers.

---

## 🔒 Security Checklist

Before going to production:

- [x] API key stored in environment variables (not in code)
- [x] CORS configured for your domain only
- [x] Rate limiting enabled (10 req/min per IP)
- [x] Input validation and sanitization
- [ ] HTTPS enabled on backend (automatic on most platforms)
- [ ] Monitor rate limits and usage
- [ ] Set up error alerting (optional but recommended)

---

## 📊 Monitoring

### Check Rate Limit Status

```bash
curl https://your-backend-url.com/api/gemini/status
```

### Enable Logging (Optional)

For production monitoring, consider:
- **Sentry** - Error tracking
- **LogRocket** - Session replay
- **Datadog** - Performance monitoring

---

## 🆘 Troubleshooting

### "Failed to fetch" errors on GitHub Pages

**Cause:** CORS not configured properly

**Fix:** Ensure `FRONTEND_URL` in backend includes `https://jeffbai996.github.io`

### "Rate limit exceeded" in production

**Cause:** Too many requests from single user/IP

**Fix:** Either increase limits or upgrade Gemini to paid tier

### Cold starts on free tiers

**Cause:** Server spins down after inactivity (Render free tier)

**Fix:** Accept slight delay, or upgrade to paid tier, or use Vercel serverless

### Gemini API key invalid

**Cause:** Key not set properly or expired

**Fix:** Regenerate key in Google AI Studio and update environment variable

---

## 📝 Quick Start (TL;DR)

1. **Choose a platform** (Recommended: Vercel)
2. **Deploy backend** with environment variables
3. **Get deployment URL**
4. **Update `frontend/.env.production`:**
   ```env
   VITE_GEMINI_ENABLED=true
   VITE_API_URL=https://your-backend-url.com/api
   ```
5. **Rebuild frontend:** `npm run build`
6. **Push to GitHub**
7. **Test on jeffbai996.github.io**

---

## 🎯 Recommended: Vercel Deployment

For the fastest setup, I recommend **Vercel**:

1. **One-command setup:**
   ```bash
   cd backend
   npx vercel
   ```

2. **Add secrets in dashboard:**
   - `GEMINI_API_KEY`
   - `FRONTEND_URL`

3. **Update frontend and deploy**

Total setup time: ~5 minutes ⚡

---

## Questions?

See the main [GEMINI_INTEGRATION_GUIDE.md](./GEMINI_INTEGRATION_GUIDE.md) for more details about the integration architecture.
