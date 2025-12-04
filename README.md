# Republic of fictional project - Government Portal

Official government portal for the Republic of fictional project, featuring **fictional projectPass** - a secure digital identity and authentication system.

## 🌐 Live Site

**Production**: [https://jeffbai996.github.io](https://jeffbai996.github.io)

## ✨ Features

### fictional projectPass Authentication System
- 🔐 Secure user registration and login
- 📧 Email verification with magic links
- 🔑 Password reset functionality
- 👤 User profile management
- 🛡️ Session management with JWT
- 🎨 Modern, responsive UI inspired by SingPass
- 💾 Persistent data storage with PostgreSQL

### Government Services Portal
- 🏛️ Multiple department pages (Interior, DOJ, CTB, Health, etc.)
- 📊 Unified dashboard for citizens
- 🔗 Single sign-on across all services
- 📄 Digital document management

## 🏗️ Project Structure

```
jeffbai996.github.io/
├── frontend/              # React frontend (Vite)
│   ├── src/
│   │   ├── pages/        # Page components
│   │   │   └── auth/     # Login, Register, etc.
│   │   ├── components/   # Reusable components
│   │   └── utils/        # Auth context & utilities
│   └── package.json
│
└── supabase-schema.sql   # Database schema
```

## 🛠️ Technology Stack

**Frontend:**
- React 18
- React Router
- Vite
- CSS3 (Custom styling)

**Backend:**
- PostgreSQL database
- JWT authentication
- Row Level Security (RLS)
- Email service integration

**Deployment:**
- GitHub Pages

## 🔒 Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT tokens with automatic refresh
- ✅ Row Level Security (RLS) policies
- ✅ Account lockout after failed attempts
- ✅ Email verification required
- ✅ Secure password reset flow
- ✅ Session management
- ✅ Audit logging

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is for educational and demonstration purposes.

## 🎯 Roadmap

- [x] PostgreSQL database integration
- [x] Persistent data storage
- [x] Email verification
- [ ] Real SMS service for 2FA
- [ ] Face verification with liveness detection
- [ ] Admin dashboard
- [ ] Analytics and monitoring
- [ ] Custom domain
- [ ] OAuth providers (Google, GitHub)

---

**Built with ❤️ for the Republic of fictional project**
