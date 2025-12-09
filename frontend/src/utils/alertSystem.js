/**
 * Emergency Alert System
 * Manages government alerts, warnings, and critical announcements
 */

// Alert severity levels with associated styling
export const ALERT_SEVERITY = {
  CRITICAL: {
    level: 'critical',
    label: 'Emergency',
    color: '#dc2626',
    bgColor: 'rgba(220, 38, 38, 0.15)',
    borderColor: 'rgba(220, 38, 38, 0.4)',
    icon: 'emergency'
  },
  WARNING: {
    level: 'warning',
    label: 'Warning',
    color: '#f59e0b',
    bgColor: 'rgba(245, 158, 11, 0.12)',
    borderColor: 'rgba(245, 158, 11, 0.35)',
    icon: 'warning'
  },
  INFO: {
    level: 'info',
    label: 'Notice',
    color: '#3b82f6',
    bgColor: 'rgba(59, 130, 246, 0.1)',
    borderColor: 'rgba(59, 130, 246, 0.3)',
    icon: 'info'
  },
  SUCCESS: {
    level: 'success',
    label: 'Update',
    color: '#10b981',
    bgColor: 'rgba(16, 185, 129, 0.1)',
    borderColor: 'rgba(16, 185, 129, 0.3)',
    icon: 'success'
  }
};

// Alert categories
export const ALERT_CATEGORY = {
  WEATHER: 'weather',
  PUBLIC_SAFETY: 'public_safety',
  HEALTH: 'health',
  TRANSPORT: 'transport',
  SERVICE: 'service',
  GOVERNMENT: 'government'
};

// Sample active alerts - in production this would come from an API
const activeAlerts = [
  {
    id: 'alert-winter-storm-2025',
    severity: ALERT_SEVERITY.WARNING,
    category: ALERT_CATEGORY.WEATHER,
    title: 'Winter Weather Advisory',
    message: 'Heavy snowfall expected across Metropolitan District and Downtown from Dec 10-12. Government offices may operate on reduced hours. Check transport.praya.gov for transit updates.',
    department: 'National Weather Service',
    timestamp: new Date('2025-12-09T08:00:00'),
    expiresAt: new Date('2025-12-12T23:59:59'),
    dismissible: true,
    link: '/transport',
    linkText: 'View Transit Updates'
  }
];

// Non-active alerts for demo purposes (can be activated)
const scheduledAlerts = [
  {
    id: 'alert-tax-deadline-2026',
    severity: ALERT_SEVERITY.INFO,
    category: ALERT_CATEGORY.GOVERNMENT,
    title: 'Tax Filing Season Opens January 15',
    message: 'Revenue Department reminds all citizens that 2025 tax returns are due by April 15, 2026. Early filers may receive refunds within 10 business days.',
    department: 'Revenue Department',
    timestamp: new Date('2025-12-01T00:00:00'),
    expiresAt: new Date('2026-01-31T23:59:59'),
    dismissible: true,
    link: '/revenue',
    linkText: 'File Your Taxes'
  },
  {
    id: 'alert-system-maintenance',
    severity: ALERT_SEVERITY.INFO,
    category: ALERT_CATEGORY.SERVICE,
    title: 'Scheduled Maintenance: December 15',
    message: 'GOV.PRAYA online services will undergo scheduled maintenance from 2:00 AM to 6:00 AM on December 15. Some services may be temporarily unavailable.',
    department: 'Digital Services',
    timestamp: new Date('2025-12-09T00:00:00'),
    expiresAt: new Date('2025-12-15T06:00:00'),
    dismissible: true,
    link: null,
    linkText: null
  }
];

/**
 * Get all currently active alerts
 * Filters by expiration and activation time
 */
export function getActiveAlerts() {
  const now = new Date();
  return activeAlerts.filter(alert => {
    const isActive = alert.timestamp <= now;
    const notExpired = alert.expiresAt > now;
    return isActive && notExpired;
  });
}

/**
 * Get alerts by category
 */
export function getAlertsByCategory(category) {
  return getActiveAlerts().filter(alert => alert.category === category);
}

/**
 * Get alerts by severity level
 */
export function getAlertsBySeverity(severityLevel) {
  return getActiveAlerts().filter(alert => alert.severity.level === severityLevel);
}

/**
 * Get the most critical active alert
 */
export function getMostCriticalAlert() {
  const alerts = getActiveAlerts();
  if (alerts.length === 0) return null;

  // Priority order: critical > warning > info > success
  const priorityOrder = ['critical', 'warning', 'info', 'success'];

  return alerts.sort((a, b) => {
    return priorityOrder.indexOf(a.severity.level) - priorityOrder.indexOf(b.severity.level);
  })[0];
}

/**
 * Check if user has dismissed an alert (using localStorage)
 */
export function isAlertDismissed(alertId) {
  try {
    const dismissed = JSON.parse(localStorage.getItem('dismissedAlerts') || '{}');
    return !!dismissed[alertId];
  } catch {
    return false;
  }
}

/**
 * Dismiss an alert (store in localStorage)
 */
export function dismissAlert(alertId) {
  try {
    const dismissed = JSON.parse(localStorage.getItem('dismissedAlerts') || '{}');
    dismissed[alertId] = Date.now();
    localStorage.setItem('dismissedAlerts', JSON.stringify(dismissed));
    return true;
  } catch {
    return false;
  }
}

/**
 * Clear old dismissed alerts (older than 30 days)
 */
export function cleanupDismissedAlerts() {
  try {
    const dismissed = JSON.parse(localStorage.getItem('dismissedAlerts') || '{}');
    const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);

    const cleaned = Object.entries(dismissed)
      .filter(([, timestamp]) => timestamp > thirtyDaysAgo)
      .reduce((acc, [id, timestamp]) => {
        acc[id] = timestamp;
        return acc;
      }, {});

    localStorage.setItem('dismissedAlerts', JSON.stringify(cleaned));
  } catch {
    // Silently fail
  }
}

/**
 * Format alert timestamp for display
 */
export function formatAlertTime(date) {
  const now = new Date();
  const diff = now - date;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);

  if (hours < 1) return 'Just now';
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
  });
}

/**
 * Get alert icon SVG path based on type
 */
export function getAlertIconPath(iconType) {
  switch (iconType) {
    case 'emergency':
      return 'M12 9v4m0 4h.01M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z';
    case 'warning':
      return 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z';
    case 'info':
      return 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z';
    case 'success':
      return 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z';
    default:
      return 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z';
  }
}
