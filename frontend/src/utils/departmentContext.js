// Department context configuration for context-aware chatbot
// Maps routes to department-specific greetings, quick actions, and context

import { departmentData } from './departmentCrawler'

// Department-specific context configuration
export const departmentContextConfig = {
  // Health Department
  health: {
    id: 'health',
    name: 'Health Department',
    greeting: "Hello! I'm the Health Department Assistant. I can help you with health insurance, vaccinations, finding healthcare providers, and more.",
    quickActions: [
      { label: 'Health Insurance', query: 'How do I enroll in health insurance?', icon: 'shield' },
      { label: 'Vaccinations', query: 'Where can I get vaccinated?', icon: 'syringe' },
      { label: 'Find a Provider', query: 'How do I find a doctor?', icon: 'search' },
      { label: 'Emergency Info', query: 'What are the emergency numbers?', icon: 'alert' }
    ],
    suggestedTopics: ['health insurance', 'vaccinations', 'doctors', 'clinics', 'hospitals', 'prescriptions'],
    contextKeywords: ['health', 'medical', 'insurance', 'doctor', 'hospital', 'vaccine', 'healthcare']
  },

  // Revenue Department
  revenue: {
    id: 'revenue',
    name: 'Revenue Department',
    greeting: "Hello! I'm the Revenue Department Assistant. I can help you with filing taxes, checking refund status, making payments, and tax-related questions.",
    quickActions: [
      { label: 'File Taxes', query: 'How do I file my taxes?', icon: 'document' },
      { label: 'Check Refund', query: "What's my refund status?", icon: 'money' },
      { label: 'Make Payment', query: 'How do I pay my taxes?', icon: 'credit-card' },
      { label: 'Tax Help', query: 'What are the tax brackets?', icon: 'help' }
    ],
    suggestedTopics: ['tax filing', 'refunds', 'payments', 'tax brackets', 'deductions', 'deadlines'],
    contextKeywords: ['tax', 'taxes', 'revenue', 'refund', 'filing', 'income', 'deduction']
  },

  // National Police Agency
  npa: {
    id: 'npa',
    name: 'National Police Agency',
    greeting: "Hello! I'm the NPA Assistant. I can help you file police reports, check case status, apply for clearance certificates, and access safety resources.",
    quickActions: [
      { label: 'File Report', query: 'How do I file a police report?', icon: 'document' },
      { label: 'Case Status', query: 'How do I check my case status?', icon: 'search' },
      { label: 'Police Clearance', query: 'How do I get a police clearance certificate?', icon: 'shield' },
      { label: 'Emergency', query: 'What are the emergency numbers?', icon: 'alert' }
    ],
    suggestedTopics: ['police report', 'case lookup', 'clearance', 'emergency', 'crime prevention'],
    contextKeywords: ['police', 'crime', 'report', 'emergency', 'safety', 'clearance', 'case']
  },

  // Bank of Praya
  bop: {
    id: 'bop',
    name: 'Bank of Praya',
    greeting: "Hello! I'm the Bank of Praya Assistant. I can help you with personal banking, business loans, mortgages, and financial services.",
    quickActions: [
      { label: 'Open Account', query: 'How do I open a bank account?', icon: 'user' },
      { label: 'Loans', query: 'What loan options are available?', icon: 'money' },
      { label: 'Mortgage', query: 'How do I apply for a mortgage?', icon: 'home' },
      { label: 'Business Banking', query: 'What business banking services are available?', icon: 'briefcase' }
    ],
    suggestedTopics: ['savings', 'checking', 'loans', 'mortgage', 'business banking', 'interest rates'],
    contextKeywords: ['bank', 'banking', 'account', 'loan', 'mortgage', 'savings', 'currency']
  },

  // Cannabis Tax Bureau
  ctb: {
    id: 'ctb',
    name: 'Cannabis Tax Bureau',
    greeting: "Hello! I'm the CTB Assistant. I can help you with cannabis licensing, tax filing, compliance requirements, and industry regulations.",
    quickActions: [
      { label: 'Apply for License', query: 'How do I apply for a cannabis license?', icon: 'document' },
      { label: 'File Taxes', query: 'How do I file cannabis taxes?', icon: 'money' },
      { label: 'Compliance', query: 'What are the compliance requirements?', icon: 'shield' },
      { label: 'Renewals', query: 'How do I renew my license?', icon: 'refresh' }
    ],
    suggestedTopics: ['licensing', 'tax filing', 'compliance', 'dispensary', 'cultivation'],
    contextKeywords: ['cannabis', 'marijuana', 'dispensary', 'cultivation', 'license', 'ctb']
  },

  // Department of Justice
  doj: {
    id: 'doj',
    name: 'Department of Justice',
    greeting: "Hello! I'm the DOJ Assistant. I can help you with case lookups, legal aid information, court filings, and justice-related services.",
    quickActions: [
      { label: 'Case Lookup', query: 'How do I look up a case?', icon: 'search' },
      { label: 'Legal Aid', query: 'How do I get legal aid?', icon: 'help' },
      { label: 'Court Filings', query: 'How do I file court documents?', icon: 'document' },
      { label: 'Public Defender', query: 'How do I get a public defender?', icon: 'user' }
    ],
    suggestedTopics: ['court cases', 'legal aid', 'filings', 'public defender', 'trial schedule'],
    contextKeywords: ['court', 'legal', 'case', 'lawyer', 'attorney', 'justice', 'trial']
  },

  // Interior Department
  interior: {
    id: 'interior',
    name: 'Interior Department',
    greeting: "Hello! I'm the Interior Department Assistant. I can help you with National IDs, passports, birth certificates, and civil records.",
    quickActions: [
      { label: 'National ID', query: 'How do I get a National ID?', icon: 'id-card' },
      { label: 'Passport', query: 'How do I apply for a passport?', icon: 'document' },
      { label: 'Birth Certificate', query: 'How do I get a birth certificate?', icon: 'document' },
      { label: 'Civil Records', query: 'How do I access civil records?', icon: 'folder' }
    ],
    suggestedTopics: ['national ID', 'passport', 'birth certificate', 'civil records', 'marriage license'],
    contextKeywords: ['id', 'passport', 'birth certificate', 'documents', 'civil records', 'interior']
  },

  // Transport Department
  transport: {
    id: 'transport',
    name: 'Transport Department',
    greeting: "Hello! I'm the Transport Department Assistant. I can help you with driver's licenses, vehicle registration, driving tests, and road safety.",
    quickActions: [
      { label: "Driver's License", query: "How do I get a driver's license?", icon: 'id-card' },
      { label: 'Vehicle Registration', query: 'How do I register a vehicle?', icon: 'car' },
      { label: 'Schedule Test', query: 'How do I schedule a driving test?', icon: 'calendar' },
      { label: 'Renew License', query: 'How do I renew my license?', icon: 'refresh' }
    ],
    suggestedTopics: ['license', 'registration', 'driving test', 'renewal', 'title transfer'],
    contextKeywords: ['driver', 'license', 'vehicle', 'registration', 'driving', 'transport', 'dmv']
  },

  // Praya Post
  post: {
    id: 'post',
    name: 'Praya Post',
    greeting: "Hello! I'm the Praya Post Assistant. I can help you track packages, find shipping rates, locate post offices, and manage mail services.",
    quickActions: [
      { label: 'Track Package', query: 'How do I track my package?', icon: 'search' },
      { label: 'Ship Package', query: 'What are the shipping rates?', icon: 'package' },
      { label: 'Find Location', query: 'Where is the nearest post office?', icon: 'location' },
      { label: 'P.O. Box', query: 'How do I rent a P.O. box?', icon: 'mailbox' }
    ],
    suggestedTopics: ['tracking', 'shipping', 'post office', 'P.O. box', 'international mail'],
    contextKeywords: ['mail', 'post', 'package', 'shipping', 'tracking', 'postal', 'delivery']
  },

  // Housing Authority
  housing: {
    id: 'housing',
    name: 'Housing Authority',
    greeting: "Hello! I'm the Housing Authority Assistant. I can help you with public housing applications, rental assistance, tenant rights, and housing programs.",
    quickActions: [
      { label: 'Apply for Housing', query: 'How do I apply for public housing?', icon: 'home' },
      { label: 'Rental Assistance', query: 'How do I get rental assistance?', icon: 'money' },
      { label: 'Tenant Rights', query: 'What are my rights as a tenant?', icon: 'shield' },
      { label: 'Check Waitlist', query: "What's my waitlist status?", icon: 'list' }
    ],
    suggestedTopics: ['public housing', 'rental assistance', 'tenant rights', 'eviction', 'waitlist'],
    contextKeywords: ['housing', 'rent', 'apartment', 'tenant', 'landlord', 'eviction', 'affordable']
  },

  // Customs and Border Control Agency
  cbca: {
    id: 'cbca',
    name: 'Customs and Border Control',
    greeting: "Hello! I'm the CBCA Assistant. I can help you with import/export permits, travel requirements, customs declarations, and border services.",
    quickActions: [
      { label: 'Import/Export', query: 'How do I get an import permit?', icon: 'document' },
      { label: 'Travel Requirements', query: 'What are the entry requirements?', icon: 'plane' },
      { label: 'Customs Duties', query: 'What are the customs duty rates?', icon: 'money' },
      { label: 'Prohibited Items', query: 'What items are prohibited?', icon: 'alert' }
    ],
    suggestedTopics: ['import', 'export', 'customs', 'travel', 'visa', 'duty-free'],
    contextKeywords: ['customs', 'border', 'import', 'export', 'travel', 'visa', 'duty']
  },

  // Legislative Council
  lc: {
    id: 'lc',
    name: 'Legislative Council',
    greeting: "Hello! I'm the Legislative Council Assistant. I can help you track legislation, find your representative, access voting records, and learn about public hearings.",
    quickActions: [
      { label: 'Track Bills', query: 'How do I track legislation?', icon: 'document' },
      { label: 'Find Rep', query: 'Who is my representative?', icon: 'user' },
      { label: 'Voting Records', query: 'How do I view voting records?', icon: 'check' },
      { label: 'Public Hearings', query: 'When are public hearings?', icon: 'calendar' }
    ],
    suggestedTopics: ['legislation', 'representatives', 'voting', 'hearings', 'bills'],
    contextKeywords: ['legislative', 'law', 'bill', 'council', 'vote', 'representative', 'legislation']
  },

  // Buildings Department
  bd: {
    id: 'bd',
    name: 'Buildings Department',
    greeting: "Hello! I'm the Buildings Department Assistant. I can help you with building permits, inspections, contractor licenses, and construction codes.",
    quickActions: [
      { label: 'Building Permit', query: 'How do I apply for a building permit?', icon: 'document' },
      { label: 'Schedule Inspection', query: 'How do I schedule an inspection?', icon: 'calendar' },
      { label: 'Contractor License', query: 'How do I verify a contractor?', icon: 'shield' },
      { label: 'Building Codes', query: 'What are the building codes?', icon: 'document' }
    ],
    suggestedTopics: ['permits', 'inspections', 'contractors', 'codes', 'construction'],
    contextKeywords: ['building', 'construction', 'permit', 'inspection', 'contractor', 'code']
  },

  // Companies Registry
  cr: {
    id: 'cr',
    name: 'Companies Registry',
    greeting: "Hello! I'm the Companies Registry Assistant. I can help you with business registration, company searches, annual filings, and corporate services.",
    quickActions: [
      { label: 'Register Company', query: 'How do I register a company?', icon: 'briefcase' },
      { label: 'Company Search', query: 'How do I search for a company?', icon: 'search' },
      { label: 'Annual Filings', query: 'When are annual filings due?', icon: 'calendar' },
      { label: 'Name Reservation', query: 'How do I reserve a business name?', icon: 'document' }
    ],
    suggestedTopics: ['registration', 'incorporation', 'company search', 'filings', 'business name'],
    contextKeywords: ['company', 'business', 'incorporation', 'corporate', 'registry', 'llc']
  },

  // Social Welfare Department
  swd: {
    id: 'swd',
    name: 'Social Welfare Department',
    greeting: "Hello! I'm the Social Welfare Assistant. I can help you with social benefits, family services, elderly care, and disability support.",
    quickActions: [
      { label: 'Apply for Benefits', query: 'How do I apply for social benefits?', icon: 'money' },
      { label: 'Family Services', query: 'What family services are available?', icon: 'users' },
      { label: 'Elderly Care', query: 'What elderly care programs exist?', icon: 'heart' },
      { label: 'Disability Support', query: 'What disability support is available?', icon: 'help' }
    ],
    suggestedTopics: ['benefits', 'family services', 'elderly care', 'disability', 'assistance'],
    contextKeywords: ['welfare', 'benefits', 'social', 'elderly', 'disability', 'family', 'assistance']
  }
}

// Default context for portal/home page
export const defaultContext = {
  id: 'portal',
  name: 'Praya Citizen Services',
  greeting: "Hello! I'm the Praya Citizen Services Assistant. How can I help you today?",
  quickActions: [
    { label: 'IDs & Passports', query: 'How do I get a National ID?', icon: 'id-card' },
    { label: 'File Taxes', query: 'How do I file my taxes?', icon: 'document' },
    { label: 'Police Report', query: 'How do I file a police report?', icon: 'shield' },
    { label: "Driver's License", query: "How do I get a driver's license?", icon: 'car' }
  ],
  suggestedTopics: [],
  contextKeywords: []
}

/**
 * Get department context based on current route
 * @param {string} pathname - Current route pathname (e.g., '/health', '/revenue/file')
 * @returns {object} Department context configuration
 */
export function getDepartmentContext(pathname) {
  if (!pathname || pathname === '/') {
    return defaultContext
  }

  // Extract department ID from pathname (first segment after /)
  const segments = pathname.split('/').filter(Boolean)
  const deptId = segments[0]?.toLowerCase()

  // Return department context if found, otherwise default
  return departmentContextConfig[deptId] || defaultContext
}

/**
 * Get department data for enhanced AI context
 * @param {string} deptId - Department ID
 * @returns {object|null} Full department data from departmentCrawler
 */
export function getDepartmentData(deptId) {
  return departmentData.find(d => d.id === deptId) || null
}

/**
 * Get sub-pages for navigation suggestions
 * @param {string} deptId - Department ID
 * @returns {array} Array of sub-page objects with name, url, description
 */
export function getDepartmentSubPages(deptId) {
  const dept = getDepartmentData(deptId)
  return dept?.subPages || []
}

/**
 * Check if a user query relates to a specific sub-page
 * @param {string} query - User's message
 * @param {string} deptId - Current department ID
 * @returns {object|null} Matching sub-page or null
 */
export function findRelevantSubPage(query, deptId) {
  const subPages = getDepartmentSubPages(deptId)
  if (!subPages.length) return null

  const queryLower = query.toLowerCase()

  // Check each sub-page for keyword matches
  for (const page of subPages) {
    const pageName = page.name.toLowerCase()
    const pageDesc = page.description.toLowerCase()

    // Direct name match
    if (queryLower.includes(pageName)) {
      return page
    }

    // Check key phrases in description
    const descWords = pageDesc.split(/\s+/)
    const matchScore = descWords.filter(word =>
      word.length > 3 && queryLower.includes(word)
    ).length

    if (matchScore >= 2) {
      return page
    }
  }

  return null
}

/**
 * Generate navigation offer message for a sub-page
 * @param {object} subPage - Sub-page object
 * @returns {string} Navigation offer message
 */
export function generateNavigationOffer(subPage) {
  return `\n\n**Would you like me to take you to [${subPage.name}](${subPage.url})?** This page has more detailed information and online services.`
}

/**
 * Prioritize department-specific responses when on department page
 * @param {string} query - User's message
 * @param {string} deptId - Current department ID
 * @returns {number} Priority boost score (0-100)
 */
export function getDepartmentPriorityBoost(query, deptId) {
  const context = departmentContextConfig[deptId]
  if (!context) return 0

  const queryLower = query.toLowerCase()
  let boost = 0

  // Check if query matches department context keywords
  for (const keyword of context.contextKeywords) {
    if (queryLower.includes(keyword)) {
      boost += 15
    }
  }

  // Check suggested topics
  for (const topic of context.suggestedTopics) {
    if (queryLower.includes(topic)) {
      boost += 20
    }
  }

  // Cap boost at 100
  return Math.min(boost, 100)
}

export default {
  departmentContextConfig,
  defaultContext,
  getDepartmentContext,
  getDepartmentData,
  getDepartmentSubPages,
  findRelevantSubPage,
  generateNavigationOffer,
  getDepartmentPriorityBoost
}
