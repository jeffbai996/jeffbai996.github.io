import React, { useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import './Department.css'

export default function LC() {
  const navigate = useNavigate()

  useEffect(() => {
    document.body.classList.add('theme-lc')
    return () => document.body.classList.remove('theme-lc')
  }, [])

  return (
    <>
      <header className="dept-header">
        <div className="container">
          <Link to="/lc" className="dept-logo">
            <div className="logo-mark">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21h18"></path>
                <path d="M3 3h18v14H3z"></path>
                <path d="M9 3v18"></path>
                <path d="M3 9h18"></path>
              </svg>
            </div>
            <div className="logo-text">
              <h1>Legislative Council</h1>
              <span className="tagline">Republic of Praya</span>
            </div>
          </Link>
          <nav className="nav">
            <Link to="/lc" className="nav-link">Home</Link>
            <Link to="/lc/members" className="nav-link">Members</Link>
            <Link to="/lc/bills" className="nav-link">Bills & Laws</Link>
            <Link to="/lc/sessions" className="nav-link">Sessions</Link>
          </nav>
        </div>
      </header>

      <Routes>
        <Route index element={<LCHome navigate={navigate} />} />
        <Route path="members" element={<Members />} />
        <Route path="bills" element={<ComingSoon title="Bills & Legislation" />} />
        <Route path="sessions" element={<ComingSoon title="Legislative Sessions" />} />
      </Routes>

      <footer className="dept-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <h4>Legislative Council</h4>
              <p>The legislative branch of the Republic of Praya, representing the people and enacting laws for the common good.</p>
            </div>
            <div className="footer-section">
              <h5>Legislature</h5>
              <ul>
                <li><Link to="/lc/members">Council Members</Link></li>
                <li><a href="#">Committees</a></li>
                <li><a href="#">Leadership</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5>Resources</h5>
              <ul>
                <li><a href="#">Watch Live Sessions</a></li>
                <li><a href="#">Meeting Calendar</a></li>
                <li><a href="#">Archives</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5>Government</h5>
              <ul>
                <li><Link to="/">Gov Portal</Link></li>
                <li><a href="#">Constitution</a></li>
                <li><a href="#">Statutes</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>&copy; 2024 Republic of Praya. Legislative Council.</span>
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

function LCHome({ navigate }) {
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
                <path d="M3 21h18"></path>
                <path d="M3 3h18v14H3z"></path>
                <path d="M9 3v18"></path>
                <path d="M3 9h18"></path>
              </svg>
              Legislature
            </div>
            <h2>Voice of the <span>People</span></h2>
            <p>The Legislative Council is the elected representative body of the Republic of Praya, responsible for making laws, approving budgets, and overseeing government operations on behalf of all citizens.</p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => navigate('/lc/members')}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                Council Members
              </button>
              <button className="btn btn-secondary" onClick={() => navigate('/lc/bills')}>
                Track Legislation
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Council Members</span>
              <span className="stat-value">120</span>
              <span className="stat-change">Elected</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Bills Passed</span>
              <span className="stat-value">247</span>
              <span className="stat-change">This Session</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Committees</span>
              <span className="stat-value">18</span>
              <span className="stat-change">Standing</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Session Days</span>
              <span className="stat-value">156</span>
              <span className="stat-change">This Year</span>
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
                  <h3 className="card-title">About the Legislative Council</h3>
                </div>
                <div className="content-text">
                  <h4>Structure</h4>
                  <ul>
                    <li><strong>120 Members:</strong> Elected from single-member districts</li>
                    <li><strong>Term Length:</strong> 4 years with no term limits</li>
                    <li><strong>Leadership:</strong> Speaker, Deputy Speaker, Majority & Minority Leaders</li>
                    <li><strong>Sessions:</strong> Year-round with scheduled recesses</li>
                  </ul>
                  <h4 style={{ marginTop: '20px' }}>Powers & Responsibilities</h4>
                  <ul>
                    <li><strong>Legislation:</strong> Propose, debate, and pass laws</li>
                    <li><strong>Budget:</strong> Approve annual budget and appropriations</li>
                    <li><strong>Oversight:</strong> Investigate and oversee executive agencies</li>
                    <li><strong>Appointments:</strong> Confirm certain executive appointments</li>
                    <li><strong>Treaties:</strong> Ratify international agreements</li>
                  </ul>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Standing Committees</h3>
                </div>
                <div className="content-text">
                  <h4>Major Committees</h4>
                  <ul>
                    <li><strong>Finance & Appropriations:</strong> Budget, taxes, government spending</li>
                    <li><strong>Justice & Public Safety:</strong> Criminal law, courts, police</li>
                    <li><strong>Education & Culture:</strong> Schools, universities, cultural affairs</li>
                    <li><strong>Health & Social Services:</strong> Healthcare, welfare programs</li>
                    <li><strong>Transportation & Infrastructure:</strong> Roads, transit, public works</li>
                    <li><strong>Economic Development:</strong> Business, trade, employment</li>
                    <li><strong>Environment & Natural Resources:</strong> Environmental protection, conservation</li>
                    <li><strong>Foreign Affairs & Defense:</strong> International relations, military</li>
                  </ul>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Recent Activity</h3>
                </div>
                <div className="news-item">
                  <span className="news-date">Dec 1, 2024</span>
                  <h4 className="news-title">Budget Bill Passes Second Reading</h4>
                  <p className="news-excerpt">2025 national budget approved by 78-42 vote, moves to committee for amendments.</p>
                </div>
                <div className="news-item">
                  <span className="news-date">Nov 27, 2024</span>
                  <h4 className="news-title">Infrastructure Investment Act Signed</h4>
                  <p className="news-excerpt">¤12 billion infrastructure package becomes law after legislative approval.</p>
                </div>
                <div className="news-item">
                  <span className="news-date">Nov 20, 2024</span>
                  <h4 className="news-title">Environmental Protection Bill Introduced</h4>
                  <p className="news-excerpt">New legislation aims to reduce carbon emissions by 40% by 2035.</p>
                </div>
              </div>
            </div>

            <aside className="sidebar">
              <div className="card">
                <h4 className="card-title">Quick Links</h4>
                <div className="quick-link" onClick={() => navigate('/lc/members')}>
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
                    </svg>
                  </span>
                  Find Your Representative
                </div>
                <div className="quick-link" onClick={() => navigate('/lc/bills')}>
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                      <polyline points="14,2 14,8 20,8"/>
                    </svg>
                  </span>
                  Track Bills
                </div>
                <div className="quick-link">
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="23,7 16,12 23,17 23,7"/>
                      <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                    </svg>
                  </span>
                  Watch Live
                </div>
                <div className="quick-link" onClick={() => navigate('/lc/sessions')}>
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                  </span>
                  Session Calendar
                </div>
              </div>

              <div className="card" style={{ background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)', color: 'white', border: 'none' }}>
                <h4 style={{ color: 'white', marginBottom: '8px' }}>Current Session</h4>
                <div style={{ fontSize: '24px', fontWeight: '700', marginBottom: '4px' }}>2024-2025</div>
                <div style={{ fontSize: '13px', opacity: 0.9, marginBottom: '16px' }}>Legislative Year</div>
                <div style={{ paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
                  <div style={{ fontSize: '13px', marginBottom: '8px' }}>
                    <strong>Next Session:</strong> December 5, 2024
                  </div>
                  <div style={{ fontSize: '13px' }}>
                    <strong>Status:</strong> In Regular Session
                  </div>
                </div>
              </div>

              <div className="info-box">
                <h4>Contact Legislature</h4>
                <p><strong>Phone:</strong> 1-800-LEG-INFO</p>
                <p><strong>Email:</strong> info@lc.gov.py</p>
                <p><strong>Address:</strong> Legislative Building, Praya City</p>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  )
}

function Members() {
  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/lc">Home</Link> / Council Members
          </div>
          <h1>Legislative Council Members</h1>
          <p className="subtitle">120 elected representatives serving the Republic of Praya</p>
        </div>
      </div>
      <div className="container">
        <div className="content-text">
          <h3>About Council Members</h3>
          <p>The Legislative Council consists of 120 members elected from single-member districts across the Republic of Praya. Each member serves a four-year term and represents approximately 45,000 constituents.</p>

          <div className="card" style={{ marginTop: '20px' }}>
            <h4 className="card-title">Leadership</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Council leadership elected by members:</p>
            <ul style={{ marginBottom: '12px' }}>
              <li><strong>Speaker of the Council:</strong> Presides over sessions, manages legislative agenda</li>
              <li><strong>Deputy Speaker:</strong> Assists Speaker and presides in Speaker's absence</li>
              <li><strong>Majority Leader:</strong> Leads majority party, coordinates legislative strategy</li>
              <li><strong>Minority Leader:</strong> Leads minority party, voices opposition views</li>
              <li><strong>Majority Whip:</strong> Ensures party members vote according to party positions</li>
              <li><strong>Minority Whip:</strong> Coordinates minority party voting</li>
            </ul>
          </div>

          <div className="card">
            <h4 className="card-title">Current Composition</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Party breakdown (2024-2025 session):</p>
            <ul style={{ marginBottom: '12px' }}>
              <li><strong>Democratic Alliance:</strong> 67 seats (Majority)</li>
              <li><strong>Progressive Party:</strong> 42 seats</li>
              <li><strong>Independent Coalition:</strong> 8 seats</li>
              <li><strong>Other Parties:</strong> 3 seats</li>
            </ul>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Next election:</strong> November 2026
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Find Your Representative</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Locate your council member by:</p>
            <ul>
              <li><strong>District number:</strong> Enter your district (1-120)</li>
              <li><strong>Address:</strong> Enter your home address to find district</li>
              <li><strong>City/Region:</strong> Browse members by geographic area</li>
              <li><strong>Committee:</strong> Find members on specific committees</li>
            </ul>
            <p style={{ marginTop: '12px', fontSize: '13px', color: 'var(--text-secondary)' }}>
              Use the online directory to contact your representative directly
            </p>
          </div>

          <h3 style={{ marginTop: '32px' }}>Standing Committees</h3>
          <p>Council members serve on one or more standing committees that review legislation in specific policy areas:</p>

          <div className="card">
            <h4 className="card-title">Committee Assignments</h4>
            <ul>
              <li><strong>Finance & Appropriations (22 members):</strong> Budget, taxation, government spending</li>
              <li><strong>Justice & Public Safety (18 members):</strong> Criminal law, law enforcement, courts</li>
              <li><strong>Education & Culture (16 members):</strong> Schools, universities, arts & culture</li>
              <li><strong>Health & Social Services (15 members):</strong> Healthcare, welfare, social programs</li>
              <li><strong>Transportation & Infrastructure (14 members):</strong> Roads, transit, public works</li>
              <li><strong>Economic Development (14 members):</strong> Business, trade, labor, commerce</li>
              <li><strong>Environment & Natural Resources (12 members):</strong> Environmental policy, conservation</li>
              <li><strong>Foreign Affairs & Defense (12 members):</strong> International relations, military</li>
              <li><strong>Agriculture & Rural Development (10 members):</strong> Farming, rural issues</li>
              <li><strong>Housing & Urban Development (10 members):</strong> Housing policy, city planning</li>
            </ul>
          </div>

          <h3 style={{ marginTop: '32px' }}>Contacting Members</h3>

          <div className="card">
            <h4 className="card-title">How to Contact Your Representative</h4>
            <ul>
              <li><strong>Office visit:</strong> Schedule appointment at district or capital office</li>
              <li><strong>Phone:</strong> Call district or legislative office</li>
              <li><strong>Email:</strong> Use member's official email address</li>
              <li><strong>Mail:</strong> Write to Legislative Building address</li>
              <li><strong>Town halls:</strong> Attend public meetings in your district</li>
              <li><strong>Social media:</strong> Follow members' official accounts</li>
            </ul>
          </div>

          <h3 style={{ marginTop: '32px' }}>Member Services</h3>
          <p>Council members and their staff can help constituents with:</p>
          <ul>
            <li>Information about legislation and voting records</li>
            <li>Assistance with government agencies and services</li>
            <li>Scheduling tours of the Legislative Building</li>
            <li>Internship opportunities for students</li>
            <li>Community event participation</li>
            <li>Constituent casework and problem-solving</li>
          </ul>

          <div className="info-box" style={{ marginTop: '24px' }}>
            <h4>Member Directory</h4>
            <p>Access the complete directory of all 120 Legislative Council members, including contact information, committee assignments, and district maps at lc.gov.py/members</p>
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
      case 'Bills & Legislation':
        return {
          description: 'Track bills, search legislation, and view voting records.',
          services: ['Bill Search & Tracking', 'Voting Records', 'Legislative History', 'Committee Reports'],
          contact: 'For legislative information: Call 1-800-LEG-INFO or visit lc.gov.py'
        };
      case 'Legislative Sessions':
        return {
          description: 'View session schedules, watch live proceedings, and access archives.',
          services: ['Live Session Video', 'Session Calendar', 'Floor Proceedings', 'Meeting Archives'],
          contact: 'For session information: info@lc.gov.py or call 1-800-LEG-INFO'
        };
      default:
        return {
          description: 'This service is being developed to serve you better.',
          services: [],
          contact: 'For assistance, contact the Legislative Council'
        };
    }
  };

  const info = getServiceInfo();

  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/lc">Home</Link> / {title}
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
              background: 'linear-gradient(135deg, rgba(30, 64, 175, 0.1) 0%, rgba(30, 64, 175, 0.2) 100%)',
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
              We're working to bring this service online. In the meantime, you can access these resources through traditional channels.
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
              background: 'rgba(30, 64, 175, 0.05)',
              borderRadius: '10px',
              fontSize: '13px',
              color: 'var(--text-muted)'
            }}>
              {info.contact}
            </div>

            <div style={{ marginTop: '32px' }}>
              <h4 style={{ fontSize: '14px', marginBottom: '12px' }}>Related Services</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                <Link to="/lc/members" style={{
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
                  Council Members
                </Link>
                <button
                  onClick={() => navigate('/lc')}
                  className="btn btn-secondary"
                  style={{ fontSize: '13px', padding: '14px' }}
                >
                  Return to LC Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
