// Department page crawler for knowledge base expansion
// This extracts information from each department HTML page
// Enhanced with detailed page content, URLs, and sub-pages for AI agent navigation

export const departmentData = [
  {
    id: 'npa',
    name: 'National Police Agency',
    abbrev: 'NPA',
    url: '/npa',
    keywords: ['police', 'crime', 'report', 'emergency', 'npa', 'law enforcement', 'theft', 'accident', '911', 'background check', 'clearance', 'firearm', 'licensing', 'safety'],
    description: 'National policing, emergency response, and community safety services across Praya.',
    services: [
      'Emergency Response - Dial 911 for life-threatening incidents, crimes in progress, missing children',
      'Non-emergency line: 311',
      'Online crime reporting for thefts under ¤2,500, vandalism, lost property, identity fraud',
      'Police Clearance Certificates - 3 business day processing, covers criminal history, open warrants',
      'Firearm Licensing - requires safety training, secure storage proof, biometric background checks',
      'Traffic Safety - collision reports, citations, commercial vehicle inspections',
      'Neighborhood Watch Programs',
      'Victim Assistance - counseling, restitution advocates, protective order coordinators',
      'Community Programs - school safety officers, patrol briefings'
    ],
    subPages: [
      { name: 'File Police Report', url: '/npa/report', description: 'Submit non-emergency reports online for theft under ¤2,500, lost property, vandalism, vehicle accidents with no injuries' },
      { name: 'Police Services', url: '/npa/services', description: 'Access police clearances, case lookups, and community programs' },
      { name: 'Public Safety', url: '/npa/safety', description: 'Safety tips, crime prevention resources, and community awareness programs' }
    ],
    statistics: {
      responseTime: '4.2min average',
      crimeRate: '-12% vs Last Year',
      casesSolved: '87% this year',
      officers: '3,421 active duty'
    },
    hours: 'Walk-in stations: 08:00-18:00 daily. Emergency dispatch: 24/7',
    contact: 'Emergency: 911 | Non-emergency: 311 | HQ: +854 200 0000 | Anonymous Tips: 1-800-CRIME-TIP',
    responseInfo: 'Average Priority 1 response: 7m 42s. Priority system ensures resources based on threat to life.'
  },
  {
    id: 'bop',
    name: 'Bank of Praya',
    abbrev: 'BOP',
    url: '/bop',
    keywords: ['bank', 'banking', 'account', 'loan', 'bop', 'savings', 'currency', 'praya dollar', '¤', 'mortgage', 'financial', 'central bank', 'monetary'],
    description: 'Central bank responsible for monetary policy, financial stability, and banking supervision.',
    services: [
      'Personal Banking - savings accounts, checking accounts, online banking',
      'Business Loans and Mortgages - schedule appointment with financial advisor',
      'Currency Services - official currency is the Praya Dollar (¤)',
      'Banking Supervision',
      'Monetary Policy',
      'Economic Research and Analysis'
    ],
    subPages: [
      { name: 'Personal Banking', url: '/bop/personal', description: 'Savings accounts, checking accounts, and personal financial services' },
      { name: 'Business Banking', url: '/bop/business', description: 'Business loans, mortgages, and commercial banking services' },
      { name: 'Currency Exchange', url: '/bop/exchange', description: 'Currency exchange services and rates' }
    ],
    hours: 'Branch hours vary by location. Online banking available 24/7',
    contact: 'Main branch and customer service information available on BOP portal'
  },
  {
    id: 'ctb',
    name: 'Cannabis Tax Bureau',
    abbrev: 'CTB',
    url: '/ctb',
    keywords: ['cannabis', 'marijuana', 'ctb', 'cannabis tax', 'cannabis license', 'dispensary', 'cultivation', 'retail', 'medical cannabis', 'recreational'],
    description: 'Licensing, taxation, and regulation of cannabis industry in the Republic of Praya.',
    services: [
      'Dispensary Licensing - new applications and renewals',
      'Cultivation Permits - commercial and personal grow licenses',
      'Monthly Tax Returns - file online for license holders',
      'Compliance Audits and Inspections',
      'Cannabis Business Registration',
      'Product Testing and Quality Standards',
      'Industry Research and Statistics'
    ],
    subPages: [
      { name: 'Apply for License', url: '/ctb/apply', description: 'Apply for dispensary, cultivation, or processing licenses' },
      { name: 'Tax Filing', url: '/ctb/taxes', description: 'File monthly cannabis tax returns online' },
      { name: 'Compliance', url: '/ctb/compliance', description: 'Compliance requirements, audits, and inspections information' }
    ],
    hours: 'Office hours: Mon-Fri 8AM-5PM. Online services available 24/7',
    contact: 'CTB hotline available during business hours. Apply online via CTB portal'
  },
  {
    id: 'doj',
    name: 'Department of Justice',
    abbrev: 'DOJ',
    url: '/doj',
    keywords: ['court', 'legal', 'lawsuit', 'attorney', 'lawyer', 'doj', 'justice', 'case', 'trial', 'prosecutor', 'public defender', 'lawsuit', 'litigation'],
    description: 'Court system, prosecution services, and legal resources for citizens of Praya.',
    services: [
      'Court Services - criminal and civil proceedings',
      'Case Lookup Tool - track case status and court schedules online',
      'Legal Aid Services - Public Defender\'s Office for qualified individuals',
      'Court Filings - electronic and in-person filing available',
      'Prosecution Services',
      'Criminal Code Information and Resources'
    ],
    subPages: [
      { name: 'Case Lookup', url: '/doj/lookup', description: 'Track case status and court schedules online' },
      { name: 'Legal Aid', url: '/doj/legal-aid', description: 'Public Defender services and civil legal aid for qualified individuals' },
      { name: 'Court Filings', url: '/doj/filings', description: 'Electronic and in-person court filing information' }
    ],
    hours: 'Court hours: Mon-Fri 8AM-5PM. Case lookup available 24/7 online',
    contact: 'DOJ main office and courthouse locations available on DOJ portal'
  },
  {
    id: 'interior',
    name: 'Interior Department',
    abbrev: 'ID',
    url: '/interior',
    keywords: ['id', 'identification', 'passport', 'driver license', 'drivers license', 'birth certificate', 'documents', 'national id', 'interior', 'civil records', 'land registry', 'building permit'],
    description: 'Land registry, building permits, civil records, and parks management.',
    services: [
      'National IDs - apply or renew online or in-person, 5-7 day processing',
      'Passports - 10-14 day processing time',
      'Birth Certificates - 3-5 day processing',
      'Driver Licensing - handled by Transport Department',
      'Land Registry Services',
      'Building Permits and Inspections',
      'Civil Records - marriage licenses, death certificates',
      'Parks and Nature Reserves Management'
    ],
    subPages: [
      { name: 'National ID', url: '/interior/id', description: 'Apply for or renew your National ID card. Fee: ¤25 new, ¤15 renewal. Processing: 5-7 days.' },
      { name: 'Passport Services', url: '/interior/passport', description: 'Apply for passport. Standard: ¤80, 10-14 days. Expedited: ¤150, 3-5 days.' },
      { name: 'Birth Certificates', url: '/interior/birth', description: 'Request certified copies or register a birth. Fee: ¤10. Processing: 3-5 days.' },
      { name: 'Civil Records', url: '/interior/records', description: 'Marriage licenses, death certificates, and other civil documents' }
    ],
    fees: {
      nationalId: { new: '¤25', renewal: '¤15', processing: '5-7 business days' },
      passport: { standard: '¤80', expedited: '¤150', standardProcessing: '10-14 days', expeditedProcessing: '3-5 days' },
      birthCertificate: { fee: '¤10', processing: '3-5 business days' }
    },
    hours: 'Mon-Fri 8AM-5PM. PrayaPass account required for online services',
    contact: 'Visit any Interior Department office with valid ID'
  },
  {
    id: 'transport',
    name: 'Transport Department',
    abbrev: 'TD',
    url: '/transport',
    keywords: ['transport', 'driver', 'license', 'driving', 'vehicle', 'registration', 'dmv', 'car', 'highway', 'road', 'traffic'],
    description: 'Driver licensing, vehicle registration, and management of national highways.',
    services: [
      'Driver Licensing - new licenses, renewals, and tests',
      'Vehicle Registration - cars, motorcycles, commercial vehicles',
      'National Highways Maintenance',
      'Road Safety Programs and Education',
      'Commercial Driver Licensing (CDL)',
      'Vehicle Inspections'
    ],
    subPages: [
      { name: 'Driver License', url: '/transport/license', description: 'Apply for new license, renew, or schedule driving tests. Fee: ¤45 new, ¤30 renewal.' },
      { name: 'Vehicle Registration', url: '/transport/registration', description: 'Register vehicles, renew registration, or transfer titles' },
      { name: 'Schedule Test', url: '/transport/test', description: 'Schedule written or road tests for driver licensing' }
    ],
    fees: {
      driverLicense: { new: '¤45', renewal: '¤30', replacement: '¤25', valid: '5 years' },
      vehicleRegistration: { annual: 'varies by vehicle type' }
    },
    hours: 'Mon-Fri 8AM-5PM, Sat 9AM-1PM select locations',
    contact: 'Book appointments online or visit walk-in centers'
  },
  {
    id: 'revenue',
    name: 'Revenue Department',
    abbrev: 'RD',
    url: '/revenue',
    keywords: ['tax', 'taxes', 'pay tax', 'file tax', 'revenue', 'income tax', 'business tax', 'tax return', 'refund', 'irs'],
    description: 'Tax collection, benefits, and financial services for individuals and businesses.',
    services: [
      'Individual Tax Filing - file online through PrayaPass account',
      'Business Tax Accounts and Filing',
      'Tax Benefits and Credits',
      'Compliance Support and Audits',
      'Tax Payment Plans',
      'Refund Status Tracking'
    ],
    subPages: [
      { name: 'File Taxes', url: '/revenue/file', description: 'File individual or business tax returns online. Free e-file for incomes under ¤75,000.' },
      { name: 'Make Payment', url: '/revenue/payment', description: 'Pay taxes online, set up payment plans, or manage your account' },
      { name: 'Refund Status', url: '/revenue/refunds', description: 'Track refund status and update direct deposit information' }
    ],
    statistics: {
      returnsFiled: '2.8M this year',
      eFileRate: '87% online filing',
      avgRefund: '¤2,840 per return',
      processingTime: '21 days e-file average'
    },
    taxInfo: {
      deadline: 'April 15 annually',
      freeFileThreshold: '¤75,000 AGI',
      standardDeduction: { single: '¤13,850', marriedJoint: '¤27,700', headOfHousehold: '¤20,800' },
      helpLine: '1-800-TAX-HELP'
    },
    hours: 'Office hours: Mon-Fri 8AM-5PM. Online filing available 24/7',
    contact: 'Phone: 1-800-TAX-HELP | Email: help@revenue.gov.py | Visit RD offices or access services through PrayaPass portal'
  },
  {
    id: 'post',
    name: 'Praya Post',
    abbrev: 'PP',
    url: '/post',
    keywords: ['mail', 'post', 'package', 'shipping', 'postal', 'letter', 'delivery', 'postage', 'mailbox', 'p.o. box', 'tracking'],
    description: 'National postal service providing domestic and international mail and package delivery.',
    services: [
      'Package Delivery - domestic and international',
      'International Mail Services',
      'Express Shipping Options',
      'P.O. Box Rentals',
      'Package Tracking Online',
      'Bulk Mailing for Businesses',
      'Certified and Registered Mail'
    ],
    subPages: [
      { name: 'Track Package', url: '/post/track', description: 'Track your package using the tracking number (format: PP followed by numbers)' },
      { name: 'Ship Package', url: '/post/ship', description: 'Calculate shipping rates and ship packages domestically or internationally' },
      { name: 'Find Location', url: '/post/locations', description: 'Find post office locations and hours near you' }
    ],
    hours: 'Mon-Fri 8AM-6PM, Sat 9AM-1PM. Closed Sundays',
    contact: 'Track packages online using tracking number. Visit local post office'
  },
  {
    id: 'health',
    name: 'Health Department',
    abbrev: 'HD',
    url: '/health',
    keywords: ['health', 'hospital', 'medical', 'doctor', 'insurance', 'clinic', 'healthcare', 'vaccination', 'public health', 'disease', 'health insurance'],
    description: 'Public health services, disease control, healthcare licensing, and health statistics.',
    services: [
      'Public Health Services and Programs',
      'Disease Control and Prevention',
      'Healthcare Licensing and Regulation',
      'National Health Insurance - enrollment and inquiries',
      'Vaccination Schedules and Immunization Clinics',
      'Public Health Advisories',
      'Health Statistics and Research',
      'Emergency Medical Services - Dial 911'
    ],
    subPages: [
      { name: 'Health Insurance', url: '/health/insurance', description: 'Enroll in National Health Insurance. Standard Plan ¤50-¤350/month, Premium Plan ¤180-¤520/month based on income.' },
      { name: 'Vaccinations', url: '/health/vaccinations', description: 'View vaccination records, schedule immunizations, find clinic locations' },
      { name: 'Find Provider', url: '/health/providers', description: 'Search for doctors, specialists, hospitals, and clinics in your area' },
      { name: 'Health Alerts', url: '/health/alerts', description: 'Public health advisories, disease outbreaks, and safety recommendations' }
    ],
    statistics: {
      insuredCitizens: '94.2% coverage rate',
      healthcareFacilities: '1,247 nationwide',
      lifeExpectancy: '81.3 years average',
      vaccinationRate: '89% full coverage'
    },
    insuranceInfo: {
      standardPlan: '¤50-¤350/month based on income',
      premiumPlan: '¤180-¤520/month based on income',
      openEnrollment: 'November 1 - December 31',
      coverageStart: 'January 1'
    },
    hours: 'Office hours: Mon-Fri 8AM-5PM. Emergency: 911 24/7',
    contact: 'Health Info: 1-800-HEALTH-PY | Crisis Line: 988 | Poison Control: 1-800-POISON | Emergency: 911'
  },
  {
    id: 'housing',
    name: 'Housing Authority',
    abbrev: 'HA',
    url: '/housing',
    keywords: ['housing', 'rent', 'apartment', 'home', 'property', 'landlord', 'tenant', 'public housing', 'rental assistance', 'eviction', 'affordable housing'],
    description: 'Affordable public housing programs and subsidized rental assistance for eligible citizens.',
    services: [
      'Public Housing Applications - apply online through PrayaPass',
      'Eligibility Check - income-based qualifications',
      'Rental Assistance Programs',
      'Tenant Rights Information',
      'Landlord Regulations and Compliance',
      'Eviction Protection Resources',
      'Waitlist Status - check via PrayaPass account',
      'Regional Housing Availability'
    ],
    subPages: [
      { name: 'Apply for Housing', url: '/housing/apply', description: 'Apply for public housing or rental assistance programs' },
      { name: 'Check Eligibility', url: '/housing/eligibility', description: 'Check income-based eligibility requirements for housing programs' },
      { name: 'Tenant Rights', url: '/housing/rights', description: 'Information about tenant rights, eviction protection, and landlord disputes' },
      { name: 'Waitlist Status', url: '/housing/waitlist', description: 'Check your position on housing waitlists' }
    ],
    hours: 'Mon-Fri 8AM-5PM. Online applications accepted 24/7',
    contact: 'Visit Housing Authority office or check status via PrayaPass'
  },
  {
    id: 'cbca',
    name: 'Customs and Border Control Agency',
    abbrev: 'CBCA',
    url: '/cbca',
    keywords: ['customs', 'border', 'import', 'export', 'cbca', 'shipping', 'travel', 'duty', 'tariff', 'international shipping', 'visa'],
    description: 'Import/export regulations, border control, and customs enforcement.',
    services: [
      'Import/Export Permits - apply online through CBCA portal',
      'Border Control and Immigration',
      'Customs Declarations and Duties',
      'Duty-Free Allowances Information',
      'Prohibited and Restricted Items Lists',
      'Travel Entry Requirements',
      'Commercial Shipping Clearance',
      'Customs Compliance and Enforcement'
    ],
    subPages: [
      { name: 'Import/Export', url: '/cbca/permits', description: 'Apply for import or export permits, view tariff information' },
      { name: 'Travel Requirements', url: '/cbca/travel', description: 'Entry requirements, visa information, and what to declare' },
      { name: 'Prohibited Items', url: '/cbca/prohibited', description: 'List of items prohibited or restricted from import/export' }
    ],
    hours: 'Border crossings: 24/7. Office hours: Mon-Fri 8AM-5PM',
    contact: 'Review entry requirements before travel. Apply for permits online'
  },
  {
    id: 'lc',
    name: 'Legislative Council',
    abbrev: 'LC',
    url: '/lc',
    keywords: ['legislative', 'law', 'bill', 'council', 'vote', 'representative', 'parliament', 'congress', 'legislation', 'lawmaker', 'elected'],
    description: 'Legislative body responsible for creating and passing laws.',
    services: [
      'Bill Tracking - view current legislation and status',
      'Voting Records - access representative voting history',
      'Contact Your Representative',
      'Public Hearings - schedule and attend public sessions',
      'Legislative Research and Archives',
      'Citizen Petitions',
      'Committee Information and Schedules'
    ],
    subPages: [
      { name: 'Bills & Legislation', url: '/lc/bills', description: 'Track current legislation, view bill status and history' },
      { name: 'Find Representative', url: '/lc/representatives', description: 'Find and contact your district representative' },
      { name: 'Voting Records', url: '/lc/voting', description: 'View representative voting history on legislation' },
      { name: 'Public Hearings', url: '/lc/hearings', description: 'Schedule of public hearings and how to attend' }
    ],
    hours: 'Public viewing hours: Mon-Fri 8AM-5PM. Session schedules vary',
    contact: 'Find your representative through LC portal'
  },
  {
    id: 'bd',
    name: 'Buildings Department',
    abbrev: 'BD',
    url: '/bd',
    keywords: ['building', 'construction', 'permit', 'inspection', 'contractor', 'building code', 'safety', 'architecture', 'renovation', 'development', 'structural'],
    description: 'Building permits, construction safety, inspections, and enforcement of building codes.',
    services: [
      'Building Permits - new construction and renovations',
      'Building Inspections - safety and code compliance',
      'Contractor Licensing',
      'Building Code Information',
      'Structural Safety Reviews',
      'Permit Status Tracking',
      'Construction Site Monitoring'
    ],
    subPages: [
      { name: 'Apply for Permit', url: '/bd/permits', description: 'Apply for building permits for new construction or renovations' },
      { name: 'Schedule Inspection', url: '/bd/inspections', description: 'Schedule building inspections for code compliance' },
      { name: 'Contractor License', url: '/bd/contractors', description: 'Apply for or verify contractor licenses' },
      { name: 'Building Codes', url: '/bd/codes', description: 'View building code requirements and regulations' }
    ],
    hours: 'Mon-Fri 8AM-5PM. Online permit applications available 24/7',
    contact: 'Visit Buildings Department office or submit applications online'
  },
  {
    id: 'cr',
    name: 'Companies Registry',
    abbrev: 'CR',
    url: '/cr',
    keywords: ['company', 'business', 'incorporation', 'register', 'corporate', 'llc', 'corporation', 'business registration', 'company search', 'annual filing', 'articles of incorporation'],
    description: 'Business incorporation, company registration, and corporate filing services.',
    services: [
      'Company Registration - incorporate new businesses',
      'Annual Filings - submit required corporate documents',
      'Company Search - lookup registered businesses',
      'Document Retrieval - access corporate records',
      'Name Reservation - reserve business names',
      'Business Entity Changes - amendments and updates',
      'Dissolution Services - wind up companies'
    ],
    subPages: [
      { name: 'Register Company', url: '/cr/register', description: 'Incorporate a new business or register a company' },
      { name: 'Company Search', url: '/cr/search', description: 'Look up registered businesses and access corporate records' },
      { name: 'Annual Filings', url: '/cr/filings', description: 'Submit required annual corporate documents' },
      { name: 'Name Reservation', url: '/cr/name', description: 'Reserve a business name before incorporation' }
    ],
    hours: 'Mon-Fri 8AM-5PM. Online registration available 24/7',
    contact: 'Register online or visit Companies Registry office'
  },
  {
    id: 'swd',
    name: 'Social Welfare Department',
    abbrev: 'SWD',
    url: '/swd',
    keywords: ['social', 'welfare', 'benefits', 'assistance', 'family', 'elderly', 'disability', 'support', 'care', 'subsidy', 'allowance', 'social services'],
    description: 'Social benefits, family services, elderly care, and support for vulnerable citizens.',
    services: [
      'Social Benefits - apply for financial assistance',
      'Family Services - family support programs',
      'Elderly Care - senior citizen programs',
      'Disability Support - services for disabled citizens',
      'Child Welfare Services',
      'Community Care Programs',
      'Emergency Assistance'
    ],
    subPages: [
      { name: 'Apply for Benefits', url: '/swd/benefits', description: 'Apply for social benefits and financial assistance' },
      { name: 'Family Services', url: '/swd/family', description: 'Family support programs and child welfare services' },
      { name: 'Elderly Care', url: '/swd/elderly', description: 'Senior citizen programs and elderly care services' },
      { name: 'Disability Support', url: '/swd/disability', description: 'Services and support for disabled citizens' }
    ],
    hours: 'Mon-Fri 8AM-5PM. Emergency services available 24/7',
    contact: 'Visit SWD office or call hotline for assistance'
  },
  {
    id: 'air-quality',
    name: 'Air Quality Monitoring',
    abbrev: 'AQI',
    url: '/air-quality',
    keywords: ['air', 'quality', 'aqi', 'pollution', 'pm2.5', 'pm10', 'ozone', 'pollutants', 'health', 'monitoring', 'alerts', 'respiratory', 'asthma', 'outdoor', 'mask', 'smog'],
    description: 'Real-time air quality monitoring and health guidance for all regions of Praya with 87 monitoring stations nationwide.',
    services: [
      'Real-time AQI Readings - Updated hourly across 87 monitoring stations',
      'Air Quality Scale Reference - Understand what AQI levels (0-500) mean for health',
      'Pollutant Information - PM2.5, PM10, Ozone, NO2, SO2, CO monitoring and health effects',
      'Regional Monitoring Network - Check air quality in all 6 regions of Praya',
      'Health Protection Tips - Masks, activity timing, outdoor worker guidance',
      'Alert System - Mobile app, SMS, email, and emergency broadcasts',
      'Historical Data - Air quality trends and annual statistics'
    ],
    subPages: [
      { name: 'Current AQI', url: '/air-quality#current', description: 'Check current AQI levels and regional status' },
      { name: 'Understanding Pollutants', url: '/air-quality#pollutants', description: 'Learn about PM2.5, PM10, Ozone, NO2, SO2, and CO' },
      { name: 'Health Protection Guide', url: '/air-quality#health', description: 'Tips for reducing air pollution exposure and protecting health' },
      { name: 'Alerts & Notifications', url: '/air-quality#alerts', description: 'Sign up for mobile, SMS, email, and emergency broadcasts' }
    ],
    statistics: {
      monitoringStations: 87,
      regionsMonitored: 6,
      goodDaysThisYear: 312,
      updateFrequency: 'Hourly'
    },
    aqiScale: {
      good: '0-50: Good - Air quality is satisfactory',
      moderate: '51-100: Moderate - Acceptable for most, sensitive groups may experience effects',
      unhealthySensitive: '101-150: Unhealthy for Sensitive Groups - Children, elderly, respiratory issues affected',
      unhealthy: '151-200: Unhealthy - Everyone may experience health effects',
      veryUnhealthy: '201-300: Very Unhealthy - Health warnings, everyone affected',
      hazardous: '301-500: Hazardous - Emergency conditions, stay indoors'
    },
    hours: 'Monitoring: 24/7 | Web Access: 24/7',
    contact: 'Air Quality Portal: gov.praya/air-quality | Mobile App: Praya Air (iOS/Android) | SMS Alerts: Text AQI to 311'
  },
  {
    id: 'national-security',
    name: 'National Security & Civil Defense',
    abbrev: 'NS',
    url: '/national-security',
    keywords: ['security', 'threat', 'level', 'emergency', 'civil defense', 'preparedness', 'shelter', 'alert', 'evacuation', '911', 'disaster', 'safety', 'critical', 'elevated', 'enhanced', 'guarded'],
    description: 'National Security Alert Level system and civil defense information for emergency preparedness and public safety.',
    services: [
      'National Security Level System - 5 threat levels with guidance (Critical to Low)',
      'Emergency Preparedness Kit Checklist - Essential supplies (water, food, first aid)',
      'Emergency Contacts Directory - 911, Civil Defense: 1-800-DEFEND, NPA: 1-800-NPA-HELP',
      'Public Shelter System - 247 locations accessible during Level 1-2 alerts',
      'Communication Planning - Out-of-area contacts, family meeting points, emergency alerts',
      'Alert Types - Natural Disaster, Security Threat, Public Health, Infrastructure',
      'Alert Channels - Emergency Alert System, Social Media, Emergency Radio (97.5 FM, 1240 AM)'
    ],
    subPages: [
      { name: 'Security Level Scale', url: '/national-security#levels', description: 'Understand Level 1 (Critical) through Level 5 (Low) and recommended actions' },
      { name: 'Preparedness Guide', url: '/national-security#preparedness', description: 'Emergency kit, contacts, shelters, and communication planning' },
      { name: 'Emergency Alerts', url: '/national-security#alerts', description: 'Types of alerts and how to receive notifications' },
      { name: 'Stay Informed', url: '/national-security#informed', description: 'Emergency Alert System, social media, and radio broadcasts' }
    ],
    securityLevels: {
      level1: 'Critical (Red) - Imminent threat, follow all emergency instructions immediately',
      level2: 'Elevated (Orange) - High threat, increased vigilance required, prepare to evacuate',
      level3: 'Enhanced (Yellow) - Significant threat, heightened awareness, review emergency plans',
      level4: 'Guarded (Blue) - General threat, standard precautions, stay informed',
      level5: 'Low (Green) - Minimal threat, routine security measures, normal activities'
    },
    statistics: {
      publicShelters: 247,
      alertChannels: 4,
      lastUpdate: 'Real-time monitoring'
    },
    hours: 'Monitoring: 24/7 | Civil Defense Hotline: 24/7',
    contact: 'Emergency: 911 | Civil Defense: 1-800-DEFEND | NPA: 1-800-NPA-HELP | Fire & Rescue: 1-800-FIRE-PY'
  }
];

// Profanity detection - common swear words and variations
const profanityPatterns = [
  /\bf+u+c+k+/i, /\bs+h+i+t+/i, /\ba+s+s+h+o+l+e+/i, /\bb+i+t+c+h+/i,
  /\bd+a+m+n+/i, /\bc+r+a+p+/i, /\bp+i+s+s+/i, /\bb+a+s+t+a+r+d+/i,
  /\bh+e+l+l+/i, /\bd+u+m+b+a+s+s+/i, /\bd+i+c+k+/i, /\bc+u+n+t+/i
];

// Check if text contains profanity
function containsProfanity(text) {
  return profanityPatterns.some(pattern => pattern.test(text));
}

// Check if text is unintelligible (gibberish)
function isUnintelligible(text) {
  const cleanText = text.toLowerCase().trim();

  // Very short messages (1-2 chars) that aren't common words
  if (cleanText.length <= 2 && !['hi', 'ok', 'no', 'id'].includes(cleanText)) {
    return true;
  }

  // Check for excessive repetition of characters (e.g., "aaaaaa", "hahahaha")
  if (/(.)\1{5,}/.test(cleanText)) {
    return true;
  }

  // Check for random keyboard mashing (low vowel ratio + short length)
  const vowels = (cleanText.match(/[aeiou]/g) || []).length;
  const consonants = (cleanText.match(/[bcdfghjklmnpqrstvwxyz]/g) || []).length;
  const totalLetters = vowels + consonants;

  if (totalLetters > 5 && vowels / totalLetters < 0.15) {
    return true;
  }

  // Check for strings of random characters with no spaces
  if (cleanText.length > 15 && !cleanText.includes(' ')) {
    const nonAlpha = (cleanText.match(/[^a-z0-9\s]/g) || []).length;
    if (nonAlpha / cleanText.length > 0.3) {
      return true;
    }
  }

  return false;
}

// Generate enhanced knowledge base entries from department data
export function generateKnowledgeBase() {
  const baseKnowledge = [
    // Greetings - expanded variations with natural responses
    {
      keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'greetings', 'howdy', 'sup', 'yo', 'hola', 'aloha', 'heya', 'hiya', 'whats up', "what's up", 'wassup', 'hi there', 'hey there', 'hello there', 'good day', 'g\'day'],
      response: "Hello! Welcome to Praya Citizen Services. I'm here to help you with any government service you need.\n\nPopular services:\n• **IDs & Passports** - Apply, renew, or replace\n• **Taxes** - File returns, make payments, check refunds\n• **Police Services** - Report crimes, get clearances\n• **Driver's License** - New, renewal, or tests\n\nWhat can I help you with today?"
    },
    // Goodbyes
    {
      keywords: ['bye', 'goodbye', 'good bye', 'see you', 'see ya', 'later', 'farewell', 'take care', 'cya', 'catch you later', 'gotta go', 'have to go', 'leaving', 'talk to you later', 'ttyl', 'peace', 'adios', 'ciao'],
      response: "Thank you for using Praya Citizen Services! If you need any assistance in the future, I'll be right here. Have a great day!"
    },
    // Apologies
    {
      keywords: ['sorry', 'apologize', 'my bad', 'my mistake', 'oops', 'excuse me', 'pardon', 'forgive me', 'apologies'],
      response: "No problem at all! Don't worry about it. How can I help you with government services today?"
    },
    // Thanks - expanded
    {
      keywords: ['thank', 'thanks', 'appreciate', 'thank you', 'thx', 'ty', 'tysm', 'thank u', 'much appreciated', 'grateful', 'gracias'],
      response: "You're welcome! Is there anything else I can help you with regarding government services?"
    },
    // Appreciation/Compliments
    {
      keywords: ['great', 'awesome', 'excellent', 'perfect', 'amazing', 'wonderful', 'fantastic', 'brilliant', 'helpful', 'you are good', 'youre good', 'good job', 'well done', 'nice', 'love it', 'love this'],
      response: "I'm glad I could help! That's what I'm here for. Is there anything else you'd like to know about government services?"
    },
    // Affirmations
    {
      keywords: ['yes', 'yeah', 'yep', 'yup', 'sure', 'ok', 'okay', 'alright', 'all right', 'sounds good', 'agreed', 'correct', 'right', 'uh huh', 'mhm'],
      response: "Great! What would you like to know more about? I can help with taxes, IDs, police services, healthcare, housing, postal services, and more."
    },
    // Negations
    {
      keywords: ['no', 'nope', 'nah', 'not really', 'no thanks', 'no thank you', "i'm good", 'im good', "that's all", 'thats all', 'nothing', 'nevermind', 'never mind'],
      response: "Alright! If you need anything later, just let me know. I'm here 24/7 to help with Praya government services."
    },
    // Confusion
    {
      keywords: ['confused', 'confusing', "don't understand", 'dont understand', 'unclear', 'what do you mean', 'huh', 'wdym', 'explain', 'clarify', "i don't get it", 'lost', 'not sure'],
      response: "I understand this can be confusing! Let me help clarify. Could you tell me specifically what service or information you're looking for? For example:\n• Getting an ID or passport\n• Filing taxes\n• Police services\n• Healthcare\n• Housing assistance\n\nWhat would you like to know more about?"
    },
    // Who/What are you
    {
      keywords: ['who are you', 'what are you', 'are you human', 'are you real', 'are you a bot', 'are you ai', 'chatbot', 'robot', 'your name', 'introduce yourself'],
      response: "I'm the Praya Citizen Services Assistant, an AI-powered chatbot designed to help you navigate government services! I can answer questions about taxes, IDs, police services, healthcare, housing, and more. While I'm not human, I'm here 24/7 to provide accurate information about Praya government services. How can I help you today?"
    },
    // How are you
    {
      keywords: ['how are you', 'how are you doing', 'how do you do', 'hows it going', "how's it going", 'how are things', 'whats new', "what's new", 'you good', 'you ok'],
      response: "I'm doing great, thank you for asking! I'm always ready to help citizens with government services. How can I assist you today?"
    },
    // Frustration
    {
      keywords: ['frustrated', 'frustrating', 'annoying', 'annoyed', 'irritated', 'mad', 'angry', 'this sucks', 'hate this', 'terrible', 'awful', 'worst', 'ugh'],
      response: "I understand your frustration, and I'm here to help make things easier. Government processes can be complex, but I'll do my best to guide you through. What specific issue are you dealing with? Let me see if I can provide clear information or direct you to the right department."
    },
    // Jokes/Humor
    {
      keywords: ['joke', 'funny', 'make me laugh', 'tell me a joke', 'humor', 'laugh', 'entertain me', 'boring'],
      response: "I appreciate the lighter mood! While I'm better at government services than comedy, I can tell you this: navigating bureaucracy doesn't have to be painful when you have the right information. Speaking of which, how can I help you with Praya services today? 😊"
    },
    // Small talk - weather
    {
      keywords: ['weather', 'temperature', 'hot', 'cold', 'raining', 'sunny', 'forecast', 'climate'],
      response: "I don't have access to weather information, but you can check the current air quality index on the main portal (currently showing in the stats section). For detailed weather forecasts, you might want to check a dedicated weather service. Is there anything related to government services I can help you with?"
    },
    // Time/Date
    {
      keywords: ['what time', 'current time', 'time is it', 'what day', 'today', 'date', 'calendar'],
      response: "I don't have access to real-time clock information, but your device should show you the current time and date. If you need information about government office hours or deadlines, I'd be happy to help with that! What service are you interested in?"
    },
    // Capabilities/Abilities
    {
      keywords: ['can you', 'are you able', 'do you know', 'capabilities', 'what can you do', 'your abilities', 'functions'],
      response: "I specialize in providing information about Praya government services! I can help you with:\n• Finding the right department for your needs\n• Office hours and contact information\n• Service requirements and fees\n• Application processes\n• General government service questions\n\nWhat would you like to know about?"
    },
    // Help - expanded
    {
      keywords: ['help', 'services', 'options', 'menu', 'assist', 'support', 'info', 'information', 'guide', 'start'],
      response: "I can help you with information about:\n• Taxes & Revenue (RD, CTB)\n• IDs & Documents (Interior, Transport)\n• Police & Justice (NPA, DOJ)\n• Banking (BOP)\n• Customs & Border (CBCA)\n• Health Services\n• Housing Authority\n• Postal Services\n• Legislative Council\n• PrayaPass Account Help\n\nJust ask me a question about any of these services!"
    },
    {
      keywords: ['hours', 'open', 'closed', 'business hours', 'schedule', 'when', 'time', 'available', 'opening'],
      response: "Most government offices are open Monday-Friday, 8AM-5PM. Some services vary:\n• Post Offices: Mon-Fri 8AM-6PM, Sat 9AM-1PM\n• Emergency Services (Police, Health): 24/7\n• Border Crossings: 24/7\n• Online Services: Available 24/7\n\nFor specific office hours, please check the department's page or call ahead."
    },
    // Wait/Hold on
    {
      keywords: ['wait', 'hold on', 'one moment', 'one sec', 'give me a sec', 'just a moment', 'hang on', 'brb', 'be right back'],
      response: "No problem! Take your time. I'll be here whenever you're ready to continue."
    },
    // Ready/Back
    {
      keywords: ['ready', 'im back', "i'm back", 'here', 'back', 'still there', 'you there'],
      response: "Great, I'm here! How can I help you with government services?"
    },
    // Personal questions - age, location, etc.
    {
      keywords: ['how old are you', 'your age', 'when were you born', 'where are you from', 'where do you live', 'location'],
      response: "I'm an AI assistant, so I don't have an age or physical location! I exist in the digital space to help Praya citizens 24/7. What government service can I help you with today?"
    },
    // Test/Testing
    {
      keywords: ['test', 'testing', 'is this working', 'are you working', 'hello world', 'check'],
      response: "Yes, I'm working perfectly! The chat system is functioning normally. How can I help you with Praya government services?"
    },
    // Repeat/Say again
    {
      keywords: ['repeat', 'say that again', 'what', 'come again', 'pardon', 'one more time', 'didnt catch that', "didn't catch that"],
      response: "I apologize if my previous response wasn't clear. Could you please let me know what specific information you need? I can help with:\n• Government departments and services\n• Office hours and locations\n• Application requirements\n• Fees and costs\n• Contact information\n\nWhat would you like to know more about?"
    },
    // Slow/Fast
    {
      keywords: ['too fast', 'too slow', 'slow down', 'speed up'],
      response: "I'll do my best to provide information at a comfortable pace. Is there something specific you'd like me to explain about government services?"
    },
    // Language/Translation already covered above
    // Praise/Positive feedback
    {
      keywords: ['good', 'cool', 'interesting', 'informative', 'useful', 'handy', 'neat'],
      response: "I'm glad you find this helpful! Feel free to ask if you need any more information about government services."
    },
    {
      keywords: ['agent', 'human', 'person', 'representative', 'speak to someone', 'talk to agent', 'live agent', 'customer service', 'support agent', 'real person', 'operator'],
      response: "Agent currently unavailable. I'm an AI assistant here to help you find information about Praya government services. For direct assistance, you can:\n• Call the relevant department directly\n• Visit an office during business hours\n• Use online portals for specific services\n\nI can help you find the right contact information or service. What do you need help with?"
    },
    // About Praya
    {
      keywords: ['what is praya', 'where is praya', 'praya country', 'republic of praya', 'about praya', 'praya location', 'praya population', 'tell me about praya'],
      response: "The Republic of Praya is a nation of 2.4 million citizens with a modern, digital-first government. We offer 127 online services available 24/7 across 12 major departments. Our government is committed to transparency, efficiency, and accessibility through technology. How can I help you access our services?"
    },
    // President/Leader/Government
    {
      keywords: ['president', 'prime minister', 'leader', 'who runs', 'government leader', 'elected', 'politics'],
      response: "For information about Praya's government structure and elected officials, please visit the Legislative Council portal. The Legislative Council is our unicameral legislature responsible for lawmaking and oversight. You can view current council members and their voting records there. Is there a specific government service I can help you with?"
    },
    // Love/Like
    {
      keywords: ['i love you', 'love you', 'i like you', 'you rock', 'youre the best', "you're the best", 'best bot'],
      response: "That's very kind of you! I'm here to serve the citizens of Praya. Is there anything specific I can help you with today regarding government services?"
    },
    // Hate/Dislike
    {
      keywords: ['i hate you', 'you suck', 'useless', 'not helpful', 'waste of time', "you're bad"],
      response: "I'm sorry I haven't been helpful. Let me try to assist you better. Could you tell me specifically what you're trying to accomplish? I can:\n• Direct you to the right department\n• Provide contact information\n• Explain requirements for services\n• Answer questions about fees and processes\n\nWhat do you need help with?"
    },
    // Bored/Entertainment
    {
      keywords: ['bored', 'entertain', 'fun', 'play', 'game'],
      response: "While I'm designed for government service information rather than entertainment, I'm happy to help you discover interesting services! Did you know Praya has 12 major departments offering everything from cannabis licensing to national park information? What would you like to explore?"
    },
    // Smart/Intelligent
    {
      keywords: ['smart', 'intelligent', 'clever', 'genius', 'impressive'],
      response: "Thank you! I'm designed to help make government services more accessible. Is there something specific you'd like to know about Praya services?"
    },
    // Dumb/Stupid
    {
      keywords: ['dumb', 'stupid', 'idiot', 'moron'],
      response: "I apologize if I'm not understanding your needs correctly. Could you please rephrase what you're looking for? I want to make sure I provide you with the right information about government services."
    },
    // Greeting variations for different times
    {
      keywords: ['good night', 'goodnight', 'night'],
      response: "Good night! Remember, I'm available 24/7 if you need help with government services. Sleep well!"
    },
    // Quick service lookups
    {
      keywords: ['quick question', 'fast', 'urgent', 'asap', 'right now', 'immediately', 'hurry'],
      response: "I'll help you as quickly as possible! What do you need to know? If this is a true emergency (life-threatening, crime in progress), please call 911 immediately."
    },
    // Recommendations
    {
      keywords: ['recommend', 'suggestion', 'what should i', 'advice', 'should i'],
      response: "I can provide information about government services, but the best choice depends on your specific needs. Could you tell me what you're trying to accomplish? For example:\n• Getting official documents\n• Filing taxes\n• Reporting an issue\n• Applying for benefits\n• Finding legal assistance"
    },
    // Already tried/doesn't work
    {
      keywords: ['already tried', 'tried that', "doesn't work", 'didnt work', 'not working', 'still broken', 'same problem'],
      response: "I understand you've already attempted a solution. For technical issues with online services or persistent problems, I recommend:\n• Contacting the specific department directly during business hours\n• Visiting an office in person with proper documentation\n• Checking the service status on the department's portal\n\nWhich department or service are you having trouble with? I can provide direct contact information."
    },
    {
      keywords: ['login', 'account', 'prayapass', 'password', 'register', 'sign up', 'forgot password', 'create account', 'sign in', 'log in'],
      response: "PrayaPass is your unified government account for accessing online services. To create an account, click 'Register' and follow the steps. Forgot your password? Use the 'Forgot Password' link on the login page. For account security issues, contact PrayaPass support or visit any government office with valid ID."
    },
    {
      keywords: ['emergency', '911', 'urgent', 'crisis', 'danger', 'help me'],
      response: "**For emergencies, please call 911 immediately.**\n\n911 handles:\n• Life-threatening medical situations\n• Crimes in progress\n• Fire emergencies\n• Missing children\n• Immediate danger\n\nFor non-emergencies, call 311.\n\nIf this is not an emergency, I can help you find information about government services. What do you need?"
    },
    {
      keywords: ['complaint', 'complain', 'report problem', 'issue', 'dissatisfied', 'unhappy', 'bad service', 'poor service'],
      response: "I'm sorry to hear you're experiencing issues. To file a formal complaint:\n\n• **General complaints**: Contact the specific department directly\n• **Service quality**: Use the feedback form on the department's page\n• **Serious misconduct**: Contact the Department of Justice\n• **PrayaPass issues**: Contact support via your account dashboard\n\nWould you like me to help you find the right department's contact information?"
    },
    {
      keywords: ['cost', 'fee', 'price', 'how much', 'pay', 'payment', 'charge', 'expensive'],
      response: "Service fees vary by department and service type. Common fees include:\n\n• **National ID**: ¤25 (new), ¤15 (renewal)\n• **Passport**: ¤80 (standard), ¤150 (expedited)\n• **Driver's License**: ¤45 (new), ¤30 (renewal)\n• **Birth Certificate**: ¤10\n• **Police Clearance**: ¤20\n\nFor specific fee information, please specify which service you need, or visit the relevant department's page."
    },
    {
      keywords: ['language', 'translate', 'spanish', 'french', 'chinese', 'other language', 'english', 'interpretation'],
      response: "Government services in Praya are primarily offered in English. For language assistance:\n\n• Many offices have multilingual staff\n• Translation services available for documents (fees may apply)\n• Interpretation available for in-person visits at major offices\n• Contact the specific department to arrange language support\n\nWhich department do you need language assistance with?"
    },
    {
      keywords: ['appointment', 'schedule', 'book', 'reservation', 'meet', 'visit', 'walk-in'],
      response: "**Appointments** can be scheduled for most government services:\n\n• **Online booking**: Available through PrayaPass for most departments\n• **Phone booking**: Call the department directly\n• **Walk-ins**: Accepted at most locations but may have longer wait times\n\nPopular services that benefit from appointments:\n• Driver's license testing (Transport Dept)\n• Passport applications (Interior Dept)\n• Business consultations (Revenue Dept)\n\nWhich service would you like to book?"
    },
    {
      keywords: ['disabled', 'disability', 'accessibility', 'wheelchair', 'accessible', 'accommodation', 'special needs'],
      response: "All Praya government facilities are **ADA-compliant** and accessible:\n\n• Wheelchair ramps and elevators\n• Accessible parking spaces\n• Sign language interpreters (request in advance)\n• Alternative format documents\n• Priority service windows\n\nFor specific accommodations, contact the department at least 48 hours before your visit. How can I help you access services?"
    }
  ];

  // Add detailed department knowledge
  const departmentKnowledge = departmentData.map(dept => ({
    keywords: dept.keywords,
    response: generateDepartmentResponse(dept)
  }));

  return [...baseKnowledge, ...departmentKnowledge];
}

function generateDepartmentResponse(dept) {
  let response = `**${dept.name} (${dept.abbrev})**\n\n${dept.description}\n\n`;

  // Add link to department page
  if (dept.url) {
    response += `**Visit:** [${dept.name} Portal](${dept.url})\n\n`;
  }

  if (dept.services && dept.services.length > 0) {
    response += '**Services:**\n';
    dept.services.slice(0, 5).forEach(service => {
      response += `• ${service}\n`;
    });
    if (dept.services.length > 5) {
      response += `• ...and ${dept.services.length - 5} more services\n`;
    }
    response += '\n';
  }

  // Add sub-pages with links
  if (dept.subPages && dept.subPages.length > 0) {
    response += '**Quick Links:**\n';
    dept.subPages.slice(0, 4).forEach(page => {
      response += `• [${page.name}](${page.url}) - ${page.description}\n`;
    });
    response += '\n';
  }

  if (dept.hours) {
    response += `**Hours:** ${dept.hours}\n`;
  }

  if (dept.contact) {
    response += `**Contact:** ${dept.contact}\n`;
  }

  if (dept.responseInfo) {
    response += `\n${dept.responseInfo}`;
  }

  return response.trim();
}

// Export utility functions for use in ChatWidget
export { containsProfanity, isUnintelligible };
