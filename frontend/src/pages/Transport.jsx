import React, { useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import './Department.css'

export default function Transport() {
  const navigate = useNavigate()

  useEffect(() => {
    document.body.classList.add('theme-transport')
    return () => document.body.classList.remove('theme-transport')
  }, [])

  return (
    <>
      <header className="dept-header">
        <div className="container">
          <Link to="/transport" className="dept-logo">
            <div className="logo-mark">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 18h18M3 6h18M5 18V6M19 18V6M9 10h6M9 14h6"/>
              </svg>
            </div>
            <div className="logo-text">
              <h1>Transport Department</h1>
              <span className="tagline">Republic of Praya</span>
            </div>
          </Link>
          <nav className="nav">
            <Link to="/transport" className="nav-link">Home</Link>
            <Link to="/transport/license" className="nav-link">Driver's License</Link>
            <Link to="/transport/registration" className="nav-link">Vehicle Registration</Link>
            <Link to="/transport/permits" className="nav-link">Permits</Link>
          </nav>
        </div>
      </header>

      <Routes>
        <Route index element={<TransportHome navigate={navigate} />} />
        <Route path="license" element={<DriversLicense />} />
        <Route path="registration" element={<ComingSoon title="Vehicle Registration" />} />
        <Route path="permits" element={<ComingSoon title="Special Permits" />} />
      </Routes>

      <footer className="dept-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <h4>Transport Department</h4>
              <p>Ensuring safe and efficient transportation throughout the Republic of Praya through licensing, registration, and oversight.</p>
            </div>
            <div className="footer-section">
              <h5>Services</h5>
              <ul>
                <li><Link to="/transport/license">Driver's License</Link></li>
                <li><a href="#">Vehicle Registration</a></li>
                <li><a href="#">Road Test Scheduling</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5>Resources</h5>
              <ul>
                <li><a href="#">Driver's Manual</a></li>
                <li><a href="#">Practice Tests</a></li>
                <li><a href="#">Service Centers</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5>Government</h5>
              <ul>
                <li><Link to="/">Gov Portal</Link></li>
                <li><a href="#">Traffic Safety</a></li>
                <li><a href="#">Road Conditions</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>&copy; 2024 Republic of Praya. Transport Department.</span>
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

function TransportHome({ navigate }) {
  return (
    <>
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-bg-shape"></div>
          <div className="hero-bg-shape"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <h2>Safe Roads for <span>Everyone</span></h2>
            <p>The Transport Department manages driver licensing, vehicle registration, and transportation safety programs to keep Praya's roads safe and efficient.</p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => navigate('/transport/license')}>
                Driver's License
              </button>
              <button className="btn btn-secondary" onClick={() => navigate('/transport/registration')}>
                Register Vehicle
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Licensed Drivers</span>
              <span className="stat-value">3.2M</span>
              <span className="stat-change">Active</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Registered Vehicles</span>
              <span className="stat-value">2.8M</span>
              <span className="stat-change">On Road</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Service Centers</span>
              <span className="stat-value">156</span>
              <span className="stat-change">Nationwide</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Road Safety</span>
              <span className="stat-value">-15%</span>
              <span className="stat-change">Accident Rate</span>
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
                  <h3 className="card-title">Driver's License Services</h3>
                  <Link to="/transport/license" className="card-link">Learn More</Link>
                </div>
                <div className="content-text">
                  <h4>License Types</h4>
                  <ul>
                    <li><strong>Class A:</strong> Passenger vehicles, motorcycles (standard license)</li>
                    <li><strong>Class B:</strong> Commercial vehicles under 7,500 kg</li>
                    <li><strong>Class C:</strong> Heavy commercial vehicles, buses</li>
                    <li><strong>Learner's Permit:</strong> For new drivers learning to drive</li>
                  </ul>
                  <h4 style={{ marginTop: '20px' }}>Online Services</h4>
                  <ul>
                    <li>Renew driver's license online (if eligible)</li>
                    <li>Schedule road test appointment</li>
                    <li>Practice written test</li>
                    <li>Update address or information</li>
                    <li>Request driving record</li>
                  </ul>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Vehicle Registration & Titles</h3>
                </div>
                <div className="content-text">
                  <h4>Registration Services</h4>
                  <ul>
                    <li><strong>New registration:</strong> Register newly purchased vehicle</li>
                    <li><strong>Renewal:</strong> Annual or multi-year renewal options</li>
                    <li><strong>Transfer:</strong> Transfer plates to different vehicle</li>
                    <li><strong>Replace plates:</strong> Lost, stolen, or damaged plates</li>
                  </ul>
                  <h4 style={{ marginTop: '20px' }}>Title Services</h4>
                  <ul>
                    <li>Transfer vehicle title when buying/selling</li>
                    <li>Duplicate title for lost or damaged originals</li>
                    <li>Lien releases and title updates</li>
                  </ul>
                  <p style={{ marginTop: '12px' }}><strong>Registration fees:</strong> Based on vehicle type, weight, and value</p>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Department Updates</h3>
                </div>
                <div className="news-item">
                  <span className="news-date">Nov 28, 2024</span>
                  <h4 className="news-title">Extended Hours at Select Service Centers</h4>
                  <p className="news-excerpt">10 locations now open Saturday mornings for driver services.</p>
                </div>
                <div className="news-item">
                  <span className="news-date">Nov 15, 2024</span>
                  <h4 className="news-title">New Digital Driver's License Pilot</h4>
                  <p className="news-excerpt">Mobile app pilot program launching in Praya City in January 2025.</p>
                </div>
              </div>
            </div>

            <aside className="sidebar">
              <div className="card">
                <h4 className="card-title">Quick Services</h4>
                <div className="quick-link" onClick={() => navigate('/transport/license')}>
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                      <line x1="1" y1="10" x2="23" y2="10"/>
                    </svg>
                  </span>
                  Renew License
                </div>
                <div className="quick-link" onClick={() => navigate('/transport/registration')}>
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                      <polyline points="14,2 14,8 20,8"/>
                    </svg>
                  </span>
                  Register Vehicle
                </div>
                <div className="quick-link">
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0110 0v4"/>
                    </svg>
                  </span>
                  Schedule Road Test
                </div>
                <div className="quick-link">
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </span>
                  Find Service Center
                </div>
              </div>

              <div className="info-box">
                <h4>Customer Service</h4>
                <p><strong>Phone:</strong> 1-800-DRIVE-PY</p>
                <p><strong>Hours:</strong> Mon-Fri 8AM-5PM</p>
                <p><strong>Email:</strong> info@transport.gov.py</p>
              </div>

              <div className="card">
                <h4 className="card-title">License Fees</h4>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '12px' }}>
                  <p style={{ marginBottom: '8px' }}><strong>Class A (5 years):</strong> ¤45</p>
                  <p style={{ marginBottom: '8px' }}><strong>Class B/C (3 years):</strong> ¤85</p>
                  <p style={{ marginBottom: '8px' }}><strong>Learner's Permit:</strong> ¤15</p>
                  <p><strong>Road Test:</strong> ¤25</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  )
}

function DriversLicense() {
  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/transport">Home</Link> / Driver's License
          </div>
          <h1>Driver's License Services</h1>
          <p className="subtitle">Apply, renew, or upgrade your driver's license</p>
        </div>
      </div>
      <div className="container">
        <div className="content-text">
          <h3>Getting Your Driver's License</h3>
          <p>The Transport Department issues driver's licenses to qualified applicants who demonstrate knowledge of traffic laws and safe driving skills.</p>

          <div className="card" style={{ marginTop: '20px' }}>
            <h4 className="card-title">Learner's Permit (Age 16+)</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>First step for new drivers:</p>
            <ul style={{ marginBottom: '12px' }}>
              <li><strong>Eligibility:</strong> Minimum age 16 years</li>
              <li><strong>Written test:</strong> 25 questions on traffic laws and signs (must score 80%)</li>
              <li><strong>Vision test:</strong> 20/40 minimum in at least one eye</li>
              <li><strong>Documents needed:</strong> Birth certificate or passport, proof of residency, parental consent (under 18)</li>
              <li><strong>Fee:</strong> ¤15 (valid 2 years)</li>
              <li><strong>Restrictions:</strong> Must be accompanied by licensed driver 21+ in front seat</li>
            </ul>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Study:</strong> Download the Driver's Manual and take practice tests online
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Class A Driver's License (Standard)</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>For passenger vehicles and motorcycles:</p>
            <ul style={{ marginBottom: '12px' }}>
              <li><strong>Eligibility:</strong> Age 18+ OR age 16+ with 50 hours supervised driving</li>
              <li><strong>Requirement:</strong> Hold learner's permit for minimum 6 months (if under 18)</li>
              <li><strong>Road test:</strong> Demonstrate safe driving skills with examiner</li>
              <li><strong>Vehicle types:</strong> Cars, motorcycles, light trucks under 3,500 kg</li>
              <li><strong>Fee:</strong> ¤45 (valid 5 years)</li>
              <li><strong>Restrictions for ages 16-17:</strong> No driving midnight-5am, max 1 passenger</li>
            </ul>
          </div>

          <div className="card">
            <h4 className="card-title">Class B Commercial License</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>For small commercial vehicles:</p>
            <ul style={{ marginBottom: '12px' }}>
              <li><strong>Eligibility:</strong> Age 21+, hold Class A for minimum 2 years</li>
              <li><strong>Vehicle types:</strong> Commercial vehicles 3,500-7,500 kg, small buses</li>
              <li><strong>Additional tests:</strong> Written commercial knowledge test, specialized road test</li>
              <li><strong>Medical exam:</strong> DOT physical required</li>
              <li><strong>Fee:</strong> ¤85 (valid 3 years)</li>
            </ul>
          </div>

          <div className="card">
            <h4 className="card-title">Class C Heavy Commercial License</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>For large trucks and buses:</p>
            <ul>
              <li><strong>Eligibility:</strong> Age 21+, hold Class B for minimum 1 year</li>
              <li><strong>Vehicle types:</strong> Vehicles over 7,500 kg, buses with 16+ passengers</li>
              <li><strong>Training:</strong> Approved commercial driver training course required</li>
              <li><strong>Tests:</strong> Written and practical exams, vehicle inspection test</li>
              <li><strong>Medical exam:</strong> Annual DOT physical required</li>
              <li><strong>Fee:</strong> ¤85 (valid 3 years)</li>
            </ul>
          </div>

          <h3 style={{ marginTop: '32px' }}>Renewing Your License</h3>

          <div className="card">
            <h4 className="card-title">Renewal Process</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Renew online, by mail, or in person:</p>
            <ul>
              <li><strong>Online renewal:</strong> Available if you renewed in person last time, no medical restrictions, clean driving record</li>
              <li><strong>In-person renewal:</strong> Visit any service center (required if medical restrictions or suspended license)</li>
              <li><strong>Renewal period:</strong> Up to 1 year before expiration</li>
              <li><strong>Grace period:</strong> 60 days after expiration (late fee applies)</li>
              <li><strong>Vision test:</strong> Required for in-person renewals</li>
            </ul>
          </div>

          <h3 style={{ marginTop: '32px' }}>Road Test</h3>

          <div className="card">
            <h4 className="card-title">Scheduling Your Road Test</h4>
            <ul>
              <li><strong>Appointment required:</strong> Schedule online or call 1-800-DRIVE-PY</li>
              <li><strong>Wait time:</strong> Typically 2-4 weeks for available appointments</li>
              <li><strong>Vehicle:</strong> Must provide registered, insured vehicle in safe condition</li>
              <li><strong>Documents:</strong> Bring learner's permit, proof of supervised driving hours (if under 18)</li>
              <li><strong>Test duration:</strong> 20-30 minutes</li>
              <li><strong>Skills tested:</strong> Parallel parking, 3-point turn, lane changes, traffic signs/signals compliance</li>
            </ul>
          </div>

          <div className="card">
            <h4 className="card-title">If You Don't Pass</h4>
            <ul>
              <li>Receive score sheet with areas needing improvement</li>
              <li>Can retake test after 7 days</li>
              <li>Additional fee required for each retest (¤25)</li>
              <li>Consider taking driving lessons if failing multiple times</li>
            </ul>
          </div>

          <h3 style={{ marginTop: '32px' }}>International Drivers</h3>
          <ul>
            <li><strong>Visitors:</strong> Foreign license valid up to 90 days</li>
            <li><strong>New residents:</strong> Must obtain Praya license within 90 days</li>
            <li><strong>License transfer:</strong> Some countries have reciprocal agreements (written test waived)</li>
            <li><strong>Non-reciprocal countries:</strong> Must complete full licensing process</li>
          </ul>

          <div className="info-box" style={{ marginTop: '24px' }}>
            <h4>Lost or Stolen License?</h4>
            <p>Report lost/stolen licenses online or at any service center. Replacement license fee: ¤20. New license will be mailed within 7-10 business days.</p>
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
      case 'Vehicle Registration':
        return {
          description: 'Register new vehicles, renew registration, transfer titles, and more.',
          services: ['New Vehicle Registration', 'Registration Renewal', 'Title Transfer', 'License Plates'],
          contact: 'For registration help: Call 1-800-DRIVE-PY or visit a service center'
        };
      case 'Special Permits':
        return {
          description: 'Apply for commercial permits, oversized vehicle permits, and temporary permits.',
          services: ['Commercial Vehicle Permits', 'Oversized Load Permits', 'Temporary Registration', 'Disabled Parking Permits'],
          contact: 'For permit inquiries: permits@transport.gov.py or call 1-800-DRIVE-PY'
        };
      default:
        return {
          description: 'This service is being developed to serve you better.',
          services: [],
          contact: 'For assistance, contact the Transport Department'
        };
    }
  };

  const info = getServiceInfo();

  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/transport">Home</Link> / {title}
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
              background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(249, 115, 22, 0.2) 100%)',
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
              We're working to bring this service online. In the meantime, you can access these services at any Transport service center.
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
              background: 'rgba(249, 115, 22, 0.05)',
              borderRadius: '10px',
              fontSize: '13px',
              color: 'var(--text-muted)'
            }}>
              {info.contact}
            </div>

            <div style={{ marginTop: '32px' }}>
              <h4 style={{ fontSize: '14px', marginBottom: '12px' }}>Related Services</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                <Link to="/transport/license" style={{
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
                  Driver's License
                </Link>
                <button
                  onClick={() => navigate('/transport')}
                  className="btn btn-secondary"
                  style={{ fontSize: '13px', padding: '14px' }}
                >
                  Return to Transport Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
