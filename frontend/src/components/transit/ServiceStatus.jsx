import React, { useState, useEffect } from 'react';
import {
  MRT_LINES,
  ISR_LINES,
  HSR_LINES,
  BUS_FRANCHISEES,
  getCurrentServiceStatus,
  SERVICE_STATUS
} from '../../data/transitData';
import './Transit.css';

export default function ServiceStatus() {
  const [status, setStatus] = useState({});
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [expandedLine, setExpandedLine] = useState(null);

  useEffect(() => {
    // Simulate fetching status
    setStatus(getCurrentServiceStatus());

    // Update every 30 seconds
    const interval = setInterval(() => {
      setStatus(getCurrentServiceStatus());
      setLastUpdate(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (statusCode) => {
    switch (statusCode) {
      case 'normal':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
            <polyline points="22,4 12,14.01 9,11.01"/>
          </svg>
        );
      case 'minor':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 8v4M12 16h.01"/>
          </svg>
        );
      case 'major':
      case 'suspended':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        );
      default:
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 16v-4M12 8h.01"/>
          </svg>
        );
    }
  };

  const allLines = [
    ...Object.entries(MRT_LINES).map(([id, line]) => ({
      id,
      ...line,
      category: 'MRT'
    })),
    ...Object.entries(ISR_LINES).map(([id, line]) => ({
      id,
      ...line,
      category: 'Commuter Rail'
    })),
    ...Object.entries(HSR_LINES).map(([id, line]) => ({
      id,
      ...line,
      category: 'High Speed Rail'
    }))
  ];

  const getOverallStatus = () => {
    const statuses = Object.values(status);
    if (statuses.some(s => s.status?.code === 'suspended')) return SERVICE_STATUS.SUSPENDED;
    if (statuses.some(s => s.status?.code === 'major')) return SERVICE_STATUS.MAJOR_DELAYS;
    if (statuses.some(s => s.status?.code === 'minor')) return SERVICE_STATUS.MINOR_DELAYS;
    return SERVICE_STATUS.NORMAL;
  };

  const overallStatus = getOverallStatus();

  return (
    <div className="service-status">
      <div className="status-header">
        <h3>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
          </svg>
          Service Status
        </h3>
        <div className="status-meta">
          <span className="last-update">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </span>
          <button className="refresh-btn" onClick={() => {
            setStatus(getCurrentServiceStatus());
            setLastUpdate(new Date());
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M23 4v6h-6M1 20v-6h6"/>
              <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>
            </svg>
            Refresh
          </button>
        </div>
      </div>

      <div className="overall-status" style={{ '--status-color': overallStatus.color }}>
        <div className="overall-icon" style={{ color: overallStatus.color }}>
          {getStatusIcon(overallStatus.code)}
        </div>
        <div className="overall-info">
          <span className="overall-label">Network Status</span>
          <span className="overall-value" style={{ color: overallStatus.color }}>
            {overallStatus.label}
          </span>
        </div>
      </div>

      <div className="status-list">
        <h4>Rail Services</h4>
        {allLines.map(line => {
          const lineStatus = status[line.id] || { status: SERVICE_STATUS.NORMAL };
          const isExpanded = expandedLine === line.id;

          return (
            <div
              key={line.id}
              className={`status-item ${lineStatus.message ? 'has-alert' : ''} ${isExpanded ? 'expanded' : ''}`}
              onClick={() => setExpandedLine(isExpanded ? null : line.id)}
            >
              <div className="status-main">
                <div className="line-indicator" style={{ background: line.color }}>
                  {line.id}
                </div>
                <div className="line-info">
                  <span className="line-name">{line.name}</span>
                  <span className="line-category">{line.category}</span>
                </div>
                <div className="line-status" style={{ color: lineStatus.status?.color }}>
                  {getStatusIcon(lineStatus.status?.code)}
                  <span>{lineStatus.status?.label || 'Good Service'}</span>
                </div>
              </div>
              {lineStatus.message && (
                <div className="status-detail">
                  <div className="status-message">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 16v-4M12 8h.01"/>
                    </svg>
                    {lineStatus.message}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="status-list">
        <h4>Bus Services</h4>
        {Object.entries(BUS_FRANCHISEES).map(([id, operator]) => {
          const busStatus = status.BUS || { status: SERVICE_STATUS.NORMAL };

          return (
            <div key={id} className="status-item">
              <div className="status-main">
                <div className="line-indicator" style={{ background: operator.color }}>
                  {id}
                </div>
                <div className="line-info">
                  <span className="line-name">{operator.name}</span>
                  <span className="line-category">{operator.routes} routes</span>
                </div>
                <div className="line-status" style={{ color: busStatus.status?.color }}>
                  {getStatusIcon(busStatus.status?.code)}
                  <span>{busStatus.status?.label || 'Good Service'}</span>
                </div>
              </div>
              {id === 'PBC' && busStatus.message && (
                <div className="status-detail">
                  <div className="status-message">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 16v-4M12 8h.01"/>
                    </svg>
                    {busStatus.message}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="status-legend">
        <h4>Status Legend</h4>
        <div className="legend-grid">
          {Object.values(SERVICE_STATUS).map(s => (
            <div key={s.code} className="legend-item">
              <span className="legend-dot" style={{ background: s.color }} />
              <span className="legend-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="status-alerts">
        <h4>Service Alerts</h4>
        <div className="alerts-list">
          {Object.entries(status).some(([, s]) => s.message) ? (
            Object.entries(status).map(([lineId, lineStatus]) => {
              if (!lineStatus.message) return null;
              const line = allLines.find(l => l.id === lineId);
              return (
                <div key={lineId} className="alert-item">
                  <div className="alert-header" style={{ borderColor: lineStatus.status?.color }}>
                    <span className="alert-line" style={{ background: line?.color }}>
                      {lineId}
                    </span>
                    <span className="alert-type" style={{ color: lineStatus.status?.color }}>
                      {lineStatus.status?.label}
                    </span>
                  </div>
                  <p className="alert-message">{lineStatus.message}</p>
                </div>
              );
            })
          ) : (
            <div className="no-alerts">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                <polyline points="22,4 12,14.01 9,11.01"/>
              </svg>
              <span>No active service alerts</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
