/**
 * Predictive Suggestions Engine
 *
 * Intelligently predicts what users might ask next based on:
 * - Current conversation context
 * - Common user journeys and patterns
 * - Service dependencies and workflows
 * - Time-sensitive information
 * - User behavior patterns
 */

import { extractTopics, detectSentiment, extractEntities } from './intentRecognition';

/**
 * Service dependency graph - what services commonly lead to others
 */
const serviceDependencies = {
  'national-id': {
    prerequisites: [],
    commonNextSteps: ['passport', 'driver-license', 'bank-account', 'health-insurance'],
    relatedServices: ['birth-certificate', 'address-change'],
    weight: 0.9
  },
  'passport': {
    prerequisites: ['national-id'],
    commonNextSteps: ['visa', 'travel-insurance', 'customs-info'],
    relatedServices: ['expedited-passport', 'passport-renewal'],
    weight: 0.8
  },
  'driver-license': {
    prerequisites: ['national-id', 'vision-test'],
    commonNextSteps: ['vehicle-registration', 'car-insurance', 'parking-permit'],
    relatedServices: ['driving-test', 'license-renewal', 'international-license'],
    weight: 0.85
  },
  'vehicle-registration': {
    prerequisites: ['driver-license'],
    commonNextSteps: ['car-insurance', 'emissions-test', 'parking-permit'],
    relatedServices: ['title-transfer', 'registration-renewal'],
    weight: 0.75
  },
  'tax-filing': {
    prerequisites: [],
    commonNextSteps: ['refund-status', 'payment-plan', 'deduction-info'],
    relatedServices: ['business-taxes', 'tax-extension'],
    weight: 0.9
  },
  'police-report': {
    prerequisites: [],
    commonNextSteps: ['case-status', 'victim-services', 'insurance-claim'],
    relatedServices: ['police-clearance', 'legal-aid'],
    weight: 0.7
  },
  'health-insurance': {
    prerequisites: ['national-id'],
    commonNextSteps: ['find-doctor', 'prescription-coverage', 'dental-vision'],
    relatedServices: ['vaccination', 'specialist-referral'],
    weight: 0.85
  },
  'housing-application': {
    prerequisites: ['national-id', 'income-verification'],
    commonNextSteps: ['waitlist-status', 'rental-assistance', 'tenant-rights'],
    relatedServices: ['emergency-housing', 'section-8'],
    weight: 0.8
  },
  'business-registration': {
    prerequisites: ['national-id'],
    commonNextSteps: ['tax-id', 'business-license', 'employer-registration'],
    relatedServices: ['trademark', 'business-banking'],
    weight: 0.75
  },
  'cannabis-license': {
    prerequisites: ['business-registration', 'background-check'],
    commonNextSteps: ['tax-filing', 'compliance-info', 'renewal'],
    relatedServices: ['cultivation-permit', 'dispensary-license'],
    weight: 0.7
  }
};

/**
 * Common user journeys - multi-step processes users typically complete
 */
const userJourneys = {
  'new-resident': {
    name: 'New Resident Setup',
    steps: [
      { service: 'national-id', description: 'Get your National ID' },
      { service: 'driver-license', description: 'Transfer or get driver license' },
      { service: 'health-insurance', description: 'Enroll in health coverage' },
      { service: 'voter-registration', description: 'Register to vote' }
    ],
    triggers: ['new to praya', 'just moved', 'new resident', 'relocated']
  },
  'first-time-driver': {
    name: 'First-Time Driver',
    steps: [
      { service: 'learner-permit', description: 'Get learner permit' },
      { service: 'driving-practice', description: 'Complete practice hours' },
      { service: 'driving-test', description: 'Pass road test' },
      { service: 'driver-license', description: 'Receive license' },
      { service: 'vehicle-registration', description: 'Register your vehicle' }
    ],
    triggers: ['learn to drive', 'first license', 'new driver', 'driving lessons']
  },
  'start-business': {
    name: 'Starting a Business',
    steps: [
      { service: 'business-name', description: 'Reserve business name' },
      { service: 'business-registration', description: 'Register your company' },
      { service: 'tax-id', description: 'Get Tax ID number' },
      { service: 'business-license', description: 'Obtain licenses/permits' },
      { service: 'business-banking', description: 'Open business account' }
    ],
    triggers: ['start business', 'open company', 'entrepreneur', 'self-employed']
  },
  'international-travel': {
    name: 'International Travel Prep',
    steps: [
      { service: 'passport', description: 'Get/renew passport' },
      { service: 'visa', description: 'Check visa requirements' },
      { service: 'travel-vaccines', description: 'Get required vaccinations' },
      { service: 'customs-info', description: 'Review customs regulations' }
    ],
    triggers: ['travel abroad', 'international trip', 'going overseas', 'vacation abroad']
  },
  'tax-season': {
    name: 'Tax Filing Journey',
    steps: [
      { service: 'gather-documents', description: 'Collect W-2s and 1099s' },
      { service: 'tax-filing', description: 'File your return' },
      { service: 'refund-status', description: 'Track your refund' }
    ],
    triggers: ['file taxes', 'tax season', 'tax return', 'owe taxes']
  },
  'crime-victim': {
    name: 'Crime Victim Support',
    steps: [
      { service: 'police-report', description: 'File police report' },
      { service: 'case-status', description: 'Track your case' },
      { service: 'victim-services', description: 'Access victim support' },
      { service: 'insurance-claim', description: 'File insurance claim' }
    ],
    triggers: ['robbed', 'stolen', 'crime victim', 'burglarized']
  }
};

/**
 * Time-sensitive deadlines and reminders
 */
const timeBasedSuggestions = {
  january: [
    { text: 'Tax documents arriving soon (W-2s due Jan 31)', query: 'tax filing preparation' },
    { text: 'Health insurance coverage started', query: 'health insurance info' }
  ],
  february: [
    { text: 'Start gathering tax documents', query: 'what documents for taxes' },
    { text: 'Check refund status from early filing', query: 'tax refund status' }
  ],
  march: [
    { text: 'Tax deadline approaching (April 15)', query: 'file taxes now' },
    { text: 'Vehicle registration renewal coming?', query: 'renew vehicle registration' }
  ],
  april: [
    { text: 'Tax deadline April 15!', query: 'file taxes urgent', priority: 'high' },
    { text: 'Need a tax extension?', query: 'tax extension' }
  ],
  november: [
    { text: 'Health insurance open enrollment started!', query: 'health insurance enrollment', priority: 'high' },
    { text: 'Compare health plans before Dec 31', query: 'compare health plans' }
  ],
  december: [
    { text: 'Last chance: Health insurance enrollment ends Dec 31', query: 'enroll health insurance', priority: 'high' },
    { text: 'Year-end tax planning tips', query: 'tax planning tips' }
  ]
};

/**
 * Contextual prediction based on recent conversation
 */
const contextualPredictions = {
  // After discussing documents
  documents: [
    { text: 'Check application status', query: 'check application status' },
    { text: 'What documents do I need?', query: 'required documents checklist' },
    { text: 'How long will processing take?', query: 'processing time' }
  ],
  // After discussing fees
  fees: [
    { text: 'Payment methods accepted', query: 'payment methods' },
    { text: 'Fee waiver options', query: 'fee waiver eligibility' },
    { text: 'Set up payment plan', query: 'payment plan options' }
  ],
  // After discussing applications
  applications: [
    { text: 'Track my application', query: 'track application status' },
    { text: 'What to expect next', query: 'application next steps' },
    { text: 'How to expedite', query: 'expedited processing' }
  ],
  // After discussing errors/problems
  problems: [
    { text: 'Speak with a representative', query: 'contact customer service' },
    { text: 'File a complaint', query: 'how to file complaint' },
    { text: 'Try a different approach', query: 'alternative options' }
  ]
};

/**
 * Generate predictions based on last intent
 */
const intentBasedPredictions = {
  applyId: [
    { text: 'Check ID application status', query: 'check id application status' },
    { text: 'While waiting, get a passport', query: 'apply for passport' },
    { text: 'Update my address', query: 'change address on id' }
  ],
  applyPassport: [
    { text: 'Track passport application', query: 'track passport status' },
    { text: 'Visa requirements for travel', query: 'visa requirements' },
    { text: 'Expedited passport options', query: 'expedited passport' }
  ],
  fileTaxes: [
    { text: 'Track my refund', query: 'where is my tax refund' },
    { text: 'Common deductions to claim', query: 'tax deductions' },
    { text: 'Set up estimated payments', query: 'quarterly tax payments' }
  ],
  driverLicense: [
    { text: 'Schedule driving test', query: 'schedule driving test' },
    { text: 'Study the driver handbook', query: 'driver handbook' },
    { text: 'Register my vehicle', query: 'vehicle registration' }
  ],
  reportCrime: [
    { text: 'Track my case status', query: 'check case status' },
    { text: 'Victim support services', query: 'victim assistance' },
    { text: 'File insurance claim', query: 'file insurance claim for theft' }
  ],
  healthInsurance: [
    { text: 'Find a doctor', query: 'find healthcare provider' },
    { text: 'Check my coverage', query: 'what does my plan cover' },
    { text: 'Add a dependent', query: 'add family member to insurance' }
  ],
  housingApplication: [
    { text: 'Check waitlist position', query: 'housing waitlist status' },
    { text: 'Emergency housing help', query: 'emergency housing assistance' },
    { text: 'Know my tenant rights', query: 'tenant rights' }
  ],
  trackPackage: [
    { text: 'Report missing package', query: 'package not delivered' },
    { text: 'Redirect delivery', query: 'change delivery address' },
    { text: 'File shipping claim', query: 'damaged package claim' }
  ]
};

/**
 * Main prediction function
 * @param {object} context - Conversation context
 * @returns {array} - Array of prediction objects
 */
export function generatePredictiveSuggestions(context = {}) {
  const predictions = [];
  const seen = new Set();

  const addPrediction = (prediction, source, priority = 'normal') => {
    const key = prediction.query || prediction.text;
    if (!seen.has(key)) {
      seen.add(key);
      predictions.push({
        ...prediction,
        source,
        priority: prediction.priority || priority
      });
    }
  };

  // 1. Time-based predictions (always show relevant ones)
  const currentMonth = new Date().toLocaleString('default', { month: 'long' }).toLowerCase();
  if (timeBasedSuggestions[currentMonth]) {
    timeBasedSuggestions[currentMonth].forEach(p =>
      addPrediction(p, 'time-based', p.priority || 'normal')
    );
  }

  // 2. Intent-based predictions (most relevant)
  if (context.lastIntent && intentBasedPredictions[context.lastIntent]) {
    intentBasedPredictions[context.lastIntent].forEach(p =>
      addPrediction(p, 'intent-based', 'high')
    );
  }

  // 3. Journey detection
  const message = context.lastMessage?.toLowerCase() || '';
  for (const [journeyId, journey] of Object.entries(userJourneys)) {
    if (journey.triggers.some(trigger => message.includes(trigger))) {
      // Find current step in journey
      const currentStep = journey.steps.findIndex(step =>
        message.includes(step.service.replace('-', ' '))
      );

      // Suggest next steps in the journey
      const nextSteps = journey.steps.slice(currentStep + 1, currentStep + 3);
      nextSteps.forEach(step => {
        addPrediction(
          { text: step.description, query: step.service.replace('-', ' ') },
          `journey:${journeyId}`,
          'medium'
        );
      });
    }
  }

  // 4. Service dependency predictions
  if (context.currentService) {
    const deps = serviceDependencies[context.currentService];
    if (deps) {
      // Prerequisites not yet completed
      deps.prerequisites.forEach(prereq => {
        if (!context.completedServices?.includes(prereq)) {
          addPrediction(
            { text: `First, you may need: ${prereq.replace('-', ' ')}`, query: prereq.replace('-', ' ') },
            'prerequisite',
            'high'
          );
        }
      });

      // Common next steps
      deps.commonNextSteps.slice(0, 2).forEach(next => {
        addPrediction(
          { text: `Often needed next: ${next.replace('-', ' ')}`, query: next.replace('-', ' ') },
          'next-step'
        );
      });
    }
  }

  // 5. Contextual predictions based on conversation topics
  if (context.discussedTopics) {
    for (const topic of context.discussedTopics) {
      if (contextualPredictions[topic]) {
        contextualPredictions[topic].slice(0, 1).forEach(p =>
          addPrediction(p, `context:${topic}`)
        );
      }
    }
  }

  // 6. Sentiment-based predictions
  if (context.sentiment === 'frustrated') {
    addPrediction(
      { text: 'Talk to a representative', query: 'contact customer service' },
      'sentiment',
      'high'
    );
    addPrediction(
      { text: 'File a complaint', query: 'how to file complaint' },
      'sentiment'
    );
  }

  // 7. Entity-based predictions
  if (context.entities) {
    if (context.entities.caseNumber) {
      addPrediction(
        { text: 'Check case status', query: `status of case ${context.entities.caseNumber}` },
        'entity'
      );
    }
    if (context.entities.trackingNumber) {
      addPrediction(
        { text: 'Track your package', query: `track ${context.entities.trackingNumber}` },
        'entity'
      );
    }
  }

  // Sort by priority and return top suggestions
  const priorityOrder = { high: 0, medium: 1, normal: 2, low: 3 };
  return predictions
    .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
    .slice(0, 4);
}

/**
 * Detect user journey from conversation
 */
export function detectUserJourney(messages) {
  const allText = messages.map(m => m.text?.toLowerCase() || '').join(' ');

  for (const [journeyId, journey] of Object.entries(userJourneys)) {
    const matchingTriggers = journey.triggers.filter(trigger => allText.includes(trigger));
    if (matchingTriggers.length > 0) {
      // Determine current step
      let currentStepIndex = -1;
      for (let i = journey.steps.length - 1; i >= 0; i--) {
        if (allText.includes(journey.steps[i].service.replace('-', ' '))) {
          currentStepIndex = i;
          break;
        }
      }

      return {
        journeyId,
        journeyName: journey.name,
        currentStep: currentStepIndex,
        totalSteps: journey.steps.length,
        completedSteps: journey.steps.slice(0, currentStepIndex + 1),
        remainingSteps: journey.steps.slice(currentStepIndex + 1),
        progress: currentStepIndex >= 0 ? ((currentStepIndex + 1) / journey.steps.length) * 100 : 0
      };
    }
  }

  return null;
}

/**
 * Generate journey progress message
 */
export function getJourneyProgressMessage(journey) {
  if (!journey) return null;

  if (journey.currentStep === -1) {
    return `Starting your ${journey.journeyName} journey! First step: ${journey.remainingSteps[0]?.description}`;
  }

  if (journey.remainingSteps.length === 0) {
    return `Congratulations! You've completed all steps in your ${journey.journeyName} journey.`;
  }

  return `${journey.journeyName}: ${Math.round(journey.progress)}% complete. Next: ${journey.remainingSteps[0]?.description}`;
}

/**
 * Get service prerequisites
 */
export function getPrerequisites(serviceId) {
  const normalized = serviceId.toLowerCase().replace(/\s+/g, '-');
  return serviceDependencies[normalized]?.prerequisites || [];
}

/**
 * Get common next steps for a service
 */
export function getNextSteps(serviceId) {
  const normalized = serviceId.toLowerCase().replace(/\s+/g, '-');
  return serviceDependencies[normalized]?.commonNextSteps || [];
}

/**
 * Check for time-sensitive deadlines
 */
export function getTimeSensitiveAlerts() {
  const now = new Date();
  const month = now.toLocaleString('default', { month: 'long' }).toLowerCase();
  const day = now.getDate();

  const alerts = [];

  // Tax deadline warning (April 1-15)
  if (month === 'april' && day <= 15) {
    alerts.push({
      type: 'deadline',
      urgency: day >= 10 ? 'critical' : 'high',
      message: `Tax deadline April 15! ${15 - day} days remaining.`,
      action: 'file taxes now'
    });
  }

  // Health insurance enrollment (Nov 1 - Dec 31)
  if (month === 'november' || month === 'december') {
    const daysLeft = month === 'december' ? 31 - day : 30 - day + 31;
    alerts.push({
      type: 'enrollment',
      urgency: daysLeft <= 7 ? 'critical' : 'high',
      message: `Health insurance open enrollment: ${daysLeft} days left!`,
      action: 'enroll in health insurance'
    });
  }

  return alerts;
}

/**
 * Analyze message for prediction context
 */
export function analyzeForPredictions(message, conversationHistory = []) {
  const topics = extractTopics(message);
  const sentiment = detectSentiment(message);
  const entities = extractEntities(message);

  // Detect discussion topics from conversation
  const discussedTopics = [];
  const allText = [message, ...conversationHistory.map(m => m.text || '')].join(' ').toLowerCase();

  if (allText.includes('document') || allText.includes('papers') || allText.includes('form')) {
    discussedTopics.push('documents');
  }
  if (allText.includes('fee') || allText.includes('cost') || allText.includes('pay') || allText.includes('price')) {
    discussedTopics.push('fees');
  }
  if (allText.includes('apply') || allText.includes('application') || allText.includes('submit')) {
    discussedTopics.push('applications');
  }
  if (allText.includes('error') || allText.includes('problem') || allText.includes('issue') || allText.includes('not working')) {
    discussedTopics.push('problems');
  }

  return {
    topics,
    sentiment,
    entities,
    discussedTopics,
    lastMessage: message
  };
}

export default {
  generatePredictiveSuggestions,
  detectUserJourney,
  getJourneyProgressMessage,
  getPrerequisites,
  getNextSteps,
  getTimeSensitiveAlerts,
  analyzeForPredictions
};
