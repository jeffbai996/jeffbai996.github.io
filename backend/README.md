# Praya Chatbot Backend

Backend API service for the Praya Government Portal chatbot with Google Gemini 2.0 Flash integration.

## Features

- 🤖 Google Gemini 2.0 Flash AI integration
- ⚡ Rate limiting for free tier (15 RPM)
- 🔒 Input validation and sanitization
- 🎯 Context-aware responses using government department data
- 📊 Token usage tracking
- 🛡️ CORS protection
- ❤️ Health check endpoints

## Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Edit `.env` and add your Gemini API key:

```env
GEMINI_API_KEY=your_actual_api_key_here
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### 3. Get Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and paste it in your `.env` file

### 4. Run the Server

**Development mode (with auto-restart):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### POST /api/gemini/chat

Generate a chatbot response using Gemini AI.

**Request Body:**
```json
{
  "message": "How do I apply for a passport?",
  "history": [
    { "sender": "user", "text": "Hello", "timestamp": "..." },
    { "sender": "bot", "text": "Hi! How can I help?", "timestamp": "..." }
  ],
  "departmentContext": [...]
}
```

**Response:**
```json
{
  "success": true,
  "response": "To apply for a passport, visit the Interior Department...",
  "tokensUsed": {
    "prompt": 450,
    "completion": 120,
    "total": 570
  },
  "rateLimit": {
    "requestsUsed": 3,
    "requestsRemaining": 12,
    "windowResetIn": 45
  }
}
```

### GET /api/gemini/status

Get Gemini service status and rate limit info.

**Response:**
```json
{
  "available": true,
  "model": "gemini-2.0-flash-exp",
  "rateLimit": {
    "requestsUsed": 5,
    "requestsRemaining": 10,
    "windowResetIn": 30
  }
}
```

### GET /api/gemini/health

Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "service": "gemini-api",
  "timestamp": "2025-12-02T08:00:00.000Z"
}
```

### GET /health

Main health check for the entire backend.

## Rate Limiting

- **Free Tier Limit:** 15 requests per minute (Gemini API)
- **Per-IP Limit:** 10 requests per minute (our backend)
- **General API:** 30 requests per minute

When rate limit is exceeded, the API returns a 429 status with retry information.

## Error Handling

The API includes comprehensive error handling:

- **400:** Invalid input
- **429:** Rate limit exceeded
- **500:** Server error
- **503:** Service unavailable

All errors include a `fallback: true` flag to tell the frontend to use the rule-based chatbot.

## Architecture

```
backend/
├── server.js              # Express server
├── routes/
│   └── gemini.js         # Gemini API routes
├── services/
│   ├── geminiService.js  # Gemini API wrapper
│   └── contextBuilder.js # Context building utilities
└── middleware/
    ├── rateLimiter.js    # Rate limiting
    └── validator.js      # Input validation
```

## Development

**Test the API:**
```bash
# Health check
curl http://localhost:5000/health

# Status check
curl http://localhost:5000/api/gemini/status

# Chat (replace with your test data)
curl -X POST http://localhost:5000/api/gemini/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What are your hours?", "departmentContext": []}'
```

## Deployment

For production deployment:

1. Set `NODE_ENV=production` in `.env`
2. Update `FRONTEND_URL` to your production domain
3. Consider using a process manager like PM2:
   ```bash
   npm install -g pm2
   pm2 start server.js --name praya-chatbot-backend
   ```

## Security Notes

- Never commit `.env` file to git
- Keep your Gemini API key secret
- Use environment variables for all sensitive data
- CORS is configured to only allow requests from your frontend URL
- Input is sanitized to prevent XSS attacks
- Rate limiting prevents abuse

## Troubleshooting

**"Gemini API key is required" error:**
- Make sure `.env` file exists with valid `GEMINI_API_KEY`

**Rate limit errors:**
- Wait 1 minute before trying again
- Consider upgrading to Gemini Pro if you need higher limits

**CORS errors:**
- Ensure `FRONTEND_URL` in `.env` matches your frontend's URL
- Check that the frontend is running on the configured port

## License

MIT
