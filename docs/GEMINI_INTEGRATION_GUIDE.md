# Google Gemini 2.0 API Integration Guide

This guide explains how the chatbot integrates with Google Gemini 2.0 Flash API directly from the frontend, without requiring a backend server.

## Overview

The chatbot uses a **hybrid approach**:

1. **Rule-based system** (primary): Fast, pattern-matching responses for common government service queries
2. **Gemini 2.0 Flash AI** (fallback): Intelligent responses for complex, ambiguous, or multi-part queries

This approach ensures:
- ⚡ Fast responses for common queries
- 🤖 Smart AI assistance for complex questions
- 💰 Cost-effective (only uses AI when needed)
- 🔄 Graceful fallback if AI is unavailable
- 🚀 **No backend server required** - runs entirely on GitHub Pages

## Architecture

```
User Query
    ↓
Input Validation (profanity, gibberish)
    ↓
Intent Classification (rule-based)
    ↓
Fallback Detection
    ├─→ High Confidence → Rule-based Response
    │
    └─→ Low Confidence/Complex → Check Triggers
                                      ↓
                                  Direct Gemini API Call (Frontend)
                                      ↓
                                  Stream Response
                                      ↓
                                  (If fails → Rule-based Fallback)
```

## When Gemini AI is Used

The chatbot automatically uses Gemini 2.0 Flash when it detects:

### 1. Low Confidence Matches
- Intent classifier confidence < 60%
- No clear pattern match in rule database

### 2. Repeated Clarification Attempts
- User has asked for clarification 2+ times
- Same query rephrased multiple times

### 3. Complex Query Patterns
- Multiple services mentioned ("I need both X and Y")
- Comparison questions ("What's the difference between...")
- Process questions ("How does X work?", "Explain the process")
- Step-by-step requests

### 4. User Frustration
- Keywords: "frustrated", "not helping", "doesn't work", "already tried"
- Multiple failed attempts to get information

### 5. Explicit Help Requests
- "Tell me more", "explain better", "need more information"
- "I don't understand"

## Setup Instructions

### 1. Get Your Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

### 2. Configure GitHub Secrets

For production deployment on GitHub Pages, you need to set the API key as a GitHub Secret:

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add the following secret:
   - **Name**: `VITE_GEMINI_API_KEY`
   - **Value**: Your Gemini API key

### 3. Secure Your API Key (Recommended)

To prevent unauthorized use of your API key, add domain restrictions:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** → **Credentials**
3. Find your API key and click **Edit**
4. Under **Application restrictions**:
   - Select "HTTP referrers (web sites)"
   - Add your GitHub Pages domain: `https://<username>.github.io/*`
5. Click **Save**

This ensures the API key only works from your GitHub Pages site.

### 4. Local Development Setup

For local development:

1. Copy the example environment file:
   ```bash
   cd frontend
   cp .env.example .env
   ```

2. Edit `.env` and add your API key:
   ```env
   VITE_GEMINI_API_KEY=your_api_key_here
   VITE_GEMINI_ENABLED=true
   ```

3. Install dependencies and run:
   ```bash
   npm install
   npm run dev
   ```

### 5. Deployment

The GitHub Actions workflow automatically injects the API key during build:

```yaml
- name: Build frontend
  working-directory: ./frontend
  run: npm run build
  env:
    VITE_GEMINI_ENABLED: true
    VITE_GEMINI_API_KEY: ${{ secrets.VITE_GEMINI_API_KEY }}
```

Simply push to the main branch to trigger deployment:

```bash
git add .
git commit -m "Enable Gemini AI integration"
git push origin main
```

## How It Works

### Frontend Service (`frontend/src/services/geminiService.js`)

The Gemini service handles direct API calls from the frontend:

```javascript
import { GoogleGenerativeAI } from '@google/generative-ai';

class GeminiService {
  constructor() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({
      model: 'gemini-2.0-flash-exp',
      // ... configuration
    });
  }

  async generateResponse(userMessage, relevantDepartments, conversationHistory) {
    // Build context and send to Gemini API
    // Returns AI-generated response
  }
}
```

### ChatWidget Integration (`frontend/src/components/ChatWidget.jsx`)

The chat widget calls the Gemini service when needed:

```javascript
import geminiService from '../services/geminiService';

async function callGeminiAPI(message, messages) {
  const relevantDepartments = // ... filter departments by keywords
  const history = messages.slice(-10);

  const result = await geminiService.generateResponse(
    message,
    relevantDepartments,
    history
  );

  return result.response;
}
```

## Model Configuration

**Model**: `gemini-2.0-flash-exp` (Free tier available)

**Generation Parameters**:
- **Temperature**: 0.7 (Balanced creativity/factuality)
- **Max Output Tokens**: 500 (Concise responses)
- **Top P**: 0.95
- **Top K**: 40

**Safety Settings**: Medium and above blocking for:
- Harassment
- Hate speech
- Sexually explicit content
- Dangerous content

## Rate Limits

**Google Gemini Free Tier**:
- 15 requests per minute
- 1,500 requests per day
- 1 million tokens per day

The chatbot's hybrid approach helps stay within these limits by using Gemini only when necessary.

## Testing

### Test the Integration Locally

1. Start the development server:
   ```bash
   cd frontend
   npm run dev
   ```

2. Open the chatbot and try these test queries:
   - **Rule-based** (fast): "I need a passport"
   - **Complex** (uses AI): "What's the difference between a national ID and passport?"
   - **Multi-part** (uses AI): "I need both a passport and driver's license, what's the process?"

3. Check the browser console for logs:
   - "Using Gemini AI for complex query" - AI is being used
   - Response should stream character by character

### Test on GitHub Pages

After deployment:
1. Visit your GitHub Pages site
2. Open the chatbot
3. Try the same test queries
4. Verify AI responses work in production

## Troubleshooting

### "Gemini API key not configured"

**Cause**: API key is missing or invalid

**Solutions**:
- Check that `VITE_GEMINI_API_KEY` is set in GitHub Secrets
- For local dev, check your `.env` file
- Ensure the API key is valid (test at [AI Studio](https://aistudio.google.com/))

### "API quota exceeded"

**Cause**: Too many requests to Gemini API

**Solutions**:
- Wait for the rate limit to reset (1 minute)
- Reduce the number of test queries
- Consider upgrading to paid tier for higher limits

### "Response blocked due to safety filters"

**Cause**: Gemini's safety filters blocked the response

**Solutions**:
- Rephrase the query to be less ambiguous
- The chatbot will automatically fall back to rule-based responses

### Chatbot always uses rule-based responses

**Cause**: Gemini is disabled or unavailable

**Check**:
1. Browser console for initialization errors
2. `VITE_GEMINI_ENABLED=true` in environment
3. API key is valid and has correct permissions
4. Domain restrictions allow your site

## Security Best Practices

### ✅ DO:
- Store API key in GitHub Secrets for production
- Add domain restrictions in Google Cloud Console
- Use `.gitignore` to exclude `.env` files
- Monitor API usage in Google Cloud Console
- Use the free tier for small-scale deployments

### ❌ DON'T:
- Commit API keys to Git
- Share API keys publicly
- Skip domain restrictions
- Expose the API key in client-side code (it's injected at build time)

## Cost Considerations

**Free Tier**: Sufficient for most personal/educational projects
- 15 requests/minute
- 1,500 requests/day

**Paid Tier**: For production applications with high traffic
- Pay-per-token pricing
- Higher rate limits
- See [Gemini Pricing](https://ai.google.dev/pricing)

The hybrid approach minimizes costs by:
- Using rule-based responses for common queries
- Only calling Gemini for complex questions
- Keeping responses concise (max 500 tokens)

## Support

For issues or questions:
1. Check the [troubleshooting section](#troubleshooting)
2. Review [Google Gemini documentation](https://ai.google.dev/docs)
3. Open an issue on the GitHub repository

## Further Reading

- [Google Gemini API Documentation](https://ai.google.dev/docs)
- [Gemini Safety Settings](https://ai.google.dev/docs/safety_setting_gemini)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [GitHub Actions Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
