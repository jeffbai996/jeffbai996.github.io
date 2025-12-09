import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  getActiveAlerts,
  isAlertDismissed,
  dismissAlert,
  formatAlertTime,
  getAlertIconPath,
  cleanupDismissedAlerts
} from '../utils/alertSystem';
import './EmergencyAlert.css';

/**
 * EmergencyAlert - Displays government alerts, warnings, and critical announcements
 * Features:
 * - Color-coded severity levels (critical, warning, info, success)
 * - Dismissible alerts with localStorage persistence
 * - Animated entrance/exit
 * - Links to relevant department pages
 */
export default function EmergencyAlert() {
  const [alerts, setAlerts] = useState([]);
  const [dismissedIds, setDismissedIds] = useState(new Set());
  const [expandedAlertId, setExpandedAlertId] = useState(null);

  useEffect(() => {
    // Cleanup old dismissed alerts on mount
    cleanupDismissedAlerts();

    // Load active alerts
    const activeAlerts = getActiveAlerts();

    // Filter out previously dismissed alerts
    const visibleAlerts = activeAlerts.filter(alert => !isAlertDismissed(alert.id));
    setAlerts(visibleAlerts);

    // Auto-expand first critical alert
    const criticalAlert = visibleAlerts.find(a => a.severity.level === 'critical');
    if (criticalAlert) {
      setExpandedAlertId(criticalAlert.id);
    }
  }, []);

  const handleDismiss = (alertId, e) => {
    e.stopPropagation();
    dismissAlert(alertId);
    setDismissedIds(prev => new Set([...prev, alertId]));

    // Animate out then remove
    setTimeout(() => {
      setAlerts(prev => prev.filter(a => a.id !== alertId));
    }, 300);
  };

  const toggleExpand = (alertId) => {
    setExpandedAlertId(prev => prev === alertId ? null : alertId);
  };

  if (alerts.length === 0) return null;

  return (
    <div className="emergency-alerts" role="alert" aria-live="polite">
      {alerts.map((alert) => {
        const isExpanded = expandedAlertId === alert.id;
        const isDismissing = dismissedIds.has(alert.id);

        return (
          <div
            key={alert.id}
            className={`alert-banner alert-${alert.severity.level} ${isExpanded ? 'alert-expanded' : ''} ${isDismissing ? 'alert-dismissing' : ''}`}
            style={{
              '--alert-color': alert.severity.color,
              '--alert-bg': alert.severity.bgColor,
              '--alert-border': alert.severity.borderColor
            }}
            onClick={() => toggleExpand(alert.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleExpand(alert.id);
              }
            }}
          >
            <div className="alert-container">
              <div className="alert-icon-wrapper">
                <svg
                  className="alert-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d={getAlertIconPath(alert.severity.icon)} />
                </svg>
                {alert.severity.level === 'critical' && (
                  <span className="alert-pulse" aria-hidden="true" />
                )}
              </div>

              <div className="alert-content">
                <div className="alert-header">
                  <span className="alert-badge">{alert.severity.label}</span>
                  <h3 className="alert-title">{alert.title}</h3>
                  <span className="alert-meta">
                    <span className="alert-department">{alert.department}</span>
                    <span className="alert-separator" aria-hidden="true">•</span>
                    <span className="alert-time">{formatAlertTime(alert.timestamp)}</span>
                  </span>
                </div>

                <div className={`alert-body ${isExpanded ? 'alert-body-visible' : ''}`}>
                  <p className="alert-message">{alert.message}</p>
                  {alert.link && (
                    <Link
                      to={alert.link}
                      className="alert-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {alert.linkText || 'Learn More'}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  )}
                </div>
              </div>

              <div className="alert-actions">
                <button
                  className="alert-expand-btn"
                  aria-label={isExpanded ? 'Collapse alert' : 'Expand alert'}
                  aria-expanded={isExpanded}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={isExpanded ? 'rotated' : ''}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                {alert.dismissible && (
                  <button
                    className="alert-dismiss-btn"
                    onClick={(e) => handleDismiss(alert.id, e)}
                    aria-label="Dismiss alert"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Progress bar for time-sensitive alerts */}
            {alert.severity.level === 'critical' && (
              <div className="alert-progress" aria-hidden="true">
                <div className="alert-progress-bar" />
              </div>
            )}
          </div>
        );
      })}

      {/* Show count badge if multiple alerts */}
      {alerts.length > 1 && (
        <div className="alert-count">
          <span>{alerts.length} active alerts</span>
        </div>
      )}
    </div>
  );
}

/**
 * Compact alert banner for use in department headers
 */
export function CompactAlert({ alert }) {
  if (!alert) return null;

  return (
    <div
      className="compact-alert"
      style={{
        '--alert-color': alert.severity.color,
        '--alert-bg': alert.severity.bgColor
      }}
    >
      <svg
        className="compact-alert-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d={getAlertIconPath(alert.severity.icon)} />
      </svg>
      <span className="compact-alert-text">
        <strong>{alert.severity.label}:</strong> {alert.title}
      </span>
      {alert.link && (
        <Link to={alert.link} className="compact-alert-link">
          Details
        </Link>
      )}
    </div>
  );
}
