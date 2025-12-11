/**
 * Emergency Alert System
 * Manages government alerts, warnings, and critical announcements
 * Supports both Supabase (persistent) and localStorage (fallback) storage
 */

import { supabase, isSupabaseConfigured } from './supabaseClient';

// Storage key for admin-managed alerts
const ALERTS_STORAGE_KEY = 'govpraya_alerts';
const SUPABASE_TABLE = 'emergency_alerts';

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

// Category display names
export const CATEGORY_LABELS = {
  weather: 'Weather',
  public_safety: 'Public Safety',
  health: 'Health',
  transport: 'Transport',
  service: 'Service',
  government: 'Government'
};

// Alert templates for quick creation
export const ALERT_TEMPLATES = [
  {
    id: 'weather-storm',
    name: 'Severe Weather',
    severityKey: 'WARNING',
    category: 'weather',
    title: 'Severe Weather Warning',
    message: 'Severe weather conditions expected. Citizens are advised to stay indoors and monitor official channels for updates.',
    department: 'National Weather Service',
    link: '/transport',
    linkText: 'View Transit Updates'
  },
  {
    id: 'weather-heat',
    name: 'Heat Advisory',
    severityKey: 'WARNING',
    category: 'weather',
    title: 'Extreme Heat Advisory',
    message: 'Dangerously high temperatures expected. Stay hydrated, avoid outdoor activities during peak hours, and check on elderly neighbors.',
    department: 'National Weather Service',
    link: '/health',
    linkText: 'Health Guidelines'
  },
  {
    id: 'public-safety-emergency',
    name: 'Public Safety Emergency',
    severityKey: 'CRITICAL',
    category: 'public_safety',
    title: 'Public Safety Alert',
    message: 'An emergency situation is in progress. Follow instructions from local authorities and emergency services.',
    department: 'National Police Agency',
    link: '/npa',
    linkText: 'Emergency Information'
  },
  {
    id: 'public-safety-evacuation',
    name: 'Evacuation Order',
    severityKey: 'CRITICAL',
    category: 'public_safety',
    title: 'Mandatory Evacuation Order',
    message: 'Immediate evacuation required for specified areas. Proceed to designated evacuation centers.',
    department: 'National Emergency Management',
    link: '/npa',
    linkText: 'Evacuation Routes'
  },
  {
    id: 'health-outbreak',
    name: 'Health Advisory',
    severityKey: 'WARNING',
    category: 'health',
    title: 'Public Health Advisory',
    message: 'A health advisory has been issued. Please follow recommended precautions and consult healthcare providers if symptomatic.',
    department: 'Department of Health',
    link: '/health',
    linkText: 'Health Information'
  },
  {
    id: 'transport-closure',
    name: 'Transport Disruption',
    severityKey: 'INFO',
    category: 'transport',
    title: 'Transport Service Disruption',
    message: 'Transit services are experiencing disruptions. Check for alternative routes and allow extra travel time.',
    department: 'Transport Department',
    link: '/transport',
    linkText: 'Service Status'
  },
  {
    id: 'service-maintenance',
    name: 'System Maintenance',
    severityKey: 'INFO',
    category: 'service',
    title: 'Scheduled System Maintenance',
    message: 'GOV.PRAYA online services will undergo scheduled maintenance. Some services may be temporarily unavailable.',
    department: 'Digital Services',
    link: null,
    linkText: null
  },
  {
    id: 'government-announcement',
    name: 'Government Announcement',
    severityKey: 'INFO',
    category: 'government',
    title: 'Government Announcement',
    message: 'An important government announcement has been issued. Please review the details.',
    department: 'Office of the Chief Executive',
    link: '/lc',
    linkText: 'Read Announcement'
  },
  {
    id: 'tax-deadline',
    name: 'Tax Deadline Reminder',
    severityKey: 'INFO',
    category: 'government',
    title: 'Tax Filing Deadline Approaching',
    message: 'The deadline for tax filing is approaching. File your returns before the deadline to avoid penalties.',
    department: 'Revenue Department',
    link: '/revenue',
    linkText: 'File Your Taxes'
  },
  {
    id: 'success-resolved',
    name: 'Issue Resolved',
    severityKey: 'SUCCESS',
    category: 'service',
    title: 'Service Restored',
    message: 'The previously reported issue has been resolved. All services are now operating normally.',
    department: 'Digital Services',
    link: null,
    linkText: null
  }
];

// Default alerts (shown if no admin alerts exist)
const defaultAlerts = [
  {
    id: 'alert-winter-storm-2025',
    severityKey: 'WARNING',
    category: ALERT_CATEGORY.WEATHER,
    title: 'Winter Weather Advisory',
    message: 'Heavy snowfall expected across Metropolitan District and Downtown from Dec 10-12. Government offices may operate on reduced hours. Check transport.praya.gov for transit updates.',
    department: 'National Weather Service',
    timestamp: '2025-12-09T08:00:00',
    expiresAt: '2025-12-12T23:59:59',
    dismissible: true,
    link: '/weather',
    linkText: 'View Weather Details',
    isActive: true
  }
];

/**
 * Check if Supabase alerts table is available
 */
let supabaseAvailable = null;
async function checkSupabaseAvailability() {
  if (supabaseAvailable !== null) return supabaseAvailable;
  if (!isSupabaseConfigured || !supabase) {
    supabaseAvailable = false;
    return false;
  }

  try {
    const { error } = await supabase.from(SUPABASE_TABLE).select('id').limit(1);
    supabaseAvailable = !error;
    return supabaseAvailable;
  } catch {
    supabaseAvailable = false;
    return false;
  }
}

/**
 * Get severity object from key string
 */
export function getSeverityFromKey(key) {
  return ALERT_SEVERITY[key] || ALERT_SEVERITY.INFO;
}

/**
 * Parse stored alert to include severity object
 */
function parseStoredAlert(alert) {
  return {
    ...alert,
    severity: getSeverityFromKey(alert.severityKey || alert.severity_key),
    timestamp: new Date(alert.timestamp || alert.starts_at),
    expiresAt: new Date(alert.expiresAt || alert.expires_at)
  };
}

/**
 * Convert alert to Supabase format
 */
function toSupabaseFormat(alert) {
  return {
    id: alert.id,
    severity_key: alert.severityKey,
    category: alert.category,
    title: alert.title,
    message: alert.message,
    department: alert.department,
    starts_at: alert.timestamp instanceof Date ? alert.timestamp.toISOString() : alert.timestamp,
    expires_at: alert.expiresAt instanceof Date ? alert.expiresAt.toISOString() : alert.expiresAt,
    dismissible: alert.dismissible,
    link: alert.link || null,
    link_text: alert.linkText || null,
    is_active: alert.isActive
  };
}

/**
 * Convert Supabase format to app format
 */
function fromSupabaseFormat(row) {
  return {
    id: row.id,
    severityKey: row.severity_key,
    category: row.category,
    title: row.title,
    message: row.message,
    department: row.department,
    timestamp: row.starts_at,
    expiresAt: row.expires_at,
    dismissible: row.dismissible,
    link: row.link,
    linkText: row.link_text,
    isActive: row.is_active,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

/**
 * Get all alerts from storage (for admin) - ASYNC version
 */
export async function getAllAlertsAsync() {
  const useSupabase = await checkSupabaseAvailability();

  if (useSupabase) {
    try {
      const { data, error } = await supabase
        .from(SUPABASE_TABLE)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data.map(row => parseStoredAlert(fromSupabaseFormat(row)));
    } catch {
      // Fall back to localStorage
    }
  }

  return getAllAlerts();
}

/**
 * Get all alerts from storage (for admin) - SYNC version (localStorage only)
 */
export function getAllAlerts() {
  try {
    const stored = localStorage.getItem(ALERTS_STORAGE_KEY);
    if (stored) {
      const alerts = JSON.parse(stored);
      return alerts.map(parseStoredAlert);
    }
    // Return default alerts if none stored
    return defaultAlerts.map(parseStoredAlert);
  } catch {
    return defaultAlerts.map(parseStoredAlert);
  }
}

/**
 * Get all currently active alerts (for display) - ASYNC version
 */
export async function getActiveAlertsAsync() {
  const now = new Date();
  const useSupabase = await checkSupabaseAvailability();

  if (useSupabase) {
    try {
      const { data, error } = await supabase
        .from(SUPABASE_TABLE)
        .select('*')
        .eq('is_active', true)
        .lte('starts_at', now.toISOString())
        .gt('expires_at', now.toISOString())
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data.map(row => parseStoredAlert(fromSupabaseFormat(row)));
    } catch {
      // Fall back to localStorage
    }
  }

  return getActiveAlerts();
}

/**
 * Get all currently active alerts (for display) - SYNC version
 */
export function getActiveAlerts() {
  const now = new Date();
  const alerts = getAllAlerts();

  return alerts.filter(alert => {
    if (!alert.isActive) return false;
    const isStarted = alert.timestamp <= now;
    const notExpired = alert.expiresAt > now;
    return isStarted && notExpired;
  });
}

/**
 * Save an alert (create or update) - ASYNC version
 */
export async function saveAlertAsync(alertData) {
  const useSupabase = await checkSupabaseAvailability();

  if (useSupabase) {
    try {
      const supabaseData = toSupabaseFormat(alertData);
      const isUpdate = !!alertData.id && !alertData.id.startsWith('alert-');

      if (isUpdate) {
        const { data, error } = await supabase
          .from(SUPABASE_TABLE)
          .update(supabaseData)
          .eq('id', alertData.id)
          .select()
          .single();

        if (error) throw error;
        return { success: true, alert: parseStoredAlert(fromSupabaseFormat(data)), source: 'supabase' };
      } else {
        // Remove id for insert (let Supabase generate UUID)
        delete supabaseData.id;
        const { data, error } = await supabase
          .from(SUPABASE_TABLE)
          .insert(supabaseData)
          .select()
          .single();

        if (error) throw error;
        return { success: true, alert: parseStoredAlert(fromSupabaseFormat(data)), source: 'supabase' };
      }
    } catch (error) {
      console.warn('Supabase save failed, falling back to localStorage:', error);
    }
  }

  // Fall back to localStorage
  return { ...saveAlert(alertData), source: 'localStorage' };
}

/**
 * Save an alert (create or update) - SYNC version (localStorage only)
 */
export function saveAlert(alertData) {
  try {
    const alerts = getAllAlertsRaw();
    const existingIndex = alerts.findIndex(a => a.id === alertData.id);

    const alertToSave = {
      ...alertData,
      id: alertData.id || `alert-${Date.now()}`,
      timestamp: alertData.timestamp instanceof Date
        ? alertData.timestamp.toISOString()
        : alertData.timestamp,
      expiresAt: alertData.expiresAt instanceof Date
        ? alertData.expiresAt.toISOString()
        : alertData.expiresAt,
      updatedAt: new Date().toISOString()
    };

    // Remove severity object for storage (keep severityKey)
    delete alertToSave.severity;

    if (existingIndex >= 0) {
      alerts[existingIndex] = alertToSave;
    } else {
      alertToSave.createdAt = new Date().toISOString();
      alerts.unshift(alertToSave);
    }

    localStorage.setItem(ALERTS_STORAGE_KEY, JSON.stringify(alerts));
    return { success: true, alert: parseStoredAlert(alertToSave) };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Delete an alert by ID - ASYNC version
 */
export async function deleteAlertAsync(alertId) {
  const useSupabase = await checkSupabaseAvailability();

  if (useSupabase) {
    try {
      const { error } = await supabase
        .from(SUPABASE_TABLE)
        .delete()
        .eq('id', alertId);

      if (error) throw error;
      return { success: true, source: 'supabase' };
    } catch (error) {
      console.warn('Supabase delete failed, falling back to localStorage:', error);
    }
  }

  return { ...deleteAlert(alertId), source: 'localStorage' };
}

/**
 * Delete an alert by ID - SYNC version
 */
export function deleteAlert(alertId) {
  try {
    const alerts = getAllAlertsRaw();
    const filtered = alerts.filter(a => a.id !== alertId);
    localStorage.setItem(ALERTS_STORAGE_KEY, JSON.stringify(filtered));
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Toggle alert active status - ASYNC version
 */
export async function toggleAlertActiveAsync(alertId) {
  const useSupabase = await checkSupabaseAvailability();

  if (useSupabase) {
    try {
      // First get current state
      const { data: current, error: fetchError } = await supabase
        .from(SUPABASE_TABLE)
        .select('is_active')
        .eq('id', alertId)
        .single();

      if (fetchError) throw fetchError;

      // Toggle it
      const { data, error } = await supabase
        .from(SUPABASE_TABLE)
        .update({ is_active: !current.is_active })
        .eq('id', alertId)
        .select()
        .single();

      if (error) throw error;
      return { success: true, isActive: data.is_active, source: 'supabase' };
    } catch (error) {
      console.warn('Supabase toggle failed, falling back to localStorage:', error);
    }
  }

  return { ...toggleAlertActive(alertId), source: 'localStorage' };
}

/**
 * Toggle alert active status - SYNC version
 */
export function toggleAlertActive(alertId) {
  try {
    const alerts = getAllAlertsRaw();
    const alert = alerts.find(a => a.id === alertId);
    if (alert) {
      alert.isActive = !alert.isActive;
      alert.updatedAt = new Date().toISOString();
      localStorage.setItem(ALERTS_STORAGE_KEY, JSON.stringify(alerts));
      return { success: true, isActive: alert.isActive };
    }
    return { success: false, error: 'Alert not found' };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Get raw alerts from storage (without parsing)
 */
function getAllAlertsRaw() {
  try {
    const stored = localStorage.getItem(ALERTS_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    // Initialize with defaults
    localStorage.setItem(ALERTS_STORAGE_KEY, JSON.stringify(defaultAlerts));
    return [...defaultAlerts];
  } catch {
    return [...defaultAlerts];
  }
}

/**
 * Get a single alert by ID
 */
export function getAlertById(alertId) {
  const alerts = getAllAlerts();
  return alerts.find(a => a.id === alertId) || null;
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
  if (!(date instanceof Date)) {
    date = new Date(date);
  }

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

/**
 * Reset alerts to defaults (for testing)
 */
export function resetAlertsToDefault() {
  localStorage.setItem(ALERTS_STORAGE_KEY, JSON.stringify(defaultAlerts));
  return defaultAlerts.map(parseStoredAlert);
}

/**
 * Get storage source status
 */
export async function getStorageStatus() {
  const useSupabase = await checkSupabaseAvailability();
  return {
    supabaseConfigured: isSupabaseConfigured,
    supabaseAvailable: useSupabase,
    usingSupabase: useSupabase,
    source: useSupabase ? 'Supabase (cloud)' : 'localStorage (browser)'
  };
}
