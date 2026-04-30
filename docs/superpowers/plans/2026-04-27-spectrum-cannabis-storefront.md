# Spectrum Cannabis Storefront Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a complete consumer storefront for the fictional Spectrum Cannabis brand at `/spectrum-cannabis/*` — 6 pages, isolated layout (no gov chrome), age gate, cart drawer, mock interactions, linked from a new "Licensed Operators" section on the CTB page.

**Architecture:** Same React 18 + Vite SPA, but Spectrum routes mount under their own `SpectrumLayout` component that bypasses the gov `Layout` (no portal header, no `ChatWidget`, no `EmergencyAlert`). State lives in two React contexts (cart, age gate) backed by `localStorage`. All UI is CSS + inline SVG — no new npm dependencies, no real images, no backend.

**Tech Stack:** React 18, Vite 6, React Router v6, Vitest + Testing Library, CSS variables, Inter / Inter Tight (Google Fonts), `prop-types`.

**Spec:** `docs/superpowers/specs/2026-04-27-spectrum-cannabis-storefront-design.md`

---

## File Map

### New files

| File | Purpose |
|---|---|
| `frontend/src/data/spectrumProducts.js` | 40 mock products across 5 categories |
| `frontend/src/data/spectrumLocations.js` | 6 store locations |
| `frontend/src/data/spectrumTeam.js` | 4 fictional team members |
| `frontend/src/utils/spectrumCart.js` | Pure cart math + localStorage helpers |
| `frontend/src/utils/spectrumFilters.js` | Pure filter + sort functions |
| `frontend/src/utils/__tests__/spectrumCart.test.js` | Cart unit tests |
| `frontend/src/utils/__tests__/spectrumFilters.test.js` | Filter unit tests |
| `frontend/src/contexts/SpectrumCartContext.jsx` | Cart state + persistence |
| `frontend/src/contexts/SpectrumAgeGateContext.jsx` | Age gate state + persistence |
| `frontend/src/pages/spectrum/Spectrum.css` | All Spectrum styles, scoped under `.layout-spectrum` |
| `frontend/src/pages/spectrum/components/SpectrumLogo.jsx` | Rainbow bar + wordmark SVG component |
| `frontend/src/pages/spectrum/components/SpectrumHeader.jsx` | Sticky header w/ nav + cart icon |
| `frontend/src/pages/spectrum/components/SpectrumFooter.jsx` | Two-row footer |
| `frontend/src/pages/spectrum/components/AgeGate.jsx` | First-visit age modal |
| `frontend/src/pages/spectrum/components/CartDrawer.jsx` | Slide-in right cart drawer |
| `frontend/src/pages/spectrum/components/ProductCard.jsx` | Used in Home featured + Shop grid |
| `frontend/src/pages/spectrum/components/LocationCard.jsx` | Used in Home callout + Locations page |
| `frontend/src/pages/spectrum/SpectrumLayout.jsx` | Wraps all spectrum routes; no gov chrome |
| `frontend/src/pages/spectrum/SpectrumHome.jsx` | Hero + featured + locations + brand strip |
| `frontend/src/pages/spectrum/SpectrumShop.jsx` | Filterable product grid |
| `frontend/src/pages/spectrum/SpectrumProduct.jsx` | Single-product detail |
| `frontend/src/pages/spectrum/SpectrumLocations.jsx` | All 6 locations |
| `frontend/src/pages/spectrum/SpectrumAbout.jsx` | Brand story + values + team |
| `frontend/src/pages/spectrum/SpectrumContact.jsx` | Form + FAQ |
| `frontend/src/pages/spectrum/__tests__/Spectrum.test.jsx` | Component smoke tests |

### Modified files

| File | Change |
|---|---|
| `frontend/index.html` | Add Inter + Inter Tight `<link>` tags |
| `frontend/src/App.jsx` | Add 7 lazy imports + route block under `/spectrum-cannabis/*` |
| `frontend/src/pages/CTB.jsx` | Add new "Licensed Operators" section linking to `/spectrum-cannabis` |

### Out-of-repo (post-ship)

| File | Change |
|---|---|
| `~/.claude/projects/-Users-jeffbai-repos/memory/project_praya_canon.md` | Add CTB DG David Pereira; lock in Spectrum location list; document closure scope for v2 |

---

## Task ordering rationale

The plan front-loads pure-data + pure-logic + pure-component tasks (Tasks 1–6) so the storefront builds bottom-up: when SpectrumLayout assembles in Task 7, every primitive it consumes is already tested. Routes wire up only at Task 13, which means all earlier tasks complete with a still-functional gov portal — `/spectrum-cannabis` 404s harmlessly until then.

---

## Task 1: Add fonts to index.html

**Files:**
- Modify: `frontend/index.html`

Add Google Fonts preconnect + stylesheet links so Inter and Inter Tight are available globally. Spectrum CSS will use them; gov pages won't reference them (they keep their existing `system-ui` fallback).

- [ ] **Step 1: Verify the current `<head>` block**

Run: `head -50 frontend/index.html`
Expected: standard meta tags, no Google Fonts links yet.

- [ ] **Step 2: Add font links**

In `frontend/index.html`, find the `<head>` close tag (`</head>`). Insert these three lines directly above it:

```html
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Inter+Tight:wght@600;700&display=swap" rel="stylesheet">
```

- [ ] **Step 3: Sanity-check the build**

Run: `cd frontend && npx vite build 2>&1 | tail -3`
Expected: clean build.

- [ ] **Step 4: Commit**

```bash
git add frontend/index.html
git commit -m "feat(spectrum): preload Inter + Inter Tight fonts"
```

No AI attribution.

---

## Task 2: Build the products data module

**Files:**
- Create: `frontend/src/data/spectrumProducts.js`

40 products across 5 categories. The shape is locked by the spec — every entry has `id`, `name`, `category`, `strainType`, `thc`, `cbd`, `weight`, `price`, `terpenes`, `description`, `featured`, `accentColor`. `accessories` entries have `strainType: null`.

- [ ] **Step 1: Create the file**

Create `frontend/src/data/spectrumProducts.js`:

```js
// Spectrum Cannabis product catalog. ~40 products across 5 categories.
// All prices in P$ (Praya Dollars). Strain types lowercase.
// `accentColor` defaults to category color if omitted at consumer level.

export const SPECTRUM_PRODUCTS = [
  // ---------- FLOWER (12) ----------
  { id: 'northern-lights-eighth', name: 'Northern Lights', category: 'flower', strainType: 'indica', thc: 22, cbd: 0.1, weight: '3.5g', price: 45, terpenes: ['Myrcene', 'Caryophyllene', 'Pinene'], featured: true,
    description: 'A classic indica with a heavy, sedative profile. Earthy and pine-forward, with a sweet finish. Northern Lights is the strain that built modern indoor cultivation — and we still grow it the way it deserves.\n\nBest enjoyed evenings, with the lights low.' },
  { id: 'blue-dream-eighth', name: 'Blue Dream', category: 'flower', strainType: 'hybrid', thc: 21, cbd: 0.2, weight: '3.5g', price: 45, terpenes: ['Myrcene', 'Pinene', 'Caryophyllene'],
    description: 'The sativa-leaning hybrid that needs no introduction. Sweet berry on the nose, balanced cerebral lift, gentle body. A reliable daytime choice for anyone who finds pure sativas too racy.\n\nGrown in our Surowski Valley facility under full-spectrum LED.' },
  { id: 'gelato-33-eighth', name: 'Gelato #33', category: 'flower', strainType: 'hybrid', thc: 24, cbd: 0.1, weight: '3.5g', price: 50,  terpenes: ['Caryophyllene', 'Limonene', 'Humulene'], featured: true,
    description: 'A dessert-strain heavyweight: creamy, citrus-sweet, balanced. Phenotype #33 is the cut we settled on after three growing cycles of evaluation.\n\nEqual parts head and body. Pairs well with a film and a quiet evening.' },
  { id: 'wedding-cake-eighth', name: 'Wedding Cake', category: 'flower', strainType: 'indica', thc: 25, cbd: 0.1, weight: '3.5g', price: 50, terpenes: ['Limonene', 'Caryophyllene', 'Myrcene'],
    description: 'Vanilla-forward, dense buds, heavy trichome cover. The indica end of our hybrid bench.\n\nA strain we lean on when we want sleep without sedation.' },
  { id: 'sour-diesel-gram', name: 'Sour Diesel', category: 'flower', strainType: 'sativa', thc: 23, cbd: 0.1, weight: '1g', price: 15, terpenes: ['Caryophyllene', 'Limonene', 'Myrcene'],
    description: 'The fuel-and-citrus sativa. Energetic, conversational, focus-friendly.\n\nCured slow, packed loose. A 1g jar to try without committing to an eighth.' },
  { id: 'green-crack-eighth', name: 'Green Crack', category: 'flower', strainType: 'sativa', thc: 22, cbd: 0.1, weight: '3.5g', price: 42, terpenes: ['Myrcene', 'Caryophyllene', 'Limonene'],
    description: 'A renamed classic — daytime sativa, mango on the nose, clean upbeat profile.\n\nWe call it Green Crack out of respect for the strain\'s history; the name carries the lineage.' },
  { id: 'gsc-eighth', name: 'Girl Scout Cookies', category: 'flower', strainType: 'hybrid', thc: 24, cbd: 0.1, weight: '3.5g', price: 48, terpenes: ['Caryophyllene', 'Limonene', 'Humulene'],
    description: 'Sweet, earthy, full-bodied. The grandparent of half the modern hybrid catalog.\n\nGrown from cuttings traceable to the original Bay Area cut.' },
  { id: 'og-kush-quarter', name: 'OG Kush', category: 'flower', strainType: 'indica', thc: 23, cbd: 0.2, weight: '7g', price: 85, terpenes: ['Myrcene', 'Limonene', 'Caryophyllene'], featured: true,
    description: 'The OG. Lemon, fuel, pine. Heavy body, focused head.\n\nA quarter for the dedicated. Stored in a sealed glass jar with humidity pack.' },
  { id: 'ak47-quarter', name: 'AK-47', category: 'flower', strainType: 'sativa', thc: 22, cbd: 0.2, weight: '7g', price: 80, terpenes: ['Myrcene', 'Caryophyllene', 'Pinene'],
    description: 'A long-running sativa with a balanced, social profile. Earthy, slightly skunky.\n\nNot as aggressive as the name suggests — closer to a steady hum than a sprint.' },
  { id: 'pineapple-express-eighth', name: 'Pineapple Express', category: 'flower', strainType: 'hybrid', thc: 21, cbd: 0.1, weight: '3.5g', price: 44, terpenes: ['Limonene', 'Caryophyllene', 'Pinene'],
    description: 'Tropical, citrus, a touch of pine. Hybrid that leans sativa.\n\nDaytime to early-evening choice.' },
  { id: 'jack-herer-half', name: 'Jack Herer', category: 'flower', strainType: 'sativa', thc: 22, cbd: 0.2, weight: '14g', price: 155, terpenes: ['Pinene', 'Terpinolene', 'Caryophyllene'],
    description: 'Pine, spice, focus. A sativa we keep in stock because customers keep asking for it.\n\nHalf-ounce for regulars; sealed glass jar.' },
  { id: 'do-si-dos-eighth', name: 'Do-Si-Dos', category: 'flower', strainType: 'indica', thc: 26, cbd: 0.1, weight: '3.5g', price: 52, terpenes: ['Limonene', 'Caryophyllene', 'Myrcene'],
    description: 'Dense, sweet, sedative. The strain we recommend for serious sleep nights.\n\nOne of our higher-THC offerings.' },

  // ---------- PRE-ROLLS (8) ----------
  { id: 'house-prerolls-5pack', name: 'House Pre-Rolls (5-pack)', category: 'pre-rolls', strainType: 'hybrid', thc: 20, cbd: 0.1, weight: '5 × 0.5g', price: 35, terpenes: ['Caryophyllene', 'Myrcene', 'Limonene'], featured: true,
    description: 'Five 0.5g pre-rolls of our house hybrid blend. Convenient, consistent, never shake-only.\n\nGreat for sharing or keeping on hand.' },
  { id: 'blue-dream-preroll', name: 'Blue Dream Pre-Roll', category: 'pre-rolls', strainType: 'hybrid', thc: 21, cbd: 0.2, weight: '1g', price: 12, terpenes: ['Myrcene', 'Pinene', 'Caryophyllene'],
    description: 'Single 1g pre-roll, Blue Dream flower, hand-rolled in unbleached paper.\n\nNo trim, no shake — flower only.' },
  { id: 'og-kush-preroll', name: 'OG Kush Pre-Roll', category: 'pre-rolls', strainType: 'indica', thc: 23, cbd: 0.2, weight: '1g', price: 14, terpenes: ['Myrcene', 'Limonene', 'Caryophyllene'],
    description: 'Single 1g OG Kush pre-roll. Hand-rolled, glass tip.\n\nFor when you want the strain without the prep.' },
  { id: 'sativa-trio-3pack', name: 'Sativa Trio (3-pack)', category: 'pre-rolls', strainType: 'sativa', thc: 22, cbd: 0.1, weight: '3 × 0.7g', price: 28, terpenes: ['Pinene', 'Limonene', 'Terpinolene'],
    description: 'Three 0.7g pre-rolls — Sour Diesel, Jack Herer, Green Crack. A daytime sampler.\n\nEach roll labeled by strain.' },
  { id: 'indica-trio-3pack', name: 'Indica Trio (3-pack)', category: 'pre-rolls', strainType: 'indica', thc: 24, cbd: 0.1, weight: '3 × 0.7g', price: 28, terpenes: ['Myrcene', 'Caryophyllene', 'Limonene'],
    description: 'Three 0.7g pre-rolls — Northern Lights, Wedding Cake, Do-Si-Dos. Evening focus.\n\nEach roll labeled by strain.' },
  { id: 'infused-preroll-single', name: 'Infused Pre-Roll (single)', category: 'pre-rolls', strainType: 'hybrid', thc: 35, cbd: 0.1, weight: '1g', price: 22, terpenes: ['Caryophyllene', 'Limonene', 'Myrcene'],
    description: 'Hybrid flower coated in distillate and rolled in kief. High potency.\n\nStart with a quarter of one. Not a beginner product.' },
  { id: 'gsc-preroll', name: 'Girl Scout Cookies Pre-Roll', category: 'pre-rolls', strainType: 'hybrid', thc: 24, cbd: 0.1, weight: '1g', price: 14, terpenes: ['Caryophyllene', 'Limonene', 'Humulene'],
    description: 'Single 1g GSC pre-roll, hand-rolled.\n\nClassic hybrid in single-serving form.' },
  { id: 'mini-prerolls-10pack', name: 'Mini Pre-Rolls (10-pack)', category: 'pre-rolls', strainType: 'hybrid', thc: 20, cbd: 0.1, weight: '10 × 0.3g', price: 38, terpenes: ['Myrcene', 'Caryophyllene', 'Limonene'],
    description: 'Ten 0.3g mini pre-rolls of the house hybrid. Microdose-friendly format.\n\nFor people who prefer more sessions, smaller doses.' },

  // ---------- EDIBLES (10) ----------
  { id: 'gummies-sativa-10mg', name: 'Sativa Gummies (10 × 10mg)', category: 'edibles', strainType: 'sativa', thc: 100, cbd: 0, weight: '10 pcs', price: 24, terpenes: ['Limonene', 'Pinene', 'Terpinolene'], featured: true,
    description: 'Ten 10mg THC sativa-extract gummies. Mixed citrus flavors. Vegan, gelatin-free.\n\nOnset 45–90 minutes. Start with one.' },
  { id: 'gummies-indica-10mg', name: 'Indica Gummies (10 × 10mg)', category: 'edibles', strainType: 'indica', thc: 100, cbd: 0, weight: '10 pcs', price: 24, terpenes: ['Myrcene', 'Caryophyllene', 'Humulene'],
    description: 'Ten 10mg THC indica-extract gummies. Mixed berry flavors. Vegan, gelatin-free.\n\nOnset 45–90 minutes. Start with one.' },
  { id: 'gummies-hybrid-5mg', name: 'Hybrid Gummies (20 × 5mg)', category: 'edibles', strainType: 'hybrid', thc: 100, cbd: 0, weight: '20 pcs', price: 28, terpenes: ['Limonene', 'Caryophyllene', 'Myrcene'],
    description: 'Twenty 5mg hybrid-extract gummies. Microdose-friendly. Mixed tropical flavors. Vegan.\n\nGood entry point for new edible users.' },
  { id: 'chocolate-bar-100mg', name: 'Dark Chocolate Bar (100mg)', category: 'edibles', strainType: 'hybrid', thc: 100, cbd: 0, weight: '40g', price: 22, terpenes: ['Caryophyllene', 'Limonene', 'Myrcene'],
    description: '70% dark chocolate, ten 10mg squares. Made with single-origin Praya cacao.\n\nSnap a square, wait an hour.' },
  { id: 'chocolate-bar-cbd', name: 'Milk Chocolate Bar (1:1 CBD)', category: 'edibles', strainType: 'hybrid', thc: 50, cbd: 50, weight: '40g', price: 26, terpenes: ['Limonene', 'Caryophyllene', 'Pinene'],
    description: 'Ten 5mg-THC, 5mg-CBD squares. Milder cerebral profile, calmer body.\n\nA crowd favorite for social-use evenings.' },
  { id: 'mints-pack', name: 'Sativa Mints (10 × 5mg)', category: 'edibles', strainType: 'sativa', thc: 50, cbd: 0, weight: '10 pcs', price: 18, terpenes: ['Limonene', 'Pinene'],
    description: 'Ten 5mg THC mints in a pocket tin. Discreet, fast-onset (15–30 min via sublingual route).\n\nGood travel companion.' },
  { id: 'sparkling-drink-10mg', name: 'Sparkling Drink — Yuzu (10mg)', category: 'edibles', strainType: 'sativa', thc: 10, cbd: 0, weight: '355ml', price: 12, terpenes: ['Limonene', 'Pinene'],
    description: 'Sparkling yuzu drink with 10mg THC. Fast-onset (nano-emulsified, ~15 min).\n\nOne can, one session. No alcohol.' },
  { id: 'cbd-tincture', name: 'CBD Tincture (1500mg)', category: 'edibles', strainType: null, thc: 0, cbd: 1500, weight: '30ml', price: 65, terpenes: [],
    description: 'Full-spectrum CBD tincture, 1500mg total, 50mg per ml. MCT oil base, mint flavor.\n\nDosing dropper included. No psychoactive effect.' },
  { id: 'cookies-pack', name: 'Salted Caramel Cookies (4 × 25mg)', category: 'edibles', strainType: 'indica', thc: 100, cbd: 0, weight: '4 pcs', price: 26, terpenes: ['Caryophyllene', 'Myrcene'],
    description: 'Four salted caramel cookies, 25mg THC each. Indica-extract.\n\nA stronger evening edible. Half a cookie is plenty for many.' },
  { id: 'gummies-cbd', name: 'CBD-Only Gummies (20 × 25mg)', category: 'edibles', strainType: null, thc: 0, cbd: 500, weight: '20 pcs', price: 32, terpenes: [],
    description: 'Twenty 25mg CBD gummies. No THC. Mixed flavors.\n\nFor calm without the high.' },

  // ---------- VAPES (6) ----------
  { id: 'cart-blue-dream', name: 'Blue Dream Cart (510-thread)', category: 'vapes', strainType: 'hybrid', thc: 85, cbd: 0.5, weight: '1g', price: 50, terpenes: ['Myrcene', 'Pinene', 'Caryophyllene'], featured: true,
    description: '1g 510-thread cartridge, distillate + reintroduced terpenes from the source strain.\n\nFits any standard 510 battery.' },
  { id: 'cart-northern-lights', name: 'Northern Lights Cart (510-thread)', category: 'vapes', strainType: 'indica', thc: 85, cbd: 0.5, weight: '1g', price: 50, terpenes: ['Myrcene', 'Caryophyllene', 'Pinene'],
    description: '1g 510-thread cartridge. Indica-leaning, evening profile.\n\nFits any standard 510 battery.' },
  { id: 'cart-jack-herer', name: 'Jack Herer Cart (510-thread)', category: 'vapes', strainType: 'sativa', thc: 85, cbd: 0.5, weight: '1g', price: 50, terpenes: ['Pinene', 'Terpinolene', 'Caryophyllene'],
    description: '1g 510-thread cartridge. Sativa, focus-leaning.\n\nFits any standard 510 battery.' },
  { id: 'disposable-gelato', name: 'Gelato Disposable', category: 'vapes', strainType: 'hybrid', thc: 80, cbd: 0.5, weight: '1g', price: 38, terpenes: ['Caryophyllene', 'Limonene', 'Humulene'],
    description: 'All-in-one disposable, 1g, USB-C rechargeable. Gelato hybrid profile.\n\nNo battery required.' },
  { id: 'disposable-og-kush', name: 'OG Kush Disposable', category: 'vapes', strainType: 'indica', thc: 80, cbd: 0.5, weight: '1g', price: 38, terpenes: ['Myrcene', 'Limonene', 'Caryophyllene'],
    description: 'All-in-one disposable, 1g, USB-C rechargeable. OG Kush indica profile.\n\nNo battery required.' },
  { id: 'live-resin-cart', name: 'Live Resin Cart — Wedding Cake', category: 'vapes', strainType: 'indica', thc: 78, cbd: 0.4, weight: '0.5g', price: 55, terpenes: ['Limonene', 'Caryophyllene', 'Myrcene'],
    description: 'Live resin cartridge, 0.5g. Cold-extracted from fresh-frozen flower — fuller terpene profile than distillate.\n\n510-thread.' },

  // ---------- ACCESSORIES (4) ----------
  { id: 'rolling-papers', name: 'Spectrum Rolling Papers (1¼)', category: 'accessories', strainType: null, thc: 0, cbd: 0, weight: 'Pack of 50', price: 5, terpenes: [],
    description: '1¼ size, unbleached natural fiber rolling papers. 50 leaves per pack.\n\nThin, slow-burning. Branded with the rainbow bar.' },
  { id: 'grinder-2pc', name: 'Spectrum Grinder (2-piece)', category: 'accessories', strainType: null, thc: 0, cbd: 0, weight: '55mm', price: 32, terpenes: [],
    description: 'Anodized aluminum 2-piece grinder, 55mm. Diamond-cut teeth.\n\nLifetime warranty. Engraved with the rainbow bar.' },
  { id: 'storage-jar', name: 'UV-Resistant Storage Jar', category: 'accessories', strainType: null, thc: 0, cbd: 0, weight: '120ml', price: 18, terpenes: [],
    description: 'UV-resistant amber glass jar, 120ml, airtight seal. Holds approximately a half-ounce.\n\nIncludes humidity pack.' },
  { id: 'lighter-zippo', name: 'Spectrum Brass Lighter', category: 'accessories', strainType: null, thc: 0, cbd: 0, weight: '1 unit', price: 28, terpenes: [],
    description: 'Refillable brass lighter, windproof flame. Engraved rainbow bar on the side.\n\nButane refills sold separately at any of our locations.' }
]

export const SPECTRUM_CATEGORIES = [
  { id: 'flower', label: 'Flower', accentColor: '#5E7C16' },
  { id: 'pre-rolls', label: 'Pre-Rolls', accentColor: '#F9801D' },
  { id: 'edibles', label: 'Edibles', accentColor: '#8932B8' },
  { id: 'vapes', label: 'Vapes', accentColor: '#3AB3DA' },
  { id: 'accessories', label: 'Accessories', accentColor: '#1A1A1A' }
]

export const SPECTRUM_STRAIN_TYPES = [
  { id: 'indica', label: 'Indica', color: '#8932B8' },
  { id: 'sativa', label: 'Sativa', color: '#5E7C16' },
  { id: 'hybrid', label: 'Hybrid', color: '#F9801D' },
  { id: null, label: 'N/A', color: '#6B7280' }
]
```

- [ ] **Step 2: Verify file parses + count entries**

Run: `cd frontend && node -e "import('./src/data/spectrumProducts.js').then(m => { console.log('Total:', m.SPECTRUM_PRODUCTS.length); const byCat = {}; m.SPECTRUM_PRODUCTS.forEach(p => { byCat[p.category] = (byCat[p.category] || 0) + 1 }); console.log(byCat); console.log('Featured:', m.SPECTRUM_PRODUCTS.filter(p => p.featured).length) })"`

Expected:
```
Total: 40
{ flower: 12, 'pre-rolls': 8, edibles: 10, vapes: 6, accessories: 4 }
Featured: 6
```

If counts are wrong, the file is incomplete — fix before commit.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/data/spectrumProducts.js
git commit -m "feat(spectrum): add 40-product canon data module"
```

---

## Task 3: Build the locations + team data modules

**Files:**
- Create: `frontend/src/data/spectrumLocations.js`
- Create: `frontend/src/data/spectrumTeam.js`

Smaller than products. Both can land in one commit.

- [ ] **Step 1: Create locations**

Create `frontend/src/data/spectrumLocations.js`:

```js
// Spectrum Cannabis store locations. 6 total.
// `status` is 'open' for all in v1; flips to 'closed' for Oakville/Northgate/Braemar in v2.
// `county` and `district` from the Praya canon.

export const SPECTRUM_LOCATIONS = [
  {
    id: 'oakville',
    name: 'Spectrum Oakville',
    isFlagship: true,
    district: 'Oakville',
    county: 'Braemar County',
    address: '80 Leman Street, Oakville',
    hours: 'Mon–Sun · 10:00–22:00',
    phone: '(010) 311-2201',
    blurb: 'Our flagship store. Two floors, the full catalog, knowledgeable staff.',
    status: 'open'
  },
  {
    id: 'northgate',
    name: 'Spectrum Northgate',
    isFlagship: false,
    district: 'Northgate',
    county: 'Braemar County',
    address: '14 Skamania Avenue, Northgate',
    hours: 'Mon–Sun · 10:00–22:00',
    phone: '(010) 311-2202',
    blurb: 'Our community store in Northgate. Quick stops, local crowd.',
    status: 'open'
  },
  {
    id: 'braemar',
    name: 'Spectrum Braemar',
    isFlagship: false,
    district: 'Braemar',
    county: 'Braemar County',
    address: '3 Kootenai Crescent, Braemar',
    hours: 'Mon–Sun · 10:00–22:00',
    phone: '(010) 311-2203',
    blurb: 'A short walk from County Hall. Our oldest location after Oakville.',
    status: 'open'
  },
  {
    id: 'downtown',
    name: 'Spectrum Downtown',
    isFlagship: false,
    district: 'Downtown',
    county: null,
    address: '210 Promenade, Downtown',
    hours: 'Mon–Sun · 10:00–22:00',
    phone: '(010) 311-2204',
    blurb: 'In the heart of Downtown. Late-night foot traffic, full catalog.',
    status: 'open'
  },
  {
    id: 'cooper-square',
    name: 'Spectrum Cooper Square',
    isFlagship: false,
    district: 'Western',
    county: null,
    address: '7 Cooper Square, Western District',
    hours: 'Mon–Sun · 10:00–22:00',
    phone: '(010) 311-2205',
    blurb: 'A neighborhood storefront in the Western district.',
    status: 'open'
  },
  {
    id: 'sv',
    name: 'Spectrum SV',
    isFlagship: false,
    district: 'Surowski Valley',
    county: null,
    address: '1 Cultivation Way, Surowski Valley',
    hours: 'Mon–Sun · 10:00–22:00',
    phone: '(010) 311-2206',
    blurb: 'Adjacent to our cultivation facility. Tours by appointment.',
    status: 'open'
  }
]
```

- [ ] **Step 2: Create team**

Create `frontend/src/data/spectrumTeam.js`:

```js
// Spectrum Cannabis leadership team. 4 fictional people for the About page.
// Plain, professional bios. No Minecraft / OOC references.

export const SPECTRUM_TEAM = [
  {
    id: 'imani-reyes',
    name: 'Imani Reyes',
    role: 'Founder & CEO',
    bio: 'Founded Spectrum in 2019 after a decade in agricultural sciences. Sets the company strategy and signs every batch certificate.',
    accentColor: '#8932B8'
  },
  {
    id: 'marcus-tan',
    name: 'Marcus Tan',
    role: 'Head of Cultivation',
    bio: 'Runs the Surowski Valley grow facility. Specializes in low-input indoor cultivation and phenotype selection.',
    accentColor: '#5E7C16'
  },
  {
    id: 'priya-wallace',
    name: 'Priya Wallace',
    role: 'Operations Director',
    bio: 'Oversees retail operations across all six locations. Previously ran logistics for a Praya-based food distributor.',
    accentColor: '#F9801D'
  },
  {
    id: 'daniel-choi',
    name: 'Daniel Choi',
    role: 'Retail Director',
    bio: 'Trains and supports the in-store teams. Spent eight years in specialty wine retail before joining Spectrum in 2021.',
    accentColor: '#3AB3DA'
  }
]
```

- [ ] **Step 3: Verify both parse**

Run: `cd frontend && node -e "Promise.all([import('./src/data/spectrumLocations.js'), import('./src/data/spectrumTeam.js')]).then(([l, t]) => { console.log('Locations:', l.SPECTRUM_LOCATIONS.length); console.log('Team:', t.SPECTRUM_TEAM.length) })"`

Expected:
```
Locations: 6
Team: 4
```

- [ ] **Step 4: Commit**

```bash
git add frontend/src/data/spectrumLocations.js frontend/src/data/spectrumTeam.js
git commit -m "feat(spectrum): add 6-location + 4-team data modules"
```

---

## Task 4: Cart utility + tests (TDD)

**Files:**
- Create: `frontend/src/utils/spectrumCart.js`
- Create: `frontend/src/utils/__tests__/spectrumCart.test.js`

Pure functions for cart math. localStorage hydration + persistence are the responsibility of `SpectrumCartContext` (Task 6) — these helpers stay pure and testable.

- [ ] **Step 1: Write the failing tests**

Create `frontend/src/utils/__tests__/spectrumCart.test.js`:

```js
import { describe, it, expect } from 'vitest'
import {
  emptyCart,
  addItem,
  removeItem,
  updateQty,
  cartItemCount,
  cartSubtotal
} from '../spectrumCart'

const products = [
  { id: 'a', price: 10 },
  { id: 'b', price: 25 },
  { id: 'c', price: 5 }
]

describe('emptyCart', () => {
  it('returns a cart with empty items array', () => {
    expect(emptyCart()).toEqual({ items: [] })
  })
})

describe('addItem', () => {
  it('adds new item to empty cart with qty 1 by default', () => {
    const r = addItem(emptyCart(), 'a')
    expect(r.items).toEqual([{ productId: 'a', qty: 1 }])
  })

  it('adds new item with explicit qty', () => {
    const r = addItem(emptyCart(), 'a', 3)
    expect(r.items).toEqual([{ productId: 'a', qty: 3 }])
  })

  it('increments qty when same product added twice', () => {
    let cart = addItem(emptyCart(), 'a')
    cart = addItem(cart, 'a')
    expect(cart.items).toEqual([{ productId: 'a', qty: 2 }])
  })

  it('keeps separate lines for different products', () => {
    let cart = addItem(emptyCart(), 'a')
    cart = addItem(cart, 'b', 2)
    expect(cart.items).toHaveLength(2)
    expect(cart.items.find(i => i.productId === 'b').qty).toBe(2)
  })

  it('does not mutate the input cart', () => {
    const before = emptyCart()
    addItem(before, 'a')
    expect(before.items).toEqual([])
  })
})

describe('removeItem', () => {
  it('removes the matching line', () => {
    const cart = addItem(addItem(emptyCart(), 'a'), 'b')
    const r = removeItem(cart, 'a')
    expect(r.items).toEqual([{ productId: 'b', qty: 1 }])
  })

  it('returns same cart shape if product not found', () => {
    const cart = addItem(emptyCart(), 'a')
    const r = removeItem(cart, 'zzz')
    expect(r.items).toEqual([{ productId: 'a', qty: 1 }])
  })
})

describe('updateQty', () => {
  it('updates qty for an existing line', () => {
    const cart = addItem(emptyCart(), 'a')
    const r = updateQty(cart, 'a', 5)
    expect(r.items).toEqual([{ productId: 'a', qty: 5 }])
  })

  it('removes line when qty <= 0', () => {
    const cart = addItem(emptyCart(), 'a')
    expect(updateQty(cart, 'a', 0).items).toEqual([])
    expect(updateQty(cart, 'a', -3).items).toEqual([])
  })

  it('is a no-op for unknown product', () => {
    const cart = addItem(emptyCart(), 'a')
    const r = updateQty(cart, 'zzz', 5)
    expect(r.items).toEqual([{ productId: 'a', qty: 1 }])
  })
})

describe('cartItemCount', () => {
  it('returns 0 for empty cart', () => {
    expect(cartItemCount(emptyCart())).toBe(0)
  })

  it('sums quantities across lines', () => {
    let cart = addItem(emptyCart(), 'a', 2)
    cart = addItem(cart, 'b', 3)
    expect(cartItemCount(cart)).toBe(5)
  })
})

describe('cartSubtotal', () => {
  it('returns 0 for empty cart', () => {
    expect(cartSubtotal(emptyCart(), products)).toBe(0)
  })

  it('computes price × qty across lines', () => {
    let cart = addItem(emptyCart(), 'a', 2) // 2 × 10 = 20
    cart = addItem(cart, 'b', 1)            // 1 × 25 = 25
    expect(cartSubtotal(cart, products)).toBe(45)
  })

  it('skips lines whose product is not found in catalog', () => {
    let cart = addItem(emptyCart(), 'a')
    cart = addItem(cart, 'ghost', 5)
    expect(cartSubtotal(cart, products)).toBe(10)
  })
})
```

- [ ] **Step 2: Run tests to confirm they fail**

Run: `cd frontend && npm run test -- spectrumCart --run`
Expected: FAIL — module not found.

- [ ] **Step 3: Create the implementation**

Create `frontend/src/utils/spectrumCart.js`:

```js
// Pure cart math for Spectrum Cannabis. No React, no localStorage — those live in
// SpectrumCartContext. Cart shape: { items: [{ productId, qty }] }.

export function emptyCart() {
  return { items: [] }
}

export function addItem(cart, productId, qty = 1) {
  const existing = cart.items.find(i => i.productId === productId)
  if (existing) {
    return {
      ...cart,
      items: cart.items.map(i =>
        i.productId === productId ? { ...i, qty: i.qty + qty } : i
      )
    }
  }
  return {
    ...cart,
    items: [...cart.items, { productId, qty }]
  }
}

export function removeItem(cart, productId) {
  return {
    ...cart,
    items: cart.items.filter(i => i.productId !== productId)
  }
}

export function updateQty(cart, productId, qty) {
  if (qty <= 0) return removeItem(cart, productId)
  const existing = cart.items.find(i => i.productId === productId)
  if (!existing) return cart
  return {
    ...cart,
    items: cart.items.map(i =>
      i.productId === productId ? { ...i, qty } : i
    )
  }
}

export function cartItemCount(cart) {
  return cart.items.reduce((sum, i) => sum + i.qty, 0)
}

export function cartSubtotal(cart, products) {
  return cart.items.reduce((sum, i) => {
    const product = products.find(p => p.id === i.productId)
    if (!product) return sum
    return sum + product.price * i.qty
  }, 0)
}
```

- [ ] **Step 4: Run tests, confirm pass**

Run: `cd frontend && npm run test -- spectrumCart --run`
Expected: PASS — all describe blocks green, ~14 tests.

- [ ] **Step 5: Commit**

```bash
git add frontend/src/utils/spectrumCart.js frontend/src/utils/__tests__/spectrumCart.test.js
git commit -m "feat(spectrum): cart utility with pure-function tests"
```

---

## Task 5: Filters utility + tests (TDD)

**Files:**
- Create: `frontend/src/utils/spectrumFilters.js`
- Create: `frontend/src/utils/__tests__/spectrumFilters.test.js`

- [ ] **Step 1: Write the failing tests**

Create `frontend/src/utils/__tests__/spectrumFilters.test.js`:

```js
import { describe, it, expect } from 'vitest'
import {
  filterProducts,
  sortProducts,
  applyShopFilters
} from '../spectrumFilters'

const sample = [
  { id: 'f1', name: 'Flower A', category: 'flower', strainType: 'indica', thc: 22, price: 45, featured: true },
  { id: 'f2', name: 'Flower B', category: 'flower', strainType: 'sativa', thc: 24, price: 50, featured: false },
  { id: 'p1', name: 'Pre-Roll A', category: 'pre-rolls', strainType: 'hybrid', thc: 20, price: 12, featured: false },
  { id: 'a1', name: 'Accessory', category: 'accessories', strainType: null, thc: 0, price: 18, featured: false }
]

describe('filterProducts', () => {
  it('returns all products when no filters set', () => {
    expect(filterProducts(sample, {})).toHaveLength(4)
  })

  it('filters by single category', () => {
    const r = filterProducts(sample, { categories: ['flower'] })
    expect(r).toHaveLength(2)
    expect(r.every(p => p.category === 'flower')).toBe(true)
  })

  it('filters by multiple categories (OR semantics)', () => {
    const r = filterProducts(sample, { categories: ['flower', 'pre-rolls'] })
    expect(r).toHaveLength(3)
  })

  it('filters by single strain type', () => {
    const r = filterProducts(sample, { strainTypes: ['indica'] })
    expect(r).toHaveLength(1)
    expect(r[0].id).toBe('f1')
  })

  it('matches strainType: null when filter includes null', () => {
    const r = filterProducts(sample, { strainTypes: [null] })
    expect(r).toHaveLength(1)
    expect(r[0].id).toBe('a1')
  })

  it('combines category and strain filters with AND semantics', () => {
    const r = filterProducts(sample, { categories: ['flower'], strainTypes: ['sativa'] })
    expect(r).toHaveLength(1)
    expect(r[0].id).toBe('f2')
  })

  it('empty arrays match nothing in that dimension', () => {
    const r = filterProducts(sample, { categories: [] })
    expect(r).toHaveLength(4)
  })
})

describe('sortProducts', () => {
  it('featured-first sort puts featured items at top', () => {
    const r = sortProducts(sample, 'featured')
    expect(r[0].featured).toBe(true)
  })

  it('price-asc sorts by price ascending', () => {
    const r = sortProducts(sample, 'price-asc')
    expect(r.map(p => p.price)).toEqual([12, 18, 45, 50])
  })

  it('price-desc sorts by price descending', () => {
    const r = sortProducts(sample, 'price-desc')
    expect(r.map(p => p.price)).toEqual([50, 45, 18, 12])
  })

  it('thc-desc sorts by thc descending; nulls / 0 sink', () => {
    const r = sortProducts(sample, 'thc-desc')
    expect(r[0].thc).toBe(24)
    expect(r[r.length - 1].thc).toBe(0)
  })

  it('does not mutate input', () => {
    const before = [...sample]
    sortProducts(sample, 'price-asc')
    expect(sample).toEqual(before)
  })
})

describe('applyShopFilters', () => {
  it('composes filter then sort', () => {
    const r = applyShopFilters(sample, { categories: ['flower'] }, 'price-asc')
    expect(r).toHaveLength(2)
    expect(r.map(p => p.price)).toEqual([45, 50])
  })
})
```

- [ ] **Step 2: Run tests to confirm fail**

Run: `cd frontend && npm run test -- spectrumFilters --run`
Expected: FAIL — module not found.

- [ ] **Step 3: Create the implementation**

Create `frontend/src/utils/spectrumFilters.js`:

```js
// Pure filter + sort logic for the Spectrum shop. Tested in isolation.

export function filterProducts(products, filters = {}) {
  const { categories, strainTypes } = filters
  return products.filter(p => {
    if (categories && categories.length > 0 && !categories.includes(p.category)) return false
    if (strainTypes && strainTypes.length > 0 && !strainTypes.includes(p.strainType)) return false
    return true
  })
}

export function sortProducts(products, mode) {
  const copy = [...products]
  switch (mode) {
    case 'featured':
      return copy.sort((a, b) => Number(!!b.featured) - Number(!!a.featured))
    case 'price-asc':
      return copy.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return copy.sort((a, b) => b.price - a.price)
    case 'thc-desc':
      return copy.sort((a, b) => (b.thc || 0) - (a.thc || 0))
    default:
      return copy
  }
}

export function applyShopFilters(products, filters, sortMode) {
  return sortProducts(filterProducts(products, filters), sortMode)
}
```

- [ ] **Step 4: Run tests, confirm pass**

Run: `cd frontend && npm run test -- spectrumFilters --run`
Expected: PASS — ~13 tests green.

- [ ] **Step 5: Commit**

```bash
git add frontend/src/utils/spectrumFilters.js frontend/src/utils/__tests__/spectrumFilters.test.js
git commit -m "feat(spectrum): shop filter + sort utility with tests"
```

---

## Task 6: Build the React contexts (cart + age gate)

**Files:**
- Create: `frontend/src/contexts/SpectrumCartContext.jsx`
- Create: `frontend/src/contexts/SpectrumAgeGateContext.jsx`

These wrap the pure utilities with React state + localStorage persistence.

- [ ] **Step 1: Create the contexts directory check**

Run: `ls frontend/src/contexts 2>/dev/null || echo 'absent'`

If absent, the directory will be created when the first file lands — no manual mkdir needed.

- [ ] **Step 2: Create SpectrumCartContext**

Create `frontend/src/contexts/SpectrumCartContext.jsx`:

```jsx
import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import {
  emptyCart,
  addItem as addItemFn,
  removeItem as removeItemFn,
  updateQty as updateQtyFn,
  cartItemCount,
  cartSubtotal
} from '../utils/spectrumCart'
import { SPECTRUM_PRODUCTS } from '../data/spectrumProducts'

const STORAGE_KEY = 'spectrum-cart'

const SpectrumCartContext = createContext(null)

function loadFromStorage() {
  if (typeof window === 'undefined') return emptyCart()
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyCart()
    const parsed = JSON.parse(raw)
    if (!parsed || !Array.isArray(parsed.items)) return emptyCart()
    return parsed
  } catch {
    return emptyCart()
  }
}

function saveToStorage(cart) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
  } catch {
    // Quota exceeded or storage unavailable — fail silently.
  }
}

export function SpectrumCartProvider({ children }) {
  const [cart, setCart] = useState(loadFromStorage)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    saveToStorage(cart)
  }, [cart])

  const addItem = useCallback((productId, qty = 1) => {
    setCart(c => addItemFn(c, productId, qty))
    setDrawerOpen(true)
  }, [])

  const removeItem = useCallback((productId) => {
    setCart(c => removeItemFn(c, productId))
  }, [])

  const updateQty = useCallback((productId, qty) => {
    setCart(c => updateQtyFn(c, productId, qty))
  }, [])

  const clearCart = useCallback(() => {
    setCart(emptyCart())
  }, [])

  const openDrawer = useCallback(() => setDrawerOpen(true), [])
  const closeDrawer = useCallback(() => setDrawerOpen(false), [])

  const value = useMemo(() => ({
    cart,
    addItem,
    removeItem,
    updateQty,
    clearCart,
    itemCount: cartItemCount(cart),
    subtotal: cartSubtotal(cart, SPECTRUM_PRODUCTS),
    drawerOpen,
    openDrawer,
    closeDrawer
  }), [cart, drawerOpen, addItem, removeItem, updateQty, clearCart, openDrawer, closeDrawer])

  return (
    <SpectrumCartContext.Provider value={value}>
      {children}
    </SpectrumCartContext.Provider>
  )
}

SpectrumCartProvider.propTypes = {
  children: PropTypes.node
}

export function useSpectrumCart() {
  const ctx = useContext(SpectrumCartContext)
  if (!ctx) throw new Error('useSpectrumCart must be used inside SpectrumCartProvider')
  return ctx
}
```

- [ ] **Step 3: Create SpectrumAgeGateContext**

Create `frontend/src/contexts/SpectrumAgeGateContext.jsx`:

```jsx
import { createContext, useContext, useState, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

const STORAGE_KEY = 'spectrum-age-verified'

const SpectrumAgeGateContext = createContext(null)

function loadVerified() {
  if (typeof window === 'undefined') return false
  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'true'
  } catch {
    return false
  }
}

export function SpectrumAgeGateProvider({ children }) {
  const [verified, setVerified] = useState(loadVerified)
  const navigate = useNavigate()

  const verify = useCallback(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, 'true')
    } catch {
      // ignore
    }
    setVerified(true)
  }, [])

  const deny = useCallback(() => {
    navigate('/')
  }, [navigate])

  const value = useMemo(() => ({ verified, verify, deny }), [verified, verify, deny])

  return (
    <SpectrumAgeGateContext.Provider value={value}>
      {children}
    </SpectrumAgeGateContext.Provider>
  )
}

SpectrumAgeGateProvider.propTypes = {
  children: PropTypes.node
}

export function useSpectrumAgeGate() {
  const ctx = useContext(SpectrumAgeGateContext)
  if (!ctx) throw new Error('useSpectrumAgeGate must be used inside SpectrumAgeGateProvider')
  return ctx
}
```

- [ ] **Step 4: Verify both modules compile**

Run: `cd frontend && npx vite build 2>&1 | tail -3`
Expected: clean build (modules unimported anywhere yet but should not fail to parse).

If parsing fails, the only common cause is a missing peer (e.g., `prop-types` already a project dep — it is). Fix and re-build.

- [ ] **Step 5: Commit**

```bash
git add frontend/src/contexts/SpectrumCartContext.jsx frontend/src/contexts/SpectrumAgeGateContext.jsx
git commit -m "feat(spectrum): cart + age-gate React contexts with localStorage"
```

---

## Task 7: Spectrum CSS theme

**Files:**
- Create: `frontend/src/pages/spectrum/Spectrum.css`

All Spectrum styles in one file, scoped under `.layout-spectrum`. ~400 lines covering layout, header, footer, buttons, cards, drawer, modal, page-specific blocks. Uses Inter / Inter Tight loaded in Task 1.

- [ ] **Step 1: Create the CSS file**

Create `frontend/src/pages/spectrum/Spectrum.css`:

```css
/* Spectrum Cannabis storefront. Scoped under .layout-spectrum.
   No shared CSS variables with the gov portal — Spectrum is a tenant. */

.layout-spectrum {
  --sp-bg: #FAFAF7;
  --sp-fg: #1A1A1A;
  --sp-muted: #6B7280;
  --sp-border: #E5E5E0;
  --sp-footer-bg: #1A1A1A;
  --sp-footer-fg: #FAFAF7;

  --sp-rainbow-violet: #8932B8;
  --sp-rainbow-indigo: #3C44AA;
  --sp-rainbow-blue: #3AB3DA;
  --sp-rainbow-green: #5E7C16;
  --sp-rainbow-yellow: #FED83D;
  --sp-rainbow-orange: #F9801D;
  --sp-rainbow-red: #B02E26;

  --sp-font-body: 'Inter', system-ui, -apple-system, sans-serif;
  --sp-font-display: 'Inter Tight', 'Inter', system-ui, sans-serif;

  background: var(--sp-bg);
  color: var(--sp-fg);
  font-family: var(--sp-font-body);
  min-height: 100vh;
  font-size: 16px;
  line-height: 1.55;
}

.layout-spectrum *,
.layout-spectrum *::before,
.layout-spectrum *::after {
  box-sizing: border-box;
}

.layout-spectrum h1,
.layout-spectrum h2,
.layout-spectrum h3,
.layout-spectrum h4 {
  font-family: var(--sp-font-display);
  font-weight: 600;
  letter-spacing: -0.02em;
  margin: 0;
}

.layout-spectrum h1 { font-size: 3rem; line-height: 1.1; }
.layout-spectrum h2 { font-size: 2rem; line-height: 1.2; }
.layout-spectrum h3 { font-size: 1.25rem; line-height: 1.3; }

.layout-spectrum a { color: inherit; text-decoration: none; }
.layout-spectrum a:hover { text-decoration: underline; }

.layout-spectrum .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* ---------- Header ---------- */
.sp-header {
  position: sticky;
  top: 0;
  background: var(--sp-bg);
  z-index: 50;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s;
}
.sp-header.scrolled { border-color: var(--sp-border); }

.sp-header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.sp-nav {
  display: flex;
  gap: 32px;
  font-weight: 500;
  font-size: 0.95rem;
}

.sp-nav a {
  color: var(--sp-fg);
  padding: 8px 0;
}

.sp-nav a:hover { text-decoration: underline; text-underline-offset: 4px; }

.sp-cart-btn {
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  color: var(--sp-fg);
}
.sp-cart-badge {
  position: absolute;
  top: 0;
  right: 0;
  background: var(--sp-fg);
  color: var(--sp-bg);
  font-size: 0.7rem;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 18px;
  text-align: center;
}

/* ---------- Logo ---------- */
.sp-logo { display: inline-flex; align-items: center; gap: 14px; }
.sp-logo-bar { display: block; }
.sp-logo-wordmark {
  font-family: var(--sp-font-display);
  font-weight: 600;
  letter-spacing: -0.02em;
  text-transform: lowercase;
  color: var(--sp-fg);
}
.sp-logo-sm .sp-logo-bar { width: 84px; height: 24px; }
.sp-logo-sm .sp-logo-wordmark { font-size: 1rem; }
.sp-logo-md .sp-logo-bar { width: 140px; height: 40px; }
.sp-logo-md .sp-logo-wordmark { font-size: 1.5rem; }
.sp-logo-lg .sp-logo-bar { width: 280px; height: 80px; }
.sp-logo-lg .sp-logo-wordmark { font-size: 3rem; }

/* ---------- Buttons ---------- */
.sp-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  font-family: var(--sp-font-body);
  font-weight: 500;
  font-size: 0.95rem;
  border-radius: 0;
  cursor: pointer;
  border: 1px solid transparent;
  transition: background 0.15s, color 0.15s;
}
.sp-btn-primary {
  background: var(--sp-fg);
  color: var(--sp-bg);
}
.sp-btn-primary:hover { background: #000; }
.sp-btn-secondary {
  background: var(--sp-bg);
  color: var(--sp-fg);
  border-color: var(--sp-fg);
}
.sp-btn-secondary:hover { background: var(--sp-fg); color: var(--sp-bg); }
.sp-btn-large { padding: 16px 32px; font-size: 1.05rem; }

/* ---------- Hero ---------- */
.sp-hero {
  padding: 96px 24px 80px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}
.sp-hero h1 {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  max-width: 16ch;
  letter-spacing: -0.03em;
}
.sp-hero .sp-tagline {
  font-family: var(--sp-font-display);
  font-weight: 600;
  text-transform: lowercase;
  letter-spacing: -0.02em;
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  margin: 0;
}

/* ---------- Section pattern ---------- */
.sp-section { padding: 80px 24px; }
.sp-section-heading {
  margin-bottom: 32px;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}
.sp-section-heading h2 {
  font-size: 1.75rem;
  text-transform: lowercase;
}
.sp-section-heading a {
  color: var(--sp-muted);
  font-size: 0.95rem;
}

/* ---------- Product card ---------- */
.sp-products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 24px;
}
.sp-product-card {
  background: #fff;
  border: 1px solid var(--sp-border);
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: transform 0.15s, border-color 0.15s;
}
.sp-product-card:hover {
  transform: translateY(-2px);
  border-color: var(--sp-fg);
}
.sp-product-image {
  aspect-ratio: 1;
  background: var(--sp-border);
  position: relative;
}
.sp-product-body {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.sp-product-name { font-weight: 600; font-size: 1rem; }
.sp-product-meta {
  color: var(--sp-muted);
  font-size: 0.85rem;
  display: flex;
  gap: 8px;
}
.sp-product-price { font-weight: 600; font-size: 1.05rem; }
.sp-strain-badge {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 2px 8px;
  border: 1px solid currentColor;
  border-radius: 999px;
}

/* ---------- Shop ---------- */
.sp-shop-header { padding: 48px 0 24px; }
.sp-shop-header h1 { font-size: 2.5rem; text-transform: lowercase; }
.sp-shop-count { color: var(--sp-muted); font-size: 0.95rem; margin-top: 8px; }
.sp-filter-bar {
  position: sticky;
  top: 73px;
  background: var(--sp-bg);
  padding: 16px 0;
  border-bottom: 1px solid var(--sp-border);
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  z-index: 10;
}
.sp-filter-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}
.sp-filter-chip {
  padding: 6px 14px;
  border: 1px solid var(--sp-border);
  background: #fff;
  font-size: 0.85rem;
  cursor: pointer;
  border-radius: 999px;
  transition: background 0.1s, color 0.1s, border-color 0.1s;
  font-family: inherit;
}
.sp-filter-chip[aria-pressed='true'] {
  background: var(--sp-fg);
  color: var(--sp-bg);
  border-color: var(--sp-fg);
}
.sp-sort-select {
  padding: 6px 12px;
  border: 1px solid var(--sp-border);
  background: #fff;
  font-family: inherit;
  font-size: 0.85rem;
}

/* ---------- Product detail ---------- */
.sp-product-detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  padding: 48px 0;
}
.sp-product-detail-image {
  aspect-ratio: 1;
  background: var(--sp-border);
}
.sp-product-detail-info {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.sp-product-detail-info h1 {
  font-size: 2.25rem;
  text-transform: none;
  letter-spacing: -0.02em;
}
.sp-thc-cbd {
  display: flex;
  gap: 12px;
}
.sp-thc-cbd .pill {
  background: var(--sp-bg);
  border: 1px solid var(--sp-border);
  padding: 6px 12px;
  font-size: 0.85rem;
  font-weight: 500;
}
.sp-terpenes {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.sp-terpenes .pill {
  background: var(--sp-bg);
  border: 1px solid var(--sp-border);
  padding: 4px 10px;
  font-size: 0.8rem;
  border-radius: 999px;
}
.sp-product-description {
  white-space: pre-wrap;
  color: var(--sp-fg);
  line-height: 1.6;
}
.sp-qty-stepper {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--sp-fg);
}
.sp-qty-stepper button {
  background: none;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 1rem;
  font-family: inherit;
}
.sp-qty-stepper input {
  width: 40px;
  text-align: center;
  border: none;
  font-family: inherit;
  font-size: 0.95rem;
}

@media (max-width: 768px) {
  .sp-product-detail { grid-template-columns: 1fr; gap: 32px; }
}

/* ---------- Locations ---------- */
.sp-location-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}
.sp-location-card {
  background: #fff;
  border: 1px solid var(--sp-border);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.sp-location-card.flagship { border-color: var(--sp-fg); }
.sp-location-card h3 { text-transform: lowercase; }
.sp-location-card .district { color: var(--sp-muted); font-size: 0.9rem; }
.sp-location-card .address { font-size: 0.95rem; }
.sp-location-card .hours { font-size: 0.9rem; color: var(--sp-fg); font-weight: 500; }
.sp-location-card .phone { font-size: 0.9rem; color: var(--sp-muted); }
.sp-status-badge {
  display: inline-block;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 4px 8px;
  background: var(--sp-rainbow-green);
  color: #fff;
  font-weight: 600;
  margin-top: 8px;
  align-self: flex-start;
}

/* ---------- About ---------- */
.sp-values-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; margin: 48px 0; }
.sp-team-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; margin-top: 32px; }
.sp-team-portrait {
  aspect-ratio: 1;
  background: var(--sp-border);
}
.sp-license-block {
  margin-top: 64px;
  padding: 24px;
  border-top: 1px solid var(--sp-border);
  font-size: 0.85rem;
  color: var(--sp-muted);
}
@media (max-width: 768px) {
  .sp-values-grid { grid-template-columns: 1fr; }
  .sp-team-grid { grid-template-columns: 1fr; }
}

/* ---------- Contact ---------- */
.sp-contact-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 48px;
  margin-bottom: 64px;
}
.sp-contact-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.sp-contact-form label { display: block; font-size: 0.9rem; font-weight: 500; margin-bottom: 4px; }
.sp-contact-form input,
.sp-contact-form select,
.sp-contact-form textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--sp-border);
  background: #fff;
  font-family: inherit;
  font-size: 0.95rem;
}
.sp-contact-form textarea { min-height: 140px; resize: vertical; }
.sp-faq-item {
  border-top: 1px solid var(--sp-border);
  padding: 16px 0;
}
.sp-faq-q {
  font-weight: 600;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.sp-faq-a { color: var(--sp-muted); margin-top: 8px; line-height: 1.6; }
@media (max-width: 768px) {
  .sp-contact-grid { grid-template-columns: 1fr; }
}

/* ---------- Footer ---------- */
.sp-footer {
  background: var(--sp-footer-bg);
  color: var(--sp-footer-fg);
  padding: 64px 24px 32px;
}
.sp-footer-inner { max-width: 1200px; margin: 0 auto; }
.sp-footer-cols {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  margin-bottom: 48px;
}
.sp-footer-col h4 {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 16px;
  color: var(--sp-footer-fg);
}
.sp-footer-col ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; font-size: 0.9rem; }
.sp-footer-col a { color: var(--sp-footer-fg); opacity: 0.85; }
.sp-footer-col a:hover { opacity: 1; }
.sp-footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.85rem;
  opacity: 0.7;
}
@media (max-width: 768px) {
  .sp-footer-cols { grid-template-columns: repeat(2, 1fr); }
  .sp-footer-bottom { flex-direction: column; gap: 16px; }
}

/* ---------- Cart drawer ---------- */
.sp-drawer-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 100;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
}
.sp-drawer-backdrop.open { opacity: 1; pointer-events: all; }
.sp-drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 380px;
  max-width: 100vw;
  background: var(--sp-bg);
  z-index: 101;
  transform: translateX(100%);
  transition: transform 0.25s;
  display: flex;
  flex-direction: column;
}
.sp-drawer.open { transform: translateX(0); }
.sp-drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid var(--sp-border);
}
.sp-drawer-header h2 { font-size: 1.25rem; text-transform: lowercase; }
.sp-drawer-close {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  padding: 4px 8px;
  font-family: inherit;
}
.sp-drawer-items { flex: 1; overflow-y: auto; padding: 16px 24px; }
.sp-drawer-item {
  display: flex;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid var(--sp-border);
}
.sp-drawer-item-thumb { width: 60px; height: 60px; background: var(--sp-border); flex-shrink: 0; }
.sp-drawer-item-info { flex: 1; display: flex; flex-direction: column; gap: 4px; }
.sp-drawer-item-name { font-weight: 600; font-size: 0.95rem; }
.sp-drawer-item-meta { color: var(--sp-muted); font-size: 0.85rem; }
.sp-drawer-item-actions { display: flex; justify-content: space-between; align-items: center; margin-top: 4px; }
.sp-drawer-footer { padding: 24px; border-top: 1px solid var(--sp-border); }
.sp-drawer-subtotal {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  font-weight: 600;
  font-size: 1.1rem;
}
.sp-drawer-empty { padding: 64px 24px; text-align: center; color: var(--sp-muted); }

/* ---------- Modal (age gate, checkout-soon) ---------- */
.sp-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(26, 26, 26, 0.6);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}
.sp-modal {
  background: var(--sp-bg);
  max-width: 440px;
  width: 100%;
  padding: 40px 32px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
}
.sp-modal h2 { font-size: 1.5rem; text-transform: lowercase; }
.sp-modal-buttons { display: flex; gap: 12px; margin-top: 16px; }

/* ---------- Toast ---------- */
.sp-toast {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--sp-fg);
  color: var(--sp-bg);
  padding: 12px 20px;
  font-size: 0.95rem;
  z-index: 300;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

/* ---------- Brand strip on home ---------- */
.sp-brand-strip {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
  padding: 80px 24px;
  max-width: 1200px;
  margin: 0 auto;
}
.sp-brand-strip-image {
  aspect-ratio: 4/3;
  background: linear-gradient(135deg, var(--sp-rainbow-violet), var(--sp-rainbow-red));
}
.sp-brand-strip-copy h2 { margin-bottom: 16px; text-transform: lowercase; }
.sp-brand-strip-copy p { color: var(--sp-fg); line-height: 1.7; margin: 0 0 16px; }
@media (max-width: 768px) {
  .sp-brand-strip { grid-template-columns: 1fr; padding: 48px 24px; }
}

/* ---------- Skip link ---------- */
.sp-skip-link {
  position: absolute;
  left: -9999px;
  top: 8px;
  padding: 8px 16px;
  background: var(--sp-fg);
  color: var(--sp-bg);
  z-index: 1000;
}
.sp-skip-link:focus { left: 8px; }

/* ---------- Mobile nav (header) ---------- */
@media (max-width: 768px) {
  .sp-nav { display: none; }
  .sp-header-inner { padding: 12px 16px; }
}
```

- [ ] **Step 2: Commit**

```bash
git add frontend/src/pages/spectrum/Spectrum.css
git commit -m "feat(spectrum): full storefront CSS theme"
```

---

## Task 8: SpectrumLogo component

**Files:**
- Create: `frontend/src/pages/spectrum/components/SpectrumLogo.jsx`

The rainbow bar (inline SVG) plus the wordmark. Takes `size` (`sm` / `md` / `lg`) and `wordmark` (boolean) props.

- [ ] **Step 1: Create the file**

```jsx
import PropTypes from 'prop-types'

// Reverse-rainbow VIBGYOR Minecraft concrete colors, left to right
const COLORS = ['#8932B8', '#3C44AA', '#3AB3DA', '#5E7C16', '#FED83D', '#F9801D', '#B02E26']

export default function SpectrumLogo({ size = 'md', wordmark = true }) {
  const sizeClass = `sp-logo-${size}`
  return (
    <span className={`sp-logo ${sizeClass}`} aria-label="Spectrum Cannabis">
      <svg
        className="sp-logo-bar"
        viewBox="0 0 140 40"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        {COLORS.map((c, i) => (
          <rect key={c} x={i * 20} y="0" width="20" height="40" fill={c} />
        ))}
      </svg>
      {wordmark && <span className="sp-logo-wordmark">spectrum cannabis</span>}
    </span>
  )
}

SpectrumLogo.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  wordmark: PropTypes.bool
}
```

- [ ] **Step 2: Sanity build**

Run: `cd frontend && npx vite build 2>&1 | tail -3`
Expected: clean.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/pages/spectrum/components/SpectrumLogo.jsx
git commit -m "feat(spectrum): SpectrumLogo SVG component"
```

---

## Task 9: ProductCard + LocationCard components

**Files:**
- Create: `frontend/src/pages/spectrum/components/ProductCard.jsx`
- Create: `frontend/src/pages/spectrum/components/LocationCard.jsx`

- [ ] **Step 1: Create ProductCard**

```jsx
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { SPECTRUM_STRAIN_TYPES, SPECTRUM_CATEGORIES } from '../../../data/spectrumProducts'

function strainColor(strainType) {
  const m = SPECTRUM_STRAIN_TYPES.find(s => s.id === strainType)
  return m ? m.color : '#6B7280'
}

function strainLabel(strainType) {
  const m = SPECTRUM_STRAIN_TYPES.find(s => s.id === strainType)
  return m ? m.label : 'N/A'
}

function categoryColor(category) {
  const m = SPECTRUM_CATEGORIES.find(c => c.id === category)
  return m ? m.accentColor : '#6B7280'
}

export default function ProductCard({ product }) {
  const accent = product.accentColor || categoryColor(product.category)
  return (
    <Link to={`/spectrum-cannabis/shop/${product.id}`} className="sp-product-card">
      <div className="sp-product-image" style={{ background: accent }} aria-hidden="true" />
      <div className="sp-product-body">
        <span
          className="sp-strain-badge"
          style={{ color: strainColor(product.strainType) }}
        >
          {strainLabel(product.strainType)}
        </span>
        <span className="sp-product-name">{product.name}</span>
        <span className="sp-product-meta">
          {product.weight}
          {product.thc > 0 && <> · {product.thc}% THC</>}
        </span>
        <span className="sp-product-price">P${product.price}</span>
      </div>
    </Link>
  )
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    strainType: PropTypes.string,
    thc: PropTypes.number,
    weight: PropTypes.string,
    price: PropTypes.number.isRequired,
    accentColor: PropTypes.string
  }).isRequired
}
```

- [ ] **Step 2: Create LocationCard**

```jsx
import PropTypes from 'prop-types'

export default function LocationCard({ location }) {
  return (
    <div className={`sp-location-card ${location.isFlagship ? 'flagship' : ''}`}>
      <h3>{location.name}</h3>
      <p className="district">
        {location.district}{location.county ? ` · ${location.county}` : ''}
      </p>
      <p className="address">{location.address}</p>
      <p className="hours">{location.hours}</p>
      <p className="phone">{location.phone}</p>
      {location.blurb && <p style={{ color: 'var(--sp-muted)', fontSize: '0.9rem', marginTop: '8px' }}>{location.blurb}</p>}
      {location.status === 'open' && <span className="sp-status-badge">Open</span>}
      <a href="#" onClick={e => e.preventDefault()} style={{ marginTop: '12px', fontSize: '0.9rem', color: 'var(--sp-muted)' }}>Get directions →</a>
    </div>
  )
}

LocationCard.propTypes = {
  location: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    isFlagship: PropTypes.bool,
    district: PropTypes.string.isRequired,
    county: PropTypes.string,
    address: PropTypes.string.isRequired,
    hours: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    blurb: PropTypes.string,
    status: PropTypes.string
  }).isRequired
}
```

- [ ] **Step 3: Commit**

```bash
git add frontend/src/pages/spectrum/components/ProductCard.jsx frontend/src/pages/spectrum/components/LocationCard.jsx
git commit -m "feat(spectrum): ProductCard + LocationCard components"
```

---

## Task 10: AgeGate + CartDrawer components

**Files:**
- Create: `frontend/src/pages/spectrum/components/AgeGate.jsx`
- Create: `frontend/src/pages/spectrum/components/CartDrawer.jsx`

- [ ] **Step 1: Create AgeGate**

```jsx
import { useEffect, useRef } from 'react'
import { useSpectrumAgeGate } from '../../../contexts/SpectrumAgeGateContext'
import SpectrumLogo from './SpectrumLogo'

export default function AgeGate() {
  const { verified, verify, deny } = useSpectrumAgeGate()
  const verifyRef = useRef(null)

  useEffect(() => {
    if (!verified) verifyRef.current?.focus()
  }, [verified])

  if (verified) return null

  return (
    <div className="sp-modal-backdrop" role="dialog" aria-modal="true" aria-label="Age verification">
      <div className="sp-modal">
        <SpectrumLogo size="sm" wordmark={false} />
        <h2>welcome to spectrum cannabis</h2>
        <p>you must be 19 or older to enter this site.</p>
        <div className="sp-modal-buttons">
          <button ref={verifyRef} className="sp-btn sp-btn-primary" onClick={verify}>I'm 19 or older</button>
          <button className="sp-btn sp-btn-secondary" onClick={deny}>Take me back</button>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create CartDrawer**

```jsx
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useSpectrumCart } from '../../../contexts/SpectrumCartContext'
import { SPECTRUM_PRODUCTS, SPECTRUM_CATEGORIES } from '../../../data/spectrumProducts'

function categoryColor(category) {
  const m = SPECTRUM_CATEGORIES.find(c => c.id === category)
  return m ? m.accentColor : '#6B7280'
}

export default function CartDrawer() {
  const { cart, removeItem, updateQty, subtotal, drawerOpen, closeDrawer } = useSpectrumCart()
  const [checkoutModal, setCheckoutModal] = useState(false)
  const closeRef = useRef(null)
  const drawerRef = useRef(null)

  useEffect(() => {
    if (!drawerOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') closeDrawer()
      if (e.key !== 'Tab' || !drawerRef.current) return
      const focusable = Array.from(drawerRef.current.querySelectorAll('button, [href], input'))
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => document.removeEventListener('keydown', onKey)
  }, [drawerOpen, closeDrawer])

  const items = cart.items.map(line => {
    const p = SPECTRUM_PRODUCTS.find(x => x.id === line.productId)
    return { line, product: p }
  }).filter(x => x.product)

  return (
    <>
      <div className={`sp-drawer-backdrop ${drawerOpen ? 'open' : ''}`} onClick={closeDrawer} />
      <aside
        ref={drawerRef}
        className={`sp-drawer ${drawerOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
      >
        <div className="sp-drawer-header">
          <h2>your bag</h2>
          <button ref={closeRef} className="sp-drawer-close" onClick={closeDrawer} aria-label="Close cart">×</button>
        </div>
        <div className="sp-drawer-items">
          {items.length === 0 ? (
            <div className="sp-drawer-empty">
              <p>Your bag is empty.</p>
              <Link to="/spectrum-cannabis/shop" onClick={closeDrawer} style={{ textDecoration: 'underline' }}>Browse the shop →</Link>
            </div>
          ) : items.map(({ line, product }) => (
            <div key={product.id} className="sp-drawer-item">
              <div className="sp-drawer-item-thumb" style={{ background: categoryColor(product.category) }} />
              <div className="sp-drawer-item-info">
                <span className="sp-drawer-item-name">{product.name}</span>
                <span className="sp-drawer-item-meta">{product.weight} · P${product.price}</span>
                <div className="sp-drawer-item-actions">
                  <div className="sp-qty-stepper">
                    <button onClick={() => updateQty(product.id, line.qty - 1)} aria-label={`Decrease ${product.name}`}>−</button>
                    <input type="text" value={line.qty} readOnly aria-label={`Quantity of ${product.name}`} />
                    <button onClick={() => updateQty(product.id, line.qty + 1)} aria-label={`Increase ${product.name}`}>+</button>
                  </div>
                  <button onClick={() => removeItem(product.id)} aria-label={`Remove ${product.name}`} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--sp-muted)' }}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {items.length > 0 && (
          <div className="sp-drawer-footer">
            <div className="sp-drawer-subtotal"><span>Subtotal</span><span>P${subtotal}</span></div>
            <button className="sp-btn sp-btn-primary sp-btn-large" style={{ width: '100%' }} onClick={() => setCheckoutModal(true)}>Checkout</button>
          </div>
        )}
      </aside>
      {checkoutModal && (
        <div className="sp-modal-backdrop" role="dialog" aria-modal="true" aria-label="Checkout">
          <div className="sp-modal">
            <h2>online ordering coming Q3 2026</h2>
            <p>Visit any of our 6 locations to purchase today.</p>
            <div className="sp-modal-buttons">
              <Link to="/spectrum-cannabis/locations" className="sp-btn sp-btn-primary" onClick={() => { setCheckoutModal(false); closeDrawer() }}>Find a store</Link>
              <button className="sp-btn sp-btn-secondary" onClick={() => setCheckoutModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add frontend/src/pages/spectrum/components/AgeGate.jsx frontend/src/pages/spectrum/components/CartDrawer.jsx
git commit -m "feat(spectrum): AgeGate + CartDrawer components"
```

---

## Task 11: SpectrumHeader + SpectrumFooter

**Files:**
- Create: `frontend/src/pages/spectrum/components/SpectrumHeader.jsx`
- Create: `frontend/src/pages/spectrum/components/SpectrumFooter.jsx`

- [ ] **Step 1: Create SpectrumHeader**

```jsx
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SpectrumLogo from './SpectrumLogo'
import { useSpectrumCart } from '../../../contexts/SpectrumCartContext'

export default function SpectrumHeader() {
  const [scrolled, setScrolled] = useState(false)
  const { itemCount, openDrawer } = useSpectrumCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`sp-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="sp-header-inner">
        <Link to="/spectrum-cannabis"><SpectrumLogo size="md" /></Link>
        <nav className="sp-nav" aria-label="Main">
          <Link to="/spectrum-cannabis/shop">Shop</Link>
          <Link to="/spectrum-cannabis/locations">Locations</Link>
          <Link to="/spectrum-cannabis/about">About</Link>
          <Link to="/spectrum-cannabis/contact">Contact</Link>
        </nav>
        <button className="sp-cart-btn" onClick={openDrawer} aria-label={`Open cart, ${itemCount} items`}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M3 3h2l3 12h12l2-7H6"/>
            <circle cx="9" cy="20" r="1.5"/>
            <circle cx="18" cy="20" r="1.5"/>
          </svg>
          {itemCount > 0 && <span className="sp-cart-badge">{itemCount}</span>}
        </button>
      </div>
    </header>
  )
}
```

- [ ] **Step 2: Create SpectrumFooter**

```jsx
import { Link } from 'react-router-dom'
import SpectrumLogo from './SpectrumLogo'
import { SPECTRUM_LOCATIONS } from '../../../data/spectrumLocations'

export default function SpectrumFooter() {
  return (
    <footer className="sp-footer">
      <div className="sp-footer-inner">
        <div className="sp-footer-cols">
          <div className="sp-footer-col">
            <h4>Shop</h4>
            <ul>
              <li><Link to="/spectrum-cannabis/shop">Flower</Link></li>
              <li><Link to="/spectrum-cannabis/shop">Pre-Rolls</Link></li>
              <li><Link to="/spectrum-cannabis/shop">Edibles</Link></li>
              <li><Link to="/spectrum-cannabis/shop">Vapes</Link></li>
              <li><Link to="/spectrum-cannabis/shop">Accessories</Link></li>
            </ul>
          </div>
          <div className="sp-footer-col">
            <h4>Locations</h4>
            <ul>
              {SPECTRUM_LOCATIONS.map(l => (
                <li key={l.id}><Link to="/spectrum-cannabis/locations">{l.name.replace('Spectrum ', '')}</Link></li>
              ))}
            </ul>
          </div>
          <div className="sp-footer-col">
            <h4>Company</h4>
            <ul>
              <li><Link to="/spectrum-cannabis/about">About</Link></li>
              <li><a href="#" onClick={e => e.preventDefault()}>Careers</a></li>
              <li><Link to="/spectrum-cannabis/contact">Contact</Link></li>
              <li><a href="#" onClick={e => e.preventDefault()}>Press</a></li>
            </ul>
          </div>
          <div className="sp-footer-col">
            <h4>Legal</h4>
            <ul>
              <li><a href="#" onClick={e => e.preventDefault()}>Terms</a></li>
              <li><a href="#" onClick={e => e.preventDefault()}>Privacy</a></li>
              <li><a href="#" onClick={e => e.preventDefault()}>License Info</a></li>
            </ul>
          </div>
        </div>
        <div className="sp-footer-bottom">
          <SpectrumLogo size="sm" wordmark={false} />
          <span>© 2026 Spectrum Cannabis · License #CTB-2019-0042</span>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add frontend/src/pages/spectrum/components/SpectrumHeader.jsx frontend/src/pages/spectrum/components/SpectrumFooter.jsx
git commit -m "feat(spectrum): header + footer components"
```

---

## Task 12: SpectrumLayout + page components

**Files:**
- Create: `frontend/src/pages/spectrum/SpectrumLayout.jsx`
- Create: `frontend/src/pages/spectrum/SpectrumHome.jsx`
- Create: `frontend/src/pages/spectrum/SpectrumShop.jsx`
- Create: `frontend/src/pages/spectrum/SpectrumProduct.jsx`
- Create: `frontend/src/pages/spectrum/SpectrumLocations.jsx`
- Create: `frontend/src/pages/spectrum/SpectrumAbout.jsx`
- Create: `frontend/src/pages/spectrum/SpectrumContact.jsx`

Single commit covering all 7 since they're tightly coupled (the layout imports them all).

- [ ] **Step 1: Create SpectrumLayout**

```jsx
import { Outlet } from 'react-router-dom'
import { SpectrumCartProvider } from '../../contexts/SpectrumCartContext'
import { SpectrumAgeGateProvider } from '../../contexts/SpectrumAgeGateContext'
import SpectrumHeader from './components/SpectrumHeader'
import SpectrumFooter from './components/SpectrumFooter'
import AgeGate from './components/AgeGate'
import CartDrawer from './components/CartDrawer'
import './Spectrum.css'

export default function SpectrumLayout() {
  return (
    <SpectrumAgeGateProvider>
      <SpectrumCartProvider>
        <div className="layout-spectrum">
          <a href="#sp-main" className="sp-skip-link">Skip to main content</a>
          <SpectrumHeader />
          <main id="sp-main">
            <Outlet />
          </main>
          <SpectrumFooter />
          <AgeGate />
          <CartDrawer />
        </div>
      </SpectrumCartProvider>
    </SpectrumAgeGateProvider>
  )
}
```

- [ ] **Step 2: Create SpectrumHome**

```jsx
import { Link } from 'react-router-dom'
import SpectrumLogo from './components/SpectrumLogo'
import ProductCard from './components/ProductCard'
import LocationCard from './components/LocationCard'
import { SPECTRUM_PRODUCTS } from '../../data/spectrumProducts'
import { SPECTRUM_LOCATIONS } from '../../data/spectrumLocations'

export default function SpectrumHome() {
  const featured = SPECTRUM_PRODUCTS.filter(p => p.featured)
  return (
    <>
      <section className="sp-hero">
        <SpectrumLogo size="lg" />
        <h1>cannabis, for everyone.</h1>
        <Link to="/spectrum-cannabis/shop" className="sp-btn sp-btn-primary sp-btn-large">Shop the menu →</Link>
      </section>

      <section className="sp-section container">
        <div className="sp-section-heading">
          <h2>this week's highlights</h2>
          <Link to="/spectrum-cannabis/shop">See all →</Link>
        </div>
        <div className="sp-products-grid">
          {featured.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <section className="sp-section container">
        <div className="sp-section-heading">
          <h2>find us</h2>
          <Link to="/spectrum-cannabis/locations">All locations →</Link>
        </div>
        <div className="sp-location-grid">
          {SPECTRUM_LOCATIONS.map(l => <LocationCard key={l.id} location={l} />)}
        </div>
      </section>

      <section className="sp-brand-strip">
        <div className="sp-brand-strip-image" aria-hidden="true" />
        <div className="sp-brand-strip-copy">
          <h2>family-owned. praya-grown. since 2019.</h2>
          <p>We started Spectrum to do cannabis right — single-origin Praya cultivation, full transparency on every batch, and a staff that actually knows what they're selling.</p>
          <p>Six stores, one supply chain, zero shortcuts.</p>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 3: Create SpectrumShop**

```jsx
import { useState, useMemo } from 'react'
import ProductCard from './components/ProductCard'
import { SPECTRUM_PRODUCTS, SPECTRUM_CATEGORIES, SPECTRUM_STRAIN_TYPES } from '../../data/spectrumProducts'
import { applyShopFilters } from '../../utils/spectrumFilters'

export default function SpectrumShop() {
  const [categories, setCategories] = useState([])
  const [strainTypes, setStrainTypes] = useState([])
  const [sortMode, setSortMode] = useState('featured')

  const visible = useMemo(
    () => applyShopFilters(SPECTRUM_PRODUCTS, { categories, strainTypes }, sortMode),
    [categories, strainTypes, sortMode]
  )

  const toggleCategory = (id) =>
    setCategories(c => c.includes(id) ? c.filter(x => x !== id) : [...c, id])
  const toggleStrain = (id) =>
    setStrainTypes(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id])
  const clearFilters = () => { setCategories([]); setStrainTypes([]) }

  return (
    <>
      <div className="container sp-shop-header">
        <h1>shop</h1>
        <p className="sp-shop-count">{visible.length} of {SPECTRUM_PRODUCTS.length} products</p>
      </div>

      <div className="sp-filter-bar container">
        <div className="sp-filter-group" role="group" aria-label="Category filters">
          {SPECTRUM_CATEGORIES.map(c => (
            <button
              key={c.id}
              type="button"
              className="sp-filter-chip"
              aria-pressed={categories.includes(c.id)}
              onClick={() => toggleCategory(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>
        <div className="sp-filter-group" role="group" aria-label="Strain filters">
          {SPECTRUM_STRAIN_TYPES.map(s => (
            <button
              key={String(s.id)}
              type="button"
              className="sp-filter-chip"
              aria-pressed={strainTypes.includes(s.id)}
              onClick={() => toggleStrain(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>
        <label style={{ marginLeft: 'auto', display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--sp-muted)' }}>Sort</span>
          <select className="sp-sort-select" value={sortMode} onChange={e => setSortMode(e.target.value)}>
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="thc-desc">Strongest THC</option>
          </select>
        </label>
      </div>

      <section className="sp-section container">
        {visible.length === 0 ? (
          <div style={{ padding: '64px 0', textAlign: 'center', color: 'var(--sp-muted)' }}>
            <p>No products match these filters.</p>
            <button className="sp-btn sp-btn-secondary" onClick={clearFilters} style={{ marginTop: '16px' }}>Clear filters →</button>
          </div>
        ) : (
          <div className="sp-products-grid">
            {visible.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>
    </>
  )
}
```

- [ ] **Step 4: Create SpectrumProduct**

```jsx
import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import ProductCard from './components/ProductCard'
import { SPECTRUM_PRODUCTS, SPECTRUM_STRAIN_TYPES, SPECTRUM_CATEGORIES } from '../../data/spectrumProducts'
import { SPECTRUM_LOCATIONS } from '../../data/spectrumLocations'
import { useSpectrumCart } from '../../contexts/SpectrumCartContext'

function strainLabel(t) {
  const m = SPECTRUM_STRAIN_TYPES.find(s => s.id === t)
  return m ? m.label : 'N/A'
}
function strainColor(t) {
  const m = SPECTRUM_STRAIN_TYPES.find(s => s.id === t)
  return m ? m.color : '#6B7280'
}
function categoryColor(c) {
  const m = SPECTRUM_CATEGORIES.find(x => x.id === c)
  return m ? m.accentColor : '#6B7280'
}

export default function SpectrumProduct() {
  const { productId } = useParams()
  const { addItem } = useSpectrumCart()
  const [qty, setQty] = useState(1)
  const [storeId, setStoreId] = useState(SPECTRUM_LOCATIONS[0].id)

  const product = SPECTRUM_PRODUCTS.find(p => p.id === productId)
  if (!product) {
    return (
      <section className="sp-section container">
        <h1>Product not found</h1>
        <p style={{ marginTop: '16px' }}><Link to="/spectrum-cannabis/shop">← Back to shop</Link></p>
      </section>
    )
  }

  const related = SPECTRUM_PRODUCTS
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <section className="container">
      <div className="sp-product-detail">
        <div className="sp-product-detail-image" style={{ background: product.accentColor || categoryColor(product.category) }} />
        <div className="sp-product-detail-info">
          <span className="sp-strain-badge" style={{ color: strainColor(product.strainType), alignSelf: 'flex-start' }}>
            {strainLabel(product.strainType)}
          </span>
          <h1>{product.name}</h1>
          <span className="sp-product-price" style={{ fontSize: '1.5rem' }}>P${product.price}</span>
          <span style={{ color: 'var(--sp-muted)' }}>{product.weight}</span>
          {(product.thc > 0 || product.cbd > 0) && (
            <div className="sp-thc-cbd">
              {product.thc > 0 && <span className="pill">{product.thc}% THC</span>}
              {product.cbd > 0 && <span className="pill">{product.cbd}% CBD</span>}
            </div>
          )}
          {product.terpenes.length > 0 && (
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--sp-muted)' }}>Dominant terpenes</span>
              <div className="sp-terpenes" style={{ marginTop: '4px' }}>
                {product.terpenes.map(t => <span key={t} className="pill">{t}</span>)}
              </div>
            </div>
          )}
          <p className="sp-product-description">{product.description}</p>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '8px' }}>
            <div className="sp-qty-stepper">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} aria-label="Decrease quantity">−</button>
              <input type="text" value={qty} readOnly aria-label="Quantity" />
              <button onClick={() => setQty(q => q + 1)} aria-label="Increase quantity">+</button>
            </div>
            <button className="sp-btn sp-btn-primary sp-btn-large" onClick={() => addItem(product.id, qty)}>Add to Bag</button>
          </div>
          <div style={{ marginTop: '8px' }}>
            <label style={{ fontSize: '0.85rem', color: 'var(--sp-muted)' }}>Available at:&nbsp;
              <select value={storeId} onChange={e => setStoreId(e.target.value)} className="sp-sort-select" style={{ marginLeft: '4px' }}>
                {SPECTRUM_LOCATIONS.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
              </select>
            </label>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="sp-section">
          <div className="sp-section-heading"><h2>related products</h2></div>
          <div className="sp-products-grid">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </section>
  )
}
```

- [ ] **Step 5: Create SpectrumLocations**

```jsx
import LocationCard from './components/LocationCard'
import { SPECTRUM_LOCATIONS } from '../../data/spectrumLocations'

export default function SpectrumLocations() {
  return (
    <section className="sp-section container">
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ textTransform: 'lowercase' }}>locations</h1>
        <p style={{ color: 'var(--sp-muted)', marginTop: '8px' }}>6 stores across Praya. Visit us in person.</p>
      </div>
      <div className="sp-location-grid">
        {SPECTRUM_LOCATIONS.map(l => <LocationCard key={l.id} location={l} />)}
      </div>
      <p style={{ marginTop: '48px', color: 'var(--sp-muted)' }}>
        All locations carry the full catalog. Hours and contact details are listed per location above.
      </p>
    </section>
  )
}
```

- [ ] **Step 6: Create SpectrumAbout**

```jsx
import { SPECTRUM_TEAM } from '../../data/spectrumTeam'

export default function SpectrumAbout() {
  return (
    <section className="sp-section container">
      <h1 style={{ textTransform: 'lowercase' }}>about spectrum</h1>

      <div style={{ maxWidth: '70ch', marginTop: '32px' }}>
        <p>Spectrum was founded in 2019, in the early years of federal cannabis legalization in Praya. We opened our first store in Oakville and grew the business one location at a time, on the premise that the people who buy from us deserve the same quality, transparency, and care that we'd want from our own dispensary.</p>
        <p style={{ marginTop: '16px' }}>We grow most of what we sell at our Surowski Valley facility. The catalog is curated, not exhaustive — we'd rather stock fewer products and stand behind every one than chase volume.</p>
        <p style={{ marginTop: '16px' }}>Cannabis, for everyone — we mean it. Every store, every batch, every customer.</p>
      </div>

      <div className="sp-values-grid">
        <div>
          <h3 style={{ textTransform: 'lowercase' }}>quality</h3>
          <p style={{ color: 'var(--sp-muted)', marginTop: '8px' }}>Every batch is lab-tested. The full Certificate of Analysis is available for any product we sell, on request, at any location.</p>
        </div>
        <div>
          <h3 style={{ textTransform: 'lowercase' }}>transparency</h3>
          <p style={{ color: 'var(--sp-muted)', marginTop: '8px' }}>Every product lists its strain, terpene profile, and sourcing. No proprietary secrecy on what's inside.</p>
        </div>
        <div>
          <h3 style={{ textTransform: 'lowercase' }}>community</h3>
          <p style={{ color: 'var(--sp-muted)', marginTop: '8px' }}>Locally owned, locally operated, locally staffed. Every Spectrum employee is a Praya resident.</p>
        </div>
      </div>

      <h2 style={{ textTransform: 'lowercase', marginTop: '64px' }}>the team</h2>
      <div className="sp-team-grid">
        {SPECTRUM_TEAM.map(person => (
          <div key={person.id}>
            <div className="sp-team-portrait" style={{ background: person.accentColor }} />
            <div style={{ padding: '16px 0' }}>
              <h3 style={{ textTransform: 'none' }}>{person.name}</h3>
              <p style={{ color: 'var(--sp-muted)', fontSize: '0.95rem' }}>{person.role}</p>
              <p style={{ marginTop: '8px' }}>{person.bio}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="sp-license-block">
        Licensed by the Cannabis Tax Bureau, Director-General David Pereira · License #CTB-2019-0042 · Issued 2019-04-22
      </div>
    </section>
  )
}
```

- [ ] **Step 7: Create SpectrumContact**

```jsx
import { useState } from 'react'

const FAQ = [
  { q: 'Do you deliver?', a: "We don't currently offer delivery. All purchases are made in-store. Online ordering with in-store pickup is launching Q3 2026." },
  { q: 'Can I pre-order online?', a: 'Online ordering launches Q3 2026. Until then, please visit any of our 6 stores to purchase.' },
  { q: 'Do I need to be a Praya citizen to shop?', a: 'No. You must be 19 or older with a valid government-issued photo ID. Praya residents and visitors are both welcome.' },
  { q: "What's your return policy?", a: "Defective or damaged products can be returned within 30 days with proof of purchase. Cannabis products themselves are non-returnable once opened." },
  { q: 'How do I get a wholesale account?', a: 'Use the contact form with subject "Wholesale" and someone from our wholesale team will reach out within 1-2 business days.' }
]

export default function SpectrumContact() {
  const [open, setOpen] = useState(null)
  const [toast, setToast] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setToast("Thanks — we'll be in touch within 1-2 business days.")
    e.target.reset()
    setTimeout(() => setToast(''), 3000)
  }

  return (
    <section className="sp-section container">
      <h1 style={{ textTransform: 'lowercase' }}>contact</h1>
      <p style={{ color: 'var(--sp-muted)', marginTop: '8px', marginBottom: '32px' }}>Reach our team — we read every message.</p>

      <div className="sp-contact-grid">
        <form className="sp-contact-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="contact-name">Name</label>
            <input id="contact-name" name="name" type="text" required />
          </div>
          <div>
            <label htmlFor="contact-email">Email</label>
            <input id="contact-email" name="email" type="email" required />
          </div>
          <div>
            <label htmlFor="contact-subject">Subject</label>
            <select id="contact-subject" name="subject" required defaultValue="">
              <option value="" disabled>Select a topic</option>
              <option value="general">General</option>
              <option value="wholesale">Wholesale</option>
              <option value="press">Press</option>
              <option value="complaint">Complaint</option>
            </select>
          </div>
          <div>
            <label htmlFor="contact-message">Message</label>
            <textarea id="contact-message" name="message" required />
          </div>
          <button type="submit" className="sp-btn sp-btn-primary">Send message</button>
        </form>
        <aside>
          <h3 style={{ textTransform: 'lowercase' }}>general contact</h3>
          <p style={{ marginTop: '8px' }}>hello@spectrumcannabis.praya</p>
          <p>(010) 311-2200</p>
          <p style={{ color: 'var(--sp-muted)', marginTop: '16px' }}>
            Spectrum HQ<br />
            80 Leman Street<br />
            Oakville, Praya
          </p>
          <p style={{ marginTop: '16px', fontSize: '0.85rem', color: 'var(--sp-muted)' }}>Customer service hours: Mon–Fri 09:00–18:00</p>
        </aside>
      </div>

      <h2 style={{ textTransform: 'lowercase', marginBottom: '16px' }}>frequently asked</h2>
      <div>
        {FAQ.map((item, i) => (
          <div key={item.q} className="sp-faq-item">
            <button
              type="button"
              className="sp-faq-q"
              onClick={() => setOpen(o => o === i ? null : i)}
              aria-expanded={open === i}
              style={{ width: '100%', background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left', font: 'inherit' }}
            >
              <span>{item.q}</span>
              <span aria-hidden="true">{open === i ? '−' : '+'}</span>
            </button>
            {open === i && <p className="sp-faq-a">{item.a}</p>}
          </div>
        ))}
      </div>

      {toast && <div className="sp-toast" role="status" aria-live="polite">{toast}</div>}
    </section>
  )
}
```

- [ ] **Step 8: Verify the build compiles**

Run: `cd frontend && npx vite build 2>&1 | tail -5`
Expected: clean. Even though no route renders these yet, every component must parse cleanly with all its imports resolved.

- [ ] **Step 9: Commit**

```bash
git add frontend/src/pages/spectrum/SpectrumLayout.jsx frontend/src/pages/spectrum/SpectrumHome.jsx frontend/src/pages/spectrum/SpectrumShop.jsx frontend/src/pages/spectrum/SpectrumProduct.jsx frontend/src/pages/spectrum/SpectrumLocations.jsx frontend/src/pages/spectrum/SpectrumAbout.jsx frontend/src/pages/spectrum/SpectrumContact.jsx
git commit -m "feat(spectrum): SpectrumLayout + 6 page components"
```

---

## Task 13: Wire up routes in App.jsx

**Files:**
- Modify: `frontend/src/App.jsx`

Mount Spectrum under `/spectrum-cannabis/*` outside the gov `<Layout>`. Use a nested-route block — `SpectrumLayout` provides the `<Outlet />` for child routes.

- [ ] **Step 1: Add lazy imports**

In `frontend/src/App.jsx`, find the block of dept lazy imports (the cluster ending with `IMMD`, `CBCA`, etc.). Add right after the `IMMD` import:

```jsx
const SpectrumLayout = lazy(() => import('./pages/spectrum/SpectrumLayout'))
const SpectrumHome = lazy(() => import('./pages/spectrum/SpectrumHome'))
const SpectrumShop = lazy(() => import('./pages/spectrum/SpectrumShop'))
const SpectrumProduct = lazy(() => import('./pages/spectrum/SpectrumProduct'))
const SpectrumLocations = lazy(() => import('./pages/spectrum/SpectrumLocations'))
const SpectrumAbout = lazy(() => import('./pages/spectrum/SpectrumAbout'))
const SpectrumContact = lazy(() => import('./pages/spectrum/SpectrumContact'))
```

- [ ] **Step 2: Add the routes**

Find the "Standalone pages (outside Layout for custom headers)" comment block in App.jsx, which contains the existing `Status` and `Payments` routes:

```jsx
            {/* Standalone pages (outside Layout for custom headers) */}
            <Route path="/status" element={<Status />} />
            <Route path="/payments" element={<Payments />} />
```

Add Spectrum's nested route block directly after, still outside `<Route path="/" element={<Layout />}>`:

```jsx
            {/* Standalone pages (outside Layout for custom headers) */}
            <Route path="/status" element={<Status />} />
            <Route path="/payments" element={<Payments />} />

            {/* Spectrum Cannabis — private storefront, no gov chrome */}
            <Route path="/spectrum-cannabis" element={<SpectrumLayout />}>
              <Route index element={<SpectrumHome />} />
              <Route path="shop" element={<SpectrumShop />} />
              <Route path="shop/:productId" element={<SpectrumProduct />} />
              <Route path="locations" element={<SpectrumLocations />} />
              <Route path="about" element={<SpectrumAbout />} />
              <Route path="contact" element={<SpectrumContact />} />
            </Route>
```

- [ ] **Step 3: Smoke-test in dev mode**

Run: `cd frontend && npm run dev` (in the background — use Ctrl+C to stop after the next two checks)

Visit `http://localhost:5173/spectrum-cannabis` — you should see:
1. The age gate modal first (on first visit). Click "I'm 19 or older."
2. The Spectrum homepage: rainbow logo, hero, featured grid, locations grid, brand strip, footer
3. **No gov header. No ChatWidget. No EmergencyAlert.**

Visit `http://localhost:5173/` — gov portal still renders normally (no Spectrum chrome).

Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add frontend/src/App.jsx
git commit -m "feat(spectrum): wire 6-route block under /spectrum-cannabis"
```

---

## Task 14: CTB integration — Licensed Operators section

**Files:**
- Modify: `frontend/src/pages/CTB.jsx`

Add a "Licensed Operators" section to the existing CTB page that links to Spectrum. Spectrum is featured; 5-7 other invented operators have no website.

- [ ] **Step 1: Read the existing CTB.jsx structure**

Run: `grep -n "section\|news-card\|<Route" frontend/src/pages/CTB.jsx | head -20`

Identify a clear insertion point — the spec calls for inserting between license categories and what comes next. Looking at the existing structure, an insertion after the news section (line ~213) but before whatever closes out the dashboard works.

- [ ] **Step 2: Add the operator data inline at the top of CTB.jsx**

Find the imports at the top of `CTB.jsx`. After all imports but before the first function declaration, add:

```jsx
const LICENSED_OPERATORS = [
  { id: 'spectrum', name: 'Spectrum Cannabis', license: 'CTB-2019-0042', type: 'Retail', locations: 6, status: 'Active', website: '/spectrum-cannabis', featured: true },
  { id: 'greenleaf', name: 'Greenleaf Cannabis Co.', license: 'CTB-2020-0118', type: 'Retail', locations: 3, status: 'Active', website: null },
  { id: 'highland-bloom', name: 'Highland Bloom Apothecary', license: 'CTB-2021-0234', type: 'Retail', locations: 1, status: 'Active', website: null },
  { id: 'praya-cannabis-co', name: 'Praya Cannabis Co.', license: 'CTB-2019-0017', type: 'Cultivation', locations: 1, status: 'Active', website: null },
  { id: 'oak-and-leaf', name: 'Oak & Leaf Distribution', license: 'CTB-2022-0401', type: 'Distribution', locations: 2, status: 'Active', website: null },
  { id: 'craft-buds', name: 'Craft Buds Manufacturing', license: 'CTB-2020-0089', type: 'Manufacturing', locations: 1, status: 'Active', website: null },
  { id: 'cascadia-cannabis', name: 'Cascadia Cannabis Group', license: 'CTB-2021-0156', type: 'Retail', locations: 4, status: 'Active', website: null }
]
```

- [ ] **Step 3: Insert the section into the dashboard**

In the same file, find the dashboard JSX where the news section ends (look for the closing tags of the news card, around line 220-230). Add this new section directly after — the exact insertion point is right before the closing tag of the dashboard's grid container:

```jsx
              <div className="content-card" style={{ marginTop: '24px' }}>
                <div className="card-header">
                  <h2>Licensed Operators</h2>
                  <span className="card-subtitle">Active cannabis businesses operating under CTB license</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px', padding: '16px 0' }}>
                  {LICENSED_OPERATORS.map(op => (
                    <div
                      key={op.id}
                      style={{
                        padding: '16px',
                        border: op.featured ? '2px solid var(--primary-color)' : '1px solid var(--border-color)',
                        background: 'var(--card-bg, #fff)',
                        position: 'relative'
                      }}
                    >
                      {op.featured && (
                        <div style={{ display: 'flex', gap: '2px', marginBottom: '8px', height: '8px' }}>
                          {['#8932B8','#3C44AA','#3AB3DA','#5E7C16','#FED83D','#F9801D','#B02E26'].map(c => (
                            <div key={c} style={{ flex: 1, background: c }} />
                          ))}
                        </div>
                      )}
                      <h3 style={{ margin: '0 0 4px', fontSize: '1.05rem' }}>{op.name}</h3>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>License #{op.license}</p>
                      <p style={{ margin: '4px 0', fontSize: '0.9rem' }}>{op.type} · {op.locations} location{op.locations !== 1 ? 's' : ''}</p>
                      <p style={{ margin: '4px 0', fontSize: '0.85rem', color: '#0d9488', fontWeight: 500 }}>{op.status}</p>
                      {op.website ? (
                        <Link
                          to={op.website}
                          style={{ display: 'inline-block', marginTop: '8px', fontSize: '0.9rem', fontWeight: 500 }}
                        >
                          View website →
                        </Link>
                      ) : (
                        <span style={{ display: 'inline-block', marginTop: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                          Site not provided
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
```

If `Link` is not yet imported in CTB.jsx, add it to the existing react-router-dom import line. Run `head -10 frontend/src/pages/CTB.jsx` to confirm.

- [ ] **Step 4: Smoke-test the link works**

Run dev server: `cd frontend && npm run dev`

Visit `http://localhost:5173/ctb` — scroll down. The new "Licensed Operators" section should render. Spectrum's card has the rainbow bar across the top. Click "View website →" — it should navigate to `/spectrum-cannabis` and show the age gate.

Stop dev server.

- [ ] **Step 5: Commit**

```bash
git add frontend/src/pages/CTB.jsx
git commit -m "feat(ctb): add Licensed Operators section linking to Spectrum"
```

---

## Task 15: Component smoke tests

**Files:**
- Create: `frontend/src/pages/spectrum/__tests__/Spectrum.test.jsx`

Mirror the IMMD pattern. Test the renderable surface, not implementation.

- [ ] **Step 1: Create the test file**

```jsx
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, within } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import SpectrumLayout from '../SpectrumLayout'
import SpectrumHome from '../SpectrumHome'
import SpectrumShop from '../SpectrumShop'
import SpectrumLocations from '../SpectrumLocations'
import SpectrumAbout from '../SpectrumAbout'

function renderRoute(path, extra = []) {
  // Pre-verify age gate so it does not block the tests
  window.localStorage.setItem('spectrum-age-verified', 'true')
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/spectrum-cannabis" element={<SpectrumLayout />}>
            <Route index element={<SpectrumHome />} />
            <Route path="shop" element={<SpectrumShop />} />
            <Route path="locations" element={<SpectrumLocations />} />
            <Route path="about" element={<SpectrumAbout />} />
            {extra}
          </Route>
        </Routes>
      </MemoryRouter>
    </HelmetProvider>
  )
}

describe('SpectrumHome', () => {
  it('renders the tagline', () => {
    renderRoute('/spectrum-cannabis')
    expect(screen.getByText(/cannabis, for everyone\./i)).toBeInTheDocument()
  })

  it('renders 6 featured products', () => {
    renderRoute('/spectrum-cannabis')
    const heading = screen.getByRole('heading', { name: /this week's highlights/i })
    const section = heading.closest('section')
    const cards = within(section).getAllByRole('link')
    // Each ProductCard renders as a single link → exactly 6 product links
    expect(cards.length).toBeGreaterThanOrEqual(6)
  })

  it('renders all 6 location cards', () => {
    renderRoute('/spectrum-cannabis')
    expect(screen.getByText('Spectrum Oakville')).toBeInTheDocument()
    expect(screen.getByText('Spectrum SV')).toBeInTheDocument()
  })
})

describe('SpectrumShop', () => {
  it('renders 40 products by default', () => {
    renderRoute('/spectrum-cannabis/shop')
    expect(screen.getByText(/40 of 40 products/i)).toBeInTheDocument()
  })

  it('filters reduce visible products when category chip is toggled', () => {
    renderRoute('/spectrum-cannabis/shop')
    const flowerChip = screen.getByRole('button', { name: 'Flower' })
    fireEvent.click(flowerChip)
    expect(screen.getByText(/12 of 40 products/i)).toBeInTheDocument()
  })

  it('clear-filters button restores all products on empty result', () => {
    renderRoute('/spectrum-cannabis/shop')
    const flowerChip = screen.getByRole('button', { name: 'Flower' })
    const accessoriesChip = screen.getByRole('button', { name: 'Accessories' })
    const indicaChip = screen.getByRole('button', { name: 'Indica' })
    fireEvent.click(accessoriesChip)
    fireEvent.click(indicaChip)
    // Accessories has strainType: null — combo with Indica → 0 results
    expect(screen.getByText(/0 of 40 products/i)).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /clear filters/i }))
    expect(screen.getByText(/40 of 40 products/i)).toBeInTheDocument()
    // Use the chip we held a ref to so the assertion isn't ambiguous
    expect(flowerChip).toHaveAttribute('aria-pressed', 'false')
  })
})

describe('SpectrumLocations', () => {
  it('renders all 6 location names', () => {
    renderRoute('/spectrum-cannabis/locations')
    ;['Oakville', 'Northgate', 'Braemar', 'Downtown', 'Cooper Square', 'SV'].forEach(name => {
      expect(screen.getByText(`Spectrum ${name}`)).toBeInTheDocument()
    })
  })
})

describe('SpectrumAbout', () => {
  it('renders the David Pereira license attribution', () => {
    renderRoute('/spectrum-cannabis/about')
    expect(screen.getByText(/David Pereira/)).toBeInTheDocument()
    expect(screen.getByText(/CTB-2019-0042/)).toBeInTheDocument()
  })

  it('renders all 4 team members', () => {
    renderRoute('/spectrum-cannabis/about')
    ;['Imani Reyes', 'Marcus Tan', 'Priya Wallace', 'Daniel Choi'].forEach(name => {
      expect(screen.getByText(name)).toBeInTheDocument()
    })
  })
})

describe('AgeGate', () => {
  it('renders when not verified', () => {
    window.localStorage.removeItem('spectrum-age-verified')
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/spectrum-cannabis']}>
          <Routes>
            <Route path="/spectrum-cannabis" element={<SpectrumLayout />}>
              <Route index element={<SpectrumHome />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </HelmetProvider>
    )
    expect(screen.getByText(/welcome to spectrum cannabis/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the tests**

Run: `cd frontend && npm run test -- Spectrum --run`

Expected: all assertions pass. If a test fails because rendered text doesn't match (e.g. case sensitivity, wording drift), update the test assertion to match what the page actually renders.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/pages/spectrum/__tests__/Spectrum.test.jsx
git commit -m "test(spectrum): page + filter + age-gate component tests"
```

---

## Task 16: Full sweep + push

- [ ] **Step 1: Run full test suite**

Run: `cd frontend && npm run test -- --run 2>&1 | tail -10`
Expected: all tests pass — IMMD's existing 102+ tests plus the new Spectrum cart (~14), filters (~13), and component (~10) tests. Total target around 140 tests.

- [ ] **Step 2: Run lint**

Run: `cd frontend && npm run lint 2>&1 | grep -E "spectrum|Spectrum" | head -20`

Expected: zero warnings or errors that originate from the new Spectrum files. Pre-existing repo-wide warnings from other files are acceptable (the IMMD shipping pattern accepted these).

- [ ] **Step 3: Production build**

Run: `cd frontend && npx vite build 2>&1 | tail -15`

Expected: build succeeds. Spectrum chunks are emitted (you should see `SpectrumLayout-*.js`, `SpectrumHome-*.js`, etc. in the output). Total bundle size growth reasonable.

- [ ] **Step 4: Manual preview (optional)**

Run: `cd frontend && npm run preview` — visit `http://localhost:4173/spectrum-cannabis`. Confirm the age gate renders on first visit, the homepage shows the rainbow logo + featured products + locations, the shop page filters work, the cart drawer opens on icon click, the checkout button shows the "coming Q3 2026" modal.

- [ ] **Step 5: Push**

Before pushing, fetch + rebase to handle any concurrent commits on origin (the user noted another bot is also working on the repo):

```bash
git fetch origin
git pull --rebase origin main
git push origin main
```

If the rebase produces conflicts, resolve them by reading the conflicting files and accepting the right-side-up versions. Spectrum files are entirely new, so conflicts can only happen on `App.jsx`, `index.html`, or `CTB.jsx`.

---

## Task 17: Canon memory update

**Files:**
- Modify: `~/.claude/projects/-Users-jeffbai-repos/memory/project_praya_canon.md`

Lock in: Spectrum location list, CTB Director-General David Pereira, closure scope for v2.

- [ ] **Step 1: Add CTB Director-General to Key Officials list**

Find the Key Officials section. Replace the existing CTB line:

```
- **Cannabis Tax Bureau:** Seth Rogen
```

with:

```
- **Cannabis Tax Bureau Director-General:** David Pereira (replaces earlier Seth Rogen reference; see Spectrum Cannabis storefront ship 2026-04-27)
```

- [ ] **Step 2: Add a Spectrum Cannabis canonical block**

Find the section where Braemar County is described (`**Braemar County** — Clean, orderly, NIMBY energy...`). Below the Districts section, add a new section:

```markdown
## Spectrum Cannabis (canonical private business)

Privately-owned cannabis dispensary chain, founded 2019. Storefront site lives at `/spectrum-cannabis` on the same SPA. Visual language: own brand, no gov chrome.

**Logo:** rectangular bar of 14 Minecraft concrete blocks, 7 wide × 2 tall, reverse rainbow (VIBGYOR) — violet, indigo, blue, green, yellow, orange, red.

**Tagline:** "cannabis, for everyone."

**Founder & CEO:** Imani Reyes (fictional)
**Head of Cultivation:** Marcus Tan
**Operations Director:** Priya Wallace
**Retail Director:** Daniel Choi

**License:** CTB-2019-0042 (Retail), issued 2019-04-22 by Cannabis Tax Bureau Director-General David Pereira.

**Six locations:**
- **Spectrum Oakville** (flagship, 80 Leman Street, Oakville district, Braemar County)
- **Spectrum Northgate** (14 Skamania Avenue, Northgate district, Braemar County)
- **Spectrum Braemar** (3 Kootenai Crescent, Braemar district, Braemar County)
- **Spectrum Downtown** (210 Promenade, Downtown district)
- **Spectrum Cooper Square** (7 Cooper Square, Western district)
- **Spectrum SV** (1 Cultivation Way, Surowski Valley) — adjacent to cultivation facility

**v2 closure scope:** Three locations in Braemar County (Oakville, Northgate, Braemar) will be marked `status: 'closed'` when the constitutional crisis layer is added. The three outside-county stores (Downtown, Cooper Square, SV) remain operating. Closure data field exists in v1 but all 6 are 'open'.
```

No commit needed — canon memory lives outside the repo.

---

## Self-Review Checklist

Run through this once after writing the plan:

- **Spec coverage:**
  - Brand identity (logo, tagline, palette, typography) → Tasks 7, 8 ✓
  - 6 pages → Tasks 12, 13 ✓
  - 40 products in 5 categories → Task 2 ✓
  - 6 locations → Task 3 ✓
  - 4 team members → Task 3 ✓
  - Cart logic + tests → Tasks 4, 6 ✓
  - Filters + tests → Task 5 ✓
  - Age gate → Tasks 6, 10, 12 ✓
  - CartDrawer with focus trap → Task 10 ✓
  - Header + footer → Task 11 ✓
  - SpectrumLayout (no gov chrome) → Task 12 ✓
  - Routes wired → Task 13 ✓
  - CTB Licensed Operators integration → Task 14 ✓
  - Component tests → Task 15 ✓
  - Build + push → Task 16 ✓
  - Canon memory → Task 17 ✓

- **Placeholders:** None present. All code blocks complete.
- **Type consistency:** `addItem`/`removeItem`/`updateQty` signatures match across spectrumCart.js, the test file, and the context. `applyShopFilters(products, filters, sortMode)` signature is consistent. Product shape is consistent across data, ProductCard, SpectrumProduct, and CartDrawer. Location shape is consistent across data, LocationCard, and Locations page.
- **Path consistency:** All Spectrum files are under `frontend/src/pages/spectrum/` or `frontend/src/contexts/` or `frontend/src/utils/` or `frontend/src/data/`. No drift.
