import { describe, it, expect, beforeEach } from 'vitest'
import {
  ALERT_SEVERITY,
  ALERT_CATEGORY,
  getSeverityFromKey,
  getActiveAlerts,
  saveAlert,
  deleteAlert,
  isAlertDismissed,
  dismissAlert,
  formatAlertTime
} from '../alertSystem'

describe('Alert System', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
  })

  describe('getSeverityFromKey', () => {
    it('should return correct severity object for valid key', () => {
      const severity = getSeverityFromKey('CRITICAL')
      expect(severity).toEqual(ALERT_SEVERITY.CRITICAL)
      expect(severity.level).toBe('critical')
      expect(severity.label).toBe('Emergency')
    })

    it('should return INFO severity for invalid key', () => {
      const severity = getSeverityFromKey('INVALID')
      expect(severity).toEqual(ALERT_SEVERITY.INFO)
    })
  })

  describe('getActiveAlerts', () => {
    it('should return empty array when no alerts exist', () => {
      const alerts = getActiveAlerts()
      expect(Array.isArray(alerts)).toBe(true)
    })

    it('should filter out inactive alerts', () => {
      const activeAlert = {
        id: 'test-1',
        severityKey: 'INFO',
        category: ALERT_CATEGORY.GOVERNMENT,
        title: 'Active Alert',
        message: 'This is active',
        department: 'Test Dept',
        timestamp: new Date(),
        expiresAt: new Date(Date.now() + 86400000), // tomorrow
        dismissible: true,
        isActive: true
      }

      saveAlert(activeAlert)
      const alerts = getActiveAlerts()
      expect(alerts.length).toBeGreaterThan(0)
    })
  })

  describe('saveAlert', () => {
    it('should save an alert successfully', () => {
      const alert = {
        severityKey: 'WARNING',
        category: ALERT_CATEGORY.WEATHER,
        title: 'Test Alert',
        message: 'Test message',
        department: 'Test Department',
        timestamp: new Date(),
        expiresAt: new Date(Date.now() + 86400000),
        dismissible: true,
        isActive: true
      }

      const result = saveAlert(alert)
      expect(result.success).toBe(true)
      expect(result.alert).toBeDefined()
      expect(result.alert.title).toBe('Test Alert')
    })
  })

  describe('deleteAlert', () => {
    it('should delete an alert successfully', () => {
      const alert = {
        id: 'test-delete',
        severityKey: 'INFO',
        category: ALERT_CATEGORY.SERVICE,
        title: 'To Delete',
        message: 'Delete me',
        department: 'Test',
        timestamp: new Date(),
        expiresAt: new Date(Date.now() + 86400000),
        dismissible: true,
        isActive: true
      }

      saveAlert(alert)
      const result = deleteAlert('test-delete')
      expect(result.success).toBe(true)
    })
  })

  describe('dismissAlert and isAlertDismissed', () => {
    it('should dismiss and check if alert is dismissed', () => {
      const alertId = 'test-dismiss'

      // Initially not dismissed
      expect(isAlertDismissed(alertId)).toBe(false)

      // Dismiss the alert
      dismissAlert(alertId)

      // Should now be dismissed
      expect(isAlertDismissed(alertId)).toBe(true)
    })
  })

  describe('formatAlertTime', () => {
    it('should format recent time as "Just now"', () => {
      const now = new Date()
      expect(formatAlertTime(now)).toBe('Just now')
    })

    it('should format time within 24 hours as hours ago', () => {
      const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000)
      const formatted = formatAlertTime(twoHoursAgo)
      expect(formatted).toContain('h ago')
    })

    it('should format yesterday correctly', () => {
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000)
      const formatted = formatAlertTime(yesterday)
      expect(formatted).toBe('Yesterday')
    })
  })
})
