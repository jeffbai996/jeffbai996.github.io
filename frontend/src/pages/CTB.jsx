import React, { useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import './Department.css'

// CTB-specific subpages would be imported here
// import Licensing from './ctb/Licensing'

export default function CTB() {
  const navigate = useNavigate()

  useEffect(() => {
    document.body.classList.add('theme-ctb')
    return () => document.body.classList.remove('theme-ctb')
  }, [])

  return (
    <>
      <header className="dept-header">
        <div className="container">
          <Link to="/ctb" className="dept-logo">
            <div className="logo-mark">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
                <path d="M12 3.5 6 6.75v3.6c0 3.12 2.52 6.25 6 7.9 3.48-1.65 6-4.78 6-7.9v-3.6z"/>
                <path d="M12 6.5c-.8 1.45-1.26 3.11-1.26 4.74 0 .53.03 1.05.1 1.56"/>
                <path d="M12 6.5c.8 1.45 1.26 3.11 1.26 4.74 0 .53-.03 1.05-.1 1.56"/>
                <path d="M9.75 12.4c.7.34 1.46.53 2.25.53.79 0 1.55-.19 2.25-.53"/>
              </svg>
            </div>
            <div className="logo-text">
              <h1>Cannabis Tax Bureau</h1>
              <span className="tagline">Republic of Praya</span>
            </div>
          </Link>
          <nav className="nav">
            <Link to="/ctb" className="nav-link">Home</Link>
            <Link to="/ctb/licensing" className="nav-link">Licensing</Link>
            <Link to="/ctb/taxation" className="nav-link">Taxation</Link>
            <Link to="/ctb/compliance" className="nav-link">Compliance</Link>
            <Link to="/ctb/research" className="nav-link">Research</Link>
          </nav>
        </div>
      </header>

      <Routes>
        <Route index element={<CTBHome navigate={navigate} />} />
        <Route path="licensing" element={<CTBLicensing />} />
        <Route path="taxation" element={<ComingSoon title="Taxation" />} />
        <Route path="compliance" element={<ComingSoon title="Compliance" />} />
        <Route path="research" element={<ComingSoon title="Research" />} />
      </Routes>

      <footer className="dept-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <h4>Cannabis Tax Bureau</h4>
              <p>Regulating and supporting the legal cannabis industry in the Republic of Praya since 2020.</p>
            </div>
            <div className="footer-section">
              <h5>Services</h5>
              <ul>
                <li><Link to="/ctb/licensing">Licensing</Link></li>
                <li><Link to="/ctb/taxation">Tax Filing</Link></li>
                <li><Link to="/ctb/compliance">Compliance</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5>Resources</h5>
              <ul>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Forms</a></li>
                <li><a href="#">News</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5>Government</h5>
              <ul>
                <li><Link to="/">Gov Portal</Link></li>
                <li><Link to="/doj">Dept. of Justice</Link></li>
                <li><Link to="/interior">Interior Dept.</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>&copy; 2024 Republic of Praya. Cannabis Tax Bureau.</span>
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

function CTBHome({ navigate }) {
  return (
    <>
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-bg-shape"></div>
          <div className="hero-bg-shape"></div>
          <div className="hero-bg-shape"></div>
        </div>
        <div className="hero-pattern"></div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 3.5 6 6.75v3.6c0 3.12 2.52 6.25 6 7.9 3.48-1.65 6-4.78 6-7.9v-3.6z"/>
              </svg>
              Cannabis Regulation
            </div>
            <h2>Regulating Cannabis for a <span>Better Tomorrow</span></h2>
            <p>The Cannabis Tax Bureau oversees all licensing, taxation, and compliance for the legal cannabis industry in the Republic of Praya, ensuring safe and regulated access.</p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => navigate('/ctb/licensing')}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <line x1="3" y1="9" x2="21" y2="9"/>
                </svg>
                Apply for License
              </button>
              <button className="btn btn-secondary" onClick={() => navigate('/ctb/taxation')}>
                File Taxes
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Active Licenses</span>
              <span className="stat-value">1,247</span>
              <span className="stat-change">+12% YoY</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Tax Revenue</span>
              <span className="stat-value">$84M</span>
              <span className="stat-change">FY 2024</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Compliance Rate</span>
              <span className="stat-value">97.2%</span>
              <span className="stat-change">Industry avg</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Processing Time</span>
              <span className="stat-value">14</span>
              <span className="stat-change">Avg days</span>
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
                  <h3 className="card-title">License Types</h3>
                  <Link to="/ctb/licensing" className="card-link">View All</Link>
                </div>
                <div className="license-grid">
                  <div className="license-card">
                    <div className="license-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                      </svg>
                    </div>
                    <h4>Cultivation License</h4>
                    <span className="code">CTB-CUL</span>
                    <p>For growing and harvesting cannabis plants.</p>
                    <button className="btn btn-primary btn-sm" onClick={() => navigate('/ctb/licensing')}>Apply</button>
                  </div>
                  <div className="license-card">
                    <div className="license-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                        <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
                      </svg>
                    </div>
                    <h4>Retail License</h4>
                    <span className="code">CTB-RET</span>
                    <p>For operating retail dispensaries.</p>
                    <button className="btn btn-primary btn-sm" onClick={() => navigate('/ctb/licensing')}>Apply</button>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Latest News</h3>
                </div>
                <div className="news-item">
                  <span className="news-date">Nov 15, 2024</span>
                  <h4 className="news-title">Q4 Tax Filing Deadline Approaching</h4>
                  <p className="news-excerpt">All licensed operators must submit quarterly tax filings by December 15th.</p>
                </div>
                <div className="news-item">
                  <span className="news-date">Nov 10, 2024</span>
                  <h4 className="news-title">New Compliance Guidelines Released</h4>
                  <p className="news-excerpt">Updated packaging and labeling requirements effective January 2025.</p>
                </div>
              </div>
            </div>

            <aside className="sidebar">
              <div className="tax-box">
                <span className="tax-label">
                  Current Excise Rate
                  <span className="live-indicator">LIVE</span>
                </span>
                <span className="tax-rate">15<span className="percent">%</span></span>
                <span className="tax-date">Effective Jan 1, 2024</span>
              </div>

              <div className="card">
                <h4 className="card-title">Quick Links</h4>
                <div className="quick-link" onClick={() => navigate('/ctb/licensing')}>
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                      <polyline points="14,2 14,8 20,8"/>
                    </svg>
                  </span>
                  Apply for License
                </div>
                <div className="quick-link" onClick={() => navigate('/ctb/taxation')}>
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                      <line x1="1" y1="10" x2="23" y2="10"/>
                    </svg>
                  </span>
                  File Tax Return
                </div>
                <div className="quick-link" onClick={() => navigate('/ctb/compliance')}>
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                      <polyline points="22,4 12,14.01 9,11.01"/>
                    </svg>
                  </span>
                  Check Compliance
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  )
}

function CTBLicensing() {
  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/ctb">Home</Link> / Licensing
          </div>
          <h1>Cannabis Licensing</h1>
          <p className="subtitle">Apply for and manage your cannabis business licenses</p>
        </div>
      </div>
      <div className="container">
        <div className="content-text">
          <h3>Available License Types</h3>
          <p>The Cannabis Tax Bureau offers several license categories for cannabis businesses:</p>
          <ul>
            <li><strong>Cultivation License (CTB-CUL)</strong> - For growing cannabis plants</li>
            <li><strong>Processing License (CTB-PRO)</strong> - For manufacturing cannabis products</li>
            <li><strong>Retail License (CTB-RET)</strong> - For operating dispensaries</li>
            <li><strong>Testing License (CTB-TST)</strong> - For laboratory testing services</li>
          </ul>

          <div className="info-box">
            <h4>Application Requirements</h4>
            <p>All applicants must pass a background check, submit a business plan, and demonstrate adequate capitalization.</p>
          </div>

          <h3>How to Apply</h3>
          <p>License applications are submitted through the online portal. Processing typically takes 14-21 business days.</p>

          <div className="card" style={{ marginTop: '24px' }}>
            <h4 className="card-title">Start Your Application</h4>
            <p style={{ marginBottom: '16px', color: 'var(--text-muted)' }}>Select the license type you wish to apply for:</p>
            <div className="license-grid">
              <div className="license-card">
                <h4>Cultivation</h4>
                <p>Grow and harvest cannabis</p>
                <button className="btn btn-primary btn-sm">Apply Now</button>
              </div>
              <div className="license-card">
                <h4>Processing</h4>
                <p>Manufacture products</p>
                <button className="btn btn-primary btn-sm">Apply Now</button>
              </div>
              <div className="license-card">
                <h4>Retail</h4>
                <p>Operate a dispensary</p>
                <button className="btn btn-primary btn-sm">Apply Now</button>
              </div>
              <div className="license-card">
                <h4>Testing</h4>
                <p>Lab testing services</p>
                <button className="btn btn-primary btn-sm">Apply Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

function ComingSoon({ title }) {
  const navigate = useNavigate();

  const getServiceInfo = () => {
    switch(title) {
      case 'Taxation':
        return {
          description: 'File and manage cannabis tax returns, view current rates, and access compliance resources.',
          services: ['Quarterly Tax Filing', 'Tax Rate Schedule', 'Payment History', 'Tax Calculation Tools'],
          contact: 'Tax assistance: 1-800-PRAYA-TAX or tax@ctb.gov.py'
        };
      case 'Compliance':
        return {
          description: 'Compliance guidelines, inspection schedules, and regulatory requirements for license holders.',
          services: ['Compliance Checklist', 'Inspection Calendar', 'Violation Reporting', 'Best Practices Guide'],
          contact: 'Compliance questions: 1-800-PRAYA-CTB or compliance@ctb.gov.py'
        };
      case 'Research':
        return {
          description: 'Industry data, market research, and cannabis policy analysis for the Republic of Praya.',
          services: ['Market Statistics', 'Research Reports', 'Policy Analysis', 'Industry Trends'],
          contact: 'Research inquiries: research@ctb.gov.py'
        };
      default:
        return {
          description: 'This service is being developed to support the legal cannabis industry in Praya.',
          services: [],
          contact: 'For assistance, contact the Cannabis Tax Bureau at info@ctb.gov.py'
        };
    }
  };

  const info = getServiceInfo();

  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/ctb">Home</Link> / {title}
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
              background: 'linear-gradient(135deg, rgba(45, 134, 89, 0.1) 0%, rgba(45, 134, 89, 0.2) 100%)',
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
              We're working to bring this service online. In the meantime, you can access these services through traditional channels or contact our office directly.
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
              background: 'rgba(45, 134, 89, 0.05)',
              borderRadius: '10px',
              fontSize: '13px',
              color: 'var(--text-muted)'
            }}>
              {info.contact}
            </div>

            <div style={{ marginTop: '32px' }}>
              <h4 style={{ fontSize: '14px', marginBottom: '12px' }}>Related Services</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                <Link to="/ctb/licensing" style={{
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
                  Licensing Information
                </Link>
                <button
                  onClick={() => navigate('/ctb')}
                  className="btn btn-secondary"
                  style={{ fontSize: '13px', padding: '14px' }}
                >
                  Return to CTB Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
