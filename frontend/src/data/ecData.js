// EC canon data — single source of truth for the Electoral Commission page.
// All fees in $ (Praya Dollars). Status reflects pre-activation infrastructure:
// the EC is operational, but Praya has not yet held its first general election.
// Activation requires a proclamation under Part II of the Electoral Act 2014.

export const CHIEF_ELECTORAL_OFFICER = {
  name: '— position pending appointment —',
  title: 'Chief Electoral Officer',
  quote:
    "The Electoral Commission's job is to be ready before the country is. " +
    'Boundaries, rolls, polling logistics, and observer accreditation are in ' +
    'place. When the proclamation comes, we open the doors the next morning.'
}

// Activation status — central truth for banners and gating
export const ELECTORAL_STATUS = {
  electionsActivated: false,
  proclaimed: false,
  preRegistrationOpen: true,
  observerAccreditationOpen: true,
  nextScheduledElection: null,
  message:
    'Praya has not yet held its first general election. The Electoral Commission ' +
    'is fully operational: voter pre-registration is open, the 24 electoral ' +
    'districts are gazetted under Boundary Order 2014, and observer accreditation ' +
    'is accepting applications. Activation of the election cycle requires a ' +
    'proclamation under Part II of the Electoral Act 2014.'
}

// 24 electoral districts — numbering established under the
// Electoral Commission Boundary Order 2014. Specific boundaries are
// gazetted; the public summary below uses the numeric short codes.
export const DISTRICTS = Array.from({ length: 24 }, (_, i) => {
  const n = i + 1
  const code = `ED-${String(n).padStart(2, '0')}`
  const region = (() => {
    if (n <= 8) return 'Oakville Metro'
    if (n <= 14) return 'Braemar County'
    if (n <= 18) return 'Coastal Regions'
    if (n <= 22) return 'Highland Regions'
    return 'Insular Districts'
  })()
  return { code, number: n, region }
})

export const LEGISLATION = [
  {
    act: 'Electoral Act 2014',
    year: 2014,
    summary:
      'Founding statute of the Electoral Commission. Establishes the EC as an ' +
      'independent constitutional body, the 24-district structure, and the ' +
      'mechanism for proclaiming an election cycle.',
    sections: [
      'Part I — Establishment of the EC',
      'Part II — Proclamation of Elections',
      'Part III — Districts and Boundary Review',
      'Part IV — Conduct of Polls',
      'Part V — Disputes and Petitions'
    ]
  },
  {
    act: 'Voter Registration Act 2018',
    year: 2018,
    summary:
      'Defines voter eligibility, the pre-registration process, the voter roll, ' +
      'and the procedure for roll updates and challenges.',
    sections: [
      'Part I — Eligibility',
      'Part II — Pre-Registration and the Voter Roll',
      'Part III — Address Updates and Transfers',
      'Part IV — Challenges and Removals'
    ]
  },
  {
    act: 'Campaign Finance Disclosure Act 2020',
    year: 2020,
    summary:
      'Requires candidates and registered campaign committees to disclose ' +
      'donations and expenditures on a quarterly basis. Establishes the public ' +
      'disclosure ledger.',
    sections: [
      'Part I — Registered Committees',
      'Part II — Donation Limits and Sources',
      'Part III — Quarterly Disclosures',
      'Part IV — Penalties'
    ]
  },
  {
    act: 'Polling Operations Regulations 2022',
    year: 2022,
    summary:
      'Standardizes polling-place setup, ballot custody, count procedures, and ' +
      'observer access. Issued by the EC under authority delegated by the ' +
      'Electoral Act.',
    sections: [
      'Part I — Polling Place Setup',
      'Part II — Ballot Custody',
      'Part III — Counting and Tabulation',
      'Part IV — Observer Access'
    ]
  }
]

export const FORMS_INDEX = [
  { code: 'V-1', name: 'Voter Pre-Registration', fee: 0, feeNote: 'Free', category: 'voter' },
  { code: 'V-2', name: 'Voter Roll Update (Address / Name Change)', fee: 0, feeNote: 'Free', category: 'voter' },
  { code: 'V-3', name: 'Voter Roll Challenge / Removal Petition', fee: 0, feeNote: 'Free', category: 'voter' },
  { code: 'CF-1', name: 'Candidate Filing Notification', fee: 100, feeNote: null, category: 'candidate' },
  { code: 'CF-2', name: 'Campaign Committee Registration', fee: 50, feeNote: null, category: 'candidate' },
  { code: 'CF-3', name: 'Campaign Finance Disclosure (Quarterly)', fee: 0, feeNote: 'Free', category: 'candidate' },
  { code: 'EC-OBS', name: 'Election Observer Accreditation', fee: 0, feeNote: 'Free', category: 'observer' },
  { code: 'EC-PET', name: 'Election Petition (post-poll dispute)', fee: 250, feeNote: 'Refundable if upheld', category: 'dispute' }
]

export const OFFICES = [
  {
    name: 'Electoral Commission Headquarters',
    address: 'Suffrage House, Civic Square, Oakville',
    hours: 'Mon–Fri 09:00–17:00',
    services: ['Voter pre-registration', 'District boundary inquiries', 'Form filings', 'Public records'],
    phone: '(010) 204-5000'
  },
  {
    name: 'EC Braemar County Office',
    address: 'Adjacent to Braemar County Hall',
    hours: 'Mon–Fri 10:00–16:00',
    services: ['Voter registration drop-off', 'Form pickup', 'Boundary lookups'],
    phone: '(010) 204-5215'
  },
  {
    name: 'EC Records Annexe',
    address: '12 Statute Lane, Oakville',
    hours: 'Mon–Fri 10:00–15:00',
    services: ['Public access to voter roll registers', 'Campaign finance ledger', 'Boundary maps'],
    phone: '(010) 204-5099'
  }
]

export const QUICK_ACTIONS = [
  { id: 'preregister', label: 'Pre-Register to Vote', description: 'File Form V-1 to be added to the voter roll once elections activate.', icon: 'document' },
  { id: 'district', label: 'Find My District', description: 'Look up which of the 24 electoral districts you live in.', icon: 'search' },
  { id: 'roll', label: 'Check Voter Roll Status', description: 'Confirm your pre-registration is on file.', icon: 'shield' },
  { id: 'law', label: 'Read Electoral Law', description: 'Browse the Electoral Act and supporting legislation.', icon: 'book' },
  { id: 'observer', label: 'Become an Observer', description: 'Apply for accredited election observer status.', icon: 'eye' },
  { id: 'finance', label: 'Campaign Finance', description: 'Filing requirements and the public disclosure ledger.', icon: 'money' }
]

// Mock voter-roll records for the pre-registration status checker.
// Pre-registration references follow the pattern V-YEAR-5DIGIT.
export const MOCK_VOTER_RECORDS = [
  { ref: 'V-2026-00001', status: 'Pre-Registered', district: 'ED-04', registered: '2026-01-12' },
  { ref: 'V-2026-00874', status: 'Pre-Registered', district: 'ED-12', registered: '2026-02-28' },
  { ref: 'V-2026-01203', status: 'Address Verification Required', district: 'ED-07', registered: '2026-03-04' },
  { ref: 'V-2026-02041', status: 'Pre-Registered', district: 'ED-21', registered: '2026-04-10' },
  { ref: 'V-2025-09988', status: 'Pre-Registered', district: 'ED-02', registered: '2025-11-20' }
]

// Postal-code prefix → district map. The 24-district structure groups
// prefixes regionally; consult the EC for street-level overrides.
export const POSTAL_DISTRICT_MAP = {
  // Oakville Metro: postal prefixes 1xxx–8xxx → ED-01..ED-08
  '1': 'ED-01', '2': 'ED-02', '3': 'ED-03', '4': 'ED-04',
  '5': 'ED-05', '6': 'ED-06', '7': 'ED-07', '8': 'ED-08',
  // Braemar County: 9xxx–14xxx prefix range, but with double-digit prefixes
  '9': 'ED-09', '10': 'ED-10', '11': 'ED-11', '12': 'ED-12',
  '13': 'ED-13', '14': 'ED-14',
  // Coastal: 15–18
  '15': 'ED-15', '16': 'ED-16', '17': 'ED-17', '18': 'ED-18',
  // Highland: 19–22
  '19': 'ED-19', '20': 'ED-20', '21': 'ED-21', '22': 'ED-22',
  // Insular: 23–24
  '23': 'ED-23', '24': 'ED-24'
}
