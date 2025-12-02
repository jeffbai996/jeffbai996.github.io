# Google Gemini 2.0 API Integration Guide

This guide explains how the chatbot integrates with Google Gemini 2.0 Flash API to provide intelligent responses for complex queries.

## Overview

The chatbot uses a **hybrid approach**:

1. **Rule-based system** (primary): Fast, pattern-matching responses for common government service queries
2. **Gemini 2.0 Flash AI** (fallback): Intelligent responses for complex, ambiguous, or multi-part queries

This approach ensures:
- ⚡ Fast responses for common queries
- 🤖 Smart AI assistance for complex questions
- 💰 Cost-effective (only uses AI when needed)
- 🔄 Graceful fallback if AI is unavailable

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
                                  Gemini API Call
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
- Multiple departments/services mentioned ("I need to report a crime AND apply for victim compensation")
- Comparison questions ("What's the difference between Form A and Form B?")
- Process explanations ("How does the passport renewal process work?")
- "I don't understand" / "confused" / "not sure"
- Requests for detailed/step-by-step information

### 4. User Frustration
- Keywords: "frustrated", "not helping", "useless", "doesn't work"
- "Already tried", "same thing", "not what I asked"

### 5. Explicit Help Requests
- "Tell me more", "explain better", "I need more information"

## Setup Instructions

### Step 1: Get Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy the API key (starts with `AIza...`)

### Step 2: Configure Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create `.env` file from example:
   ```bash
   cp .env.example .env
   ```

3. Edit `.env` and add your API key:
   ```env
   GEMINI_API_KEY=AIzaSy...your_actual_key_here
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```

4. Install dependencies (if not already done):
   ```bash
   npm install
   ```

5. Start the backend server:
   ```bash
   npm run dev
   ```

   You should see:
   ```
   🚀 Praya Chatbot Backend running on port 5000
   📡 Frontend URL: http://localhost:5173
   🤖 Gemini API Key: ✅ Configured
   ⚡ Environment: development
   ```

### Step 3: Configure Frontend

The frontend is already configured with environment variables. To verify:

1. Check `frontend/.env.example` has:
   ```env
   VITE_GEMINI_ENABLED=true
   VITE_API_URL=/api
   ```

2. If you have a custom `.env` file in `frontend/`, make sure it includes these variables.

### Step 4: Test the Integration

1. Start both backend and frontend:
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev

   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

2. Open the app at `http://localhost:5173`

3. Test with these queries:

   **Simple query (uses rule-based):**
   - "How do I apply for a passport?"
   - "What are your hours?"

   **Complex query (triggers Gemini):**
   - "Can you explain the difference between applying for a new passport versus renewing one, and what documents I need for each?"
   - "I need to report a crime but also need victim compensation and legal aid, where do I start?"

4. Open browser console (F12) - you'll see:
   - `"Using Gemini AI for complex query"` when AI is triggered
   - `"Gemini API unavailable, falling back to rule-based system"` if there's an error

## Rate Limits & Costs

### Free Tier Limits (Gemini 2.0 Flash)
- **15 requests per minute** (RPM)
- **1 million tokens per day**
- **1,500 requests per day**

### Backend Rate Limiting
- **10 requests per minute per IP** (conservative limit)
- Automatic rate limit tracking and error messages
- Graceful fallback to rule-based system when limit exceeded

### Token Usage
Typical query uses **500-800 tokens**:
- **Input:** ~400-600 tokens (includes conversation history + department context)
- **Output:** ~100-200 tokens (concise government service response)

At this rate, the free tier supports:
- **~1,800 AI-assisted conversations per day**
- Sufficient for moderate traffic

### Cost Estimation (if upgrading to paid)
- Gemini 2.0 Flash: **$0.075 per 1M input tokens**, **$0.30 per 1M output tokens**
- Average query cost: **~$0.0004** (less than 0.05¢)
- 1,000 AI queries: **~$0.40**
- Very affordable for most use cases

## Configuration Options

### Disable Gemini AI

To disable AI and use only rule-based responses:

**Frontend** (`frontend/.env`):
```env
VITE_GEMINI_ENABLED=false
```

The chatbot will work normally without any AI calls.

### Adjust Fallback Sensitivity

Edit `frontend/src/components/ChatWidget.jsx`, function `shouldUseGemini()`:

```javascript
// Make it MORE sensitive (use AI more often):
const lowConfidence = !intentResult || (intentResult.confidence && intentResult.confidence < 0.8)

// Make it LESS sensitive (use AI less often):
const lowConfidence = !intentResult || (intentResult.confidence && intentResult.confidence < 0.4)
```

### Change Response Length

Edit `backend/services/geminiService.js`:

```javascript
generationConfig: {
  temperature: 0.7,
  maxOutputTokens: 500, // Change this (100-8192)
}
```

- Lower = shorter, more concise responses
- Higher = more detailed, comprehensive responses

## Monitoring & Debugging

### Check Backend Status

```bash
curl http://localhost:5000/health
```

Response:
```json
{
  "status": "ok",
  "service": "praya-chatbot-backend",
  "timestamp": "2025-12-02T08:00:00.000Z",
  "uptime": 120
}
```

### Check Gemini Status

```bash
curl http://localhost:5000/api/gemini/status
```

Response:
```json
{
  "available": true,
  "model": "gemini-2.0-flash-exp",
  "rateLimit": {
    "requestsUsed": 3,
    "requestsRemaining": 12,
    "windowResetIn": 45
  }
}
```

### Test Gemini API Directly

```bash
curl -X POST http://localhost:5000/api/gemini/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What is the process for renewing a passport?",
    "departmentContext": []
  }'
```

### View Logs

Backend logs show:
- When Gemini is called
- Token usage per request
- Rate limit status
- Error messages

## Troubleshooting

### Issue: "Gemini API unavailable"

**Causes:**
1. Missing or invalid API key
2. Rate limit exceeded
3. Network issues

**Solutions:**
```bash
# Check if API key is set
cd backend
cat .env | grep GEMINI_API_KEY

# Restart backend
npm run dev

# Check logs for detailed error messages
```

### Issue: AI never triggers

**Causes:**
1. `VITE_GEMINI_ENABLED=false` in frontend
2. Queries are too simple (rule-based system handles them)

**Solutions:**
- Check frontend `.env` has `VITE_GEMINI_ENABLED=true`
- Try complex queries like "explain the difference between X and Y"
- Lower confidence threshold in `shouldUseGemini()`

### Issue: Rate limit errors

**Causes:**
- More than 10 requests/minute from single IP
- More than 15 requests/minute to Gemini API (global limit)

**Solutions:**
- Wait 1 minute for rate limit to reset
- Chatbot automatically falls back to rule-based system
- Consider caching common responses
- Upgrade to Gemini Pro for higher limits (if needed)

### Issue: Slow responses

**Causes:**
- Gemini API latency (typically 1-3 seconds)
- Large conversation history
- Complex department context

**Solutions:**
- This is normal for AI responses
- Users see streaming text (typing effect) for better UX
- Reduce `maxOutputTokens` for faster responses
- Limit conversation history to last 5 messages (already done)

## Best Practices

### For Development
1. **Start with Gemini disabled** to test rule-based system first
2. **Enable Gemini gradually** and monitor token usage
3. **Use browser console** to see when AI triggers
4. **Test edge cases** (long queries, special characters, etc.)

### For Production
1. **Monitor rate limits** using `/api/gemini/status` endpoint
2. **Set up error alerting** for API failures
3. **Cache common AI responses** to reduce API calls
4. **Consider upgrading** to paid tier if traffic increases
5. **Use environment variables** for all API keys (never hardcode)

### For Users
1. **Simple queries use instant responses** (rule-based)
2. **Complex queries may take 2-5 seconds** (AI processing)
3. **Users see typing animation** during AI response
4. **Fallback is automatic** if AI unavailable

## Security

✅ **API Key Protection:**
- Stored in backend `.env` file (never committed to git)
- Never exposed to frontend/browser
- Backend acts as secure proxy

✅ **Input Validation:**
- All user input sanitized
- XSS protection enabled
- Profanity and spam detection

✅ **Rate Limiting:**
- Per-IP limits prevent abuse
- Global API limits prevent excessive costs
- Graceful degradation on limit exceed

✅ **CORS Protection:**
- Backend only accepts requests from configured frontend URL
- Prevents unauthorized API usage

## Next Steps

1. **Get your Gemini API key** from Google AI Studio
2. **Configure backend** with API key in `.env`
3. **Start both servers** (backend + frontend)
4. **Test the integration** with complex queries
5. **Monitor usage** via status endpoints
6. **Adjust sensitivity** based on your needs

For more details, see:
- [Backend README](./backend/README.md) - Backend API documentation
- [Google AI Studio](https://makersuite.google.com/) - Get API keys and docs
- [Gemini API Docs](https://ai.google.dev/docs) - Official API documentation

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. View backend logs for error messages
3. Test with curl commands to isolate the issue
4. Ensure all environment variables are set correctly

The chatbot is designed to work seamlessly whether Gemini is enabled or not. If you encounter any problems, the rule-based system will continue to function as a reliable fallback.
