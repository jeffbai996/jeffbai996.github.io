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
    // Greetings - expanded variations
    {
      keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'greetings', 'howdy', 'sup', 'yo', 'hola', 'aloha', 'heya', 'hiya', 'whats up', "what's up", 'wassup'],
      response: "Hello there! 👋 Welcome to Praya Citizen Services. I'm your friendly AI assistant, here to help you navigate all government services quickly and easily.\n\nI can assist with:\n• **Taxes & Revenue** - Filing, payments, business accounts\n• **IDs & Passports** - Applications, renewals, requirements\n• **Police Services** - Emergency contacts, clearances, reporting\n• **Legal & Courts** - Court services, case lookup, legal aid\n• **Banking** - Bank of Praya services and information\n• **Healthcare** - Public health services and licensing\n• **Housing** - Affordable housing applications\n• **Postal Services** - Shipping, tracking, P.O. boxes\n• **Cannabis Licensing** - Dispensary and cultivation permits\n• **Transport** - Driver licenses, vehicle registration\n• **Customs & Border** - Import/export, travel requirements\n• **Legislative Council** - Bills, representatives, voting\n\nWhat can I help you with today?"
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

// Export utility functions for use in ChatWidget
export { containsProfanity, isUnintelligible };
