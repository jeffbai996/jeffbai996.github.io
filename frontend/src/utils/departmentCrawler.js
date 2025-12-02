// Department page crawler for knowledge base expansion
// This extracts information from each department HTML page

export const departmentData = [
  {
    id: 'npa',
    name: 'National Police Agency',
    abbrev: 'NPA',
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
    hours: 'Walk-in stations: 08:00-18:00 daily. Emergency dispatch: 24/7',
    contact: 'Emergency: 911 | Non-emergency: 311 | HQ: +854 200 0000',
    responseInfo: 'Average Priority 1 response: 7m 42s. Priority system ensures resources based on threat to life.'
  },
  {
    id: 'bop',
    name: 'Bank of Praya',
    abbrev: 'BOP',
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
    hours: 'Branch hours vary by location. Online banking available 24/7',
    contact: 'Main branch and customer service information available on BOP portal'
  },
  {
    id: 'ctb',
    name: 'Cannabis Tax Bureau',
    abbrev: 'CTB',
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
    hours: 'Office hours: Mon-Fri 8AM-5PM. Online services available 24/7',
    contact: 'CTB hotline available during business hours. Apply online via CTB portal'
  },
  {
    id: 'doj',
    name: 'Department of Justice',
    abbrev: 'DOJ',
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
    hours: 'Court hours: Mon-Fri 8AM-5PM. Case lookup available 24/7 online',
    contact: 'DOJ main office and courthouse locations available on DOJ portal'
  },
  {
    id: 'interior',
    name: 'Interior Department',
    abbrev: 'ID',
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
    hours: 'Mon-Fri 8AM-5PM. PrayaPass account required for online services',
    contact: 'Visit any Interior Department office with valid ID'
  },
  {
    id: 'transport',
    name: 'Transport Department',
    abbrev: 'TD',
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
    hours: 'Mon-Fri 8AM-5PM, Sat 9AM-1PM select locations',
    contact: 'Book appointments online or visit walk-in centers'
  },
  {
    id: 'revenue',
    name: 'Revenue Department',
    abbrev: 'RD',
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
    hours: 'Office hours: Mon-Fri 8AM-5PM. Online filing available 24/7',
    contact: 'Visit RD offices or access services through PrayaPass portal'
  },
  {
    id: 'post',
    name: 'Praya Post',
    abbrev: 'PP',
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
    hours: 'Mon-Fri 8AM-6PM, Sat 9AM-1PM. Closed Sundays',
    contact: 'Track packages online using tracking number. Visit local post office'
  },
  {
    id: 'health',
    name: 'Health Department',
    abbrev: 'HD',
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
    hours: 'Office hours: Mon-Fri 8AM-5PM. Emergency: 911 24/7',
    contact: 'National Health Insurance office for insurance questions. Visit nearest hospital for emergencies'
  },
  {
    id: 'housing',
    name: 'Housing Authority',
    abbrev: 'HA',
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
    hours: 'Mon-Fri 8AM-5PM. Online applications accepted 24/7',
    contact: 'Visit Housing Authority office or check status via PrayaPass'
  },
  {
    id: 'cbca',
    name: 'Customs and Border Control Agency',
    abbrev: 'CBCA',
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
    hours: 'Border crossings: 24/7. Office hours: Mon-Fri 8AM-5PM',
    contact: 'Review entry requirements before travel. Apply for permits online'
  },
  {
    id: 'lc',
    name: 'Legislative Council',
    abbrev: 'LC',
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
    hours: 'Public viewing hours: Mon-Fri 8AM-5PM. Session schedules vary',
    contact: 'Find your representative through LC portal'
  }
];

// Generate enhanced knowledge base entries from department data
export function generateKnowledgeBase() {
  const baseKnowledge = [
    {
      keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'greetings'],
      response: "Hello! Welcome to Praya Citizen Services. I'm here to help you navigate government services. You can ask me about taxes, IDs, police services, healthcare, housing, and more. How can I assist you today?"
    },
    {
      keywords: ['help', 'what can you do', 'services', 'options', 'menu'],
      response: "I can help you with information about:\n• Taxes & Revenue (RD, CTB)\n• IDs & Documents (Interior, Transport)\n• Police & Justice (NPA, DOJ)\n• Banking (BOP)\n• Customs & Border (CBCA)\n• Health Services\n• Housing Authority\n• Postal Services\n• Legislative Council\n• PrayaPass Account Help\n\nJust ask me a question about any of these services!"
    },
    {
      keywords: ['hours', 'open', 'closed', 'business hours', 'schedule', 'when', 'time'],
      response: "Most government offices are open Monday-Friday, 8AM-5PM. Some services vary:\n• Post Offices: Mon-Fri 8AM-6PM, Sat 9AM-1PM\n• Emergency Services (Police, Health): 24/7\n• Border Crossings: 24/7\n• Online Services: Available 24/7\n\nFor specific office hours, please check the department's page or call ahead."
    },
    {
      keywords: ['thank', 'thanks', 'appreciate', 'thank you'],
      response: "You're welcome! Is there anything else I can help you with regarding government services?"
    },
    {
      keywords: ['agent', 'human', 'person', 'representative', 'speak to someone', 'talk to agent', 'live agent', 'customer service', 'support agent', 'real person'],
      response: "Agent currently unavailable. I'm an AI assistant here to help you find information about Praya government services. For direct assistance, you can:\n• Call the relevant department directly\n• Visit an office during business hours\n• Use online portals for specific services\n\nI can help you find the right contact information or service. What do you need help with?"
    },
    {
      keywords: ['login', 'account', 'prayapass', 'password', 'register', 'sign up', 'forgot password', 'create account'],
      response: "PrayaPass is your unified government account for accessing online services. To create an account, click 'Register' and follow the steps. Forgot your password? Use the 'Forgot Password' link on the login page. For account security issues, contact PrayaPass support or visit any government office with valid ID."
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
