# GOV.PRAYA

Public web portal for the Republic of Praya — a Minecraft creative city server founded in 2011. The site presents Praya as a functioning government with 15 departments, civic services, and a conversational AI guide.

Deployed at **[www.govpraya.org](https://www.govpraya.org)** via GitHub Pages.

## What's in this repo

| Path | What it is |
|------|------------|
| `frontend/` | React 18 + Vite 6 SPA — the main site |
| `frontend/src/pages/` | 27 department and static pages, each lazy-loaded |
| `frontend/src/components/` | Shared components (Layout, ChatWidget, EmergencyAlert, Search, etc.) |
| `frontend/src/services/` | Gemini chatbot integration (REST + Live API) |
| `frontend/src/utils/` | Auth (Supabase), theming, department context, intent recognition |
| `chatbot-embed.js` | Standalone embeddable chatbot — injected into the wiki and NMP subdomain at deploy time |
| `.github/workflows/deploy.yml` | CI: validate env, build, inject API key, deploy to Pages |
| `docs/` | Design specs and implementation plans |

Sibling properties (not in this repo): `nmp.govpraya.org` (museum), `govpraya.org/wiki/` (MediaWiki), and the GP.AI Minecraft plugin.

## Tech stack

- **Framework:** React 18, Vite 6
- **Routing:** React Router v6 (lazy-loaded pages)
- **Auth:** Supabase (Postgres + Auth)
- **AI:** Google Gemini (`gemini-3.1-flash-lite-preview`) via `@google/generative-ai`
- **Styling:** CSS custom properties + per-department theme files
- **Testing:** Vitest + React Testing Library
- **Deploy:** GitHub Pages with CNAME

## Local development

```bash
cd frontend
npm install
npm run dev      # port 5173
```

Required env vars in `frontend/.env.local`:

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
VITE_GEMINI_API_KEY=...
VITE_GEMINI_ENABLED=true
```

`npm run build` runs env validation first (`scripts/validate-env.js`) — use `npm run build:skip-validation` to bypass when you just want to confirm the bundle builds.

## Scripts

```bash
npm run dev                     # Vite dev server
npm run build                   # validate env + production build
npm run preview                 # serve the built bundle
npm run lint                    # ESLint on src/
npm run test                    # Vitest
npm run test:ui                 # Vitest with UI
npm run test:coverage           # Coverage report
```

## Pre-commit hook

Husky + lint-staged run ESLint (`--fix`) on staged `.js`/`.jsx` files in `frontend/src/`. The hook is installed automatically on first `npm install` via the `prepare` script. To skip it in an emergency, use `git commit --no-verify` — but don't make a habit of it.

## Deployment

Every push to `main` triggers `.github/workflows/deploy.yml`:

1. Checkout + Node 18 + `npm ci`
2. Validate env vars are set (GitHub Secrets: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_GEMINI_API_KEY`)
3. `npm run build:skip-validation` (validation already happened in step 2)
4. Copy `chatbot-embed.js` into `dist/` and substitute the Gemini API key placeholder (via `perl`, which handles special characters safely)
5. Upload `frontend/dist/` as the Pages artifact
6. Deploy

## Conventions

- **Department codes are canonical** — use `IMMD` not "Immigration Dept" in code. `BoP` is the Bank of Praya (never "CBP" or "Central Bank of Praya").
- **Content stays in-universe.** No Minecraft or out-of-character references anywhere a user can see.
- **Routes are thin.** Business logic lives in `utils/` and `services/`, not route handlers.
- **Per-department themes** live in `src/pages/Dept*.css`. Each department has its own visual identity.
- **No AI attribution** in commits, READMEs, or rendered content.

For deeper context on government structure, officials, canon rules, and design philosophy, see `CLAUDE.md` and project memory files.

## License

See `LICENSE`.
