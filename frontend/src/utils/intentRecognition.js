// Intent Recognition System for Praya Citizen Services Chatbot
// This system classifies user intents using regex patterns and provides
// appropriate responses with follow-up actions

// Intent patterns organized by category
export const intentPatterns = {
  // ===== POLICE/CRIME RELATED =====
  reportCrime: {
    patterns: [
      /report (a |an )?crime/i,
      /file (a )?police report/i,
      /report (a )?(theft|robbery|assault|break.?in|burglary|vandalism)/i,
      /stolen/i,
      /been robbed/i,
      /want to report/i,
      /someone broke in/i,
      /my (car|bike|property|wallet|phone) was (stolen|taken)/i,
      /i was (mugged|attacked|assaulted)/i,
      /witness(ed)? (a )?crime/i
    ],
    response: "I can help you file a police report. Let me guide you through the National Police Agency process.",
    action: 'routeToNPA',
    followUp: {
      question: "What type of incident would you like to report?",
      options: [
        { label: "Theft (under ¤2,500)", value: "theft_minor" },
        { label: "Theft (over ¤2,500)", value: "theft_major" },
        { label: "Vandalism/Property Damage", value: "vandalism" },
        { label: "Assault/Violence", value: "assault" },
        { label: "Other Crime", value: "other_crime" }
      ]
    },
    department: 'npa'
  },

  checkCrimeStatus: {
    patterns: [
      /check.*(report|case) status/i,
      /where.*my.*report/i,
      /track.*case/i,
      /case number/i,
      /status of my (police )?report/i,
      /update on my case/i,
      /follow up.*(case|report)/i,
      /what happened.*(case|report)/i
    ],
    response: "I can help you check your report status. Do you have your case number?",
    action: 'getCaseNumber',
    requiresEntity: 'caseNumber',
    followUp: {
      question: "Please provide your case number (format: NPA-XXXXXX) or select an option:",
      options: [
        { label: "I have my case number", value: "has_case_number" },
        { label: "I don't have my case number", value: "no_case_number" },
        { label: "Find my case number", value: "find_case_number" }
      ]
    },
    department: 'npa'
  },

  emergencyServices: {
    patterns: [
      /emergency/i,
      /911/i,
      /someone.*(hurt|injured|dying)/i,
      /crime.*(happening|in progress)/i,
      /need (police|ambulance|fire) (now|immediately)/i,
      /life threatening/i,
      /missing (child|person)/i
    ],
    response: "**EMERGENCY: Call 911 immediately**\n\n911 handles:\n- Life-threatening situations\n- Crimes in progress\n- Fire emergencies\n- Missing children\n- Immediate danger\n\nFor non-emergencies, call 311.\n\nIs this a current emergency?",
    action: 'emergencyAlert',
    priority: 'high',
    department: 'npa'
  },

  policeClearance: {
    patterns: [
      /police clearance/i,
      /background check/i,
      /criminal (record|history) check/i,
      /clearance certificate/i,
      /need.*(clearance|background)/i
    ],
    response: "I can help you obtain a Police Clearance Certificate from the National Police Agency.",
    action: 'routeToNPA',
    followUp: {
      question: "What do you need the clearance for?",
      options: [
        { label: "Employment", value: "clearance_employment" },
        { label: "Immigration/Visa", value: "clearance_immigration" },
        { label: "Professional License", value: "clearance_license" },
        { label: "Other Purpose", value: "clearance_other" }
      ]
    },
    details: "**Police Clearance Certificates**\n- Processing time: 3 business days\n- Fee: ¤20\n- Covers: Criminal history, open warrants\n- Required: Valid ID, completed application",
    department: 'npa'
  },

  // ===== BANKING RELATED =====
  openAccount: {
    patterns: [
      /open (a |an )?account/i,
      /new (bank )?account/i,
      /sign up.*(bank|banking)/i,
      /become.*(bank )?customer/i,
      /start.*banking/i,
      /create.*(bank )?account/i,
      /get.*bank account/i
    ],
    response: "I can help you open a Bank of Praya account. What type of account are you interested in?",
    action: 'routeToBank',
    followUp: {
      question: "Please select the type of account you'd like to open:",
      options: [
        { label: "Personal Savings Account", value: "savings_personal" },
        { label: "Personal Checking Account", value: "checking_personal" },
        { label: "Business Account", value: "business_account" },
        { label: "Joint Account", value: "joint_account" }
      ]
    },
    department: 'bop'
  },

  loanInquiry: {
    patterns: [
      /apply.*(loan|mortgage)/i,
      /(need|want|get) (a )?loan/i,
      /mortgage (application|info|rate)/i,
      /borrow money/i,
      /financing options/i,
      /home loan/i,
      /business loan/i
    ],
    response: "I can provide information about Bank of Praya loan services.",
    action: 'routeToBank',
    followUp: {
      question: "What type of loan are you interested in?",
      options: [
        { label: "Home Mortgage", value: "loan_mortgage" },
        { label: "Personal Loan", value: "loan_personal" },
        { label: "Business Loan", value: "loan_business" },
        { label: "Auto Loan", value: "loan_auto" }
      ]
    },
    details: "**Bank of Praya Loans**\n- Schedule an appointment with a financial advisor\n- Bring: ID, proof of income, financial statements\n- Pre-approval available online",
    department: 'bop'
  },

  // ===== TAX RELATED =====
  fileTaxes: {
    patterns: [
      /file (my )?taxes/i,
      /tax return/i,
      /income tax/i,
      /tax declaration/i,
      /submit.*(tax|return)/i,
      /do my taxes/i,
      /tax filing/i
    ],
    response: "I can guide you through filing your taxes with the Revenue Department.",
    action: 'routeToRevenue',
    followUp: {
      question: "Are you filing as an individual or business?",
      options: [
        { label: "Individual Tax Return", value: "tax_individual" },
        { label: "Business Tax Return", value: "tax_business" },
        { label: "Self-Employment", value: "tax_selfemployed" },
        { label: "I need help deciding", value: "tax_help" }
      ]
    },
    department: 'revenue'
  },

  taxPayment: {
    patterns: [
      /pay (my )?taxes/i,
      /tax payment/i,
      /owe taxes/i,
      /tax bill/i,
      /tax balance/i,
      /how much.*owe.*tax/i
    ],
    response: "I can help you with tax payments to the Revenue Department.",
    action: 'routeToRevenue',
    followUp: {
      question: "What would you like to do?",
      options: [
        { label: "Make a payment", value: "tax_pay" },
        { label: "Check balance owed", value: "tax_balance" },
        { label: "Set up payment plan", value: "tax_plan" },
        { label: "Request extension", value: "tax_extension" }
      ]
    },
    details: "**Tax Payments**\n- Online payments through PrayaPass\n- Payment plans available for balances over ¤500\n- Late payment penalties: 1% per month",
    department: 'revenue'
  },

  taxRefund: {
    patterns: [
      /tax refund/i,
      /refund status/i,
      /where.*my refund/i,
      /when.*refund/i,
      /track.*refund/i
    ],
    response: "I can help you check on your tax refund status.",
    action: 'routeToRevenue',
    followUp: {
      question: "Do you have your tax return reference number?",
      options: [
        { label: "Yes, check refund status", value: "refund_check" },
        { label: "No, I need to find it", value: "refund_find" },
        { label: "Report missing refund", value: "refund_missing" }
      ]
    },
    details: "**Refund Processing Times**\n- E-filed returns: 10-14 business days\n- Paper returns: 6-8 weeks\n- Direct deposit is fastest",
    department: 'revenue'
  },

  // ===== ID & DOCUMENTS =====
  applyId: {
    patterns: [
      /apply.*(national )?id/i,
      /get (a |an )?(new )?id( card)?/i,
      /need (a )?new id/i,
      /id (card )?application/i,
      /national id/i,
      /identification card/i
    ],
    response: "I can help you apply for a National ID through the Interior Department.",
    action: 'routeToInterior',
    followUp: {
      question: "Is this a new application or renewal?",
      options: [
        { label: "New ID (First Time)", value: "id_new" },
        { label: "Renewal", value: "id_renew" },
        { label: "Replacement (Lost/Stolen)", value: "id_replace" },
        { label: "Update Information", value: "id_update" }
      ]
    },
    details: "**National ID**\n- Fee: ¤25 (new), ¤15 (renewal)\n- Processing: 5-7 business days\n- Required: Birth certificate, photo, proof of address",
    department: 'interior'
  },

  applyPassport: {
    patterns: [
      /apply.*(for )?(a )?passport/i,
      /get (a )?passport/i,
      /need (a )?passport/i,
      /passport (application|renewal)/i,
      /renew.*passport/i,
      /new passport/i
    ],
    response: "I can help you with passport services through the Interior Department.",
    action: 'routeToInterior',
    followUp: {
      question: "What do you need?",
      options: [
        { label: "New Passport", value: "passport_new" },
        { label: "Passport Renewal", value: "passport_renew" },
        { label: "Replacement (Lost/Stolen)", value: "passport_replace" },
        { label: "Add Pages", value: "passport_pages" },
        { label: "Expedited Service", value: "passport_expedited" }
      ]
    },
    details: "**Passport Services**\n- Standard: ¤80, 10-14 days\n- Expedited: ¤150, 3-5 days\n- Required: National ID, photo, application form",
    department: 'interior'
  },

  birthCertificate: {
    patterns: [
      /birth certificate/i,
      /certificate of birth/i,
      /register.*birth/i,
      /newborn registration/i
    ],
    response: "I can help you with birth certificate services.",
    action: 'routeToInterior',
    followUp: {
      question: "What do you need?",
      options: [
        { label: "Request Certified Copy", value: "birth_copy" },
        { label: "Register a Birth", value: "birth_register" },
        { label: "Correct Information", value: "birth_correct" }
      ]
    },
    details: "**Birth Certificates**\n- Fee: ¤10 per certified copy\n- Processing: 3-5 business days\n- New births must be registered within 30 days",
    department: 'interior'
  },

  // ===== DRIVER LICENSE & TRANSPORT =====
  driverLicense: {
    patterns: [
      /driver('s)? license/i,
      /driving license/i,
      /get.*(driver|driving) (license|licence)/i,
      /renew.*(driver|license)/i,
      /learner('s)? permit/i,
      /driving test/i
    ],
    response: "I can help you with driver's license services through the Transport Department.",
    action: 'routeToTransport',
    followUp: {
      question: "What do you need?",
      options: [
        { label: "New License", value: "license_new" },
        { label: "Renewal", value: "license_renew" },
        { label: "Replacement", value: "license_replace" },
        { label: "Schedule Driving Test", value: "license_test" },
        { label: "Commercial License (CDL)", value: "license_cdl" }
      ]
    },
    details: "**Driver's License**\n- Fee: ¤45 (new), ¤30 (renewal)\n- Valid for 5 years\n- Required: ID, vision test, written/road test (new only)",
    department: 'transport'
  },

  vehicleRegistration: {
    patterns: [
      /register.*(car|vehicle|motorcycle)/i,
      /vehicle registration/i,
      /car registration/i,
      /renew.*registration/i,
      /license plate/i,
      /title transfer/i
    ],
    response: "I can help you with vehicle registration through the Transport Department.",
    action: 'routeToTransport',
    followUp: {
      question: "What do you need?",
      options: [
        { label: "New Vehicle Registration", value: "vehicle_new" },
        { label: "Registration Renewal", value: "vehicle_renew" },
        { label: "Title Transfer", value: "vehicle_transfer" },
        { label: "Replace Lost Plates/Docs", value: "vehicle_replace" }
      ]
    },
    department: 'transport'
  },

  // ===== HEALTHCARE =====
  healthInsurance: {
    patterns: [
      /health insurance/i,
      /medical insurance/i,
      /national health/i,
      /enroll.*health/i,
      /health coverage/i,
      /insurance card/i
    ],
    response: "I can help you with National Health Insurance through the Health Department.",
    action: 'routeToHealth',
    followUp: {
      question: "What do you need help with?",
      options: [
        { label: "Enroll in Insurance", value: "health_enroll" },
        { label: "Update Coverage", value: "health_update" },
        { label: "Request Insurance Card", value: "health_card" },
        { label: "Find a Provider", value: "health_provider" }
      ]
    },
    department: 'health'
  },

  vaccination: {
    patterns: [
      /vaccin(e|ation)/i,
      /immuniz(e|ation)/i,
      /get.*shot/i,
      /flu shot/i,
      /vaccine schedule/i
    ],
    response: "I can help you with vaccination services through the Health Department.",
    action: 'routeToHealth',
    followUp: {
      question: "What do you need?",
      options: [
        { label: "Schedule Vaccination", value: "vaccine_schedule" },
        { label: "View Immunization Records", value: "vaccine_records" },
        { label: "Child Vaccinations", value: "vaccine_child" },
        { label: "Travel Vaccinations", value: "vaccine_travel" }
      ]
    },
    department: 'health'
  },

  // ===== HOUSING =====
  housingApplication: {
    patterns: [
      /apply.*(housing|apartment)/i,
      /public housing/i,
      /affordable housing/i,
      /housing (assistance|help)/i,
      /need.*(house|housing|apartment)/i,
      /section 8/i,
      /rental assistance/i
    ],
    response: "I can help you with housing services through the Housing Authority.",
    action: 'routeToHousing',
    followUp: {
      question: "What type of assistance are you looking for?",
      options: [
        { label: "Public Housing Application", value: "housing_public" },
        { label: "Rental Assistance", value: "housing_rental" },
        { label: "Check Eligibility", value: "housing_eligibility" },
        { label: "Waitlist Status", value: "housing_waitlist" }
      ]
    },
    details: "**Housing Programs**\n- Income-based eligibility\n- Apply through PrayaPass\n- Waitlist times vary by region",
    department: 'housing'
  },

  tenantRights: {
    patterns: [
      /tenant rights/i,
      /landlord (issue|problem)/i,
      /eviction/i,
      /rent (increase|dispute)/i,
      /lease (question|issue)/i
    ],
    response: "I can provide information about tenant rights and resources.",
    action: 'routeToHousing',
    followUp: {
      question: "What issue are you dealing with?",
      options: [
        { label: "Eviction Notice", value: "tenant_eviction" },
        { label: "Rent Dispute", value: "tenant_rent" },
        { label: "Housing Conditions", value: "tenant_conditions" },
        { label: "General Rights Info", value: "tenant_rights" }
      ]
    },
    department: 'housing'
  },

  // ===== POSTAL SERVICES =====
  trackPackage: {
    patterns: [
      /track.*(package|parcel|shipment|mail)/i,
      /where.*my (package|order|delivery)/i,
      /package status/i,
      /delivery status/i,
      /tracking number/i
    ],
    response: "I can help you track your package with Praya Post.",
    action: 'routeToPost',
    requiresEntity: 'trackingNumber',
    followUp: {
      question: "Do you have your tracking number?",
      options: [
        { label: "Yes, track my package", value: "track_yes" },
        { label: "No, I need help finding it", value: "track_no" },
        { label: "Report missing package", value: "track_missing" }
      ]
    },
    department: 'post'
  },

  shipPackage: {
    patterns: [
      /ship (a )?package/i,
      /send.*(package|parcel|mail)/i,
      /shipping rates/i,
      /mail.*(letter|package)/i,
      /postage (cost|rate)/i
    ],
    response: "I can help you with Praya Post shipping services.",
    action: 'routeToPost',
    followUp: {
      question: "What are you shipping?",
      options: [
        { label: "Domestic Package", value: "ship_domestic" },
        { label: "International Package", value: "ship_international" },
        { label: "Express/Overnight", value: "ship_express" },
        { label: "Letters/Documents", value: "ship_letter" }
      ]
    },
    department: 'post'
  },

  // ===== CANNABIS =====
  cannabisLicense: {
    patterns: [
      /cannabis (license|permit|business)/i,
      /dispensary (license|permit)/i,
      /cultivation (license|permit)/i,
      /marijuana (license|business)/i,
      /open.*dispensary/i,
      /grow.*cannabis/i
    ],
    response: "I can help you with cannabis licensing through the Cannabis Tax Bureau.",
    action: 'routeToCTB',
    followUp: {
      question: "What type of license are you interested in?",
      options: [
        { label: "Retail Dispensary", value: "cannabis_retail" },
        { label: "Commercial Cultivation", value: "cannabis_cultivation" },
        { label: "Personal Grow Permit", value: "cannabis_personal" },
        { label: "Processing/Manufacturing", value: "cannabis_processing" }
      ]
    },
    department: 'ctb'
  },

  // ===== CUSTOMS & BORDER =====
  importExport: {
    patterns: [
      /import.*(goods|product)/i,
      /export.*(goods|product)/i,
      /customs (declaration|duty|fee)/i,
      /bring.*(into|from) (praya|country)/i,
      /duty.?free/i,
      /international shipping/i
    ],
    response: "I can help you with customs and import/export services.",
    action: 'routeToCBCA',
    followUp: {
      question: "What do you need help with?",
      options: [
        { label: "Import Permit", value: "customs_import" },
        { label: "Export Permit", value: "customs_export" },
        { label: "Duty/Tariff Information", value: "customs_duty" },
        { label: "Prohibited Items List", value: "customs_prohibited" }
      ]
    },
    department: 'cbca'
  },

  travelRequirements: {
    patterns: [
      /travel (to|from) praya/i,
      /entry requirements/i,
      /visa (application|requirements)/i,
      /border crossing/i,
      /what.*bring.*border/i
    ],
    response: "I can provide information about travel and entry requirements.",
    action: 'routeToCBCA',
    followUp: {
      question: "What information do you need?",
      options: [
        { label: "Entry Requirements", value: "travel_entry" },
        { label: "Visa Information", value: "travel_visa" },
        { label: "What to Declare", value: "travel_declare" },
        { label: "Border Crossing Hours", value: "travel_hours" }
      ]
    },
    department: 'cbca'
  },

  // ===== LEGAL & COURTS =====
  courtCase: {
    patterns: [
      /court case/i,
      /lawsuit/i,
      /legal (case|matter|issue)/i,
      /sue someone/i,
      /being sued/i,
      /court date/i,
      /subpoena/i
    ],
    response: "I can help you with court and legal services through the Department of Justice.",
    action: 'routeToDOJ',
    followUp: {
      question: "What type of legal matter is this?",
      options: [
        { label: "Civil Case", value: "court_civil" },
        { label: "Criminal Case", value: "court_criminal" },
        { label: "Small Claims", value: "court_small" },
        { label: "Case Status Lookup", value: "court_lookup" }
      ]
    },
    department: 'doj'
  },

  legalAid: {
    patterns: [
      /legal (aid|help|assistance)/i,
      /public defender/i,
      /can't afford.*lawyer/i,
      /free.*lawyer/i,
      /need.*attorney/i,
      /legal representation/i
    ],
    response: "I can provide information about legal aid services.",
    action: 'routeToDOJ',
    followUp: {
      question: "What type of assistance do you need?",
      options: [
        { label: "Public Defender", value: "legal_public" },
        { label: "Civil Legal Aid", value: "legal_civil" },
        { label: "Check Eligibility", value: "legal_eligibility" },
        { label: "Find a Lawyer", value: "legal_find" }
      ]
    },
    details: "**Legal Aid**\n- Public Defender: For criminal cases, income-based\n- Civil Legal Aid: For qualifying civil matters\n- Contact DOJ for eligibility screening",
    department: 'doj'
  },

  // ===== LEGISLATIVE =====
  findRepresentative: {
    patterns: [
      /find.*representative/i,
      /who.*my.*representative/i,
      /contact.*(representative|legislator|council)/i,
      /local representative/i
    ],
    response: "I can help you find and contact your Legislative Council representative.",
    action: 'routeToLC',
    followUp: {
      question: "How would you like to find your representative?",
      options: [
        { label: "Search by District", value: "rep_district" },
        { label: "Search by Name", value: "rep_name" },
        { label: "View All Members", value: "rep_all" }
      ]
    },
    department: 'lc'
  },

  billStatus: {
    patterns: [
      /bill status/i,
      /track.*(bill|legislation)/i,
      /pending legislation/i,
      /new laws/i,
      /voting record/i
    ],
    response: "I can help you find information about legislation and voting records.",
    action: 'routeToLC',
    followUp: {
      question: "What would you like to look up?",
      options: [
        { label: "Search Bills", value: "bill_search" },
        { label: "Current Session Bills", value: "bill_current" },
        { label: "Voting Records", value: "bill_votes" },
        { label: "Upcoming Hearings", value: "bill_hearings" }
      ]
    },
    department: 'lc'
  }
};

// Department routing information
export const departmentRoutes = {
  npa: {
    name: 'National Police Agency',
    phone: '311 (non-emergency), 911 (emergency)',
    portal: '/departments/police'
  },
  bop: {
    name: 'Bank of Praya',
    phone: 'See BOP portal for branch numbers',
    portal: '/departments/bank'
  },
  revenue: {
    name: 'Revenue Department',
    phone: 'Contact via PrayaPass',
    portal: '/departments/revenue'
  },
  interior: {
    name: 'Interior Department',
    phone: 'Visit any Interior office',
    portal: '/departments/interior'
  },
  transport: {
    name: 'Transport Department',
    phone: 'Book appointments online',
    portal: '/departments/transport'
  },
  health: {
    name: 'Health Department',
    phone: '911 for emergencies',
    portal: '/departments/health'
  },
  housing: {
    name: 'Housing Authority',
    phone: 'Visit HA office or check PrayaPass',
    portal: '/departments/housing'
  },
  post: {
    name: 'Praya Post',
    phone: 'Visit local post office',
    portal: '/departments/post'
  },
  ctb: {
    name: 'Cannabis Tax Bureau',
    phone: 'CTB hotline during business hours',
    portal: '/departments/cannabis'
  },
  cbca: {
    name: 'Customs and Border Control Agency',
    phone: 'Review requirements before travel',
    portal: '/departments/customs'
  },
  doj: {
    name: 'Department of Justice',
    phone: 'See DOJ portal',
    portal: '/departments/justice'
  },
  lc: {
    name: 'Legislative Council',
    phone: 'Find via LC portal',
    portal: '/departments/legislative'
  }
};

/**
 * Classify user intent based on message
 * @param {string} message - User's input message
 * @returns {object|null} - Matched intent with response data, or null if no match
 */
export function classifyIntent(message) {
  const lowerMessage = message.toLowerCase().trim();

  // Check each intent pattern
  for (const [intentName, intent] of Object.entries(intentPatterns)) {
    for (const pattern of intent.patterns) {
      if (pattern.test(lowerMessage)) {
        return {
          intent: intentName,
          ...intent,
          matchedPattern: pattern.toString()
        };
      }
    }
  }

  return null;
}

/**
 * Generate a full response for a matched intent
 * @param {object} intent - The matched intent object
 * @param {boolean} includeDetails - Whether to include detailed information
 * @returns {string} - Formatted response message
 */
export function generateIntentResponse(intent, includeDetails = true) {
  let response = intent.response;

  // Add details if available
  if (includeDetails && intent.details) {
    response += '\n\n' + intent.details;
  }

  // Add follow-up question if available
  if (intent.followUp) {
    response += '\n\n' + intent.followUp.question;
    if (intent.followUp.options) {
      response += '\n';
      intent.followUp.options.forEach((option, index) => {
        response += `\n${index + 1}. ${option.label}`;
      });
    }
  }

  // Add department routing info if available
  if (intent.department && departmentRoutes[intent.department]) {
    const dept = departmentRoutes[intent.department];
    response += `\n\n**Need more help?** Visit the ${dept.name} portal or contact them directly.`;
  }

  return response;
}

/**
 * Handle follow-up responses based on user selection
 * @param {string} intentName - The original intent name
 * @param {string} selection - The user's selection (option value or text)
 * @returns {string} - Follow-up response
 */
export function handleFollowUp(intentName, selection) {
  const intent = intentPatterns[intentName];
  if (!intent || !intent.followUp) {
    return null;
  }

  // Map of follow-up responses based on selection
  const followUpResponses = {
    // Crime reporting follow-ups
    theft_minor: "For thefts under ¤2,500, you can file an online report:\n\n1. Go to the NPA portal\n2. Click 'File Online Report'\n3. Select 'Theft - Minor'\n4. Fill in incident details\n5. Submit and save your case number\n\nProcessing time: 24-48 hours for confirmation.",
    theft_major: "For thefts over ¤2,500, please call the non-emergency line (311) or visit your nearest police station. You'll need:\n\n• Description of stolen items\n• Estimated value\n• Time and location of incident\n• Any witness information",
    vandalism: "To report vandalism, you can file online or call 311. Please gather:\n\n• Photos of damage\n• Location details\n• Approximate time of incident\n• Any suspect description",
    assault: "**For assault, please call 911 if you need immediate help or are injured.**\n\nOtherwise, call 311 or visit a police station to file a report. Victim assistance services are available.",

    // Banking follow-ups
    savings_personal: "To open a Personal Savings Account:\n\n**Requirements:**\n• Valid National ID\n• Proof of address\n• Minimum deposit: ¤100\n\n**Features:**\n• Competitive interest rates\n• No monthly fees\n• Online/mobile banking\n\nVisit any BOP branch or start your application online.",
    checking_personal: "To open a Personal Checking Account:\n\n**Requirements:**\n• Valid National ID\n• Proof of address\n• Minimum deposit: ¤50\n\n**Features:**\n• Free debit card\n• Unlimited transactions\n• Online bill pay\n\nVisit any BOP branch to get started.",
    business_account: "For Business Accounts, you'll need:\n\n• Business registration documents\n• Tax ID\n• Owner identification\n• Business plan (for new businesses)\n\nSchedule an appointment with a business banking specialist at your nearest BOP branch.",

    // Tax follow-ups
    tax_individual: "To file your individual tax return:\n\n1. Log into PrayaPass\n2. Go to Revenue Department services\n3. Select 'File Individual Return'\n4. Gather your W-2s and income documents\n5. Complete the guided filing process\n\n**Deadline:** April 15th annually\n**Late filing penalty:** 5% per month",
    tax_business: "For business tax filing:\n\n1. Log into PrayaPass with business account\n2. Select 'File Business Return'\n3. Have ready: Financial statements, expense records, payroll data\n\nConsider scheduling a consultation with RD for complex filings.",

    // ID follow-ups
    id_new: "To apply for a new National ID:\n\n**Requirements:**\n• Birth certificate\n• Passport-style photo\n• Proof of address\n• Fee: ¤25\n\n**Process:**\n1. Book appointment online or visit ID office\n2. Submit documents\n3. Biometric capture\n4. Receive ID in 5-7 business days",
    id_renew: "To renew your National ID:\n\n**Requirements:**\n• Current/expired ID\n• Updated photo\n• Fee: ¤15\n\nYou can renew online through PrayaPass if your address hasn't changed.",

    // Passport follow-ups
    passport_new: "To apply for a new passport:\n\n**Requirements:**\n• National ID\n• Passport photo (2x2 inches)\n• Completed application\n• Fee: ¤80 (standard) or ¤150 (expedited)\n\n**Processing:**\n• Standard: 10-14 business days\n• Expedited: 3-5 business days\n\nAppointment required at Interior Department.",
    passport_expedited: "For expedited passport service:\n\n**Additional fee:** ¤70 (total ¤150)\n**Processing:** 3-5 business days\n\nMust apply in person. Bring proof of urgent travel if requesting same-week processing."
  };

  return followUpResponses[selection] ||
    `Thank you for your selection. Please visit the ${departmentRoutes[intent.department]?.name || 'appropriate department'} portal or office for detailed assistance with your request.`;
}

/**
 * Extract entities from user message (e.g., case numbers, tracking numbers)
 * @param {string} message - User's input message
 * @returns {object} - Extracted entities
 */
export function extractEntities(message) {
  const entities = {};

  // Case number pattern: NPA-XXXXXX
  const caseMatch = message.match(/NPA-\d{6}/i);
  if (caseMatch) {
    entities.caseNumber = caseMatch[0].toUpperCase();
  }

  // Tracking number pattern: PP followed by numbers
  const trackingMatch = message.match(/PP\d{10,}/i);
  if (trackingMatch) {
    entities.trackingNumber = trackingMatch[0].toUpperCase();
  }

  // Tax ID pattern
  const taxIdMatch = message.match(/\d{3}-\d{2}-\d{4}/);
  if (taxIdMatch) {
    entities.taxId = taxIdMatch[0];
  }

  return entities;
}
