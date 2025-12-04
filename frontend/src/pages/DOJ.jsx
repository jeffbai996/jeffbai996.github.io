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
                <path d="M12 3v4M6 11h12M3 11l3 10h12l3-10M12 7l-2 4h4l-2-4"/>
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
        <Route path="prosecution" element={<Prosecution />} />
        <Route path="code" element={<CriminalCode />} />
        <Route path="services" element={<OnlineServices />} />
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
              </ul>
            </div>
            <div className="footer-section">
              <h5>Government</h5>
              <ul>
                <li><Link to="/">Gov Portal</Link></li>
                <li><a href="/ctb">Cannabis Tax Bureau</a></li>
                <li><a href="/interior">Interior Dept.</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>&copy; 2024 Republic of Praya. Department of Justice.</span>
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
          <div className="hero-bg-shape"></div>
        </div>
        <div className="hero-pattern"></div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 3v4M6 11h12M3 11l3 10h12l3-10M12 7l-2 4h4l-2-4"/>
              </svg>
              Justice System
            </div>
            <h2>Justice for <span>All Citizens</span></h2>
            <p>The Department of Justice ensures equal access to justice, maintains the court system, and prosecutes crimes in the Republic of Praya. Upholding the rule of law through integrity and fairness.</p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => navigate('/doj/courts')}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 3v4M6 11h12M3 11l3 10h12l3-10M12 7l-2 4h4l-2-4"/>
                </svg>
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

function Prosecution() {
  const [activeSection, setActiveSection] = React.useState('case-status');

  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/doj">Home</Link> / Prosecution Services
          </div>
          <h1>Prosecution Services</h1>
          <p className="subtitle">Information about prosecution procedures and victim support services</p>
        </div>
      </div>
      <div className="container">
        <div className="card">
          <div style={{ borderBottom: '1px solid var(--border-subtle)', padding: '0 20px' }}>
            <div style={{ display: 'flex', gap: '24px', overflowX: 'auto' }}>
              {[
                { id: 'case-status', label: 'Case Status' },
                { id: 'victim-services', label: 'Victim Services' },
                { id: 'witness-info', label: 'Witness Information' },
                { id: 'guidelines', label: 'Prosecution Guidelines' }
              ].map(section => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  style={{
                    padding: '16px 8px',
                    background: 'none',
                    border: 'none',
                    borderBottom: `2px solid ${activeSection === section.id ? 'var(--primary)' : 'transparent'}`,
                    color: activeSection === section.id ? 'var(--primary)' : 'var(--text-secondary)',
                    fontWeight: activeSection === section.id ? '600' : '400',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s'
                  }}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ padding: '24px' }}>
            {activeSection === 'case-status' && (
              <div>
                <h3 style={{ marginBottom: '16px' }}>Case Status Inquiry</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
                  Track the progress of criminal cases being prosecuted by the Department of Justice.
                </p>

                <div style={{ marginBottom: '24px', padding: '20px', background: 'var(--bg-elevated)', borderRadius: '10px' }}>
                  <h4 style={{ fontSize: '14px', marginBottom: '12px' }}>Check Case Status</h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
                    Enter your case number to check the current status and upcoming proceedings.
                  </p>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <input
                      type="text"
                      placeholder="Case Number (e.g., CR-2024-12345)"
                      style={{
                        flex: 1,
                        padding: '12px 16px',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '8px',
                        fontSize: '14px'
                      }}
                    />
                    <button className="btn btn-primary">Check Status</button>
                  </div>
                </div>

                <h4 style={{ fontSize: '14px', marginBottom: '12px' }}>Case Status Types</h4>
                <div style={{ display: 'grid', gap: '12px' }}>
                  {[
                    { status: 'Under Investigation', desc: 'Case is being investigated by law enforcement and prosecution team' },
                    { status: 'Charges Filed', desc: 'Formal charges have been filed with the court' },
                    { status: 'Pre-Trial', desc: 'Case is in pre-trial proceedings, including motions and discovery' },
                    { status: 'Trial Scheduled', desc: 'Trial date has been set and case is proceeding to trial' },
                    { status: 'Concluded', desc: 'Case has been resolved through trial verdict, plea agreement, or dismissal' }
                  ].map((item, i) => (
                    <div key={i} style={{ padding: '16px', background: 'var(--bg-elevated)', borderRadius: '8px' }}>
                      <div style={{ fontWeight: '600', marginBottom: '4px' }}>{item.status}</div>
                      <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'victim-services' && (
              <div>
                <h3 style={{ marginBottom: '16px' }}>Victim Services</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
                  Support and resources for victims of crime throughout the prosecution process.
                </p>

                <div style={{ marginBottom: '24px', padding: '20px', background: 'rgba(153, 27, 27, 0.05)', borderRadius: '10px', border: '1px solid rgba(153, 27, 27, 0.1)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                    </svg>
                    <h4 style={{ fontSize: '15px', margin: 0 }}>24/7 Victim Hotline</h4>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                    Immediate assistance and crisis support available any time.
                  </p>
                  <div style={{ fontSize: '18px', fontWeight: '600', color: 'var(--primary)' }}>1-800-VICTIM-HELP</div>
                </div>

                <h4 style={{ fontSize: '14px', marginBottom: '12px' }}>Available Support Services</h4>
                <div style={{ display: 'grid', gap: '16px' }}>
                  {[
                    {
                      title: 'Crisis Counseling',
                      desc: 'Free confidential counseling for victims and their families',
                      services: ['Individual therapy', 'Group support sessions', 'Family counseling', 'Trauma-informed care']
                    },
                    {
                      title: 'Legal Advocacy',
                      desc: 'Assistance navigating the criminal justice system',
                      services: ['Court accompaniment', 'Legal rights explanation', 'Victim impact statements', 'Restitution assistance']
                    },
                    {
                      title: 'Compensation Program',
                      desc: 'Financial assistance for crime-related expenses',
                      services: ['Medical expenses', 'Lost wages', 'Funeral costs', 'Counseling costs']
                    },
                    {
                      title: 'Safety Planning',
                      desc: 'Resources to help ensure victim safety',
                      services: ['Protection orders', 'Safety assessments', 'Relocation assistance', 'Security consultations']
                    }
                  ].map((service, i) => (
                    <div key={i} style={{ padding: '20px', background: 'var(--bg-elevated)', borderRadius: '10px' }}>
                      <h5 style={{ marginBottom: '8px' }}>{service.title}</h5>
                      <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '12px' }}>{service.desc}</p>
                      <ul style={{ fontSize: '13px', color: 'var(--text-secondary)', marginLeft: '20px' }}>
                        {service.services.map((s, j) => <li key={j} style={{ marginBottom: '4px' }}>{s}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'witness-info' && (
              <div>
                <h3 style={{ marginBottom: '16px' }}>Witness Information</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
                  Resources and support for witnesses participating in criminal prosecutions.
                </p>

                <h4 style={{ fontSize: '14px', marginBottom: '12px' }}>Your Role as a Witness</h4>
                <div style={{ marginBottom: '24px', padding: '20px', background: 'var(--bg-elevated)', borderRadius: '10px' }}>
                  <p style={{ fontSize: '14px', marginBottom: '16px' }}>
                    Witnesses play a crucial role in the pursuit of justice. Your testimony helps establish the facts of a case and ensures a fair trial.
                  </p>
                  <div style={{ display: 'grid', gap: '12px' }}>
                    {[
                      'Provide truthful and accurate testimony about what you saw, heard, or experienced',
                      'Attend all scheduled court proceedings when summoned',
                      'Cooperate with prosecutors in preparing for trial',
                      'Maintain confidentiality about ongoing cases as directed',
                      'Report any threats or intimidation immediately'
                    ].map((item, i) => (
                      <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        <div style={{
                          minWidth: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          background: 'rgba(153, 27, 27, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '11px',
                          fontWeight: '600',
                          color: 'var(--primary)'
                        }}>
                          {i + 1}
                        </div>
                        <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{item}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <h4 style={{ fontSize: '14px', marginBottom: '12px' }}>Witness Support Services</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                  {[
                    { title: 'Court Preparation', desc: 'Meet with prosecutors to review testimony and court procedures' },
                    { title: 'Court Accompaniment', desc: 'Support staff available to accompany you to court proceedings' },
                    { title: 'Witness Protection', desc: 'Security measures for witnesses facing threats or intimidation' },
                    { title: 'Travel Assistance', desc: 'Help with transportation and expenses for court appearances' }
                  ].map((service, i) => (
                    <div key={i} style={{ padding: '16px', background: 'var(--bg-elevated)', borderRadius: '8px' }}>
                      <h5 style={{ fontSize: '14px', marginBottom: '6px' }}>{service.title}</h5>
                      <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{service.desc}</p>
                    </div>
                  ))}
                </div>

                <div style={{ padding: '20px', background: 'rgba(153, 27, 27, 0.05)', borderRadius: '10px', border: '1px solid rgba(153, 27, 27, 0.1)' }}>
                  <h4 style={{ fontSize: '14px', marginBottom: '8px' }}>Witness Assistance Coordinator</h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                    Our dedicated coordinators are here to answer questions and provide support throughout your involvement in the case.
                  </p>
                  <div style={{ fontSize: '14px' }}>
                    <div style={{ marginBottom: '4px' }}><strong>Phone:</strong> 1-800-WITNESS (1-800-948-6377)</div>
                    <div><strong>Email:</strong> witness@doj.gov.py</div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'guidelines' && (
              <div>
                <h3 style={{ marginBottom: '16px' }}>Prosecution Guidelines</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
                  Standards and procedures that guide prosecution decisions in the Republic of Praya.
                </p>

                <h4 style={{ fontSize: '14px', marginBottom: '12px' }}>Core Prosecution Principles</h4>
                <div style={{ marginBottom: '24px', display: 'grid', gap: '12px' }}>
                  {[
                    {
                      title: 'Justice and Fairness',
                      desc: 'Seek justice, not merely convictions. Prosecutors must act as ministers of justice and consider the interests of all parties.'
                    },
                    {
                      title: 'Evidence-Based Decisions',
                      desc: 'File charges only when there is sufficient admissible evidence to establish guilt beyond a reasonable doubt.'
                    },
                    {
                      title: 'Proportional Charging',
                      desc: 'Charges should be proportional to the offense and criminal history, avoiding overcharging or undercharging.'
                    },
                    {
                      title: 'Victim Consideration',
                      desc: 'Consider victim input and interests while maintaining prosecutorial independence and public interest.'
                    }
                  ].map((principle, i) => (
                    <div key={i} style={{ padding: '16px', background: 'var(--bg-elevated)', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                      <h5 style={{ fontSize: '14px', marginBottom: '6px', color: 'var(--primary)' }}>{principle.title}</h5>
                      <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>{principle.desc}</p>
                    </div>
                  ))}
                </div>

                <h4 style={{ fontSize: '14px', marginBottom: '12px' }}>Charging Decisions</h4>
                <div style={{ marginBottom: '24px', padding: '20px', background: 'var(--bg-elevated)', borderRadius: '10px' }}>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
                    Prosecutors must consider multiple factors when deciding whether to file charges:
                  </p>
                  <ul style={{ fontSize: '13px', color: 'var(--text-secondary)', marginLeft: '20px' }}>
                    <li style={{ marginBottom: '8px' }}>Sufficiency and admissibility of evidence</li>
                    <li style={{ marginBottom: '8px' }}>Seriousness of the offense and harm to victims</li>
                    <li style={{ marginBottom: '8px' }}>Defendant's criminal history and personal circumstances</li>
                    <li style={{ marginBottom: '8px' }}>Likelihood of successful prosecution</li>
                    <li style={{ marginBottom: '8px' }}>Public interest and community safety</li>
                    <li style={{ marginBottom: '8px' }}>Availability of alternative resolutions (diversion, treatment programs)</li>
                    <li style={{ marginBottom: '8px' }}>Consistency with prosecution policies and precedents</li>
                  </ul>
                </div>

                <h4 style={{ fontSize: '14px', marginBottom: '12px' }}>Alternative Resolutions</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                  {[
                    { title: 'Diversion Programs', desc: 'First-time offenders may qualify for diversion to avoid criminal record' },
                    { title: 'Plea Agreements', desc: 'Negotiated resolutions that serve justice while conserving resources' },
                    { title: 'Deferred Prosecution', desc: 'Charges held in abeyance pending successful completion of conditions' },
                    { title: 'Restorative Justice', desc: 'Victim-offender mediation and accountability processes' }
                  ].map((option, i) => (
                    <div key={i} style={{ padding: '16px', background: 'var(--bg-elevated)', borderRadius: '8px' }}>
                      <div style={{ fontWeight: '600', fontSize: '13px', marginBottom: '6px' }}>{option.title}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{option.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function CriminalCode() {
  const [activeCategory, setActiveCategory] = React.useState('database');

  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/doj">Home</Link> / Criminal Code
          </div>
          <h1>Criminal Code</h1>
          <p className="subtitle">Access the complete Criminal Code of the Republic of Praya and legal resources</p>
        </div>
      </div>
      <div className="container">
        <div className="card">
          <div style={{ borderBottom: '1px solid var(--border-subtle)', padding: '0 20px' }}>
            <div style={{ display: 'flex', gap: '24px', overflowX: 'auto' }}>
              {[
                { id: 'database', label: 'Code Database' },
                { id: 'definitions', label: 'Legal Definitions' },
                { id: 'sentencing', label: 'Sentencing Guidelines' },
                { id: 'amendments', label: 'Recent Amendments' }
              ].map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  style={{
                    padding: '16px 8px',
                    background: 'none',
                    border: 'none',
                    borderBottom: `2px solid ${activeCategory === category.id ? 'var(--primary)' : 'transparent'}`,
                    color: activeCategory === category.id ? 'var(--primary)' : 'var(--text-secondary)',
                    fontWeight: activeCategory === category.id ? '600' : '400',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s'
                  }}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ padding: '24px' }}>
            {activeCategory === 'database' && (
              <div>
                <h3 style={{ marginBottom: '16px' }}>Criminal Code Database</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
                  Search and browse the complete text of Praya's Criminal Code, organized by title and chapter.
                </p>

                <div style={{ marginBottom: '24px', padding: '20px', background: 'var(--bg-elevated)', borderRadius: '10px' }}>
                  <h4 style={{ fontSize: '14px', marginBottom: '12px' }}>Search Criminal Code</h4>
                  <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                    <input
                      type="text"
                      placeholder="Search by keyword, statute number, or topic..."
                      style={{
                        flex: 1,
                        padding: '12px 16px',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '8px',
                        fontSize: '14px'
                      }}
                    />
                    <button className="btn btn-primary">Search</button>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Popular searches:</span>
                    {['Theft', 'Assault', 'Drug Offenses', 'Fraud', 'Traffic Violations'].map(term => (
                      <button
                        key={term}
                        style={{
                          padding: '4px 12px',
                          background: 'var(--bg-base)',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: '16px',
                          fontSize: '12px',
                          cursor: 'pointer',
                          color: 'var(--text-secondary)'
                        }}
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>

                <h4 style={{ fontSize: '14px', marginBottom: '12px' }}>Browse by Title</h4>
                <div style={{ display: 'grid', gap: '12px' }}>
                  {[
                    { title: 'Title 1: General Provisions', chapters: 8, desc: 'Definitions, principles of liability, and general defenses' },
                    { title: 'Title 2: Offenses Against Persons', chapters: 12, desc: 'Homicide, assault, kidnapping, and related offenses' },
                    { title: 'Title 3: Offenses Against Property', chapters: 10, desc: 'Theft, robbery, burglary, arson, and property crimes' },
                    { title: 'Title 4: Offenses Against Public Order', chapters: 9, desc: 'Riot, weapons offenses, and public safety crimes' },
                    { title: 'Title 5: Drug Offenses', chapters: 6, desc: 'Controlled substances, trafficking, and possession' },
                    { title: 'Title 6: Financial Crimes', chapters: 11, desc: 'Fraud, embezzlement, money laundering, and white-collar crimes' },
                    { title: 'Title 7: Offenses Against Justice', chapters: 7, desc: 'Perjury, obstruction, contempt, and witness tampering' },
                    { title: 'Title 8: Traffic and Vehicle Offenses', chapters: 5, desc: 'DUI, reckless driving, and motor vehicle crimes' }
                  ].map((title, i) => (
                    <div
                      key={i}
                      style={{
                        padding: '16px',
                        background: 'var(--bg-elevated)',
                        borderRadius: '10px',
                        border: '1px solid var(--border-subtle)',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                        <h5 style={{ fontSize: '14px', fontWeight: '600', margin: 0 }}>{title.title}</h5>
                        <span style={{
                          fontSize: '12px',
                          color: 'var(--text-muted)',
                          background: 'var(--bg-base)',
                          padding: '2px 8px',
                          borderRadius: '4px'
                        }}>
                          {title.chapters} chapters
                        </span>
                      </div>
                      <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>{title.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeCategory === 'definitions' && (
              <div>
                <h3 style={{ marginBottom: '16px' }}>Legal Definitions</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
                  Key terms and definitions used throughout the Criminal Code.
                </p>

                <div style={{ marginBottom: '24px', padding: '20px', background: 'var(--bg-elevated)', borderRadius: '10px' }}>
                  <h4 style={{ fontSize: '14px', marginBottom: '12px' }}>Search Definitions</h4>
                  <input
                    type="text"
                    placeholder="Enter a term to find its legal definition..."
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}
                  />
                </div>

                <h4 style={{ fontSize: '14px', marginBottom: '12px' }}>Common Definitions</h4>
                <div style={{ display: 'grid', gap: '16px' }}>
                  {[
                    {
                      term: 'Felony',
                      definition: 'A serious crime punishable by imprisonment for more than one year or by death. Felonies are classified into degrees (1st, 2nd, 3rd) based on severity.'
                    },
                    {
                      term: 'Misdemeanor',
                      definition: 'A less serious crime punishable by imprisonment for up to one year or by fine. Misdemeanors are classified as Class A, B, or C based on severity.'
                    },
                    {
                      term: 'Knowingly',
                      definition: 'A person acts knowingly when they are aware their conduct is of a particular nature or that certain circumstances exist. Knowledge may be inferred from circumstances.'
                    },
                    {
                      term: 'Recklessly',
                      definition: 'A person acts recklessly when they consciously disregard a substantial and unjustifiable risk that circumstances exist or will result from their conduct.'
                    },
                    {
                      term: 'Criminal Intent (Mens Rea)',
                      definition: 'The mental state or state of mind required to commit a crime. Includes purposely, knowingly, recklessly, or negligently, depending on the offense.'
                    },
                    {
                      term: 'Affirmative Defense',
                      definition: 'A defense that, if proven, excuses or justifies otherwise criminal conduct. Examples include self-defense, necessity, duress, and insanity.'
                    },
                    {
                      term: 'Accomplice',
                      definition: 'A person who aids, abets, or assists another in the commission of a crime with the intent that the crime be committed.'
                    },
                    {
                      term: 'Attempt',
                      definition: 'An act done with intent to commit a crime that goes beyond mere preparation but fails to complete the offense. Punishable as one degree less than the completed crime.'
                    },
                    {
                      term: 'Conspiracy',
                      definition: 'An agreement between two or more persons to commit a crime, coupled with an overt act in furtherance of the agreement by at least one conspirator.'
                    },
                    {
                      term: 'Deadly Force',
                      definition: 'Force that creates a substantial risk of causing death or serious bodily injury. Use is justified only in limited circumstances such as self-defense.'
                    },
                    {
                      term: 'Statute of Limitations',
                      definition: 'The time period within which prosecution must be commenced. Varies by offense severity; no limitation for murder and other serious felonies.'
                    },
                    {
                      term: 'Restitution',
                      definition: 'Court-ordered payment by the defendant to compensate victims for economic losses resulting from the crime, including medical expenses, lost wages, and property damage.'
                    }
                  ].map((item, i) => (
                    <div key={i} style={{ padding: '16px', background: 'var(--bg-elevated)', borderRadius: '10px' }}>
                      <h5 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: 'var(--primary)' }}>
                        {item.term}
                      </h5>
                      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.5' }}>
                        {item.definition}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeCategory === 'sentencing' && (
              <div>
                <h3 style={{ marginBottom: '16px' }}>Sentencing Guidelines</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
                  Framework for determining appropriate sentences based on offense severity and offender history.
                </p>

                <h4 style={{ fontSize: '14px', marginBottom: '12px' }}>Offense Classifications</h4>
                <div style={{ marginBottom: '24px', display: 'grid', gap: '12px' }}>
                  {[
                    { class: 'First Degree Felony', range: '10-30 years or life', examples: 'Murder, aggravated robbery, rape' },
                    { class: 'Second Degree Felony', range: '5-15 years', examples: 'Manslaughter, armed robbery, aggravated assault' },
                    { class: 'Third Degree Felony', range: '2-10 years', examples: 'Burglary, theft over ¤10,000, drug possession' },
                    { class: 'Class A Misdemeanor', range: 'Up to 1 year', examples: 'Simple assault, theft under ¤1,000, DUI first offense' },
                    { class: 'Class B Misdemeanor', range: 'Up to 6 months', examples: 'Criminal mischief, disorderly conduct, minor drug possession' },
                    { class: 'Class C Misdemeanor', range: 'Up to 30 days', examples: 'Traffic violations, minor trespass, public intoxication' }
                  ].map((offense, i) => (
                    <div key={i} style={{ padding: '16px', background: 'var(--bg-elevated)', borderRadius: '10px', display: 'grid', gridTemplateColumns: '2fr 1.5fr 2fr', gap: '16px', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: '600', fontSize: '14px' }}>{offense.class}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '2px' }}>Prison Range</div>
                        <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--primary)' }}>{offense.range}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Examples: {offense.examples}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <h4 style={{ fontSize: '14px', marginBottom: '12px' }}>Sentencing Factors</h4>
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div style={{ padding: '20px', background: 'var(--bg-elevated)', borderRadius: '10px' }}>
                      <h5 style={{ fontSize: '14px', marginBottom: '12px', color: 'var(--primary)' }}>Aggravating Factors</h5>
                      <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                        Factors that may increase sentence severity:
                      </p>
                      <ul style={{ fontSize: '13px', color: 'var(--text-secondary)', marginLeft: '20px' }}>
                        <li style={{ marginBottom: '6px' }}>Prior criminal record</li>
                        <li style={{ marginBottom: '6px' }}>Use of deadly weapon</li>
                        <li style={{ marginBottom: '6px' }}>Vulnerable victim (child, elderly, disabled)</li>
                        <li style={{ marginBottom: '6px' }}>Leadership role in offense</li>
                        <li style={{ marginBottom: '6px' }}>Serious bodily injury to victim</li>
                        <li style={{ marginBottom: '6px' }}>Offense committed while on parole/probation</li>
                      </ul>
                    </div>
                    <div style={{ padding: '20px', background: 'var(--bg-elevated)', borderRadius: '10px' }}>
                      <h5 style={{ fontSize: '14px', marginBottom: '12px', color: 'var(--primary)' }}>Mitigating Factors</h5>
                      <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                        Factors that may reduce sentence severity:
                      </p>
                      <ul style={{ fontSize: '13px', color: 'var(--text-secondary)', marginLeft: '20px' }}>
                        <li style={{ marginBottom: '6px' }}>No prior criminal record</li>
                        <li style={{ marginBottom: '6px' }}>Minor role in offense</li>
                        <li style={{ marginBottom: '6px' }}>Cooperation with authorities</li>
                        <li style={{ marginBottom: '6px' }}>Acceptance of responsibility</li>
                        <li style={{ marginBottom: '6px' }}>Diminished capacity or mental illness</li>
                        <li style={{ marginBottom: '6px' }}>Provocation by victim</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <h4 style={{ fontSize: '14px', marginBottom: '12px' }}>Alternative Sentencing Options</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                  {[
                    { title: 'Probation', desc: 'Supervised release with conditions instead of incarceration' },
                    { title: 'Community Service', desc: 'Court-ordered work benefiting the community' },
                    { title: 'Treatment Programs', desc: 'Drug/alcohol treatment or mental health programs' },
                    { title: 'House Arrest', desc: 'Electronic monitoring while confined to residence' },
                    { title: 'Fines & Restitution', desc: 'Financial penalties and victim compensation' },
                    { title: 'Suspended Sentence', desc: 'Sentence imposed but not executed if conditions met' }
                  ].map((option, i) => (
                    <div key={i} style={{ padding: '16px', background: 'var(--bg-elevated)', borderRadius: '8px' }}>
                      <div style={{ fontWeight: '600', fontSize: '13px', marginBottom: '6px' }}>{option.title}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{option.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeCategory === 'amendments' && (
              <div>
                <h3 style={{ marginBottom: '16px' }}>Recent Amendments</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
                  Recent changes and updates to the Criminal Code of the Republic of Praya.
                </p>

                <div style={{ marginBottom: '24px', padding: '20px', background: 'rgba(153, 27, 27, 0.05)', borderRadius: '10px', border: '1px solid rgba(153, 27, 27, 0.1)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 16v-4M12 8h.01"/>
                    </svg>
                    <h4 style={{ fontSize: '14px', margin: 0 }}>Stay Informed</h4>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
                    Subscribe to receive email notifications when the Criminal Code is amended.
                  </p>
                </div>

                <h4 style={{ fontSize: '14px', marginBottom: '12px' }}>2024 Amendments</h4>
                <div style={{ display: 'grid', gap: '16px' }}>
                  {[
                    {
                      date: 'November 1, 2024',
                      bill: 'SB 245',
                      title: 'Cybercrime Enhancement Act',
                      summary: 'Expands criminal penalties for computer crimes, hacking, and identity theft. Adds new offenses for ransomware attacks and unauthorized access to critical infrastructure systems.',
                      changes: ['New § 6.12: Ransomware and extortion offenses', 'Amended § 6.08: Increased penalties for identity theft', 'New § 6.13: Critical infrastructure cyberattacks']
                    },
                    {
                      date: 'September 15, 2024',
                      bill: 'HB 1092',
                      title: 'Domestic Violence Protection Act',
                      summary: 'Strengthens protections for domestic violence victims and increases penalties for repeat offenders. Expands definition of family member to include dating relationships.',
                      changes: ['Amended § 2.15: Expanded domestic violence definitions', 'New § 2.16: Strangulation as separate offense', 'Amended § 2.17: Enhanced penalties for repeat DV offenses']
                    },
                    {
                      date: 'July 1, 2024',
                      bill: 'SB 188',
                      title: 'Cannabis Regulation Compliance Act',
                      summary: 'Updates drug offenses to reflect legal cannabis framework. Clarifies penalties for unlicensed sales and distribution outside regulated system.',
                      changes: ['Amended § 5.04: Removed cannabis from Schedule I', 'New § 5.14: Unlicensed cannabis sales penalties', 'Amended § 5.08: Modified possession thresholds']
                    },
                    {
                      date: 'May 10, 2024',
                      bill: 'HB 876',
                      title: 'Criminal Justice Reform Act',
                      summary: 'Implements sentencing reforms including expanded eligibility for diversion programs and reduced mandatory minimums for certain non-violent offenses.',
                      changes: ['Amended § 1.24: Expanded diversion eligibility', 'Amended § 8.12: Reduced DUI mandatory minimums', 'New § 1.25: Expungement procedures for minor offenses']
                    },
                    {
                      date: 'March 3, 2024',
                      bill: 'SB 92',
                      title: 'Financial Crimes Modernization Act',
                      summary: 'Updates white-collar crime statutes to address cryptocurrency fraud, digital asset theft, and modern money laundering methods.',
                      changes: ['New § 6.20: Cryptocurrency fraud and theft', 'Amended § 6.11: Money laundering to include digital assets', 'New § 6.21: Unauthorized cryptocurrency mining']
                    }
                  ].map((amendment, i) => (
                    <div key={i} style={{ padding: '20px', background: 'var(--bg-elevated)', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <div>
                          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                            {amendment.date} • {amendment.bill}
                          </div>
                          <h5 style={{ fontSize: '15px', fontWeight: '600', margin: 0 }}>{amendment.title}</h5>
                        </div>
                        <span style={{
                          fontSize: '11px',
                          fontWeight: '600',
                          color: 'white',
                          background: 'var(--primary)',
                          padding: '4px 10px',
                          borderRadius: '12px'
                        }}>
                          EFFECTIVE
                        </span>
                      </div>
                      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px', lineHeight: '1.5' }}>
                        {amendment.summary}
                      </p>
                      <div style={{ paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
                        <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '8px', color: 'var(--text-muted)' }}>
                          Key Changes:
                        </div>
                        <ul style={{ fontSize: '12px', color: 'var(--text-secondary)', marginLeft: '20px' }}>
                          {amendment.changes.map((change, j) => (
                            <li key={j} style={{ marginBottom: '4px' }}>{change}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: '24px', padding: '20px', background: 'var(--bg-elevated)', borderRadius: '10px' }}>
                  <h4 style={{ fontSize: '14px', marginBottom: '12px' }}>View Historical Amendments</h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
                    Access complete amendment history and legislative materials from previous years.
                  </p>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {['2023', '2022', '2021', '2020', 'Archive'].map(year => (
                      <button
                        key={year}
                        style={{
                          padding: '8px 16px',
                          background: 'var(--bg-base)',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: '6px',
                          fontSize: '13px',
                          cursor: 'pointer',
                          fontWeight: '500'
                        }}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function OnlineServices() {
  const [activeService, setActiveService] = React.useState('case-lookup');

  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/doj">Home</Link> / Online Services
          </div>
          <h1>Online Services</h1>
          <p className="subtitle">Digital services for case management, filing, and court records access</p>
        </div>
      </div>
      <div className="container">
        <div className="card">
          <div style={{ borderBottom: '1px solid var(--border-subtle)', padding: '0 20px' }}>
            <div style={{ display: 'flex', gap: '24px', overflowX: 'auto' }}>
              {[
                { id: 'case-lookup', label: 'Case Lookup' },
                { id: 'efiling', label: 'E-Filing System' },
                { id: 'calendar', label: 'Court Calendar' },
                { id: 'forms', label: 'Legal Forms' }
              ].map(service => (
                <button
                  key={service.id}
                  onClick={() => setActiveService(service.id)}
                  style={{
                    padding: '16px 8px',
                    background: 'none',
                    border: 'none',
                    borderBottom: `2px solid ${activeService === service.id ? 'var(--primary)' : 'transparent'}`,
                    color: activeService === service.id ? 'var(--primary)' : 'var(--text-secondary)',
                    fontWeight: activeService === service.id ? '600' : '400',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s'
                  }}
                >
                  {service.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ padding: '24px' }}>
            {activeService === 'case-lookup' && (
              <div>
                <h3 style={{ marginBottom: '16px' }}>Case Lookup</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
                  Search for court cases and access public case information.
                </p>

                <div style={{ marginBottom: '24px', padding: '24px', background: 'var(--bg-elevated)', borderRadius: '10px' }}>
                  <h4 style={{ fontSize: '14px', marginBottom: '16px' }}>Search Cases</h4>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '8px' }}>
                      Search By
                    </label>
                    <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                      {['Case Number', 'Party Name', 'Attorney Name'].map(type => (
                        <button
                          key={type}
                          style={{
                            padding: '8px 16px',
                            background: 'var(--bg-base)',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: '6px',
                            fontSize: '13px',
                            cursor: 'pointer',
                            fontWeight: '500'
                          }}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', marginBottom: '6px', color: 'var(--text-muted)' }}>
                        Case Number / Name
                      </label>
                      <input
                        type="text"
                        placeholder="CR-2024-12345 or John Doe"
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: '6px',
                          fontSize: '14px'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', marginBottom: '6px', color: 'var(--text-muted)' }}>
                        Court
                      </label>
                      <select style={{
                        width: '100%',
                        padding: '10px 14px',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '6px',
                        fontSize: '14px'
                      }}>
                        <option>All Courts</option>
                        <option>Supreme Court</option>
                        <option>Appeals Court</option>
                        <option>District Courts</option>
                      </select>
                    </div>
                  </div>

                  <button className="btn btn-primary" style={{ width: '100%' }}>
                    Search Cases
                  </button>
                </div>

                <h4 style={{ fontSize: '14px', marginBottom: '12px' }}>What You Can Find</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '24px' }}>
                  {[
                    { title: 'Case Information', desc: 'Filing date, case type, and current status' },
                    { title: 'Party Information', desc: 'Names of parties and legal representation' },
                    { title: 'Court Dates', desc: 'Scheduled hearings and proceedings' },
                    { title: 'Court Documents', desc: 'Filed pleadings and court orders (where available)' },
                    { title: 'Case History', desc: 'Timeline of case events and filings' },
                    { title: 'Judgments & Orders', desc: 'Final judgments and court decisions' }
                  ].map((item, i) => (
                    <div key={i} style={{ padding: '14px', background: 'var(--bg-elevated)', borderRadius: '8px' }}>
                      <div style={{ fontWeight: '600', fontSize: '13px', marginBottom: '4px' }}>{item.title}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{item.desc}</div>
                    </div>
                  ))}
                </div>

                <div style={{ padding: '16px', background: 'rgba(153, 27, 27, 0.05)', borderRadius: '10px', border: '1px solid rgba(153, 27, 27, 0.1)' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginTop: '2px', flexShrink: 0 }}>
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 16v-4M12 8h.01"/>
                    </svg>
                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                      <strong>Privacy Notice:</strong> Some case information may be sealed or restricted from public access by court order. Juvenile cases and certain sensitive matters are not available through public search.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeService === 'efiling' && (
              <div>
                <h3 style={{ marginBottom: '16px' }}>E-Filing System</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
                  File court documents electronically through our secure online portal.
                </p>

                <div style={{ marginBottom: '24px', padding: '20px', background: 'linear-gradient(135deg, rgba(153, 27, 27, 0.05) 0%, rgba(153, 27, 27, 0.1) 100%)', borderRadius: '10px', border: '1px solid rgba(153, 27, 27, 0.2)' }}>
                  <h4 style={{ fontSize: '15px', marginBottom: '12px' }}>Getting Started with E-Filing</h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                    Our e-filing system allows attorneys and registered users to file documents electronically 24/7. Create an account to begin filing.
                  </p>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button className="btn btn-primary">Create E-Filing Account</button>
                    <button className="btn btn-secondary">Login to E-File</button>
                  </div>
                </div>

                <h4 style={{ fontSize: '14px', marginBottom: '12px' }}>Accepted Filing Types</h4>
                <div style={{ display: 'grid', gap: '12px', marginBottom: '24px' }}>
                  {[
                    {
                      type: 'Civil Cases',
                      desc: 'All civil filings including complaints, motions, and responses',
                      status: 'Available'
                    },
                    {
                      type: 'Criminal Cases',
                      desc: 'Attorney filings for criminal matters (prosecution use only)',
                      status: 'Available'
                    },
                    {
                      type: 'Family Court',
                      desc: 'Divorce, custody, and family law matters',
                      status: 'Coming Soon'
                    },
                    {
                      type: 'Appeals',
                      desc: 'Appellate briefs and notices of appeal',
                      status: 'Available'
                    }
                  ].map((filing, i) => (
                    <div key={i} style={{ padding: '16px', background: 'var(--bg-elevated)', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: '600', fontSize: '14px', marginBottom: '4px' }}>{filing.type}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{filing.desc}</div>
                      </div>
                      <span style={{
                        fontSize: '11px',
                        fontWeight: '600',
                        padding: '4px 10px',
                        borderRadius: '12px',
                        background: filing.status === 'Available' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(153, 27, 27, 0.1)',
                        color: filing.status === 'Available' ? 'rgb(34, 197, 94)' : 'var(--primary)'
                      }}>
                        {filing.status}
                      </span>
                    </div>
                  ))}
                </div>

                <h4 style={{ fontSize: '14px', marginBottom: '12px' }}>E-Filing Requirements</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ padding: '20px', background: 'var(--bg-elevated)', borderRadius: '10px' }}>
                    <h5 style={{ fontSize: '14px', marginBottom: '12px' }}>File Format Requirements</h5>
                    <ul style={{ fontSize: '13px', color: 'var(--text-secondary)', marginLeft: '20px' }}>
                      <li style={{ marginBottom: '6px' }}>PDF format only</li>
                      <li style={{ marginBottom: '6px' }}>Maximum file size: 25MB</li>
                      <li style={{ marginBottom: '6px' }}>Text-searchable (not scanned images)</li>
                      <li style={{ marginBottom: '6px' }}>No security restrictions or passwords</li>
                    </ul>
                  </div>
                  <div style={{ padding: '20px', background: 'var(--bg-elevated)', borderRadius: '10px' }}>
                    <h5 style={{ fontSize: '14px', marginBottom: '12px' }}>Filing Deadlines</h5>
                    <ul style={{ fontSize: '13px', color: 'var(--text-secondary)', marginLeft: '20px' }}>
                      <li style={{ marginBottom: '6px' }}>Filings due by 11:59 PM on deadline day</li>
                      <li style={{ marginBottom: '6px' }}>Court timezone is Praya Standard Time</li>
                      <li style={{ marginBottom: '6px' }}>Immediate confirmation email provided</li>
                      <li style={{ marginBottom: '6px' }}>File-stamped copy available within 24 hours</li>
                    </ul>
                  </div>
                </div>

                <h4 style={{ fontSize: '14px', marginBottom: '12px' }}>Filing Fees</h4>
                <div style={{ padding: '20px', background: 'var(--bg-elevated)', borderRadius: '10px' }}>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                    E-filing fees are the same as traditional paper filing fees. Payment is processed securely at the time of filing.
                  </p>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                    <strong>Accepted payment methods:</strong> Credit/debit cards (Visa, Mastercard, American Express), ACH/bank account
                  </div>
                </div>
              </div>
            )}

            {activeService === 'calendar' && (
              <div>
                <h3 style={{ marginBottom: '16px' }}>Court Calendar</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
                  View upcoming court proceedings and hearing schedules.
                </p>

                <div style={{ marginBottom: '24px', padding: '20px', background: 'var(--bg-elevated)', borderRadius: '10px' }}>
                  <h4 style={{ fontSize: '14px', marginBottom: '16px' }}>Search Court Calendar</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', marginBottom: '6px', color: 'var(--text-muted)' }}>
                        Court
                      </label>
                      <select style={{
                        width: '100%',
                        padding: '10px 14px',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '6px',
                        fontSize: '14px'
                      }}>
                        <option>All Courts</option>
                        <option>Supreme Court</option>
                        <option>Appeals Court</option>
                        <option>District Court - Capital</option>
                        <option>District Court - Eastern</option>
                        <option>District Court - Western</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', marginBottom: '6px', color: 'var(--text-muted)' }}>
                        Date
                      </label>
                      <input
                        type="date"
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: '6px',
                          fontSize: '14px'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', marginBottom: '6px', color: 'var(--text-muted)' }}>
                        Case Type
                      </label>
                      <select style={{
                        width: '100%',
                        padding: '10px 14px',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '6px',
                        fontSize: '14px'
                      }}>
                        <option>All Types</option>
                        <option>Criminal</option>
                        <option>Civil</option>
                        <option>Family</option>
                        <option>Traffic</option>
                      </select>
                    </div>
                  </div>
                  <button className="btn btn-primary" style={{ width: '100%' }}>
                    View Calendar
                  </button>
                </div>

                <h4 style={{ fontSize: '14px', marginBottom: '12px' }}>Today's Hearings - December 4, 2024</h4>
                <div style={{ marginBottom: '24px' }}>
                  {[
                    { time: '9:00 AM', court: 'District Court - Capital, Courtroom 3', case: 'CR-2024-08451', type: 'Criminal', event: 'Arraignment', judge: 'Hon. Sarah Martinez' },
                    { time: '10:30 AM', court: 'District Court - Capital, Courtroom 1', case: 'CV-2024-12389', type: 'Civil', event: 'Motion Hearing', judge: 'Hon. Michael Chen' },
                    { time: '1:00 PM', court: 'Appeals Court, Courtroom A', case: 'AC-2024-0156', type: 'Appeal', event: 'Oral Arguments', judge: 'Panel of Three Judges' },
                    { time: '2:30 PM', court: 'District Court - Eastern, Courtroom 2', case: 'CR-2024-09124', type: 'Criminal', event: 'Pre-Trial Conference', judge: 'Hon. David Thompson' },
                    { time: '3:00 PM', court: 'Supreme Court', case: 'SC-2024-0042', type: 'Constitutional', event: 'Oral Arguments', judge: 'Full Court' }
                  ].map((hearing, i) => (
                    <div key={i} style={{
                      padding: '16px',
                      background: 'var(--bg-elevated)',
                      borderRadius: '10px',
                      marginBottom: '8px',
                      borderLeft: '3px solid var(--primary)'
                    }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr 150px 180px', gap: '16px', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--primary)' }}>{hearing.time}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>{hearing.court}</div>
                          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Case: {hearing.case}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '2px' }}>{hearing.event}</div>
                          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{hearing.type}</div>
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                          {hearing.judge}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div style={{ padding: '20px', background: 'var(--bg-elevated)', borderRadius: '10px' }}>
                    <h4 style={{ fontSize: '14px', marginBottom: '12px' }}>Calendar Features</h4>
                    <ul style={{ fontSize: '13px', color: 'var(--text-secondary)', marginLeft: '20px' }}>
                      <li style={{ marginBottom: '6px' }}>Search by case number, party name, or attorney</li>
                      <li style={{ marginBottom: '6px' }}>Filter by court, date, and case type</li>
                      <li style={{ marginBottom: '6px' }}>Export calendar to Outlook or Google Calendar</li>
                      <li style={{ marginBottom: '6px' }}>Subscribe to case-specific updates</li>
                    </ul>
                  </div>
                  <div style={{ padding: '20px', background: 'rgba(153, 27, 27, 0.05)', borderRadius: '10px', border: '1px solid rgba(153, 27, 27, 0.1)' }}>
                    <h4 style={{ fontSize: '14px', marginBottom: '12px' }}>Important Notice</h4>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                      Court calendars are updated daily but are subject to change. Verify hearing times with the court clerk's office before attending. Call 1-800-PRAYA-COURT for confirmation.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeService === 'forms' && (
              <div>
                <h3 style={{ marginBottom: '16px' }}>Legal Forms</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
                  Download official court forms for various legal proceedings.
                </p>

                <div style={{ marginBottom: '24px', padding: '20px', background: 'var(--bg-elevated)', borderRadius: '10px' }}>
                  <h4 style={{ fontSize: '14px', marginBottom: '12px' }}>Search Forms</h4>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <input
                      type="text"
                      placeholder="Search by form name or number..."
                      style={{
                        flex: 1,
                        padding: '12px 16px',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '8px',
                        fontSize: '14px'
                      }}
                    />
                    <button className="btn btn-primary">Search</button>
                  </div>
                </div>

                <h4 style={{ fontSize: '14px', marginBottom: '12px' }}>Popular Forms</h4>
                <div style={{ marginBottom: '24px', display: 'grid', gap: '12px' }}>
                  {[
                    {
                      number: 'DOJ-CV-001',
                      title: 'Civil Complaint',
                      desc: 'Form to initiate a civil lawsuit',
                      category: 'Civil'
                    },
                    {
                      number: 'DOJ-CV-015',
                      title: 'Motion for Summary Judgment',
                      desc: 'Request for judgment without trial',
                      category: 'Civil'
                    },
                    {
                      number: 'DOJ-CR-005',
                      title: 'Criminal Information Release Request',
                      desc: 'Request for criminal history records',
                      category: 'Criminal'
                    },
                    {
                      number: 'DOJ-AP-010',
                      title: 'Notice of Appeal',
                      desc: 'Form to appeal a court decision',
                      category: 'Appeals'
                    },
                    {
                      number: 'DOJ-SC-025',
                      title: 'Small Claims Complaint',
                      desc: 'File a small claims case (under ¤5,000)',
                      category: 'Small Claims'
                    },
                    {
                      number: 'DOJ-GN-100',
                      title: 'Subpoena',
                      desc: 'Compel witness attendance or document production',
                      category: 'General'
                    }
                  ].map((form, i) => (
                    <div key={i} style={{
                      padding: '16px',
                      background: 'var(--bg-elevated)',
                      borderRadius: '10px',
                      display: 'grid',
                      gridTemplateColumns: '100px 1fr 120px 100px',
                      gap: '16px',
                      alignItems: 'center',
                      border: '1px solid var(--border-subtle)'
                    }}>
                      <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)' }}>
                        {form.number}
                      </div>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>{form.title}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{form.desc}</div>
                      </div>
                      <div>
                        <span style={{
                          fontSize: '11px',
                          padding: '4px 10px',
                          borderRadius: '12px',
                          background: 'rgba(153, 27, 27, 0.1)',
                          color: 'var(--primary)',
                          fontWeight: '600'
                        }}>
                          {form.category}
                        </span>
                      </div>
                      <button style={{
                        padding: '8px 16px',
                        background: 'var(--primary)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}>
                        Download
                      </button>
                    </div>
                  ))}
                </div>

                <h4 style={{ fontSize: '14px', marginBottom: '12px' }}>Browse by Category</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '24px' }}>
                  {[
                    { category: 'Civil Forms', count: 47 },
                    { category: 'Criminal Forms', count: 23 },
                    { category: 'Appeals Forms', count: 15 },
                    { category: 'Small Claims', count: 12 },
                    { category: 'Family Court', count: 31 },
                    { category: 'Probate Forms', count: 19 },
                    { category: 'General Forms', count: 28 },
                    { category: 'Traffic Forms', count: 9 }
                  ].map((cat, i) => (
                    <div
                      key={i}
                      style={{
                        padding: '16px',
                        background: 'var(--bg-elevated)',
                        borderRadius: '8px',
                        border: '1px solid var(--border-subtle)',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        textAlign: 'center'
                      }}
                    >
                      <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>{cat.category}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{cat.count} forms</div>
                    </div>
                  ))}
                </div>

                <div style={{ padding: '20px', background: 'rgba(153, 27, 27, 0.05)', borderRadius: '10px', border: '1px solid rgba(153, 27, 27, 0.1)' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginTop: '2px', flexShrink: 0 }}>
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 16v-4M12 8h.01"/>
                    </svg>
                    <div>
                      <h4 style={{ fontSize: '14px', marginBottom: '8px' }}>Form Assistance</h4>
                      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>
                        Need help completing a form? The Court Clerk's Office provides free assistance during business hours. Call 1-800-PRAYA-COURT or visit your local district court. Legal advice is not provided—consult an attorney for legal guidance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
