# Chat Widget Secrets Configuration Audit Report

**Date:** December 2, 2025
**Audited By:** Claude Code
**Status:** ⚠️ **CRITICAL ISSUES FOUND**

## Executive Summary

The chat widget code has **critical security and configuration issues** that prevent GitHub secrets from working correctly. While the GitHub Actions workflow is configured with secrets, there are fundamental problems with how the application is built and deployed.

---

## 🔴 Critical Issues Found

### 1. **SECRETS ARE EXPOSED IN CLIENT-SIDE CODE** ⚠️

**Problem:** When Vite builds the application, it **replaces** `import.meta.env.VITE_*` variables with their actual values at build time. This means API keys are **hardcoded** into the JavaScript bundles that are deployed to GitHub Pages.

**Evidence:**
- File: `assets/index-yanMzDeX.js` (and other compiled bundles)
- The compiled JavaScript contains the actual secret values embedded in the code
- Anyone can view the page source and extract these keys

**Impact:**
- **HIGH SEVERITY** - API keys are publicly accessible
- Anyone can steal and abuse your Gemini API key
- Potential for unauthorized API usage and billing

---

### 2. **Supabase is NOT Configured** ❌

**Problem:** The Supabase environment variables are not being injected during the build process.

**Evidence from compiled code:**
```javascript
console.warn("Supabase is not configured. Authentication features will be disabled."),
console.warn("To enable authentication, set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.");
const Up=null,
```

**Root Cause:** Looking at `.github/workflows/deploy.yml` lines 43-48:
```yaml
env:
  NODE_ENV: production
  VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
  VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
  VITE_GEMINI_ENABLED: true
  VITE_GEMINI_API_KEY: ${{ secrets.VITE_GEMINI_API_KEY }}
```

**Issue:** The secrets are defined in the workflow, but:
1. They may not be set in GitHub repository settings
2. The build may be failing silently if secrets are empty
3. There's no validation to check if secrets were successfully injected

---

### 3. **Insecure Architecture for Static Site** 🔓

**Problem:** A static GitHub Pages site with client-side API calls is fundamentally insecure for protecting API keys.

**Why this doesn't work:**
- GitHub Pages only serves static files (HTML, CSS, JS)
- All JavaScript runs in the browser (client-side)
- There's no backend to hide secrets
- Even with "secrets", they end up in the compiled JavaScript

**Current Architecture:**
```
User Browser
    ↓
Static HTML/JS (with hardcoded API keys)
    ↓
Direct API calls to Gemini/Supabase
```

---

## ✅ What's Working

1. **GitHub Actions Workflow Setup** - The workflow file correctly references secrets
2. **Environment Variable Pattern** - Code correctly uses `import.meta.env.VITE_*`
3. **`.gitignore` Configuration** - Properly excludes `.env` files
4. **Supabase Client Code** - Properly structured with fallbacks

---

## 📋 Detailed Findings

### GitHub Actions Configuration

**File:** `.github/workflows/deploy.yml`

✅ **Correct:**
- Secrets are referenced using `${{ secrets.SECRET_NAME }}`
- Environment variables are set during the build step
- Workflow has proper permissions

❌ **Issues:**
- No validation that secrets are not empty
- No error handling if secrets are missing
- Build continues even if secrets are undefined

### Frontend Code

**File:** `frontend/src/services/geminiService.js`

✅ **Correct:**
- Uses `import.meta.env.VITE_GEMINI_API_KEY`
- Has fallback logic if key is missing
- Validates key is not placeholder value

❌ **Issues:**
- No runtime checks for key validity
- API key is embedded in compiled bundle

**File:** `frontend/src/services/geminiLiveService.js`

✅ **Correct:**
- Uses `import.meta.env.VITE_GEMINI_API_KEY`

❌ **Issues:**
- Same as geminiService.js
- No WebSocket connection validation

**File:** `frontend/src/utils/supabaseClient.js`

✅ **Correct:**
- Checks if Supabase is configured
- Provides graceful fallback if not configured
- Exports `isSupabaseConfigured` flag

❌ **Issues:**
- Currently shows as NOT configured in production build
- Secrets may not be set in GitHub

### Compiled Artifacts

**Files:** `assets/*.js`

⚠️ **Critical Findings:**
- Environment variables are replaced with actual values during build
- Secrets become hardcoded in JavaScript bundles
- JavaScript files are publicly accessible on GitHub Pages

---

## 🛠️ Recommendations

### Immediate Actions (Security)

1. **Rotate all exposed API keys immediately**
   - Generate new Gemini API key at https://aistudio.google.com/
   - Generate new Supabase keys at your Supabase dashboard
   - Update GitHub Secrets with new values

2. **Add API key restrictions**
   - **Gemini API Key:** Add HTTP referrer restrictions in Google Cloud Console
     - Go to: https://console.cloud.google.com/ → APIs & Services → Credentials
     - Edit your API key
     - Under "Application restrictions": Select "HTTP referrers"
     - Add: `https://jeffbai996.github.io/*`
   - **Supabase:** The anon key is designed to be public, but ensure Row Level Security (RLS) policies are enabled

3. **Verify GitHub Secrets are set**
   - Go to: Repository Settings → Secrets and variables → Actions
   - Ensure these secrets exist and have values:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`
     - `VITE_GEMINI_API_KEY`

### Short-term Solutions

1. **Add build validation**
   - Add a pre-build script to check if environment variables are set
   - Fail the build if required secrets are missing

2. **Monitor API usage**
   - Enable alerts in Google Cloud Console for unusual API usage
   - Monitor Supabase dashboard for unexpected traffic

3. **Document the security model**
   - Add README section explaining that API keys are public
   - Explain why HTTP referrer restrictions are critical

### Long-term Solutions (Proper Architecture)

For a production application, you need a backend to proxy API calls:

**Option 1: Serverless Functions (Recommended)**
```
User Browser → Netlify/Vercel Function → Gemini API
                 ↑
            (Secrets stored here)
```

**Option 2: Backend Server**
```
User Browser → Express/Node.js Backend → Gemini API
                     ↑
                (Secrets stored here)
```

**Option 3: Firebase/Supabase Edge Functions**
```
User Browser → Supabase Edge Function → Gemini API
                      ↑
                (Secrets stored here)
```

---

## 🔍 Verification Steps

To verify the current status:

1. **Check if secrets are set in GitHub:**
   ```
   Go to: https://github.com/jeffbai996/jeffbai996.github.io/settings/secrets/actions
   ```

2. **Check compiled JavaScript for secrets:**
   ```bash
   strings assets/index-yanMzDeX.js | grep -E "(supabase\.co|AIza)"
   ```

3. **Test the chat widget:**
   - Open https://jeffbai996.github.io/
   - Open browser DevTools (F12) → Console
   - Look for warnings about missing API keys
   - Try using the chat widget and check for errors

4. **Monitor API usage:**
   - Google Cloud Console: Check Gemini API usage
   - Supabase Dashboard: Check requests and errors

---

## 📝 Next Steps

1. ✅ **Verify secrets are set in GitHub** (Priority 1)
2. ✅ **Add HTTP referrer restrictions** (Priority 1)
3. ✅ **Rotate any exposed keys** (Priority 1)
4. ⏸️ **Add build validation** (Priority 2)
5. ⏸️ **Consider backend architecture** (Priority 3)

---

## 🎯 Conclusion

**Current Status:** The GitHub Actions workflow is correctly configured to inject secrets during build, but:

1. **Supabase secrets are not working** - likely not set in GitHub or build is failing
2. **API keys are exposed in client-side code** - this is unavoidable with the current static site architecture
3. **HTTP referrer restrictions are CRITICAL** - without them, anyone can steal and abuse your API keys

**Recommended Immediate Action:**
1. Verify and set all GitHub Secrets
2. Add HTTP referrer restrictions to Gemini API key
3. Re-run the GitHub Actions workflow
4. Test the chat widget functionality

**Long-term:** Consider migrating to a proper backend architecture with serverless functions to truly protect API keys.

---

## 📚 References

- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [GitHub Actions Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Google Cloud API Key Restrictions](https://cloud.google.com/docs/authentication/api-keys#api_key_restrictions)
- [Supabase Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
