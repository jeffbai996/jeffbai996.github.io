import React, { useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import './Department.css'

export default function Housing() {
  const navigate = useNavigate()

  useEffect(() => {
    document.body.classList.add('theme-housing')
    return () => document.body.classList.remove('theme-housing')
  }, [])

  return (
    <>
      <header className="dept-header">
        <div className="container">
          <Link to="/housing" className="dept-logo">
            <div className="logo-mark">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                <polyline points="9,22 9,12 15,12 15,22"/>
              </svg>
            </div>
            <div className="logo-text">
              <h1>Housing Authority</h1>
              <span className="tagline">Republic of Praya</span>
            </div>
          </Link>
          <nav className="nav">
            <Link to="/housing" className="nav-link">Home</Link>
            <Link to="/housing/applications" className="nav-link">Applications</Link>
            <Link to="/housing/tenants" className="nav-link">Tenants</Link>
            <Link to="/housing/landlords" className="nav-link">Landlords</Link>
          </nav>
        </div>
      </header>

      <Routes>
        <Route index element={<HousingHome navigate={navigate} />} />
        <Route path="applications" element={<Applications />} />
        <Route path="tenants" element={<TenantResources />} />
        <Route path="landlords" element={<LandlordResources />} />
      </Routes>

      <footer className="dept-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <h4>Housing Authority</h4>
              <p>Providing affordable housing opportunities and support services to residents of the Republic of Praya.</p>
            </div>
            <div className="footer-section">
              <h5>Services</h5>
              <ul>
                <li><Link to="/housing/applications">Apply for Housing</Link></li>
                <li><Link to="/housing/tenants">Tenant Resources</Link></li>
                <li><Link to="/housing/landlords">Landlord Resources</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5>Resources</h5>
              <ul>
                <li><Link to="/housing/tenants">Tenant Rights</Link></li>
                <li><Link to="/housing/applications">Housing Programs</Link></li>
                <li><Link to="/housing">Property Information</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5>Government</h5>
              <ul>
                <li><Link to="/">Gov Portal</Link></li>
                <li><Link to="/housing">Housing Authority</Link></li>
                <li><Link to="/housing/applications">Apply Now</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>&copy; 2024 Republic of Praya. Housing Authority.</span>
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

function HousingHome({ navigate }) {
  const [applicationNumber, setApplicationNumber] = React.useState('')

  return (
    <div className="layout-utility">
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-bg-shape"></div>
          <div className="hero-bg-shape"></div>
          <div className="hero-bg-shape"></div>
        </div>
        <div className="hero-pattern"></div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-top">
              <div className="hero-text">
                <div className="hero-badge">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                  Public Housing
                </div>
                <h2>Housing for <span>Everyone</span></h2>
                <p>The Housing Authority provides affordable housing programs, rental assistance, and tenant support services to ensure every resident has access to safe, quality housing across the Republic.</p>
              </div>
              <div className="hero-actions">
                <button className="btn btn-primary" onClick={() => navigate('/housing/applications')}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                    <polyline points="14,2 14,8 20,8"/>
                  </svg>
                  Apply for Housing
                </button>
                <button className="btn btn-secondary" onClick={() => navigate('/housing/tenants')}>
                  Tenant Resources
                </button>
              </div>
            </div>
            <div className="quick-search">
              <div className="search-title">Check Application Status</div>
              <div className="search-form">
                <input
                  type="text"
                  className="search-input"
                  placeholder="Enter application number (e.g., HA-2024-1234)"
                  value={applicationNumber}
                  onChange={(e) => setApplicationNumber(e.target.value)}
                />
                <button className="search-button">Check Status</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Public Housing Units</span>
              <span className="stat-value">32,400</span>
              <span className="stat-change">Available</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Families Served</span>
              <span className="stat-value">58,200</span>
              <span className="stat-change">Annually</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Avg Rent Savings</span>
              <span className="stat-value">¤680/mo</span>
              <span className="stat-change">Per Household</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Vouchers Issued</span>
              <span className="stat-value">14,800</span>
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
                  <h3 className="card-title">Housing Programs</h3>
                  <Link to="/housing/applications" className="card-link">Apply Now</Link>
                </div>
                <div className="content-text">
                  <h4>Public Housing</h4>
                  <ul>
                    <li><strong>Subsidized Apartments</strong> - Rent based on 30% of household income</li>
                    <li><strong>Family Units</strong> - 1-4 bedroom apartments for families</li>
                    <li><strong>Senior Housing</strong> - Age-restricted communities for 62+</li>
                    <li><strong>Accessible Units</strong> - ADA-compliant housing for disabled residents</li>
                  </ul>
                  <h4 style={{ marginTop: '20px' }}>Rental Assistance</h4>
                  <ul>
                    <li><strong>Housing Choice Vouchers</strong> - Use in private rental market</li>
                    <li><strong>Emergency Rental Assistance</strong> - Temporary help with rent/utilities</li>
                    <li><strong>First-time Renter Program</strong> - Security deposit and move-in assistance</li>
                  </ul>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Eligibility Requirements</h3>
                </div>
                <div className="content-text">
                  <h4>Who Can Apply</h4>
                  <ul>
                    <li>Citizens or legal permanent residents of Praya</li>
                    <li>Income at or below 80% of area median income</li>
                    <li>Meet background check requirements</li>
                    <li>Demonstrate need for housing assistance</li>
                  </ul>
                  <h4 style={{ marginTop: '20px' }}>Income Limits (Annual Household)</h4>
                  <ul>
                    <li>1 person: ¤32,800 or less</li>
                    <li>2 people: ¤37,500 or less</li>
                    <li>3 people: ¤42,200 or less</li>
                    <li>4 people: ¤46,850 or less</li>
                    <li>Additional person: +¤4,650</li>
                  </ul>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Latest News</h3>
                </div>
                <div className="news-item">
                  <span className="news-date">Nov 27, 2024</span>
                  <h4 className="news-title">New Housing Development Opens</h4>
                  <p className="news-excerpt">500 affordable units now accepting applications in Eastside district.</p>
                </div>
                <div className="news-item">
                  <span className="news-date">Nov 18, 2024</span>
                  <h4 className="news-title">Emergency Rental Assistance Extended</h4>
                  <p className="news-excerpt">Program funding extended through June 2025 for eligible households.</p>
                </div>
              </div>
            </div>

            <aside className="sidebar">
              <div className="card">
                <h4 className="card-title">Quick Services</h4>
                <div className="quick-link" onClick={() => navigate('/housing/applications')}>
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                      <polyline points="14,2 14,8 20,8"/>
                    </svg>
                  </span>
                  Apply for Housing
                </div>
                <div className="quick-link">
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"/>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                  </span>
                  Check Application Status
                </div>
                <div className="quick-link">
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                      <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
                    </svg>
                  </span>
                  Pay Rent Online
                </div>
                <div className="quick-link">
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </span>
                  Find Housing Office
                </div>
              </div>

              <div className="info-box">
                <h4>Need Assistance?</h4>
                <p><strong>Phone:</strong> 1-800-HOUSE-PY</p>
                <p><strong>Hours:</strong> Mon-Fri 8AM-5PM</p>
                <p><strong>Email:</strong> info@housing.gov.py</p>
              </div>

              <div className="card">
                <h4 className="card-title">Average Wait Times</h4>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '12px' }}>
                  <p style={{ marginBottom: '8px' }}><strong>1-bedroom:</strong> 18-24 months</p>
                  <p style={{ marginBottom: '8px' }}><strong>2-bedroom:</strong> 12-18 months</p>
                  <p style={{ marginBottom: '8px' }}><strong>3-bedroom:</strong> 8-12 months</p>
                  <p><strong>Senior housing:</strong> 6-9 months</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  )
}

function Applications() {
  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/housing">Home</Link> / Housing Applications
          </div>
          <h1>Apply for Housing Assistance</h1>
          <p className="subtitle">Find the right program for your housing needs</p>
        </div>
      </div>
      <div className="container">
        <div className="content-text">
          <h3>Housing Programs</h3>
          <p>The Housing Authority offers several programs to help low and moderate-income residents find affordable housing.</p>

          <div className="card" style={{ marginTop: '20px' }}>
            <h4 className="card-title">Public Housing Program</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Government-owned affordable rental units with income-based rent.</p>
            <ul style={{ marginBottom: '12px' }}>
              <li><strong>Rent:</strong> 30% of adjusted monthly income</li>
              <li><strong>Unit types:</strong> Studios to 4-bedroom apartments</li>
              <li><strong>Includes:</strong> Basic utilities (water, trash collection)</li>
              <li><strong>Eligibility:</strong> Income at or below 50% area median</li>
              <li><strong>Wait time:</strong> 8-24 months depending on unit size</li>
            </ul>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Application:</strong> Online or in-person at any Housing Authority office
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Housing Choice Voucher Program (Section 8)</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Rental assistance to use in the private market.</p>
            <ul style={{ marginBottom: '12px' }}>
              <li><strong>Benefit:</strong> Voucher pays portion of rent directly to landlord</li>
              <li><strong>Your payment:</strong> 30% of monthly income</li>
              <li><strong>Flexibility:</strong> Choose your own apartment/house</li>
              <li><strong>Portable:</strong> Can move to other cities within Praya</li>
              <li><strong>Eligibility:</strong> Income at or below 50% area median</li>
            </ul>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Wait time:</strong> Currently 12-18 months | <strong>Application:</strong> Online only
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Emergency Rental Assistance</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Short-term help for households facing eviction or utility shutoff.</p>
            <ul style={{ marginBottom: '12px' }}>
              <li>Covers up to 3 months of past-due rent or utilities</li>
              <li>Plus up to 3 months of future rent payments</li>
              <li>Available to households at risk of homelessness</li>
              <li>Must show financial hardship (job loss, medical emergency, etc.)</li>
              <li>One-time benefit (reapply after 12 months)</li>
            </ul>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Processing:</strong> 5-10 business days | <strong>Apply:</strong> Online or call 1-800-HOUSE-PY
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Senior Housing Program</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Age-restricted housing for seniors 62 and older.</p>
            <ul>
              <li>Affordable rent based on income</li>
              <li>Barrier-free accessible design</li>
              <li>Community rooms and activities</li>
              <li>On-site laundry facilities</li>
              <li>Emergency call systems</li>
              <li>Close to public transportation and services</li>
            </ul>
          </div>

          <h3 style={{ marginTop: '32px' }}>Application Process</h3>

          <div className="card">
            <h4 className="card-title">Required Documents</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Have these ready when applying:</p>
            <ul>
              <li>Valid photo ID for all household members 18+</li>
              <li>Birth certificates for all household members</li>
              <li>Social Security cards for all household members</li>
              <li>Proof of income (pay stubs, tax returns, benefit letters)</li>
              <li>Bank statements (past 2 months)</li>
              <li>Current lease or proof of residence</li>
              <li>Landlord references (past 2 years)</li>
            </ul>
          </div>

          <div className="card">
            <h4 className="card-title">Steps to Apply</h4>
            <ol>
              <li><strong>Determine eligibility:</strong> Check income limits and program requirements</li>
              <li><strong>Choose program:</strong> Select the program that best fits your needs</li>
              <li><strong>Complete application:</strong> Fill out online form or visit housing office</li>
              <li><strong>Submit documents:</strong> Upload or mail required verification documents</li>
              <li><strong>Attend interview:</strong> Meet with housing specialist (if required)</li>
              <li><strong>Wait for approval:</strong> Applications processed in order received</li>
              <li><strong>Receive notification:</strong> Approval letter with next steps</li>
            </ol>
          </div>

          <h3 style={{ marginTop: '32px' }}>Preferences & Priority</h3>
          <p>Applicants may receive priority placement for:</p>
          <ul>
            <li>Homelessness or living in substandard housing</li>
            <li>Victims of domestic violence</li>
            <li>Involuntary displacement (eviction, natural disaster)</li>
            <li>Current Praya residents (local preference)</li>
            <li>Veterans and active military families</li>
            <li>Families with disabled members</li>
          </ul>

          <div className="info-box" style={{ marginTop: '24px' }}>
            <h4>Application Assistance</h4>
            <p>Free help available at all Housing Authority offices. Call 1-800-HOUSE-PY to schedule an appointment with a housing counselor.</p>
          </div>
        </div>
      </div>
    </main>
  )
}

function TenantResources() {
  const [selectedTopic, setSelectedTopic] = React.useState('rights');

  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/housing">Home</Link> / Tenant Resources
          </div>
          <h1>Tenant Resources</h1>
          <p className="subtitle">Information and support for public housing and voucher program tenants</p>
        </div>
      </div>
      <div className="container">
        <div className="content-grid">
          <div className="main-content">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Quick Access</h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px', padding: '0 20px 20px' }}>
                <button
                  onClick={() => setSelectedTopic('rights')}
                  className={selectedTopic === 'rights' ? 'btn btn-primary' : 'btn btn-secondary'}
                  style={{ fontSize: '13px' }}
                >
                  Tenant Rights
                </button>
                <button
                  onClick={() => setSelectedTopic('rent')}
                  className={selectedTopic === 'rent' ? 'btn btn-primary' : 'btn btn-secondary'}
                  style={{ fontSize: '13px' }}
                >
                  Pay Rent
                </button>
                <button
                  onClick={() => setSelectedTopic('maintenance')}
                  className={selectedTopic === 'maintenance' ? 'btn btn-primary' : 'btn btn-secondary'}
                  style={{ fontSize: '13px' }}
                >
                  Maintenance
                </button>
                <button
                  onClick={() => setSelectedTopic('lease')}
                  className={selectedTopic === 'lease' ? 'btn btn-primary' : 'btn btn-secondary'}
                  style={{ fontSize: '13px' }}
                >
                  Lease Info
                </button>
              </div>
            </div>

            {selectedTopic === 'rights' && (
              <>
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Tenant Rights & Responsibilities</h3>
                  </div>
                  <div className="content-text">
                    <h4>Your Rights as a Tenant</h4>
                    <ul>
                      <li><strong>Safe & Habitable Housing</strong> - Unit must meet health and safety standards</li>
                      <li><strong>Privacy</strong> - Landlord must give 24-hour notice before entering (except emergencies)</li>
                      <li><strong>No Discrimination</strong> - Protection under Fair Housing Act</li>
                      <li><strong>Reasonable Accommodations</strong> - Request modifications for disabilities</li>
                      <li><strong>Grievance Process</strong> - Right to appeal Housing Authority decisions</li>
                      <li><strong>Lease Protections</strong> - Can only be evicted for lease violations or non-payment</li>
                    </ul>

                    <h4 style={{ marginTop: '20px' }}>Your Responsibilities</h4>
                    <ul>
                      <li>Pay rent on time (due 1st of each month)</li>
                      <li>Keep unit clean and sanitary</li>
                      <li>Report maintenance issues promptly</li>
                      <li>No unauthorized occupants or subletting</li>
                      <li>Follow community rules and lease terms</li>
                      <li>Report changes in income or household composition within 10 days</li>
                      <li>Allow annual inspections</li>
                    </ul>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Prohibited Activities</h3>
                  </div>
                  <div className="content-text">
                    <p>The following activities are grounds for lease termination:</p>
                    <ul>
                      <li>Criminal activity on the property</li>
                      <li>Drug-related activity (use, possession, or sale)</li>
                      <li>Disturbing other residents (excessive noise, threats)</li>
                      <li>Damaging property beyond normal wear and tear</li>
                      <li>Owning dangerous pets or unauthorized animals</li>
                      <li>Fraudulent statements on application or recertification</li>
                    </ul>
                  </div>
                </div>
              </>
            )}

            {selectedTopic === 'rent' && (
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Rent Payment</h3>
                </div>
                <div className="content-text">
                  <h4>Payment Methods</h4>
                  <ul>
                    <li><strong>Online Portal</strong> - Pay via credit/debit card or bank transfer (free)</li>
                    <li><strong>Automatic Payment</strong> - Set up recurring payments from bank account</li>
                    <li><strong>In-Person</strong> - Visit property management office (cash, check, money order)</li>
                    <li><strong>Mail</strong> - Send check or money order to property office</li>
                    <li><strong>Payment Kiosk</strong> - Available at select housing offices</li>
                  </ul>

                  <h4 style={{ marginTop: '20px' }}>Important Information</h4>
                  <ul>
                    <li><strong>Due Date:</strong> Rent is due on the 1st of each month</li>
                    <li><strong>Grace Period:</strong> 5-day grace period (no late fee until 6th)</li>
                    <li><strong>Late Fee:</strong> ¤25 after grace period, ¤10 per day thereafter (max ¤75)</li>
                    <li><strong>NSF Fee:</strong> ¤35 for returned checks or failed bank transfers</li>
                    <li><strong>Receipts:</strong> Always get/keep receipt for payments</li>
                  </ul>

                  <h4 style={{ marginTop: '20px' }}>Rent Calculation</h4>
                  <p>Your rent is 30% of your adjusted monthly income. Adjustments include:</p>
                  <ul>
                    <li>¤480 deduction per dependent (under 18 or disabled)</li>
                    <li>¤400 deduction per elderly household member (62+)</li>
                    <li>Medical expense deduction (expenses exceeding 3% of income)</li>
                    <li>Childcare expense deduction (for work/school)</li>
                  </ul>

                  <div className="info-box" style={{ marginTop: '20px' }}>
                    <h4>Payment Assistance</h4>
                    <p>If you're having trouble paying rent, contact your property manager immediately. Options may include:</p>
                    <ul>
                      <li>Payment plan arrangements</li>
                      <li>Emergency rental assistance referrals</li>
                      <li>Interim recertification if income has decreased</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {selectedTopic === 'maintenance' && (
              <>
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Maintenance Requests</h3>
                  </div>
                  <div className="content-text">
                    <h4>How to Request Repairs</h4>
                    <ol>
                      <li><strong>Online Portal:</strong> Submit request through tenant portal (preferred)</li>
                      <li><strong>Phone:</strong> Call property management office</li>
                      <li><strong>In-Person:</strong> Visit property management office</li>
                      <li><strong>Emergency:</strong> Call 24-hour emergency line at 1-800-HOUSE-PY</li>
                    </ol>

                    <h4 style={{ marginTop: '20px' }}>Emergency vs. Non-Emergency</h4>
                    <p><strong>Emergencies</strong> (call immediately):</p>
                    <ul>
                      <li>No heat in winter (below 60°F)</li>
                      <li>No running water</li>
                      <li>Gas leak or gas smell</li>
                      <li>Fire or smoke</li>
                      <li>Broken locks or security issues</li>
                      <li>Major water leaks or flooding</li>
                      <li>No electricity (if caused by building issue)</li>
                    </ul>

                    <p style={{ marginTop: '12px' }}><strong>Non-Emergencies</strong> (submit normal request):</p>
                    <ul>
                      <li>Minor leaks (dripping faucet, toilet running)</li>
                      <li>Appliance repairs (stove, refrigerator)</li>
                      <li>Paint touch-ups or cosmetic issues</li>
                      <li>Window or screen repairs</li>
                      <li>Light fixture issues</li>
                    </ul>

                    <h4 style={{ marginTop: '20px' }}>Response Times</h4>
                    <ul>
                      <li><strong>Emergency:</strong> Same day (within 4 hours)</li>
                      <li><strong>Urgent:</strong> Within 24-48 hours</li>
                      <li><strong>Routine:</strong> Within 5-7 business days</li>
                      <li><strong>Cosmetic:</strong> Within 30 days</li>
                    </ul>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Tenant Responsibilities</h3>
                  </div>
                  <div className="content-text">
                    <p>Tenants are responsible for:</p>
                    <ul>
                      <li>Changing light bulbs and batteries (smoke detectors)</li>
                      <li>Unclogging drains caused by misuse</li>
                      <li>Pest control resulting from poor housekeeping</li>
                      <li>Damage caused by tenant or guests</li>
                      <li>HVAC filter changes (provided by property)</li>
                    </ul>
                  </div>
                </div>
              </>
            )}

            {selectedTopic === 'lease' && (
              <>
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Lease Information</h3>
                  </div>
                  <div className="content-text">
                    <h4>Lease Terms</h4>
                    <ul>
                      <li><strong>Initial Lease:</strong> 12-month term</li>
                      <li><strong>Renewals:</strong> Automatic annual renewal (unless terminated)</li>
                      <li><strong>Notice to Vacate:</strong> 30 days written notice required</li>
                      <li><strong>Early Termination:</strong> Must pay rent until unit re-rented or lease ends</li>
                    </ul>

                    <h4 style={{ marginTop: '20px' }}>Annual Recertification</h4>
                    <p>Every year you must recertify your eligibility:</p>
                    <ul>
                      <li>Complete recertification form (mailed 90 days before due)</li>
                      <li>Provide updated income documentation</li>
                      <li>Report household composition changes</li>
                      <li>Schedule and attend recertification interview</li>
                      <li><strong>Deadline:</strong> Must complete within 30 days of notice</li>
                    </ul>

                    <h4 style={{ marginTop: '20px' }}>Interim Recertifications</h4>
                    <p>Report these changes within 10 days:</p>
                    <ul>
                      <li>Household member moves in or out</li>
                      <li>Income increase of ¤200+ per month</li>
                      <li>Change in employment status</li>
                      <li>Birth or adoption of child</li>
                    </ul>

                    <p style={{ marginTop: '12px' }}><em>Note: Income decreases can be reported anytime to request rent reduction.</em></p>

                    <h4 style={{ marginTop: '20px' }}>Lease Violations</h4>
                    <p>Common lease violations include:</p>
                    <ul>
                      <li>Non-payment of rent</li>
                      <li>Unauthorized occupants</li>
                      <li>Pet violations</li>
                      <li>Noise complaints (3+ substantiated complaints)</li>
                      <li>Failure to recertify</li>
                    </ul>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Unit Transfers</h3>
                  </div>
                  <div className="content-text">
                    <p>You may request a transfer to another unit if:</p>
                    <ul>
                      <li>Unit is wrong size (overcrowded or too large)</li>
                      <li>Medical necessity (accessibility needs)</li>
                      <li>Domestic violence or safety concerns</li>
                      <li>Employment relocation within Praya</li>
                    </ul>
                    <p style={{ marginTop: '12px' }}>Transfer requests are approved based on availability and priority. Contact your property manager for transfer application.</p>
                  </div>
                </div>
              </>
            )}
          </div>

          <aside className="sidebar">
            <div className="info-box">
              <h4>Contact Information</h4>
              <p><strong>Office Hours:</strong><br/>Mon-Fri: 8:00 AM - 5:00 PM</p>
              <p><strong>Phone:</strong><br/>1-800-HOUSE-PY</p>
              <p><strong>Emergency:</strong><br/>1-800-HOUSE-PY (24/7)</p>
              <p><strong>Email:</strong><br/>tenants@housing.gov.py</p>
            </div>

            <div className="card">
              <h4 className="card-title">Tenant Portal</h4>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '12px', padding: '0 16px 16px' }}>
                <p style={{ marginBottom: '12px' }}>Access your tenant portal to:</p>
                <ul style={{ marginBottom: '16px' }}>
                  <li>Pay rent online</li>
                  <li>Submit maintenance requests</li>
                  <li>View lease documents</li>
                  <li>Update contact information</li>
                  <li>Check account balance</li>
                </ul>
                <button className="btn btn-primary" style={{ width: '100%', fontSize: '13px' }}>
                  Login to Portal
                </button>
              </div>
            </div>

            <div className="card">
              <h4 className="card-title">File a Grievance</h4>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '12px', padding: '0 16px 16px' }}>
                <p>If you disagree with a Housing Authority decision, you have the right to file a grievance.</p>
                <p style={{ marginTop: '8px', fontWeight: '500' }}>Grievance types:</p>
                <ul style={{ margin: '8px 0' }}>
                  <li>Rent calculations</li>
                  <li>Lease terminations</li>
                  <li>Unit transfers</li>
                  <li>Maintenance issues</li>
                </ul>
                <p style={{ marginTop: '8px' }}><strong>Deadline:</strong> 14 days from notice</p>
              </div>
            </div>

            <div className="info-box">
              <h4>Helpful Resources</h4>
              <ul style={{ fontSize: '13px', margin: '12px 0' }}>
                <li><Link to="/housing/applications">Apply for Housing</Link></li>
                <li><a href="#">Tenant Handbook (PDF)</a></li>
                <li><a href="#">Community Rules</a></li>
                <li><a href="#">Fair Housing Info</a></li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}

function LandlordResources() {
  const [programType, setProgramType] = React.useState('voucher');

  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/housing">Home</Link> / Landlord Resources
          </div>
          <h1>Landlord Resources</h1>
          <p className="subtitle">Information for property owners participating in housing assistance programs</p>
        </div>
      </div>
      <div className="container">
        <div className="content-grid">
          <div className="main-content">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Program Selection</h3>
              </div>
              <div style={{ display: 'flex', gap: '12px', padding: '0 20px 20px' }}>
                <button
                  onClick={() => setProgramType('voucher')}
                  className={programType === 'voucher' ? 'btn btn-primary' : 'btn btn-secondary'}
                  style={{ flex: 1, fontSize: '13px' }}
                >
                  Voucher Program
                </button>
                <button
                  onClick={() => setProgramType('public')}
                  className={programType === 'public' ? 'btn btn-primary' : 'btn btn-secondary'}
                  style={{ flex: 1, fontSize: '13px' }}
                >
                  Public Housing
                </button>
              </div>
            </div>

            {programType === 'voucher' && (
              <>
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Housing Choice Voucher Program</h3>
                  </div>
                  <div className="content-text">
                    <h4>Program Overview</h4>
                    <p>The Housing Choice Voucher Program (Section 8) allows low-income families to rent privately-owned properties. The Housing Authority pays a portion of the rent directly to the landlord, and the tenant pays the remainder.</p>

                    <h4 style={{ marginTop: '20px' }}>Benefits for Landlords</h4>
                    <ul>
                      <li><strong>Guaranteed Rent</strong> - Housing Authority portion paid directly and on time</li>
                      <li><strong>Steady Tenants</strong> - Families seeking stable, long-term housing</li>
                      <li><strong>Damage Claims</strong> - File claims for damages beyond security deposit</li>
                      <li><strong>Support Services</strong> - Mediation and support from Housing Authority staff</li>
                      <li><strong>No Special Licenses</strong> - No additional licensing required</li>
                    </ul>

                    <h4 style={{ marginTop: '20px' }}>Landlord Responsibilities</h4>
                    <ul>
                      <li>Execute a Housing Assistance Payment (HAP) contract</li>
                      <li>Maintain property to Housing Quality Standards (HQS)</li>
                      <li>Allow annual HQS inspections</li>
                      <li>Rent cannot exceed Fair Market Rent (FMR) limits</li>
                      <li>Provide same lease terms as for non-subsidized tenants</li>
                      <li>Cannot discriminate based on voucher status</li>
                    </ul>

                    <h4 style={{ marginTop: '20px' }}>Payment Process</h4>
                    <ol>
                      <li>Tenant finds your property and applies</li>
                      <li>You and tenant negotiate rent (must be reasonable)</li>
                      <li>Housing Authority inspects unit (HQS inspection)</li>
                      <li>You sign HAP contract with Housing Authority</li>
                      <li>Tenant signs lease with you</li>
                      <li>Housing Authority pays its share directly to you monthly</li>
                      <li>Tenant pays their portion to you monthly</li>
                    </ol>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Rent Limits & Payment Amounts</h3>
                  </div>
                  <div className="content-text">
                    <h4>Fair Market Rent (FMR) Limits</h4>
                    <p>Maximum allowable rents for voucher program:</p>
                    <ul>
                      <li><strong>Studio:</strong> ¤950/month</li>
                      <li><strong>1-Bedroom:</strong> ¤1,100/month</li>
                      <li><strong>2-Bedroom:</strong> ¤1,400/month</li>
                      <li><strong>3-Bedroom:</strong> ¤1,850/month</li>
                      <li><strong>4-Bedroom:</strong> ¤2,200/month</li>
                    </ul>

                    <h4 style={{ marginTop: '20px' }}>Payment Split Example</h4>
                    <p>For a 2-bedroom apartment renting at ¤1,200/month:</p>
                    <ul>
                      <li>Tenant's income: ¤2,000/month</li>
                      <li>Tenant pays: ¤600 (30% of income)</li>
                      <li>Housing Authority pays: ¤600</li>
                      <li>Total rent to landlord: ¤1,200</li>
                    </ul>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Housing Quality Standards (HQS)</h3>
                  </div>
                  <div className="content-text">
                    <p>All units must meet these minimum standards:</p>

                    <h4>Sanitary Facilities</h4>
                    <ul>
                      <li>Working flush toilet in private bathroom</li>
                      <li>Fixed basin with hot and cold running water</li>
                      <li>Bathtub or shower with hot and cold running water</li>
                    </ul>

                    <h4 style={{ marginTop: '16px' }}>Food Preparation</h4>
                    <ul>
                      <li>Cooking stove or range with oven</li>
                      <li>Refrigerator</li>
                      <li>Kitchen sink with hot and cold running water</li>
                    </ul>

                    <h4 style={{ marginTop: '16px' }}>Space & Security</h4>
                    <ul>
                      <li>At least one bedroom per 2 persons</li>
                      <li>Living room separate from sleeping areas (except studios)</li>
                      <li>Lockable doors and windows</li>
                      <li>Working smoke detectors in each bedroom and common areas</li>
                      <li>Carbon monoxide detectors (if gas/fuel heat)</li>
                    </ul>

                    <h4 style={{ marginTop: '16px' }}>Heating/Cooling</h4>
                    <ul>
                      <li>Adequate heating system (maintain 68°F in winter)</li>
                      <li>Proper ventilation</li>
                    </ul>

                    <h4 style={{ marginTop: '16px' }}>Structure & Materials</h4>
                    <ul>
                      <li>No holes in walls, floors, or ceilings</li>
                      <li>No peeling paint in units built before 1978</li>
                      <li>Structurally sound roof, stairs, railings</li>
                      <li>No evidence of rodents or vermin</li>
                    </ul>
                  </div>
                </div>
              </>
            )}

            {programType === 'public' && (
              <>
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Property Management Opportunities</h3>
                  </div>
                  <div className="content-text">
                    <h4>Managing Public Housing Properties</h4>
                    <p>The Housing Authority contracts with private property management companies to manage public housing units. This is a competitive procurement process.</p>

                    <h4 style={{ marginTop: '20px' }}>Management Responsibilities</h4>
                    <ul>
                      <li>Tenant screening and lease-up</li>
                      <li>Rent collection and accounting</li>
                      <li>Maintenance and repairs coordination</li>
                      <li>Property inspections (unit and grounds)</li>
                      <li>Lease enforcement and eviction proceedings</li>
                      <li>Recertification processing</li>
                      <li>Budget management and reporting</li>
                    </ul>

                    <h4 style={{ marginTop: '20px' }}>Qualifications</h4>
                    <ul>
                      <li>Licensed property management company in Praya</li>
                      <li>Minimum 3 years experience managing affordable housing</li>
                      <li>Staff with relevant certifications (CPM, ARM, etc.)</li>
                      <li>Experience with HUD regulations and compliance</li>
                      <li>Proven track record with similar-size portfolios</li>
                      <li>Financial stability and adequate insurance</li>
                    </ul>

                    <h4 style={{ marginTop: '20px' }}>Current Opportunities</h4>
                    <p>The Housing Authority periodically issues Requests for Proposals (RFPs) for property management services. Check our procurement page or contact us to be added to our mailing list.</p>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Development Opportunities</h3>
                  </div>
                  <div className="content-text">
                    <h4>Affordable Housing Development</h4>
                    <p>The Housing Authority partners with developers to create new affordable housing units through various programs:</p>

                    <h4 style={{ marginTop: '20px' }}>Low-Income Housing Tax Credit (LIHTC)</h4>
                    <ul>
                      <li>Federal tax credits for developing affordable rental housing</li>
                      <li>Units must remain affordable for 15-30 years</li>
                      <li>Annual competitive application process</li>
                      <li>Requires at least 20% of units at 50% AMI or 40% at 60% AMI</li>
                    </ul>

                    <h4 style={{ marginTop: '20px' }}>Project-Based Vouchers</h4>
                    <ul>
                      <li>Housing Authority commits vouchers to specific units</li>
                      <li>Guaranteed rental income for assisted units</li>
                      <li>Developer provides affordable housing for 15+ years</li>
                      <li>Can combine with other financing (LIHTC, bonds, etc.)</li>
                    </ul>

                    <h4 style={{ marginTop: '20px' }}>RAD (Rental Assistance Demonstration)</h4>
                    <ul>
                      <li>Convert public housing to project-based Section 8</li>
                      <li>Allows for private financing and renovation</li>
                      <li>Long-term contracts (15-20 years)</li>
                    </ul>
                  </div>
                </div>
              </>
            )}

            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Inspections & Compliance</h3>
              </div>
              <div className="content-text">
                <h4>Inspection Schedule</h4>
                <ul>
                  <li><strong>Initial Inspection:</strong> Before HAP contract execution</li>
                  <li><strong>Annual Inspection:</strong> Once per year on each unit</li>
                  <li><strong>Special Inspections:</strong> As needed for tenant complaints</li>
                  <li><strong>Quality Control:</strong> Random inspections by Housing Authority</li>
                </ul>

                <h4 style={{ marginTop: '20px' }}>Failed Inspection Process</h4>
                <ol>
                  <li>Receive inspection report listing deficiencies</li>
                  <li>Complete repairs within 30 days (or 24 hours for life-threatening issues)</li>
                  <li>Request re-inspection when repairs are complete</li>
                  <li>If not repaired: HAP payments may be suspended</li>
                  <li>Continued non-compliance: Contract termination</li>
                </ol>

                <h4 style={{ marginTop: '20px' }}>Common Inspection Failures</h4>
                <ul>
                  <li>Non-functioning smoke detectors</li>
                  <li>Water leaks or moisture damage</li>
                  <li>Inadequate heating or cooling</li>
                  <li>Electrical hazards</li>
                  <li>Pest infestation</li>
                  <li>Peeling paint (pre-1978 buildings)</li>
                  <li>Broken windows or locks</li>
                </ul>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Terminating Tenancy</h3>
              </div>
              <div className="content-text">
                <h4>Grounds for Termination</h4>
                <ul>
                  <li>Non-payment of tenant's portion of rent</li>
                  <li>Lease violations (pets, unauthorized occupants, etc.)</li>
                  <li>Criminal activity on the property</li>
                  <li>Damage to the unit beyond normal wear</li>
                </ul>

                <h4 style={{ marginTop: '20px' }}>Termination Process</h4>
                <ol>
                  <li>Provide written notice to tenant (30 days for most violations)</li>
                  <li>Send copy of notice to Housing Authority</li>
                  <li>If tenant doesn't cure: File eviction action in court</li>
                  <li>Attend court hearing</li>
                  <li>If you prevail: HAP contract terminates with lease</li>
                </ol>

                <p style={{ marginTop: '16px' }}><strong>Important:</strong> You cannot terminate voucher tenancy for "no cause" or "owner move-in" during the initial lease term. After initial term, you may decline to renew for any legitimate reason.</p>
              </div>
            </div>
          </div>

          <aside className="sidebar">
            <div className="card">
              <h4 className="card-title">Get Started</h4>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '12px', padding: '0 16px 16px' }}>
                <p style={{ marginBottom: '12px' }}>Ready to participate in housing programs?</p>
                <button className="btn btn-primary" style={{ width: '100%', marginBottom: '8px', fontSize: '13px' }}>
                  Register Property
                </button>
                <button className="btn btn-secondary" style={{ width: '100%', fontSize: '13px' }}>
                  Download Landlord Packet
                </button>
              </div>
            </div>

            <div className="info-box">
              <h4>Landlord Support</h4>
              <p><strong>Phone:</strong><br/>1-800-HOUSE-PY</p>
              <p><strong>Email:</strong><br/>landlords@housing.gov.py</p>
              <p><strong>Office Hours:</strong><br/>Mon-Fri 8:00 AM - 5:00 PM</p>
            </div>

            <div className="card">
              <h4 className="card-title">Payment Information</h4>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '12px', padding: '0 16px 16px' }}>
                <p><strong>Payment Schedule:</strong></p>
                <p style={{ margin: '8px 0' }}>HAP payments are made on the 1st of each month via direct deposit.</p>
                <p style={{ marginTop: '12px' }}><strong>Setup Required:</strong></p>
                <ul style={{ margin: '8px 0' }}>
                  <li>W-9 form</li>
                  <li>Direct deposit authorization</li>
                  <li>Bank account information</li>
                </ul>
              </div>
            </div>

            <div className="card">
              <h4 className="card-title">Landlord Portal</h4>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '12px', padding: '0 16px 16px' }}>
                <p style={{ marginBottom: '12px' }}>Access the portal to:</p>
                <ul style={{ marginBottom: '16px' }}>
                  <li>View payment history</li>
                  <li>Submit inspection corrections</li>
                  <li>Update property information</li>
                  <li>Access forms and documents</li>
                  <li>File damage claims</li>
                </ul>
                <button className="btn btn-primary" style={{ width: '100%', fontSize: '13px' }}>
                  Login to Portal
                </button>
              </div>
            </div>

            <div className="info-box">
              <h4>Helpful Resources</h4>
              <ul style={{ fontSize: '13px', margin: '12px 0' }}>
                <li><a href="#">HQS Inspection Checklist</a></li>
                <li><a href="#">HAP Contract Template</a></li>
                <li><a href="#">Landlord Handbook (PDF)</a></li>
                <li><a href="#">Fair Market Rent Chart</a></li>
                <li><a href="#">Damage Claim Form</a></li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
