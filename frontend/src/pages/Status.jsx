import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Status.css'

// Service status data - in production this would come from an API
const services = [
  {
    id: 'portal',
    name: 'Government Portal',
    description: 'Main portal and authentication services',
    status: 'operational',
    uptime: 99.98,
    responseTime: 145,
    lastIncident: null
  },
  {
    id: 'auth',
    name: 'PrayaPass Authentication',
    description: 'Login, registration, and identity verification',
    status: 'operational',
    uptime: 99.99,
    responseTime: 89,
    lastIncident: null
  },
  {
    id: 'payments',
    name: 'Payment Processing',
    description: 'Tax payments, fees, and financial transactions',
    status: 'operational',
    uptime: 99.95,
    responseTime: 234,
    lastIncident: '2025-12-08'
  },
  {
    id: 'documents',
    name: 'Document Services',
    description: 'Certificate generation and document retrieval',
    status: 'operational',
    uptime: 99.92,
    responseTime: 312,
    lastIncident: '2025-12-05'
  },
  {
    id: 'npa',
    name: 'National Police Agency',
    description: 'Emergency services, reports, and licensing',
    status: 'operational',
    uptime: 99.97,
    responseTime: 156,
    lastIncident: null
  },
  {
    id: 'revenue',
    name: 'Revenue Department',
    description: 'Tax filing, business accounts, and compliance',
    status: 'operational',
    uptime: 99.89,
    responseTime: 278,
    lastIncident: '2025-12-10'
  },
  {
    id: 'health',
    name: 'Health Department',
    description: 'Public health services and vital statistics',
    status: 'operational',
    uptime: 99.94,
    responseTime: 198,
    lastIncident: null
  },
  {
    id: 'housing',
    name: 'Housing Authority',
    description: 'Housing applications and tenant services',
    status: 'degraded',
    uptime: 98.76,
    responseTime: 567,
    lastIncident: '2025-12-11'
  },
  {
    id: 'transport',
    name: 'Transport Department',
    description: 'Driver licensing and vehicle registration',
    status: 'operational',
    uptime: 99.91,
    responseTime: 201,
    lastIncident: '2025-12-03'
  },
  {
    id: 'post',
    name: 'Praya Post',
    description: 'Package tracking and postal services',
    status: 'operational',
    uptime: 99.88,
    responseTime: 245,
    lastIncident: '2025-12-07'
  },
  {
    id: 'chatbot',
    name: 'AI Assistant',
    description: 'Gemini-powered chatbot and support',
    status: 'operational',
    uptime: 99.85,
    responseTime: 423,
    lastIncident: '2025-12-09'
  },
  {
    id: 'api',
    name: 'Public API',
    description: 'Developer API endpoints and integrations',
    status: 'operational',
    uptime: 99.96,
    responseTime: 112,
    lastIncident: null
  }
]

// Historical incidents
const incidents = [
  {
    id: 1,
    date: '2025-12-11',
    title: 'Housing Authority - Degraded Performance',
    status: 'investigating',
    severity: 'minor',
    services: ['housing'],
    updates: [
      { time: '09:45 AM', message: 'We are investigating reports of slow response times on the Housing Authority portal.' },
      { time: '10:15 AM', message: 'The issue has been identified as increased traffic due to new subsidy program launch. We are scaling up resources.' }
    ]
  },
  {
    id: 2,
    date: '2025-12-10',
    title: 'Revenue Department - Brief Outage',
    status: 'resolved',
    severity: 'minor',
    services: ['revenue'],
    updates: [
      { time: '02:30 PM', message: 'Some users experienced errors accessing the Revenue Department portal.' },
      { time: '02:45 PM', message: 'Issue identified and fix deployed. Services restored.' },
      { time: '03:00 PM', message: 'All systems operational. Root cause: database connection pool exhaustion.' }
    ]
  },
  {
    id: 3,
    date: '2025-12-08',
    title: 'Payment Processing - Delayed Transactions',
    status: 'resolved',
    severity: 'minor',
    services: ['payments'],
    updates: [
      { time: '11:00 AM', message: 'Payment confirmations experiencing delays of up to 5 minutes.' },
      { time: '11:30 AM', message: 'Bank gateway issue resolved. All pending transactions processed.' }
    ]
  },
  {
    id: 4,
    date: '2025-12-05',
    title: 'Scheduled Maintenance - Document Services',
    status: 'resolved',
    severity: 'maintenance',
    services: ['documents'],
    updates: [
      { time: '02:00 AM', message: 'Scheduled maintenance window began.' },
      { time: '04:30 AM', message: 'Maintenance completed successfully. Certificate generation upgraded.' }
    ]
  }
]

// Generate uptime data for the last 90 days
const generateUptimeData = (baseUptime) => {
  const data = []
  for (let i = 89; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    // Simulate some variation
    const variation = Math.random() * 0.5
    const dayUptime = Math.min(100, baseUptime + variation - 0.25)
    let status = 'operational'
    if (dayUptime < 99) status = 'degraded'
    if (dayUptime < 95) status = 'outage'
    data.push({
      date: date.toISOString().split('T')[0],
      uptime: dayUptime,
      status
    })
  }
  return data
}

const StatusIndicator = ({ status }) => {
  const statusConfig = {
    operational: { color: '#10b981', label: 'Operational', icon: '●' },
    degraded: { color: '#f59e0b', label: 'Degraded Performance', icon: '◐' },
    outage: { color: '#ef4444', label: 'Major Outage', icon: '○' },
    maintenance: { color: '#6366f1', label: 'Maintenance', icon: '◑' }
  }
  const config = statusConfig[status] || statusConfig.operational
  return (
    <span className="status-indicator" style={{ '--status-color': config.color }}>
      <span className="status-dot">{config.icon}</span>
      {config.label}
    </span>
  )
}

const UptimeBar = ({ data }) => {
  return (
    <div className="uptime-bar">
      {data.map((day, i) => (
        <div
          key={i}
          className={`uptime-day uptime-${day.status}`}
          title={`${day.date}: ${day.uptime.toFixed(2)}% uptime`}
        />
      ))}
    </div>
  )
}

export default function Status() {
  const [selectedService, setSelectedService] = useState(null)
  const [timeRange, setTimeRange] = useState('90')

  // Calculate overall status
  const overallStatus = services.some(s => s.status === 'outage') ? 'outage' :
    services.some(s => s.status === 'degraded') ? 'degraded' : 'operational'

  const overallUptime = (services.reduce((sum, s) => sum + s.uptime, 0) / services.length).toFixed(2)

  const activeIncidents = incidents.filter(i => i.status !== 'resolved')

  return (
    <div className="status-page">
      <header className="status-header">
        <div className="container">
          <Link to="/" className="status-logo">
            <svg viewBox="0 0 24 24" fill="none" width="32" height="32">
              <rect x="3" y="3" width="9" height="18" fill="#4b5563" rx="2" />
              <rect x="12" y="3" width="9" height="18" fill="#f97316" rx="2" />
            </svg>
            <span>GOV.PRAYA Status</span>
          </Link>
          <div className="status-header-links">
            <Link to="/">Back to Portal</Link>
            <a href="#subscribe" className="btn-subscribe">Subscribe to Updates</a>
          </div>
        </div>
      </header>

      <main className="status-main">
        <div className="container">
          {/* Overall Status Banner */}
          <section className="status-banner" data-status={overallStatus}>
            <div className="status-banner-content">
              <div className="status-banner-icon">
                {overallStatus === 'operational' ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                ) : overallStatus === 'degraded' ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                )}
              </div>
              <div className="status-banner-text">
                <h1>
                  {overallStatus === 'operational' ? 'All Systems Operational' :
                    overallStatus === 'degraded' ? 'Partial System Degradation' : 'Major Outage in Progress'}
                </h1>
                <p>
                  {overallStatus === 'operational'
                    ? 'All government services are running smoothly.'
                    : `${activeIncidents.length} active incident${activeIncidents.length !== 1 ? 's' : ''} being investigated.`}
                </p>
              </div>
            </div>
            <div className="status-banner-stats">
              <div className="status-stat">
                <span className="status-stat-value">{overallUptime}%</span>
                <span className="status-stat-label">Overall Uptime</span>
              </div>
              <div className="status-stat">
                <span className="status-stat-value">{services.length}</span>
                <span className="status-stat-label">Services Monitored</span>
              </div>
              <div className="status-stat">
                <span className="status-stat-value">{services.filter(s => s.status === 'operational').length}</span>
                <span className="status-stat-label">Operational</span>
              </div>
            </div>
          </section>

          {/* Active Incidents */}
          {activeIncidents.length > 0 && (
            <section className="status-incidents-active">
              <h2>Active Incidents</h2>
              {activeIncidents.map(incident => (
                <div key={incident.id} className="incident-card incident-active" data-severity={incident.severity}>
                  <div className="incident-header">
                    <div className="incident-title">
                      <span className={`incident-severity incident-severity-${incident.severity}`}>
                        {incident.severity === 'major' ? 'Major' : incident.severity === 'minor' ? 'Minor' : 'Maintenance'}
                      </span>
                      <h3>{incident.title}</h3>
                    </div>
                    <span className="incident-status">{incident.status}</span>
                  </div>
                  <div className="incident-timeline">
                    {incident.updates.map((update, i) => (
                      <div key={i} className="incident-update">
                        <span className="incident-time">{update.time}</span>
                        <p>{update.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Services Grid */}
          <section className="status-services">
            <div className="status-services-header">
              <h2>Service Status</h2>
              <div className="uptime-legend">
                <span className="uptime-legend-item">
                  <span className="uptime-day uptime-operational" style={{ width: 12, height: 12 }} />
                  Operational
                </span>
                <span className="uptime-legend-item">
                  <span className="uptime-day uptime-degraded" style={{ width: 12, height: 12 }} />
                  Degraded
                </span>
                <span className="uptime-legend-item">
                  <span className="uptime-day uptime-outage" style={{ width: 12, height: 12 }} />
                  Outage
                </span>
              </div>
            </div>

            <div className="services-list">
              {services.map(service => {
                const uptimeData = generateUptimeData(service.uptime)
                return (
                  <div
                    key={service.id}
                    className={`service-card ${selectedService === service.id ? 'expanded' : ''}`}
                    onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
                  >
                    <div className="service-main">
                      <div className="service-info">
                        <h3>{service.name}</h3>
                        <p>{service.description}</p>
                      </div>
                      <StatusIndicator status={service.status} />
                    </div>
                    <div className="service-uptime">
                      <UptimeBar data={uptimeData} />
                      <div className="service-uptime-labels">
                        <span>{timeRange} days ago</span>
                        <span className="service-uptime-percent">{service.uptime}% uptime</span>
                        <span>Today</span>
                      </div>
                    </div>
                    {selectedService === service.id && (
                      <div className="service-details">
                        <div className="service-metrics">
                          <div className="service-metric">
                            <span className="service-metric-value">{service.uptime}%</span>
                            <span className="service-metric-label">Uptime (90 days)</span>
                          </div>
                          <div className="service-metric">
                            <span className="service-metric-value">{service.responseTime}ms</span>
                            <span className="service-metric-label">Avg Response</span>
                          </div>
                          <div className="service-metric">
                            <span className="service-metric-value">
                              {service.lastIncident ? service.lastIncident : 'None'}
                            </span>
                            <span className="service-metric-label">Last Incident</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </section>

          {/* Past Incidents */}
          <section className="status-incidents-past">
            <h2>Past Incidents</h2>
            <div className="incidents-timeline">
              {incidents.filter(i => i.status === 'resolved').map(incident => (
                <div key={incident.id} className="incident-card" data-severity={incident.severity}>
                  <div className="incident-date">{incident.date}</div>
                  <div className="incident-content">
                    <div className="incident-header">
                      <h3>{incident.title}</h3>
                      <span className={`incident-severity incident-severity-${incident.severity}`}>
                        {incident.severity === 'maintenance' ? 'Maintenance' : 'Resolved'}
                      </span>
                    </div>
                    <div className="incident-timeline">
                      {incident.updates.map((update, i) => (
                        <div key={i} className="incident-update">
                          <span className="incident-time">{update.time}</span>
                          <p>{update.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Subscribe Section */}
          <section className="status-subscribe" id="subscribe">
            <div className="subscribe-card">
              <div className="subscribe-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </div>
              <div className="subscribe-content">
                <h3>Get notified about service updates</h3>
                <p>Subscribe to receive email or SMS notifications when services experience issues or scheduled maintenance.</p>
                <form className="subscribe-form" onSubmit={(e) => e.preventDefault()}>
                  <input type="email" placeholder="Enter your email" />
                  <button type="submit" className="btn-primary">Subscribe</button>
                </form>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="status-footer">
        <div className="container">
          <p>&copy; 2025 Republic of Praya. All systems monitored 24/7.</p>
          <div className="status-footer-links">
            <Link to="/">Government Portal</Link>
            <a href="mailto:support@gov.praya">Report an Issue</a>
            <Link to="/api">API Status</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
