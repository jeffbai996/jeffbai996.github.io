/**
 * SEO Configuration for GOV.PRAYA
 * Centralized metadata for all pages to improve search engine visibility
 */

const baseURL = 'https://govpraya.org';
const defaultImage = `${baseURL}/icon-512.svg`;
const siteName = 'GOV.PRAYA - Republic of Praya';

export const seoConfig = {
  // Main Portal
  '/': {
    title: 'GOV.PRAYA - Official Government Portal of the Republic of Praya',
    description: 'Access all government services, departments, and information for the Republic of Praya in one unified portal. Pay taxes, apply for permits, check status updates, and more.',
    keywords: 'praya government, government portal, public services, republic of praya, government departments, civic services',
    ogType: 'website',
    image: defaultImage,
  },

  // Information Pages
  '/about': {
    title: 'About Praya - Republic of Praya Government',
    description: 'Learn about the Republic of Praya, its government structure, history, and commitment to serving its citizens through digital innovation.',
    keywords: 'about praya, praya government, republic information, government structure',
    ogType: 'website',
  },
  '/faq': {
    title: 'Frequently Asked Questions - GOV.PRAYA',
    description: 'Find answers to common questions about government services, account management, payments, and accessing Republic of Praya departments.',
    keywords: 'faq, help, questions, government services help, praya support',
    ogType: 'website',
  },

  // Legal Pages
  '/terms': {
    title: 'Terms of Service - GOV.PRAYA',
    description: 'Terms of service for using the Republic of Praya government portal and accessing government services online.',
    keywords: 'terms of service, legal terms, user agreement, government portal terms',
    ogType: 'website',
  },
  '/privacy': {
    title: 'Privacy Policy - GOV.PRAYA',
    description: 'Privacy policy explaining how the Republic of Praya government protects and handles your personal information.',
    keywords: 'privacy policy, data protection, personal information, government privacy',
    ogType: 'website',
  },
  '/cookies': {
    title: 'Cookie Policy - GOV.PRAYA',
    description: 'Information about how cookies are used on the GOV.PRAYA portal to enhance your experience.',
    keywords: 'cookie policy, cookies, website data, tracking',
    ogType: 'website',
  },

  // System Pages
  '/status': {
    title: 'System Status - GOV.PRAYA',
    description: 'Real-time status of all Republic of Praya government services, departments, and system health monitoring.',
    keywords: 'system status, service status, uptime, government services status, outage',
    ogType: 'website',
  },

  // Department Pages
  '/npa': {
    title: 'National Police Agency - GOV.PRAYA',
    description: 'National Police Agency of the Republic of Praya. Report crimes, check police records, apply for clearances, and access public safety services.',
    keywords: 'police, national police agency, crime reporting, police clearance, public safety, law enforcement',
    ogType: 'website',
  },
  '/bop': {
    title: 'Bank of Praya - GOV.PRAYA',
    description: 'Central Bank of Praya. Access monetary policy information, currency exchange rates, financial regulations, and banking services.',
    keywords: 'bank of praya, central bank, monetary policy, currency, exchange rates, financial services',
    ogType: 'website',
  },
  '/ctb': {
    title: 'Cannabis Tax Bureau - GOV.PRAYA',
    description: 'Cannabis Tax Bureau of the Republic of Praya. Licensing, tax compliance, regulations, and services for the legal cannabis industry.',
    keywords: 'cannabis, cannabis tax, cannabis license, marijuana regulation, cannabis bureau',
    ogType: 'website',
  },
  '/doj': {
    title: 'Department of Justice - GOV.PRAYA',
    description: 'Department of Justice of the Republic of Praya. Legal services, court information, case tracking, and justice system resources.',
    keywords: 'justice department, legal services, court, judiciary, legal resources, law',
    ogType: 'website',
  },
  '/interior': {
    title: 'Department of Interior - GOV.PRAYA',
    description: 'Department of Interior managing national parks, land administration, natural resources, and environmental conservation for the Republic of Praya.',
    keywords: 'interior department, national parks, land management, natural resources, conservation, environment',
    ogType: 'website',
  },
  '/transport': {
    title: 'Department of Transport - GOV.PRAYA',
    description: 'Department of Transport for the Republic of Praya. Vehicle registration, driver licenses, public transit, road conditions, and transportation services.',
    keywords: 'transport, transportation, vehicle registration, drivers license, public transit, roads',
    ogType: 'website',
  },
  '/revenue': {
    title: 'Department of Revenue - GOV.PRAYA',
    description: 'Department of Revenue for the Republic of Praya. File taxes, make payments, check refunds, and access tax services online.',
    keywords: 'revenue, tax, taxation, tax filing, tax payment, tax refund, IRS',
    ogType: 'website',
  },
  '/post': {
    title: 'Praya Post - GOV.PRAYA',
    description: 'Official postal service of the Republic of Praya. Track packages, send mail, purchase stamps, and access postal services.',
    keywords: 'post office, postal service, mail, package tracking, stamps, shipping',
    ogType: 'website',
  },
  '/health': {
    title: 'Department of Health - GOV.PRAYA',
    description: 'Department of Health for the Republic of Praya. Health services, vaccination records, medical licenses, and public health information.',
    keywords: 'health department, healthcare, medical services, vaccination, public health, health records',
    ogType: 'website',
  },
  '/housing': {
    title: 'Housing Authority - GOV.PRAYA',
    description: 'Housing Authority of the Republic of Praya. Affordable housing, rental assistance, housing programs, and property services.',
    keywords: 'housing, housing authority, affordable housing, rental assistance, property, real estate',
    ogType: 'website',
  },
  '/cbca': {
    title: 'Customs & Border Control Agency - GOV.PRAYA',
    description: 'Customs and Border Control Agency. Import/export regulations, customs declarations, border services, and trade compliance.',
    keywords: 'customs, border control, import, export, trade, customs declaration, border security',
    ogType: 'website',
  },
  '/lc': {
    title: 'Legislative Council - GOV.PRAYA',
    description: 'Legislative Council of the Republic of Praya. View legislation, contact representatives, track bills, and participate in governance.',
    keywords: 'legislative council, legislature, laws, bills, representatives, government legislation',
    ogType: 'website',
  },
  '/bd': {
    title: 'Buildings Department - GOV.PRAYA',
    description: 'Buildings Department for the Republic of Praya. Building permits, inspections, construction regulations, and architectural approvals.',
    keywords: 'buildings department, building permits, construction, inspections, architecture, development',
    ogType: 'website',
  },
  '/cr': {
    title: 'Companies Registry - GOV.PRAYA',
    description: 'Companies Registry of the Republic of Praya. Business registration, corporate filings, company searches, and commercial services.',
    keywords: 'companies registry, business registration, corporate filing, company search, business services',
    ogType: 'website',
  },
  '/swd': {
    title: 'Social Welfare Department - GOV.PRAYA',
    description: 'Social Welfare Department providing social services, benefits, assistance programs, and support for citizens of the Republic of Praya.',
    keywords: 'social welfare, social services, benefits, assistance, welfare programs, social support',
    ogType: 'website',
  },

  // Special Service Pages
  '/air-quality': {
    title: 'Air Quality Index - GOV.PRAYA',
    description: 'Real-time air quality monitoring for the Republic of Praya. Check current AQI levels, pollution data, and health recommendations.',
    keywords: 'air quality, AQI, air pollution, environmental monitoring, air quality index, pollution levels',
    ogType: 'website',
  },
  '/national-security': {
    title: 'National Security Level - GOV.PRAYA',
    description: 'Current national security threat level and alerts for the Republic of Praya. Stay informed about security status and advisories.',
    keywords: 'national security, security level, threat level, security alerts, emergency alerts',
    ogType: 'website',
  },
  '/weather': {
    title: 'Weather Services - GOV.PRAYA',
    description: 'Official weather forecasts, conditions, and meteorological services for the Republic of Praya.',
    keywords: 'weather, forecast, weather services, meteorology, climate, weather conditions',
    ogType: 'website',
  },

  // User Pages
  '/login': {
    title: 'Login - GOV.PRAYA',
    description: 'Sign in to your GOV.PRAYA account to access personalized government services and manage your profile.',
    keywords: 'login, sign in, account access, user login, government account',
    ogType: 'website',
    noIndex: true, // Don't index authentication pages
  },
  '/register': {
    title: 'Create Account - GOV.PRAYA',
    description: 'Create a new GOV.PRAYA account to access personalized government services for the Republic of Praya.',
    keywords: 'register, sign up, create account, new account, registration',
    ogType: 'website',
    noIndex: true,
  },
  '/forgot-password': {
    title: 'Forgot Password - GOV.PRAYA',
    description: 'Reset your GOV.PRAYA account password securely.',
    keywords: 'forgot password, password reset, account recovery',
    ogType: 'website',
    noIndex: true,
  },
  '/payments': {
    title: 'Payment Services - GOV.PRAYA',
    description: 'Make secure payments for government services, fees, taxes, and fines through the Republic of Praya payment portal.',
    keywords: 'payments, pay online, government payments, fees, secure payment',
    ogType: 'website',
  },
};

/**
 * Get SEO metadata for a specific route
 * @param {string} path - The route path
 * @returns {object} SEO metadata object
 */
export const getSEOConfig = (path) => {
  const config = seoConfig[path] || seoConfig['/'];

  return {
    ...config,
    url: `${baseURL}${path}`,
    siteName,
    image: config.image || defaultImage,
  };
};

/**
 * Default fallback SEO config for routes not explicitly defined
 */
export const defaultSEO = {
  title: 'GOV.PRAYA - Republic of Praya Government Portal',
  description: 'Official government portal for the Republic of Praya. Access all government services and departments.',
  keywords: 'praya, government, government services, public services',
  ogType: 'website',
  url: baseURL,
  siteName,
  image: defaultImage,
};
