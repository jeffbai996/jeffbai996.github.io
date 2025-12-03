// Intent Recognition System for Praya Citizen Services Chatbot
// This system classifies user intents using regex patterns and provides
// appropriate responses with follow-up actions

// ===== INTELLIGENT TEXT PROCESSING UTILITIES =====

/**
 * Calculate Levenshtein distance between two strings for fuzzy matching
 * @param {string} a - First string
 * @param {string} b - Second string
 * @returns {number} - Edit distance
 */
function levenshteinDistance(a, b) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

/**
 * Check if two words are similar (fuzzy match for typos)
 * @param {string} word1 - First word
 * @param {string} word2 - Second word
 * @param {number} threshold - Maximum edit distance (default 2)
 * @returns {boolean} - Whether words are similar
 */
export function isSimilar(word1, word2, threshold = 2) {
  if (!word1 || !word2) return false;
  const w1 = word1.toLowerCase();
  const w2 = word2.toLowerCase();
  if (w1 === w2) return true;
  if (Math.abs(w1.length - w2.length) > threshold) return false;
  return levenshteinDistance(w1, w2) <= threshold;
}

/**
 * Comprehensive synonym map for government services
 * Maps common words to their canonical forms
 */
export const synonymMap = {
  // Document synonyms
  'id': ['identification', 'identity', 'id card', 'national id', 'ident'],
  'passport': ['travel document', 'travel papers'],
  'license': ['licence', 'permit', 'certification'],
  'certificate': ['cert', 'certification', 'document'],

  // Action synonyms
  'apply': ['get', 'obtain', 'request', 'need', 'want', 'acquire', 'file for', 'submit'],
  'renew': ['extend', 'update', 'refresh', 'reapply'],
  'replace': ['reissue', 'get new', 'lost', 'stolen', 'damaged'],
  'track': ['check', 'find', 'locate', 'lookup', 'look up', 'follow', 'trace', 'status'],
  'file': ['submit', 'lodge', 'send', 'report', 'declare'],
  'pay': ['settle', 'remit', 'submit payment', 'make payment'],

  // Service synonyms
  'tax': ['taxes', 'taxation', 'revenue', 'irs', 'income tax', 'duty'],
  'police': ['cops', 'law enforcement', 'authorities', 'officers', 'npa'],
  'bank': ['banking', 'financial', 'bop', 'savings', 'money'],
  'court': ['legal', 'lawsuit', 'litigation', 'judicial', 'justice'],
  'health': ['medical', 'healthcare', 'hospital', 'clinic', 'doctor'],
  'housing': ['home', 'apartment', 'residence', 'dwelling', 'property', 'rent'],
  'mail': ['post', 'postal', 'package', 'parcel', 'shipping', 'delivery'],
  'driver': ['driving', 'drivers', "driver's", 'driveing'],
  'vehicle': ['car', 'automobile', 'auto', 'truck', 'motorcycle', 'motorbike'],
  'cannabis': ['marijuana', 'weed', 'pot', 'dispensary'],
  'customs': ['border', 'import', 'export', 'cbca'],

  // Status synonyms
  'status': ['progress', 'update', 'where is', 'check on'],

  // Question words
  'how': ['what way', 'method', 'process', 'steps'],
  'where': ['location', 'place', 'which office'],
  'when': ['what time', 'hours', 'schedule'],
  'cost': ['fee', 'price', 'charge', 'how much', 'payment amount'],

  // Common typos and variations
  'governement': ['government'],
  'goverment': ['government'],
  'licence': ['license'],
  'licences': ['licenses'],
  'passaport': ['passport'],
  'pasport': ['passport'],
  'registeration': ['registration'],
  'regestration': ['registration'],
  'certficate': ['certificate'],
  'certificat': ['certificate'],
  'insurence': ['insurance'],
  'insuranse': ['insurance'],
  'emergancy': ['emergency'],
  'emergeny': ['emergency'],
  'vehical': ['vehicle'],
  'vehicel': ['vehicle'],
  'acount': ['account'],
  'acconut': ['account'],
  'refund': ['rebate', 'return', 'reimbursement'],
  'complain': ['complaint', 'grievance', 'issue', 'problem']
};

/**
 * Word stemming - reduce words to their root form
 * Simple suffix stripping for common patterns
 */
export function stemWord(word) {
  if (!word || word.length < 4) return word;
  let w = word.toLowerCase();

  // Common suffix patterns
  const suffixes = [
    { suffix: 'ation', replacement: '' },
    { suffix: 'tion', replacement: '' },
    { suffix: 'sion', replacement: '' },
    { suffix: 'ment', replacement: '' },
    { suffix: 'ness', replacement: '' },
    { suffix: 'ity', replacement: '' },
    { suffix: 'ing', replacement: '' },
    { suffix: 'ings', replacement: '' },
    { suffix: 'ed', replacement: '' },
    { suffix: 'es', replacement: '' },
    { suffix: 's', replacement: '' },
    { suffix: 'ly', replacement: '' },
    { suffix: 'ful', replacement: '' },
    { suffix: 'less', replacement: '' },
    { suffix: 'able', replacement: '' },
    { suffix: 'ible', replacement: '' },
    { suffix: 'er', replacement: '' },
    { suffix: 'or', replacement: '' },
    { suffix: 'ist', replacement: '' }
  ];

  for (const { suffix, replacement } of suffixes) {
    if (w.endsWith(suffix) && w.length > suffix.length + 2) {
      return w.slice(0, -suffix.length) + replacement;
    }
  }
  return w;
}

/**
 * Expand text with synonyms for better matching
 * @param {string} text - Input text
 * @returns {string[]} - Array of expanded terms
 */
export function expandWithSynonyms(text) {
  const words = text.toLowerCase().split(/\s+/);
  const expanded = new Set(words);

  for (const word of words) {
    // Check if word is a key in synonym map
    if (synonymMap[word]) {
      synonymMap[word].forEach(syn => expanded.add(syn));
    }
    // Check if word is a value in synonym map
    for (const [key, values] of Object.entries(synonymMap)) {
      if (values.includes(word)) {
        expanded.add(key);
      }
    }
    // Add stemmed version
    const stemmed = stemWord(word);
    if (stemmed !== word) {
      expanded.add(stemmed);
    }
  }

  return Array.from(expanded);
}

/**
 * Detect question type for better response formatting
 * @param {string} message - User message
 * @returns {object} - Question type info
 */
export function detectQuestionType(message) {
  const lower = message.toLowerCase().trim();

  const patterns = {
    howTo: /^(how (do|can|to|should)|what('s| is) the (way|process|procedure)|steps to|guide me)/i,
    whatIs: /^(what('s| is| are)|define|explain|tell me about)/i,
    whereIs: /^(where('s| is| can| do)|which (office|location|place)|location of)/i,
    whenIs: /^(when('s| is| can| do)|what time|hours|schedule)/i,
    howMuch: /^(how much|what('s| is) the (cost|fee|price)|cost of|fee for)/i,
    canI: /^(can i|am i (able|allowed)|is it possible|do i qualify)/i,
    doYou: /^(do you|can you|are you (able|going))/i,
    whyIs: /^(why('s| is| do| does| are)|reason for)/i,
    yesNo: /^(is it|are there|do they|does it|have you|has it|will it|can they)/i
  };

  for (const [type, pattern] of Object.entries(patterns)) {
    if (pattern.test(lower)) {
      return { type, hasQuestion: true };
    }
  }

  // Check for question marks
  if (lower.includes('?')) {
    return { type: 'general', hasQuestion: true };
  }

  return { type: 'statement', hasQuestion: false };
}

/**
 * Extract key topics from message for better context tracking
 * @param {string} message - User message
 * @returns {string[]} - Array of detected topics
 */
export function extractTopics(message) {
  const topics = [];
  const lower = message.toLowerCase();

  const topicPatterns = {
    police: /police|crime|report|emergency|911|theft|assault|clearance/,
    banking: /bank|account|loan|mortgage|savings|checking/,
    taxes: /tax|refund|file|revenue|income|business tax/,
    identity: /id|identification|passport|birth certificate|documents/,
    transport: /driver|license|vehicle|registration|car|motorcycle/,
    health: /health|insurance|vaccination|medical|hospital/,
    housing: /housing|rent|apartment|landlord|tenant|eviction/,
    postal: /mail|package|shipping|tracking|post office/,
    cannabis: /cannabis|marijuana|dispensary|cultivation/,
    customs: /customs|border|import|export|travel|visa/,
    legal: /court|legal|lawsuit|attorney|lawyer|case/,
    legislative: /representative|bill|legislation|council|vote/
  };

  for (const [topic, pattern] of Object.entries(topicPatterns)) {
    if (pattern.test(lower)) {
      topics.push(topic);
    }
  }

  return topics;
}

/**
 * Calculate semantic similarity score between message and keywords
 * Uses multiple matching strategies
 * @param {string} message - User message
 * @param {string[]} keywords - Keywords to match against
 * @returns {number} - Similarity score
 */
export function calculateSimilarity(message, keywords) {
  const words = message.toLowerCase().split(/\s+/);
  const expandedWords = expandWithSynonyms(message);
  let score = 0;

  for (const keyword of keywords) {
    const keywordLower = keyword.toLowerCase();
    const keywordWords = keywordLower.split(/\s+/);

    // Exact phrase match (highest priority)
    if (message.toLowerCase().includes(keywordLower)) {
      score += keyword.length * 3;
      continue;
    }

    // Word boundary match
    const wordBoundaryRegex = new RegExp(`\\b${keywordLower}\\b`, 'i');
    if (wordBoundaryRegex.test(message)) {
      score += keyword.length * 2.5;
      continue;
    }

    // Synonym match
    if (expandedWords.some(w => w === keywordLower || keywordLower.includes(w))) {
      score += keyword.length * 2;
      continue;
    }

    // Fuzzy match (typo tolerance)
    for (const word of words) {
      if (word.length >= 4 && isSimilar(word, keywordLower, 2)) {
        score += keyword.length * 1.5;
        break;
      }
    }

    // Stemmed match
    const stemmedKeyword = stemWord(keywordLower);
    for (const word of words) {
      if (stemWord(word) === stemmedKeyword) {
        score += keyword.length * 1.2;
        break;
      }
    }

    // Partial match (substring)
    if (words.some(w => keywordLower.includes(w) || w.includes(keywordLower))) {
      score += keyword.length * 0.8;
    }
  }

  return score;
}

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
      /my (car|bike|property|wallet|phone|purse|bag|laptop|computer) was (stolen|taken|snatched)/i,
      /i was (mugged|attacked|assaulted|robbed)/i,
      /witness(ed)? (a )?crime/i,
      /someone stole/i,
      /got robbed/i,
      /house was broken into/i,
      /car break.?in/i,
      /lost.*property/i,
      /fraud(ulent)?/i,
      /scam(med)?/i,
      /identity theft/i,
      /someone hit my car/i,
      /vandal/i,
      /graffiti/i
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
      /tax filing/i,
      /how.*file.*tax/i,
      /when.*file.*tax/i,
      /tax.*deadline/i,
      /tax.*due/i,
      /w-?2/i,
      /1099/i,
      /tax.*form/i,
      /annual.*tax/i,
      /yearly.*tax/i,
      /tax.*season/i,
      /prepare.*tax/i,
      /tax.*preparation/i,
      /e-?file/i,
      /electronic.*tax/i,
      /online.*tax/i,
      /self.*employed.*tax/i,
      /freelancer.*tax/i,
      /small.*business.*tax/i
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
      /identification card/i,
      /replace.*id/i,
      /lost.*id/i,
      /id.*expired/i,
      /renew.*id/i,
      /update.*id/i,
      /change.*address.*id/i,
      /id.*stolen/i,
      /damaged.*id/i,
      /how.*(get|apply|obtain).*id/i,
      /where.*get.*id/i,
      /state id/i,
      /government id/i
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
      /new passport/i,
      /passport.*expired/i,
      /lost.*passport/i,
      /passport.*stolen/i,
      /replace.*passport/i,
      /damaged.*passport/i,
      /update.*passport/i,
      /how.*get.*passport/i,
      /where.*apply.*passport/i,
      /passport.*photo/i,
      /expedited.*passport/i,
      /rush.*passport/i,
      /urgent.*passport/i,
      /passport.*pages/i,
      /passport.*travel/i,
      /international.*travel.*document/i
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
      /driving test/i,
      /dmv/i,
      /license.*expired/i,
      /lost.*license/i,
      /replace.*license/i,
      /update.*license/i,
      /change.*address.*license/i,
      /license.*stolen/i,
      /how.*get.*license/i,
      /schedule.*driving.*test/i,
      /road test/i,
      /written test/i,
      /license.*photo/i,
      /license.*points/i,
      /suspended.*license/i,
      /revoked.*license/i,
      /international.*license/i,
      /motorcycle.*license/i,
      /commercial.*license/i,
      /cdl/i,
      /learn.*to.*drive/i,
      /first.*license/i,
      /new.*driver/i,
      /provisional.*license/i
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

// Department routing information with correct URLs
export const departmentRoutes = {
  npa: {
    name: 'National Police Agency',
    phone: '311 (non-emergency), 911 (emergency)',
    portal: '/npa',
    subPages: {
      report: '/npa/report',
      services: '/npa/services',
      safety: '/npa/safety'
    }
  },
  bop: {
    name: 'Bank of Praya',
    phone: 'See BOP portal for branch numbers',
    portal: '/bop',
    subPages: {
      personal: '/bop/personal',
      business: '/bop/business',
      exchange: '/bop/exchange'
    }
  },
  revenue: {
    name: 'Revenue Department',
    phone: '1-800-TAX-HELP',
    portal: '/revenue',
    subPages: {
      file: '/revenue/file',
      payment: '/revenue/payment',
      refunds: '/revenue/refunds'
    }
  },
  interior: {
    name: 'Interior Department',
    phone: 'Visit any Interior office',
    portal: '/interior',
    subPages: {
      id: '/interior/id',
      passport: '/interior/passport',
      birth: '/interior/birth',
      records: '/interior/records'
    }
  },
  transport: {
    name: 'Transport Department',
    phone: 'Book appointments online',
    portal: '/transport',
    subPages: {
      license: '/transport/license',
      registration: '/transport/registration',
      test: '/transport/test'
    }
  },
  health: {
    name: 'Health Department',
    phone: '1-800-HEALTH-PY | Emergency: 911',
    portal: '/health',
    subPages: {
      insurance: '/health/insurance',
      vaccinations: '/health/vaccinations',
      providers: '/health/providers',
      alerts: '/health/alerts'
    }
  },
  housing: {
    name: 'Housing Authority',
    phone: 'Visit HA office or check PrayaPass',
    portal: '/housing',
    subPages: {
      apply: '/housing/apply',
      eligibility: '/housing/eligibility',
      rights: '/housing/rights',
      waitlist: '/housing/waitlist'
    }
  },
  post: {
    name: 'Praya Post',
    phone: 'Visit local post office',
    portal: '/post',
    subPages: {
      track: '/post/track',
      ship: '/post/ship',
      locations: '/post/locations'
    }
  },
  ctb: {
    name: 'Cannabis Tax Bureau',
    phone: 'CTB hotline during business hours',
    portal: '/ctb',
    subPages: {
      apply: '/ctb/apply',
      taxes: '/ctb/taxes',
      compliance: '/ctb/compliance'
    }
  },
  cbca: {
    name: 'Customs and Border Control Agency',
    phone: 'Review requirements before travel',
    portal: '/cbca',
    subPages: {
      permits: '/cbca/permits',
      travel: '/cbca/travel',
      prohibited: '/cbca/prohibited'
    }
  },
  doj: {
    name: 'Department of Justice',
    phone: 'See DOJ portal',
    portal: '/doj',
    subPages: {
      lookup: '/doj/lookup',
      legalAid: '/doj/legal-aid',
      filings: '/doj/filings'
    }
  },
  lc: {
    name: 'Legislative Council',
    phone: 'Find via LC portal',
    portal: '/lc',
    subPages: {
      bills: '/lc/bills',
      representatives: '/lc/representatives',
      voting: '/lc/voting',
      hearings: '/lc/hearings'
    }
  },
  bd: {
    name: 'Buildings Department',
    phone: 'Visit BD office',
    portal: '/bd',
    subPages: {
      permits: '/bd/permits',
      inspections: '/bd/inspections',
      contractors: '/bd/contractors',
      codes: '/bd/codes'
    }
  },
  cr: {
    name: 'Companies Registry',
    phone: 'Contact CR office',
    portal: '/cr',
    subPages: {
      register: '/cr/register',
      search: '/cr/search',
      filings: '/cr/filings',
      name: '/cr/name'
    }
  },
  swd: {
    name: 'Social Welfare Department',
    phone: 'SWD hotline',
    portal: '/swd',
    subPages: {
      benefits: '/swd/benefits',
      family: '/swd/family',
      elderly: '/swd/elderly',
      disability: '/swd/disability'
    }
  }
};

/**
 * Normalize text for better matching
 * - Fixes common typos
 * - Expands contractions
 * - Normalizes whitespace
 */
export function normalizeText(text) {
  let normalized = text.toLowerCase().trim();

  // Fix common typos using synonym map
  for (const [typo, corrections] of Object.entries(synonymMap)) {
    if (typo.length > 5) { // Only fix longer typos to avoid false positives
      const regex = new RegExp(`\\b${typo}\\b`, 'gi');
      if (regex.test(normalized)) {
        normalized = normalized.replace(regex, corrections[0]);
      }
    }
  }

  // Expand contractions
  const contractions = {
    "i'm": 'i am', "i've": 'i have', "i'd": 'i would', "i'll": 'i will',
    "don't": 'do not', "doesn't": 'does not', "didn't": 'did not',
    "can't": 'cannot', "couldn't": 'could not', "won't": 'will not',
    "wouldn't": 'would not', "shouldn't": 'should not',
    "haven't": 'have not', "hasn't": 'has not', "hadn't": 'had not',
    "isn't": 'is not', "aren't": 'are not', "wasn't": 'was not',
    "weren't": 'were not', "what's": 'what is', "where's": 'where is',
    "how's": 'how is', "who's": 'who is', "that's": 'that is',
    "there's": 'there is', "here's": 'here is', "let's": 'let us',
    "gonna": 'going to', "wanna": 'want to', "gotta": 'got to',
    "gimme": 'give me', "lemme": 'let me', "kinda": 'kind of',
    "sorta": 'sort of', "dunno": 'do not know', "y'all": 'you all'
  };

  for (const [contraction, expansion] of Object.entries(contractions)) {
    normalized = normalized.replace(new RegExp(contraction.replace("'", "'?"), 'gi'), expansion);
  }

  // Normalize multiple spaces
  normalized = normalized.replace(/\s+/g, ' ');

  return normalized;
}

/**
 * Classify user intent based on message using simple regex matching
 * @param {string} message - User's input message
 * @returns {object|null} - Matched intent with response data, or null if no match
 */
export function classifyIntent(message) {
  const lowerMessage = message.toLowerCase().trim();

  // Check each intent pattern with simple regex matching
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

  // Add department routing info with hyperlinks if available
  if (intent.department && departmentRoutes[intent.department]) {
    const dept = departmentRoutes[intent.department];
    response += `\n\n**Need more help?** Visit the [${dept.name}](${dept.portal}) portal or contact them directly.`;

    // Add relevant sub-page links if available
    if (dept.subPages) {
      const subPageLinks = Object.entries(dept.subPages)
        .slice(0, 3)
        .map(([name, url]) => `[${name.charAt(0).toUpperCase() + name.slice(1)}](${url})`)
        .join(' | ');
      if (subPageLinks) {
        response += `\n**Quick Links:** ${subPageLinks}`;
      }
    }
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
    passport_expedited: "For expedited passport service:\n\n**Additional fee:** ¤70 (total ¤150)\n**Processing:** 3-5 business days\n\nMust apply in person. Bring proof of urgent travel if requesting same-week processing.",

    // Driver's license follow-ups
    license_new: "To get a new driver's license:\n\n**Requirements:**\n• Valid National ID\n• Proof of address\n• Vision test (at TD office)\n• Written test\n• Road test\n• Fee: ¤45\n\n**Steps:**\n1. Schedule appointment online\n2. Pass vision and written tests\n3. Schedule road test\n4. Receive license in 5-7 days",
    license_renew: "To renew your driver's license:\n\n**Requirements:**\n• Current/expired license\n• Fee: ¤30\n\n**Options:**\n• Online: Via PrayaPass (if eligible)\n• In-person: Any Transport Department office\n\nOnline renewals process in 3-5 days.",
    license_replace: "To replace a lost/stolen license:\n\n**Requirements:**\n• Police report (if stolen)\n• Valid ID\n• Fee: ¤25\n\nYou can apply online or visit a TD office. Replacement takes 5-7 days.",
    license_test: "To schedule a driving test:\n\n1. Book online at Transport Department portal\n2. Choose location and time\n3. Bring learner's permit and valid ID\n4. Arrive 15 minutes early\n\n**Test includes:**\n• Pre-drive checklist\n• Basic maneuvers\n• City driving\n• Highway section (varies by location)",

    // Health follow-ups
    health_enroll: "To enroll in National Health Insurance:\n\n**Requirements:**\n• Valid National ID\n• Proof of residence\n• Income documentation\n\n**Options:**\n• Standard Plan: Basic coverage\n• Premium Plan: Extended benefits\n\nApply online through PrayaPass or visit Health Department.",
    vaccine_schedule: "To schedule a vaccination:\n\n1. Log into PrayaPass\n2. Go to Health Department services\n3. Select 'Vaccination Scheduling'\n4. Choose vaccine type and location\n5. Select available date/time\n\nBring your ID and insurance card to the appointment.",

    // Housing follow-ups
    housing_public: "To apply for public housing:\n\n**Eligibility:**\n• Income below threshold (varies by area)\n• Praya citizen or permanent resident\n• No current public housing\n\n**Process:**\n1. Apply online through PrayaPass\n2. Submit income verification\n3. Background check\n4. Waitlist placement\n\n**Note:** Waitlists vary by region. Check current times online.",
    housing_rental: "For rental assistance programs:\n\n**Available Programs:**\n• Emergency Rental Assistance\n• Housing Choice Vouchers\n• Utility Assistance\n\n**Requirements:**\n• Income verification\n• Rental agreement\n• Landlord participation\n\nApply through Housing Authority portal.",

    // Cannabis follow-ups
    cannabis_retail: "For retail dispensary licensing:\n\n**Requirements:**\n• Business registration\n• Background check\n• Location approval\n• Security plan\n• Fee: Varies by license type\n\n**Process:**\n1. Pre-application consultation\n2. Submit full application\n3. Site inspection\n4. License issuance (60-90 days)\n\nContact CTB for current application windows.",
    cannabis_personal: "For personal cultivation permits:\n\n**Limits:**\n• Up to 6 plants per household\n• 18+ age requirement\n• Registration required\n\n**Fee:** ¤50 annually\n\nRegister online through CTB portal.",

    // Legal follow-ups
    court_civil: "For civil court cases:\n\n**Types handled:**\n• Contract disputes\n• Property matters\n• Family law\n• Personal injury\n\n**To file:**\n1. Complete civil complaint form\n2. Pay filing fee (¤50-¤200)\n3. Serve defendant\n4. Await court date\n\nSmall claims (under ¤5,000) have simplified procedures.",
    legal_public: "For public defender services:\n\n**Eligibility:**\n• Criminal case\n• Income below threshold\n• Unable to afford attorney\n\n**Process:**\n1. Request at arraignment\n2. Financial screening\n3. Assignment of attorney\n\nContact DOJ for eligibility screening."
  };

  return followUpResponses[selection] ||
    `Thank you for your selection. Please visit the ${departmentRoutes[intent.department]?.name || 'appropriate department'} portal or office for detailed assistance with your request.`;
}

/**
 * Extract entities from user message (e.g., case numbers, tracking numbers)
 * Enhanced with more patterns and context detection
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

  // Tax ID pattern (various formats)
  const taxIdMatch = message.match(/\d{3}-\d{2}-\d{4}/);
  if (taxIdMatch) {
    entities.taxId = taxIdMatch[0];
  }

  // License plate pattern
  const plateMatch = message.match(/[A-Z]{2,3}[- ]?\d{3,4}/i);
  if (plateMatch) {
    entities.licensePlate = plateMatch[0].toUpperCase();
  }

  // Date patterns (MM/DD/YYYY or YYYY-MM-DD)
  const dateMatch = message.match(/(\d{1,2}\/\d{1,2}\/\d{4}|\d{4}-\d{2}-\d{2})/);
  if (dateMatch) {
    entities.date = dateMatch[0];
  }

  // Phone number pattern
  const phoneMatch = message.match(/\+?(\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  if (phoneMatch) {
    entities.phone = phoneMatch[0];
  }

  // Email pattern
  const emailMatch = message.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  if (emailMatch) {
    entities.email = emailMatch[0].toLowerCase();
  }

  // Amount/money pattern (with currency symbol)
  const amountMatch = message.match(/[¤$]\s*\d+(?:,\d{3})*(?:\.\d{2})?/);
  if (amountMatch) {
    entities.amount = amountMatch[0];
  }

  // Reference number (generic alphanumeric)
  const refMatch = message.match(/ref(?:erence)?[#:\s]*([A-Z0-9]{6,12})/i);
  if (refMatch) {
    entities.referenceNumber = refMatch[1].toUpperCase();
  }

  // District/area detection
  const districtPatterns = ['north', 'south', 'east', 'west', 'central', 'downtown', 'uptown', 'harbor', 'hills', 'valley'];
  for (const district of districtPatterns) {
    if (message.toLowerCase().includes(district)) {
      entities.district = district.charAt(0).toUpperCase() + district.slice(1);
      break;
    }
  }

  return entities;
}

/**
 * Detect user sentiment from message
 * @param {string} message - User message
 * @returns {string} - Sentiment: positive, negative, neutral, frustrated
 */
export function detectSentiment(message) {
  const lower = message.toLowerCase();

  // Frustrated indicators
  const frustratedPatterns = /\b(ugh|argh|frustrated|annoyed|angry|mad|ridiculous|stupid|terrible|awful|worst|hate|useless|waste|sick of|tired of|fed up)\b/i;
  if (frustratedPatterns.test(lower)) {
    return 'frustrated';
  }

  // Negative indicators
  const negativePatterns = /\b(bad|wrong|issue|problem|error|fail|broken|not working|doesn't work|can't|won't|unable|stuck|confused|help)\b/i;
  if (negativePatterns.test(lower)) {
    return 'negative';
  }

  // Positive indicators
  const positivePatterns = /\b(thanks|thank you|great|awesome|perfect|excellent|wonderful|love|appreciate|helpful|good|nice)\b/i;
  if (positivePatterns.test(lower)) {
    return 'positive';
  }

  return 'neutral';
}

/**
 * Detect urgency level from message
 * @param {string} message - User message
 * @returns {string} - Urgency: high, medium, low
 */
export function detectUrgency(message) {
  const lower = message.toLowerCase();

  // High urgency
  const highUrgencyPatterns = /\b(urgent|emergency|asap|immediately|right now|critical|life|death|dying|hurry|quick|fast|today|deadline)\b/i;
  if (highUrgencyPatterns.test(lower) || lower.includes('911') || lower.includes('!')) {
    return 'high';
  }

  // Medium urgency
  const mediumUrgencyPatterns = /\b(soon|need|important|time.?sensitive|waiting|pending|overdue)\b/i;
  if (mediumUrgencyPatterns.test(lower)) {
    return 'medium';
  }

  return 'low';
}
