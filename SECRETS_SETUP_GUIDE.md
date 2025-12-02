# GitHub Secrets Setup Guide

This guide will help you configure the required GitHub Secrets for the chat widget to work properly.

## 🔐 Required Secrets

You need to set up **3 secrets** in your GitHub repository:

1. `VITE_GEMINI_API_KEY` - Google Gemini AI API key
2. `VITE_SUPABASE_URL` - Supabase project URL
3. `VITE_SUPABASE_ANON_KEY` - Supabase anonymous/public key

---

## 📝 Step-by-Step Instructions

### Step 1: Access GitHub Secrets Settings

1. Go to your repository: https://github.com/jeffbai996/jeffbai996.github.io
2. Click on **Settings** (top menu)
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. You should see a list of repository secrets

### Step 2: Get Your Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Create API Key"** or **"Get API Key"**
4. Copy the generated API key (starts with `AIza...`)
5. **IMPORTANT:** Add HTTP referrer restrictions:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Navigate to **APIs & Services** → **Credentials**
   - Find your API key and click **Edit**
   - Under **Application restrictions**:
     - Select **"HTTP referrers (web sites)"**
     - Click **"Add an item"**
     - Enter: `https://jeffbai996.github.io/*`
   - Click **Save**

### Step 3: Get Your Supabase Credentials

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project (or create a new one)
3. Click on **Settings** (gear icon in sidebar)
4. Click on **API** in the settings menu
5. You'll see two values:
   - **Project URL** - Copy this (e.g., `https://xxxxx.supabase.co`)
   - **Project API keys** → **anon public** - Copy this key

### Step 4: Add Secrets to GitHub

For each secret:

1. In GitHub Settings → Secrets → Actions, click **"New repository secret"**
2. Enter the **Name** and **Secret** value:

   **Secret 1: Gemini API Key**
   - Name: `VITE_GEMINI_API_KEY`
   - Secret: `AIza...` (your Gemini API key)

   **Secret 2: Supabase URL**
   - Name: `VITE_SUPABASE_URL`
   - Secret: `https://xxxxx.supabase.co` (your Supabase project URL)

   **Secret 3: Supabase Anon Key**
   - Name: `VITE_SUPABASE_ANON_KEY`
   - Secret: `eyJ...` (your Supabase anon key - long JWT token)

3. Click **"Add secret"** for each one

### Step 5: Verify Secrets are Set

After adding all three secrets, you should see them listed:

```
✓ VITE_GEMINI_API_KEY          Updated X minutes ago
✓ VITE_SUPABASE_URL            Updated X minutes ago
✓ VITE_SUPABASE_ANON_KEY       Updated X minutes ago
```

---

## 🚀 Testing the Setup

### Method 1: Trigger a New Build

1. Push a commit to the `main` branch (or manually trigger the workflow)
2. Go to **Actions** tab in your repository
3. Watch the **"Deploy to GitHub Pages"** workflow run
4. In the workflow logs, look for:
   - ✅ "Validate environment variables" step should pass
   - ✅ All three variables should show as "SET"

### Method 2: Check the Build Output

After the workflow completes:

1. Visit your site: https://jeffbai996.github.io/
2. Open the chat widget
3. Open browser DevTools (F12) → Console
4. You should see:
   - ✅ "Gemini API initialized successfully"
   - ✅ NO warnings about "API key not configured"
   - ✅ NO warnings about "Supabase is not configured"

### Method 3: Test Chat Functionality

1. Open the chat widget on your site
2. Try asking a complex question like:
   - "What's the difference between a passport and a national ID?"
3. The bot should respond using Gemini AI
4. Check the console for any errors

---

## 🔍 Troubleshooting

### ❌ "Validation failed: VITE_GEMINI_API_KEY is required but not set"

**Problem:** The secret is not set in GitHub or has the wrong name.

**Solution:**
1. Go to Settings → Secrets → Actions
2. Verify the secret name is exactly `VITE_GEMINI_API_KEY` (case-sensitive)
3. Make sure the secret has a value (not empty)

### ❌ "Gemini API key not configured"

**Problem:** The API key is not being injected during build.

**Solution:**
1. Check that the secret is set in GitHub
2. Re-run the GitHub Actions workflow
3. Check workflow logs for errors

### ❌ "Supabase is not configured"

**Problem:** Supabase secrets are not set or invalid.

**Solution:**
1. Verify `VITE_SUPABASE_URL` is set and starts with `https://`
2. Verify `VITE_SUPABASE_ANON_KEY` is set and looks like a JWT token (starts with `eyJ`)
3. Check your Supabase dashboard to confirm project is active

### ⚠️ "API quota exceeded"

**Problem:** You've exceeded Google's free tier limits.

**Solution:**
1. Wait for the rate limit to reset (15 requests/minute, 1,500/day)
2. Consider upgrading to a paid tier
3. The bot will fall back to rule-based responses

### 🔒 "API key restrictions" errors

**Problem:** HTTP referrer restrictions are blocking requests.

**Solution:**
1. Go to Google Cloud Console → API Key settings
2. Make sure you added: `https://jeffbai996.github.io/*`
3. Don't use `http://` (must be `https://`)
4. Wait a few minutes for changes to propagate

---

## 🛡️ Security Best Practices

### ✅ DO:
- Keep HTTP referrer restrictions enabled on your Gemini API key
- Enable Row Level Security (RLS) policies in Supabase
- Monitor API usage in Google Cloud Console
- Rotate keys periodically
- Use Supabase RLS to protect database access

### ❌ DON'T:
- Never commit `.env` files to Git
- Never share your API keys publicly
- Never disable HTTP referrer restrictions
- Never expose your Supabase service_role key (only use anon key in frontend)

---

## 📊 Monitoring

### Google Cloud Console
1. Go to: https://console.cloud.google.com/
2. Select your project
3. Navigate to **APIs & Services** → **Dashboard**
4. Check **Generative Language API** usage
5. Set up alerts for unusual activity

### Supabase Dashboard
1. Go to your project dashboard
2. Check **Database** → **API logs**
3. Monitor request counts and errors
4. Check **Auth** → **Users** for authentication activity

---

## 🔄 Updating Secrets

To update a secret:

1. Go to Settings → Secrets → Actions
2. Click on the secret name
3. Click **"Update secret"**
4. Enter the new value
5. Click **"Update secret"**
6. Re-run the GitHub Actions workflow

---

## ✅ Checklist

Before deploying, make sure:

- [ ] All 3 secrets are set in GitHub
- [ ] Gemini API key has HTTP referrer restrictions
- [ ] Supabase project is active
- [ ] GitHub Actions workflow runs successfully
- [ ] Chat widget initializes without errors
- [ ] Both text and voice chat work correctly
- [ ] No API key warnings in browser console

---

## 🆘 Need Help?

If you're still having issues:

1. Check the full audit report: `SECRETS_AUDIT_REPORT.md`
2. Review GitHub Actions workflow logs
3. Check browser console for specific error messages
4. Verify API keys are valid in their respective dashboards
5. Ensure Supabase Row Level Security policies allow public access where needed

---

## 📚 Related Documentation

- [SECRETS_AUDIT_REPORT.md](./SECRETS_AUDIT_REPORT.md) - Full security audit
- [GEMINI_INTEGRATION_GUIDE.md](./GEMINI_INTEGRATION_GUIDE.md) - Gemini API setup
- [GitHub Actions Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Google Cloud API Keys](https://cloud.google.com/docs/authentication/api-keys)
- [Supabase API Settings](https://supabase.com/docs/guides/api)
