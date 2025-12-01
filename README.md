# Republic of Praya - Government Portal

Official government portal for the Republic of Praya, featuring **PrayaPass** - a secure digital identity and authentication system powered by Supabase.

## 🌐 Live Site

**Production**: [https://jeffbai996.github.io](https://jeffbai996.github.io)

## ✨ Features

### PrayaPass Authentication System
- 🔐 Secure user registration and login
- 📧 Email verification with magic links
- 🔑 Password reset functionality
- 👤 User profile management
- 🛡️ Session management with JWT
- 🎨 Modern, responsive UI inspired by SingPass
- 💾 **Persistent data storage** with PostgreSQL
- 🆓 **100% Free** - powered by Supabase

### Government Services Portal
- 🏛️ Multiple department pages (Interior, DOJ, CTB, Health, etc.)
- 📊 Unified dashboard for citizens
- 🔗 Single sign-on across all services
- 📄 Digital document management

## 🚀 Quick Start

### Step 1: Set Up Supabase (5 minutes)

1. Create a free account at https://supabase.com
2. Create a new project
3. Run the SQL schema:
   - Go to SQL Editor
   - Copy/paste from `supabase-schema.sql`
   - Click "Run"
4. Get your credentials:
   - Go to Settings > API
   - Copy your `Project URL` and `anon/public key`

### Step 2: Configure Frontend (1 minute)

Create `frontend/.env`:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

Also create `frontend/.env.production` with the same values for production builds.

### Step 3: Run Locally

```bash
cd frontend
npm install
npm run dev
```

Visit: http://localhost:5173

**That's it!** No backend server needed. Everything runs through Supabase.

## 📚 Documentation

- **[SUPABASE_MIGRATION_GUIDE.md](SUPABASE_MIGRATION_GUIDE.md)** - Complete Supabase setup guide
- **[AUTHENTICATION_AUDIT.md](AUTHENTICATION_AUDIT.md)** - Security audit and architecture analysis
- **[supabase-schema.sql](supabase-schema.sql)** - Database schema

## 🏗️ Project Structure

```
jeffbai996.github.io/
├── frontend/              # React frontend (Vite)
│   ├── src/
│   │   ├── pages/        # Page components
│   │   │   └── auth/     # Login, Register, etc.
│   │   ├── components/   # Reusable components
│   │   └── utils/        # Auth context, Supabase client
│   ├── .env.example      # Environment template
│   └── package.json
│
├── supabase-schema.sql   # Database schema
├── SUPABASE_MIGRATION_GUIDE.md
└── AUTHENTICATION_AUDIT.md
```

## 🛠️ Technology Stack

**Frontend:**
- React 18
- React Router
- Vite
- CSS3 (Custom styling)
- Supabase JS Client

**Backend:**
- **Supabase** (PostgreSQL + Auth + Storage)
- Automatic JWT authentication
- Row Level Security (RLS)
- Built-in email sending

**Deployment:**
- Frontend: GitHub Pages
- Backend: Supabase (managed)

## 🔒 Security Features

- ✅ Password hashing with bcrypt (Supabase built-in)
- ✅ JWT tokens with automatic refresh
- ✅ Row Level Security (RLS) policies
- ✅ Account lockout after failed attempts
- ✅ Email verification required
- ✅ Secure password reset flow
- ✅ Session management
- ✅ Audit logging

## 🌟 Recent Updates

### Supabase Migration (Latest)
- ✨ **No backend code needed** - 100% serverless
- 💾 **Persistent storage** - PostgreSQL database
- 🆓 **Completely free** - No server costs
- 🔐 **Enhanced security** - Row Level Security
- 📧 **Real email sending** - Built-in email service
- ⚡ **Auto-scaling** - Supabase handles all infrastructure

### PrayaPass Login Redesign
- ✨ SingPass-inspired modern UI
- 📋 Added disclaimer with radio button
- 🎨 Enhanced right-hand info panel with 5 key features
- 📱 Improved mobile responsiveness
- ✅ Fixed checkbox alignment on registration form

## 📝 Environment Variables

### Frontend (.env and .env.production)
```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

**Note**: The anon key is safe to expose publicly - it's designed for client-side use.

## 🔍 Database Schema

The Supabase schema includes:

- **user_profiles** - Extended user data (name, phone, role, etc.)
- **user_sessions** - Active session tracking
- **audit_log** - Authentication event logging
- **Automatic triggers** - Profile creation, timestamps
- **RLS policies** - Users can only access their own data

See `supabase-schema.sql` for full schema.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is for educational and demonstration purposes.

## 🆘 Support

- 📖 Check [SUPABASE_MIGRATION_GUIDE.md](SUPABASE_MIGRATION_GUIDE.md) for setup help
- 📊 Check [AUTHENTICATION_AUDIT.md](AUTHENTICATION_AUDIT.md) for architecture details
- 🐛 Report issues on GitHub
- 💬 Supabase docs: https://supabase.com/docs

## 🎯 Roadmap

- [x] ~~PostgreSQL database integration~~ ✅ Done (Supabase)
- [x] ~~Persistent data storage~~ ✅ Done (Supabase)
- [x] ~~Email verification~~ ✅ Done (Supabase)
- [ ] Real SMS service (Twilio) for 2FA
- [ ] Face verification with liveness detection
- [ ] Admin dashboard
- [ ] Analytics and monitoring
- [ ] Custom domain
- [ ] OAuth providers (Google, GitHub)

## 💰 Cost

**Total Cost: $0/month** 🎉

Supabase free tier includes:
- 500 MB database
- 1 GB file storage
- 2 GB bandwidth
- Unlimited API requests
- Unlimited auth users

Upgrade to Pro ($25/month) only if you exceed these limits.

## 🚀 Deploy to Production

1. Update `frontend/.env.production` with your Supabase credentials
2. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```
3. Commit and push to GitHub
4. GitHub Actions will automatically deploy to GitHub Pages

---

**Built with ❤️ for the Republic of Praya**

**Powered by [Supabase](https://supabase.com)** 🚀
