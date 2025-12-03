import React, { useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import './Department.css'

export default function CR() {
  const navigate = useNavigate()

  useEffect(() => {
    document.body.classList.add('theme-cr')
    return () => document.body.classList.remove('theme-cr')
  }, [])

  return (
    <>
      <header className="dept-header">
        <div className="container">
          <Link to="/cr" className="dept-logo">
            <div className="logo-mark">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <div className="logo-text">
              <h1>Companies Registry</h1>
              <span className="tagline">Republic of Praya</span>
            </div>
          </Link>
          <nav className="nav">
            <Link to="/cr" className="nav-link">Home</Link>
            <Link to="/cr/register" className="nav-link">Register Company</Link>
            <Link to="/cr/search" className="nav-link">Company Search</Link>
            <Link to="/cr/filings" className="nav-link">Annual Filings</Link>
            <Link to="/cr/services" className="nav-link">Services</Link>
          </nav>
        </div>
      </header>

      <Routes>
        <Route index element={<CRHome navigate={navigate} />} />
        <Route path="register" element={<CRRegister />} />
        <Route path="search" element={<ComingSoon title="Company Search" />} />
        <Route path="filings" element={<ComingSoon title="Annual Filings" />} />
        <Route path="services" element={<ComingSoon title="Online Services" />} />
      </Routes>

      <footer className="dept-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <h4>Companies Registry</h4>
              <p>The official registry for business incorporation and company records in the Republic of Praya.</p>
            </div>
            <div className="footer-section">
              <h5>Services</h5>
              <ul>
                <li><Link to="/cr/register">Register Company</Link></li>
                <li><Link to="/cr/search">Company Search</Link></li>
                <li><Link to="/cr/filings">Annual Filings</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5>Resources</h5>
              <ul>
                <li><a href="#">Companies Act</a></li>
                <li><a href="#">Forms Library</a></li>
                <li><a href="#">Fee Schedule</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5>Government</h5>
              <ul>
                <li><Link to="/">Gov Portal</Link></li>
                <li><a href="/pages/RD_Praya.html">Revenue Dept.</a></li>
                <li><a href="/pages/CTB_Praya.html">Cannabis Tax Bureau</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>&copy; 2024 Republic of Praya. Companies Registry.</span>
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

function CRHome({ navigate }) {
  return (
    <>
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-bg-shape"></div>
          <div className="hero-bg-shape"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <h2>Register Your <span>Business</span></h2>
            <p>The Companies Registry is the official authority for incorporating businesses, maintaining company records, and ensuring corporate compliance in the Republic of Praya.</p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => navigate('/cr/register')}>
                Incorporate Now
              </button>
              <button className="btn btn-secondary" onClick={() => navigate('/cr/search')}>
                Search Companies
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Registered Companies</span>
              <span className="stat-value">147,832</span>
              <span className="stat-change">Active</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">New Incorporations</span>
              <span className="stat-value">12,456</span>
              <span className="stat-change">FY 2024</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Avg Processing</span>
              <span className="stat-value">3</span>
              <span className="stat-change">Business Days</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Online Filings</span>
              <span className="stat-value">94.2%</span>
              <span className="stat-change">Digital Rate</span>
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
                  <h3 className="card-title">Business Entity Types</h3>
                  <Link to="/cr/register" className="card-link">Register Now</Link>
                </div>
                <div className="content-text">
                  <p>Choose the appropriate business structure for your needs:</p>
                  <ul>
                    <li><strong>Private Limited Company (Ltd)</strong> - Most common for small to medium businesses</li>
                    <li><strong>Public Limited Company (PLC)</strong> - For companies seeking public investment</li>
                    <li><strong>Limited Liability Partnership (LLP)</strong> - Combines partnership flexibility with limited liability</li>
                    <li><strong>Sole Proprietorship</strong> - Simple registration for individual traders</li>
                  </ul>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Recent Announcements</h3>
                </div>
                <div className="news-item">
                  <span className="news-date">Nov 25, 2024</span>
                  <h4 className="news-title">Simplified Incorporation Process</h4>
                  <p className="news-excerpt">New streamlined online registration now allows same-day incorporation for standard company types.</p>
                </div>
                <div className="news-item">
                  <span className="news-date">Nov 18, 2024</span>
                  <h4 className="news-title">Annual Return Deadline Reminder</h4>
                  <p className="news-excerpt">All companies must file annual returns by December 31, 2024 to avoid late filing penalties.</p>
                </div>
              </div>
            </div>

            <aside className="sidebar">
              <div className="card">
                <h4 className="card-title">Quick Services</h4>
                <div className="quick-link" onClick={() => navigate('/cr/register')}>
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                      <polyline points="14,2 14,8 20,8"/>
                      <line x1="12" y1="18" x2="12" y2="12"/>
                      <line x1="9" y1="15" x2="15" y2="15"/>
                    </svg>
                  </span>
                  New Registration
                </div>
                <div className="quick-link" onClick={() => navigate('/cr/search')}>
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"/>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                  </span>
                  Company Search
                </div>
                <div className="quick-link" onClick={() => navigate('/cr/filings')}>
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                  </span>
                  Annual Filings
                </div>
                <div className="quick-link">
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                      <polyline points="14,2 14,8 20,8"/>
                    </svg>
                  </span>
                  Download Forms
                </div>
              </div>

              <div className="info-box">
                <h4>Starting a Business?</h4>
                <p>Our business advisory service can help you choose the right company structure. Call 1-800-PRAYA-BIZ for free consultation.</p>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  )
}

function CRRegister() {
  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/cr">Home</Link> / Register Company
          </div>
          <h1>Company Registration</h1>
          <p className="subtitle">Incorporate your business in the Republic of Praya</p>
        </div>
      </div>
      <div className="container">
        <div className="content-text">
          <h3>Company Types</h3>
          <p>Select the business structure that best fits your needs:</p>

          <div className="card" style={{ marginTop: '20px' }}>
            <h4 className="card-title">Private Limited Company (Ltd)</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Ideal for small to medium businesses. Requires minimum 1 director and 1 shareholder. Share capital minimum ¤1.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Fee:</strong> ¤350 | <strong>Processing:</strong> 1-3 business days
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Public Limited Company (PLC)</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>For companies seeking to raise capital from the public. Requires minimum 2 directors and share capital of ¤50,000.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Fee:</strong> ¤1,500 | <strong>Processing:</strong> 5-10 business days
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Limited Liability Partnership (LLP)</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Combines the flexibility of a partnership with limited liability protection. Popular for professional services firms.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Fee:</strong> ¤250 | <strong>Processing:</strong> 1-3 business days
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Sole Proprietorship</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Simplest form of business registration for individual traders. No separation between owner and business entity.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Fee:</strong> ¤50 | <strong>Processing:</strong> Same day
            </div>
          </div>

          <h3>Required Documents</h3>
          <ul>
            <li>Completed incorporation form</li>
            <li>Articles of Association</li>
            <li>Memorandum of Association</li>
            <li>Director and shareholder identification</li>
            <li>Registered office address proof</li>
            <li>Company secretary appointment (for PLCs)</li>
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
      case 'Company Search':
        return {
          description: 'Search the registry for company information, directors, and filing history.',
          services: ['Company Name Search', 'Director Search', 'Document Retrieval', 'Certificate Verification'],
          contact: 'For search inquiries, contact the Registry at 1-800-PRAYA-REG'
        };
      case 'Annual Filings':
        return {
          description: 'Submit annual returns, financial statements, and statutory documents.',
          services: ['Annual Return Filing', 'Financial Statements', 'Director Changes', 'Address Updates'],
          contact: 'Filing support available at filings@cr.gov.py'
        };
      case 'Online Services':
        return {
          description: 'Digital services for company management, document submissions, and certificate requests.',
          services: ['Document Filing', 'Certificate Requests', 'Company Updates', 'Status Tracking'],
          contact: 'Technical support: 1-800-PRAYA-BIZ or support@cr.gov.py'
        };
      default:
        return {
          description: 'This service is being developed to better serve businesses in Praya.',
          services: [],
          contact: 'For assistance, contact the Companies Registry at info@cr.gov.py'
        };
    }
  };

  const info = getServiceInfo();

  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/cr">Home</Link> / {title}
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
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.2) 100%)',
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
              background: 'rgba(59, 130, 246, 0.05)',
              borderRadius: '10px',
              fontSize: '13px',
              color: 'var(--text-muted)'
            }}>
              {info.contact}
            </div>

            <div style={{ marginTop: '32px' }}>
              <h4 style={{ fontSize: '14px', marginBottom: '12px' }}>Related Services</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                <Link to="/cr/register" style={{
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
                  Register Company
                </Link>
                <button
                  onClick={() => navigate('/cr')}
                  className="btn btn-secondary"
                  style={{ fontSize: '13px', padding: '14px' }}
                >
                  Return to CR Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
