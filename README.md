# Republic of Praya - Government Portal

Official government portal for the Republic of Praya, featuring **PrayaPass** - a secure digital identity and authentication system.

## 🌐 Live Site

**Production**: [https://jeffbai996.github.io](https://jeffbai996.github.io)

## ✨ Features

### PrayaPass Authentication System
- 🔐 Secure user registration and login
- 📧 Email verification with OTP
- 📱 Two-factor authentication (2FA) with SMS/Email/Face
- 🔑 Password reset functionality
- 👤 User profile management
- 🛡️ Session management and device tracking
- 🎨 Modern, responsive UI inspired by SingPass

### Government Services Portal
- 🏛️ Multiple department pages (Interior, DOJ, CTB, Health, etc.)
- 📊 Unified dashboard for citizens
- 🔗 Single sign-on across all services
- 📄 Digital document management

## 🚀 Quick Start

### For Production Deployment

Follow our **[Quick Start Guide](QUICKSTART.md)** to deploy in 3 steps:

1. Deploy backend to Railway (2 minutes)
2. Run deployment script (30 seconds)
3. Create PR and merge

**Total time:** ~5 minutes ⏱️

### For Local Development

```bash
# Start backend
cd backend
npm install
npm start

# Start frontend (in another terminal)
cd frontend
npm install
npm run dev
```

Visit: http://localhost:5173

## 📚 Documentation

- **[QUICKSTART.md](QUICKSTART.md)** - Get deployed in 5 minutes
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Complete deployment guide (Railway, Render, Vercel)
- **[DEVELOPMENT.md](DEVELOPMENT.md)** - Local development setup and API reference

## 🏗️ Project Structure

```
jeffbai996.github.io/
├── frontend/              # React frontend (Vite)
│   ├── src/
│   │   ├── pages/        # Page components
│   │   │   └── auth/    # Login, Register, etc.
│   │   ├── components/   # Reusable components
│   │   └── utils/        # Auth context, helpers
│   └── package.json
│
├── backend/              # Node.js/Express API
│   ├── src/
│   │   ├── routes/      # API endpoints
│   │   ├── services/    # Business logic
│   │   └── middleware/  # Auth, rate limiting
│   └── package.json
│
├── scripts/             # Deployment scripts
│   └── deploy-production.sh
│
└── docs/                # Documentation
    ├── QUICKSTART.md
    ├── DEPLOYMENT.md
    └── DEVELOPMENT.md
```

## 🛠️ Technology Stack

**Frontend:**
- React 18
- React Router
- Vite
- CSS3 (Custom styling)

**Backend:**
- Node.js
- Express
- JWT authentication
- bcrypt for password hashing
- In-memory storage (upgrade to PostgreSQL for production)

**Deployment:**
- Frontend: GitHub Pages
- Backend: Railway / Render / Vercel

## 🔒 Security Features

- ✅ Password hashing with bcrypt (12 rounds)
- ✅ JWT tokens with refresh token rotation
- ✅ Rate limiting on auth endpoints
- ✅ Account lockout after failed attempts
- ✅ CORS protection
- ✅ Helmet.js security headers
- ✅ Two-factor authentication
- ✅ Session management

## 🌟 Recent Updates

### PrayaPass Login Redesign (Latest)
- ✨ SingPass-inspired modern UI
- 📋 Added disclaimer with radio button
- 🎨 Enhanced right-hand info panel with 5 key features
- 📱 Improved mobile responsiveness
- ⚙️ Complete deployment configuration

## 📝 Environment Variables

### Backend
```env
NODE_ENV=production
PORT=5000
JWT_SECRET=<your-secret>
JWT_EXPIRES_IN=7d
FRONTEND_URL=https://jeffbai996.github.io
```

### Frontend
```env
VITE_API_URL=https://your-backend.com/api
```

## 🚦 API Health Check

Check if your backend is running:

```bash
curl https://your-backend-url.com/api/health
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is for educational and demonstration purposes.

## 🆘 Support

- 📖 Check [DEPLOYMENT.md](DEPLOYMENT.md) for deployment issues
- 💻 Check [DEVELOPMENT.md](DEVELOPMENT.md) for local dev issues
- 🐛 Report issues on GitHub

## 🎯 Roadmap

- [ ] PostgreSQL database integration
- [ ] Real email service (SendGrid/AWS SES)
- [ ] Real SMS service (Twilio)
- [ ] Face verification with liveness detection
- [ ] Admin dashboard
- [ ] Analytics and monitoring
- [ ] Custom domain

---

**Built with ❤️ for the Republic of Praya**
