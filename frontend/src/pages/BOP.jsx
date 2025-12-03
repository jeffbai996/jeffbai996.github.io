import React, { useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import './Department.css'

export default function BOP() {
  const navigate = useNavigate()

  useEffect(() => {
    document.body.classList.add('theme-bop')
    return () => document.body.classList.remove('theme-bop')
  }, [])

  return (
    <>
      <header className="dept-header">
        <div className="container">
          <Link to="/bop" className="dept-logo">
            <div className="logo-mark">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                <line x1="1" y1="10" x2="23" y2="10"/>
              </svg>
            </div>
            <div className="logo-text">
              <h1>Bank of Praya</h1>
              <span className="tagline">Republic of Praya</span>
            </div>
          </Link>
          <nav className="nav">
            <Link to="/bop" className="nav-link">Home</Link>
            <Link to="/bop/accounts" className="nav-link">Accounts</Link>
            <Link to="/bop/loans" className="nav-link">Loans</Link>
            <Link to="/bop/services" className="nav-link">Services</Link>
          </nav>
        </div>
      </header>

      <Routes>
        <Route index element={<BOPHome navigate={navigate} />} />
        <Route path="accounts" element={<Accounts />} />
        <Route path="loans" element={<ComingSoon title="Loans & Mortgages" />} />
        <Route path="services" element={<ComingSoon title="Banking Services" />} />
      </Routes>

      <footer className="dept-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <h4>Bank of Praya</h4>
              <p>The central bank of the Republic of Praya, serving citizens and businesses with secure, reliable banking services.</p>
            </div>
            <div className="footer-section">
              <h5>Services</h5>
              <ul>
                <li><Link to="/bop/accounts">Open Account</Link></li>
                <li><Link to="/bop/loans">Apply for Loan</Link></li>
                <li><a href="#">Online Banking</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5>Resources</h5>
              <ul>
                <li><a href="#">Branch Locator</a></li>
                <li><a href="#">Rates & Fees</a></li>
                <li><a href="#">Financial Education</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5>Government</h5>
              <ul>
                <li><Link to="/">Gov Portal</Link></li>
                <li><a href="#">Monetary Policy</a></li>
                <li><a href="#">Economic Reports</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>&copy; 2024 Republic of Praya. Bank of Praya.</span>
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

function BOPHome({ navigate }) {
  return (
    <>
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-bg-shape"></div>
          <div className="hero-bg-shape"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <h2>Banking for <span>Everyone</span></h2>
            <p>The Bank of Praya provides secure banking services, competitive rates, and financial stability for all citizens and businesses of the Republic.</p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => navigate('/bop/accounts')}>
                Open an Account
              </button>
              <button className="btn btn-secondary" onClick={() => navigate('/bop/loans')}>
                Apply for Loan
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Total Assets</span>
              <span className="stat-value">¤284B</span>
              <span className="stat-change">+8% YoY</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Account Holders</span>
              <span className="stat-value">2.4M</span>
              <span className="stat-change">Citizens</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Savings Rate</span>
              <span className="stat-value">3.2%</span>
              <span className="stat-change">APY</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Branches</span>
              <span className="stat-value">184</span>
              <span className="stat-change">Nationwide</span>
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
                  <h3 className="card-title">Account Types</h3>
                  <Link to="/bop/accounts" className="card-link">View All</Link>
                </div>
                <div className="content-text">
                  <h4>Personal Banking</h4>
                  <ul>
                    <li><strong>Savings Account</strong> - 3.2% APY, no monthly fees, online/mobile banking</li>
                    <li><strong>Checking Account</strong> - Free debit card, unlimited transactions, bill pay</li>
                    <li><strong>Youth Account</strong> - For ages 13-17, financial literacy included</li>
                  </ul>
                  <h4 style={{ marginTop: '20px' }}>Business Banking</h4>
                  <ul>
                    <li><strong>Business Checking</strong> - Tailored for small businesses and startups</li>
                    <li><strong>Corporate Accounts</strong> - Enterprise solutions with dedicated support</li>
                  </ul>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Latest Updates</h3>
                </div>
                <div className="news-item">
                  <span className="news-date">Nov 25, 2024</span>
                  <h4 className="news-title">Interest Rate Adjustment</h4>
                  <p className="news-excerpt">Savings account rates increased to 3.2% APY effective December 1.</p>
                </div>
                <div className="news-item">
                  <span className="news-date">Nov 18, 2024</span>
                  <h4 className="news-title">New Mobile Banking Features</h4>
                  <p className="news-excerpt">Enhanced mobile app with instant transfers and budget tracking tools.</p>
                </div>
              </div>
            </div>

            <aside className="sidebar">
              <div className="card" style={{ background: 'linear-gradient(135deg, #059669 0%, #047857 100%)', color: 'white', border: 'none' }}>
                <h4 style={{ color: 'white', marginBottom: '8px' }}>Current Rates</h4>
                <div style={{ fontSize: '32px', fontWeight: '800', marginBottom: '4px' }}>3.2%</div>
                <div style={{ fontSize: '13px', opacity: 0.9 }}>Savings APY</div>
                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '13px' }}>Mortgage</span>
                    <span style={{ fontSize: '13px', fontWeight: '600' }}>4.5%</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '13px' }}>Personal Loan</span>
                    <span style={{ fontSize: '13px', fontWeight: '600' }}>6.2%</span>
                  </div>
                </div>
              </div>

              <div className="card">
                <h4 className="card-title">Quick Services</h4>
                <div className="quick-link" onClick={() => navigate('/bop/accounts')}>
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </span>
                  Open Account
                </div>
                <div className="quick-link" onClick={() => navigate('/bop/loans')}>
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 9h18v10a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                      <path d="M3 9V7a2 2 0 012-2h14a2 2 0 012 2v2"/>
                    </svg>
                  </span>
                  Apply for Loan
                </div>
                <div className="quick-link">
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"/>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                  </span>
                  Find Branch
                </div>
                <div className="quick-link">
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                      <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
                    </svg>
                  </span>
                  Online Banking
                </div>
              </div>

              <div className="info-box">
                <h4>Need Assistance?</h4>
                <p>Visit any BOP branch or contact customer service for personalized banking support.</p>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  )
}

function Accounts() {
  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/bop">Home</Link> / Accounts
          </div>
          <h1>Bank Accounts</h1>
          <p className="subtitle">Choose the right account for your needs</p>
        </div>
      </div>
      <div className="container">
        <div className="content-text">
          <h3>Personal Accounts</h3>

          <div className="card" style={{ marginTop: '20px' }}>
            <h4 className="card-title">Savings Account</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Earn competitive interest on your deposits with our high-yield savings account.</p>
            <ul style={{ marginBottom: '12px' }}>
              <li>3.2% APY (Annual Percentage Yield)</li>
              <li>No monthly maintenance fees</li>
              <li>Minimum opening deposit: ¤100</li>
              <li>Online and mobile banking included</li>
              <li>FDIC insured up to ¤250,000</li>
            </ul>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Best for:</strong> Building emergency funds, saving for goals
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Checking Account</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Full-featured checking with unlimited transactions and free debit card.</p>
            <ul style={{ marginBottom: '12px' }}>
              <li>Free debit card with chip & PIN</li>
              <li>Unlimited check writing and transactions</li>
              <li>Online bill pay included</li>
              <li>Minimum opening deposit: ¤50</li>
              <li>Overdraft protection available</li>
            </ul>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Best for:</strong> Daily transactions, bill payments
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Joint Account</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Share account access with a partner or family member.</p>
            <ul style={{ marginBottom: '12px' }}>
              <li>Available for savings or checking</li>
              <li>Equal access for all account holders</li>
              <li>Combined FDIC insurance coverage</li>
              <li>Both parties must be present to open</li>
            </ul>
          </div>

          <h3 style={{ marginTop: '32px' }}>Business Accounts</h3>

          <div className="card">
            <h4 className="card-title">Business Checking</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Designed for small businesses and startups.</p>
            <ul>
              <li>500 free transactions per month</li>
              <li>Mobile deposit for business checks</li>
              <li>Integration with accounting software</li>
              <li>Business debit card included</li>
            </ul>
          </div>

          <h3 style={{ marginTop: '32px' }}>How to Open</h3>
          <p>To open any account, you'll need:</p>
          <ul>
            <li>Valid National ID or Passport</li>
            <li>Proof of address (utility bill, lease agreement)</li>
            <li>Tax ID or Social Security Number</li>
            <li>Minimum opening deposit</li>
          </ul>

          <div className="info-box" style={{ marginTop: '24px' }}>
            <h4>Ready to Open?</h4>
            <p>Visit any Bank of Praya branch or start your application through our online portal. Account approval typically takes 1-2 business days.</p>
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
      case 'Loans & Mortgages':
        return {
          description: 'Competitive rates for home mortgages, personal loans, and business financing.',
          services: ['Home Mortgages (4.5% APR)', 'Personal Loans', 'Business Loans', 'Auto Financing'],
          contact: 'Schedule an appointment: 1-800-BOP-LOAN or visit any branch'
        };
      case 'Banking Services':
        return {
          description: 'Comprehensive banking services including investments, insurance, and wealth management.',
          services: ['Investment Accounts', 'Retirement Planning', 'Insurance Products', 'Wire Transfers'],
          contact: 'Customer service: Available at all branches during business hours'
        };
      default:
        return {
          description: 'This service is being developed to serve you better.',
          services: [],
          contact: 'For assistance, contact Bank of Praya customer service'
        };
    }
  };

  const info = getServiceInfo();

  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/bop">Home</Link> / {title}
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
              background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.1) 0%, rgba(5, 150, 105, 0.2) 100%)',
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
              We're working to bring this service online. In the meantime, visit any branch for assistance.
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
              background: 'rgba(5, 150, 105, 0.05)',
              borderRadius: '10px',
              fontSize: '13px',
              color: 'var(--text-muted)'
            }}>
              {info.contact}
            </div>

            <div style={{ marginTop: '32px' }}>
              <button
                onClick={() => navigate('/bop')}
                className="btn btn-primary"
                style={{ fontSize: '13px', padding: '14px 24px' }}
              >
                Return to BOP Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
