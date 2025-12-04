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
        <Route path="registration" element={<VehicleRegistration />} />
        <Route path="permits" element={<SpecialPermits />} />
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
                <li><Link to="/transport/registration">Vehicle Registration</Link></li>
                <li><Link to="/transport/permits">Special Permits</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5>Resources</h5>
              <ul>
                <li><Link to="/transport/license">Driver's Manual</Link></li>
                <li><Link to="/transport/license">Practice Tests</Link></li>
                <li><Link to="/transport">Service Centers</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5>Government</h5>
              <ul>
                <li><Link to="/">Gov Portal</Link></li>
                <li><Link to="/transport">Traffic Safety</Link></li>
                <li><Link to="/transport">Road Conditions</Link></li>
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
          <div className="hero-bg-shape"></div>
        </div>
        <div className="hero-pattern"></div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 18h18M3 6h18M5 18V6M19 18V6M9 10h6M9 14h6"/>
              </svg>
              Transportation Services
            </div>
            <h2>Safe Roads for <span>Everyone</span></h2>
            <p>The Transport Department manages driver licensing, vehicle registration, and transportation safety programs to keep Praya's roads safe and efficient for all travelers.</p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => navigate('/transport/license')}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                  <line x1="1" y1="10" x2="23" y2="10"/>
                </svg>
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

function VehicleRegistration() {
  const [registrationType, setRegistrationType] = React.useState('new');
  const [vehicleType, setVehicleType] = React.useState('passenger');

  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/transport">Home</Link> / Vehicle Registration
          </div>
          <h1>Vehicle Registration & Titles</h1>
          <p className="subtitle">Register vehicles, renew registration, and manage titles</p>
        </div>
      </div>
      <div className="container">
        <div className="content-grid">
          <div className="main-content">
            <div className="card">
              <h3 className="card-title">Register or Renew</h3>
              <div className="content-text">
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Service Type</label>
                  <select
                    value={registrationType}
                    onChange={(e) => setRegistrationType(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}
                  >
                    <option value="new">New Vehicle Registration</option>
                    <option value="renew">Renew Registration</option>
                    <option value="transfer">Transfer Title</option>
                    <option value="replace">Replace Plates</option>
                  </select>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Vehicle Type</label>
                  <select
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}
                  >
                    <option value="passenger">Passenger Vehicle</option>
                    <option value="motorcycle">Motorcycle</option>
                    <option value="truck">Truck/Commercial</option>
                    <option value="trailer">Trailer</option>
                    <option value="rv">RV/Motorhome</option>
                  </select>
                </div>

                <button className="btn btn-primary" style={{ width: '100%', marginTop: '16px', padding: '14px' }}>
                  Start Application
                </button>
              </div>
            </div>

            <div className="card">
              <h3 className="card-title">New Vehicle Registration</h3>
              <div className="content-text">
                <p style={{ marginBottom: '12px' }}>Register a newly purchased vehicle within 30 days:</p>
                <h4>Documents Required:</h4>
                <ul>
                  <li><strong>Title:</strong> Original title signed by seller (or manufacturer's certificate of origin for new vehicles)</li>
                  <li><strong>Proof of insurance:</strong> Valid insurance card or policy declaration</li>
                  <li><strong>Bill of sale:</strong> Signed purchase agreement showing sale price</li>
                  <li><strong>Odometer disclosure:</strong> Required for vehicles under 10 years old</li>
                  <li><strong>Identification:</strong> Valid driver's license or state ID</li>
                  <li><strong>Emissions test:</strong> If required in your area (vehicles 4+ years old)</li>
                </ul>
                <h4 style={{ marginTop: '16px' }}>Fees:</h4>
                <ul>
                  <li><strong>Title fee:</strong> ¤50</li>
                  <li><strong>Registration fee:</strong> ¤85-¤250 (based on vehicle weight and value)</li>
                  <li><strong>License plates:</strong> ¤25 (one-time fee)</li>
                  <li><strong>Sales tax:</strong> 6.5% of purchase price</li>
                </ul>
              </div>
            </div>

            <div className="card">
              <h3 className="card-title">Registration Renewal</h3>
              <div className="content-text">
                <p style={{ marginBottom: '12px' }}>Renew your registration online, by mail, or in person:</p>
                <h4>Renewal Options:</h4>
                <ul>
                  <li><strong>1 year:</strong> Standard registration (¤85-¤150 based on vehicle type)</li>
                  <li><strong>2 years:</strong> Save 5% with multi-year registration</li>
                  <li><strong>Grace period:</strong> 30 days after expiration (¤10 late fee)</li>
                </ul>
                <h4 style={{ marginTop: '16px' }}>Online Renewal Eligibility:</h4>
                <ul>
                  <li>Renewed in person last time</li>
                  <li>No insurance lapses</li>
                  <li>No emissions test required this year</li>
                  <li>Vehicle not reported stolen or salvaged</li>
                </ul>
                <p style={{ marginTop: '12px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                  <strong>Note:</strong> New registration sticker mailed within 7-10 business days
                </p>
              </div>
            </div>

            <div className="card">
              <h3 className="card-title">Title Services</h3>
              <div className="content-text">
                <h4>Title Transfer (Buy/Sell)</h4>
                <ul style={{ marginBottom: '16px' }}>
                  <li><strong>Seller responsibilities:</strong> Sign title, provide bill of sale, odometer reading</li>
                  <li><strong>Buyer responsibilities:</strong> Apply for new title within 30 days, pay transfer fee</li>
                  <li><strong>Transfer fee:</strong> ¤75</li>
                  <li><strong>Lien notation:</strong> ¤25 (if applicable)</li>
                </ul>
                <h4>Duplicate Title</h4>
                <ul>
                  <li>Apply online, by mail, or in person</li>
                  <li>Fee: ¤50</li>
                  <li>Processing time: 2-3 weeks</li>
                  <li>Must show ID and proof of ownership</li>
                </ul>
              </div>
            </div>
          </div>

          <aside className="sidebar">
            <div className="card" style={{ background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)', color: 'white', border: 'none' }}>
              <h4 style={{ color: 'white', marginBottom: '8px' }}>Registration Fees</h4>
              <div style={{ fontSize: '13px', opacity: 0.9, marginTop: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>Passenger Car</span>
                  <span style={{ fontWeight: '600' }}>¤85-¤150</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>Motorcycle</span>
                  <span style={{ fontWeight: '600' }}>¤45</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>Truck/Commercial</span>
                  <span style={{ fontWeight: '600' }}>¤150-¤350</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Trailer</span>
                  <span style={{ fontWeight: '600' }}>¤35</span>
                </div>
              </div>
            </div>

            <div className="info-box">
              <h4>Renewal Reminders</h4>
              <p>Sign up for email or text reminders 60 days before your registration expires.</p>
              <p style={{ marginTop: '12px', fontSize: '13px' }}>Never miss a renewal deadline!</p>
            </div>

            <div className="card">
              <h4 className="card-title">Personalized Plates</h4>
              <ul style={{ fontSize: '14px' }}>
                <li>3-7 characters available</li>
                <li>One-time fee: ¤50</li>
                <li>Annual renewal: ¤25 extra</li>
                <li>Check availability online</li>
              </ul>
            </div>

            <div className="info-box">
              <h4>Service Centers</h4>
              <p><strong>Phone:</strong> 1-800-DRIVE-PY</p>
              <p><strong>Hours:</strong> Mon-Fri 8AM-5PM</p>
              <p><strong>Sat:</strong> Select locations 9AM-1PM</p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}

function SpecialPermits() {
  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/transport">Home</Link> / Special Permits
          </div>
          <h1>Special Permits</h1>
          <p className="subtitle">Commercial, oversized vehicle, and temporary permits</p>
        </div>
      </div>
      <div className="container">
        <div className="content-grid">
          <div className="main-content">
            <div className="card">
              <h3 className="card-title">Commercial Vehicle Permits</h3>
              <div className="content-text">
                <p>Required for commercial vehicles operating in Praya:</p>
                <ul style={{ marginTop: '12px' }}>
                  <li><strong>Intrastate commerce:</strong> Operating only within Praya</li>
                  <li><strong>Interstate commerce:</strong> Operating across state lines</li>
                  <li><strong>Annual permit:</strong> ¤150-¤500 based on gross vehicle weight</li>
                  <li><strong>Quarterly permit:</strong> ¤50-¤150 for seasonal operations</li>
                  <li><strong>Safety inspection:</strong> Required annually for commercial vehicles</li>
                  <li><strong>DOT number:</strong> Required for commercial carriers</li>
                </ul>
                <h4 style={{ marginTop: '20px' }}>Application Requirements:</h4>
                <ul>
                  <li>Proof of commercial insurance (minimum ¤500,000 liability)</li>
                  <li>Vehicle registration and title</li>
                  <li>Company business license</li>
                  <li>Driver Class B or C commercial license</li>
                </ul>
              </div>
            </div>

            <div className="card">
              <h3 className="card-title">Oversized Load Permits</h3>
              <div className="content-text">
                <p>Required for vehicles exceeding standard size/weight limits:</p>
                <h4>When Permits Are Required:</h4>
                <ul style={{ marginBottom: '16px' }}>
                  <li><strong>Width:</strong> Over 2.6 meters (8.5 feet)</li>
                  <li><strong>Height:</strong> Over 4.3 meters (14 feet)</li>
                  <li><strong>Length:</strong> Over 16 meters (53 feet)</li>
                  <li><strong>Weight:</strong> Over 36,000 kg (80,000 lbs) gross vehicle weight</li>
                </ul>
                <h4>Permit Types:</h4>
                <ul style={{ marginBottom: '16px' }}>
                  <li><strong>Single trip:</strong> ¤50-¤200 (valid for specific route and dates)</li>
                  <li><strong>Annual superload:</strong> ¤500 (multiple trips, same route)</li>
                  <li><strong>Emergency:</strong> ¤100 (24-hour processing for urgent loads)</li>
                </ul>
                <h4>Additional Requirements:</h4>
                <ul>
                  <li>Route survey and approval</li>
                  <li>Escort vehicles for extremely large loads</li>
                  <li>Travel restrictions (daylight hours, no weekends for some routes)</li>
                  <li>Warning signs and flags</li>
                  <li>Bond or insurance certificate</li>
                </ul>
              </div>
            </div>

            <div className="card">
              <h3 className="card-title">Temporary Registration</h3>
              <div className="content-text">
                <p>Short-term registration for special situations:</p>
                <ul style={{ marginTop: '12px', marginBottom: '16px' }}>
                  <li><strong>30-day temp:</strong> ¤25 (moving to Praya, awaiting permanent registration)</li>
                  <li><strong>90-day temp:</strong> ¤50 (for out-of-state vehicles, military personnel)</li>
                  <li><strong>Dealer temp:</strong> ¤15 per vehicle (licensed dealers only)</li>
                  <li><strong>Antique/collector:</strong> ¤35 (one-time event or show)</li>
                </ul>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  Temporary tags printed immediately at service centers or emailed for online applications
                </p>
              </div>
            </div>

            <div className="card">
              <h3 className="card-title">Disabled Parking Permits</h3>
              <div className="content-text">
                <p>Permits for individuals with qualifying disabilities:</p>
                <h4>Permanent Permit:</h4>
                <ul style={{ marginBottom: '16px' }}>
                  <li><strong>Eligibility:</strong> Mobility impairment, heart condition, lung disease, or other qualifying disability</li>
                  <li><strong>Duration:</strong> 5 years (renewable)</li>
                  <li><strong>Fee:</strong> Free</li>
                  <li><strong>Required:</strong> Physician certification form</li>
                </ul>
                <h4>Temporary Permit:</h4>
                <ul style={{ marginBottom: '16px' }}>
                  <li><strong>Duration:</strong> Up to 6 months</li>
                  <li><strong>Renewable:</strong> Once with doctor approval</li>
                  <li><strong>Fee:</strong> Free</li>
                </ul>
                <h4>Organizational Permit:</h4>
                <ul>
                  <li>For organizations transporting disabled persons</li>
                  <li>Annual fee: ¤25</li>
                  <li>Requires proof of nonprofit status or licensing</li>
                </ul>
              </div>
            </div>
          </div>

          <aside className="sidebar">
            <div className="card">
              <h4 className="card-title">Application Process</h4>
              <ol style={{ fontSize: '14px', paddingLeft: '20px' }}>
                <li style={{ marginBottom: '8px' }}>Complete application form</li>
                <li style={{ marginBottom: '8px' }}>Gather required documents</li>
                <li style={{ marginBottom: '8px' }}>Submit online or at service center</li>
                <li style={{ marginBottom: '8px' }}>Pay applicable fees</li>
                <li>Receive permit (instant or 3-5 days)</li>
              </ol>
            </div>

            <div className="info-box">
              <h4>Processing Times</h4>
              <p><strong>Standard:</strong> 3-5 business days</p>
              <p><strong>Expedited:</strong> 24 hours (+¤50 fee)</p>
              <p><strong>Emergency:</strong> Same day (+¤100 fee)</p>
            </div>

            <div className="card">
              <h4 className="card-title">Permit Fees</h4>
              <ul style={{ fontSize: '14px' }}>
                <li><strong>Commercial:</strong> ¤150-¤500/year</li>
                <li><strong>Oversized:</strong> ¤50-¤200/trip</li>
                <li><strong>Temporary:</strong> ¤15-¤50</li>
                <li><strong>Disabled:</strong> Free</li>
              </ul>
            </div>

            <div className="info-box">
              <h4>Permit Inquiries</h4>
              <p><strong>Email:</strong> permits@transport.gov.py</p>
              <p><strong>Phone:</strong> 1-800-DRIVE-PY</p>
              <p><strong>Hours:</strong> Mon-Fri 8AM-5PM</p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
