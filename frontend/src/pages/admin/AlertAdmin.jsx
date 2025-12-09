import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
import {
  getAllAlertsAsync,
  saveAlertAsync,
  deleteAlertAsync,
  toggleAlertActiveAsync,
  getStorageStatus,
  ALERT_SEVERITY,
  ALERT_CATEGORY,
  CATEGORY_LABELS,
  ALERT_TEMPLATES,
  getAlertIconPath,
  resetAlertsToDefault
} from '../../utils/alertSystem';
import './AlertAdmin.css';

// Department options for the dropdown
const DEPARTMENTS = [
  'Office of the Chief Executive',
  'National Police Agency',
  'National Weather Service',
  'Department of Health',
  'Transport Department',
  'Revenue Department',
  'Housing Authority',
  'Digital Services',
  'National Emergency Management',
  'Bank of Praya',
  'Interior Department',
  'Justice Department',
  'Other'
];

export default function AlertAdmin() {
  const { user } = useAuth();
  const [alerts, setAlerts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingAlert, setEditingAlert] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [showTemplates, setShowTemplates] = useState(false);
  const [notification, setNotification] = useState(null);
  const [storageStatus, setStorageStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load alerts and storage status on mount
  useEffect(() => {
    loadAlerts();
    loadStorageStatus();
  }, []);

  const loadAlerts = async () => {
    setIsLoading(true);
    try {
      const allAlerts = await getAllAlertsAsync();
      setAlerts(allAlerts);
    } catch (error) {
      showNotification('Failed to load alerts', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const loadStorageStatus = async () => {
    const status = await getStorageStatus();
    setStorageStatus(status);
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleNewAlert = () => {
    setEditingAlert({
      id: null,
      title: '',
      message: '',
      severityKey: 'INFO',
      category: ALERT_CATEGORY.GOVERNMENT,
      department: 'Digital Services',
      timestamp: new Date().toISOString().slice(0, 16),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
      dismissible: true,
      link: '',
      linkText: '',
      isActive: true
    });
    setShowTemplates(false);
    setIsEditing(true);
  };

  const handleUseTemplate = (template) => {
    setEditingAlert({
      id: null,
      title: template.title,
      message: template.message,
      severityKey: template.severityKey,
      category: template.category,
      department: template.department,
      timestamp: new Date().toISOString().slice(0, 16),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
      dismissible: true,
      link: template.link || '',
      linkText: template.linkText || '',
      isActive: true
    });
    setShowTemplates(false);
    setIsEditing(true);
  };

  const handleEditAlert = (alert) => {
    setEditingAlert({
      ...alert,
      timestamp: alert.timestamp instanceof Date
        ? alert.timestamp.toISOString().slice(0, 16)
        : new Date(alert.timestamp).toISOString().slice(0, 16),
      expiresAt: alert.expiresAt instanceof Date
        ? alert.expiresAt.toISOString().slice(0, 16)
        : new Date(alert.expiresAt).toISOString().slice(0, 16)
    });
    setIsEditing(true);
  };

  const handleSaveAlert = async (e) => {
    e.preventDefault();
    try {
      const result = await saveAlertAsync(editingAlert);
      if (result.success) {
        showNotification(
          `Alert ${editingAlert.id ? 'updated' : 'created'} successfully` +
          (result.source === 'supabase' ? ' (synced to cloud)' : ' (saved locally)')
        );
        setIsEditing(false);
        setEditingAlert(null);
        await loadAlerts();
      } else {
        showNotification('Failed to save alert: ' + result.error, 'error');
      }
    } catch (error) {
      showNotification('Failed to save alert', 'error');
    }
  };

  const handleDeleteAlert = async (alertId) => {
    try {
      const result = await deleteAlertAsync(alertId);
      if (result.success) {
        showNotification('Alert deleted');
        setShowDeleteConfirm(null);
        await loadAlerts();
      } else {
        showNotification('Failed to delete alert', 'error');
      }
    } catch (error) {
      showNotification('Failed to delete alert', 'error');
    }
  };

  const handleToggleActive = async (alertId) => {
    try {
      const result = await toggleAlertActiveAsync(alertId);
      if (result.success) {
        showNotification(result.isActive ? 'Alert activated' : 'Alert deactivated');
        await loadAlerts();
      }
    } catch (error) {
      showNotification('Failed to toggle alert', 'error');
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset all alerts to defaults? This will delete all custom alerts.')) {
      resetAlertsToDefault();
      showNotification('Alerts reset to defaults');
      loadAlerts();
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingAlert(null);
  };

  const updateEditingAlert = (field, value) => {
    setEditingAlert(prev => ({ ...prev, [field]: value }));
  };

  const getAlertStatus = (alert) => {
    const now = new Date();
    const start = new Date(alert.timestamp);
    const end = new Date(alert.expiresAt);

    if (!alert.isActive) return { label: 'Inactive', className: 'status-inactive' };
    if (now < start) return { label: 'Scheduled', className: 'status-scheduled' };
    if (now > end) return { label: 'Expired', className: 'status-expired' };
    return { label: 'Active', className: 'status-active' };
  };

  return (
    <div className="alert-admin">
      <header className="admin-header">
        <div className="admin-header-content">
          <Link to="/" className="admin-back-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Portal
          </Link>
          <div className="admin-title">
            <h1>Emergency Alert Management</h1>
            <p>Create and manage government alerts displayed on GOV.PRAYA</p>
          </div>
          <div className="admin-user">
            <span className="admin-user-name">{user?.firstName} {user?.lastName}</span>
            {storageStatus && (
              <span className={`storage-badge ${storageStatus.usingSupabase ? 'cloud' : 'local'}`}>
                {storageStatus.usingSupabase ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z" />
                    </svg>
                    Cloud Sync
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="3" width="20" height="14" rx="2" />
                      <path d="M8 21h8M12 17v4" />
                    </svg>
                    Local Storage
                  </>
                )}
              </span>
            )}
          </div>
        </div>
      </header>

      {notification && (
        <div className={`admin-notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <main className="admin-main">
        <div className="admin-container">
          {isLoading ? (
            <div className="admin-loading">
              <div className="loading-spinner" />
              <p>Loading alerts...</p>
            </div>
          ) : !isEditing ? (
            <>
              <div className="admin-toolbar">
                <div className="toolbar-left">
                  <button className="btn btn-primary" onClick={handleNewAlert}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                    New Alert
                  </button>
                  <button className="btn btn-secondary" onClick={() => setShowTemplates(!showTemplates)}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="7" height="7" />
                      <rect x="14" y="3" width="7" height="7" />
                      <rect x="14" y="14" width="7" height="7" />
                      <rect x="3" y="14" width="7" height="7" />
                    </svg>
                    Templates
                  </button>
                </div>
                <button className="btn btn-secondary" onClick={handleResetDefaults}>
                  Reset to Defaults
                </button>
              </div>

              {/* Templates Panel */}
              {showTemplates && (
                <div className="templates-panel">
                  <h3>Quick Templates</h3>
                  <p>Start with a pre-configured template and customize as needed.</p>
                  <div className="templates-grid">
                    {ALERT_TEMPLATES.map(template => {
                      const severity = ALERT_SEVERITY[template.severityKey];
                      return (
                        <button
                          key={template.id}
                          className="template-card"
                          onClick={() => handleUseTemplate(template)}
                          style={{ '--severity-color': severity.color }}
                        >
                          <div className="template-header">
                            <span className="template-severity" style={{ background: severity.color }}>
                              {severity.label}
                            </span>
                            <span className="template-category">
                              {CATEGORY_LABELS[template.category]}
                            </span>
                          </div>
                          <h4>{template.name}</h4>
                          <p>{template.title}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="alerts-list">
                {alerts.length === 0 ? (
                  <div className="alerts-empty">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <h3>No Alerts</h3>
                    <p>Create your first alert to display on the government portal.</p>
                    <button className="btn btn-primary" onClick={handleNewAlert}>Create Alert</button>
                  </div>
                ) : (
                  alerts.map(alert => {
                    const status = getAlertStatus(alert);
                    const severity = ALERT_SEVERITY[alert.severityKey] || alert.severity;

                    return (
                      <div
                        key={alert.id}
                        className={`alert-item ${status.className}`}
                        style={{ '--severity-color': severity.color }}
                      >
                        <div className="alert-item-indicator" />

                        <div className="alert-item-icon">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d={getAlertIconPath(severity.icon)} />
                          </svg>
                        </div>

                        <div className="alert-item-content">
                          <div className="alert-item-header">
                            <span className="alert-item-severity" style={{ background: severity.color }}>
                              {severity.label}
                            </span>
                            <span className="alert-item-category">
                              {CATEGORY_LABELS[alert.category] || alert.category}
                            </span>
                            <span className={`alert-item-status ${status.className}`}>
                              {status.label}
                            </span>
                          </div>
                          <h3 className="alert-item-title">{alert.title}</h3>
                          <p className="alert-item-message">{alert.message}</p>
                          <div className="alert-item-meta">
                            <span>{alert.department}</span>
                            <span>•</span>
                            <span>Starts: {new Date(alert.timestamp).toLocaleString()}</span>
                            <span>•</span>
                            <span>Expires: {new Date(alert.expiresAt).toLocaleString()}</span>
                          </div>
                        </div>

                        <div className="alert-item-actions">
                          <button
                            className={`action-btn ${alert.isActive ? 'active' : ''}`}
                            onClick={() => handleToggleActive(alert.id)}
                            title={alert.isActive ? 'Deactivate' : 'Activate'}
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              {alert.isActive ? (
                                <path d="M18.36 6.64a9 9 0 11-12.73 0M12 2v10" />
                              ) : (
                                <path d="M12 2v10m0 0a9 9 0 109 9" />
                              )}
                            </svg>
                          </button>
                          <button
                            className="action-btn"
                            onClick={() => handleEditAlert(alert)}
                            title="Edit"
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                          </button>
                          <button
                            className="action-btn danger"
                            onClick={() => setShowDeleteConfirm(alert.id)}
                            title="Delete"
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                            </svg>
                          </button>
                        </div>

                        {showDeleteConfirm === alert.id && (
                          <div className="delete-confirm">
                            <p>Delete this alert?</p>
                            <div className="delete-confirm-actions">
                              <button className="btn btn-danger" onClick={() => handleDeleteAlert(alert.id)}>
                                Delete
                              </button>
                              <button className="btn btn-secondary" onClick={() => setShowDeleteConfirm(null)}>
                                Cancel
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </>
          ) : (
            <div className="alert-form-container">
              <h2>{editingAlert?.id ? 'Edit Alert' : 'Create New Alert'}</h2>

              <form onSubmit={handleSaveAlert} className="alert-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="severity">Severity Level</label>
                    <select
                      id="severity"
                      value={editingAlert?.severityKey || 'INFO'}
                      onChange={(e) => updateEditingAlert('severityKey', e.target.value)}
                      required
                    >
                      {Object.entries(ALERT_SEVERITY).map(([key, sev]) => (
                        <option key={key} value={key}>{sev.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select
                      id="category"
                      value={editingAlert?.category || 'government'}
                      onChange={(e) => updateEditingAlert('category', e.target.value)}
                      required
                    >
                      {Object.entries(ALERT_CATEGORY).map(([key, value]) => (
                        <option key={key} value={value}>{CATEGORY_LABELS[value]}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="title">Alert Title</label>
                  <input
                    type="text"
                    id="title"
                    value={editingAlert?.title || ''}
                    onChange={(e) => updateEditingAlert('title', e.target.value)}
                    placeholder="e.g., Winter Weather Advisory"
                    required
                    maxLength={100}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Alert Message</label>
                  <textarea
                    id="message"
                    value={editingAlert?.message || ''}
                    onChange={(e) => updateEditingAlert('message', e.target.value)}
                    placeholder="Provide details about the alert..."
                    required
                    rows={4}
                    maxLength={500}
                  />
                  <span className="char-count">{editingAlert?.message?.length || 0}/500</span>
                </div>

                <div className="form-group">
                  <label htmlFor="department">Issuing Department</label>
                  <select
                    id="department"
                    value={editingAlert?.department || 'Digital Services'}
                    onChange={(e) => updateEditingAlert('department', e.target.value)}
                    required
                  >
                    {DEPARTMENTS.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="timestamp">Start Date & Time</label>
                    <input
                      type="datetime-local"
                      id="timestamp"
                      value={editingAlert?.timestamp || ''}
                      onChange={(e) => updateEditingAlert('timestamp', e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="expiresAt">Expiration Date & Time</label>
                    <input
                      type="datetime-local"
                      id="expiresAt"
                      value={editingAlert?.expiresAt || ''}
                      onChange={(e) => updateEditingAlert('expiresAt', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="link">Link URL (optional)</label>
                    <input
                      type="text"
                      id="link"
                      value={editingAlert?.link || ''}
                      onChange={(e) => updateEditingAlert('link', e.target.value)}
                      placeholder="e.g., /transport or https://..."
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="linkText">Link Text (optional)</label>
                    <input
                      type="text"
                      id="linkText"
                      value={editingAlert?.linkText || ''}
                      onChange={(e) => updateEditingAlert('linkText', e.target.value)}
                      placeholder="e.g., Learn More"
                    />
                  </div>
                </div>

                <div className="form-row form-options">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={editingAlert?.dismissible ?? true}
                      onChange={(e) => updateEditingAlert('dismissible', e.target.checked)}
                    />
                    <span>Allow users to dismiss this alert</span>
                  </label>

                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={editingAlert?.isActive ?? true}
                      onChange={(e) => updateEditingAlert('isActive', e.target.checked)}
                    />
                    <span>Alert is active</span>
                  </label>
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">
                    {editingAlert?.id ? 'Save Changes' : 'Create Alert'}
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={handleCancelEdit}>
                    Cancel
                  </button>
                </div>
              </form>

              {/* Preview */}
              {editingAlert && (
                <div className="alert-preview">
                  <h3>Preview</h3>
                  <div
                    className="preview-banner"
                    style={{
                      '--alert-color': ALERT_SEVERITY[editingAlert.severityKey]?.color,
                      '--alert-bg': ALERT_SEVERITY[editingAlert.severityKey]?.bgColor,
                      '--alert-border': ALERT_SEVERITY[editingAlert.severityKey]?.borderColor
                    }}
                  >
                    <div className="preview-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d={getAlertIconPath(ALERT_SEVERITY[editingAlert.severityKey]?.icon)} />
                      </svg>
                    </div>
                    <div className="preview-content">
                      <span className="preview-badge">
                        {ALERT_SEVERITY[editingAlert.severityKey]?.label}
                      </span>
                      <span className="preview-title">{editingAlert.title || 'Alert Title'}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
