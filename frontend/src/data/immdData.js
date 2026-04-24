// IMMD canon data — single source of truth for the Immigration Department page.
// All fees in P$ (Praya Dollars). Visa class structure per project_praya_canon.md.

export const DIRECTOR_GENERAL = {
  name: 'The Hon. David A. Ingram, MP',
  title: 'Director-General, Immigration Department',
  quote:
    "Praya's immigration policy rests on a simple premise: we welcome builders. " +
    "Whether you arrive for a day, a season, or a life, IMMD's job is to make " +
    'the paperwork honest and the timeline predictable.'
}

export const VISA_CLASSES = [
  { code: 'V0', name: 'Day Visitor', duration: '24 hours', fee: 0, category: 'visitor', requirements: ['Signatory nation passport', 'Return ticket'], notes: 'Free; bilateral agreement nations only' },
  { code: 'V1', name: 'Short Visitor', duration: '3 days', fee: 25, category: 'visitor', requirements: ['Passport valid 6+ months', 'Proof of accommodation'], notes: 'Single entry' },
  { code: 'V2', name: 'Extended Visitor', duration: '14 days', fee: 40, category: 'visitor', requirements: ['Passport valid 6+ months', 'Return ticket', 'Proof of funds'], notes: 'Single entry, non-renewable' },
  { code: 'V3', name: 'Exploration Visitor', duration: '30 days', fee: 60, category: 'visitor', requirements: ['Passport valid 12+ months', 'Detailed itinerary', 'Proof of funds'], notes: 'Multiple entry; renewable once' },
  { code: 'F0', name: 'Short Residency', duration: '2 months', fee: 75, category: 'residency', requirements: ['Passport valid 12+ months', 'Proof of funds'], notes: 'No property or vehicle registration permitted' },
  { code: 'F1', name: 'General Residency', duration: '6 months', fee: 100, category: 'residency', requirements: ['Passport valid 12+ months', 'Proof of funds', 'Local address'], notes: 'Property and vehicle registration permitted' },
  { code: 'F2', name: 'Extended Residency', duration: '12 months', fee: 150, category: 'residency', requirements: ['Prior F1 or equivalent', 'Local address', 'Background check'], notes: 'Counts toward citizenship residency' },
  { code: 'F3', name: 'Long Residency', duration: '24 months', fee: 200, category: 'residency', requirements: ['Prior F2', 'Local address', 'Background check'], notes: 'Counts toward citizenship; renewable' },
  { code: 'E', name: 'Employment Visa', duration: '12 months', fee: 150, category: 'employment', requirements: ['Employer sponsorship (Form E-APP)', 'Passport valid 12+ months', 'Background check'], notes: 'Renewable; counts toward citizenship' },
  { code: 'S1', name: 'Short-term Student Permit', duration: '≤6 months', fee: 80, category: 'student', requirements: ['Enrollment letter', 'Proof of funds'], notes: 'Language programs, exchange, workshops' },
  { code: 'S2', name: 'Degree-program Student Permit', duration: '≤4 years', fee: 250, category: 'student', requirements: ['Accredited institution enrollment', 'Proof of funds', 'Full-time enrollment certification'], notes: 'Praya School of Design is an anchor institution' },
  { code: 'I-6', name: 'Express Immigration', duration: 'Expedited processing', fee: 500, category: 'express', requirements: ['Exceptional circumstances documented', 'Sponsorship from a Praya resident or employer'], notes: 'Processing within 5 business days' },
  { code: 'I-12', name: 'Express Construction', duration: 'Expedited for construction work', fee: 400, category: 'express', requirements: ['Project sponsorship', 'Skilled trades certification'], notes: 'Tied to a specific construction project' }
]

export const CITIZENSHIP_STEPS = [
  { step: 1, label: 'Hold F1+ residency or E-class employment visa', form: null },
  { step: 2, label: 'Apply for Permanent Identity Card (PIC)', form: 'C-11' },
  { step: 3, label: 'Maintain 6 months continuous residency (waivable for exceptional circumstances)', form: null },
  { step: 4, label: 'Submit citizenship application', form: 'I-7' },
  { step: 5, label: 'Receive PPIC (Praya Permanent Identity Card)', form: 'C-2' }
]

export const FORMS_INDEX = [
  { code: 'C-11', name: 'Permanent Identity Card Application', fee: 50, feeNote: null, category: 'citizenship' },
  { code: 'I-7', name: 'Citizenship Application', fee: 150, feeNote: null, category: 'citizenship' },
  { code: 'C-2', name: 'PPIC Issuance', fee: 75, feeNote: null, category: 'identity' },
  { code: 'C-3', name: 'PPIC Replacement (lost/stolen)', fee: 50, feeNote: null, category: 'identity' },
  { code: 'V-APP', name: 'Visa Application (V/F classes)', fee: null, feeNote: 'Fee equals the visa class fee', category: 'visa' },
  { code: 'E-APP', name: 'Employment Visa Application', fee: 150, feeNote: null, category: 'visa' },
  { code: 'S-APP', name: 'Student Permit Application', fee: null, feeNote: 'Fee equals the student permit class fee', category: 'permit' },
  { code: 'PP-1', name: 'Passport Application (new or expedited)', fee: 120, feeNote: 'Expedited: P$200', category: 'passport' },
  { code: 'PP-R', name: 'Passport Renewal', fee: 80, feeNote: null, category: 'passport' }
]

export const OFFICES = [
  {
    name: 'IMMD Central',
    address: 'Leman Street, Oakville',
    hours: 'Mon–Fri 08:30–17:00; Sat 09:00–13:00',
    services: ['All visa classes', 'Citizenship ceremonies', 'PPIC issuance', 'Passports', 'Express pathways'],
    phone: '(010) 204-4001'
  },
  {
    name: 'IMMD Braemar County',
    address: 'Adjacent to Braemar County Hall',
    hours: 'Mon–Fri 09:00–16:30',
    services: ['Residency applications (F-series)', 'PPIC renewal', 'Form drop-off'],
    phone: '(010) 204-4215'
  },
  {
    name: 'IMMD Port Office',
    address: 'Port of Entry (co-located with CBCA)',
    hours: '24/7',
    services: ['V0 / V1 on-arrival issuance', 'Border liaison', 'Emergency immigration matters'],
    phone: '(010) 204-4999'
  }
]

export const LEGISLATION = [
  {
    act: 'Immigration Act 2014',
    year: 2014,
    summary:
      'Founding statute of the Immigration Department. Establishes visa classes, residency categories, ' +
      'grounds for admission and removal, and the authority of the Director-General.',
    sections: [
      'Part I — Establishment of IMMD',
      'Part II — Visitor and Residency Visas',
      'Part III — Employment Visas',
      'Part IV — Removal and Appeals'
    ]
  },
  {
    act: 'Citizenship Act 2015',
    year: 2015,
    summary:
      'Defines the pathway to Praya citizenship via the PIC → PPIC process, oath requirements, ' +
      'and grounds for dual-citizenship recognition.',
    sections: [
      'Part I — Citizenship by Birth',
      'Part II — Citizenship by Naturalization',
      'Part III — Oath and Ceremony',
      'Part IV — Dual Citizenship'
    ]
  },
  {
    act: 'Digital Immigration Regulations 2023',
    year: 2023,
    summary:
      'Modernizes submission, biometrics capture, and electronic PPIC issuance. Establishes ' +
      'online status checking and digital form standards.',
    sections: [
      'Part I — Electronic Submissions',
      'Part II — Biometrics Capture Standards',
      'Part III — Electronic PPIC',
      'Part IV — Data Retention'
    ]
  }
]

export const OVERSTAY_TIERS = [
  { minDays: 1, maxDays: 7, range: '1–7 days', fine: 'P$50 per day', ban: 'None', note: 'First-time overstays of 3 days or fewer may receive a written warning instead of a fine.' },
  { minDays: 8, maxDays: 30, range: '8–30 days', fine: 'P$100 per day', ban: '1-year re-entry ban', note: 'Appealable to 3rd District Court.' },
  { minDays: 31, maxDays: Infinity, range: '31+ days', fine: 'Deportation + full fine owed', ban: '5-year re-entry ban', note: 'Right to counsel; appeal to 3rd District Court, then 3rd Circuit.' }
]

export const MOCK_STATUS_RECORDS = [
  { ref: 'V2-2026-04387', status: 'Approved', class: 'V2', submitted: '2026-03-15', decision: '2026-03-22' },
  { ref: 'F1-2026-01120', status: 'Under Review', class: 'F1', submitted: '2026-04-01', decision: null },
  { ref: 'F2-2026-00098', status: 'Requires Interview', class: 'F2', submitted: '2026-02-28', decision: null, interviewDate: '2026-05-04' },
  { ref: 'E-2026-00512', status: 'Approved', class: 'E', submitted: '2026-01-10', decision: '2026-01-29' },
  { ref: 'S2-2026-00044', status: 'Pending', class: 'S2', submitted: '2026-04-18', decision: null },
  { ref: 'I-6-2026-00003', status: 'Approved', class: 'I-6', submitted: '2026-04-20', decision: '2026-04-22' },
  { ref: 'V3-2026-02201', status: 'Denied', class: 'V3', submitted: '2026-03-04', decision: '2026-03-11', denialReason: 'Insufficient funds documented' },
  { ref: 'F3-2025-08844', status: 'Approved', class: 'F3', submitted: '2025-11-02', decision: '2025-12-01' }
]

export const QUICK_ACTIONS = [
  { id: 'apply', label: 'Apply for a Visa', description: 'Start a new V, F, E, S, or Express application.', icon: 'document' },
  { id: 'status', label: 'Check Application Status', description: 'Look up a submitted application by reference number.', icon: 'search' },
  { id: 'renew', label: 'Renew Residency', description: 'Renew an F-series or E-class visa before expiry.', icon: 'refresh' },
  { id: 'citizenship', label: 'Citizenship Application', description: 'Begin the C-11 → I-7 → PPIC pathway.', icon: 'shield' },
  { id: 'lost-ppic', label: 'Report Lost PPIC', description: 'File a Form C-3 replacement request.', icon: 'alert' },
  { id: 'biometrics', label: 'Book Biometrics', description: 'Schedule a biometrics appointment at Oakville, Braemar, or Port.', icon: 'calendar' }
]
