# Spectrum Cannabis Storefront — Design Spec

**Date:** 2026-04-27
**Owner:** Jeff Bai
**Status:** Design approved, pending implementation plan

---

## Goal

Build a complete consumer storefront for **Spectrum Cannabis** — a fictional Praya cannabis dispensary brand — at `/spectrum-cannabis/*`. The site is a privately-owned business website hosted inside the same SPA as govpraya.org, but presents zero shared visual language with the government portal: its own header, footer, typography, voice, and chrome. Linked into the gov experience only via the CTB page's new "Licensed Operators" section.

**Scope is v1 / MVP:** Spectrum operates normally, no closure plot. The closure-by-Governor-Mo storyline (parked in canon) gets layered in as a v2 follow-up.

---

## Why this site exists

The Praya canon has Spectrum Cannabis as an active plot anchor — a rainbow-flagged dispensary in Braemar County whose closure by Governor Mo creates a federal-vs-county constitutional fight. Right now it's referenced but invisible. Building the brand site first creates the substrate for the v2 closure microsite to attach to.

It also exercises a new pattern in the codebase: a non-government tenant of the SPA, with its own visual identity. This becomes the template for any future private-sector or NGO sites that the Praya project decides to render under the same Vite build.

---

## Out of scope (explicitly)

- Real backend, real cart processing, real auth — all interactions are mocked
- The Spectrum Cannabis closure / constitutional crisis content (parked for v2 microsite)
- Real ID verification on the age gate (modal + localStorage only)
- Online-ordering flow beyond a "coming Q3 2026" stub
- Spectrum-specific search bar (filters cover v1; add search if real volume justifies it)
- Map rendering (locations are a card grid, not a map)
- Mobile-first overhaul beyond standard responsive CSS
- Migration of any existing content from another source

---

## Architecture

**Same SPA, isolated layout.** All Spectrum routes mount under `/spectrum-cannabis/*` in `App.jsx`, but render inside a `SpectrumLayout` component that **bypasses** the gov `Layout` (no portal header, no gov footer, no `ChatWidget`, no `EmergencyAlert`). Pattern matches existing `Status` and `Payments` standalone routes.

**No new npm dependencies.** All visual elements are CSS + inline SVG. Cart and age gate state lives in `localStorage` via React context.

**Lazy-loaded.** Each Spectrum page is a lazy import — the whole site ships as its own chunk and doesn't bloat the gov portal initial load.

---

## File map

```
frontend/src/pages/spectrum/
├── SpectrumLayout.jsx       Wraps spectrum routes; renders SpectrumHeader, age gate, CartDrawer, footer; no gov chrome
├── SpectrumHome.jsx         Hero + featured products + locations callout + brand pitch
├── SpectrumShop.jsx         Product grid w/ filters
├── SpectrumProduct.jsx      Single product detail page
├── SpectrumLocations.jsx    6-location card grid
├── SpectrumAbout.jsx        Brand story, values, team, license attribution
├── SpectrumContact.jsx      Form + FAQ accordion
├── Spectrum.css             All Spectrum styles, scoped under .layout-spectrum
└── components/
    ├── SpectrumHeader.jsx   Logo + nav + cart icon
    ├── SpectrumFooter.jsx   2-row footer
    ├── SpectrumLogo.jsx     The rainbow bar + wordmark (SVG-based, scalable)
    ├── ProductCard.jsx      Used in Home featured grid + Shop grid
    ├── LocationCard.jsx     Used in Home callout + Locations page
    ├── CartDrawer.jsx       Slide-in right-side drawer
    ├── AgeGate.jsx          Single-time entry modal
    └── PropTypes already required across the codebase (lint-enforced)

frontend/src/contexts/
├── SpectrumCartContext.jsx  Cart state + localStorage persistence
└── SpectrumAgeGateContext.jsx  Age verification flag + localStorage persistence

frontend/src/data/
├── spectrumProducts.js      ~40 products across 5 categories
├── spectrumLocations.js     6 locations
└── spectrumTeam.js          4 team members for About page

frontend/src/utils/
├── spectrumCart.js          Cart math, addItem/removeItem/clear/total helpers
└── spectrumFilters.js       Sort + filter pure functions for Shop

Test files:
frontend/src/utils/__tests__/spectrumCart.test.js
frontend/src/utils/__tests__/spectrumFilters.test.js
frontend/src/pages/spectrum/__tests__/Spectrum.test.jsx

Touched files (existing):
frontend/src/App.jsx                          Add 7 lazy imports + 7 routes
frontend/src/pages/CTB.jsx                    New "Licensed Operators" section linking to /spectrum-cannabis
```

This deviates from the established dept-page-as-single-file pattern (Interior, CBCA, IMMD), but Spectrum is genuinely multi-route and decomposes naturally. The IMMD precedent of extracting data + logic to separate modules is preserved and extended.

---

## Routes

| Path | Component | Notes |
|---|---|---|
| `/spectrum-cannabis` | `SpectrumHome` | Index route |
| `/spectrum-cannabis/shop` | `SpectrumShop` | Filterable product grid |
| `/spectrum-cannabis/shop/:productId` | `SpectrumProduct` | Detail; productId is the slug |
| `/spectrum-cannabis/locations` | `SpectrumLocations` | All 6 stores |
| `/spectrum-cannabis/about` | `SpectrumAbout` | Brand story, team |
| `/spectrum-cannabis/contact` | `SpectrumContact` | Form + FAQ |

All wrapped in `SpectrumLayout` via React Router's nested-route pattern. No `cart` or `checkout` routes — cart is a drawer, checkout is a stub modal.

---

## Brand identity

### Logo

Two-element lockup:

1. **Rainbow bar** — 14 Minecraft concrete blocks arranged 7-wide × 2-tall. No gaps between blocks (solid wall). Colors left to right in **reverse rainbow (VIBGYOR)**:
   - violet `#8932B8`
   - indigo / blue `#3C44AA`
   - light blue `#3AB3DA`
   - green `#5E7C16`
   - yellow `#FED83D`
   - orange `#F9801D`
   - red `#B02E26`
2. **Wordmark** — "spectrum cannabis" all lowercase, **Inter Tight semibold**, slightly tight letter-spacing (~ -0.02em), positioned right of the bar with consistent gap.

Implementation: `<SpectrumLogo />` component that renders the bar as an inline SVG (so it scales cleanly) and the wordmark as styled text. Component takes a `size` prop (sm / md / lg) for use in different contexts (header / footer / hero). Bar can render alone (without wordmark) when `wordmark={false}` — used in compact spaces like the footer mini-mark.

### Voice / tone

**Modern dispensary-modern, high-end adjacent.** Eaze, Caliva, Cookies energy. Clean confidence, type-led layouts, generous whitespace. Brand text reads like a 2024 weed company that takes itself seriously without being clinical or aspirationally medical. The rainbow is the brand's signature mark — but the *tone* doesn't lean into the rainbow as a theme. It's just the logo.

**Tagline:** "cannabis, for everyone." (lowercase, period included)

### Color palette (beyond the rainbow)

- **Site background:** `#FAFAF7` (off-white / paper)
- **Text primary:** `#1A1A1A`
- **Text muted:** `#6B7280`
- **Border:** `#E5E5E0`
- **Footer bg:** `#1A1A1A` with text `#FAFAF7`
- **Accent / interactive:** uses individual rainbow colors contextually (e.g. category pages can use that category's block color as accent)

The rainbow palette appears on the brand mark and as accent color for category/section moments. The site itself stays mostly black/cream so the bar pops every time.

### Typography

- **Body + UI:** Inter (regular, medium, semibold)
- **Display headings + wordmark:** Inter Tight (semibold, bold)
- **Loaded via:** `<link rel="preconnect">` + Google Fonts in `frontend/index.html`. Loaded once globally; only used by Spectrum CSS scoped under `.layout-spectrum`. Fallback: `system-ui, -apple-system, sans-serif`.
- **Wordmark:** Inter Tight semibold, lowercase, `letter-spacing: -0.02em`

---

## Pages — section-by-section

### 1. SpectrumHome (`/spectrum-cannabis`)

1. **Hero** — full-bleed off-white backdrop, logo D centered (rainbow bar over wordmark, larger size), oversized tagline `cannabis, for everyone.` below, single CTA button `Shop the menu →` linking to `/spectrum-cannabis/shop`. Generous vertical padding (~96px top/bottom). No carousel.
2. **Featured products** — heading "this week's highlights", 6-card grid (3 cols desktop, 2 tablet, 1 mobile). Each card uses `<ProductCard />`. Products marked `featured: true` in data.
3. **Find a store** — heading "find us", 6-card grid of `<LocationCard />` — all 6 locations. Each card: store name, district, address, hours, phone. Single CTA below: `See all locations →` (redundant for v1 but matches the layout pattern).
4. **Brand strip** — single horizontal block, image-block placeholder on left (gradient or solid color, no real photos), 2-paragraph copy on right: brand promise + "Family-owned. Praya-grown. Since 2019."
5. Footer.

### 2. SpectrumShop (`/spectrum-cannabis/shop`)

- Header with page title `shop` + product count (`40 products`).
- Filter bar (sticky on scroll): category chips (5: Flower / Pre-Rolls / Edibles / Vapes / Accessories — multi-select toggleable), strain pills (4: Indica / Sativa / Hybrid / N/A — multi-select), sort dropdown (Featured / Price ascending / Price descending / Strongest THC).
- Product grid (4 cols desktop, 2 tablet, 1 mobile).
- "Showing X of 40" indicator updates live as filters apply.
- Empty state when filters return zero: "No products match these filters. Clear filters →"
- No pagination — 40 products with multi-filter narrowing fits comfortably.

### 3. SpectrumProduct (`/spectrum-cannabis/shop/:productId`)

- Two-column layout (image left 50%, info right 50% on desktop; stacked on mobile).
- Left: product photo (placeholder block — solid color from category accent, large; no actual product photography).
- Right:
  - Strain badge chip (colored: Indica = purple, Sativa = green, Hybrid = orange, N/A = gray)
  - Product name (h1, Inter Tight bold)
  - Price `P$45` (large)
  - Weight / unit (`3.5g`, `Pack of 5`, `100mg`, etc.)
  - THC% / CBD% pills
  - Terpene profile (3-5 dominant terpenes, each as a pill: "Myrcene", "Limonene", etc.)
  - Description (2 paragraphs)
  - Quantity stepper + `Add to Bag` button (primary CTA)
  - "Available at:" label + dropdown listing all 6 stores (in v1, all stock all products)
- Below the fold: "Related products" — 4 more `<ProductCard />` from the same category.

### 4. SpectrumLocations (`/spectrum-cannabis/locations`)

- Header: page title `locations`, subtitle `6 stores across Praya. Visit us in person.`
- 2-column grid of large `<LocationCard />`s (6 cards):
  - **Spectrum Oakville** (flagship, Linear Park / Leman St adjacent, Oakville district, Braemar County)
  - **Spectrum Northgate** (Northgate district, Braemar County)
  - **Spectrum Braemar** (Braemar, near County Hall)
  - **Spectrum Downtown** (Downtown district)
  - **Spectrum Cooper Square** (Western district)
  - **Spectrum SV** (Surowski Valley)
- Each card: name, district, address, hours (`Mon–Sun · 10:00–22:00`), phone, "Open" badge (v1, all open), `Get directions →` link (does nothing in v1, no map).
- Below grid: short copy reaffirming all locations stock the full catalog.

### 5. SpectrumAbout (`/spectrum-cannabis/about`)

- **Brand story** — 3 short paragraphs. Founded 2019 during early federal legalization. Family-owned, Praya-grown. Built around quality and transparency. (Plain, no Minecraft / OOC references.)
- **Values** — 3 pillars in a 3-col grid:
  - **Quality** — every batch lab-tested, full COA available
  - **Transparency** — every product lists strain, terpenes, sourcing
  - **Community** — locally-owned, locally-operated, locally-staffed
- **Team** — 2x2 grid of 4 fictional people. Each: portrait placeholder block (gradient), name, role, 1-line bio. Names invented for canon: e.g. "Imani Reyes (Founder & CEO)", "Marcus Tan (Head of Cultivation)", "Priya Wallace (Operations)", "Daniel Choi (Retail Director)". Plain, professional bios.
- **License attribution** — small footer-style block: `Licensed by the Cannabis Tax Bureau, Director-General David Pereira | License #CTB-2019-0042 | Issued 2019-04-22`

### 6. SpectrumContact (`/spectrum-cannabis/contact`)

- 2-column layout (form left, sidebar right on desktop).
- **Form** — Name, Email, Subject (dropdown: General / Wholesale / Press / Complaint), Message (textarea), Submit button. On submit: toast "Thanks — we'll be in touch within 1-2 business days." (No backend.)
- **Sidebar** — General contact: email `hello@spectrumcannabis.praya`, phone `(010) 311-2200`, mailing address `Spectrum HQ, 80 Leman Street, Oakville, Praya`. "Customer service hours: Mon–Fri 09:00–18:00."
- **FAQ accordion** below the columns: 5 questions:
  - Do you deliver?
  - Can I pre-order online?
  - Do I need to be a Praya citizen to shop?
  - What's your return policy?
  - How do I get a wholesale account?
- Footer.

---

## Header (`SpectrumHeader`)

Sticky top, off-white background, thin bottom border on scroll.

Layout (left to right):
- **Logo** (`<SpectrumLogo size="md" />` — bar + wordmark)
- **Nav** (centered or right-aligned): `Shop` · `Locations` · `About` · `Contact`
- **Cart icon** with item-count badge (right-most). Click → opens `<CartDrawer />`

Mobile: nav collapses behind a hamburger menu, logo center, cart right.

---

## Footer (`SpectrumFooter`)

Black background `#1A1A1A`, off-white text.

**Top row** — 4 columns:
- **Shop** — Flower, Pre-Rolls, Edibles, Vapes, Accessories
- **Locations** — Oakville, Northgate, Braemar, Downtown, Cooper Square, SV
- **Company** — About, Careers (placeholder/dead link), Contact, Press (placeholder)
- **Legal** — Terms (placeholder), Privacy (placeholder), License Info (placeholder)

**Bottom row** — divided by hairline:
- Left: rainbow bar mini-version (just the bar, no wordmark)
- Right: copyright + license info `© 2026 Spectrum Cannabis | License #CTB-2019-0042`

---

## Cart drawer (`CartDrawer`)

- Slides in from the right, 380px wide on desktop, full-width on mobile
- Header: `Your Bag` + close button (×)
- Item list: each row shows thumbnail block, name, price, qty stepper, remove (×)
- Subtotal at bottom: `P$XXX`
- "Checkout" button (large, primary): on click → modal "Online ordering launches Q3 2026 — visit any of our 6 locations to purchase today." with `Find a store` CTA.
- Empty state: `Your bag is empty` + `Browse the shop →` link.
- Drawer state and contents persist in `localStorage` keyed `spectrum-cart`.

---

## Age gate (`AgeGate`)

- Modal blocking the entire `SpectrumLayout` on first visit
- Centered card on dimmed backdrop:
  - Rainbow bar logo at top (small)
  - Heading: `welcome to spectrum cannabis`
  - Body: `you must be 19 or older to enter this site.`
  - Two buttons: `I'm 19 or older` (primary) / `Take me back` (secondary)
- Yes → sets `spectrum-age-verified=true` in localStorage, dismisses modal forever
- No → redirects to `/` (gov portal)
- Triggered on entry to ANY `/spectrum-cannabis/*` route, but only if not already verified
- Implemented via `SpectrumAgeGateContext` — wraps `SpectrumLayout`, modal renders when `verified === false`

19 years old chosen because Praya canon's Vancouver/BC heritage maps to BC's legal cannabis age (19).

---

## Data

### `spectrumProducts.js` shape

```js
export const SPECTRUM_PRODUCTS = [
  {
    id: 'northern-lights-eighth',          // URL slug
    name: 'Northern Lights',
    category: 'flower',                    // flower | pre-rolls | edibles | vapes | accessories
    strainType: 'indica',                  // indica | sativa | hybrid | null (for accessories)
    thc: 22,                               // percent
    cbd: 0.1,
    weight: '3.5g',                        // display string
    price: 45,                             // P$
    terpenes: ['Myrcene', 'Caryophyllene', 'Pinene'],
    description: '2 paragraphs of marketing copy here',
    featured: true,                        // shows in homepage featured grid
    accentColor: '#8932B8'                 // optional override; defaults to category color
  },
  // ~40 entries total
]
```

**Distribution target:**
- Flower: 12 products (mix of indica/sativa/hybrid, weights 1g / 3.5g / 7g / 14g, prices P$15-P$120)
- Pre-Rolls: 8 products (singles, 2-packs, 5-packs)
- Edibles: 10 products (gummies, chocolates, drinks; sativa/indica/hybrid + CBD-only options)
- Vapes: 6 products (510-thread carts, disposables; various strain types)
- Accessories: 4 products (papers, grinder, lighter, storage jar; strainType: null)

Featured: 6 products marked `featured: true`, ideally one per category plus one Flower bonus.

### `spectrumLocations.js` shape

```js
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
    status: 'open'                         // open | closed | future-use
  },
  // 6 entries total: oakville, northgate, braemar, downtown, cooper-square, sv
]
```

In v1, all 6 locations have `status: 'open'`. The `status` field is added now to make the v2 closure layer trivial (just flip 3 to `closed`).

### `spectrumTeam.js` shape

4 entries, each `{ id, name, role, bio, accentColor }`. Bio is one sentence.

Suggested roster (open to revision):
- Imani Reyes — Founder & CEO
- Marcus Tan — Head of Cultivation
- Priya Wallace — Operations Director
- Daniel Choi — Retail Director

---

## Logic / utilities

### `spectrumCart.js`

Pure functions (no React, fully testable):

```js
addItem(cart, productId, qty = 1)          // returns new cart
removeItem(cart, productId)                // returns new cart
updateQty(cart, productId, qty)            // qty <= 0 removes; returns new cart
clearCart()                                // returns empty cart
cartItemCount(cart)                        // total qty across all items
cartSubtotal(cart, products)               // sum of price * qty
```

Cart shape: `{ items: [{ productId, qty }] }`. Resolution against full product list is done at render time so price / metadata stay fresh if data changes.

### `spectrumFilters.js`

```js
filterProducts(products, filters)
  // filters: { categories: string[], strainTypes: string[] }
  // returns filtered array

sortProducts(products, sortMode)
  // sortMode: 'featured' | 'price-asc' | 'price-desc' | 'thc-desc'
  // returns sorted array

applyShopFilters(products, filters, sortMode)
  // composition: filterProducts then sortProducts
```

---

## Context / state

### `SpectrumCartContext`

```jsx
const { cart, addItem, removeItem, updateQty, clearCart, itemCount, subtotal } = useSpectrumCart()
```

Wraps cart state + localStorage persistence. Hydrates from `spectrum-cart` localStorage key on mount; writes on every change.

### `SpectrumAgeGateContext`

```jsx
const { verified, verify, deny } = useSpectrumAgeGate()
```

- `verify()` — sets verified=true, writes `spectrum-age-verified=true` to localStorage
- `deny()` — calls navigate('/') to bounce back to gov portal
- `verified` reads from localStorage on first render

---

## CTB.jsx integration

Add a new section to the existing CTB page titled **"Licensed Operators"**. Place it between the existing "License Categories" section and whatever follows.

Content:
- Section heading: "Licensed Operators" with subtitle "Active cannabis businesses operating under CTB license."
- Optional small filter strip: license type (Retail / Cultivation / Manufacturing / Distribution), region (county dropdown). Skip for v1 if it bloats the page — just show all entries below.
- Operator cards (6-8 entries):
  - **Spectrum Cannabis** — License #CTB-2019-0042 — Retail — 6 locations — Active — `View website →` link to `/spectrum-cannabis`
  - 5-7 other invented operators with realistic-sounding names (Greenleaf Cannabis Co., Highland Bloom Apothecary, etc.) — License #, type, location count, status, but `Site not provided` (gray, no link) for the website column
- Spectrum gets visual emphasis (slightly bolder card border, perhaps the rainbow bar as a small inline hint) to make the link discoverable.

Update CTB head reference: replace any "Seth Rogen" mention with **"David Pereira"** as Director-General. (Should be one or two spots in the existing CTB.jsx content. Check via grep.)

---

## Testing

Mirror the IMMD pattern. Vitest + Testing Library.

### Unit tests (`spectrumCart.test.js`)
- addItem to empty cart
- addItem increments existing item qty
- removeItem removes line
- updateQty(0) removes line
- updateQty(negative) removes line
- cartItemCount sums correctly
- cartSubtotal computes correctly across mixed items
- clearCart returns empty

### Unit tests (`spectrumFilters.test.js`)
- filterProducts with single category
- filterProducts with multiple categories (OR semantics)
- filterProducts with strain type filter
- filterProducts with combined category + strain
- filterProducts with no filters returns all
- sortProducts featured-first
- sortProducts price ascending
- sortProducts price descending
- sortProducts THC descending (handles nulls — accessories have no THC)
- applyShopFilters composition

### Component tests (`Spectrum.test.jsx`)
- SpectrumHome renders hero + featured grid + locations grid
- SpectrumShop renders all 40 products by default
- SpectrumShop filter chips reduce visible products
- SpectrumShop sort dropdown reorders products
- ProductCard renders name + price + strain badge
- LocationCard renders name + district + hours
- AgeGate renders modal when not verified
- AgeGate dismisses on "I'm 19 or older"
- CartDrawer opens on cart icon click
- Adding a product updates the cart count badge

Target: 8-10 unit tests per util, 8-10 component tests. Roughly 25-30 new tests total.

---

## Accessibility

- All interactive elements keyboard-reachable
- Modals (`AgeGate`, checkout-coming-soon) use `role="dialog"`, `aria-modal="true"`, focus management following the IMMD pattern
- `CartDrawer` uses `role="dialog"` with focus trap when open, `aria-label="Shopping bag"`
- Filter chips on Shop have `role="checkbox"` + `aria-pressed` state
- Sort dropdown is a proper `<select>` with associated `<label>`
- All images have alt text (placeholder blocks have empty alt as decorative)
- Color contrast: cream-on-near-black footer must pass WCAG AA (it does at #FAFAF7 / #1A1A1A)
- Strain badges: not color-only — text label + icon shape redundancy
- Skip link at top of `SpectrumLayout`

---

## SEO

- Each route uses the existing `<SEO />` component with route-specific title and description
- e.g. `/spectrum-cannabis` → `Spectrum Cannabis — Cannabis, for everyone.`
- `/spectrum-cannabis/shop` → `Shop — Spectrum Cannabis`
- `noindex` is **not** set — Spectrum is a public storefront, indexable

---

## Performance

- All Spectrum routes lazy-loaded (one chunk for the whole site, or one per route — let Vite decide)
- Inter / Inter Tight loaded with `font-display: swap`
- No image assets — all "photos" are CSS gradient or solid color blocks (mock placeholders). Total bundle weight should be light.

---

## Success criteria

1. Visiting `/spectrum-cannabis` shows the age gate on first visit; dismissing it reveals the homepage with no gov chrome
2. The rainbow logo bar renders crisp at all sizes (16px footer mini-mark to 200px hero)
3. `Shop` lists 40 products, filters reduce the list correctly, sort reorders correctly
4. Clicking a product opens `/spectrum-cannabis/shop/:productId` with all detail fields populated
5. `Add to Bag` updates the cart count badge in the header and adds the line to the drawer
6. Cart contents persist across navigation within Spectrum
7. Cart contents do NOT leak to gov portal pages
8. Checkout button shows the "coming Q3 2026" modal
9. Locations page shows all 6 stores, all "Open"
10. About page shows the team, brand story, and David Pereira license attribution
11. Contact form submits to a toast, no backend call
12. CTB page now has a "Licensed Operators" section, Spectrum is featured, link to `/spectrum-cannabis` works
13. Any "Seth Rogen" reference in the existing CTB.jsx content has been updated to "David Pereira"
14. `npm run test` passes — including 25+ new tests
15. `npx vite build` succeeds — Spectrum chunks are emitted, gz-bundle size remains reasonable
16. Lighthouse a11y score ≥ 95 on all 6 Spectrum pages
17. Spec compliance check: no gov header, no gov footer, no `ChatWidget` rendered on any Spectrum route
18. Canon memory updated post-ship: David Pereira added as CTB DG, Spectrum Cannabis location list locked in, closure scope (Oakville/Northgate/Braemar) documented for v2

---

## v2 follow-ups (out of scope here, parked for next session)

1. **Closure layer** — Spectrum Oakville / Northgate / Braemar locations switch to `status: 'closed'`, banner appears on those location cards and in the footer of the home page, dedicated `/spectrum-cannabis/announcement` page hosts the company's statement. Outside-Braemar stores remain Open.
2. **Constitutional crisis microsite** — separate page or section that walks through the Spectrum vs. Braemar County legal fight, links to DOJ case lookup with the actual court entries, mentions David Choe (3rd District) and Anandvivek Balasubramanian (3rd Circuit) by name.
3. **Optional**: real product photos via Minecraft-rendered art, online ordering stub flow, search bar.

---

## Implementation philosophy notes

- **YAGNI hard.** Mock everything. Don't add a "real account" system. Don't optimize for SEO beyond title/description tags. The goal is a believable storefront that exercises the multi-route + isolated-layout pattern, not a production e-commerce build.
- **Isolation discipline.** Spectrum imports nothing from the gov pages and the gov pages import nothing from Spectrum (except the Licensed Operators link in CTB.jsx, which is a single hard-coded URL). No shared CSS variables, no shared themes. Treat Spectrum as a tenant, not a department.
- **Decomposition pays off here.** Unlike IMMD where one big file matched the existing pattern, Spectrum genuinely benefits from per-route files + extracted components. The codebase doesn't enforce "one file per page" — it enforces "follow the pattern that makes the code readable." Multi-route storefronts decompose; single-route dept pages don't need to.
