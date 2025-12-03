import React, { useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import './Department.css'

export default function NPA() {
  const navigate = useNavigate()

  useEffect(() => {
    document.body.classList.add('theme-npa')
    return () => document.body.classList.remove('theme-npa')
  }, [])

  return (
    <>
      <header className="dept-header">
        <div className="container">
          <Link to="/npa" className="dept-logo">
            <div className="logo-mark">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <div className="logo-text">
              <h1>National Police Agency</h1>
              <span className="tagline">Republic of Praya</span>
            </div>
          </Link>
          <nav className="nav">
            <Link to="/npa" className="nav-link">Home</Link>
            <Link to="/npa/report" className="nav-link">File Report</Link>
            <Link to="/npa/services" className="nav-link">Services</Link>
            <Link to="/npa/safety" className="nav-link">Public Safety</Link>
          </nav>
        </div>
      </header>

      <Routes>
        <Route index element={<NPAHome navigate={navigate} />} />
        <Route path="report" element={<FileReport />} />
        <Route path="services" element={<ComingSoon title="Police Services" />} />
        <Route path="safety" element={<ComingSoon title="Public Safety Information" />} />
      </Routes>

      <footer className="dept-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <h4>National Police Agency</h4>
              <p>Protecting and serving the citizens of the Republic of Praya with integrity and professionalism.</p>
            </div>
            <div className="footer-section">
              <h5>Services</h5>
              <ul>
                <li><Link to="/npa/report">File Police Report</Link></li>
                <li><a href="#">Police Clearance</a></li>
                <li><a href="#">Case Status Lookup</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5>Emergency</h5>
              <ul>
                <li><a href="tel:911">Emergency: 911</a></li>
                <li><a href="tel:311">Non-Emergency: 311</a></li>
                <li><a href="#">Find Police Station</a></li>
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
            <span>&copy; 2024 Republic of Praya. National Police Agency.</span>
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

function NPAHome({ navigate }) {
  return (
    <>
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-bg-shape"></div>
          <div className="hero-bg-shape"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <h2>Protecting <span>Our Community</span></h2>
            <p>The National Police Agency is committed to maintaining public safety, preventing crime, and serving the citizens of Praya with professionalism and integrity.</p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => navigate('/npa/report')}>
                File Police Report
              </button>
              <button className="btn btn-secondary" onClick={() => navigate('/npa/services')}>
                Police Services
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Response Time</span>
              <span className="stat-value">4.2min</span>
              <span className="stat-change">Average</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Crime Rate</span>
              <span className="stat-value">-12%</span>
              <span className="stat-change">vs Last Year</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Cases Solved</span>
              <span className="stat-value">87%</span>
              <span className="stat-change">This Year</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Officers</span>
              <span className="stat-value">3,421</span>
              <span className="stat-change">Active Duty</span>
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
                  <h3 className="card-title">Emergency Services</h3>
                </div>
                <div className="content-text">
                  <h4>When to Call 911</h4>
                  <ul>
                    <li><strong>Life-threatening emergencies</strong> - Medical, fire, serious injuries</li>
                    <li><strong>Crimes in progress</strong> - Burglary, assault, robbery</li>
                    <li><strong>Immediate danger</strong> - Threats to life or property</li>
                    <li><strong>Missing children</strong> - Urgent missing person cases</li>
                  </ul>
                  <h4 style={{ marginTop: '20px' }}>Non-Emergency: 311</h4>
                  <p>For non-urgent police matters, noise complaints, general inquiries, or to file reports after the fact.</p>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">File a Police Report</h3>
                  <Link to="/npa/report" className="card-link">File Now</Link>
                </div>
                <div className="content-text">
                  <p>You can file online reports for:</p>
                  <ul>
                    <li>Theft (under ¤2,500)</li>
                    <li>Lost property</li>
                    <li>Vandalism</li>
                    <li>Vehicle accidents (no injuries)</li>
                  </ul>
                  <p style={{ marginTop: '12px' }}><strong>Processing time:</strong> 24-48 hours for case number confirmation</p>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Recent Updates</h3>
                </div>
                <div className="news-item">
                  <span className="news-date">Nov 28, 2024</span>
                  <h4 className="news-title">Community Policing Initiative Expansion</h4>
                  <p className="news-excerpt">NPA expands neighborhood watch programs to 15 additional districts.</p>
                </div>
                <div className="news-item">
                  <span className="news-date">Nov 20, 2024</span>
                  <h4 className="news-title">New Online Report Filing System</h4>
                  <p className="news-excerpt">File non-emergency reports online with faster processing times.</p>
                </div>
              </div>
            </div>

            <aside className="sidebar">
              <div className="card">
                <h4 className="card-title">Quick Services</h4>
                <div className="quick-link" onClick={() => navigate('/npa/report')}>
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                      <polyline points="14,2 14,8 20,8"/>
                    </svg>
                  </span>
                  File Police Report
                </div>
                <div className="quick-link">
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"/>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                  </span>
                  Case Status Lookup
                </div>
                <div className="quick-link">
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                      <polyline points="14,2 14,8 20,8"/>
                      <line x1="16" y1="13" x2="8" y2="13"/>
                      <line x1="16" y1="17" x2="8" y2="17"/>
                      <polyline points="10,9 9,9 8,9"/>
                    </svg>
                  </span>
                  Police Clearance
                </div>
                <div className="quick-link">
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </span>
                  Find Police Station
                </div>
              </div>

              <div className="info-box">
                <h4>Emergency Contacts</h4>
                <p><strong>Emergency:</strong> 911</p>
                <p><strong>Non-Emergency:</strong> 311</p>
                <p><strong>Anonymous Tips:</strong> 1-800-CRIME-TIP</p>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  )
}

function FileReport() {
  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/npa">Home</Link> / File Police Report
          </div>
          <h1>File a Police Report</h1>
          <p className="subtitle">Submit non-emergency reports online</p>
        </div>
      </div>
      <div className="container">
        <div className="content-text">
          <h3>Online Report Filing</h3>
          <p>You can file online reports for the following incident types:</p>

          <div className="card" style={{ marginTop: '20px' }}>
            <h4 className="card-title">Theft - Minor (under ¤2,500)</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Report theft of personal property valued under ¤2,500. Include description of stolen items, approximate value, and time of incident.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Processing:</strong> 24-48 hours for case number | <strong>Response:</strong> Officer may contact for details
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Lost Property</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Report lost items for insurance or replacement documentation. Check our lost & found database first.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Processing:</strong> Immediate case number | <strong>Follow-up:</strong> Check lost & found weekly
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Vandalism/Property Damage</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Report damage to personal or public property. Include photos if available and any witness information.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Processing:</strong> 24-48 hours | <strong>Follow-up:</strong> Officer visit may be scheduled
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Vehicle Accident (No Injuries)</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>For minor traffic accidents with no injuries. Exchange insurance information at the scene first.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Processing:</strong> 48 hours | <strong>Required:</strong> Driver info, insurance, photos
            </div>
          </div>

          <h3 style={{ marginTop: '32px' }}>Cannot File Online</h3>
          <p>Please call 911 or 311 for:</p>
          <ul>
            <li>Crimes in progress or emergencies</li>
            <li>Theft over ¤2,500</li>
            <li>Assault or violence</li>
            <li>Domestic incidents</li>
            <li>Missing persons</li>
            <li>Drug-related crimes</li>
          </ul>

          <div className="info-box" style={{ marginTop: '24px' }}>
            <h4>Need Help?</h4>
            <p>Call 311 for assistance with report filing or visit your nearest police station during business hours.</p>
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
      case 'Police Services':
        return {
          description: 'Access police clearances, case lookups, and community programs.',
          services: ['Police Clearance Certificates', 'Case Status Lookup', 'Community Programs', 'Crime Statistics'],
          contact: 'For assistance: Call 311 or visit your local police station'
        };
      case 'Public Safety Information':
        return {
          description: 'Safety tips, crime prevention resources, and community awareness programs.',
          services: ['Crime Prevention Tips', 'Neighborhood Watch', 'Safety Workshops', 'Emergency Preparedness'],
          contact: 'Safety inquiries: safety@npa.gov.py or call 311'
        };
      default:
        return {
          description: 'This service is being developed to better serve our community.',
          services: [],
          contact: 'For assistance, contact the National Police Agency at 311'
        };
    }
  };

  const info = getServiceInfo();

  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/npa">Home</Link> / {title}
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
              background: 'linear-gradient(135deg, rgba(29, 78, 216, 0.1) 0%, rgba(29, 78, 216, 0.2) 100%)',
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
              background: 'rgba(29, 78, 216, 0.05)',
              borderRadius: '10px',
              fontSize: '13px',
              color: 'var(--text-muted)'
            }}>
              {info.contact}
            </div>

            <div style={{ marginTop: '32px' }}>
              <h4 style={{ fontSize: '14px', marginBottom: '12px' }}>Related Services</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                <Link to="/npa/report" style={{
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
                  File Police Report
                </Link>
                <button
                  onClick={() => navigate('/npa')}
                  className="btn btn-secondary"
                  style={{ fontSize: '13px', padding: '14px' }}
                >
                  Return to NPA Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
