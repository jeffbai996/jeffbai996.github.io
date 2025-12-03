import React, { useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import './Department.css'

export default function Revenue() {
  const navigate = useNavigate()

  useEffect(() => {
    document.body.classList.add('theme-revenue')
    return () => document.body.classList.remove('theme-revenue')
  }, [])

  return (
    <>
      <header className="dept-header">
        <div className="container">
          <Link to="/revenue" className="dept-logo">
            <div className="logo-mark">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8M12 18V6"/>
              </svg>
            </div>
            <div className="logo-text">
              <h1>Revenue Department</h1>
              <span className="tagline">Republic of Praya</span>
            </div>
          </Link>
          <nav className="nav">
            <Link to="/revenue" className="nav-link">Home</Link>
            <Link to="/revenue/file" className="nav-link">File Taxes</Link>
            <Link to="/revenue/payment" className="nav-link">Make Payment</Link>
            <Link to="/revenue/refunds" className="nav-link">Refunds</Link>
          </nav>
        </div>
      </header>

      <Routes>
        <Route index element={<RevenueHome navigate={navigate} />} />
        <Route path="file" element={<FileTaxes />} />
        <Route path="payment" element={<ComingSoon title="Tax Payments" />} />
        <Route path="refunds" element={<ComingSoon title="Refund Status" />} />
      </Routes>

      <footer className="dept-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <h4>Revenue Department</h4>
              <p>Administering tax laws fairly and efficiently to fund public services across the Republic of Praya.</p>
            </div>
            <div className="footer-section">
              <h5>Services</h5>
              <ul>
                <li><Link to="/revenue/file">File Tax Return</Link></li>
                <li><a href="#">Make Payment</a></li>
                <li><a href="#">Check Refund Status</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5>Resources</h5>
              <ul>
                <li><a href="#">Tax Forms & Publications</a></li>
                <li><a href="#">Tax Calculator</a></li>
                <li><a href="#">Free Tax Assistance</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5>Government</h5>
              <ul>
                <li><Link to="/">Gov Portal</Link></li>
                <li><a href="#">Tax Policy</a></li>
                <li><a href="#">Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>&copy; 2024 Republic of Praya. Revenue Department.</span>
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

function RevenueHome({ navigate }) {
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
                <circle cx="12" cy="12" r="10"/>
                <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8M12 18V6"/>
              </svg>
              Tax Services
            </div>
            <h2>Simple & <span>Fair</span> Taxation</h2>
            <p>File your taxes online, make payments, track refunds, and access tax resources through the Revenue Department's digital services. Efficient taxation for a stronger Praya.</p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => navigate('/revenue/file')}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                </svg>
                File Tax Return
              </button>
              <button className="btn btn-secondary" onClick={() => navigate('/revenue/refunds')}>
                Check Refund Status
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Returns Filed</span>
              <span className="stat-value">2.8M</span>
              <span className="stat-change">This Year</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">E-File Rate</span>
              <span className="stat-value">87%</span>
              <span className="stat-change">Online Filing</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Avg Refund</span>
              <span className="stat-value">¤2,840</span>
              <span className="stat-change">Per Return</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Processing Time</span>
              <span className="stat-value">21 days</span>
              <span className="stat-change">E-File Average</span>
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
                  <h3 className="card-title">Tax Filing</h3>
                  <Link to="/revenue/file" className="card-link">File Now</Link>
                </div>
                <div className="content-text">
                  <h4>2024 Tax Year Deadlines</h4>
                  <ul>
                    <li><strong>Individual Returns:</strong> April 15, 2025</li>
                    <li><strong>Extension Deadline:</strong> October 15, 2025 (with approved extension)</li>
                    <li><strong>Quarterly Estimates:</strong> Due April 15, June 15, September 15, January 15</li>
                    <li><strong>Business Returns:</strong> March 15, 2025 (partnerships/S-corps) or April 15, 2025 (corporations)</li>
                  </ul>
                  <h4 style={{ marginTop: '20px' }}>Filing Options</h4>
                  <ul>
                    <li><strong>E-File:</strong> Free online filing for incomes under ¤75,000</li>
                    <li><strong>Tax Software:</strong> Approved third-party providers</li>
                    <li><strong>Tax Professional:</strong> Find certified preparers</li>
                    <li><strong>Paper Filing:</strong> Download forms and mail return</li>
                  </ul>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Tax Rates & Credits</h3>
                </div>
                <div className="content-text">
                  <h4>2024 Income Tax Brackets (Individual)</h4>
                  <ul>
                    <li>10% on income up to ¤10,275</li>
                    <li>12% on income ¤10,276 - ¤41,775</li>
                    <li>22% on income ¤41,776 - ¤89,075</li>
                    <li>24% on income ¤89,076 - ¤170,050</li>
                    <li>32% on income ¤170,051 - ¤215,950</li>
                    <li>35% on income ¤215,951 - ¤539,900</li>
                    <li>37% on income over ¤539,900</li>
                  </ul>
                  <h4 style={{ marginTop: '20px' }}>Common Tax Credits</h4>
                  <ul>
                    <li><strong>Child Tax Credit:</strong> ¤2,000 per qualifying child</li>
                    <li><strong>Earned Income Credit:</strong> Up to ¤7,430 (based on income/family size)</li>
                    <li><strong>Education Credit:</strong> Up to ¤2,500 per student</li>
                  </ul>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Latest Updates</h3>
                </div>
                <div className="news-item">
                  <span className="news-date">Dec 1, 2024</span>
                  <h4 className="news-title">Free Tax Filing Now Open</h4>
                  <p className="news-excerpt">E-file system now accepting 2024 tax returns. File early for faster refunds.</p>
                </div>
                <div className="news-item">
                  <span className="news-date">Nov 20, 2024</span>
                  <h4 className="news-title">New Tax Credit for First-Time Home Buyers</h4>
                  <p className="news-excerpt">Eligible buyers can claim up to ¤15,000 credit on 2024 returns.</p>
                </div>
              </div>
            </div>

            <aside className="sidebar">
              <div className="card">
                <h4 className="card-title">Quick Services</h4>
                <div className="quick-link" onClick={() => navigate('/revenue/file')}>
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                      <polyline points="14,2 14,8 20,8"/>
                    </svg>
                  </span>
                  File Tax Return
                </div>
                <div className="quick-link" onClick={() => navigate('/revenue/payment')}>
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                      <line x1="1" y1="10" x2="23" y2="10"/>
                    </svg>
                  </span>
                  Make Payment
                </div>
                <div className="quick-link" onClick={() => navigate('/revenue/refunds')}>
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"/>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                  </span>
                  Check Refund Status
                </div>
                <div className="quick-link">
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                      <circle cx="8.5" cy="7" r="4"/>
                      <line x1="20" y1="8" x2="20" y2="14"/>
                      <line x1="23" y1="11" x2="17" y2="11"/>
                    </svg>
                  </span>
                  Get Tax Help
                </div>
              </div>

              <div className="card" style={{ background: 'linear-gradient(135deg, #059669 0%, #047857 100%)', color: 'white', border: 'none' }}>
                <h4 style={{ color: 'white', marginBottom: '8px' }}>Standard Deduction</h4>
                <div style={{ fontSize: '32px', fontWeight: '800', marginBottom: '4px' }}>¤13,850</div>
                <div style={{ fontSize: '13px', opacity: 0.9 }}>Single Filers (2024)</div>
                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '13px' }}>Married Filing Jointly</span>
                    <span style={{ fontSize: '13px', fontWeight: '600' }}>¤27,700</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '13px' }}>Head of Household</span>
                    <span style={{ fontSize: '13px', fontWeight: '600' }}>¤20,800</span>
                  </div>
                </div>
              </div>

              <div className="info-box">
                <h4>Need Help?</h4>
                <p><strong>Phone:</strong> 1-800-TAX-HELP</p>
                <p><strong>Hours:</strong> Mon-Fri 7AM-7PM</p>
                <p><strong>Email:</strong> help@revenue.gov.py</p>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  )
}

function FileTaxes() {
  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/revenue">Home</Link> / File Taxes
          </div>
          <h1>File Your Tax Return</h1>
          <p className="subtitle">Easy online filing for individuals and businesses</p>
        </div>
      </div>
      <div className="container">
        <div className="content-text">
          <h3>E-File Your Tax Return</h3>
          <p>Filing electronically is the fastest, most accurate way to file your taxes and receive your refund.</p>

          <div className="card" style={{ marginTop: '20px' }}>
            <h4 className="card-title">Free E-File (Individual Returns)</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Free online filing for qualifying taxpayers:</p>
            <ul style={{ marginBottom: '12px' }}>
              <li><strong>Eligibility:</strong> Adjusted gross income of ¤75,000 or less</li>
              <li><strong>Forms included:</strong> Form 1040, common schedules, basic credits</li>
              <li><strong>State filing:</strong> Also included free with federal return</li>
              <li><strong>Refund:</strong> Direct deposit in as little as 21 days</li>
              <li><strong>Security:</strong> Bank-level encryption and security</li>
            </ul>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Available now</strong> for 2024 tax year returns
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Commercial Tax Software</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Third-party software for complex returns:</p>
            <ul>
              <li><strong>Approved providers:</strong> TaxPrep Pro, E-Tax Plus, QuickFile</li>
              <li><strong>Features:</strong> Step-by-step guidance, automatic calculations, audit support</li>
              <li><strong>Pricing:</strong> Free to ¤120 depending on complexity</li>
              <li><strong>Business returns:</strong> Self-employed, rental income, investments</li>
              <li><strong>Import data:</strong> W-2s, 1099s, prior year returns</li>
            </ul>
          </div>

          <div className="card">
            <h4 className="card-title">Professional Tax Preparation</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Work with a certified tax professional:</p>
            <ul>
              <li>Certified Public Accountants (CPAs)</li>
              <li>Enrolled Agents (EAs)</li>
              <li>Tax Attorneys</li>
              <li>Annual Filing Season Program participants</li>
            </ul>
            <p style={{ marginTop: '12px', fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Find a preparer:</strong> Use our directory of registered tax professionals
            </p>
          </div>

          <h3 style={{ marginTop: '32px' }}>What You'll Need to File</h3>

          <div className="card">
            <h4 className="card-title">Income Documents</h4>
            <ul>
              <li><strong>W-2 forms:</strong> From all employers (wages, salaries)</li>
              <li><strong>1099 forms:</strong> Interest, dividends, contract work, unemployment</li>
              <li><strong>Business income:</strong> Records of self-employment income and expenses</li>
              <li><strong>Investment income:</strong> Stock sales, capital gains/losses</li>
              <li><strong>Retirement distributions:</strong> IRA, 401(k), pension</li>
              <li><strong>Rental income:</strong> Property rental receipts and expenses</li>
            </ul>
          </div>

          <div className="card">
            <h4 className="card-title">Deductions & Credits</h4>
            <ul>
              <li><strong>Mortgage interest:</strong> Form 1098 from lender</li>
              <li><strong>Property taxes:</strong> Annual statement from county</li>
              <li><strong>Charitable donations:</strong> Receipts from qualified organizations</li>
              <li><strong>Medical expenses:</strong> Receipts exceeding 7.5% of AGI</li>
              <li><strong>Education expenses:</strong> Form 1098-T from school</li>
              <li><strong>Child care:</strong> Provider name, address, tax ID, amounts paid</li>
              <li><strong>Retirement contributions:</strong> IRA, 401(k) contribution records</li>
            </ul>
          </div>

          <div className="card">
            <h4 className="card-title">Personal Information</h4>
            <ul>
              <li>Social Security numbers for you, spouse, dependents</li>
              <li>Bank account and routing numbers (for direct deposit)</li>
              <li>Prior year tax return (for reference)</li>
              <li>Identity Protection PIN (if issued)</li>
            </ul>
          </div>

          <h3 style={{ marginTop: '32px' }}>Filing Status</h3>
          <p>Choose the status that applies to you:</p>
          <ul>
            <li><strong>Single:</strong> Unmarried, divorced, or legally separated</li>
            <li><strong>Married Filing Jointly:</strong> Married couples filing one return</li>
            <li><strong>Married Filing Separately:</strong> Married but filing individual returns</li>
            <li><strong>Head of Household:</strong> Unmarried and supporting a dependent</li>
            <li><strong>Qualifying Surviving Spouse:</strong> Spouse died in prior 2 years with dependent child</li>
          </ul>

          <h3 style={{ marginTop: '32px' }}>After You File</h3>
          <ul>
            <li><strong>Confirmation:</strong> Receive acknowledgment within 24-48 hours</li>
            <li><strong>Track refund:</strong> Check status online after 24 hours (e-file) or 4 weeks (paper)</li>
            <li><strong>Payment due:</strong> Pay by April 15 to avoid penalties and interest</li>
            <li><strong>Amend return:</strong> File Form 1040-X if you discover errors</li>
            <li><strong>Keep records:</strong> Retain return and documents for 3-7 years</li>
          </ul>

          <div className="info-box" style={{ marginTop: '24px' }}>
            <h4>Free Tax Assistance</h4>
            <p>Volunteer Income Tax Assistance (VITA) and Tax Counseling for the Elderly (TCE) programs offer free help to qualifying taxpayers. Call 1-800-TAX-HELP to find a location near you.</p>
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
      case 'Tax Payments':
        return {
          description: 'Make tax payments, set up payment plans, and manage your account.',
          services: ['Pay Online by Bank Account or Card', 'Payment Plans & Installment Agreements', 'Estimated Tax Payments', 'Payment History'],
          contact: 'For payment assistance: Call 1-800-TAX-HELP or visit revenue.gov.py'
        };
      case 'Refund Status':
        return {
          description: 'Check the status of your tax refund and update direct deposit information.',
          services: ['Track Refund Status', 'Update Bank Information', 'Refund Schedule', 'Amended Return Status'],
          contact: 'For refund inquiries: Call 1-800-TAX-HELP or use online refund tracker'
        };
      default:
        return {
          description: 'This service is being developed to serve you better.',
          services: [],
          contact: 'For assistance, contact the Revenue Department'
        };
    }
  };

  const info = getServiceInfo();

  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/revenue">Home</Link> / {title}
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
              background: 'rgba(5, 150, 105, 0.05)',
              borderRadius: '10px',
              fontSize: '13px',
              color: 'var(--text-muted)'
            }}>
              {info.contact}
            </div>

            <div style={{ marginTop: '32px' }}>
              <h4 style={{ fontSize: '14px', marginBottom: '12px' }}>Related Services</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                <Link to="/revenue/file" style={{
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
                  File Tax Return
                </Link>
                <button
                  onClick={() => navigate('/revenue')}
                  className="btn btn-secondary"
                  style={{ fontSize: '13px', padding: '14px' }}
                >
                  Return to Revenue Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
