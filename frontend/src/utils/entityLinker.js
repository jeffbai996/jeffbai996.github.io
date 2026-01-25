/**
 * Entity Linking System
 *
 * Connects extracted entities to actionable items:
 * - Links case numbers to status check URLs
 * - Connects services to prerequisites
 * - Maps documents to issuing departments
 * - Creates relationship chains for multi-step processes
 */

import { departmentRoutes } from './intentRecognition'

/**
 * Entity types and their action mappings
 */
const entityActions = {
  caseNumber: {
    pattern: /NPA-\d{6}/i,
    department: 'npa',
    action: 'status_check',
    url: '/npa/lookup',
    description: 'Police case number',
    instructions: 'You can check your case status at the [NPA Case Lookup](/npa/lookup) page.'
  },
  trackingNumber: {
    pattern: /PP\d{10,}/i,
    department: 'post',
    action: 'track_package',
    url: '/post/track',
    description: 'Praya Post tracking number',
    instructions: 'Track your package at [Praya Post Tracking](/post/track).'
  },
  taxId: {
    pattern: /\d{3}-\d{2}-\d{4}/,
    department: 'revenue',
    action: 'account_lookup',
    url: '/revenue/account',
    description: 'Tax identification number',
    instructions: 'You can view your tax account at the [Revenue Portal](/revenue).'
  },
  referenceNumber: {
    pattern: /REF[#:\s]*([A-Z0-9]{6,12})/i,
    department: null, // Depends on prefix
    action: 'status_check',
    description: 'Application reference number'
  },
  licensePlate: {
    pattern: /[A-Z]{2,3}[- ]?\d{3,4}/i,
    department: 'transport',
    action: 'vehicle_lookup',
    url: '/transport/registration',
    description: 'Vehicle license plate',
    instructions: 'Check vehicle registration at [Transport Department](/transport/registration).'
  }
}

/**
 * Service prerequisites mapping
 * Maps services to required documents/steps
 */
const servicePrerequisites = {
  passport_new: {
    name: 'New Passport Application',
    department: 'interior',
    requires: ['national_id', 'birth_certificate', 'passport_photo'],
    fee: '$80 (standard) / $150 (expedited)',
    processing: '10-14 business days',
    url: '/interior/passport'
  },
  passport_renew: {
    name: 'Passport Renewal',
    department: 'interior',
    requires: ['current_passport', 'passport_photo'],
    fee: '$60',
    processing: '7-10 business days',
    url: '/interior/passport'
  },
  national_id_new: {
    name: 'New National ID',
    department: 'interior',
    requires: ['birth_certificate', 'proof_of_address', 'id_photo'],
    fee: '$25',
    processing: '5-7 business days',
    url: '/interior/id'
  },
  national_id_renew: {
    name: 'National ID Renewal',
    department: 'interior',
    requires: ['current_id'],
    fee: '$15',
    processing: '3-5 business days',
    url: '/interior/id'
  },
  driver_license_new: {
    name: 'New Driver License',
    department: 'transport',
    requires: ['national_id', 'proof_of_address', 'vision_test', 'written_test', 'road_test'],
    fee: '$45',
    processing: '5-7 business days after tests',
    url: '/transport/license'
  },
  driver_license_renew: {
    name: 'Driver License Renewal',
    department: 'transport',
    requires: ['current_license'],
    fee: '$30',
    processing: '3-5 business days',
    url: '/transport/license'
  },
  vehicle_registration: {
    name: 'Vehicle Registration',
    department: 'transport',
    requires: ['vehicle_title', 'proof_of_insurance', 'national_id', 'inspection_certificate'],
    fee: 'Varies by vehicle type',
    processing: 'Same day if documents complete',
    url: '/transport/registration'
  },
  police_clearance: {
    name: 'Police Clearance Certificate',
    department: 'npa',
    requires: ['national_id', 'completed_application'],
    fee: '$20',
    processing: '3 business days',
    url: '/npa/services'
  },
  tax_filing: {
    name: 'Tax Return Filing',
    department: 'revenue',
    requires: ['w2_forms', 'income_records', 'deduction_records'],
    fee: 'Free for e-file under $75,000 income',
    deadline: 'April 15 annually',
    url: '/revenue/file'
  },
  health_insurance: {
    name: 'National Health Insurance',
    department: 'health',
    requires: ['national_id', 'proof_of_residence', 'income_documentation'],
    fee: 'Based on income',
    enrollment: 'November 1 - December 31',
    url: '/health/insurance'
  },
  public_housing: {
    name: 'Public Housing Application',
    department: 'housing',
    requires: ['national_id', 'income_verification', 'residency_proof'],
    fee: 'No application fee',
    processing: 'Waitlist varies by region',
    url: '/housing/apply'
  }
}

/**
 * Document to department mapping
 */
const documentDepartments = {
  birth_certificate: { department: 'interior', url: '/interior/birth' },
  national_id: { department: 'interior', url: '/interior/id' },
  passport: { department: 'interior', url: '/interior/passport' },
  driver_license: { department: 'transport', url: '/transport/license' },
  vehicle_registration: { department: 'transport', url: '/transport/registration' },
  police_clearance: { department: 'npa', url: '/npa/services' },
  tax_transcript: { department: 'revenue', url: '/revenue' },
  health_card: { department: 'health', url: '/health/insurance' },
  court_documents: { department: 'doj', url: '/doj' }
}

/**
 * Extract entities from message and link to actions
 * @param {string} message - User message
 * @returns {object} - Linked entities with actions
 */
export function extractAndLinkEntities(message) {
  const linkedEntities = []

  for (const [entityType, config] of Object.entries(entityActions)) {
    const match = message.match(config.pattern)
    if (match) {
      linkedEntities.push({
        type: entityType,
        value: match[0],
        department: config.department,
        action: config.action,
        url: config.url,
        description: config.description,
        instructions: config.instructions
      })
    }
  }

  return linkedEntities
}

/**
 * Get prerequisites for a service
 * @param {string} serviceId - Service identifier
 * @returns {object|null} - Prerequisites info
 */
export function getServicePrerequisites(serviceId) {
  return servicePrerequisites[serviceId] || null
}

/**
 * Find services that need a specific document
 * @param {string} documentType - Document type
 * @returns {array} - Services requiring this document
 */
export function findServicesNeedingDocument(documentType) {
  const services = []

  for (const [serviceId, config] of Object.entries(servicePrerequisites)) {
    if (config.requires.includes(documentType)) {
      services.push({
        id: serviceId,
        name: config.name,
        department: config.department,
        url: config.url
      })
    }
  }

  return services
}

/**
 * Get department for a document type
 * @param {string} documentType - Document type
 * @returns {object|null} - Department info
 */
export function getDocumentDepartment(documentType) {
  return documentDepartments[documentType] || null
}

/**
 * Generate a relationship chain for multi-step processes
 * @param {string} goalService - End goal service
 * @returns {array} - Chain of steps needed
 */
export function generateServiceChain(goalService) {
  const service = servicePrerequisites[goalService]
  if (!service) return []

  const chain = [{
    step: 1,
    type: 'final',
    service: goalService,
    name: service.name,
    department: service.department,
    url: service.url,
    fee: service.fee,
    processing: service.processing
  }]

  // Check each prerequisite
  let stepNumber = 2
  for (const req of service.requires) {
    const docDept = documentDepartments[req]
    const prereqService = Object.entries(servicePrerequisites).find(
      ([id, svc]) => id.includes(req.replace('_', '_'))
    )

    if (docDept) {
      chain.unshift({
        step: stepNumber++,
        type: 'prerequisite',
        document: req,
        name: formatDocumentName(req),
        department: docDept.department,
        url: docDept.url,
        note: 'Required document'
      })
    }
  }

  // Renumber steps from the beginning
  chain.forEach((item, idx) => {
    item.step = idx + 1
  })

  return chain
}

/**
 * Format document name for display
 */
function formatDocumentName(docType) {
  const names = {
    birth_certificate: 'Birth Certificate',
    national_id: 'National ID',
    passport: 'Passport',
    passport_photo: 'Passport Photo',
    proof_of_address: 'Proof of Address',
    id_photo: 'ID Photo',
    current_passport: 'Current Passport',
    current_id: 'Current ID',
    current_license: 'Current License',
    vision_test: 'Vision Test',
    written_test: 'Written Test',
    road_test: 'Road Test',
    vehicle_title: 'Vehicle Title',
    proof_of_insurance: 'Proof of Insurance',
    inspection_certificate: 'Vehicle Inspection',
    completed_application: 'Completed Application Form',
    w2_forms: 'W-2 Forms',
    income_records: 'Income Records',
    deduction_records: 'Deduction Records',
    income_documentation: 'Income Documentation',
    income_verification: 'Income Verification',
    residency_proof: 'Proof of Residency'
  }

  return names[docType] || docType.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

/**
 * Generate helpful context about linked entities
 * @param {array} entities - Linked entities
 * @returns {string} - Helpful text about the entities
 */
export function generateEntityContext(entities) {
  if (!entities || entities.length === 0) return ''

  const lines = []

  for (const entity of entities) {
    if (entity.type === 'caseNumber') {
      lines.push(`**Case Number Found:** ${entity.value}`)
      lines.push(entity.instructions)
    } else if (entity.type === 'trackingNumber') {
      lines.push(`**Tracking Number Found:** ${entity.value}`)
      lines.push(entity.instructions)
    } else if (entity.type === 'licensePlate') {
      lines.push(`**License Plate Found:** ${entity.value}`)
      lines.push(entity.instructions)
    }
  }

  return lines.join('\n')
}

/**
 * Suggest related services based on current query
 * @param {string} currentService - Current service being discussed
 * @returns {array} - Related services
 */
export function suggestRelatedServices(currentService) {
  const service = servicePrerequisites[currentService]
  if (!service) return []

  const suggestions = []
  const department = service.department

  // Find other services from same department
  for (const [serviceId, config] of Object.entries(servicePrerequisites)) {
    if (config.department === department && serviceId !== currentService) {
      suggestions.push({
        id: serviceId,
        name: config.name,
        url: config.url
      })
    }
  }

  // Also suggest services that share prerequisites
  for (const prereq of service.requires) {
    const relatedServices = findServicesNeedingDocument(prereq)
    for (const related of relatedServices) {
      if (related.id !== currentService && !suggestions.find(s => s.id === related.id)) {
        suggestions.push(related)
      }
    }
  }

  return suggestions.slice(0, 3) // Limit to 3 suggestions
}

export default {
  extractAndLinkEntities,
  getServicePrerequisites,
  findServicesNeedingDocument,
  getDocumentDepartment,
  generateServiceChain,
  generateEntityContext,
  suggestRelatedServices
}
