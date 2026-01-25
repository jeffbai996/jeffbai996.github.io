/**
 * Proactive Suggestions Engine
 *
 * Generates intelligent suggestions based on:
 * - Current conversation context
 * - User's detected goals
 * - Related services
 * - Common follow-up questions
 * - Anticipated user needs
 */

import { extractTopics } from './intentRecognition'
import { suggestRelatedServices, getServicePrerequisites } from './entityLinker'

/**
 * Follow-up suggestions based on intent
 */
const intentFollowUps = {
  reportCrime: [
    { text: 'How to track my case status', query: 'check case status' },
    { text: 'What happens after I file a report?', query: 'what happens after police report' },
    { text: 'Get a police clearance certificate', query: 'police clearance' }
  ],
  checkCrimeStatus: [
    { text: 'Contact the investigating officer', query: 'contact police about my case' },
    { text: 'Appeal a case decision', query: 'appeal police decision' }
  ],
  fileTaxes: [
    { text: 'Track my refund status', query: 'check tax refund' },
    { text: 'Set up a payment plan', query: 'tax payment plan' },
    { text: 'Common tax deductions', query: 'what can I deduct from taxes' }
  ],
  taxRefund: [
    { text: 'Update my bank details for refund', query: 'update bank details for tax refund' },
    { text: 'Amend my tax return', query: 'how to amend tax return' }
  ],
  applyId: [
    { text: 'Also apply for a passport', query: 'apply for passport' },
    { text: 'Update my address on ID', query: 'change address on ID' },
    { text: 'Check ID application status', query: 'check ID application status' }
  ],
  applyPassport: [
    { text: 'Expedited passport options', query: 'expedited passport service' },
    { text: 'Passport photo requirements', query: 'passport photo requirements' },
    { text: 'Check passport application status', query: 'check passport status' }
  ],
  driverLicense: [
    { text: 'Schedule driving test', query: 'schedule driving test' },
    { text: 'Register my vehicle', query: 'vehicle registration' },
    { text: 'Check license points', query: 'check driving license points' }
  ],
  vehicleRegistration: [
    { text: 'Renew vehicle registration', query: 'renew vehicle registration' },
    { text: 'Transfer vehicle title', query: 'transfer vehicle title' },
    { text: 'Get vehicle inspection', query: 'vehicle inspection requirements' }
  ],
  healthInsurance: [
    { text: 'Find a covered doctor', query: 'find healthcare provider' },
    { text: 'Check my coverage details', query: 'health insurance coverage' },
    { text: 'File an insurance claim', query: 'file health insurance claim' }
  ],
  housingApplication: [
    { text: 'Check waitlist status', query: 'housing waitlist status' },
    { text: 'Emergency housing assistance', query: 'emergency housing help' },
    { text: 'Tenant rights information', query: 'tenant rights' }
  ],
  trackPackage: [
    { text: 'Report a missing package', query: 'report missing package' },
    { text: 'Redirect my package', query: 'redirect package delivery' },
    { text: 'File a shipping claim', query: 'shipping damage claim' }
  ]
}

/**
 * Topic-based suggestions
 */
const topicSuggestions = {
  police: [
    { text: 'File a police report', query: 'file police report', icon: 'shield' },
    { text: 'Find police station', query: 'find police station near me', icon: 'location' },
    { text: 'Get police clearance', query: 'police clearance certificate', icon: 'document' }
  ],
  taxes: [
    { text: 'File my taxes', query: 'how to file taxes', icon: 'money' },
    { text: 'Check refund status', query: 'tax refund status', icon: 'search' },
    { text: 'Payment options', query: 'tax payment options', icon: 'credit-card' }
  ],
  identity: [
    { text: 'Get National ID', query: 'apply national id', icon: 'id-card' },
    { text: 'Apply for passport', query: 'apply for passport', icon: 'document' },
    { text: 'Update my information', query: 'update personal information', icon: 'refresh' }
  ],
  transport: [
    { text: 'Driver license services', query: 'driver license', icon: 'car' },
    { text: 'Vehicle registration', query: 'register vehicle', icon: 'car' },
    { text: 'Schedule driving test', query: 'schedule driving test', icon: 'calendar' }
  ],
  health: [
    { text: 'Enroll in insurance', query: 'health insurance enrollment', icon: 'heart' },
    { text: 'Find a doctor', query: 'find healthcare provider', icon: 'search' },
    { text: 'Vaccination schedule', query: 'vaccination appointment', icon: 'syringe' }
  ],
  housing: [
    { text: 'Apply for housing', query: 'public housing application', icon: 'home' },
    { text: 'Rental assistance', query: 'rental assistance program', icon: 'money' },
    { text: 'Know your rights', query: 'tenant rights', icon: 'document' }
  ],
  postal: [
    { text: 'Track package', query: 'track my package', icon: 'package' },
    { text: 'Shipping rates', query: 'shipping rates', icon: 'money' },
    { text: 'Find post office', query: 'post office locations', icon: 'location' }
  ],
  legal: [
    { text: 'Case lookup', query: 'court case lookup', icon: 'search' },
    { text: 'Legal aid services', query: 'legal aid', icon: 'help' },
    { text: 'Court information', query: 'court information', icon: 'briefcase' }
  ]
}

/**
 * Goal-based anticipation suggestions
 */
const goalAnticipations = {
  document_acquisition: [
    'Required documents checklist',
    'Processing time information',
    'Fee information'
  ],
  tax_filing: [
    'Deadline reminders',
    'Deduction checklist',
    'E-file instructions'
  ],
  crime_reporting: [
    'What to include in your report',
    'Evidence preservation tips',
    'Victim services information'
  ],
  status_tracking: [
    'Expected processing times',
    'Contact for updates',
    'Escalation options'
  ],
  cost_inquiry: [
    'Payment methods accepted',
    'Fee waiver eligibility',
    'Payment plan options'
  ],
  process_understanding: [
    'Step-by-step guide',
    'Common mistakes to avoid',
    'Documentation tips'
  ]
}

/**
 * Generate proactive suggestions based on conversation context
 * @param {object} context - Conversation context from memory
 * @returns {array} - Array of suggestion objects
 */
export function generateProactiveSuggestions(context = {}) {
  const suggestions = []
  const seen = new Set()

  // Add helper to avoid duplicates
  const addSuggestion = (suggestion) => {
    const key = suggestion.query || suggestion.text
    if (!seen.has(key)) {
      seen.add(key)
      suggestions.push(suggestion)
    }
  }

  // 1. Based on last matched intent
  if (context.lastIntent && intentFollowUps[context.lastIntent]) {
    intentFollowUps[context.lastIntent].forEach(s => addSuggestion(s))
  }

  // 2. Based on detected topics
  if (context.topics) {
    for (const topic of context.topics) {
      if (topicSuggestions[topic]) {
        topicSuggestions[topic].slice(0, 2).forEach(s => addSuggestion(s))
      }
    }
  }

  // 3. Based on user goals
  if (context.userGoals) {
    for (const goal of context.userGoals) {
      if (goalAnticipations[goal]) {
        goalAnticipations[goal].slice(0, 1).forEach(text => {
          addSuggestion({ text, query: text.toLowerCase() })
        })
      }
    }
  }

  // 4. Based on sentiment - extra helpful suggestions if frustrated
  if (context.sentiment === 'frustrated') {
    addSuggestion({
      text: 'Speak with a representative',
      query: 'how to contact customer service',
      priority: 'high'
    })
    addSuggestion({
      text: 'Alternative ways to get help',
      query: 'other ways to get help',
      priority: 'high'
    })
  }

  // 5. Based on clarification count - simpler options if confused
  if (context.clarificationCount >= 2) {
    return [
      { text: 'Documents & ID', query: 'documents and id help', icon: 'document' },
      { text: 'Taxes & Financial', query: 'tax and financial help', icon: 'money' },
      { text: 'Police & Safety', query: 'police services', icon: 'shield' },
      { text: 'Other Services', query: 'list all services', icon: 'list' }
    ]
  }

  // Prioritize and limit suggestions
  return suggestions
    .sort((a, b) => {
      if (a.priority === 'high' && b.priority !== 'high') return -1
      if (b.priority === 'high' && a.priority !== 'high') return 1
      return 0
    })
    .slice(0, 4)
}

/**
 * Generate "Did you know?" tips based on context
 * @param {string} currentTopic - Current discussion topic
 * @returns {string|null} - Helpful tip or null
 */
export function generateProactiveTip(currentTopic) {
  const tips = {
    passport: 'Did you know? You can apply for an expedited passport for urgent travel needs.',
    taxes: 'Did you know? E-filing is free for incomes under $75,000.',
    police: 'Did you know? You can file minor theft reports online without visiting a station.',
    license: 'Did you know? License renewals can be done online if your address hasn\'t changed.',
    insurance: 'Did you know? Open enrollment for health insurance is November 1 - December 31.',
    housing: 'Did you know? Emergency housing assistance is available for urgent situations.'
  }

  return tips[currentTopic] || null
}

/**
 * Suggest next logical steps based on completed action
 * @param {string} completedAction - Action user just completed
 * @returns {array} - Next step suggestions
 */
export function suggestNextSteps(completedAction) {
  const nextSteps = {
    filed_tax_return: [
      { text: 'Set up refund tracking', query: 'track tax refund' },
      { text: 'Print confirmation', query: 'print tax filing confirmation' }
    ],
    submitted_id_application: [
      { text: 'Track application status', query: 'check id application status' },
      { text: 'While you wait, apply for passport', query: 'apply for passport' }
    ],
    filed_police_report: [
      { text: 'Save your case number', query: 'my case number' },
      { text: 'Learn about victim services', query: 'victim support services' }
    ],
    registered_vehicle: [
      { text: 'Get insurance quotes', query: 'vehicle insurance' },
      { text: 'Schedule inspection', query: 'vehicle inspection' }
    ]
  }

  return nextSteps[completedAction] || []
}

/**
 * Generate contextual quick actions for chat widget
 * @param {string} departmentId - Current department
 * @param {object} context - Conversation context
 * @returns {array} - Quick action chips
 */
export function generateQuickActions(departmentId, context = {}) {
  // Default actions based on department
  const departmentActions = {
    npa: [
      { label: 'Report Crime', query: 'I need to report a crime', icon: 'alert' },
      { label: 'Check Status', query: 'Check my case status', icon: 'search' },
      { label: 'Clearance', query: 'Get police clearance', icon: 'document' },
      { label: 'Emergency', query: 'Emergency information', icon: 'alert' }
    ],
    revenue: [
      { label: 'File Taxes', query: 'How do I file my taxes', icon: 'document' },
      { label: 'Check Refund', query: 'Where is my tax refund', icon: 'search' },
      { label: 'Make Payment', query: 'Pay my taxes', icon: 'credit-card' },
      { label: 'Deadlines', query: 'Tax deadlines', icon: 'calendar' }
    ],
    interior: [
      { label: 'National ID', query: 'Apply for national ID', icon: 'id-card' },
      { label: 'Passport', query: 'Apply for passport', icon: 'document' },
      { label: 'Birth Cert', query: 'Get birth certificate', icon: 'document' },
      { label: 'Track App', query: 'Track my application', icon: 'search' }
    ],
    transport: [
      { label: 'License', query: 'Get driver license', icon: 'car' },
      { label: 'Register Vehicle', query: 'Register my vehicle', icon: 'car' },
      { label: 'Schedule Test', query: 'Schedule driving test', icon: 'calendar' },
      { label: 'Renew', query: 'Renew registration', icon: 'refresh' }
    ],
    health: [
      { label: 'Insurance', query: 'Health insurance options', icon: 'heart' },
      { label: 'Vaccinations', query: 'Schedule vaccination', icon: 'syringe' },
      { label: 'Find Doctor', query: 'Find healthcare provider', icon: 'search' },
      { label: 'Coverage', query: 'Check my coverage', icon: 'document' }
    ],
    housing: [
      { label: 'Apply', query: 'Apply for housing', icon: 'home' },
      { label: 'Eligibility', query: 'Check eligibility', icon: 'check' },
      { label: 'Waitlist', query: 'Check waitlist status', icon: 'list' },
      { label: 'Rights', query: 'Tenant rights', icon: 'document' }
    ],
    post: [
      { label: 'Track', query: 'Track my package', icon: 'package' },
      { label: 'Ship', query: 'Ship a package', icon: 'package' },
      { label: 'Rates', query: 'Shipping rates', icon: 'money' },
      { label: 'Locations', query: 'Post office locations', icon: 'location' }
    ],
    portal: [
      { label: 'Services', query: 'What services are available', icon: 'list' },
      { label: 'Documents', query: 'Get documents', icon: 'document' },
      { label: 'Contact', query: 'Contact information', icon: 'help' },
      { label: 'Hours', query: 'Office hours', icon: 'calendar' }
    ]
  }

  // Return department-specific actions, or contextual suggestions
  if (departmentId && departmentActions[departmentId]) {
    return departmentActions[departmentId]
  }

  // If we have context, generate based on that
  if (context.topics && context.topics.length > 0) {
    const primaryTopic = context.topics[0]
    if (topicSuggestions[primaryTopic]) {
      return topicSuggestions[primaryTopic]
    }
  }

  // Default portal actions
  return departmentActions.portal
}

/**
 * Detect if user might need proactive assistance
 * @param {string} message - User message
 * @param {object} context - Conversation context
 * @returns {object|null} - Proactive intervention if needed
 */
export function detectProactiveIntervention(message, context = {}) {
  const lower = message.toLowerCase()

  // Detect potential frustration or confusion
  if (/\b(confused|lost|don't understand|not sure|stuck|help)\b/.test(lower)) {
    return {
      type: 'assistance',
      message: "It sounds like you might need some guidance. Let me help you find what you're looking for.",
      suggestions: [
        { text: 'Browse all services', query: 'list all services' },
        { text: 'Talk to someone', query: 'contact customer service' }
      ]
    }
  }

  // Detect potential emergency
  if (/\b(urgent|emergency|immediately|asap|right now)\b/.test(lower) && context.topics?.includes('police')) {
    return {
      type: 'emergency',
      message: '**If this is an emergency, please call 911 immediately.**',
      priority: 'high'
    }
  }

  // Detect missed opportunity to offer related services
  if (context.messageCount >= 3 && !context.offeredRelated) {
    const topics = extractTopics(message)
    if (topics.length > 0 && topicSuggestions[topics[0]]) {
      return {
        type: 'related',
        message: 'While you\'re here, you might also be interested in:',
        suggestions: topicSuggestions[topics[0]].slice(0, 2)
      }
    }
  }

  return null
}

export default {
  generateProactiveSuggestions,
  generateProactiveTip,
  suggestNextSteps,
  generateQuickActions,
  detectProactiveIntervention
}
