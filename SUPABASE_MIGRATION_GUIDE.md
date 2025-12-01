# Supabase Migration Guide - PrayaPass Authentication

This guide will walk you through migrating from the current backend-dependent authentication to a free, serverless Supabase setup.

---

## 📋 Overview

**What you're getting**:
- ✅ Free authentication (forever)
- ✅ PostgreSQL database (500MB free)
- ✅ No backend code to maintain
- ✅ Works 100% with GitHub Pages
- ✅ Built-in email verification
- ✅ Advanced security features

**What we're removing**:
- ❌ Node.js backend (`backend/` directory)
- ❌ External deployment (Railway/Render/Vercel)
- ❌ In-memory storage (everything persists now!)

---

## 🚀 Step 1: Create Supabase Project (5 minutes)

### 1.1 Sign Up for Supabase

1. Go to https://supabase.com
2. Click **"Start your project"**
3. Sign up with GitHub (recommended) or email
4. It's **100% free** - no credit card required

### 1.2 Create a New Project

1. Click **"New Project"**
2. Choose your organization (or create one)
3. Fill in project details:
   - **Name**: `prayapass` (or your choice)
   - **Database Password**: Generate a strong password (save it!)
   - **Region**: Choose closest to your users
   - **Pricing Plan**: Free (default)
4. Click **"Create new project"**
5. Wait 1-2 minutes for project to initialize

### 1.3 Get Your API Credentials

1. Go to **Settings** (gear icon) → **API**
2. Copy these values (you'll need them):
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon/public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

---

## 🗄️ Step 2: Set Up Database Schema (10 minutes)

### 2.1 Create Users Table Extensions

Supabase comes with a built-in `auth.users` table, but we need additional fields for PrayaPass.

1. Go to **SQL Editor** in Supabase dashboard
2. Click **"New Query"**
3. Paste the SQL from `supabase-schema.sql` (in this repo)
4. Click **"Run"**

**What this creates**:
- Extended user profile table (`public.user_profiles`)
- Automatic profile creation trigger
- Row Level Security (RLS) policies
- Indexes for performance

### 2.2 Configure Email Templates (Optional)

1. Go to **Authentication** → **Email Templates**
2. Customize the confirmation email
3. Update branding to match PrayaPass

---

## 💻 Step 3: Update Frontend Code (DONE ✅)

The code has been migrated for you! Here's what changed:

### 3.1 Dependencies Added

```json
{
  "@supabase/supabase-js": "^2.39.0"
}
```

### 3.2 Files Modified

- `frontend/src/utils/AuthContext.jsx` - Now uses Supabase
- `frontend/src/pages/auth/Register.jsx` - Simplified (Supabase handles OTP)
- `frontend/src/pages/auth/Login.jsx` - Removed 2FA complexity
- `frontend/src/utils/supabaseClient.js` - New Supabase client
- `frontend/.env.example` - Updated with Supabase variables

### 3.3 Files Removed

- Backend directory (no longer needed!)
- Backend deployment docs

---

## ⚙️ Step 4: Configure Environment Variables

### 4.1 Development Environment

Create `frontend/.env` (for local development):

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### 4.2 Production Environment (GitHub Pages)

Create `frontend/.env.production`:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

**Important**:
- Replace `YOUR_PROJECT_ID` with your actual project ID
- Replace `your_anon_key_here` with your actual anon key
- The anon key is **safe to expose** (it's public by design)

---

## 🔧 Step 5: Configure Supabase Settings

### 5.1 Authentication Settings

1. Go to **Authentication** → **Settings**
2. Configure:
   - **Site URL**: `https://jeffbai996.github.io`
   - **Redirect URLs**: Add `https://jeffbai996.github.io/**`
   - **Email confirmation**: Enabled (default)
   - **Secure email change**: Enabled (recommended)

### 5.2 Email Provider (Optional - for production)

By default, Supabase uses a rate-limited email service.

For production, integrate a real email provider:
1. Go to **Authentication** → **Settings** → **SMTP Settings**
2. Add your SMTP credentials (SendGrid, AWS SES, etc.)

**For now**: Use Supabase's built-in email (3 emails/hour limit in free tier)

---

## 🧪 Step 6: Test the Migration

### 6.1 Local Testing

```bash
cd frontend
npm install
npm run dev
```

Visit http://localhost:5173

### 6.2 Test Registration

1. Go to `/register`
2. Fill in the form
3. Submit
4. Check your email for confirmation link
5. Click confirmation link
6. Verify you're logged in

### 6.3 Test Login

1. Go to `/login`
2. Enter credentials
3. Verify successful login

### 6.4 Check Database

1. Go to **Table Editor** in Supabase
2. Open `auth.users` - see your registered user
3. Open `user_profiles` - see extended profile data

---

## 📦 Step 7: Deploy to GitHub Pages

### 7.1 Build Frontend

```bash
cd frontend
npm run build
```

### 7.2 Commit Changes

```bash
git add .
git commit -m "Migrate to Supabase authentication"
git push
```

### 7.3 Create Pull Request

1. Go to GitHub repository
2. Create PR from your branch to `main`
3. Review changes
4. Merge when ready

### 7.4 Verify Deployment

1. Wait for GitHub Actions to complete
2. Visit https://jeffbai996.github.io
3. Test registration and login

---

## 🎯 What's Different Now?

### Before (Backend-Dependent)

```
User Registration Flow:
1. Frontend → Backend API (Railway/Render)
2. Backend generates OTP → Logs to console
3. User enters OTP
4. Backend stores in memory Map
5. ❌ Data lost on restart
```

### After (Supabase)

```
User Registration Flow:
1. Frontend → Supabase API (automatic)
2. Supabase generates magic link → Sends real email
3. User clicks email link
4. Supabase stores in PostgreSQL
5. ✅ Data persists forever
```

---

## 🔒 Security Improvements

### What Supabase Adds:

1. **Row Level Security (RLS)**
   - Users can only access their own data
   - Enforced at database level

2. **Secure by Default**
   - Automatic password hashing (bcrypt)
   - JWT tokens with automatic refresh
   - Email verification built-in

3. **Rate Limiting**
   - Automatic DDoS protection
   - Brute force prevention

4. **Audit Logs**
   - Track all authentication events
   - Available in Supabase dashboard

---

## 💰 Cost Breakdown

### Free Tier Includes:

| Feature | Limit |
|---------|-------|
| **Database** | 500 MB |
| **Storage** | 1 GB |
| **Bandwidth** | 2 GB/month |
| **Monthly Active Users** | Unlimited |
| **API Requests** | Unlimited |
| **Edge Functions** | 500K invocations/month |
| **Realtime Connections** | 200 concurrent |

**Cost**: $0/month forever (unless you exceed limits)

**Upgrade Path**: If you grow beyond free tier, Pro plan is $25/month

---

## 🐛 Troubleshooting

### Issue: "Invalid API key"

**Solution**:
1. Check your `.env` file
2. Make sure you copied the **anon/public** key, not the service role key
3. Restart dev server after changing .env

### Issue: "Email not being sent"

**Solution**:
1. Check spam folder
2. Verify email in Supabase dashboard (Auth → Users)
3. For production, set up SMTP provider

### Issue: "User already registered"

**Solution**:
1. Go to Supabase dashboard
2. Navigate to **Authentication** → **Users**
3. Delete the test user
4. Try again

### Issue: "RLS policy error"

**Solution**:
1. Go to **Table Editor** → `user_profiles`
2. Click **"RLS"** tab
3. Make sure policies are enabled
4. Re-run the SQL schema if needed

---

## 🎓 Next Steps

### Immediate (Do Now):

1. [ ] Create Supabase project
2. [ ] Run SQL schema
3. [ ] Update .env files
4. [ ] Test locally
5. [ ] Deploy to production

### Optional Enhancements:

1. [ ] Add OAuth providers (Google, GitHub)
2. [ ] Implement phone number verification
3. [ ] Add custom email templates
4. [ ] Set up SMTP for production emails
5. [ ] Add user profile photos (Supabase Storage)
6. [ ] Implement 2FA with TOTP

---

## 📚 Additional Resources

- **Supabase Docs**: https://supabase.com/docs
- **Auth Guide**: https://supabase.com/docs/guides/auth
- **JavaScript Client**: https://supabase.com/docs/reference/javascript
- **Row Level Security**: https://supabase.com/docs/guides/auth/row-level-security
- **Community**: https://github.com/supabase/supabase/discussions

---

## ❓ FAQ

**Q: Is Supabase really free forever?**
A: Yes, the free tier is permanent. They make money from larger customers on paid plans.

**Q: Can I self-host Supabase?**
A: Yes! Supabase is open source. But the hosted version is easier.

**Q: What happens if I exceed free tier limits?**
A: Your app will still work, but new requests may be throttled. You'll get email notifications.

**Q: Can I export my data?**
A: Yes! It's PostgreSQL. Use standard pg_dump or export via dashboard.

**Q: Do I need to learn SQL?**
A: No! The JavaScript client handles everything. SQL is only for initial setup.

---

## ✅ Migration Checklist

- [ ] Created Supabase project
- [ ] Copied API credentials
- [ ] Ran SQL schema
- [ ] Updated .env files
- [ ] Installed dependencies (`npm install`)
- [ ] Tested registration locally
- [ ] Tested login locally
- [ ] Configured Site URL
- [ ] Built production (`npm run build`)
- [ ] Deployed to GitHub Pages
- [ ] Tested production deployment
- [ ] Removed backend directory
- [ ] Updated README

---

**Need Help?** Check the Supabase documentation or create an issue in this repo.

**Estimated Total Time**: 30-60 minutes (including testing)

🎉 **Welcome to serverless authentication!**
