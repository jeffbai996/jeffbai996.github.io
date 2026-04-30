# CLAUDE.md — govpraya.org

**See `~/.claude/projects/-Users-jeffbai-repos/memory/project_praya_canon.md` for full Praya canon** (government structure, officials, districts, currency, legislation, design philosophy, content rules). This file is the *technical* brief for the website repo only.

---

## What This Repo Is

The public web presence for the Republic of Praya — a Minecraft creative city server founded in 2011, operated as a functioning civilizational simulation. This repo is the **GitHub Pages SPA** at www.govpraya.org.

**Sibling properties (not in this repo):**
- `nmp.govpraya.org` — National Museum of Praya (standalone subdomain, distinct visual identity)
- `govpraya.org/wiki/` — MediaWiki-style canon wiki (template: `praya-wiki-v3.html`, Vector 2022 skin)
- Fandom wiki (`praya.fandom.com`) — migration source, eligible for deletion
- GP.AI Paper plugin — separate repo (`jeffbai996/gp-ai`, formerly `praya-test`), game-side implementation

## Stack

- **Framework:** React 18 + Vite 6 (SPA)
- **Routing:** React Router v6 with lazy-loaded department pages
- **Auth:** Supabase (PostgreSQL + Auth)
- **AI:** Google Gemini API (chatbot on every department page, context-aware per dept)
- **Styling:** CSS variables + per-department theme CSS (NPA, Health, etc.)
- **Testing:** Vitest + Testing Library
- **Deployment:** GitHub Pages via CNAME (`www.govpraya.org`)

## Structure

```
frontend/
├── src/
│   ├── App.jsx                # Router, lazy-loaded routes
│   ├── pages/                 # 27 department + static pages
│   │   ├── auth/              # Login, Register, ForgotPassword, AuthCallback
│   │   ├── account/           # Dashboard, Security
│   │   ├── admin/             # AlertAdmin (protected)
│   │   └── Dept*.css          # Per-department themes
│   ├── components/
│   │   ├── ChatWidget.jsx     # Gemini chatbot, streaming
│   │   ├── Layout.jsx, GovBanner.jsx
│   │   ├── EmergencyAlert.jsx # National status broadcast
│   │   └── auth/ProtectedRoute.jsx
│   ├── services/
│   │   ├── geminiService.js       # REST API
│   │   └── geminiLiveService.js   # WebSocket live API
│   ├── hooks/useGeminiLive.js
│   ├── utils/
│   │   ├── AuthContext.jsx, ThemeContext.jsx
│   │   ├── supabaseClient.js
│   │   ├── departmentContext.js   # Per-dept chatbot system prompts
│   │   ├── intelligentRouter.js, intentRecognition.js
│   │   ├── semanticClassifier.js, entityLinker.js
│   │   ├── conversationMemory.js, predictiveSuggestions.js
│   │   └── appointments.js, formKnowledge.js, twoFactor.js
│   └── styles/global.css      # Root CSS vars + theme definitions
├── scripts/validate-env.js    # Pre-build env check
└── public/                    # PWA manifest, service worker, offline.html
```

## Build

```bash
cd frontend
npm install
npm run dev        # port 5173
npm run build      # runs validate-env.js first
npm run preview
npm run lint
npm run test       # vitest
```

Root also contains `chatbot-embed.js` — standalone embeddable chatbot widget for injection into the wiki / NMP / other subdomains.

## Conventions Already Established

- **Department codes are canonical.** Use IMMD not "Immigration Dept" in code/routes. See `project_praya_canon.md` for full list. Notably: **BoP** (Bank of Praya), never "CBP" or "Central Bank of Praya."
- **Content must be canon-accurate and in-universe.** No Minecraft/OOC references anywhere in rendered content. The republic administers, it doesn't moralize. PSAs offer resources, not judgment.
- **Per-department themes** live in `pages/Dept*.css` (DeptNPA, DeptHealth, DeptEmergency, etc.). Each department has its own visual identity — don't flatten to a single gov theme.
- **Chatbot contexts** are per-department in `utils/departmentContext.js`. When adding a new dept page, add a context entry so the chatbot knows its jurisdiction and legislation.
- **Lazy load department pages** (already set up in App.jsx). Eagerly load Portal only.
- **Currency display:** "$" symbol in UI, "PYD" ISO code in data/APIs. Always BigDecimal-equivalent precision on the backend side; for display, format with 2 decimals.

## Code Style

- CSS variables for all theming, defined in `styles/global.css`
- Routes are thin — fetch, transform, render. Business logic in utils/ or services/
- Use `@/` paths (check vite.config.js for aliases)
- Jinja2-style string templating is not in play here — React components + JSX
- Prop-types on all components (enforced by recent cleanup)
- No console.log in production — gate with `if (import.meta.env.DEV)`
- Adventure-style ARIA labels on all SVG icons (established pattern)

## Active State (as of April 2026)

- All 18 original priority tasks complete (XSS fix, error boundaries, chatbot contexts, accessibility, memory leaks, etc.)
- 46 commits since Jan 2026; last activity ~April 14
- No known blocking bugs
- Test coverage exists but not comprehensive

## Next-Direction Options (not decided)

1. **New department page.** Strong candidates per canon: Electoral Commission (building exists, democracy not activated), Legislative Council (infrastructure ready), CBCA (Customs), Gaming & Lottery Commission.
2. **BoP monetary policy page.** MPC statements, policy rate history, RTGS status. Leverages the Series 2026 "Pioneers of Humanity" banknote designs.
3. **Spectrum Cannabis constitutional crisis microsite.** Federal-vs-county live plot line — Seth Rogen's CTB vs. Governor Mo's county closure.
4. **NMP subdomain content pipeline.** Separate subdomain work, but this repo's `chatbot-embed.js` would deploy there.
5. **Wiki build-out.** Separate pipeline — tracked in `wiki_build_plan.md` in the wiki directory. Tier 1 articles remaining: Government, Praya Dollar, BoP, Criminal Code, Immigration, MRT.

## Coding Rules (Claude Code specific)

**Always:**
- Reference canon accurately — when in doubt, check `project_praya_canon.md`
- Pull chatbot system prompts from `departmentContext.js`, never hardcode
- Keep files under 200 lines where possible
- Match existing per-department theme patterns when adding new depts
- Test in dev before claiming done (`npm run dev`, verify the route renders)

**Never:**
- Add Minecraft/OOC content to rendered pages
- Use "Prayan" in formal contexts — it's "Praya citizen"
- Refer to the central bank as "CBP" or "Central Bank of Praya" — it is **BoP** (Bank of Praya)
- Commit `.env` files or API keys
- Add features not asked for; don't over-engineer chatbot logic
- Include AI attribution (Claude/Anthropic/Claude Code) in commits, README, or rendered content
