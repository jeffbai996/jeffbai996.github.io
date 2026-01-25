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
              <span className="tagline">Central Bank of the Republic of Praya</span>
            </div>
          </Link>
          <nav className="nav">
            <Link to="/bop" className="nav-link">Home</Link>
            <Link to="/bop/accounts" className="nav-link">Accounts</Link>
            <Link to="/bop/loans" className="nav-link">Loans</Link>
            <Link to="/bop/services" className="nav-link">Services</Link>
            <Link to="/bop/my-account" className="nav-link">My Account</Link>
          </nav>
        </div>
      </header>

      <Routes>
        <Route index element={<BOPHome navigate={navigate} />} />
        <Route path="accounts" element={<Accounts />} />
        <Route path="loans" element={<Loans />} />
        <Route path="services" element={<Services />} />
        <Route path="my-account" element={<MyAccount />} />
      </Routes>

      <footer className="dept-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <h4>Bank of Praya</h4>
              <p>The Central Bank of the Republic of Praya, serving citizens and businesses with secure, reliable banking services. Now featuring integrated Minecraft economy support through the gp-ai Paper plugin.</p>
            </div>
            <div className="footer-section">
              <h5>Services</h5>
              <ul>
                <li><Link to="/bop/my-account">My Account</Link></li>
                <li><Link to="/bop/accounts">Open Account</Link></li>
                <li><Link to="/bop/loans">Apply for Loan</Link></li>
                <li><Link to="/bop/services">Banking Services</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5>Government</h5>
              <ul>
                <li><Link to="/">Gov Portal</Link></li>
                <li><Link to="/pse">Stock Exchange</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>&copy; 2024 Republic of Praya. Bank of Praya.</span>
          </div>
        </div>
      </footer>
    </>
  )
}

function BOPHome({ navigate }) {
  return (
    <div className="layout-financial">
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
              <rect x="2" y="5" width="20" height="14" rx="2"></rect>
              <path d="M2 10h20"></path>
            </svg>
            Central Banking
          </div>
          <h2>Banking for <span>Everyone</span></h2>
          <p>The Central Bank of the Republic of Praya provides secure banking services, competitive rates, and financial stability for all citizens and businesses. Your trusted partner in economic growth, now with integrated Minecraft economy support.</p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => navigate('/bop/my-account')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              Access My Account
            </button>
            <button className="btn btn-secondary" onClick={() => navigate('/bop/accounts')}>
              Open New Account
            </button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="financial-display">
            <div className="display-label">Total Assets</div>
            <div className="display-value">$284B</div>
            <div className="display-stats">
              <div>
                <div className="display-stat-label">Growth (YoY)</div>
                <div className="display-stat-value">+8.2%</div>
              </div>
              <div>
                <div className="display-stat-label">Accounts</div>
                <div className="display-stat-value">2.4M</div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      <section className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Total Assets</span>
              <span className="stat-value">$284B</span>
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

              <div className="card" style={{ background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.1) 0%, rgba(4, 120, 87, 0.05) 100%)', border: '1px solid rgba(5, 150, 105, 0.2)' }}>
                <div className="card-header">
                  <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                      <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
                    </svg>
                    New: Minecraft Economy Integration
                  </h3>
                </div>
                <div className="content-text">
                  <p style={{ marginBottom: '12px' }}>Connect your Bank of Praya account to Minecraft with the gp-ai Paper plugin. Manage your in-game economy seamlessly:</p>
                  <ul style={{ marginBottom: '16px' }}>
                    <li><strong>Real-time Synchronization:</strong> Your account balance syncs between the game and web portal</li>
                    <li><strong>Secure Transactions:</strong> All in-game transactions are encrypted and logged</li>
                    <li><strong>Player Transfers:</strong> Send money to other players instantly</li>
                    <li><strong>Transaction History:</strong> View all your in-game transactions online</li>
                  </ul>
                  <button className="btn btn-primary" onClick={() => navigate('/bop/my-account')} style={{ fontSize: '14px', padding: '10px 20px' }}>
                    Link Your Account
                  </button>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Latest Updates</h3>
                </div>
                <div className="news-item">
                  <span className="news-date">Jan 25, 2026</span>
                  <h4 className="news-title">Minecraft Integration Now Live</h4>
                  <p className="news-excerpt">Link your BOP account to Minecraft for seamless in-game banking with the gp-ai plugin.</p>
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
                <div className="quick-link" onClick={() => navigate('/bop/my-account')}>
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                      <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
                    </svg>
                  </span>
                  My Account
                </div>
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
                <div className="quick-link" onClick={() => navigate('/pse')}>
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/>
                    </svg>
                  </span>
                  Stock Exchange
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
    </div>
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
              <li>Minimum opening deposit: $100</li>
              <li>Online and mobile banking included</li>
              <li>FDIC insured up to $250,000</li>
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
              <li>Minimum opening deposit: $50</li>
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

function Loans() {
  const [loanType, setLoanType] = React.useState('mortgage');

  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/bop">Home</Link> / Loans & Mortgages
          </div>
          <h1>Loans & Mortgages</h1>
          <p className="subtitle">Competitive rates for home mortgages, personal loans, and business financing</p>
        </div>
      </div>
      <div className="container">
        <div className="content-text">
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setLoanType('mortgage')}
                className={loanType === 'mortgage' ? 'btn btn-primary' : 'btn btn-secondary'}
                style={{ fontSize: '13px', padding: '10px 20px' }}
              >
                Home Mortgage
              </button>
              <button
                onClick={() => setLoanType('personal')}
                className={loanType === 'personal' ? 'btn btn-primary' : 'btn btn-secondary'}
                style={{ fontSize: '13px', padding: '10px 20px' }}
              >
                Personal Loan
              </button>
              <button
                onClick={() => setLoanType('business')}
                className={loanType === 'business' ? 'btn btn-primary' : 'btn btn-secondary'}
                style={{ fontSize: '13px', padding: '10px 20px' }}
              >
                Business Loan
              </button>
              <button
                onClick={() => setLoanType('auto')}
                className={loanType === 'auto' ? 'btn btn-primary' : 'btn btn-secondary'}
                style={{ fontSize: '13px', padding: '10px 20px' }}
              >
                Auto Loan
              </button>
            </div>
          </div>

          {loanType === 'mortgage' && (
            <>
              <div className="card">
                <h3 className="card-title">Home Mortgage</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
                  Finance your dream home with competitive rates and flexible terms from the Bank of Praya.
                </p>

                <h4>Current Rates</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '20px' }}>
                  <div style={{ padding: '16px', background: 'rgba(5, 150, 105, 0.05)', borderRadius: '8px' }}>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#059669' }}>4.5%</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>30-Year Fixed</div>
                  </div>
                  <div style={{ padding: '16px', background: 'rgba(5, 150, 105, 0.05)', borderRadius: '8px' }}>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#059669' }}>4.0%</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>15-Year Fixed</div>
                  </div>
                  <div style={{ padding: '16px', background: 'rgba(5, 150, 105, 0.05)', borderRadius: '8px' }}>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#059669' }}>3.8%</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>5/1 ARM</div>
                  </div>
                </div>

                <h4>Loan Features</h4>
                <ul>
                  <li>Loan amounts from $50,000 to $5 million</li>
                  <li>Down payment as low as 3% for first-time buyers</li>
                  <li>No prepayment penalties</li>
                  <li>Option to lock rate for up to 90 days</li>
                  <li>Government-backed loans available (FHA, VA)</li>
                </ul>

                <h4>Requirements</h4>
                <ul>
                  <li>Minimum credit score: 620 (conventional), 580 (FHA)</li>
                  <li>Debt-to-income ratio below 43%</li>
                  <li>Proof of income (2 years employment history)</li>
                  <li>Property appraisal required</li>
                  <li>Homeowners insurance mandatory</li>
                </ul>
              </div>

              <div className="info-box">
                <h4>Pre-Qualification</h4>
                <p>Get pre-qualified in minutes to understand your buying power. Schedule an appointment with a mortgage specialist at any Bank of Praya branch or call 1-800-BOP-LOAN.</p>
              </div>
            </>
          )}

          {loanType === 'personal' && (
            <>
              <div className="card">
                <h3 className="card-title">Personal Loans</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
                  Flexible personal loans for debt consolidation, home improvement, major purchases, and more.
                </p>

                <h4>Loan Details</h4>
                <ul>
                  <li><strong>Interest Rate:</strong> 6.2% - 15.9% APR (based on creditworthiness)</li>
                  <li><strong>Loan Amount:</strong> $1,000 to $50,000</li>
                  <li><strong>Repayment Terms:</strong> 1 to 7 years</li>
                  <li><strong>Origination Fee:</strong> 1% - 5% of loan amount</li>
                  <li><strong>No collateral required</strong> for qualified borrowers</li>
                </ul>

                <h4>Common Uses</h4>
                <ul>
                  <li>Debt consolidation (combine high-interest debts)</li>
                  <li>Home improvements and repairs</li>
                  <li>Medical expenses</li>
                  <li>Wedding or major events</li>
                  <li>Emergency expenses</li>
                </ul>

                <h4>Application Requirements</h4>
                <ul>
                  <li>Minimum credit score: 650 recommended</li>
                  <li>Steady income verification</li>
                  <li>Valid National ID or Passport</li>
                  <li>Proof of residence</li>
                  <li>Bank statements (last 3 months)</li>
                </ul>
              </div>

              <div className="card">
                <h4 className="card-title">Loan Calculator Example</h4>
                <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Sample monthly payment for $10,000 loan:</p>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  <div style={{ marginBottom: '8px' }}>• 3 years at 6.2% APR: <strong>$305/month</strong></div>
                  <div style={{ marginBottom: '8px' }}>• 5 years at 6.2% APR: <strong>$195/month</strong></div>
                  <div>• 7 years at 6.2% APR: <strong>$148/month</strong></div>
                </div>
              </div>
            </>
          )}

          {loanType === 'business' && (
            <>
              <div className="card">
                <h3 className="card-title">Business Loans</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
                  Fuel your business growth with tailored financing solutions for startups and established companies.
                </p>

                <h4>Loan Types</h4>

                <div style={{ marginBottom: '20px' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>Term Loans</h5>
                  <ul>
                    <li>Amount: $10,000 to $500,000</li>
                    <li>Rate: 5.5% - 10% APR</li>
                    <li>Term: 1 to 10 years</li>
                    <li>Best for: Equipment, expansion, working capital</li>
                  </ul>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>Business Line of Credit</h5>
                  <ul>
                    <li>Amount: $5,000 to $100,000</li>
                    <li>Rate: Variable (Prime + 2% - 5%)</li>
                    <li>Revolving credit - borrow as needed</li>
                    <li>Best for: Cash flow management, seasonal needs</li>
                  </ul>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>SBA Loans</h5>
                  <ul>
                    <li>Amount: Up to $5 million</li>
                    <li>Rate: 6% - 8% APR (government-backed)</li>
                    <li>Term: Up to 25 years (real estate), 10 years (equipment)</li>
                    <li>Best for: Startups, real estate, major purchases</li>
                  </ul>
                </div>

                <h4>Requirements</h4>
                <ul>
                  <li>Business plan and financial projections</li>
                  <li>2+ years in business (preferred)</li>
                  <li>Business and personal tax returns</li>
                  <li>Credit score: 680+ recommended</li>
                  <li>Collateral may be required for larger loans</li>
                </ul>
              </div>

              <div className="info-box">
                <h4>Business Banking Specialist</h4>
                <p>Schedule a consultation with our business banking team to discuss your financing needs and explore the best loan options for your company. Call 1-800-BOP-BUSI or visit any branch.</p>
              </div>
            </>
          )}

          {loanType === 'auto' && (
            <>
              <div className="card">
                <h3 className="card-title">Auto Loans</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
                  Get behind the wheel with competitive auto financing for new and used vehicles.
                </p>

                <h4>Current Rates</h4>
                <div style={{ marginBottom: '20px' }}>
                  <ul>
                    <li><strong>New Cars:</strong> 4.9% - 7.5% APR</li>
                    <li><strong>Used Cars (2020-2024):</strong> 5.5% - 8.5% APR</li>
                    <li><strong>Used Cars (2015-2019):</strong> 6.5% - 9.5% APR</li>
                    <li>Rates based on credit score, loan term, and vehicle age</li>
                  </ul>
                </div>

                <h4>Loan Features</h4>
                <ul>
                  <li>Loan amounts from $5,000 to $100,000</li>
                  <li>Terms: 12 to 84 months</li>
                  <li>Finance up to 100% of vehicle value (qualified buyers)</li>
                  <li>No application or origination fees</li>
                  <li>Pre-approval available before shopping</li>
                  <li>Refinancing options for existing auto loans</li>
                </ul>

                <h4>How to Apply</h4>
                <ol>
                  <li><strong>Get Pre-Approved:</strong> Apply online or at any branch to know your budget</li>
                  <li><strong>Shop for Vehicle:</strong> Use your pre-approval letter when negotiating</li>
                  <li><strong>Finalize Loan:</strong> Submit vehicle details and complete documentation</li>
                  <li><strong>Drive Away:</strong> Funds disbursed directly to dealer or seller</li>
                </ol>

                <h4>Requirements</h4>
                <ul>
                  <li>Valid driver's license</li>
                  <li>Proof of income and employment</li>
                  <li>Auto insurance (required before disbursement)</li>
                  <li>Vehicle identification and details</li>
                  <li>Minimum credit score: 600</li>
                </ul>
              </div>

              <div className="card">
                <h4 className="card-title">Payment Example</h4>
                <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>$25,000 new car loan at 4.9% APR:</p>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  <div style={{ marginBottom: '8px' }}>• 36 months: <strong>$747/month</strong></div>
                  <div style={{ marginBottom: '8px' }}>• 48 months: <strong>$574/month</strong></div>
                  <div style={{ marginBottom: '8px' }}>• 60 months: <strong>$471/month</strong></div>
                  <div>• 72 months: <strong>$405/month</strong></div>
                </div>
              </div>
            </>
          )}

          <div className="card" style={{ marginTop: '24px', background: 'linear-gradient(135deg, #059669 0%, #047857 100%)', color: 'white', border: 'none' }}>
            <h4 style={{ color: 'white', marginBottom: '12px' }}>Ready to Apply?</h4>
            <p style={{ marginBottom: '16px', opacity: 0.9 }}>Visit any Bank of Praya branch or call 1-800-BOP-LOAN to speak with a loan specialist. Pre-qualification available with no impact to your credit score.</p>
            <div style={{ fontSize: '13px', opacity: 0.8 }}>Business hours: Monday - Friday 9:00 AM - 5:00 PM, Saturday 10:00 AM - 2:00 PM</div>
          </div>
        </div>
      </div>
    </main>
  );
}

function MyAccount() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [view, setView] = React.useState('login') // 'login', 'register', 'dashboard'
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [accountData, setAccountData] = React.useState({
    accountNumber: 'BOP-2024-' + Math.floor(Math.random() * 100000).toString().padStart(5, '0'),
    accountHolder: '',
    balance: 0,
    accountType: 'Checking',
    openedDate: new Date().toLocaleDateString(),
    minecraftLinked: false,
    minecraftUsername: ''
  })
  const [transactions, setTransactions] = React.useState([])

  const handleLogin = (e) => {
    e.preventDefault()
    if (username && password) {
      // Demo login - in production, this would authenticate with backend
      setIsLoggedIn(true)
      setView('dashboard')
      setAccountData({
        ...accountData,
        accountHolder: username,
        balance: 10000 + Math.floor(Math.random() * 50000),
        minecraftLinked: false
      })
      // Generate sample transactions
      setTransactions([
        { id: 1, date: new Date(Date.now() - 86400000).toLocaleDateString(), description: 'Deposit - Payroll', amount: 2500, type: 'credit' },
        { id: 2, date: new Date(Date.now() - 172800000).toLocaleDateString(), description: 'Withdrawal - ATM', amount: -100, type: 'debit' },
        { id: 3, date: new Date(Date.now() - 259200000).toLocaleDateString(), description: 'Transfer to Savings', amount: -1000, type: 'debit' },
        { id: 4, date: new Date(Date.now() - 345600000).toLocaleDateString(), description: 'Deposit - Check', amount: 500, type: 'credit' },
        { id: 5, date: new Date(Date.now() - 432000000).toLocaleDateString(), description: 'Payment - Utilities', amount: -150, type: 'debit' }
      ])
    }
  }

  const handleRegister = (e) => {
    e.preventDefault()
    if (username && password) {
      // Demo registration
      setIsLoggedIn(true)
      setView('dashboard')
      setAccountData({
        ...accountData,
        accountHolder: username,
        balance: 0
      })
      setTransactions([])
    }
  }

  const linkMinecraftAccount = () => {
    const mcUsername = prompt('Enter your Minecraft username:')
    if (mcUsername) {
      setAccountData({
        ...accountData,
        minecraftLinked: true,
        minecraftUsername: mcUsername
      })
      alert(`Minecraft account "${mcUsername}" linked successfully! Your in-game economy is now connected to your Bank of Praya account.`)
    }
  }

  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/bop">Home</Link> / My Account
          </div>
          <h1>My Account</h1>
          <p className="subtitle">Manage your Bank of Praya account and link to Minecraft</p>
        </div>
      </div>
      <div className="container">
        {!isLoggedIn ? (
          <div className="content-grid">
            <div className="main-content">
              {view === 'login' ? (
                <div className="card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                    <h3 className="card-title" style={{ marginBottom: 0 }}>Login to Your Account</h3>
                    <span style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '600' }}>Demo Only</span>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '20px' }}>This is a demonstration account system. Enter any username and password to continue.</p>
                  <form onSubmit={handleLogin} className="content-text">
                    <div style={{ marginBottom: '20px' }}>
                      <label htmlFor="login-username" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Username</label>
                      <input
                        id="login-username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        required
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-subtle)', fontSize: '16px' }}
                      />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                      <label htmlFor="login-password" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Password</label>
                      <input
                        id="login-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-subtle)', fontSize: '16px' }}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px', marginBottom: '12px' }}>
                      Login
                    </button>
                    <button type="button" className="btn btn-secondary" style={{ width: '100%', padding: '14px' }} onClick={() => setView('register')}>
                      Create New Account
                    </button>
                  </form>
                </div>
              ) : (
                <div className="card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                    <h3 className="card-title" style={{ marginBottom: 0 }}>Create New Account</h3>
                    <span style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '600' }}>Demo Only</span>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '20px' }}>This is a demonstration account system. Enter any username and password to continue.</p>
                  <form onSubmit={handleRegister} className="content-text">
                    <div style={{ marginBottom: '20px' }}>
                      <label htmlFor="register-username" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Username</label>
                      <input
                        id="register-username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Choose a username"
                        required
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-subtle)', fontSize: '16px' }}
                      />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                      <label htmlFor="register-password" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Password</label>
                      <input
                        id="register-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Choose a password"
                        required
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-subtle)', fontSize: '16px' }}
                      />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                      <label htmlFor="account-type" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Account Type</label>
                      <select
                        id="account-type"
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}
                      >
                        <option value="checking">Checking Account</option>
                        <option value="savings">Savings Account</option>
                        <option value="youth">Youth Account (13-17)</option>
                      </select>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px', marginBottom: '12px' }}>
                      Create Account
                    </button>
                    <button type="button" className="btn btn-secondary" style={{ width: '100%', padding: '14px' }} onClick={() => setView('login')}>
                      Back to Login
                    </button>
                  </form>
                </div>
              )}
            </div>
            <aside className="sidebar">
              <div className="info-box">
                <h4>Account Benefits</h4>
                <ul style={{ fontSize: '14px', marginTop: '12px' }}>
                  <li>24/7 online banking access</li>
                  <li>Link to Minecraft economy</li>
                  <li>Real-time transaction tracking</li>
                  <li>Secure encrypted storage</li>
                  <li>Mobile banking support</li>
                </ul>
              </div>
              <div className="card" style={{ background: 'linear-gradient(135deg, #059669 0%, #047857 100%)', color: 'white', border: 'none' }}>
                <h4 style={{ color: 'white', marginBottom: '12px' }}>Minecraft Integration</h4>
                <p style={{ opacity: 0.9, fontSize: '14px' }}>Connect your Bank of Praya account to your Minecraft player for seamless in-game economy integration with the gp-ai plugin.</p>
              </div>
            </aside>
          </div>
        ) : (
          <div className="content-grid">
            <div className="main-content">
              <div className="card">
                <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 className="card-title">Account Overview</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>Welcome back, {accountData.accountHolder}</p>
                  </div>
                  <button className="btn btn-secondary" onClick={() => { setIsLoggedIn(false); setView('login'); }}>
                    Logout
                  </button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '20px' }}>
                  <div style={{ padding: '20px', background: 'linear-gradient(135deg, #059669 0%, #047857 100%)', borderRadius: '12px', color: 'white' }}>
                    <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px' }}>Current Balance</div>
                    <div style={{ fontSize: '32px', fontWeight: '700' }}>${accountData.balance.toLocaleString()}</div>
                  </div>
                  <div style={{ padding: '20px', background: 'var(--bg-elevated)', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '8px' }}>Account Number</div>
                    <div style={{ fontSize: '18px', fontWeight: '600' }}>{accountData.accountNumber}</div>
                  </div>
                  <div style={{ padding: '20px', background: 'var(--bg-elevated)', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '8px' }}>Account Type</div>
                    <div style={{ fontSize: '18px', fontWeight: '600' }}>{accountData.accountType}</div>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Minecraft Integration</h3>
                </div>
                <div className="content-text">
                  {accountData.minecraftLinked ? (
                    <div style={{ padding: '16px', background: 'rgba(5, 150, 105, 0.1)', borderRadius: '8px', border: '1px solid rgba(5, 150, 105, 0.3)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                          <polyline points="22 4 12 14.01 9 11.01"/>
                        </svg>
                        <strong style={{ color: '#059669' }}>Minecraft Account Linked</strong>
                      </div>
                      <p style={{ marginBottom: '8px' }}>Connected to: <strong>{accountData.minecraftUsername}</strong></p>
                      <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Your in-game economy is now synchronized with your Bank of Praya account. Transactions made in Minecraft will reflect here.</p>
                    </div>
                  ) : (
                    <div>
                      <p style={{ marginBottom: '16px' }}>Link your Minecraft account to enable in-game banking with the gp-ai Paper plugin. Once linked, you can:</p>
                      <ul style={{ marginBottom: '16px' }}>
                        <li>View your balance in-game</li>
                        <li>Make deposits and withdrawals</li>
                        <li>Transfer funds to other players</li>
                        <li>Track all transactions in real-time</li>
                      </ul>
                      <button className="btn btn-primary" onClick={linkMinecraftAccount}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px' }}>
                          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                        </svg>
                        Link Minecraft Account
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Recent Transactions</h3>
                </div>
                {transactions.length > 0 ? (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                          <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600' }}>Date</th>
                          <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600' }}>Description</th>
                          <th style={{ padding: '12px', textAlign: 'right', fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600' }}>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.map((transaction) => (
                          <tr key={transaction.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                            <td style={{ padding: '12px', fontSize: '14px' }}>{transaction.date}</td>
                            <td style={{ padding: '12px', fontSize: '14px' }}>{transaction.description}</td>
                            <td style={{ padding: '12px', fontSize: '14px', textAlign: 'right', fontWeight: '600', color: transaction.type === 'credit' ? '#059669' : '#ef4444' }}>
                              {transaction.amount > 0 ? '+' : ''}{transaction.amount < 0 ? '-' : ''}${Math.abs(transaction.amount).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div style={{ padding: '40px', textAlign: 'center' }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ margin: '0 auto 16px', opacity: 0.3 }}>
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                      <line x1="1" y1="10" x2="23" y2="10"/>
                    </svg>
                    <p style={{ color: 'var(--text-muted)' }}>No transactions yet. Start using your account to see your transaction history here.</p>
                  </div>
                )}
              </div>
            </div>

            <aside className="sidebar">
              <div className="card">
                <h4 className="card-title">Account Details</h4>
                <div style={{ fontSize: '14px' }}>
                  <div style={{ padding: '12px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                    <div style={{ color: 'var(--text-muted)', marginBottom: '4px' }}>Account Holder</div>
                    <div style={{ fontWeight: '600' }}>{accountData.accountHolder}</div>
                  </div>
                  <div style={{ padding: '12px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                    <div style={{ color: 'var(--text-muted)', marginBottom: '4px' }}>Account Number</div>
                    <div style={{ fontWeight: '600' }}>{accountData.accountNumber}</div>
                  </div>
                  <div style={{ padding: '12px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                    <div style={{ color: 'var(--text-muted)', marginBottom: '4px' }}>Account Type</div>
                    <div style={{ fontWeight: '600' }}>{accountData.accountType}</div>
                  </div>
                  <div style={{ padding: '12px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                    <div style={{ color: 'var(--text-muted)', marginBottom: '4px' }}>Opened Date</div>
                    <div style={{ fontWeight: '600' }}>{accountData.openedDate}</div>
                  </div>
                  <div style={{ padding: '12px 0' }}>
                    <div style={{ color: 'var(--text-muted)', marginBottom: '4px' }}>Minecraft Status</div>
                    <div style={{ fontWeight: '600', color: accountData.minecraftLinked ? '#059669' : '#94a3b8' }}>
                      {accountData.minecraftLinked ? 'Linked' : 'Not Linked'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <h4 className="card-title">Quick Actions</h4>
                <div className="quick-link">
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="1" x2="12" y2="23"/>
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                    </svg>
                  </span>
                  Transfer Money
                </div>
                <div className="quick-link">
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                      <line x1="1" y1="10" x2="23" y2="10"/>
                    </svg>
                  </span>
                  Make a Payment
                </div>
                <div className="quick-link">
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                      <polyline points="14,2 14,8 20,8"/>
                    </svg>
                  </span>
                  View Statements
                </div>
                <div className="quick-link">
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="3"/>
                      <path d="M12 1v6m0 6v6M5.6 5.6l4.2 4.2m4.2 4.2l4.2 4.2M1 12h6m6 0h6M5.6 18.4l4.2-4.2m4.2-4.2l4.2-4.2"/>
                    </svg>
                  </span>
                  Account Settings
                </div>
              </div>

              <div className="info-box">
                <h4>Need Help?</h4>
                <p><strong>Customer Service</strong></p>
                <p>1-800-BOP-HELP</p>
                <p style={{ marginTop: '8px', fontSize: '13px', color: 'var(--text-muted)' }}>Available 24/7 for account support and Minecraft integration assistance.</p>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  )
}

function Services() {
  const [serviceType, setServiceType] = React.useState('investment');

  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/bop">Home</Link> / Banking Services
          </div>
          <h1>Banking Services</h1>
          <p className="subtitle">Comprehensive banking services including investments, insurance, and wealth management</p>
        </div>
      </div>
      <div className="container">
        <div className="content-text">
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setServiceType('investment')}
                className={serviceType === 'investment' ? 'btn btn-primary' : 'btn btn-secondary'}
                style={{ fontSize: '13px', padding: '10px 20px' }}
              >
                Investment Accounts
              </button>
              <button
                onClick={() => setServiceType('retirement')}
                className={serviceType === 'retirement' ? 'btn btn-primary' : 'btn btn-secondary'}
                style={{ fontSize: '13px', padding: '10px 20px' }}
              >
                Retirement Planning
              </button>
              <button
                onClick={() => setServiceType('insurance')}
                className={serviceType === 'insurance' ? 'btn btn-primary' : 'btn btn-secondary'}
                style={{ fontSize: '13px', padding: '10px 20px' }}
              >
                Insurance Products
              </button>
              <button
                onClick={() => setServiceType('transfers')}
                className={serviceType === 'transfers' ? 'btn btn-primary' : 'btn btn-secondary'}
                style={{ fontSize: '13px', padding: '10px 20px' }}
              >
                Wire Transfers
              </button>
            </div>
          </div>

          {serviceType === 'investment' && (
            <>
              <div className="card">
                <h3 className="card-title">Investment Accounts</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
                  Grow your wealth with diversified investment options tailored to your financial goals and risk tolerance.
                </p>

                <h4>Account Types</h4>

                <div style={{ marginBottom: '20px' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>Brokerage Account</h5>
                  <ul>
                    <li>Trade stocks, bonds, ETFs, and mutual funds</li>
                    <li>No account minimums for new investors</li>
                    <li>Commission: $9.99 per trade ($0 for ETFs)</li>
                    <li>Access to research tools and market analysis</li>
                    <li>Mobile and online trading platforms</li>
                  </ul>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>Managed Portfolio</h5>
                  <ul>
                    <li>Professional management by BOP investment team</li>
                    <li>Minimum investment: $10,000</li>
                    <li>Management fee: 0.5% - 1.2% annually</li>
                    <li>Customized strategy based on goals and timeline</li>
                    <li>Quarterly performance reviews</li>
                  </ul>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>Certificates of Deposit (CDs)</h5>
                  <ul>
                    <li>Fixed-rate returns with FDIC insurance</li>
                    <li>Terms: 3 months to 5 years</li>
                    <li>Rates: 3.5% - 4.8% APY (based on term)</li>
                    <li>Minimum deposit: $500</li>
                    <li>Penalty for early withdrawal</li>
                  </ul>
                </div>

                <h4>Investment Resources</h4>
                <ul>
                  <li>Free financial advisor consultation</li>
                  <li>Educational webinars and workshops</li>
                  <li>Market insights and weekly reports</li>
                  <li>Portfolio rebalancing tools</li>
                  <li>Tax-loss harvesting guidance</li>
                </ul>
              </div>

              <div className="info-box">
                <h4>Schedule a Consultation</h4>
                <p>Meet with a Bank of Praya investment advisor to discuss your financial goals and create a personalized investment strategy. Call 1-800-BOP-INVEST or visit any branch to schedule your free consultation.</p>
              </div>
            </>
          )}

          {serviceType === 'retirement' && (
            <>
              <div className="card">
                <h3 className="card-title">Retirement Planning</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
                  Secure your future with tax-advantaged retirement accounts and expert planning services.
                </p>

                <h4>Retirement Account Options</h4>

                <div style={{ marginBottom: '20px' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>Traditional IRA</h5>
                  <ul>
                    <li>Tax-deductible contributions (subject to income limits)</li>
                    <li>Tax-deferred growth until withdrawal</li>
                    <li>2024 contribution limit: $6,500 ($7,500 if age 50+)</li>
                    <li>Required minimum distributions at age 73</li>
                    <li>Wide range of investment options</li>
                  </ul>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>Roth IRA</h5>
                  <ul>
                    <li>After-tax contributions, tax-free withdrawals in retirement</li>
                    <li>No required minimum distributions</li>
                    <li>Income limits apply for eligibility</li>
                    <li>Contribution limits same as Traditional IRA</li>
                    <li>Penalty-free withdrawal of contributions anytime</li>
                  </ul>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>Rollover IRA</h5>
                  <ul>
                    <li>Move funds from employer-sponsored 401(k)</li>
                    <li>Consolidate multiple retirement accounts</li>
                    <li>More investment choices than typical 401(k)</li>
                    <li>No taxes or penalties when done correctly</li>
                    <li>Free rollover assistance from BOP advisors</li>
                  </ul>
                </div>

                <h4>Retirement Planning Services</h4>
                <ul>
                  <li>Personalized retirement income projections</li>
                  <li>Social Security optimization strategies</li>
                  <li>Tax-efficient withdrawal planning</li>
                  <li>Estate planning coordination</li>
                  <li>Annual retirement checkups</li>
                </ul>
              </div>

              <div className="card">
                <h4 className="card-title">Retirement Calculator</h4>
                <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Example: Contributing $500/month from age 30 to 65</p>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  <div style={{ marginBottom: '8px' }}>• Total contributions: <strong>$210,000</strong></div>
                  <div style={{ marginBottom: '8px' }}>• At 6% annual return: <strong>$587,000</strong></div>
                  <div style={{ marginBottom: '8px' }}>• At 7% annual return: <strong>$767,000</strong></div>
                  <div>• At 8% annual return: <strong>$1,030,000</strong></div>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '12px' }}>*Hypothetical examples for illustration only. Past performance doesn't guarantee future results.</p>
              </div>
            </>
          )}

          {serviceType === 'insurance' && (
            <>
              <div className="card">
                <h3 className="card-title">Insurance Products</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
                  Protect what matters most with comprehensive insurance solutions from Bank of Praya Insurance Services.
                </p>

                <h4>Available Insurance Types</h4>

                <div style={{ marginBottom: '20px' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>Life Insurance</h5>
                  <ul>
                    <li><strong>Term Life:</strong> Affordable coverage for 10, 20, or 30 years</li>
                    <li><strong>Whole Life:</strong> Permanent coverage with cash value growth</li>
                    <li><strong>Universal Life:</strong> Flexible premiums and death benefit</li>
                    <li>Coverage amounts from $50,000 to $10 million</li>
                    <li>Medical exam may be required</li>
                  </ul>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>Disability Insurance</h5>
                  <ul>
                    <li>Short-term disability: 3-6 months coverage</li>
                    <li>Long-term disability: Coverage until age 65</li>
                    <li>Replace 50%-70% of income if unable to work</li>
                    <li>30-90 day waiting period</li>
                    <li>Own-occupation or any-occupation definitions</li>
                  </ul>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>Long-Term Care Insurance</h5>
                  <ul>
                    <li>Coverage for nursing home, assisted living, or home care</li>
                    <li>Daily benefit: $100 - $500</li>
                    <li>Benefit period: 2, 3, 5 years, or lifetime</li>
                    <li>Inflation protection available</li>
                    <li>Best purchased in your 50s or early 60s</li>
                  </ul>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>Annuities</h5>
                  <ul>
                    <li>Fixed annuities: Guaranteed return rate</li>
                    <li>Variable annuities: Returns based on market performance</li>
                    <li>Immediate or deferred income options</li>
                    <li>Tax-deferred growth</li>
                    <li>Lifetime income guarantees available</li>
                  </ul>
                </div>

                <h4>Why Choose BOP Insurance?</h4>
                <ul>
                  <li>Bundle discounts with existing BOP accounts</li>
                  <li>Licensed agents at every branch</li>
                  <li>Multiple carrier options for competitive rates</li>
                  <li>Easy premium payment through auto-debit</li>
                  <li>24/7 claims support</li>
                </ul>
              </div>

              <div className="info-box">
                <h4>Get a Quote</h4>
                <p>Speak with a licensed insurance specialist to get a personalized quote and coverage recommendation. Call 1-800-BOP-INSURE or visit any branch. Free, no-obligation consultations available.</p>
              </div>
            </>
          )}

          {serviceType === 'transfers' && (
            <>
              <div className="card">
                <h3 className="card-title">Wire Transfers</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
                  Send and receive money securely anywhere in the world with Bank of Praya wire transfer services.
                </p>

                <h4>Domestic Wire Transfers</h4>
                <ul>
                  <li><strong>Processing:</strong> Same-day delivery (if sent before 3:00 PM)</li>
                  <li><strong>Fee:</strong> $25 outgoing, $15 incoming</li>
                  <li><strong>Limits:</strong> Up to $100,000 per transfer online, unlimited in-branch</li>
                  <li><strong>Required Info:</strong> Recipient name, bank name, routing number, account number</li>
                  <li>Available through online banking, mobile app, or branch</li>
                </ul>

                <h4>International Wire Transfers</h4>
                <ul>
                  <li><strong>Processing:</strong> 1-5 business days depending on country</li>
                  <li><strong>Fee:</strong> $45 outgoing, $15 incoming</li>
                  <li><strong>Exchange Rates:</strong> Competitive rates updated hourly</li>
                  <li><strong>Required Info:</strong> Recipient name, address, SWIFT/BIC code, IBAN or account number</li>
                  <li>Supported in 200+ countries and 50+ currencies</li>
                </ul>

                <h4>How to Send a Wire Transfer</h4>
                <ol>
                  <li><strong>Gather Information:</strong> Collect recipient's banking details</li>
                  <li><strong>Initiate Transfer:</strong> Log in to online banking or visit branch</li>
                  <li><strong>Verify Details:</strong> Double-check all information (transfers cannot be reversed)</li>
                  <li><strong>Authorize:</strong> Confirm with password/PIN or signature</li>
                  <li><strong>Track:</strong> Receive confirmation number to track status</li>
                </ol>

                <h4>Wire Transfer Security</h4>
                <ul>
                  <li>Multi-factor authentication required</li>
                  <li>Fraud monitoring on all transactions</li>
                  <li>Encrypted transmission of data</li>
                  <li>Callback verification for large amounts</li>
                  <li>Never send wires to unknown parties or upon request via email</li>
                </ul>
              </div>

              <div className="card">
                <h4 className="card-title">Alternative Transfer Options</h4>
                <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Consider these options for smaller or non-urgent transfers:</p>
                <ul style={{ fontSize: '14px' }}>
                  <li><strong>ACH Transfer:</strong> Free, 1-3 days, up to $25,000</li>
                  <li><strong>Mobile P2P:</strong> Free, instant to BOP customers</li>
                  <li><strong>Online Bill Pay:</strong> Free, 2-5 days delivery</li>
                  <li><strong>Cashier's Check:</strong> $10 fee, physical delivery</li>
                </ul>
              </div>

              <div className="info-box" style={{ background: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.3)' }}>
                <h4 style={{ color: '#dc2626' }}>Wire Fraud Warning</h4>
                <p>Wire transfers cannot be reversed. Be cautious of requests to wire money, especially for real estate, prizes, or urgent requests. Always verify recipient details through a trusted source. Call Bank of Praya at 1-800-BOP-HELP if you suspect fraud.</p>
              </div>
            </>
          )}

          <div className="card" style={{ marginTop: '24px', background: 'linear-gradient(135deg, #059669 0%, #047857 100%)', color: 'white', border: 'none' }}>
            <h4 style={{ color: 'white', marginBottom: '12px' }}>Questions About Our Services?</h4>
            <p style={{ marginBottom: '16px', opacity: 0.9 }}>Our banking specialists are here to help. Visit any Bank of Praya branch or call our service center for personalized assistance.</p>
            <div style={{ fontSize: '13px', opacity: 0.8 }}>Customer Service: 1-800-BOP-SERV | Hours: Monday - Friday 8:00 AM - 8:00 PM, Saturday 9:00 AM - 5:00 PM</div>
          </div>
        </div>
      </div>
    </main>
  );
}
