# GOV.PRAYA

Public web portal for the Republic of Praya — a Minecraft creative city server founded in 2011. The site presents Praya as a functioning government with 15 departments, civic services, and a conversational AI guide.

Deployed at **[www.govpraya.org](https://www.govpraya.org)** via GitHub Pages.

## What's in this repo

| Path | What it is |
|------|------------|
| `frontend/` | React 18 + Vite 6 SPA — the main site |
| `frontend/src/pages/` | 27 department and static pages, each lazy-loaded |
| `frontend/src/components/` | Shared components (Layout, ChatWidget, EmergencyAlert, Search, etc.) |
| `frontend/src/services/` | Chatbot service — proxies through the gp-llm Cloudflare Worker (`geminiService.js`). Live API service is hard-disabled (see notes below). |
| `frontend/src/utils/` | Auth (Supabase), theming, department context, intent recognition |
| `.github/workflows/deploy.yml` | CI: validate env, build, deploy to Pages |
| `docs/` | Design specs and implementation plans |

Sibling properties (not in this repo): `nmp.govpraya.org` (museum), `govpraya.org/wiki/` (MediaWiki), and the GP.AI Minecraft plugin.

## Tech stack

- **Framework:** React 18, Vite 6
- **Routing:** React Router v6 (lazy-loaded pages)
- **Auth:** Supabase (Postgres + Auth)
- **AI:** Google Gemini (`gemini-3.1-flash-lite-preview`) — proxied via the [`gp-llm` Cloudflare Worker](https://github.com/jeffbai996/gp-llm), no API key in the browser bundle
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
VITE_GEMINI_ENABLED=true
# Optional — defaults to the production Worker if unset.
# Point at a staging Worker for development.
VITE_GP_LLM_URL=https://gp-llm.2phakhvpgh.workers.dev
```

The frontend never sees a Gemini API key. Chat requests go to the gp-llm Worker, which holds the secret as a Cloudflare environment binding. Origin allowlist on the Worker side restricts who can call it (`govpraya.org`, `www.govpraya.org`, and localhost dev ports).

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
2. Validate env vars are set (GitHub Secrets: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`). `VITE_GP_LLM_URL` is set as a workflow env value pointing at the production Worker.
3. `npm run build:skip-validation` (validation already happened in step 2)
4. Upload `frontend/dist/` as the Pages artifact
5. Deploy

**No API keys live in this repo or in the deploy pipeline.** The Gemini secret is held only by Cloudflare as a Worker binding. To rotate it: `wrangler secret put GEMINI_API_KEY` in `~/repos/gp-llm/worker/`, no redeploy here required.

## Conventions

- **Department codes are canonical** — use `IMMD` not "Immigration Dept" in code. `BoP` is the Bank of Praya (never "CBP" or "Central Bank of Praya").
- **Content stays in-universe.** No Minecraft or out-of-character references anywhere a user can see.
- **Routes are thin.** Business logic lives in `utils/` and `services/`, not route handlers.
- **Per-department themes** live in `src/pages/Dept*.css`. Each department has its own visual identity.
- **No AI attribution** in commits, READMEs, or rendered content.

For deeper context on government structure, officials, canon rules, and design philosophy, see `CLAUDE.md` and project memory files.


## Chatbot architecture

The site embeds an AI chat widget (powered by Gemini Flash Lite) that helps citizens navigate the 15 departments. The architecture is intentionally simple:

```
Browser (govpraya.org) ──POST /chat──▶ gp-llm Worker ──REST──▶ Gemini
                                            │
                                       GEMINI_API_KEY
                                  (Cloudflare secret only)
```

- **`frontend/src/services/geminiService.js`** — sends `{systemPrompt, messages, temperature, maxTokens}` to the Worker. The Worker URL is read from `VITE_GP_LLM_URL` with a sensible default. Department context is capped at 2 KB per request so multi-dept matches don't bloat the system prompt.
- **`frontend/src/utils/clientRateLimit.js`** — defense-in-depth token-bucket throttle (5 burst, 5/min refill) that guards against a runaway useEffect or stuck input handler spamming the Worker from a single tab. The Worker remains the authoritative rate-limit boundary.
- **`gp-llm` Worker** — a separate repo ([github.com/jeffbai996/gp-llm](https://github.com/jeffbai996/gp-llm)) that holds the API key and enforces an origin allowlist, per-IP rate limits (5/min, 50/day), and a daily budget cap (~$5/day) backed by Cloudflare KV.
- **Voice (Gemini Live API)** — `geminiLiveService.js` is hard-disabled. The browser-WebSocket transport requires the API key in a URL query parameter, which is the exact pattern that got the original GCP project suspended in April 2026. Re-enabling voice requires a WebSocket-capable proxy (Cloudflare Durable Object + WS upgrade, or a dedicated voice proxy).

To verify the bundle is clean: `grep -r "AIza\|generativelanguage.googleapis.com" frontend/dist/assets/` should return nothing after `npm run build`.

## License

See `LICENSE`.
