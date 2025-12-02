import React, { useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import './Department.css'

export default function DOJ() {
  const navigate = useNavigate()

  useEffect(() => {
    document.body.classList.add('theme-doj')
    return () => document.body.classList.remove('theme-doj')
  }, [])

  return (
    <>
      <header className="dept-header">
        <div className="container">
          <Link to="/doj" className="dept-logo">
            <div className="logo-mark">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
            </div>
            <div className="logo-text">
              <h1>Department of Justice</h1>
              <span className="tagline">Republic of Praya</span>
            </div>
          </Link>
          <nav className="nav">
            <Link to="/doj" className="nav-link">Home</Link>
            <Link to="/doj/courts" className="nav-link">Courts</Link>
            <Link to="/doj/prosecution" className="nav-link">Prosecution</Link>
            <Link to="/doj/code" className="nav-link">Criminal Code</Link>
            <Link to="/doj/services" className="nav-link">Services</Link>
          </nav>
        </div>
      </header>

      <Routes>
        <Route index element={<DOJHome navigate={navigate} />} />
        <Route path="courts" element={<DOJCourts />} />
        <Route path="prosecution" element={<ComingSoon title="Prosecution Services" />} />
        <Route path="code" element={<ComingSoon title="Criminal Code" />} />
        <Route path="services" element={<ComingSoon title="Online Services" />} />
      </Routes>

      <footer className="dept-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <h4>Department of Justice</h4>
              <p>Upholding the rule of law and ensuring justice for all citizens of the Republic of Praya.</p>
            </div>
            <div className="footer-section">
              <h5>Services</h5>
              <ul>
                <li><Link to="/doj/courts">Court System</Link></li>
                <li><Link to="/doj/prosecution">Prosecution</Link></li>
                <li><Link to="/doj/services">Online Services</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5>Resources</h5>
              <ul>
                <li><Link to="/doj/code">Criminal Code</Link></li>
                <li><a href="#">Legal Aid</a></li>
                <li><a href="#">Forms</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5>Government</h5>
              <ul>
                <li><Link to="/">Gov Portal</Link></li>
                <li><a href="/CTB_Praya.html">Cannabis Tax Bureau</a></li>
                <li><a href="/ID_Praya.html">Interior Dept.</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>&copy; 2024 Republic of Praya. Department of Justice.</span>
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

function DOJHome({ navigate }) {
  return (
    <>
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-bg-shape"></div>
          <div className="hero-bg-shape"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <h2>Justice for <span>All Citizens</span></h2>
            <p>The Department of Justice ensures equal access to justice, maintains the court system, and prosecutes crimes in the Republic of Praya.</p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => navigate('/doj/courts')}>
                Court Information
              </button>
              <button className="btn btn-secondary" onClick={() => navigate('/doj/services')}>
                Case Lookup
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Cases Filed</span>
              <span className="stat-value">12,847</span>
              <span className="stat-change">FY 2024</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Resolution Rate</span>
              <span className="stat-value">94.3%</span>
              <span className="stat-change">+2.1% YoY</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Court Locations</span>
              <span className="stat-value">24</span>
              <span className="stat-change">Nationwide</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Avg Resolution</span>
              <span className="stat-value">45</span>
              <span className="stat-change">Days</span>
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
                  <h3 className="card-title">Court System</h3>
                  <Link to="/doj/courts" className="card-link">Learn More</Link>
                </div>
                <div className="content-text">
                  <p>The Praya court system consists of three tiers:</p>
                  <ul>
                    <li><strong>District Courts</strong> - Handle civil and criminal cases at the local level</li>
                    <li><strong>Appeals Court</strong> - Reviews decisions from district courts</li>
                    <li><strong>Supreme Court</strong> - Final arbiter of constitutional matters</li>
                  </ul>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Recent Announcements</h3>
                </div>
                <div className="news-item">
                  <span className="news-date">Nov 20, 2024</span>
                  <h4 className="news-title">New E-Filing System Launch</h4>
                  <p className="news-excerpt">All civil filings can now be submitted electronically through the new portal.</p>
                </div>
                <div className="news-item">
                  <span className="news-date">Nov 12, 2024</span>
                  <h4 className="news-title">Holiday Court Schedule</h4>
                  <p className="news-excerpt">Courts will be closed Dec 23-26 and Dec 31-Jan 1 for the holiday period.</p>
                </div>
              </div>
            </div>

            <aside className="sidebar">
              <div className="card">
                <h4 className="card-title">Quick Services</h4>
                <div className="quick-link" onClick={() => navigate('/doj/services')}>
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"/>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                  </span>
                  Case Lookup
                </div>
                <div className="quick-link" onClick={() => navigate('/doj/courts')}>
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                  </span>
                  Court Calendar
                </div>
                <div className="quick-link" onClick={() => navigate('/doj/code')}>
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
                    </svg>
                  </span>
                  Criminal Code
                </div>
                <div className="quick-link">
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                      <polyline points="14,2 14,8 20,8"/>
                    </svg>
                  </span>
                  Court Forms
                </div>
              </div>

              <div className="info-box">
                <h4>Need Legal Help?</h4>
                <p>Free legal aid is available for qualifying citizens. Contact the Legal Aid Office at 1-800-PRAYA-LAW.</p>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  )
}

function DOJCourts() {
  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/doj">Home</Link> / Courts
          </div>
          <h1>Court System</h1>
          <p className="subtitle">Information about the Republic of Praya court system</p>
        </div>
      </div>
      <div className="container">
        <div className="content-text">
          <h3>Court Structure</h3>
          <p>The judicial system of the Republic of Praya is organized into three tiers:</p>

          <div className="card" style={{ marginTop: '20px' }}>
            <h4 className="card-title">Supreme Court</h4>
            <p style={{ color: 'var(--text-muted)' }}>The highest court in Praya, with final authority on constitutional matters and appeals from the Appeals Court.</p>
          </div>

          <div className="card">
            <h4 className="card-title">Appeals Court</h4>
            <p style={{ color: 'var(--text-muted)' }}>Reviews decisions from District Courts. Three regional divisions serve the entire nation.</p>
          </div>

          <div className="card">
            <h4 className="card-title">District Courts</h4>
            <p style={{ color: 'var(--text-muted)' }}>24 district courts handle civil and criminal matters at the local level. Each district serves approximately 100,000 citizens.</p>
          </div>

          <h3>Court Services</h3>
          <ul>
            <li>Filing civil and criminal cases</li>
            <li>Small claims proceedings</li>
            <li>Family court matters</li>
            <li>Traffic and municipal violations</li>
            <li>Jury service information</li>
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
      case 'Prosecution Services':
        return {
          description: 'Information about prosecution procedures and victim support services.',
          services: ['Case Status Inquiry', 'Victim Services', 'Witness Information', 'Prosecution Guidelines'],
          contact: 'For prosecution inquiries, contact the Office of the Prosecutor at 1-800-PRAYA-DOJ'
        };
      case 'Criminal Code':
        return {
          description: 'Access the complete Criminal Code of the Republic of Praya and legal resources.',
          services: ['Criminal Code Database', 'Legal Definitions', 'Sentencing Guidelines', 'Recent Amendments'],
          contact: 'Legal research assistance available at library@doj.gov.py'
        };
      case 'Online Services':
        return {
          description: 'Digital services for case management, filing, and court records access.',
          services: ['Case Lookup', 'E-Filing System', 'Court Calendar', 'Legal Forms Download'],
          contact: 'Technical support: 1-800-PRAYA-COURT or support@courts.gov.py'
        };
      default:
        return {
          description: 'This service is being developed to better serve the justice needs of Praya.',
          services: [],
          contact: 'For assistance, contact the Department of Justice at info@doj.gov.py'
        };
    }
  };

  const info = getServiceInfo();

  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/doj">Home</Link> / {title}
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
              background: 'linear-gradient(135deg, rgba(153, 27, 27, 0.1) 0%, rgba(153, 27, 27, 0.2) 100%)',
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
              background: 'rgba(153, 27, 27, 0.05)',
              borderRadius: '10px',
              fontSize: '13px',
              color: 'var(--text-muted)'
            }}>
              {info.contact}
            </div>

            <div style={{ marginTop: '32px' }}>
              <h4 style={{ fontSize: '14px', marginBottom: '12px' }}>Related Services</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                <Link to="/doj/courts" style={{
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
                  Court Information
                </Link>
                <button
                  onClick={() => navigate('/doj')}
                  className="btn btn-secondary"
                  style={{ fontSize: '13px', padding: '14px' }}
                >
                  Return to DOJ Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
