# IMMD (Immigration Department) Page — Design Spec

**Date:** 2026-04-23
**Owner:** Jeff Bai
**Status:** Design approved, pending implementation plan

---

## Goal

Build a new canonical department page at `/immd` for the Immigration Department — the applicant-side agency handling visas, residency, citizenship, PPIC (Praya Permanent Identity Card), passports, work permits, student permits, and overstay enforcement.

IMMD is currently **absent** from the site despite being a canonical core department per `project_praya_canon.md`. The Portal incorrectly lists "Immigration & Visas" as a CBCA service — this spec moves that service to IMMD and clarifies the scope split: **CBCA handles border/customs operations; IMMD handles everything else immigration-adjacent.**

---

## Scope split (CBCA vs. IMMD)

| Function | Owner |
|---|---|
| Port-of-entry inspection, customs duties, contraband, declarations | CBCA |
| Border enforcement, traveler information | CBCA |
| Visa issuance, renewal, status checks | **IMMD** |
| Residency applications (F0-F3, E-class) | **IMMD** |
| Citizenship / naturalization | **IMMD** |
| PPIC (ID card) issuance, renewal, replacement | **IMMD** |
| Passport issuance | **IMMD** |
| Work permits (E), student permits (S) | **IMMD** |
| Overstay enforcement, deportation orders | **IMMD** |
| Express pathways (I-6, I-12) | **IMMD** |

---

## Architecture

**New file:** `frontend/src/pages/IMMD.jsx` — one long page component (~1000-1300 lines), following the Interior/DOJ/CBCA precedent of keeping all sections inline rather than split into sub-components.

**Touched files:**

| File | Change |
|---|---|
| `frontend/src/App.jsx` | Add lazy-loaded route: `/immd` → `IMMD` |
| `frontend/src/pages/Portal.jsx` | Add IMMD card to department grid; remove "Immigration & Visas" from CBCA's `services` array; add it to IMMD's `services` array |
| `frontend/src/utils/departmentContext.js` | Add `immd` entry with system prompt + quick-reply suggestions |
| `frontend/src/components/Search.jsx` | Add IMMD + its sub-services to the searchable content index |
| `frontend/src/pages/DeptImmigration.css` | **New** theme file — navy/gold/deep-teal (passport-book palette) |

**No new npm dependencies. No backend. All interactions are client-side mocks.**

**Styling:** `DeptImmigration.css` is unique to IMMD for now. The existing `DeptCivic.css` is already claimed by DOJ/LC/Interior/NationalSecurity/Weather, so IMMD needs its own palette. Future Electoral Commission page may share this theme later (not in scope).

---

## Page composition (13 sections)

Each section is a `<section>` block inside `IMMD.jsx` with a semantic `<h2>`:

1. **Hero** — DG Ingram byline, mission statement, emergency contact for detained/overstayed persons
2. **Quick Actions** — 6-card grid: Apply for Visa, Check Application Status, Renew Residency, Citizenship Application, Report Lost PPIC, Book Biometrics Appointment
3. **Visa Categories** — full table of all 13 classes (V0/V1/V2/V3/F0/F1/F2/F3/E/I-6/I-12/S1/S2) with fee, duration, requirements, Apply CTA
4. **Residency Pathway** — visual ladder F0 → F1 → F2 → F3 and how E-class / S-class plug in
5. **Citizenship** — canon flow (F1+/E → Form C-11 PIC → 6-month residency → Form I-7 → Form C-2 PPIC); ceremony info, oath, dual-citizenship policy
6. **PPIC (ID card)** — Form C-2 details, replacement for lost/stolen (Form C-3), renewal cycle, biometrics
7. **Passports** — Praya passport issuance (Form PP-1, PP-R), first-time + renewal + expedited; **no visa-free country list** (issuance-only, per design decision)
8. **Work & Study Permits** — E-class employment; new S-class (S1 short-term, S2 degree-program); Praya School of Design as anchor institution
9. **Express Pathways** — I-6 Express Immigration (P$500), I-12 Express Construction (P$400); eligibility criteria
10. **Enforcement & Appeals** — overstay penalties tiered by days, deportation process, detention rights, appeals through 3rd District Court → 3rd Circuit Court
11. **Forms & Fees** — downloadable index (C-11, I-7, C-2, C-3, V-APP, E-APP, S-APP, PP-1, PP-R) with fee schedule in P$
12. **Legislation** — Immigration Act 2014, Citizenship Act 2015, Digital Immigration Regulations 2023, with plain-language summaries
13. **Contact & Offices** — three offices with hours, services, address

---

## Canon additions (committed to `project_praya_canon.md` after ship)

These fill blanks in existing canon. None contradict it.

### 1. Director-General
**The Hon. David A. Ingram, MP** — added to Key Officials list.

Public stance (draft, hero quote):
> "Praya's immigration policy rests on a simple premise: we welcome builders. Whether you arrive for a day, a season, or a life, IMMD's job is to make the paperwork honest and the timeline predictable."

### 2. S-class student permits (new)
- **S1** — Short-term, ≤6 months, **P$80**. Language programs, exchange, workshops.
- **S2** — Degree-program, ≤4 years, **P$250**. Full-time enrollment at an accredited Praya institution.
- **Anchor:** Praya School of Design (already canon). Other accredited institutions implied but unnamed until later expansion.

### 3. IMMD offices
| Office | Location | Services |
|---|---|---|
| IMMD Central | Leman Street, Oakville | HQ — all visa classes, citizenship ceremonies, PPIC issuance, passports |
| IMMD Braemar County | adjacent to Braemar County Hall | Residency applications, PPIC renewal |
| IMMD Port Office | co-located with CBCA at port of entry | V0/V1 on-arrival issuance, border liaison |

### 4. Form codes
Already in canon: C-11 (PIC application), I-7 (citizenship application), C-2 (PPIC).

New:
- **C-3** — PPIC replacement (lost/stolen), P$50
- **V-APP** — Generic visa application (V/F/E classes)
- **E-APP** — Employment visa application
- **S-APP** — Student permit application
- **PP-1** — Passport application, P$120 new / P$200 expedited
- **PP-R** — Passport renewal, P$80

### 5. Express pathway fees
- **I-6 Express Immigration:** P$500
- **I-12 Express Construction:** P$400

### 6. V0 reciprocal inbound policy
V0 (Day, 24h, free) applies to visitors from signatory nations under bilateral agreements. No country enumeration — keeps canon open.

### 7. Overstay enforcement tiers
| Overstay duration | Penalty |
|---|---|
| 1-7 days | P$50/day fine, no ban |
| 8-30 days | P$100/day fine, 1-year re-entry ban |
| 31+ days | Deportation, 5-year re-entry ban, right to appeal via 3rd District Court |

---

## Data model (module-level constants in `IMMD.jsx`)

All data hardcoded at top of file. No API calls, no Supabase, no external fetches.

```js
const VISA_CLASSES = [
  { code: 'V0', name: 'Day Visitor', duration: '24 hours', fee: 0, requirements: ['Signatory nation passport'], category: 'visitor' },
  { code: 'V1', name: 'Short Visitor', duration: '3 days', fee: 25, requirements: ['Passport valid 6mo+'], category: 'visitor' },
  // ... all 13 classes
]

const CITIZENSHIP_STEPS = [
  { step: 1, label: 'Hold F1+ residency or E-class employment', form: null },
  { step: 2, label: 'Apply for Permanent Identity Card (PIC)', form: 'C-11' },
  { step: 3, label: 'Maintain 6 months residency (waivable for exceptional)', form: null },
  { step: 4, label: 'Submit citizenship application', form: 'I-7' },
  { step: 5, label: 'Receive PPIC (Praya Permanent Identity Card)', form: 'C-2' },
]

const FORMS_INDEX = [
  { code: 'C-11', name: 'Permanent Identity Card Application', fee: 50, category: 'citizenship' },
  { code: 'I-7', name: 'Citizenship Application', fee: 150, category: 'citizenship' },
  { code: 'C-2', name: 'PPIC Issuance', fee: 75, category: 'identity' },
  { code: 'C-3', name: 'PPIC Replacement (lost/stolen)', fee: 50, category: 'identity' },
  { code: 'V-APP', name: 'Visa Application (V/F/E)', fee: null, feeNote: 'Fee equals the visa class fee — no separate form fee', category: 'visa' },
  { code: 'E-APP', name: 'Employment Visa Application', fee: 150, category: 'visa' },
  { code: 'S-APP', name: 'Student Permit Application', fee: null, category: 'permit' },
  { code: 'PP-1', name: 'Passport Application', fee: 120, category: 'passport' },
  { code: 'PP-R', name: 'Passport Renewal', fee: 80, category: 'passport' },
]

const OFFICES = [
  { name: 'IMMD Central', address: 'Leman Street, Oakville', hours: 'Mon-Fri 08:30-17:00, Sat 09:00-13:00', services: [...] },
  { name: 'IMMD Braemar County', address: 'adjacent to Braemar County Hall', hours: 'Mon-Fri 09:00-16:30', services: [...] },
  { name: 'IMMD Port Office', address: 'Port of Entry (co-located with CBCA)', hours: '24/7', services: [...] },
]

const LEGISLATION = [
  { act: 'Immigration Act 2014', summary: '...', sections: [...] },
  { act: 'Citizenship Act 2015', summary: '...', sections: [...] },
  { act: 'Digital Immigration Regulations 2023', summary: '...', sections: [...] },
]

const OVERSTAY_TIERS = [
  { days: '1-7', fine: 'P$50/day', ban: 'None' },
  { days: '8-30', fine: 'P$100/day', ban: '1 year' },
  { days: '31+', fine: 'Deportation', ban: '5 years, appealable to 3rd District Court' },
]
```

---

## Interactive elements (all client-side mocks)

### 1. Visa status checker (in Quick Actions + Visa Categories)
- Input: reference format `[CLASS]-[YEAR]-[5-digit-seq]`, e.g. `V2-2026-04387`
- Output: seeded mock statuses (Pending / Under Review / Approved / Requires Interview / Denied) returned from a lookup function over ~20 hardcoded mock records
- Pattern: mirrors NPA case lookup
- Accessibility: aria-live on result container

### 2. Eligibility wizard (in Residency Pathway section)
- 3-4 question flow: duration of stay, purpose (tourism/work/study/family), property ownership, employment offer
- Pure client-side switch logic → recommends a visa class with rationale
- **Parked for improvements in later pass** (ship v1 with the basic version; richer logic later)

### 3. Biometrics booking (in Quick Actions + PPIC section)
- Date picker + office selector (Oakville / Braemar / Port)
- "Confirmed" toast — no real scheduling
- Pattern: mirrors `Appointments.jsx`
- Accessibility: aria-modal on the modal

### 4. Form downloader (in Forms & Fees section)
- Clicking any form opens modal with mock form preview
- "Download PDF" button triggers toast "Form [code] downloaded" (no actual file)
- Consistent with how other dept pages handle document actions

---

## Chatbot context (`departmentContext.js` new `immd` entry)

**System prompt (summary):**
- Mandate: visas, citizenship, PPIC, passports, work/student permits, overstay enforcement
- Scope boundary: CBCA handles border/customs; IMMD handles everything else immigration-adjacent
- Director-General: The Hon. David A. Ingram, MP
- All 13 visa classes, fee schedule, durations
- Citizenship pathway (F1+/E → C-11 → 6mo → I-7 → C-2)
- Three offices and their specialties
- Legislation: Immigration Act 2014, Citizenship Act 2015, Digital Immigration Regulations 2023
- In-universe tone: formal, bureaucratic, harm-reduction aware (consistent with Praya voice)

**Quick-reply suggestions:**
- "Which visa do I need?"
- "How long until I can apply for citizenship?"
- "I lost my PPIC — what do I do?"
- "Work permit for a tech job"
- "Student permit requirements"

---

## Accessibility requirements

Consistent with recent a11y work on the repo:
- `aria-live="polite"` on visa status checker result container
- `aria-modal="true"` + focus management on biometrics booking modal and form preview modal
- Semantic `<section>` with `<h2>` per section, `<h3>` for sub-headings
- Table markup: `<caption>`, `<th scope="col">` on visa classes table, overstay tiers table, fee table
- Keyboard: all CTAs reachable via Tab, modals trap focus (follow Search.jsx's in-flight focus-trap pattern)
- Icon-only buttons get `aria-label`
- Color contrast: passport palette (navy/gold/teal) must pass WCAG AA on all text — validate during build

---

## Testing

Follow existing repo convention (Vitest + Testing Library). Test scope:

**Unit tests (pure functions):**
- Visa classification lookup (`getVisaClassByCode`)
- Eligibility wizard logic (given inputs → expected recommendation)
- Status checker mock lookup (given reference → expected status object)
- Overstay fine calculator (given days → tier + fine)

**Component tests (light):**
- IMMD page renders without crashing
- Quick Actions grid renders 6 cards
- Visa Categories table renders all 13 classes
- Status checker: invalid input → error aria-live message
- Status checker: valid mock ref → result rendered

**Not tested (matches repo norms):**
- Full page snapshot (brittle)
- Every static content string

---

## Out of scope

- Real visa application backend (all mocks)
- Real biometrics scheduling
- PDF form generation
- Country enumeration for visa-free travel (Q4: issuance only)
- Richer eligibility wizard (parked for v2)
- Electoral Commission sharing the theme (separate work)
- Any IA reorg of BD/CR (user explicitly punted on this)
- Moving "Immigration & Visas" off CBCA is in scope; broader CBCA refactor is not

---

## Success criteria

1. `/immd` route renders on `npm run dev`
2. All 13 visa classes visible in the table with correct fees
3. DG Ingram byline present on page
4. Portal shows IMMD card; "Immigration & Visas" no longer listed under CBCA
5. Chatbot on `/immd` answers "which visa do I need for 2 weeks?" with V2 info
6. Status checker returns mock result for valid reference, error for invalid
7. Biometrics booking modal opens, accepts input, shows confirmation toast
8. Three offices section renders all three with addresses
9. Lighthouse accessibility score ≥ 95 on the new page
10. `npm run build` passes; `npm run test` passes
11. `project_praya_canon.md` updated with Ingram + S-class + offices + fees + overstay tiers after ship

---

## File size discipline

Target: IMMD.jsx ≤ 1300 lines. If it pushes past, extract data constants to `frontend/src/data/immdData.js`. Interior.jsx is 1389 lines as precedent, but the new file should aim smaller.
