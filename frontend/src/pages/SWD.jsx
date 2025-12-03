import React, { useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import './Department.css'

export default function SWD() {
  const navigate = useNavigate()

  useEffect(() => {
    document.body.classList.add('theme-swd')
    return () => document.body.classList.remove('theme-swd')
  }, [])

  return (
    <>
      <header className="dept-header">
        <div className="container">
          <Link to="/swd" className="dept-logo">
            <div className="logo-mark">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </div>
            <div className="logo-text">
              <h1>Social Welfare Department</h1>
              <span className="tagline">Republic of Praya</span>
            </div>
          </Link>
          <nav className="nav">
            <Link to="/swd" className="nav-link">Home</Link>
            <Link to="/swd/benefits" className="nav-link">Benefits</Link>
            <Link to="/swd/family" className="nav-link">Family Services</Link>
            <Link to="/swd/elderly" className="nav-link">Elderly Care</Link>
            <Link to="/swd/services" className="nav-link">Services</Link>
          </nav>
        </div>
      </header>

      <Routes>
        <Route index element={<SWDHome navigate={navigate} />} />
        <Route path="benefits" element={<SWDBenefits />} />
        <Route path="family" element={<ComingSoon title="Family Services" />} />
        <Route path="elderly" element={<ComingSoon title="Elderly Care" />} />
        <Route path="services" element={<ComingSoon title="Online Services" />} />
      </Routes>

      <footer className="dept-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <h4>Social Welfare Department</h4>
              <p>Supporting vulnerable citizens and strengthening families across the Republic of Praya.</p>
            </div>
            <div className="footer-section">
              <h5>Services</h5>
              <ul>
                <li><Link to="/swd/benefits">Social Benefits</Link></li>
                <li><Link to="/swd/family">Family Services</Link></li>
                <li><Link to="/swd/elderly">Elderly Care</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5>Resources</h5>
              <ul>
                <li><a href="#">Eligibility Calculator</a></li>
                <li><a href="#">Application Forms</a></li>
                <li><a href="#">Support Directory</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5>Government</h5>
              <ul>
                <li><Link to="/">Gov Portal</Link></li>
                <li><a href="/pages/Health_Praya.html">Health Dept.</a></li>
                <li><a href="/pages/Housing_Authority_Praya.html">Housing Authority</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>&copy; 2024 Republic of Praya. Social Welfare Department.</span>
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

function SWDHome({ navigate }) {
  return (
    <>
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-bg-shape"></div>
          <div className="hero-bg-shape"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <h2>Caring for <span>Every Citizen</span></h2>
            <p>The Social Welfare Department provides essential support services, financial assistance, and care programs for families, children, elderly, and vulnerable citizens of the Republic of Praya.</p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => navigate('/swd/benefits')}>
                Apply for Benefits
              </button>
              <button className="btn btn-secondary" onClick={() => navigate('/swd/services')}>
                Find Services
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Citizens Assisted</span>
              <span className="stat-value">342,891</span>
              <span className="stat-change">FY 2024</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Benefits Distributed</span>
              <span className="stat-value">¤1.2B</span>
              <span className="stat-change">Annual</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Service Centers</span>
              <span className="stat-value">87</span>
              <span className="stat-change">Nationwide</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Case Workers</span>
              <span className="stat-value">2,340</span>
              <span className="stat-change">Active Staff</span>
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
                  <h3 className="card-title">Assistance Programs</h3>
                  <Link to="/swd/benefits" className="card-link">View All</Link>
                </div>
                <div className="content-text">
                  <p>The Department offers various support programs for eligible citizens:</p>
                  <ul>
                    <li><strong>Financial Assistance</strong> - Monthly payments for low-income families and individuals</li>
                    <li><strong>Child Welfare</strong> - Foster care, adoption services, and child protection</li>
                    <li><strong>Elderly Support</strong> - Home care, day centers, and pension supplements</li>
                    <li><strong>Disability Services</strong> - Support allowances and accessibility programs</li>
                  </ul>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Recent Announcements</h3>
                </div>
                <div className="news-item">
                  <span className="news-date">Nov 30, 2024</span>
                  <h4 className="news-title">Winter Heating Allowance Applications Open</h4>
                  <p className="news-excerpt">Eligible households can now apply for the annual winter heating subsidy of up to ¤500.</p>
                </div>
                <div className="news-item">
                  <span className="news-date">Nov 22, 2024</span>
                  <h4 className="news-title">Expanded Childcare Support Program</h4>
                  <p className="news-excerpt">New subsidy covers up to 80% of childcare costs for qualifying working families.</p>
                </div>
              </div>
            </div>

            <aside className="sidebar">
              <div className="card">
                <h4 className="card-title">Quick Services</h4>
                <div className="quick-link" onClick={() => navigate('/swd/benefits')}>
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                      <polyline points="14,2 14,8 20,8"/>
                      <line x1="12" y1="18" x2="12" y2="12"/>
                      <line x1="9" y1="15" x2="15" y2="15"/>
                    </svg>
                  </span>
                  Apply for Benefits
                </div>
                <div className="quick-link" onClick={() => navigate('/swd/services')}>
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"/>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                  </span>
                  Check Eligibility
                </div>
                <div className="quick-link" onClick={() => navigate('/swd/family')}>
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                  </span>
                  Family Support
                </div>
                <div className="quick-link" onClick={() => navigate('/swd/elderly')}>
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78"/>
                    </svg>
                  </span>
                  Elderly Services
                </div>
              </div>

              <div className="info-box">
                <h4>Need Immediate Help?</h4>
                <p>Call our 24/7 helpline at 1-800-PRAYA-HELP for emergency assistance and crisis support.</p>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  )
}

function SWDBenefits() {
  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/swd">Home</Link> / Benefits
          </div>
          <h1>Social Benefits</h1>
          <p className="subtitle">Financial assistance and support programs for eligible citizens</p>
        </div>
      </div>
      <div className="container">
        <div className="content-text">
          <h3>Benefit Programs</h3>
          <p>Explore our range of support programs designed to help Prayan citizens:</p>

          <div className="card" style={{ marginTop: '20px' }}>
            <h4 className="card-title">Comprehensive Social Assistance (CSA)</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Monthly financial support for individuals and families below the poverty threshold. Includes food, shelter, and basic needs allowance.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Amount:</strong> Up to ¤1,200/month | <strong>Eligibility:</strong> Income below ¤18,000/year
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Child Benefit Allowance</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Monthly payment for each dependent child under 18 years. Additional supplements for children with disabilities or special needs.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Amount:</strong> ¤150-300/child/month | <strong>Eligibility:</strong> All resident families
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Old Age Pension Supplement</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Additional support for seniors aged 65+ whose retirement income falls below the living standard threshold.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Amount:</strong> Up to ¤600/month | <strong>Eligibility:</strong> Seniors with low pension income
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Disability Support Allowance</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Financial assistance for citizens with permanent disabilities, covering care needs, equipment, and living expenses.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Amount:</strong> ¤400-800/month | <strong>Eligibility:</strong> Certified disability assessment
            </div>
          </div>

          <h3>How to Apply</h3>
          <ul>
            <li>Complete the online application or visit your local service center</li>
            <li>Provide proof of identity and residency</li>
            <li>Submit income verification documents</li>
            <li>Schedule an assessment interview if required</li>
            <li>Receive decision within 15 business days</li>
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
      case 'Family Services':
        return {
          description: 'Support programs for families, including child protection, foster care, and family counseling.',
          services: ['Child Protection Services', 'Foster Care Programs', 'Family Counseling', 'Adoption Services'],
          contact: 'For family service inquiries, contact 1-800-PRAYA-FAMILY'
        };
      case 'Elderly Care':
        return {
          description: 'Comprehensive care services for senior citizens, including home care and day centers.',
          services: ['Home Care Services', 'Day Care Centers', 'Meals on Wheels', 'Senior Activity Programs'],
          contact: 'Elderly services hotline: 1-800-PRAYA-SENIOR'
        };
      case 'Online Services':
        return {
          description: 'Digital services for benefit applications, status tracking, and appointment scheduling.',
          services: ['Online Applications', 'Benefit Status Check', 'Document Upload', 'Appointment Booking'],
          contact: 'Technical support: 1-800-PRAYA-HELP or support@swd.gov.py'
        };
      default:
        return {
          description: 'This service is being developed to better serve citizens in need.',
          services: [],
          contact: 'For assistance, contact the Social Welfare Department at info@swd.gov.py'
        };
    }
  };

  const info = getServiceInfo();

  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/swd">Home</Link> / {title}
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
              background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(236, 72, 153, 0.2) 100%)',
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
              background: 'rgba(236, 72, 153, 0.05)',
              borderRadius: '10px',
              fontSize: '13px',
              color: 'var(--text-muted)'
            }}>
              {info.contact}
            </div>

            <div style={{ marginTop: '32px' }}>
              <h4 style={{ fontSize: '14px', marginBottom: '12px' }}>Related Services</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                <Link to="/swd/benefits" style={{
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
                  Social Benefits
                </Link>
                <button
                  onClick={() => navigate('/swd')}
                  className="btn btn-secondary"
                  style={{ fontSize: '13px', padding: '14px' }}
                >
                  Return to SWD Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
