/**
 * Document & Form Knowledge Base
 *
 * Comprehensive knowledge about government forms, their fields,
 * requirements, common mistakes, and step-by-step guidance.
 *
 * This helps users:
 * - Understand what documents they need
 * - Fill out forms correctly
 * - Avoid common mistakes
 * - Know required vs optional fields
 */

// Form categories for easy lookup
export const FormCategory = {
  IDENTITY: 'identity',
  TAXES: 'taxes',
  TRANSPORT: 'transport',
  POLICE: 'police',
  HEALTH: 'health',
  HOUSING: 'housing',
  BUSINESS: 'business',
  LEGAL: 'legal'
};

/**
 * Comprehensive form database
 */
export const formDatabase = {
  // ===== IDENTITY DOCUMENTS =====
  'national-id-application': {
    id: 'national-id-application',
    name: 'National ID Application Form (ID-100)',
    department: 'interior',
    category: FormCategory.IDENTITY,
    url: '/interior/id',
    fee: { new: '$25', renewal: '$15', replacement: '$20' },
    processingTime: '5-7 business days',
    validFor: '10 years',

    description: 'Official application form for obtaining or renewing a Praya National ID card.',

    eligibility: [
      'Praya citizen (by birth or naturalization)',
      'Permanent resident with valid status',
      'At least 16 years old (minors need guardian signature)'
    ],

    requiredDocuments: [
      { name: 'Birth Certificate', note: 'Original or certified copy', required: true },
      { name: 'Proof of Address', note: 'Utility bill, bank statement, or lease (within 90 days)', required: true },
      { name: 'Passport-style Photo', note: '2x2 inches, white background, taken within 6 months', required: true },
      { name: 'Current ID (for renewal)', note: 'Expired ID acceptable for renewal only', required: false },
      { name: 'Legal Name Change Documents', note: 'Court order or marriage certificate if applicable', required: false }
    ],

    formFields: [
      { name: 'Full Legal Name', type: 'text', required: true, tip: 'Must match birth certificate exactly' },
      { name: 'Date of Birth', type: 'date', required: true, tip: 'Format: DD/MM/YYYY' },
      { name: 'Place of Birth', type: 'text', required: true, tip: 'City and country' },
      { name: 'Current Address', type: 'address', required: true, tip: 'Must match proof of address document' },
      { name: 'Gender', type: 'select', required: true, options: ['Male', 'Female', 'Non-binary', 'Prefer not to say'] },
      { name: 'Height', type: 'number', required: true, tip: 'In centimeters' },
      { name: 'Eye Color', type: 'select', required: true, options: ['Brown', 'Blue', 'Green', 'Hazel', 'Gray', 'Other'] },
      { name: 'Emergency Contact', type: 'contact', required: true, tip: 'Name and phone number' },
      { name: 'Signature', type: 'signature', required: true, tip: 'Sign within the box using black ink' }
    ],

    commonMistakes: [
      { mistake: 'Name spelling differs from birth certificate', fix: 'Ensure exact spelling match or provide legal name change documentation' },
      { mistake: 'Photo doesn\'t meet requirements', fix: 'Use white background, no glasses, neutral expression, taken within 6 months' },
      { mistake: 'Proof of address is outdated', fix: 'Document must be dated within the last 90 days' },
      { mistake: 'Missing signature', fix: 'Sign in black ink within the designated box' },
      { mistake: 'Incomplete emergency contact', fix: 'Provide full name and working phone number' }
    ],

    stepByStep: [
      'Gather all required documents (birth certificate, proof of address, photo)',
      'Fill out the ID-100 form online or at an Interior Department office',
      'Schedule an appointment or visit during walk-in hours',
      'Present documents and complete biometric capture (fingerprints, photo)',
      'Pay the applicable fee ($25 new, $15 renewal)',
      'Receive temporary ID receipt (valid for 30 days)',
      'Collect your ID card in 5-7 business days or opt for mail delivery (+$5)'
    ],

    tips: [
      'Apply 2-3 months before your current ID expires to avoid gaps',
      'Online applications process faster than walk-in',
      'PrayaPass account required for online applications',
      'You can track application status online with your reference number'
    ],

    relatedForms: ['passport-application', 'address-change-form']
  },

  'passport-application': {
    id: 'passport-application',
    name: 'Passport Application Form (PP-1)',
    department: 'interior',
    category: FormCategory.IDENTITY,
    url: '/interior/passport',
    fee: { standard: '$80', expedited: '$150', childUnder16: '$60' },
    processingTime: { standard: '10-14 business days', expedited: '3-5 business days' },
    validFor: { adult: '10 years', minor: '5 years' },

    description: 'Application for a new Praya passport or passport renewal.',

    eligibility: [
      'Praya citizen (by birth or naturalization)',
      'Must have valid National ID',
      'No outstanding court orders preventing travel'
    ],

    requiredDocuments: [
      { name: 'National ID', note: 'Valid and current', required: true },
      { name: 'Passport Photos', note: '2 copies, 2x2 inches, white background', required: true },
      { name: 'Current Passport (for renewal)', note: 'Even if expired', required: false },
      { name: 'Birth Certificate', note: 'For first-time applicants', required: true },
      { name: 'Proof of Urgent Travel', note: 'For expedited service only', required: false },
      { name: 'Parental Consent', note: 'For minors under 18, signed by both parents', required: false }
    ],

    formFields: [
      { name: 'Full Legal Name', type: 'text', required: true, tip: 'As it should appear on passport' },
      { name: 'Previous Names', type: 'text', required: false, tip: 'Maiden name or former names' },
      { name: 'Date of Birth', type: 'date', required: true },
      { name: 'Place of Birth', type: 'text', required: true },
      { name: 'National ID Number', type: 'text', required: true },
      { name: 'Occupation', type: 'text', required: true },
      { name: 'Employer/School', type: 'text', required: false },
      { name: 'Travel Plans', type: 'textarea', required: false, tip: 'Optional but helps if expedited' },
      { name: 'Emergency Contact Abroad', type: 'contact', required: true }
    ],

    commonMistakes: [
      { mistake: 'Photos don\'t meet ICAO standards', fix: 'No glasses, neutral expression, ears visible, proper lighting' },
      { mistake: 'Applying with expired National ID', fix: 'Renew your National ID first or bring proof of pending renewal' },
      { mistake: 'Not enough blank pages in current passport', fix: 'Request additional pages or apply for new passport' },
      { mistake: 'Name change not reflected in ID', fix: 'Update National ID first, then apply for passport' },
      { mistake: 'Incomplete parental consent for minors', fix: 'Both parents must sign, or provide sole custody documentation' }
    ],

    stepByStep: [
      'Verify your National ID is valid and information is current',
      'Get passport photos that meet requirements (ICAO compliant)',
      'Complete PP-1 form online through PrayaPass or download PDF',
      'Schedule an in-person appointment (required for all passport applications)',
      'Bring all required documents to your appointment',
      'Pay fee and complete biometric capture',
      'Receive tracking number for status updates',
      'Collect passport in person or opt for secure mail delivery (+$15)'
    ],

    tips: [
      'Expedited service requires proof of travel within 14 days',
      'Book appointments early during peak travel seasons (summer, holidays)',
      'Check visa requirements for your destination before traveling',
      'Report lost passports immediately to prevent identity fraud'
    ],

    relatedForms: ['national-id-application', 'name-change-request']
  },

  // ===== TAX FORMS =====
  'individual-tax-return': {
    id: 'individual-tax-return',
    name: 'Individual Tax Return (Form 1040-PY)',
    department: 'revenue',
    category: FormCategory.TAXES,
    url: '/revenue/file',
    fee: 'Free (e-file for income under $75,000)',
    deadline: 'April 15 annually',

    description: 'Annual income tax return for individual Praya taxpayers.',

    eligibility: [
      'Income above $12,950 (single) or $25,900 (married filing jointly)',
      'Self-employed income over $400',
      'Praya citizen or resident with taxable income'
    ],

    requiredDocuments: [
      { name: 'W-2 Forms', note: 'From all employers', required: true },
      { name: '1099 Forms', note: 'Freelance/contract income, interest, dividends', required: false },
      { name: 'Previous Year Tax Return', note: 'For reference and carryover deductions', required: false },
      { name: 'Receipts for Deductions', note: 'Charitable donations, medical expenses, etc.', required: false },
      { name: 'Social Security Statement', note: 'If receiving benefits', required: false },
      { name: 'Bank Account Info', note: 'For direct deposit of refunds', required: false }
    ],

    formFields: [
      { name: 'Filing Status', type: 'select', required: true, options: ['Single', 'Married Filing Jointly', 'Married Filing Separately', 'Head of Household', 'Qualifying Widow(er)'] },
      { name: 'Total Income', type: 'currency', required: true },
      { name: 'Adjusted Gross Income', type: 'currency', required: true },
      { name: 'Standard/Itemized Deduction', type: 'select', required: true },
      { name: 'Tax Credits', type: 'currency', required: false },
      { name: 'Tax Withheld', type: 'currency', required: true },
      { name: 'Estimated Payments', type: 'currency', required: false },
      { name: 'Refund or Amount Owed', type: 'currency', required: true }
    ],

    commonMistakes: [
      { mistake: 'Wrong filing status', fix: 'Review eligibility for each status; Head of Household requires dependents' },
      { mistake: 'Missing W-2 income', fix: 'Wait for all W-2s; employers must mail by January 31' },
      { mistake: 'Math errors', fix: 'Use e-file software which calculates automatically' },
      { mistake: 'Forgetting to sign', fix: 'Electronic signature required for e-file; manual signature for paper' },
      { mistake: 'Not reporting all 1099 income', fix: 'RD receives copies; unreported income triggers audits' },
      { mistake: 'Missing quarterly estimated payments', fix: 'Self-employed must make quarterly payments to avoid penalties' }
    ],

    stepByStep: [
      'Gather all income documents (W-2s, 1099s) by early February',
      'Log into PrayaPass and access the Revenue Department portal',
      'Select "File Individual Return" and choose tax year',
      'Import W-2s electronically or enter manually',
      'Enter additional income (1099s, investments, rental)',
      'Choose standard deduction or itemize if beneficial',
      'Apply eligible tax credits (child tax credit, education, etc.)',
      'Review return for accuracy and completeness',
      'Submit and receive confirmation number',
      'Track refund status online (21 days average for e-file)'
    ],

    tips: [
      'E-file is faster and has fewer errors than paper filing',
      'Standard deduction in 2024: $13,850 (single), $27,700 (married joint)',
      'Keep records for 7 years in case of audit',
      'Request extension by April 15 if needed (Form 4868-PY)',
      'Free filing assistance available for incomes under $75,000'
    ],

    deductions: {
      standard: { single: '$13,850', marriedJoint: '$27,700', headOfHousehold: '$20,800' },
      itemizable: [
        'Mortgage interest (up to $750,000 loan)',
        'State/local taxes (up to $10,000)',
        'Charitable donations',
        'Medical expenses (over 7.5% of AGI)',
        'Student loan interest (up to $2,500)'
      ]
    },

    relatedForms: ['tax-payment-voucher', 'estimated-tax-payment', 'tax-extension-request']
  },

  // ===== TRANSPORT FORMS =====
  'driver-license-application': {
    id: 'driver-license-application',
    name: 'Driver License Application (DL-1)',
    department: 'transport',
    category: FormCategory.TRANSPORT,
    url: '/transport/license',
    fee: { new: '$45', renewal: '$30', replacement: '$25' },
    processingTime: '5-7 business days after testing',
    validFor: '5 years',

    description: 'Application for new driver license, renewal, or replacement.',

    eligibility: [
      'At least 16 years old (with parental consent) or 18+ for unrestricted',
      'Valid National ID or Passport',
      'Pass vision, written, and road tests (new applicants)',
      'No suspended or revoked licenses'
    ],

    requiredDocuments: [
      { name: 'National ID or Passport', note: 'Valid and current', required: true },
      { name: 'Proof of Address', note: 'Within 90 days', required: true },
      { name: 'Learner Permit', note: 'For new license applicants', required: false },
      { name: 'Current License', note: 'For renewal or replacement', required: false },
      { name: 'Parental Consent', note: 'For applicants 16-17 years old', required: false },
      { name: 'Vision Test Results', note: 'Can be done at TD office', required: true },
      { name: 'Proof of Insurance', note: 'For road test', required: true }
    ],

    formFields: [
      { name: 'Full Legal Name', type: 'text', required: true },
      { name: 'Date of Birth', type: 'date', required: true },
      { name: 'National ID Number', type: 'text', required: true },
      { name: 'Current Address', type: 'address', required: true },
      { name: 'License Class', type: 'select', required: true, options: ['Class A (Standard)', 'Class B (Commercial)', 'Class C (Motorcycle)', 'Class D (Heavy Vehicle)'] },
      { name: 'Organ Donor', type: 'checkbox', required: false, tip: 'Optional but encouraged' },
      { name: 'Restrictions/Accommodations', type: 'text', required: false, tip: 'Corrective lenses, hand controls, etc.' },
      { name: 'Medical Conditions', type: 'textarea', required: false, tip: 'Conditions affecting driving ability' }
    ],

    commonMistakes: [
      { mistake: 'Failing to bring required documents', fix: 'Check checklist before appointment; all docs must be originals' },
      { mistake: 'Expired proof of address', fix: 'Document must be dated within 90 days' },
      { mistake: 'Not practicing parallel parking', fix: 'Practice in the actual test vehicle; most common fail point' },
      { mistake: 'Forgetting to check mirrors', fix: 'Exaggerate mirror checks during test; examiners must see it' },
      { mistake: 'No vehicle for road test', fix: 'Bring a registered, insured vehicle or schedule TD vehicle (+$20)' }
    ],

    stepByStep: [
      'Study the Driver Handbook (free PDF on Transport Department site)',
      'Apply for Learner Permit if new driver',
      'Complete required practice hours (50 hours, 10 at night)',
      'Schedule written test online or walk-in',
      'Pass written test (70% required)',
      'Schedule road test (2-week minimum wait after written)',
      'Pass road test and vision screening',
      'Pay fee and receive temporary license',
      'Permanent license mailed within 5-7 days'
    ],

    testInfo: {
      written: { questions: 40, passingScore: '70% (28 correct)', timeLimit: '45 minutes' },
      road: { duration: '20-30 minutes', includes: ['Pre-drive checklist', 'City driving', 'Parallel parking', 'Three-point turn', 'Highway merge (varies)'] }
    },

    tips: [
      'Schedule road test early in the morning for less traffic',
      'Bring your own vehicle for road test - you\'ll be more comfortable',
      'Practice the exact route if possible (ask locals)',
      'Online renewal available if no changes to address/info'
    ],

    relatedForms: ['vehicle-registration', 'learner-permit-application']
  },

  // ===== POLICE FORMS =====
  'police-report-form': {
    id: 'police-report-form',
    name: 'Police Incident Report (NPA-101)',
    department: 'npa',
    category: FormCategory.POLICE,
    url: '/npa/report',
    fee: 'Free',
    processingTime: '24-48 hours for confirmation',

    description: 'Official form for reporting non-emergency crimes and incidents.',

    eligibility: [
      'Online filing: Thefts under $2,500, vandalism, lost property, identity fraud, vehicle accidents (no injuries)',
      'In-person only: Violent crimes, thefts over $2,500, crimes in progress'
    ],

    requiredDocuments: [
      { name: 'Valid ID', note: 'National ID or Passport', required: true },
      { name: 'Photos of Damage', note: 'If applicable', required: false },
      { name: 'Receipts/Proof of Value', note: 'For stolen items', required: false },
      { name: 'Witness Information', note: 'Names and contact details', required: false },
      { name: 'Insurance Information', note: 'For claims purposes', required: false }
    ],

    formFields: [
      { name: 'Incident Type', type: 'select', required: true, options: ['Theft', 'Vandalism', 'Lost Property', 'Identity Fraud', 'Vehicle Accident', 'Other'] },
      { name: 'Date of Incident', type: 'date', required: true },
      { name: 'Time of Incident', type: 'time', required: true, tip: 'Approximate if unknown' },
      { name: 'Location', type: 'address', required: true },
      { name: 'Description', type: 'textarea', required: true, tip: 'Be detailed: who, what, where, when, how' },
      { name: 'Stolen/Damaged Items', type: 'itemList', required: false },
      { name: 'Suspect Description', type: 'textarea', required: false },
      { name: 'Witness Information', type: 'contactList', required: false },
      { name: 'Evidence Uploaded', type: 'file', required: false }
    ],

    commonMistakes: [
      { mistake: 'Vague descriptions', fix: 'Include specific details: colors, sizes, serial numbers, distinguishing features' },
      { mistake: 'Inaccurate timeline', fix: 'Use your phone/email history to verify exact times' },
      { mistake: 'Forgetting to include serial numbers', fix: 'Check receipts, boxes, or registration for electronics' },
      { mistake: 'Not preserving evidence', fix: 'Don\'t clean up crime scene; photograph everything before touching' },
      { mistake: 'Delayed reporting', fix: 'Report as soon as possible; delays reduce investigation success' }
    ],

    stepByStep: [
      'If emergency, call 911 first - do not use online form',
      'Log into PrayaPass and navigate to NPA portal',
      'Select "File Online Report" and choose incident type',
      'Provide detailed description with all known facts',
      'List all stolen/damaged items with estimated values',
      'Upload photos or evidence if available',
      'Submit and save your case number (NPA-XXXXXX)',
      'Check email for confirmation within 24-48 hours',
      'Use case number to track status online'
    ],

    tips: [
      'You can add information to your report later using your case number',
      'Police may contact you for follow-up questions',
      'Request a copy of your report for insurance claims',
      'For vehicle accidents, exchange insurance info before filing'
    ],

    relatedForms: ['police-clearance-application', 'victim-compensation-claim']
  },

  'police-clearance-application': {
    id: 'police-clearance-application',
    name: 'Police Clearance Certificate Application (NPA-200)',
    department: 'npa',
    category: FormCategory.POLICE,
    url: '/npa/services',
    fee: '$20',
    processingTime: '3 business days',
    validFor: '6 months',

    description: 'Criminal background check certificate for employment, immigration, or licensing.',

    eligibility: [
      'Praya citizen or resident',
      'Valid National ID',
      'No outstanding warrants (will delay processing)'
    ],

    requiredDocuments: [
      { name: 'National ID', note: 'Valid and current', required: true },
      { name: 'Passport Photo', note: '1 copy, 2x2 inches', required: true },
      { name: 'Completed Application Form', note: 'NPA-200', required: true },
      { name: 'Purpose Letter', note: 'From employer, embassy, or licensing body', required: false }
    ],

    formFields: [
      { name: 'Full Legal Name', type: 'text', required: true },
      { name: 'Previous Names/Aliases', type: 'text', required: false },
      { name: 'Date of Birth', type: 'date', required: true },
      { name: 'Place of Birth', type: 'text', required: true },
      { name: 'National ID Number', type: 'text', required: true },
      { name: 'Purpose of Certificate', type: 'select', required: true, options: ['Employment', 'Immigration/Visa', 'Professional License', 'Adoption', 'Other'] },
      { name: 'Destination Country', type: 'text', required: false, tip: 'If for immigration' },
      { name: 'Number of Copies', type: 'number', required: true, tip: 'Additional copies $5 each' }
    ],

    commonMistakes: [
      { mistake: 'Not listing all previous names', fix: 'Include maiden name, aliases, or any legal name changes' },
      { mistake: 'Wrong purpose selection', fix: 'Check with requesting organization for correct category' },
      { mistake: 'Insufficient copies', fix: 'Order extra copies upfront; ordering later takes full 3 days again' }
    ],

    stepByStep: [
      'Apply online through PrayaPass or visit NPA office',
      'Complete form NPA-200 with accurate information',
      'Upload or provide passport photo',
      'Pay $20 fee (+$5 per additional copy)',
      'Submit fingerprints (online uses previous biometrics; in-person requires new scan)',
      'Receive confirmation and tracking number',
      'Collect certificate in 3 business days (pickup or mail +$5)'
    ],

    tips: [
      'Some countries require apostille certification - add 2-3 days',
      'Express service available for $40 (24-hour processing)',
      'Digital certificates available for domestic employment verification',
      'Certificate is valid for 6 months from issue date'
    ],

    relatedForms: ['national-id-application', 'passport-application']
  },

  // ===== HEALTH FORMS =====
  'health-insurance-enrollment': {
    id: 'health-insurance-enrollment',
    name: 'National Health Insurance Enrollment (HD-100)',
    department: 'health',
    category: FormCategory.HEALTH,
    url: '/health/insurance',
    fee: 'Premiums vary by plan and income',
    enrollmentPeriod: 'November 1 - December 31 (annual)',

    description: 'Enrollment form for National Health Insurance coverage.',

    eligibility: [
      'Praya citizen or legal resident',
      'Not covered by employer-sponsored insurance',
      'Income verification required for subsidies'
    ],

    requiredDocuments: [
      { name: 'National ID', note: 'Valid', required: true },
      { name: 'Proof of Income', note: 'Pay stubs, tax return, or benefits statement', required: true },
      { name: 'Proof of Residence', note: 'Within 90 days', required: true },
      { name: 'Current Insurance Info', note: 'If switching plans', required: false },
      { name: 'Family Member IDs', note: 'For family enrollment', required: false }
    ],

    formFields: [
      { name: 'Enrollment Type', type: 'select', required: true, options: ['Individual', 'Individual + Spouse', 'Family', 'Family + Dependents'] },
      { name: 'Plan Selection', type: 'select', required: true, options: ['Standard Plan', 'Premium Plan'] },
      { name: 'Annual Household Income', type: 'currency', required: true },
      { name: 'Primary Care Physician', type: 'text', required: false },
      { name: 'Current Medications', type: 'textarea', required: false },
      { name: 'Pre-existing Conditions', type: 'textarea', required: false, tip: 'Cannot be denied coverage' },
      { name: 'Payment Method', type: 'select', required: true, options: ['Monthly Auto-Pay', 'Quarterly', 'Annual'] }
    ],

    planInfo: {
      standard: {
        name: 'Standard Plan',
        premium: '$50-$350/month (income-based)',
        deductible: '$2,500/year',
        coverage: '70% after deductible',
        includes: ['Preventive care', 'Emergency services', 'Hospitalization', 'Prescription drugs (formulary)']
      },
      premium: {
        name: 'Premium Plan',
        premium: '$180-$520/month (income-based)',
        deductible: '$500/year',
        coverage: '90% after deductible',
        includes: ['All Standard benefits', 'Specialist visits', 'Mental health', 'Dental & vision', 'Alternative medicine']
      }
    },

    commonMistakes: [
      { mistake: 'Missing open enrollment period', fix: 'Special enrollment available for life events (job loss, marriage, birth)' },
      { mistake: 'Underestimating income', fix: 'Accurate reporting prevents subsidy repayment at tax time' },
      { mistake: 'Not listing all household members', fix: 'Include all dependents for accurate premium calculation' },
      { mistake: 'Choosing wrong plan for needs', fix: 'Compare total costs including premiums, deductibles, and typical usage' }
    ],

    stepByStep: [
      'Review plan options on Health Department portal',
      'Calculate estimated costs using the premium calculator',
      'Gather income documentation',
      'Complete HD-100 form online during open enrollment',
      'Select your plan and primary care physician',
      'Set up payment method',
      'Submit and receive confirmation',
      'Coverage begins January 1 (or first of month after special enrollment)'
    ],

    tips: [
      'Use the online calculator to compare Standard vs Premium total costs',
      'Low-income applicants may qualify for $0 premium plans',
      'Life events (marriage, birth, job loss) qualify for special enrollment',
      'Preventive care is free on all plans - use it!'
    ],

    relatedForms: ['vaccination-schedule', 'provider-change-request']
  },

  // ===== HOUSING FORMS =====
  'housing-application': {
    id: 'housing-application',
    name: 'Public Housing Application (HA-100)',
    department: 'housing',
    category: FormCategory.HOUSING,
    url: '/housing/apply',
    fee: 'Free',
    processingTime: 'Waitlist varies by region',

    description: 'Application for public housing or rental assistance programs.',

    eligibility: [
      'Praya citizen or legal resident',
      'Household income below area median income thresholds',
      'No previous evictions from public housing',
      'Pass background check'
    ],

    requiredDocuments: [
      { name: 'National ID', note: 'For all adult household members', required: true },
      { name: 'Proof of Income', note: 'Last 3 months pay stubs, tax returns, or benefits', required: true },
      { name: 'Birth Certificates', note: 'For all children in household', required: true },
      { name: 'Current Lease', note: 'If applicable', required: false },
      { name: 'Eviction History', note: 'Must disclose any evictions', required: true },
      { name: 'Bank Statements', note: 'Last 3 months', required: true }
    ],

    formFields: [
      { name: 'Household Size', type: 'number', required: true },
      { name: 'All Household Members', type: 'personList', required: true },
      { name: 'Total Household Income', type: 'currency', required: true },
      { name: 'Current Housing Situation', type: 'select', required: true, options: ['Renting', 'Homeless', 'Living with Family', 'Other'] },
      { name: 'Preferred Locations', type: 'multiSelect', required: true },
      { name: 'Accessibility Needs', type: 'checkbox', required: false },
      { name: 'Emergency Priority', type: 'checkbox', required: false, tip: 'Homeless, domestic violence, or uninhabitable conditions' }
    ],

    incomeThresholds: {
      veryLow: '50% of Area Median Income (AMI)',
      low: '80% of Area Median Income (AMI)',
      example: 'Family of 4: Very Low = $42,000, Low = $67,200'
    },

    commonMistakes: [
      { mistake: 'Incomplete household information', fix: 'List ALL people who will live in the unit, including children' },
      { mistake: 'Unreported income', fix: 'Include all income sources: wages, benefits, child support, etc.' },
      { mistake: 'Not updating contact info', fix: 'Maintain current phone/email; missed contact = removed from waitlist' },
      { mistake: 'Missing annual recertification', fix: 'Respond to annual income verification within 30 days' }
    ],

    stepByStep: [
      'Check income eligibility using online calculator',
      'Gather all required documents for household members',
      'Complete HA-100 form online through PrayaPass',
      'Select preferred housing locations (multiple increases chances)',
      'Submit application and receive confirmation number',
      'Complete in-person interview if contacted',
      'Await placement on waitlist (check status online)',
      'Respond promptly when housing becomes available'
    ],

    tips: [
      'Apply to multiple regions to increase chances',
      'Emergency situations may qualify for priority placement',
      'Keep all contact information updated',
      'Respond within 10 days to any Housing Authority correspondence'
    ],

    relatedForms: ['rental-assistance-application', 'tenant-rights-complaint']
  },

  // ===== BUSINESS FORMS =====
  'company-registration': {
    id: 'company-registration',
    name: 'Company Registration Form (CR-100)',
    department: 'cr',
    category: FormCategory.BUSINESS,
    url: '/cr/register',
    fee: { llc: '$200', corporation: '$300', dba: '$50' },
    processingTime: '3-5 business days',

    description: 'Register a new business entity in Praya.',

    eligibility: [
      'Praya citizen or legal resident',
      'At least 18 years old',
      'Unique business name (check availability first)',
      'Registered agent with Praya address'
    ],

    requiredDocuments: [
      { name: 'National ID', note: 'Of all owners/directors', required: true },
      { name: 'Articles of Incorporation', note: 'For corporations', required: false },
      { name: 'Operating Agreement', note: 'For LLCs', required: false },
      { name: 'Name Reservation Certificate', note: 'If name was reserved', required: false },
      { name: 'Registered Agent Consent', note: 'If using third-party agent', required: false }
    ],

    formFields: [
      { name: 'Business Name', type: 'text', required: true },
      { name: 'Entity Type', type: 'select', required: true, options: ['Sole Proprietorship', 'LLC', 'Corporation', 'Partnership', 'Non-Profit'] },
      { name: 'Business Purpose', type: 'textarea', required: true },
      { name: 'Business Address', type: 'address', required: true },
      { name: 'Registered Agent', type: 'contact', required: true },
      { name: 'Owners/Directors', type: 'personList', required: true },
      { name: 'Ownership Percentages', type: 'percentList', required: true },
      { name: 'Fiscal Year End', type: 'select', required: true, options: ['December 31', 'March 31', 'June 30', 'September 30'] }
    ],

    commonMistakes: [
      { mistake: 'Business name already taken', fix: 'Search name availability before applying' },
      { mistake: 'Wrong entity type for needs', fix: 'Consult with business advisor; LLC common for liability protection' },
      { mistake: 'Missing registered agent', fix: 'Must have physical Praya address; cannot be P.O. Box' },
      { mistake: 'Incomplete owner information', fix: 'All owners/directors need full legal names and addresses' }
    ],

    stepByStep: [
      'Search business name availability on CR portal',
      'Reserve name if desired ($25, valid 120 days)',
      'Choose appropriate entity type',
      'Prepare required documents (articles, operating agreement)',
      'Complete CR-100 form online',
      'Pay filing fee',
      'Receive Certificate of Formation (3-5 business days)',
      'Apply for Tax ID with Revenue Department',
      'Register for any required licenses/permits'
    ],

    tips: [
      'LLCs offer liability protection without corporate complexity',
      'Annual report required by anniversary date ($50 fee)',
      'Consider professional registered agent service ($100-200/year)',
      'Business bank account requires Certificate of Formation'
    ],

    relatedForms: ['tax-id-application', 'business-license-application']
  }
};

/**
 * Get form by ID
 */
export function getFormById(formId) {
  return formDatabase[formId] || null;
}

/**
 * Get forms by department
 */
export function getFormsByDepartment(departmentId) {
  return Object.values(formDatabase).filter(form => form.department === departmentId);
}

/**
 * Get forms by category
 */
export function getFormsByCategory(category) {
  return Object.values(formDatabase).filter(form => form.category === category);
}

/**
 * Search forms by keyword
 */
export function searchForms(query) {
  const queryLower = query.toLowerCase();
  const results = [];

  for (const form of Object.values(formDatabase)) {
    const searchableText = [
      form.name,
      form.description,
      ...(form.eligibility || []),
      ...(form.requiredDocuments?.map(d => d.name) || [])
    ].join(' ').toLowerCase();

    if (searchableText.includes(queryLower)) {
      results.push(form);
    }
  }

  return results;
}

/**
 * Get common mistakes for a form
 */
export function getCommonMistakes(formId) {
  const form = formDatabase[formId];
  return form?.commonMistakes || [];
}

/**
 * Get step-by-step guide for a form
 */
export function getStepByStepGuide(formId) {
  const form = formDatabase[formId];
  return form?.stepByStep || [];
}

/**
 * Get required documents checklist
 */
export function getDocumentChecklist(formId) {
  const form = formDatabase[formId];
  return form?.requiredDocuments || [];
}

/**
 * Generate form summary for chatbot
 */
export function generateFormSummary(formId) {
  const form = formDatabase[formId];
  if (!form) return null;

  let summary = `**${form.name}**\n\n`;
  summary += `${form.description}\n\n`;

  if (form.fee) {
    if (typeof form.fee === 'string') {
      summary += `**Fee:** ${form.fee}\n`;
    } else {
      summary += `**Fees:** ${Object.entries(form.fee).map(([k, v]) => `${k}: ${v}`).join(', ')}\n`;
    }
  }

  if (form.processingTime) {
    if (typeof form.processingTime === 'string') {
      summary += `**Processing Time:** ${form.processingTime}\n`;
    } else {
      summary += `**Processing Time:** ${Object.entries(form.processingTime).map(([k, v]) => `${k}: ${v}`).join(', ')}\n`;
    }
  }

  if (form.url) {
    summary += `\n**Apply Online:** [${form.name}](${form.url})\n`;
  }

  return summary;
}

/**
 * Generate detailed form help
 */
export function generateFormHelp(formId, section = 'all') {
  const form = formDatabase[formId];
  if (!form) return null;

  let help = `**${form.name}**\n\n`;

  if (section === 'all' || section === 'overview') {
    help += `${form.description}\n\n`;
  }

  if (section === 'all' || section === 'requirements') {
    if (form.requiredDocuments?.length > 0) {
      help += `**Required Documents:**\n`;
      form.requiredDocuments.forEach(doc => {
        const required = doc.required ? '(Required)' : '(If applicable)';
        help += `- ${doc.name} ${required}${doc.note ? ` - ${doc.note}` : ''}\n`;
      });
      help += '\n';
    }
  }

  if (section === 'all' || section === 'steps') {
    if (form.stepByStep?.length > 0) {
      help += `**Step-by-Step Process:**\n`;
      form.stepByStep.forEach((step, i) => {
        help += `${i + 1}. ${step}\n`;
      });
      help += '\n';
    }
  }

  if (section === 'all' || section === 'mistakes') {
    if (form.commonMistakes?.length > 0) {
      help += `**Common Mistakes to Avoid:**\n`;
      form.commonMistakes.forEach(m => {
        help += `- **${m.mistake}**: ${m.fix}\n`;
      });
      help += '\n';
    }
  }

  if (section === 'all' || section === 'tips') {
    if (form.tips?.length > 0) {
      help += `**Pro Tips:**\n`;
      form.tips.forEach(tip => {
        help += `- ${tip}\n`;
      });
    }
  }

  return help;
}

/**
 * Get all form names for semantic matching
 */
export function getAllFormEntries() {
  return Object.values(formDatabase).map(form => ({
    id: form.id,
    title: form.name,
    keywords: [
      form.name.toLowerCase(),
      form.department,
      form.category,
      ...form.name.split(/[\s-()]+/).filter(w => w.length > 2),
      ...(form.requiredDocuments?.map(d => d.name.toLowerCase()) || [])
    ],
    summary: form.description,
    response: generateFormSummary(form.id)
  }));
}

export default formDatabase;
