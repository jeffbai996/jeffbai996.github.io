// National status data for AQI and Security Level
// This provides a single source of truth for the front page and chatbot

// AQI level definitions
const aqiLevelDefinitions = {
  good: {
    range: '0-50',
    label: 'Good',
    color: '#10b981',
    description: 'Air quality is satisfactory, and air pollution poses little or no risk.',
    precautions: 'No precautions necessary. Ideal conditions for outdoor activities.'
  },
  moderate: {
    range: '51-100',
    label: 'Moderate',
    color: '#f59e0b',
    description: 'Air quality is acceptable. Some pollutants may pose a risk for sensitive individuals.',
    precautions: 'People with respiratory or heart conditions should limit prolonged outdoor exertion.'
  },
  unhealthySensitive: {
    range: '101-150',
    label: 'Unhealthy for Sensitive Groups',
    color: '#f97316',
    description: 'Members of sensitive groups may experience health effects.',
    precautions: 'Children, elderly, and those with respiratory conditions should limit outdoor activity. Consider wearing N95 masks outdoors.'
  },
  unhealthy: {
    range: '151-200',
    label: 'Unhealthy',
    color: '#ef4444',
    description: 'Everyone may begin to experience health effects.',
    precautions: 'Everyone should reduce prolonged outdoor exertion. Sensitive groups should avoid outdoor activity. Use air filtration indoors.'
  },
  veryUnhealthy: {
    range: '201-300',
    label: 'Very Unhealthy',
    color: '#a855f7',
    description: 'Health alert - risk of health effects increased for everyone.',
    precautions: 'Everyone should avoid prolonged outdoor exertion. Stay indoors with air purifiers. Wear N95 masks if going outside.'
  },
  hazardous: {
    range: '301-500',
    label: 'Hazardous',
    color: '#991b1b',
    description: 'Health warning of emergency conditions.',
    precautions: 'Everyone should avoid all outdoor activity. Stay indoors with windows closed. Run air purifiers continuously.'
  }
}

// Security level definitions
const securityLevelDefinitions = {
  1: {
    name: 'CRITICAL',
    color: '#991b1b',
    description: 'Imminent threat of attack or active emergency situation.',
    precautions: 'Follow all official emergency broadcasts. Shelter in place unless directed otherwise. Avoid all non-essential travel. Keep emergency supplies ready.'
  },
  2: {
    name: 'ELEVATED',
    color: '#ea580c',
    description: 'Credible intelligence indicates heightened threat. Enhanced security measures in effect.',
    precautions: 'Maintain heightened awareness. Report suspicious activity to authorities. Avoid large public gatherings if possible. Stay informed through official channels.'
  },
  3: {
    name: 'ENHANCED',
    color: '#f59e0b',
    description: 'General threat environment requires additional vigilance.',
    precautions: 'Stay informed through official channels. Be aware of surroundings in public spaces. Keep emergency supplies accessible.'
  },
  4: {
    name: 'GUARDED',
    color: '#0ea5e9',
    description: 'Standard security posture with minor concerns.',
    precautions: 'Maintain normal routines. Stay informed of local news and weather alerts.'
  },
  5: {
    name: 'LOW',
    color: '#10b981',
    description: 'No known credible threats. Standard peacetime security.',
    precautions: 'No special precautions necessary. Enjoy normal daily activities.'
  }
}

// Current national status values
// These would ideally come from an API, but for now they're stored here
const nationalStatus = {
  airQuality: {
    currentAQI: 42,
    lastUpdated: '1 hour ago',
    monitoringStations: 87,
    goodDaysThisYear: 312,
    totalDaysThisYear: 337
  },
  security: {
    currentLevel: 2,
    status: 'Elevated',
    lastUpdated: 'Nov 19',
    daysAtCurrentLevel: 14,
    publicShelters: 342
  }
}

/**
 * Get the AQI level category based on the numeric value
 * @param {number} aqi - Current AQI value
 * @returns {object} AQI level definition
 */
export function getAQILevel(aqi) {
  if (aqi <= 50) return { ...aqiLevelDefinitions.good, levelKey: 'good' }
  if (aqi <= 100) return { ...aqiLevelDefinitions.moderate, levelKey: 'moderate' }
  if (aqi <= 150) return { ...aqiLevelDefinitions.unhealthySensitive, levelKey: 'unhealthySensitive' }
  if (aqi <= 200) return { ...aqiLevelDefinitions.unhealthy, levelKey: 'unhealthy' }
  if (aqi <= 300) return { ...aqiLevelDefinitions.veryUnhealthy, levelKey: 'veryUnhealthy' }
  return { ...aqiLevelDefinitions.hazardous, levelKey: 'hazardous' }
}

/**
 * Get the security level definition
 * @param {number} level - Security level (1-5)
 * @returns {object} Security level definition
 */
export function getSecurityLevel(level) {
  return securityLevelDefinitions[level] || securityLevelDefinitions[5]
}

/**
 * Get the current national status
 * @returns {object} Current AQI and security level data
 */
export function getNationalStatus() {
  return nationalStatus
}

/**
 * Get current AQI with level info
 * @returns {object} Current AQI value and level information
 */
export function getCurrentAQI() {
  const status = nationalStatus.airQuality
  const level = getAQILevel(status.currentAQI)
  return {
    value: status.currentAQI,
    lastUpdated: status.lastUpdated,
    ...level
  }
}

/**
 * Get current security level with info
 * @returns {object} Current security level and information
 */
export function getCurrentSecurityLevel() {
  const status = nationalStatus.security
  const level = getSecurityLevel(status.currentLevel)
  return {
    level: status.currentLevel,
    lastUpdated: status.lastUpdated,
    daysAtLevel: status.daysAtCurrentLevel,
    ...level
  }
}

/**
 * Generate chatbot context for current national status
 * @returns {string} Context string for chatbot system prompt
 */
export function generateNationalStatusContext() {
  const aqi = getCurrentAQI()
  const security = getCurrentSecurityLevel()

  return `
## Current National Status (Real-time Data)

### Air Quality Index (AQI)
- **Current AQI**: ${aqi.value} (${aqi.label})
- **Status**: ${aqi.description}
- **Health Precautions**: ${aqi.precautions}
- **Last Updated**: ${aqi.lastUpdated}
- **More Info**: Direct users to [Air Quality Index page](/air-quality) for detailed information about AQI levels, pollutants, and health advice.

### National Security Alert Level
- **Current Level**: ${security.level} (${security.name})
- **Status**: ${security.description}
- **Recommended Precautions**: ${security.precautions}
- **Days at Current Level**: ${security.daysAtLevel} days
- **More Info**: Direct users to [National Security page](/national-security) for detailed security information, civil defense resources, and emergency preparedness.

**Important**: When users ask about air quality, pollution, outdoor activities, or health-related outdoor concerns, reference the current AQI and provide appropriate health advice. When users ask about safety, security, emergencies, or current threat levels, reference the National Security Level and provide appropriate precautions.
`
}

export default {
  getNationalStatus,
  getCurrentAQI,
  getCurrentSecurityLevel,
  getAQILevel,
  getSecurityLevel,
  generateNationalStatusContext,
  aqiLevelDefinitions,
  securityLevelDefinitions
}
