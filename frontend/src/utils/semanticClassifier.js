/**
 * Semantic Intent Classifier
 *
 * Enhanced intent classification using semantic similarity techniques:
 * - TF-IDF inspired weighting
 * - N-gram matching for phrase detection
 * - Context-aware scoring
 * - Confidence calibration
 */

import {
  intentPatterns,
  departmentRoutes,
  expandWithSynonyms,
  stemWord,
  isSimilar,
  normalizeText
} from './intentRecognition'

/**
 * Intent examples for semantic matching
 * Maps intents to example phrases that express similar meaning
 */
const intentExamples = {
  reportCrime: [
    'I need to report a crime',
    'someone stole my car',
    'I was robbed',
    'there was a break in at my house',
    'I want to file a police report',
    'my wallet was stolen',
    'I witnessed a crime',
    'someone vandalized my property',
    'I need to report theft',
    'I was mugged'
  ],
  checkCrimeStatus: [
    'check my case status',
    'where is my police report',
    'what happened to my case',
    'update on my report',
    'track my case number',
    'follow up on my report'
  ],
  emergencyServices: [
    'this is an emergency',
    'someone is hurt',
    'I need help now',
    'call 911',
    'there is a crime happening',
    'someone is dying',
    'I need an ambulance'
  ],
  policeClearance: [
    'I need a background check',
    'police clearance certificate',
    'criminal record check',
    'I need clearance for a job',
    'background check for employment'
  ],
  openAccount: [
    'I want to open a bank account',
    'how do I get a savings account',
    'I need a checking account',
    'sign up for banking',
    'create a bank account'
  ],
  loanInquiry: [
    'I need a loan',
    'how do I get a mortgage',
    'I want to borrow money',
    'apply for home loan',
    'business financing options'
  ],
  fileTaxes: [
    'I need to file my taxes',
    'how do I do my tax return',
    'submit my income tax',
    'tax filing deadline',
    'I want to file my annual taxes',
    'e-file my taxes online'
  ],
  taxPayment: [
    'I need to pay my taxes',
    'how much do I owe in taxes',
    'tax payment plan',
    'pay my tax bill'
  ],
  taxRefund: [
    'where is my tax refund',
    'check refund status',
    'when will I get my refund',
    'track my tax refund'
  ],
  applyId: [
    'I need a new ID',
    'how do I get a national ID card',
    'renew my identification',
    'replace my lost ID',
    'my ID expired',
    'get a government ID'
  ],
  applyPassport: [
    'I need a passport',
    'how do I apply for a passport',
    'renew my passport',
    'my passport is expired',
    'replace my lost passport',
    'I need a travel document'
  ],
  birthCertificate: [
    'I need a birth certificate',
    'get a copy of my birth certificate',
    'register a new birth',
    'order birth certificate'
  ],
  driverLicense: [
    'I need a driver license',
    'how do I get a driving license',
    'renew my license',
    'schedule a driving test',
    'my license expired',
    'replace my license'
  ],
  vehicleRegistration: [
    'register my car',
    'vehicle registration renewal',
    'get license plates',
    'title transfer',
    'register a new vehicle'
  ],
  healthInsurance: [
    'I need health insurance',
    'enroll in health coverage',
    'national health insurance',
    'get my insurance card',
    'medical coverage options'
  ],
  vaccination: [
    'I need a vaccine',
    'schedule vaccination',
    'where can I get vaccinated',
    'flu shot appointment',
    'immunization records'
  ],
  housingApplication: [
    'I need affordable housing',
    'apply for public housing',
    'rental assistance',
    'section 8 housing',
    'housing help'
  ],
  tenantRights: [
    'my landlord is evicting me',
    'tenant rights help',
    'rent dispute',
    'lease problems',
    'housing conditions complaint'
  ],
  trackPackage: [
    'track my package',
    'where is my delivery',
    'package status',
    'shipping tracking',
    'my package is late'
  ],
  shipPackage: [
    'I need to ship a package',
    'how much to mail this',
    'send a package',
    'shipping rates',
    'mail a letter'
  ],
  cannabisLicense: [
    'dispensary license',
    'cannabis business permit',
    'grow permit for marijuana',
    'cultivation license'
  ],
  importExport: [
    'import goods to praya',
    'export permit',
    'customs duties',
    'bring items into the country'
  ],
  travelRequirements: [
    'travel to praya requirements',
    'visa needed',
    'border crossing rules',
    'entry requirements'
  ],
  courtCase: [
    'I have a court case',
    'lawsuit help',
    'legal matter assistance',
    'court date information',
    'I am being sued'
  ],
  legalAid: [
    'I need a lawyer but cannot afford one',
    'free legal help',
    'public defender',
    'legal assistance'
  ],
  findRepresentative: [
    'who is my representative',
    'contact my legislator',
    'find my council member'
  ],
  billStatus: [
    'check bill status',
    'track legislation',
    'voting records',
    'new laws being proposed'
  ]
}

/**
 * Calculate word importance scores (TF-IDF inspired)
 */
const wordImportance = {
  // High-value action words
  'report': 3, 'file': 3, 'apply': 3, 'renew': 3, 'track': 3,
  'check': 2.5, 'status': 2.5, 'get': 2, 'need': 2,

  // High-value domain words
  'passport': 4, 'license': 4, 'tax': 4, 'police': 4, 'crime': 4,
  'id': 3.5, 'refund': 3.5, 'insurance': 3.5, 'housing': 3.5,
  'emergency': 5, '911': 5, 'stolen': 3.5, 'lost': 3,

  // Document types
  'certificate': 3, 'permit': 3, 'registration': 3,

  // Moderate importance
  'help': 1.5, 'information': 1.5, 'about': 1, 'how': 1.5,
  'where': 1.5, 'when': 1.5, 'what': 1, 'can': 1
}

/**
 * Calculate semantic similarity between two text strings
 * Uses multiple matching strategies for robust scoring
 */
export function calculateSemanticSimilarity(text1, text2) {
  const norm1 = normalizeText(text1)
  const norm2 = normalizeText(text2)

  const words1 = norm1.split(/\s+/).filter(w => w.length > 2)
  const words2 = norm2.split(/\s+/).filter(w => w.length > 2)

  if (words1.length === 0 || words2.length === 0) return 0

  let score = 0
  let matchCount = 0

  // Exact word matches with importance weighting
  for (const word1 of words1) {
    for (const word2 of words2) {
      if (word1 === word2) {
        const importance = wordImportance[word1] || 1
        score += importance * 2
        matchCount++
      } else if (stemWord(word1) === stemWord(word2)) {
        const importance = wordImportance[word1] || wordImportance[word2] || 1
        score += importance * 1.5
        matchCount++
      } else if (isSimilar(word1, word2, 1)) {
        // Typo tolerance (stricter threshold)
        const importance = wordImportance[word1] || wordImportance[word2] || 1
        score += importance
        matchCount++
      }
    }
  }

  // Bigram matching (consecutive word pairs)
  const bigrams1 = []
  const bigrams2 = []
  for (let i = 0; i < words1.length - 1; i++) {
    bigrams1.push(words1[i] + ' ' + words1[i + 1])
  }
  for (let i = 0; i < words2.length - 1; i++) {
    bigrams2.push(words2[i] + ' ' + words2[i + 1])
  }

  for (const bg1 of bigrams1) {
    if (bigrams2.includes(bg1)) {
      score += 4 // Bigram matches are very valuable
      matchCount++
    }
  }

  // Normalize by length
  const avgLength = (words1.length + words2.length) / 2
  const normalizedScore = score / Math.max(avgLength, 1)

  // Calculate match ratio
  const matchRatio = matchCount / Math.max(words1.length, words2.length)

  return {
    score: normalizedScore,
    matchRatio,
    matchCount,
    totalWords: words1.length + words2.length
  }
}

/**
 * Classify intent using semantic similarity to examples
 * @param {string} message - User message
 * @param {object} options - Classification options
 * @returns {object} - Classification result with confidence
 */
export function classifyIntentSemantic(message, options = {}) {
  const { minConfidence = 0.3, maxResults = 3 } = options
  const normalizedMessage = normalizeText(message)
  const expandedTerms = expandWithSynonyms(message)

  const results = []

  // Score against each intent's examples
  for (const [intentName, examples] of Object.entries(intentExamples)) {
    let bestScore = 0
    let bestExample = ''
    let totalScore = 0

    for (const example of examples) {
      const similarity = calculateSemanticSimilarity(normalizedMessage, example)

      // Also check expanded synonyms against examples
      let synonymBonus = 0
      for (const term of expandedTerms) {
        if (example.toLowerCase().includes(term.toLowerCase())) {
          synonymBonus += 0.5
        }
      }

      const combinedScore = similarity.score + synonymBonus
      totalScore += combinedScore

      if (combinedScore > bestScore) {
        bestScore = combinedScore
        bestExample = example
      }
    }

    // Calculate average score across all examples
    const avgScore = totalScore / examples.length

    // Confidence is weighted combination of best match and average
    const confidence = (bestScore * 0.7 + avgScore * 0.3) / 10 // Normalize to 0-1 range

    if (confidence >= minConfidence) {
      results.push({
        intent: intentName,
        confidence: Math.min(confidence, 1),
        bestMatch: bestExample,
        details: intentPatterns[intentName] || null,
        department: intentPatterns[intentName]?.department || null
      })
    }
  }

  // Also run regex-based classification for comparison
  const regexResult = classifyWithRegex(message)
  if (regexResult) {
    // Check if we already have this intent
    const existingIdx = results.findIndex(r => r.intent === regexResult.intent)
    if (existingIdx >= 0) {
      // Boost confidence if both methods agree
      results[existingIdx].confidence = Math.min(results[existingIdx].confidence * 1.3, 1)
      results[existingIdx].regexConfirmed = true
    } else {
      // Add regex result with high confidence
      results.push({
        intent: regexResult.intent,
        confidence: 0.85,
        bestMatch: 'regex pattern match',
        details: regexResult,
        department: regexResult.department,
        regexConfirmed: true
      })
    }
  }

  // Sort by confidence
  results.sort((a, b) => b.confidence - a.confidence)

  // Return top results
  const topResults = results.slice(0, maxResults)

  return {
    primary: topResults[0] || null,
    alternatives: topResults.slice(1),
    ambiguous: topResults.length > 1 && topResults[0]?.confidence - (topResults[1]?.confidence || 0) < 0.15,
    allResults: topResults
  }
}

/**
 * Regex-based classification (original method)
 */
function classifyWithRegex(message) {
  const lowerMessage = message.toLowerCase().trim()

  for (const [intentName, intent] of Object.entries(intentPatterns)) {
    for (const pattern of intent.patterns) {
      if (pattern.test(lowerMessage)) {
        return {
          intent: intentName,
          ...intent,
          matchedPattern: pattern.toString()
        }
      }
    }
  }

  return null
}

/**
 * Get intent suggestions for ambiguous cases
 * @param {string} message - User message
 * @returns {array} - Array of suggested clarification options
 */
export function getAmbiguousSuggestions(message) {
  const result = classifyIntentSemantic(message, { minConfidence: 0.2, maxResults: 4 })

  if (!result.ambiguous && result.primary) {
    return []
  }

  const suggestions = []
  for (const alt of result.allResults.slice(0, 3)) {
    const intentInfo = intentPatterns[alt.intent]
    if (intentInfo) {
      suggestions.push({
        intent: alt.intent,
        label: getIntentLabel(alt.intent),
        confidence: alt.confidence,
        department: alt.department
      })
    }
  }

  return suggestions
}

/**
 * Get human-readable label for intent
 */
function getIntentLabel(intentName) {
  const labels = {
    reportCrime: 'Report a crime',
    checkCrimeStatus: 'Check case status',
    emergencyServices: 'Emergency services',
    policeClearance: 'Police clearance certificate',
    openAccount: 'Open bank account',
    loanInquiry: 'Loan/mortgage inquiry',
    fileTaxes: 'File taxes',
    taxPayment: 'Tax payment',
    taxRefund: 'Check tax refund',
    applyId: 'National ID services',
    applyPassport: 'Passport services',
    birthCertificate: 'Birth certificate',
    driverLicense: 'Driver\'s license',
    vehicleRegistration: 'Vehicle registration',
    healthInsurance: 'Health insurance',
    vaccination: 'Vaccination services',
    housingApplication: 'Housing assistance',
    tenantRights: 'Tenant rights',
    trackPackage: 'Track package',
    shipPackage: 'Ship package',
    cannabisLicense: 'Cannabis licensing',
    importExport: 'Import/Export',
    travelRequirements: 'Travel requirements',
    courtCase: 'Court case help',
    legalAid: 'Legal aid',
    findRepresentative: 'Find representative',
    billStatus: 'Bill/legislation status'
  }

  return labels[intentName] || intentName.replace(/([A-Z])/g, ' $1').trim()
}

/**
 * Hybrid classification combining semantic and regex approaches
 * @param {string} message - User message
 * @param {object} context - Conversation context
 * @returns {object} - Best classification result
 */
export function classifyIntentHybrid(message, context = {}) {
  // Get semantic classification
  const semanticResult = classifyIntentSemantic(message, { minConfidence: 0.25 })

  // If high confidence semantic match, use it
  if (semanticResult.primary && semanticResult.primary.confidence >= 0.7) {
    return {
      ...semanticResult.primary,
      method: 'semantic',
      needsClarification: false
    }
  }

  // If regex confirmed, boost confidence
  if (semanticResult.primary && semanticResult.primary.regexConfirmed) {
    return {
      ...semanticResult.primary,
      method: 'hybrid',
      needsClarification: false
    }
  }

  // If ambiguous, may need clarification
  if (semanticResult.ambiguous) {
    return {
      ...semanticResult.primary,
      method: 'semantic',
      needsClarification: true,
      alternatives: semanticResult.alternatives.map(a => ({
        intent: a.intent,
        label: getIntentLabel(a.intent),
        confidence: a.confidence
      }))
    }
  }

  // Low confidence match
  if (semanticResult.primary && semanticResult.primary.confidence >= 0.3) {
    return {
      ...semanticResult.primary,
      method: 'semantic-low',
      needsClarification: semanticResult.primary.confidence < 0.5
    }
  }

  // No confident match
  return {
    intent: null,
    confidence: 0,
    method: 'none',
    needsClarification: true,
    message: 'Could not determine intent'
  }
}

export default {
  classifyIntentSemantic,
  classifyIntentHybrid,
  calculateSemanticSimilarity,
  getAmbiguousSuggestions
}
