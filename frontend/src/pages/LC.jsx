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
        <Route path="bills" element={<Bills />} />
        <Route path="sessions" element={<Sessions />} />
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
                <li><Link to="/lc/members">Committees</Link></li>
                <li><Link to="/lc/members">Leadership</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5>Resources</h5>
              <ul>
                <li><Link to="/lc/sessions">Watch Live Sessions</Link></li>
                <li><Link to="/lc/sessions">Meeting Calendar</Link></li>
                <li><Link to="/lc/sessions">Archives</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5>Government</h5>
              <ul>
                <li><Link to="/">Gov Portal</Link></li>
                <li><Link to="/lc/bills">Legislation</Link></li>
                <li><Link to="/lc">Legislative Council</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>&copy; 2024 Republic of Praya. Legislative Council.</span>
            <div className="footer-legal">
              <Link to="/">Terms</Link>
              <Link to="/">Privacy</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

function LCHome({ navigate }) {
  return (
    <div className="layout-civic">
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
                <p><strong>Address:</strong> Council Tower, Downtown, Praya City</p>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
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

function Bills() {
  const [billStatus, setBillStatus] = React.useState('active');

  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/lc">Home</Link> / Bills & Legislation
          </div>
          <h1>Bills & Legislation</h1>
          <p className="subtitle">Track legislation and view voting records</p>
        </div>
      </div>
      <div className="container">
        <div className="content-grid">
          <div className="main-content">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Bill Status</h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', padding: '0 20px 20px' }}>
                <button
                  onClick={() => setBillStatus('active')}
                  className={billStatus === 'active' ? 'btn btn-primary' : 'btn btn-secondary'}
                  style={{ fontSize: '13px' }}
                >
                  Active Bills
                </button>
                <button
                  onClick={() => setBillStatus('passed')}
                  className={billStatus === 'passed' ? 'btn btn-primary' : 'btn btn-secondary'}
                  style={{ fontSize: '13px' }}
                >
                  Passed
                </button>
                <button
                  onClick={() => setBillStatus('process')}
                  className={billStatus === 'process' ? 'btn btn-primary' : 'btn btn-secondary'}
                  style={{ fontSize: '13px' }}
                >
                  How Bills Work
                </button>
              </div>
            </div>

            {billStatus === 'active' && (
              <>
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Bills in Committee</h3>
                  </div>
                  <div className="content-text">
                    <div style={{ marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid var(--border-subtle)' }}>
                      <h4 style={{ marginBottom: '4px' }}>HB 2024-387: Digital Privacy Protection Act</h4>
                      <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                        Sponsor: Rep. Sarah Martinez | Committee: Justice & Public Safety
                      </div>
                      <p style={{ fontSize: '14px', marginBottom: '8px' }}>
                        Establishes comprehensive data privacy rights for Praya residents, including right to access, deletion, and portability of personal data.
                      </p>
                      <div style={{ fontSize: '13px' }}>
                        <strong>Status:</strong> <span style={{ color: 'var(--accent-warning)' }}>In Committee</span> |
                        <strong> Next Hearing:</strong> December 12, 2024
                      </div>
                    </div>

                    <div style={{ marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid var(--border-subtle)' }}>
                      <h4 style={{ marginBottom: '4px' }}>HB 2024-392: Renewable Energy Investment Act</h4>
                      <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                        Sponsor: Rep. Michael Chen | Committee: Environment & Natural Resources
                      </div>
                      <p style={{ fontSize: '14px', marginBottom: '8px' }}>
                        Provides tax incentives for renewable energy development and sets goal of 50% renewable electricity by 2030.
                      </p>
                      <div style={{ fontSize: '13px' }}>
                        <strong>Status:</strong> <span style={{ color: 'var(--accent-warning)' }}>Amended in Committee</span> |
                        <strong> Next Action:</strong> Committee vote Dec 8
                      </div>
                    </div>

                    <div style={{ marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid var(--border-subtle)' }}>
                      <h4 style={{ marginBottom: '4px' }}>SB 2024-156: Affordable Housing Development</h4>
                      <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                        Sponsor: Sen. James Wilson | Committee: Housing & Urban Development
                      </div>
                      <p style={{ fontSize: '14px', marginBottom: '8px' }}>
                        Allocates ¤500 million for affordable housing construction and provides tax credits to developers.
                      </p>
                      <div style={{ fontSize: '13px' }}>
                        <strong>Status:</strong> <span style={{ color: 'var(--accent-info)' }}>Reported out of Committee</span> |
                        <strong> Next Action:</strong> Floor debate Dec 15
                      </div>
                    </div>

                    <div style={{ marginBottom: '0' }}>
                      <h4 style={{ marginBottom: '4px' }}>HB 2024-401: Education Funding Reform</h4>
                      <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                        Sponsor: Rep. Linda Thompson | Committee: Education & Culture
                      </div>
                      <p style={{ fontSize: '14px', marginBottom: '8px' }}>
                        Revises public school funding formula to provide more equitable distribution and increases per-pupil spending by 8%.
                      </p>
                      <div style={{ fontSize: '13px' }}>
                        <strong>Status:</strong> <span style={{ color: 'var(--accent-warning)' }}>Public Hearings</span> |
                        <strong> Next Hearing:</strong> December 10, 2024
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Bills on the Floor</h3>
                  </div>
                  <div className="content-text">
                    <div style={{ marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid var(--border-subtle)' }}>
                      <h4 style={{ marginBottom: '4px' }}>HB 2024-365: Public Transportation Expansion</h4>
                      <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                        Sponsor: Rep. David Park | Floor Status: Second Reading
                      </div>
                      <p style={{ fontSize: '14px', marginBottom: '8px' }}>
                        Authorizes ¤2.4 billion for light rail expansion and bus rapid transit in metropolitan areas.
                      </p>
                      <div style={{ fontSize: '13px' }}>
                        <strong>Status:</strong> <span style={{ color: 'var(--accent-success)' }}>Passed Second Reading</span> (82-38) |
                        <strong> Next:</strong> Third reading Dec 9
                      </div>
                    </div>

                    <div style={{ marginBottom: '0' }}>
                      <h4 style={{ marginBottom: '4px' }}>SB 2024-189: Healthcare Access Act</h4>
                      <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                        Sponsor: Sen. Patricia Lee | Floor Status: Third Reading
                      </div>
                      <p style={{ fontSize: '14px', marginBottom: '8px' }}>
                        Expands Medicaid eligibility and creates subsidies for health insurance marketplace.
                      </p>
                      <div style={{ fontSize: '13px' }}>
                        <strong>Status:</strong> <span style={{ color: 'var(--accent-info)' }}>Debate Scheduled</span> |
                        <strong> Vote:</strong> Expected December 11
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {billStatus === 'passed' && (
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Recently Passed Legislation (2024)</h3>
                </div>
                <div className="content-text">
                  <div style={{ marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid var(--border-subtle)' }}>
                    <h4 style={{ marginBottom: '4px' }}>HB 2024-302: Infrastructure Investment Act</h4>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                      Passed: November 27, 2024 | Vote: 89-31
                    </div>
                    <p style={{ fontSize: '14px', marginBottom: '8px' }}>
                      ¤12 billion comprehensive infrastructure package including roads, bridges, broadband, water systems, and public buildings.
                    </p>
                    <div style={{ fontSize: '13px', color: 'var(--accent-success)' }}>
                      <strong>Status:</strong> Signed into law by President | Effective: January 1, 2025
                    </div>
                  </div>

                  <div style={{ marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid var(--border-subtle)' }}>
                    <h4 style={{ marginBottom: '4px' }}>SB 2024-142: Minimum Wage Adjustment</h4>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                      Passed: October 15, 2024 | Vote: 74-46
                    </div>
                    <p style={{ fontSize: '14px', marginBottom: '8px' }}>
                      Increases minimum wage to ¤16.50/hour, with annual adjustments tied to inflation.
                    </p>
                    <div style={{ fontSize: '13px', color: 'var(--accent-success)' }}>
                      <strong>Status:</strong> Signed into law | Effective: July 1, 2025
                    </div>
                  </div>

                  <div style={{ marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid var(--border-subtle)' }}>
                    <h4 style={{ marginBottom: '4px' }}>HB 2024-278: Criminal Justice Reform Act</h4>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                      Passed: September 22, 2024 | Vote: 95-25
                    </div>
                    <p style={{ fontSize: '14px', marginBottom: '8px' }}>
                      Reforms sentencing guidelines, expands diversion programs, and increases funding for rehabilitation services.
                    </p>
                    <div style={{ fontSize: '13px', color: 'var(--accent-success)' }}>
                      <strong>Status:</strong> Signed into law | Effective: January 1, 2025
                    </div>
                  </div>

                  <div style={{ marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid var(--border-subtle)' }}>
                    <h4 style={{ marginBottom: '4px' }}>SB 2024-118: Clean Water Protection Act</h4>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                      Passed: August 8, 2024 | Vote: 102-18
                    </div>
                    <p style={{ fontSize: '14px', marginBottom: '8px' }}>
                      Strengthens water quality standards and provides funding for municipal water infrastructure upgrades.
                    </p>
                    <div style={{ fontSize: '13px', color: 'var(--accent-success)' }}>
                      <strong>Status:</strong> Signed into law | Effective: October 1, 2024
                    </div>
                  </div>

                  <div style={{ marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid var(--border-subtle)' }}>
                    <h4 style={{ marginBottom: '4px' }}>HB 2024-221: Cybersecurity Enhancement Act</h4>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                      Passed: July 11, 2024 | Vote: 112-8
                    </div>
                    <p style={{ fontSize: '14px', marginBottom: '8px' }}>
                      Establishes state cybersecurity office and mandates security standards for government systems and critical infrastructure.
                    </p>
                    <div style={{ fontSize: '13px', color: 'var(--accent-success)' }}>
                      <strong>Status:</strong> Signed into law | Effective: Immediately
                    </div>
                  </div>

                  <div style={{ marginBottom: '0' }}>
                    <h4 style={{ marginBottom: '4px' }}>SB 2024-095: Teacher Salary Enhancement</h4>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                      Passed: June 3, 2024 | Vote: 87-33
                    </div>
                    <p style={{ fontSize: '14px', marginBottom: '8px' }}>
                      Provides 12% across-the-board salary increase for public school teachers and expands professional development programs.
                    </p>
                    <div style={{ fontSize: '13px', color: 'var(--accent-success)' }}>
                      <strong>Status:</strong> Signed into law | Effective: School year 2024-2025
                    </div>
                  </div>
                </div>
              </div>
            )}

            {billStatus === 'process' && (
              <>
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">How a Bill Becomes Law</h3>
                  </div>
                  <div className="content-text">
                    <h4>The Legislative Process</h4>
                    <ol>
                      <li><strong>Introduction:</strong> A Council member introduces a bill by filing it with the Clerk</li>
                      <li><strong>First Reading:</strong> Bill is read by title and assigned to a committee</li>
                      <li><strong>Committee Review:</strong> Committee studies bill, holds hearings, and may amend it</li>
                      <li><strong>Committee Vote:</strong> Committee votes to recommend passage, rejection, or take no action</li>
                      <li><strong>Second Reading:</strong> Full Council debates the bill and can propose amendments</li>
                      <li><strong>Third Reading:</strong> Final debate and vote on passage (requires simple majority)</li>
                      <li><strong>Presidential Review:</strong> President has 14 days to sign or veto</li>
                      <li><strong>Law:</strong> Signed bills become law on specified effective date (or veto override with 2/3 vote)</li>
                    </ol>

                    <h4 style={{ marginTop: '20px' }}>Types of Legislation</h4>
                    <ul>
                      <li><strong>House Bill (HB):</strong> Introduced by Council member</li>
                      <li><strong>Senate Bill (SB):</strong> Joint proposals from multiple members</li>
                      <li><strong>Resolution:</strong> Non-binding expression of opinion or intent</li>
                      <li><strong>Concurrent Resolution:</strong> Joint action on procedural matters</li>
                      <li><strong>Emergency Bill:</strong> Takes effect immediately upon signature (requires 2/3 vote)</li>
                    </ul>

                    <h4 style={{ marginTop: '20px' }}>Vote Requirements</h4>
                    <ul>
                      <li><strong>Regular Bill:</strong> Simple majority (61 of 120 votes)</li>
                      <li><strong>Budget Bill:</strong> Simple majority</li>
                      <li><strong>Constitutional Amendment:</strong> 2/3 majority (80 votes), then public referendum</li>
                      <li><strong>Emergency Legislation:</strong> 2/3 majority (80 votes)</li>
                      <li><strong>Veto Override:</strong> 2/3 majority (80 votes)</li>
                      <li><strong>Treaty Ratification:</strong> 2/3 majority (80 votes)</li>
                    </ul>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Tracking Legislation</h3>
                  </div>
                  <div className="content-text">
                    <h4>Bill Search Options</h4>
                    <ul>
                      <li><strong>By Number:</strong> Search for specific bill (e.g., HB 2024-387)</li>
                      <li><strong>By Sponsor:</strong> Find all bills introduced by a member</li>
                      <li><strong>By Subject:</strong> Browse bills by topic area</li>
                      <li><strong>By Committee:</strong> View all bills in a committee</li>
                      <li><strong>By Status:</strong> Filter by legislative stage</li>
                    </ul>

                    <h4 style={{ marginTop: '20px' }}>Available Information</h4>
                    <ul>
                      <li>Full text of bill (original and amended versions)</li>
                      <li>Fiscal impact analysis</li>
                      <li>Committee reports and recommendations</li>
                      <li>Floor debate transcripts</li>
                      <li>Voting records (how each member voted)</li>
                      <li>Public hearing schedules and testimony</li>
                    </ul>

                    <h4 style={{ marginTop: '20px' }}>Bill Alerts</h4>
                    <p>Sign up for email notifications when:</p>
                    <ul>
                      <li>Bills matching your interests are introduced</li>
                      <li>Specific bills advance through the process</li>
                      <li>Committee hearings are scheduled</li>
                      <li>Floor votes are scheduled</li>
                      <li>Bills are signed into law</li>
                    </ul>
                  </div>
                </div>
              </>
            )}
          </div>

          <aside className="sidebar">
            <div className="card">
              <h4 className="card-title">Bill Statistics (2024)</h4>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '12px', padding: '0 16px 16px' }}>
                <p style={{ marginBottom: '8px' }}><strong>Introduced:</strong> 1,247 bills</p>
                <p style={{ marginBottom: '8px' }}><strong>In Committee:</strong> 342 bills</p>
                <p style={{ marginBottom: '8px' }}><strong>Passed:</strong> 247 bills</p>
                <p style={{ marginBottom: '8px' }}><strong>Vetoed:</strong> 12 bills</p>
                <p style={{ marginBottom: '8px' }}><strong>Became Law:</strong> 235 bills</p>
                <p><strong>Pass Rate:</strong> 19.8%</p>
              </div>
            </div>

            <div className="info-box">
              <h4>Legislative Resources</h4>
              <ul style={{ fontSize: '13px', margin: '12px 0' }}>
                <li><a href="#">Search Bills Database</a></li>
                <li><a href="#">View Voting Records</a></li>
                <li><Link to="/lc/sessions">Session Calendar</Link></li>
                <li><a href="#">Committee Hearings</a></li>
                <li><a href="#">Bill Drafting Guide</a></li>
              </ul>
            </div>

            <div className="card">
              <h4 className="card-title">Public Participation</h4>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '12px', padding: '0 16px 16px' }}>
                <p style={{ marginBottom: '12px' }}>Citizens can participate in the legislative process:</p>
                <ul style={{ marginBottom: '16px' }}>
                  <li>Testify at committee hearings</li>
                  <li>Submit written comments</li>
                  <li>Contact your representative</li>
                  <li>Attend floor sessions</li>
                  <li>Sign up for bill alerts</li>
                </ul>
                <p style={{ fontWeight: '500' }}>Contact: 1-800-LEG-INFO</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}

function Sessions() {
  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/lc">Home</Link> / Legislative Sessions
          </div>
          <h1>Legislative Sessions</h1>
          <p className="subtitle">Session calendar, live proceedings, and archives</p>
        </div>
      </div>
      <div className="container">
        <div className="content-grid">
          <div className="main-content">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Current Session: 2024-2025</h3>
              </div>
              <div className="content-text">
                <p style={{ marginBottom: '16px' }}>
                  The Legislative Council is currently in regular session. Floor sessions are held Monday through Thursday at 10:00 AM when the Council is in session.
                </p>
                <ul>
                  <li><strong>Session Type:</strong> Regular Session (biennial, 2-year term)</li>
                  <li><strong>Session Start:</strong> January 8, 2024</li>
                  <li><strong>Session End:</strong> December 31, 2025</li>
                  <li><strong>Days in Session (2024):</strong> 156 days</li>
                  <li><strong>Next Recess:</strong> December 20, 2024 - January 6, 2025 (Holiday Break)</li>
                </ul>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h3 className="card-title">December 2024 Session Calendar</h3>
              </div>
              <div className="content-text">
                <div style={{ marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                    <strong>Monday, December 2</strong>
                    <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>10:00 AM</span>
                  </div>
                  <p style={{ fontSize: '14px', margin: 0 }}>Floor Session - Second reading of HB 2024-365 (Transportation)</p>
                </div>

                <div style={{ marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                    <strong>Tuesday, December 3</strong>
                    <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>10:00 AM</span>
                  </div>
                  <p style={{ fontSize: '14px', margin: 0 }}>Floor Session - Committee reports, member announcements</p>
                </div>

                <div style={{ marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                    <strong>Wednesday, December 4</strong>
                    <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>2:00 PM</span>
                  </div>
                  <p style={{ fontSize: '14px', margin: 0 }}>Finance Committee Meeting - Budget bill markup</p>
                </div>

                <div style={{ marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                    <strong>Thursday, December 5</strong>
                    <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>10:00 AM</span>
                  </div>
                  <p style={{ fontSize: '14px', margin: 0 }}>Floor Session - Third reading votes, new bill introductions</p>
                </div>

                <div style={{ marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                    <strong>Monday, December 9</strong>
                    <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>10:00 AM</span>
                  </div>
                  <p style={{ fontSize: '14px', margin: 0 }}>Floor Session - Third reading HB 2024-365, second reading SB 2024-189</p>
                </div>

                <div style={{ marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                    <strong>Tuesday, December 10</strong>
                    <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>2:00 PM</span>
                  </div>
                  <p style={{ fontSize: '14px', margin: 0 }}>Education Committee Hearing - Public testimony on HB 2024-401</p>
                </div>

                <div style={{ marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                    <strong>Wednesday, December 11</strong>
                    <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>10:00 AM</span>
                  </div>
                  <p style={{ fontSize: '14px', margin: 0 }}>Floor Session - Third reading votes on healthcare and housing bills</p>
                </div>

                <div style={{ marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                    <strong>Thursday, December 12</strong>
                    <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>9:00 AM</span>
                  </div>
                  <p style={{ fontSize: '14px', margin: 0 }}>Justice Committee Hearing - HB 2024-387 (Digital Privacy)</p>
                </div>

                <div style={{ marginBottom: '0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                    <strong>Friday, December 13-19</strong>
                    <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>No Session</span>
                  </div>
                  <p style={{ fontSize: '14px', margin: 0 }}>Committee work week - No floor sessions</p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Watch Live & Archives</h3>
              </div>
              <div className="content-text">
                <h4>Live Streaming</h4>
                <p>All floor sessions and most committee meetings are broadcast live:</p>
                <ul>
                  <li><strong>Official Stream:</strong> Watch on lc.gov.py/live</li>
                  <li><strong>Public TV:</strong> Praya Government Channel (Cable 12)</li>
                  <li><strong>Audio Only:</strong> Available via phone at 1-800-LEG-INFO</li>
                  <li><strong>Closed Captioning:</strong> Available on all video streams</li>
                </ul>

                <h4 style={{ marginTop: '20px' }}>Video Archives</h4>
                <p>Past sessions available on demand:</p>
                <ul>
                  <li><strong>Floor Sessions:</strong> Full video dating back to 2018</li>
                  <li><strong>Committee Meetings:</strong> Major hearings archived</li>
                  <li><strong>Special Events:</strong> State of the Republic, special addresses</li>
                  <li><strong>Searchable:</strong> Search by date, topic, or speaker</li>
                </ul>

                <h4 style={{ marginTop: '20px' }}>Transcripts</h4>
                <ul>
                  <li>Official transcripts published within 48 hours</li>
                  <li>Searchable full-text archive</li>
                  <li>Available in PDF and HTML formats</li>
                  <li>Free download for all sessions</li>
                </ul>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Attending in Person</h3>
              </div>
              <div className="content-text">
                <h4>Public Galleries</h4>
                <p>The public is welcome to observe legislative sessions in person:</p>
                <ul>
                  <li><strong>Location:</strong> Council Tower, 1 Council Plaza, Downtown, Praya City</li>
                  <li><strong>Hours:</strong> Public galleries open 30 minutes before each session</li>
                  <li><strong>Capacity:</strong> 250 seats (first-come, first-served)</li>
                  <li><strong>Security:</strong> Bag check required, no weapons or recording devices</li>
                  <li><strong>Accessibility:</strong> Wheelchair accessible, assistive listening devices available</li>
                </ul>

                <h4 style={{ marginTop: '20px' }}>Building Tours</h4>
                <ul>
                  <li>Free guided tours Monday-Friday at 10 AM, 12 PM, and 2 PM</li>
                  <li>Self-guided tours available during business hours</li>
                  <li>Group tours (10+) require advance reservation</li>
                  <li>Educational programs for school groups</li>
                </ul>

                <h4 style={{ marginTop: '20px' }}>Committee Hearings</h4>
                <p>Most committee meetings are open to the public:</p>
                <ul>
                  <li>Check committee schedules for times and locations</li>
                  <li>Sign up in advance to provide public testimony</li>
                  <li>Written testimony can be submitted without attending</li>
                  <li>Limited seating - arrive early for contentious issues</li>
                </ul>
              </div>
            </div>
          </div>

          <aside className="sidebar">
            <div className="card" style={{ background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)', color: 'white', border: 'none' }}>
              <h4 style={{ color: 'white', marginBottom: '8px' }}>Next Floor Session</h4>
              <div style={{ fontSize: '28px', fontWeight: '700', marginBottom: '4px' }}>Dec 5</div>
              <div style={{ fontSize: '15px', opacity: 0.95, marginBottom: '16px' }}>Thursday, 10:00 AM</div>
              <div style={{ paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.2)', fontSize: '13px' }}>
                <div style={{ marginBottom: '8px' }}>
                  <strong>Agenda:</strong> Third reading votes, new bill introductions
                </div>
                <div>
                  <strong>Watch Live:</strong> lc.gov.py/live
                </div>
              </div>
            </div>

            <div className="info-box">
              <h4>Session Information</h4>
              <p><strong>Phone:</strong> 1-800-LEG-INFO</p>
              <p><strong>Email:</strong> sessions@lc.gov.py</p>
              <p><strong>Location:</strong> Council Tower, Downtown, Praya City</p>
            </div>

            <div className="card">
              <h4 className="card-title">2025 Session Dates</h4>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '12px', padding: '0 16px 16px' }}>
                <p style={{ marginBottom: '8px' }}><strong>Convenes:</strong> January 7, 2025</p>
                <p style={{ marginBottom: '8px' }}><strong>Spring Recess:</strong> March 24-31</p>
                <p style={{ marginBottom: '8px' }}><strong>Summer Recess:</strong> July 1-31</p>
                <p style={{ marginBottom: '8px' }}><strong>Fall Recess:</strong> October 13-20</p>
                <p><strong>Session Ends:</strong> December 31, 2025</p>
              </div>
            </div>

            <div className="card">
              <h4 className="card-title">Session Rules</h4>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '12px', padding: '0 16px 16px' }}>
                <p style={{ marginBottom: '12px' }}>Visitors must follow these rules:</p>
                <ul>
                  <li>No applause or demonstrations</li>
                  <li>Silence all electronic devices</li>
                  <li>No photography or recording</li>
                  <li>Dress code: Business casual</li>
                  <li>No food or drinks in galleries</li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
