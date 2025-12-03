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
        <Route path="tenants" element={<ComingSoon title="Tenant Resources" />} />
        <Route path="landlords" element={<ComingSoon title="Landlord Resources" />} />
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
                <li><a href="#">Rental Assistance</a></li>
                <li><a href="#">Housing Vouchers</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5>Resources</h5>
              <ul>
                <li><a href="#">Tenant Rights</a></li>
                <li><a href="#">Fair Housing</a></li>
                <li><a href="#">Property Listings</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5>Government</h5>
              <ul>
                <li><Link to="/">Gov Portal</Link></li>
                <li><a href="#">Housing Policy</a></li>
                <li><a href="#">Development Projects</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>&copy; 2024 Republic of Praya. Housing Authority.</span>
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

function HousingHome({ navigate }) {
  return (
    <>
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-bg-shape"></div>
          <div className="hero-bg-shape"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <h2>Housing for <span>Everyone</span></h2>
            <p>The Housing Authority provides affordable housing programs, rental assistance, and tenant support services to ensure every resident has access to safe, quality housing.</p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => navigate('/housing/applications')}>
                Apply for Housing
              </button>
              <button className="btn btn-secondary" onClick={() => navigate('/housing/tenants')}>
                Tenant Resources
              </button>
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
    </>
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

function ComingSoon({ title }) {
  const navigate = useNavigate();

  const getServiceInfo = () => {
    switch(title) {
      case 'Tenant Resources':
        return {
          description: 'Information and resources for public housing and voucher program tenants.',
          services: ['Tenant Rights & Responsibilities', 'Rent Payment Portal', 'Maintenance Requests', 'Lease Renewals'],
          contact: 'For tenant services: Call 1-800-HOUSE-PY or visit your property management office'
        };
      case 'Landlord Resources':
        return {
          description: 'Information for property owners interested in participating in housing programs.',
          services: ['Landlord Portal', 'Program Requirements', 'Inspection Schedules', 'Payment Information'],
          contact: 'For landlord inquiries: landlords@housing.gov.py or call 1-800-HOUSE-PY'
        };
      default:
        return {
          description: 'This service is being developed to serve you better.',
          services: [],
          contact: 'For assistance, contact the Housing Authority'
        };
    }
  };

  const info = getServiceInfo();

  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/housing">Home</Link> / {title}
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
                <Link to="/housing/applications" style={{
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
                  Housing Applications
                </Link>
                <button
                  onClick={() => navigate('/housing')}
                  className="btn btn-secondary"
                  style={{ fontSize: '13px', padding: '14px' }}
                >
                  Return to Housing Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
