import React, { useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import './Department.css'

export default function BD() {
  const navigate = useNavigate()

  useEffect(() => {
    document.body.classList.add('theme-bd')
    return () => document.body.classList.remove('theme-bd')
  }, [])

  return (
    <>
      <header className="dept-header">
        <div className="container">
          <Link to="/bd" className="dept-logo">
            <div className="logo-mark">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M9 9h.01M15 9h.01M9 13h.01M15 13h.01"/>
              </svg>
            </div>
            <div className="logo-text">
              <h1>Buildings Department</h1>
              <span className="tagline">Republic of Praya</span>
            </div>
          </Link>
          <nav className="nav">
            <Link to="/bd" className="nav-link">Home</Link>
            <Link to="/bd/permits" className="nav-link">Building Permits</Link>
            <Link to="/bd/inspections" className="nav-link">Inspections</Link>
            <Link to="/bd/codes" className="nav-link">Building Codes</Link>
            <Link to="/bd/services" className="nav-link">Services</Link>
          </nav>
        </div>
      </header>

      <Routes>
        <Route index element={<BDHome navigate={navigate} />} />
        <Route path="permits" element={<BDPermits />} />
        <Route path="inspections" element={<ComingSoon title="Building Inspections" />} />
        <Route path="codes" element={<ComingSoon title="Building Codes" />} />
        <Route path="services" element={<ComingSoon title="Online Services" />} />
      </Routes>

      <footer className="dept-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <h4>Buildings Department</h4>
              <p>Ensuring safe, sustainable, and compliant construction throughout the Republic of Praya.</p>
            </div>
            <div className="footer-section">
              <h5>Services</h5>
              <ul>
                <li><Link to="/bd/permits">Building Permits</Link></li>
                <li><Link to="/bd/inspections">Inspections</Link></li>
                <li><Link to="/bd/services">Online Services</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5>Resources</h5>
              <ul>
                <li><Link to="/bd/codes">Building Codes</Link></li>
                <li><a href="#">Forms Library</a></li>
                <li><a href="#">Fee Schedule</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5>Government</h5>
              <ul>
                <li><Link to="/">Gov Portal</Link></li>
                <li><a href="/pages/ID_Praya.html">Interior Dept.</a></li>
                <li><a href="/pages/Housing_Authority_Praya.html">Housing Authority</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>&copy; 2024 Republic of Praya. Buildings Department.</span>
            <div className="footer-legal">
              <a href="#">Terms</a>
              <a href="#">Privacy</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

function BDHome({ navigate }) {
  return (
    <>
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-bg-shape"></div>
          <div className="hero-bg-shape"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <h2>Building <span>Praya's Future</span></h2>
            <p>The Buildings Department oversees construction safety, issues building permits, and ensures all structures meet safety and environmental standards in the Republic of Praya.</p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => navigate('/bd/permits')}>
                Apply for Permit
              </button>
              <button className="btn btn-secondary" onClick={() => navigate('/bd/inspections')}>
                Schedule Inspection
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Permits Issued</span>
              <span className="stat-value">8,432</span>
              <span className="stat-change">FY 2024</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Inspections</span>
              <span className="stat-value">24,891</span>
              <span className="stat-change">YTD</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Avg Processing</span>
              <span className="stat-value">12</span>
              <span className="stat-change">Business Days</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Compliance Rate</span>
              <span className="stat-value">96.8%</span>
              <span className="stat-change">+1.2% YoY</span>
            </div>
          </div>
        </div>
      </section>

      <main className="main">
        <div className="container">
          <div className="content-grid">
            <div className="main-content">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Permit Types</h3>
                  <Link to="/bd/permits" className="card-link">View All</Link>
                </div>
                <div className="content-text">
                  <p>The Buildings Department issues permits for various construction activities:</p>
                  <ul>
                    <li><strong>New Construction</strong> - Residential, commercial, and industrial buildings</li>
                    <li><strong>Renovation Permits</strong> - Major alterations and structural modifications</li>
                    <li><strong>Demolition Permits</strong> - Safe removal of existing structures</li>
                    <li><strong>Electrical & Plumbing</strong> - Specialized trade permits</li>
                  </ul>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Recent Announcements</h3>
                </div>
                <div className="news-item">
                  <span className="news-date">Nov 28, 2024</span>
                  <h4 className="news-title">Updated Energy Efficiency Standards</h4>
                  <p className="news-excerpt">New energy efficiency requirements for commercial buildings take effect January 1, 2025.</p>
                </div>
                <div className="news-item">
                  <span className="news-date">Nov 15, 2024</span>
                  <h4 className="news-title">Online Permit Portal Upgrade</h4>
                  <p className="news-excerpt">Enhanced digital submission system now accepts 3D building models and automated plan checks.</p>
                </div>
              </div>
            </div>

            <aside className="sidebar">
              <div className="card">
                <h4 className="card-title">Quick Services</h4>
                <div className="quick-link" onClick={() => navigate('/bd/permits')}>
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                      <polyline points="14,2 14,8 20,8"/>
                      <line x1="12" y1="18" x2="12" y2="12"/>
                      <line x1="9" y1="15" x2="15" y2="15"/>
                    </svg>
                  </span>
                  Apply for Permit
                </div>
                <div className="quick-link" onClick={() => navigate('/bd/inspections')}>
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                  </span>
                  Schedule Inspection
                </div>
                <div className="quick-link" onClick={() => navigate('/bd/services')}>
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"/>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                  </span>
                  Permit Status Lookup
                </div>
                <div className="quick-link" onClick={() => navigate('/bd/codes')}>
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
                    </svg>
                  </span>
                  Building Codes
                </div>
              </div>

              <div className="info-box">
                <h4>Need Assistance?</h4>
                <p>Visit our permit center or call 1-800-PRAYA-BUILD for help with your building project.</p>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  )
}

function BDPermits() {
  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/bd">Home</Link> / Building Permits
          </div>
          <h1>Building Permits</h1>
          <p className="subtitle">Apply for construction, renovation, and demolition permits</p>
        </div>
      </div>
      <div className="container">
        <div className="content-text">
          <h3>Permit Categories</h3>
          <p>Select the appropriate permit type for your construction project:</p>

          <div className="card" style={{ marginTop: '20px' }}>
            <h4 className="card-title">New Construction Permit</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>For building new residential, commercial, or industrial structures. Includes foundation, structural, and occupancy approvals.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Fee:</strong> ¤500 - ¤5,000 (based on project value) | <strong>Processing:</strong> 15-30 business days
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Renovation Permit</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>For major alterations, additions, or structural modifications to existing buildings. Minor cosmetic changes may not require a permit.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Fee:</strong> ¤200 - ¤2,000 | <strong>Processing:</strong> 10-20 business days
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Demolition Permit</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Required for complete or partial demolition of structures. Includes asbestos inspection and environmental clearance.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Fee:</strong> ¤300 - ¤1,500 | <strong>Processing:</strong> 7-14 business days
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Trade Permits</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Specialized permits for electrical, plumbing, HVAC, and fire protection systems. Must be obtained by licensed contractors.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Fee:</strong> ¤100 - ¤800 | <strong>Processing:</strong> 5-10 business days
            </div>
          </div>

          <h3>Required Documents</h3>
          <ul>
            <li>Completed application form</li>
            <li>Architectural drawings and plans</li>
            <li>Structural engineering reports</li>
            <li>Site survey and land title</li>
            <li>Environmental impact assessment (for large projects)</li>
            <li>Contractor license verification</li>
          </ul>
        </div>
      </div>
    </main>
  )
}

function ComingSoon({ title }) {
  const navigate = useNavigate();

  const getServiceInfo = () => {
    switch(title) {
      case 'Building Inspections':
        return {
          description: 'Schedule and manage building inspections throughout the construction process.',
          services: ['Pre-Construction Inspection', 'Foundation Inspection', 'Framing Inspection', 'Final Inspection'],
          contact: 'For inspection inquiries, contact the Inspections Division at 1-800-PRAYA-INSPECT'
        };
      case 'Building Codes':
        return {
          description: 'Access the complete Building Code of the Republic of Praya and construction standards.',
          services: ['Structural Codes', 'Fire Safety Standards', 'Accessibility Requirements', 'Energy Efficiency Codes'],
          contact: 'Code interpretation assistance available at codes@buildings.gov.py'
        };
      case 'Online Services':
        return {
          description: 'Digital services for permit applications, status tracking, and document submissions.',
          services: ['Permit Status Lookup', 'Online Applications', 'Document Upload', 'Fee Payment'],
          contact: 'Technical support: 1-800-PRAYA-BUILD or support@buildings.gov.py'
        };
      default:
        return {
          description: 'This service is being developed to better serve construction needs in Praya.',
          services: [],
          contact: 'For assistance, contact the Buildings Department at info@buildings.gov.py'
        };
    }
  };

  const info = getServiceInfo();

  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/bd">Home</Link> / {title}
          </div>
          <h1>{title}</h1>
          <p className="subtitle">{info.description}</p>
        </div>
      </div>
      <div className="container">
        <div className="card">
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{
              width: '64px',
              height: '64px',
              background: 'linear-gradient(135deg, rgba(217, 119, 6, 0.1) 0%, rgba(217, 119, 6, 0.2) 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px'
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 16v-4M12 8h.01"/>
              </svg>
            </div>
            <h3 style={{ marginBottom: '12px' }}>Service Under Development</h3>
            <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto 24px' }}>
              We're working to bring this service online. In the meantime, you can access these services through traditional channels.
            </p>

            {info.services.length > 0 && (
              <div style={{ marginTop: '24px', textAlign: 'left', maxWidth: '400px', margin: '24px auto 0' }}>
                <h4 style={{ fontSize: '14px', marginBottom: '12px' }}>Available Services:</h4>
                <ul style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                  {info.services.map(service => (
                    <li key={service} style={{ marginBottom: '8px' }}>{service}</li>
                  ))}
                </ul>
              </div>
            )}

            <div style={{
              marginTop: '32px',
              padding: '16px',
              background: 'rgba(217, 119, 6, 0.05)',
              borderRadius: '10px',
              fontSize: '13px',
              color: 'var(--text-muted)'
            }}>
              {info.contact}
            </div>

            <div style={{ marginTop: '32px' }}>
              <h4 style={{ fontSize: '14px', marginBottom: '12px' }}>Related Services</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                <Link to="/bd/permits" style={{
                  padding: '14px',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: '500',
                  color: 'var(--text-primary)',
                  transition: 'all 0.2s'
                }}>
                  Building Permits
                </Link>
                <button
                  onClick={() => navigate('/bd')}
                  className="btn btn-secondary"
                  style={{ fontSize: '13px', padding: '14px' }}
                >
                  Return to BD Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
