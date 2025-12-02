/**
 * Context Builder Service
 * Builds relevant context from department data for Gemini API
 */

/**
 * Builds a focused context based on the user's query
 * This reduces token usage by only including relevant departments
 */
export function buildRelevantContext(userMessage, allDepartmentData) {
  // Keywords to match departments
  const queryLower = userMessage.toLowerCase();

  // Score each department by relevance
  const scoredDepartments = allDepartmentData.map(dept => {
    let score = 0;

    // Check if department name is mentioned
    if (queryLower.includes(dept.name.toLowerCase())) {
      score += 10;
    }

    // Check keywords
    if (dept.keywords) {
      dept.keywords.forEach(keyword => {
        if (queryLower.includes(keyword.toLowerCase())) {
          score += 3;
        }
      });
    }

    // Check services
    if (dept.services) {
      dept.services.forEach(service => {
        if (queryLower.includes(service.toLowerCase())) {
          score += 5;
        }
      });
    }

    return { ...dept, score };
  });

  // Sort by relevance and take top 5 departments
  const relevantDepts = scoredDepartments
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  // If no departments scored above 0, include all (but summarized)
  if (relevantDepts.every(d => d.score === 0)) {
    return allDepartmentData.map(dept => ({
      name: dept.name,
      description: dept.description,
      link: dept.link,
      services: dept.services?.slice(0, 3), // Limit services
      hours: dept.hours,
      contact: dept.contact,
    }));
  }

  return relevantDepts.map(dept => ({
    name: dept.name,
    description: dept.description,
    link: dept.link,
    services: dept.services,
    hours: dept.hours,
    contact: dept.contact,
    keywords: dept.keywords,
  }));
}

/**
 * Formats conversation history for Gemini
 */
export function formatConversationHistory(messages) {
  if (!messages || messages.length === 0) {
    return [];
  }

  // Take last 5 messages for context
  return messages.slice(-5).map(msg => ({
    sender: msg.sender === 'user' ? 'user' : 'bot',
    text: msg.text,
    timestamp: msg.timestamp,
  }));
}

/**
 * Detects if query suggests user needs more complex help
 */
export function detectComplexQuery(message) {
  const complexPatterns = [
    /multiple|several|both|and also/i,
    /what.*difference|compare|versus|vs\./i,
    /explain|how does.*work|what is the process/i,
    /i don't understand|confused|not sure|unclear/i,
    /step by step|detailed|comprehensive/i,
  ];

  return complexPatterns.some(pattern => pattern.test(message));
}

/**
 * Detects frustration or repeated attempts
 */
export function detectFrustration(message, conversationHistory = []) {
  const frustrationKeywords = [
    'frustrated', 'annoying', 'not helping', 'useless',
    'doesn\'t work', 'still don\'t', 'already tried',
    'same thing', 'not what i asked', 'waste of time'
  ];

  const messageLower = message.toLowerCase();
  const hasFrustrationKeyword = frustrationKeywords.some(kw =>
    messageLower.includes(kw)
  );

  // Check for repeated similar messages (indicates user not getting answer)
  const recentUserMessages = conversationHistory
    .filter(m => m.sender === 'user')
    .slice(-3);

  if (recentUserMessages.length >= 2) {
    const currentWords = new Set(messageLower.split(/\s+/));
    const repeatedMessages = recentUserMessages.filter(prevMsg => {
      const prevWords = new Set(prevMsg.text.toLowerCase().split(/\s+/));
      const commonWords = [...currentWords].filter(w => prevWords.has(w));
      return commonWords.length > currentWords.size * 0.5; // 50% overlap
    });

    if (repeatedMessages.length >= 1) {
      return true; // User is repeating similar questions
    }
  }

  return hasFrustrationKeyword;
}

export default {
  buildRelevantContext,
  formatConversationHistory,
  detectComplexQuery,
  detectFrustration,
};
