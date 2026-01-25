import React, { useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import './Department.css'

// CTB-specific subpages would be imported here
// import Licensing from './ctb/Licensing'

export default function CTB() {
  const navigate = useNavigate()

  useEffect(() => {
    document.body.classList.add('theme-ctb')
    return () => document.body.classList.remove('theme-ctb')
  }, [])

  return (
    <>
      <header className="dept-header">
        <div className="container">
          <Link to="/ctb" className="dept-logo">
            <div className="logo-mark">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
                <path d="M12 3.5 6 6.75v3.6c0 3.12 2.52 6.25 6 7.9 3.48-1.65 6-4.78 6-7.9v-3.6z"/>
                <path d="M12 6.5c-.8 1.45-1.26 3.11-1.26 4.74 0 .53.03 1.05.1 1.56"/>
                <path d="M12 6.5c.8 1.45 1.26 3.11 1.26 4.74 0 .53-.03 1.05-.1 1.56"/>
                <path d="M9.75 12.4c.7.34 1.46.53 2.25.53.79 0 1.55-.19 2.25-.53"/>
              </svg>
            </div>
            <div className="logo-text">
              <h1>Cannabis Tax Bureau</h1>
              <span className="tagline">Republic of Praya</span>
            </div>
          </Link>
          <nav className="nav">
            <Link to="/ctb" className="nav-link">Home</Link>
            <Link to="/ctb/licensing" className="nav-link">Licensing</Link>
            <Link to="/ctb/taxation" className="nav-link">Taxation</Link>
            <Link to="/ctb/compliance" className="nav-link">Compliance</Link>
            <Link to="/ctb/research" className="nav-link">Research</Link>
          </nav>
        </div>
      </header>

      <Routes>
        <Route index element={<CTBHome navigate={navigate} />} />
        <Route path="licensing" element={<CTBLicensing />} />
        <Route path="taxation" element={<Taxation />} />
        <Route path="compliance" element={<Compliance />} />
        <Route path="research" element={<Research />} />
      </Routes>

      <footer className="dept-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <h4>Cannabis Tax Bureau</h4>
              <p>Regulating and supporting the legal cannabis industry in the Republic of Praya since 2020.</p>
            </div>
            <div className="footer-section">
              <h5>Services</h5>
              <ul>
                <li><Link to="/ctb/licensing">Licensing</Link></li>
                <li><Link to="/ctb/taxation">Tax Filing</Link></li>
                <li><Link to="/ctb/compliance">Compliance</Link></li>
                <li><Link to="/ctb/research">Research & Data</Link></li>
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
            <span>&copy; 2024 Republic of Praya. Cannabis Tax Bureau.</span>
          </div>
        </div>
      </footer>
    </>
  )
}

function CTBHome({ navigate }) {
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
                <path d="M12 3.5 6 6.75v3.6c0 3.12 2.52 6.25 6 7.9 3.48-1.65 6-4.78 6-7.9v-3.6z"/>
              </svg>
              Cannabis Regulation
            </div>
            <h2>Regulating Cannabis for a <span>Better Tomorrow</span></h2>
            <p>The Cannabis Tax Bureau oversees all licensing, taxation, and compliance for the legal cannabis industry in the Republic of Praya, ensuring safe and regulated access.</p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => navigate('/ctb/licensing')}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <line x1="3" y1="9" x2="21" y2="9"/>
                </svg>
                Apply for License
              </button>
              <button className="btn btn-secondary" onClick={() => navigate('/ctb/taxation')}>
                File Taxes
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="financial-display">
              <div className="display-label">Annual Tax Revenue</div>
              <div className="display-value">$84M</div>
              <div className="display-stats">
                <div>
                  <div className="display-stat-label">Active Licenses</div>
                  <div className="display-stat-value">1,247</div>
                </div>
                <div>
                  <div className="display-stat-label">Compliance Rate</div>
                  <div className="display-stat-value">97.2%</div>
                </div>
                <div>
                  <div className="display-stat-label">Market Growth</div>
                  <div className="display-stat-value">+12%</div>
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
              <span className="stat-label">Active Licenses</span>
              <span className="stat-value">1,247</span>
              <span className="stat-change">+12% YoY</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Tax Revenue</span>
              <span className="stat-value">$84M</span>
              <span className="stat-change">FY 2024</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Compliance Rate</span>
              <span className="stat-value">97.2%</span>
              <span className="stat-change">Industry avg</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Processing Time</span>
              <span className="stat-value">14</span>
              <span className="stat-change">Avg days</span>
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
                  <h3 className="card-title">License Types</h3>
                  <Link to="/ctb/licensing" className="card-link">View All</Link>
                </div>
                <div className="license-grid">
                  <div className="license-card">
                    <div className="license-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                      </svg>
                    </div>
                    <h4>Cultivation License</h4>
                    <span className="code">CTB-CUL</span>
                    <p>For growing and harvesting cannabis plants.</p>
                    <button className="btn btn-primary btn-sm" onClick={() => navigate('/ctb/licensing')}>Apply</button>
                  </div>
                  <div className="license-card">
                    <div className="license-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                        <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
                      </svg>
                    </div>
                    <h4>Retail License</h4>
                    <span className="code">CTB-RET</span>
                    <p>For operating retail dispensaries.</p>
                    <button className="btn btn-primary btn-sm" onClick={() => navigate('/ctb/licensing')}>Apply</button>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Latest News</h3>
                </div>
                <div className="news-item">
                  <span className="news-date">Nov 15, 2024</span>
                  <h4 className="news-title">Q4 Tax Filing Deadline Approaching</h4>
                  <p className="news-excerpt">All licensed operators must submit quarterly tax filings by December 15th.</p>
                </div>
                <div className="news-item">
                  <span className="news-date">Nov 10, 2024</span>
                  <h4 className="news-title">New Compliance Guidelines Released</h4>
                  <p className="news-excerpt">Updated packaging and labeling requirements effective January 2025.</p>
                </div>
              </div>
            </div>

            <aside className="sidebar">
              <div className="tax-box">
                <span className="tax-label">
                  Current Excise Rate
                  <span className="live-indicator">LIVE</span>
                </span>
                <span className="tax-rate">15<span className="percent">%</span></span>
                <span className="tax-date">Effective Jan 1, 2024</span>
              </div>

              <div className="card">
                <h4 className="card-title">Quick Links</h4>
                <div className="quick-link" onClick={() => navigate('/ctb/licensing')}>
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                      <polyline points="14,2 14,8 20,8"/>
                    </svg>
                  </span>
                  Apply for License
                </div>
                <div className="quick-link" onClick={() => navigate('/ctb/taxation')}>
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                      <line x1="1" y1="10" x2="23" y2="10"/>
                    </svg>
                  </span>
                  File Tax Return
                </div>
                <div className="quick-link" onClick={() => navigate('/ctb/compliance')}>
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                      <polyline points="22,4 12,14.01 9,11.01"/>
                    </svg>
                  </span>
                  Check Compliance
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  )
}

function CTBLicensing() {
  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/ctb">Home</Link> / Licensing
          </div>
          <h1>Cannabis Licensing</h1>
          <p className="subtitle">Apply for and manage your cannabis business licenses</p>
        </div>
      </div>
      <div className="container">
        <div className="content-text">
          <h3>Available License Types</h3>
          <p>The Cannabis Tax Bureau offers several license categories for cannabis businesses:</p>
          <ul>
            <li><strong>Cultivation License (CTB-CUL)</strong> - For growing cannabis plants</li>
            <li><strong>Processing License (CTB-PRO)</strong> - For manufacturing cannabis products</li>
            <li><strong>Retail License (CTB-RET)</strong> - For operating dispensaries</li>
            <li><strong>Testing License (CTB-TST)</strong> - For laboratory testing services</li>
          </ul>

          <div className="info-box">
            <h4>Application Requirements</h4>
            <p>All applicants must pass a background check, submit a business plan, and demonstrate adequate capitalization.</p>
          </div>

          <h3>How to Apply</h3>
          <p>License applications are submitted through the online portal. Processing typically takes 14-21 business days.</p>

          <div className="card" style={{ marginTop: '24px' }}>
            <h4 className="card-title">Start Your Application</h4>
            <p style={{ marginBottom: '16px', color: 'var(--text-muted)' }}>Select the license type you wish to apply for:</p>
            <div className="license-grid">
              <div className="license-card">
                <h4>Cultivation</h4>
                <p>Grow and harvest cannabis</p>
                <button className="btn btn-primary btn-sm">Apply Now</button>
              </div>
              <div className="license-card">
                <h4>Processing</h4>
                <p>Manufacture products</p>
                <button className="btn btn-primary btn-sm">Apply Now</button>
              </div>
              <div className="license-card">
                <h4>Retail</h4>
                <p>Operate a dispensary</p>
                <button className="btn btn-primary btn-sm">Apply Now</button>
              </div>
              <div className="license-card">
                <h4>Testing</h4>
                <p>Lab testing services</p>
                <button className="btn btn-primary btn-sm">Apply Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

function Taxation() {
  const [section, setSection] = React.useState('filing');

  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/ctb">Home</Link> / Taxation
          </div>
          <h1>Cannabis Taxation</h1>
          <p className="subtitle">File and manage tax returns, view current rates, and access tax resources</p>
        </div>
      </div>
      <div className="container">
        <div className="content-text">
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setSection('filing')}
                className={section === 'filing' ? 'btn btn-primary' : 'btn btn-secondary'}
                style={{ fontSize: '13px', padding: '10px 20px' }}
              >
                Tax Filing
              </button>
              <button
                onClick={() => setSection('rates')}
                className={section === 'rates' ? 'btn btn-primary' : 'btn btn-secondary'}
                style={{ fontSize: '13px', padding: '10px 20px' }}
              >
                Tax Rates
              </button>
              <button
                onClick={() => setSection('calculator')}
                className={section === 'calculator' ? 'btn btn-primary' : 'btn btn-secondary'}
                style={{ fontSize: '13px', padding: '10px 20px' }}
              >
                Tax Calculator
              </button>
              <button
                onClick={() => setSection('payment')}
                className={section === 'payment' ? 'btn btn-primary' : 'btn btn-secondary'}
                style={{ fontSize: '13px', padding: '10px 20px' }}
              >
                Payment & History
              </button>
            </div>
          </div>

          {section === 'filing' && (
            <>
              <div className="card">
                <h3 className="card-title">Quarterly Tax Filing</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
                  All licensed cannabis businesses must file quarterly tax returns with the Cannabis Tax Bureau.
                </p>

                <h4>Filing Deadlines (2024)</h4>
                <div style={{ marginBottom: '20px' }}>
                  <ul>
                    <li><strong>Q1 (Jan-Mar):</strong> Due April 15, 2024</li>
                    <li><strong>Q2 (Apr-Jun):</strong> Due July 15, 2024</li>
                    <li><strong>Q3 (Jul-Sep):</strong> Due October 15, 2024</li>
                    <li><strong>Q4 (Oct-Dec):</strong> Due January 15, 2025</li>
                  </ul>
                </div>

                <h4>Required Information</h4>
                <ul>
                  <li>Total gross receipts from cannabis sales</li>
                  <li>Itemized deductions (cultivation, processing, retail costs)</li>
                  <li>Excise tax calculation (15% of gross receipts)</li>
                  <li>License number and business identification</li>
                  <li>Supporting financial documents (sales records, invoices)</li>
                </ul>

                <h4 style={{ marginTop: '24px' }}>How to File</h4>
                <ol style={{ marginBottom: '20px' }}>
                  <li><strong>Login to Portal:</strong> Access CTB Tax Portal at tax.ctb.gov.py</li>
                  <li><strong>Select Quarter:</strong> Choose the quarter you're filing for</li>
                  <li><strong>Enter Financial Data:</strong> Input gross receipts and deductions</li>
                  <li><strong>Review Calculation:</strong> Verify tax amount calculated by system</li>
                  <li><strong>Submit Return:</strong> Complete and submit electronically</li>
                  <li><strong>Make Payment:</strong> Pay via electronic funds transfer or check</li>
                  <li><strong>Confirmation:</strong> Receive confirmation number and receipt</li>
                </ol>

                <div className="info-box" style={{ background: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.3)' }}>
                  <h4 style={{ color: '#dc2626' }}>Late Filing Penalties</h4>
                  <p>Late returns incur a penalty of 5% of tax due per month, up to 25% maximum. File on time to avoid penalties and maintain good standing with CTB.</p>
                </div>
              </div>

              <div className="card">
                <h4 className="card-title">Extension Requests</h4>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                  Need more time to file?
                </p>
                <ul>
                  <li>File extension request before deadline (Form CTB-EXT)</li>
                  <li>Automatic 30-day extension granted if requested in time</li>
                  <li>Payment still due by original deadline to avoid interest</li>
                  <li>Only one extension allowed per quarter</li>
                </ul>
              </div>
            </>
          )}

          {section === 'rates' && (
            <>
              <div className="card">
                <h3 className="card-title">Current Tax Rates</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
                  Tax rates for cannabis products in the Republic of Praya, effective January 1, 2024.
                </p>

                <div style={{ padding: '24px', background: 'rgba(45, 134, 89, 0.1)', borderRadius: '12px', marginBottom: '24px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '48px', fontWeight: '700', color: '#2d8659', marginBottom: '8px' }}>15%</div>
                    <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>Excise Tax Rate</div>
                    <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Applied to gross receipts</div>
                  </div>
                </div>

                <h4>Tax Structure Breakdown</h4>

                <div style={{ marginBottom: '20px' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>Excise Tax (15%)</h5>
                  <ul>
                    <li>Applies to all licensed cannabis sales</li>
                    <li>Calculated on gross receipts before deductions</li>
                    <li>Same rate for cultivation, processing, and retail</li>
                    <li>Collected at point of retail sale</li>
                  </ul>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>Sales Tax (8%)</h5>
                  <ul>
                    <li>Standard Prayan sales tax applies</li>
                    <li>Calculated on final retail price (after excise tax)</li>
                    <li>Collected by retailer, remitted to Treasury Department</li>
                    <li>Same as other retail goods</li>
                  </ul>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>Local Taxes (0-5%)</h5>
                  <ul>
                    <li>Optional local municipality tax</li>
                    <li>Varies by city/county (0% to 5%)</li>
                    <li>Added to state taxes at point of sale</li>
                    <li>Check with local government for rates</li>
                  </ul>
                </div>

                <h4 style={{ marginTop: '24px' }}>Effective Total Tax Rate</h4>
                <div style={{ fontSize: '14px', fontFamily: 'monospace', background: 'var(--bg-elevated)', padding: '16px', borderRadius: '8px' }}>
                  <div>Product Price: $100</div>
                  <div>Excise Tax (15%): $15</div>
                  <div>Subtotal: $115</div>
                  <div>Sales Tax (8% of $115): $9.20</div>
                  <div>Local Tax (2% of $115): $2.30</div>
                  <div style={{ borderTop: '1px solid var(--border-subtle)', marginTop: '8px', paddingTop: '8px', fontWeight: 'bold' }}>
                    Total Price: $126.50 (26.5% total tax)
                  </div>
                </div>
              </div>

              <div className="card">
                <h4 className="card-title">Tax Revenue Allocation</h4>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                  Cannabis tax revenue is allocated as follows:
                </p>
                <ul>
                  <li><strong>40%</strong> - Public education and schools</li>
                  <li><strong>25%</strong> - Healthcare and addiction treatment programs</li>
                  <li><strong>20%</strong> - Law enforcement and regulatory operations</li>
                  <li><strong>10%</strong> - Community development and reinvestment</li>
                  <li><strong>5%</strong> - Cannabis research and studies</li>
                </ul>
              </div>
            </>
          )}

          {section === 'calculator' && (
            <>
              <div className="card">
                <h3 className="card-title">Tax Calculator</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
                  Estimate your quarterly cannabis tax liability.
                </p>

                <div style={{ padding: '20px', background: 'var(--bg-elevated)', borderRadius: '10px', marginBottom: '20px' }}>
                  <h5 style={{ fontSize: '14px', marginBottom: '16px' }}>Calculate Your Excise Tax</h5>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '4px' }}>Gross Receipts (Quarterly)</label>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>Total revenue from cannabis sales before deductions</div>
                    <input type="text" placeholder="$0.00" style={{ width: '100%', padding: '10px', fontSize: '14px', border: '1px solid var(--border-subtle)', borderRadius: '6px' }} />
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '4px' }}>Deductible Expenses</label>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>Business expenses (cultivation, processing, labor costs)</div>
                    <input type="text" placeholder="$0.00" style={{ width: '100%', padding: '10px', fontSize: '14px', border: '1px solid var(--border-subtle)', borderRadius: '6px' }} />
                  </div>

                  <button className="btn btn-primary" style={{ width: '100%' }}>Calculate Tax</button>
                </div>

                <h4>Example Calculations</h4>

                <div style={{ marginBottom: '16px', padding: '16px', background: 'var(--bg-elevated)', borderRadius: '8px' }}>
                  <h5 style={{ fontSize: '14px', marginBottom: '12px' }}>Small Retail Dispensary</h5>
                  <div style={{ fontSize: '13px', fontFamily: 'monospace' }}>
                    <div style={{ marginBottom: '4px' }}>Quarterly Gross Receipts: $75,000</div>
                    <div style={{ marginBottom: '4px' }}>Excise Tax (15%): <strong>$11,250</strong></div>
                    <div style={{ marginTop: '8px', color: 'var(--text-muted)' }}>Estimated payment due quarterly</div>
                  </div>
                </div>

                <div style={{ marginBottom: '16px', padding: '16px', background: 'var(--bg-elevated)', borderRadius: '8px' }}>
                  <h5 style={{ fontSize: '14px', marginBottom: '12px' }}>Medium Cultivation Operation</h5>
                  <div style={{ fontSize: '13px', fontFamily: 'monospace' }}>
                    <div style={{ marginBottom: '4px' }}>Quarterly Gross Receipts: $250,000</div>
                    <div style={{ marginBottom: '4px' }}>Excise Tax (15%): <strong>$37,500</strong></div>
                    <div style={{ marginTop: '8px', color: 'var(--text-muted)' }}>Estimated payment due quarterly</div>
                  </div>
                </div>

                <div style={{ marginBottom: '16px', padding: '16px', background: 'var(--bg-elevated)', borderRadius: '8px' }}>
                  <h5 style={{ fontSize: '14px', marginBottom: '12px' }}>Large Processing Facility</h5>
                  <div style={{ fontSize: '13px', fontFamily: 'monospace' }}>
                    <div style={{ marginBottom: '4px' }}>Quarterly Gross Receipts: $500,000</div>
                    <div style={{ marginBottom: '4px' }}>Excise Tax (15%): <strong>$75,000</strong></div>
                    <div style={{ marginTop: '8px', color: 'var(--text-muted)' }}>Estimated payment due quarterly</div>
                  </div>
                </div>
              </div>

              <div className="info-box">
                <h4>Tax Planning Assistance</h4>
                <p>For help with tax calculations and planning, schedule a consultation with a CTB tax specialist. Call 1-800-PRAYA-TAX or email tax@ctb.gov.py to book an appointment.</p>
              </div>
            </>
          )}

          {section === 'payment' && (
            <>
              <div className="card">
                <h3 className="card-title">Payment Options</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
                  Multiple ways to pay your cannabis excise tax.
                </p>

                <div style={{ marginBottom: '20px' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>Electronic Funds Transfer (EFT)</h5>
                  <ul>
                    <li>Fastest and most secure payment method</li>
                    <li>Automatic withdrawal from business bank account</li>
                    <li>No transaction fee</li>
                    <li>Payment posts same business day</li>
                    <li>Setup EFT through CTB Tax Portal</li>
                  </ul>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>Credit/Debit Card</h5>
                  <ul>
                    <li>Pay online through CTB portal</li>
                    <li>Convenience fee: 2.5% of payment amount</li>
                    <li>Instant confirmation</li>
                    <li>Available 24/7</li>
                  </ul>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>Check or Money Order</h5>
                  <ul>
                    <li>Mail to: CTB Tax Division, PO Box 12345, Praya City, PC 00001</li>
                    <li>Include payment voucher from tax return</li>
                    <li>Allow 5-7 business days for processing</li>
                    <li>Postmark date is payment date</li>
                  </ul>
                </div>

                <h4 style={{ marginTop: '24px' }}>Payment History</h4>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                  View your payment history online:
                </p>
                <ul>
                  <li>Login to CTB Tax Portal</li>
                  <li>Navigate to "Payment History"</li>
                  <li>View all payments for past 7 years</li>
                  <li>Download receipts and confirmation letters</li>
                  <li>Track pending payments and refunds</li>
                </ul>
              </div>

              <div className="card">
                <h4 className="card-title">Payment Plans</h4>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                  Experiencing financial hardship?
                </p>
                <ul>
                  <li>Request installment payment plan (Form CTB-PAY)</li>
                  <li>Available for balances over $5,000</li>
                  <li>Up to 12 months to pay</li>
                  <li>Interest charges apply (6% APR)</li>
                  <li>Must file return on time to qualify</li>
                  <li>Approval at CTB's discretion</li>
                </ul>
              </div>

              <div className="info-box">
                <h4>Payment Questions?</h4>
                <p>For assistance with payments or to check payment status, contact CTB Tax Division at 1-800-PRAYA-TAX (Monday-Friday 8:00 AM - 5:00 PM) or email tax@ctb.gov.py.</p>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

function Compliance() {
  const [topic, setTopic] = React.useState('checklist');

  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/ctb">Home</Link> / Compliance
          </div>
          <h1>Regulatory Compliance</h1>
          <p className="subtitle">Guidelines, inspections, and requirements for licensed operators</p>
        </div>
      </div>
      <div className="container">
        <div className="content-text">
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setTopic('checklist')}
                className={topic === 'checklist' ? 'btn btn-primary' : 'btn btn-secondary'}
                style={{ fontSize: '13px', padding: '10px 20px' }}
              >
                Compliance Checklist
              </button>
              <button
                onClick={() => setTopic('inspections')}
                className={topic === 'inspections' ? 'btn btn-primary' : 'btn btn-secondary'}
                style={{ fontSize: '13px', padding: '10px 20px' }}
              >
                Inspections
              </button>
              <button
                onClick={() => setTopic('violations')}
                className={topic === 'violations' ? 'btn btn-primary' : 'btn btn-secondary'}
                style={{ fontSize: '13px', padding: '10px 20px' }}
              >
                Violations & Penalties
              </button>
              <button
                onClick={() => setTopic('best-practices')}
                className={topic === 'best-practices' ? 'btn btn-primary' : 'btn btn-secondary'}
                style={{ fontSize: '13px', padding: '10px 20px' }}
              >
                Best Practices
              </button>
            </div>
          </div>

          {topic === 'checklist' && (
            <>
              <div className="card">
                <h3 className="card-title">Compliance Checklist</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
                  Essential compliance requirements for all licensed cannabis businesses.
                </p>

                <h4>Licensing & Permits</h4>
                <ul>
                  <li>✓ Current CTB license displayed at facility</li>
                  <li>✓ License renewal submitted 60 days before expiration</li>
                  <li>✓ All ownership changes reported within 30 days</li>
                  <li>✓ Additional permits (local, zoning) up to date</li>
                  <li>✓ Background checks current for all key personnel</li>
                </ul>

                <h4 style={{ marginTop: '20px' }}>Product Requirements</h4>
                <ul>
                  <li>✓ All products lab tested for potency and contaminants</li>
                  <li>✓ Proper packaging (child-resistant, opaque)</li>
                  <li>✓ Required label information (THC/CBD %, warnings, batch number)</li>
                  <li>✓ Product tracking from seed to sale</li>
                  <li>✓ No products exceeding THC limits (edibles: 10mg/serving, 100mg/package)</li>
                </ul>

                <h4 style={{ marginTop: '20px' }}>Record Keeping</h4>
                <ul>
                  <li>✓ Daily sales records maintained</li>
                  <li>✓ Inventory tracking system operational</li>
                  <li>✓ Employee records (training, certifications)</li>
                  <li>✓ Security logs and incident reports</li>
                  <li>✓ All records retained for minimum 7 years</li>
                </ul>

                <h4 style={{ marginTop: '20px' }}>Security</h4>
                <ul>
                  <li>✓ Video surveillance covering all critical areas</li>
                  <li>✓ Security cameras retain footage minimum 90 days</li>
                  <li>✓ Alarm system connected to monitoring service</li>
                  <li>✓ Restricted access to cultivation/storage areas</li>
                  <li>✓ Cash handling procedures documented and followed</li>
                </ul>

                <h4 style={{ marginTop: '20px' }}>Employee Compliance</h4>
                <ul>
                  <li>✓ All employees have valid cannabis worker permits</li>
                  <li>✓ Employee training completed (responsible vendor, safety)</li>
                  <li>✓ Age verification procedures in place (21+)</li>
                  <li>✓ No sales to intoxicated persons</li>
                  <li>✓ Quantity limits enforced (1 oz per transaction for flower)</li>
                </ul>
              </div>

              <div className="info-box">
                <h4>Download Checklist</h4>
                <p>Download the complete compliance checklist (PDF) at ctb.gov.py/compliance or request a printed copy by calling 1-800-PRAYA-CTB.</p>
              </div>
            </>
          )}

          {topic === 'inspections' && (
            <>
              <div className="card">
                <h3 className="card-title">CTB Inspections</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
                  What to expect during routine and random inspections.
                </p>

                <h4>Inspection Types</h4>

                <div style={{ marginBottom: '20px' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>Routine Inspections</h5>
                  <ul>
                    <li>Scheduled annually for all license holders</li>
                    <li>Notice provided 7-14 days in advance</li>
                    <li>Comprehensive review of operations, records, facilities</li>
                    <li>Duration: 2-4 hours depending on operation size</li>
                    <li>Inspector will review findings before leaving</li>
                  </ul>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>Random Inspections</h5>
                  <ul>
                    <li>Unannounced visits conducted quarterly</li>
                    <li>Focus on product compliance and sales procedures</li>
                    <li>Typically 30-60 minutes</li>
                    <li>May include mystery shopper compliance checks</li>
                  </ul>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>Complaint-Based Inspections</h5>
                  <ul>
                    <li>Triggered by consumer or public complaints</li>
                    <li>Unannounced</li>
                    <li>Focused on specific allegations</li>
                    <li>Results may lead to enforcement action</li>
                  </ul>
                </div>

                <h4 style={{ marginTop: '24px' }}>What Inspectors Check</h4>
                <ul>
                  <li><strong>Licensing:</strong> License displayed, expiration date, ownership accuracy</li>
                  <li><strong>Security:</strong> Camera functionality, alarm system, access controls</li>
                  <li><strong>Products:</strong> Lab testing, packaging, labeling, storage</li>
                  <li><strong>Records:</strong> Sales logs, inventory tracking, employee files</li>
                  <li><strong>Facilities:</strong> Cleanliness, safety, zoning compliance</li>
                  <li><strong>Employees:</strong> Worker permits, training records, sales procedures</li>
                </ul>

                <h4 style={{ marginTop: '24px' }}>Preparing for an Inspection</h4>
                <ol>
                  <li>Keep all licenses and permits current and displayed</li>
                  <li>Maintain organized records (digital and physical)</li>
                  <li>Ensure security systems are operational</li>
                  <li>Train staff on inspection procedures</li>
                  <li>Conduct regular self-audits using CTB checklist</li>
                  <li>Designate a compliance officer to interface with inspectors</li>
                </ol>
              </div>

              <div className="card">
                <h4 className="card-title">After the Inspection</h4>
                <ul>
                  <li><strong>Inspection Report:</strong> Receive written report within 10 business days</li>
                  <li><strong>Violations:</strong> Notified of any compliance issues found</li>
                  <li><strong>Corrective Action:</strong> Timeline provided to remedy violations (typically 30 days)</li>
                  <li><strong>Follow-Up:</strong> Re-inspection may be required to verify corrections</li>
                  <li><strong>Appeal Rights:</strong> Can appeal findings within 30 days</li>
                </ul>
              </div>
            </>
          )}

          {topic === 'violations' && (
            <>
              <div className="card">
                <h3 className="card-title">Violations & Penalties</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
                  Understanding violations and enforcement actions.
                </p>

                <h4>Violation Categories</h4>

                <div style={{ marginBottom: '20px', padding: '16px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px', color: '#dc2626' }}>Class A Violations (Critical)</h5>
                  <ul style={{ marginBottom: '8px' }}>
                    <li>Sale to minors (under 21)</li>
                    <li>Operating without valid license</li>
                    <li>Product diversion to black market</li>
                    <li>Pesticide violations (unapproved chemicals)</li>
                    <li>Failure to test products</li>
                  </ul>
                  <div style={{ fontSize: '13px', color: '#dc2626', fontWeight: '600' }}>
                    Penalty: License suspension or revocation, fines $10,000-50,000
                  </div>
                </div>

                <div style={{ marginBottom: '20px', padding: '16px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '8px', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px', color: '#f59e0b' }}>Class B Violations (Serious)</h5>
                  <ul style={{ marginBottom: '8px' }}>
                    <li>Improper packaging or labeling</li>
                    <li>Inadequate security measures</li>
                    <li>Failure to maintain required records</li>
                    <li>Late tax filing (repeated)</li>
                    <li>Quantity limit violations</li>
                  </ul>
                  <div style={{ fontSize: '13px', color: '#f59e0b', fontWeight: '600' }}>
                    Penalty: Fines $1,000-10,000, license suspension possible
                  </div>
                </div>

                <div style={{ marginBottom: '20px', padding: '16px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px', color: '#3b82f6' }}>Class C Violations (Minor)</h5>
                  <ul style={{ marginBottom: '8px' }}>
                    <li>Missing or incorrect signage</li>
                    <li>Minor record-keeping errors</li>
                    <li>Late license renewal (first offense)</li>
                    <li>Advertising violations</li>
                    <li>Employee permit issues</li>
                  </ul>
                  <div style={{ fontSize: '13px', color: '#3b82f6', fontWeight: '600' }}>
                    Penalty: Warning or fine $250-1,000, corrective action required
                  </div>
                </div>

                <h4 style={{ marginTop: '24px' }}>Enforcement Process</h4>
                <ol>
                  <li><strong>Notice of Violation:</strong> Issued detailing violations found</li>
                  <li><strong>Response Period:</strong> 15 days to respond or request hearing</li>
                  <li><strong>Hearing (if requested):</strong> Present your case to CTB hearing officer</li>
                  <li><strong>Decision:</strong> CTB issues final decision within 30 days</li>
                  <li><strong>Penalty:</strong> Fine, suspension, or revocation imposed</li>
                  <li><strong>Appeal:</strong> Can appeal to Administrative Court within 30 days</li>
                </ol>

                <h4 style={{ marginTop: '24px' }}>Violation Reporting</h4>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                  Report suspected violations:
                </p>
                <ul>
                  <li>Online: ctb.gov.py/report-violation</li>
                  <li>Phone: 1-800-REPORT-CTB (hotline, anonymous)</li>
                  <li>Email: violations@ctb.gov.py</li>
                  <li>Whistleblower protections apply</li>
                </ul>
              </div>

              <div className="info-box">
                <h4>Compliance Assistance</h4>
                <p>Avoiding violations starts with understanding the rules. CTB offers free compliance training and consultations. Contact compliance@ctb.gov.py to schedule training for your staff.</p>
              </div>
            </>
          )}

          {topic === 'best-practices' && (
            <>
              <div className="card">
                <h3 className="card-title">Best Practices Guide</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
                  Industry best practices for maintaining compliance and operational excellence.
                </p>

                <h4>Operational Excellence</h4>
                <ul>
                  <li><strong>Standard Operating Procedures (SOPs):</strong> Document all processes</li>
                  <li><strong>Quality Control:</strong> Implement batch testing beyond minimum requirements</li>
                  <li><strong>Inventory Management:</strong> Use RFID or barcode tracking for accuracy</li>
                  <li><strong>Employee Training:</strong> Monthly compliance updates and refresher training</li>
                  <li><strong>Self-Audits:</strong> Conduct quarterly internal compliance audits</li>
                </ul>

                <h4 style={{ marginTop: '20px' }}>Customer Service</h4>
                <ul>
                  <li><strong>Education:</strong> Train staff as product educators, not just salespeople</li>
                  <li><strong>Age Verification:</strong> Check ID for anyone appearing under 30</li>
                  <li><strong>Responsible Sales:</strong> Refuse sales if customer appears intoxicated</li>
                  <li><strong>Product Knowledge:</strong> Staff should understand dosing and effects</li>
                  <li><strong>Customer Feedback:</strong> Implement feedback system for continuous improvement</li>
                </ul>

                <h4 style={{ marginTop: '20px' }}>Security Best Practices</h4>
                <ul>
                  <li><strong>Cameras:</strong> High-definition, covering all angles, with backup power</li>
                  <li><strong>Access Control:</strong> Keycard or biometric systems for restricted areas</li>
                  <li><strong>Cash Management:</strong> Daily bank deposits, safe with time delay</li>
                  <li><strong>Transport:</strong> Use licensed, armored transport for product movement</li>
                  <li><strong>Incident Response:</strong> Written protocols for robberies, emergencies</li>
                </ul>

                <h4 style={{ marginTop: '20px' }}>Product Quality</h4>
                <ul>
                  <li><strong>Testing:</strong> Test every batch, from every supplier</li>
                  <li><strong>Storage:</strong> Climate-controlled, proper humidity (55-62% RH)</li>
                  <li><strong>Rotation:</strong> First-in, first-out inventory management</li>
                  <li><strong>Supplier Vetting:</strong> Only work with licensed, reputable suppliers</li>
                  <li><strong>Traceability:</strong> Track products from source to customer</li>
                </ul>

                <h4 style={{ marginTop: '20px' }}>Community Relations</h4>
                <ul>
                  <li><strong>Good Neighbor:</strong> Maintain clean, professional facilities</li>
                  <li><strong>Community Engagement:</strong> Support local causes and charities</li>
                  <li><strong>Transparent Operations:</strong> Host tours for local officials, residents</li>
                  <li><strong>Odor Control:</strong> Install proper ventilation and filtration</li>
                  <li><strong>Parking/Traffic:</strong> Adequate parking, traffic flow management</li>
                </ul>
              </div>

              <div className="card">
                <h4 className="card-title">Industry Resources</h4>
                <ul>
                  <li><strong>CTB Compliance Manual:</strong> Comprehensive 200-page guide (PDF download)</li>
                  <li><strong>Monthly Webinars:</strong> Free training on regulation updates</li>
                  <li><strong>Industry Association:</strong> Praya Cannabis Association (PCA)</li>
                  <li><strong>Consultation Services:</strong> Schedule one-on-one compliance review</li>
                  <li><strong>Newsletter:</strong> Subscribe to CTB monthly newsletter</li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

function Research() {
  const [category, setCategory] = React.useState('statistics');

  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/ctb">Home</Link> / Research
          </div>
          <h1>Cannabis Research & Data</h1>
          <p className="subtitle">Industry statistics, market research, and policy analysis</p>
        </div>
      </div>
      <div className="container">
        <div className="content-text">
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setCategory('statistics')}
                className={category === 'statistics' ? 'btn btn-primary' : 'btn btn-secondary'}
                style={{ fontSize: '13px', padding: '10px 20px' }}
              >
                Market Statistics
              </button>
              <button
                onClick={() => setCategory('reports')}
                className={category === 'reports' ? 'btn btn-primary' : 'btn btn-secondary'}
                style={{ fontSize: '13px', padding: '10px 20px' }}
              >
                Research Reports
              </button>
              <button
                onClick={() => setCategory('policy')}
                className={category === 'policy' ? 'btn btn-primary' : 'btn btn-secondary'}
                style={{ fontSize: '13px', padding: '10px 20px' }}
              >
                Policy Analysis
              </button>
              <button
                onClick={() => setCategory('trends')}
                className={category === 'trends' ? 'btn btn-primary' : 'btn btn-secondary'}
                style={{ fontSize: '13px', padding: '10px 20px' }}
              >
                Industry Trends
              </button>
            </div>
          </div>

          {category === 'statistics' && (
            <>
              <div className="card">
                <h3 className="card-title">Market Statistics (2024)</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
                  Key metrics and data from the Prayan cannabis industry.
                </p>

                <h4>Industry Overview</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ padding: '16px', background: 'rgba(45, 134, 89, 0.1)', borderRadius: '8px', border: '1px solid rgba(45, 134, 89, 0.3)' }}>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#2d8659', marginBottom: '4px' }}>$420M</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Total Market Size</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>FY 2024 (projected)</div>
                  </div>
                  <div style={{ padding: '16px', background: 'rgba(45, 134, 89, 0.1)', borderRadius: '8px', border: '1px solid rgba(45, 134, 89, 0.3)' }}>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#2d8659', marginBottom: '4px' }}>$84M</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Tax Revenue</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>FY 2024</div>
                  </div>
                  <div style={{ padding: '16px', background: 'rgba(45, 134, 89, 0.1)', borderRadius: '8px', border: '1px solid rgba(45, 134, 89, 0.3)' }}>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#2d8659', marginBottom: '4px' }}>1,247</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Active Licenses</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>+12% vs 2023</div>
                  </div>
                </div>

                <h4>Licenses by Type</h4>
                <div style={{ fontSize: '14px', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: 'var(--bg-elevated)', borderRadius: '8px', marginBottom: '8px' }}>
                    <span>Retail Dispensaries</span>
                    <strong>487 licenses</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: 'var(--bg-elevated)', borderRadius: '8px', marginBottom: '8px' }}>
                    <span>Cultivation Operations</span>
                    <strong>412 licenses</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: 'var(--bg-elevated)', borderRadius: '8px', marginBottom: '8px' }}>
                    <span>Processing Facilities</span>
                    <strong>243 licenses</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: 'var(--bg-elevated)', borderRadius: '8px' }}>
                    <span>Testing Laboratories</span>
                    <strong>105 licenses</strong>
                  </div>
                </div>

                <h4>Sales Data (FY 2024)</h4>
                <ul>
                  <li><strong>Q1 Sales:</strong> $98M (January - March)</li>
                  <li><strong>Q2 Sales:</strong> $105M (April - June)</li>
                  <li><strong>Q3 Sales:</strong> $112M (July - September)</li>
                  <li><strong>Q4 Sales:</strong> $105M est (October - December)</li>
                  <li><strong>Growth Rate:</strong> +18% year-over-year</li>
                </ul>

                <h4 style={{ marginTop: '20px' }}>Product Categories</h4>
                <ul>
                  <li><strong>Flower:</strong> 52% of sales ($218M)</li>
                  <li><strong>Edibles:</strong> 23% of sales ($97M)</li>
                  <li><strong>Concentrates:</strong> 15% of sales ($63M)</li>
                  <li><strong>Other (topicals, tinctures):</strong> 10% of sales ($42M)</li>
                </ul>
              </div>

              <div className="card">
                <h4 className="card-title">Employment Impact</h4>
                <ul>
                  <li><strong>Direct Jobs:</strong> 8,450 employees in licensed cannabis businesses</li>
                  <li><strong>Indirect Jobs:</strong> 3,200 jobs in supporting industries</li>
                  <li><strong>Average Wage:</strong> $18.50/hour (retail), $22/hour (cultivation/processing)</li>
                  <li><strong>Job Growth:</strong> +15% in 2024</li>
                </ul>
              </div>
            </>
          )}

          {category === 'reports' && (
            <>
              <div className="card">
                <h3 className="card-title">Research Reports</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
                  In-depth studies and analysis of the cannabis industry in Praya.
                </p>

                <h4>Recent Publications</h4>

                <div className="card" style={{ background: 'var(--bg-elevated)', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                    <h5 style={{ fontSize: '15px', margin: 0 }}>2024 Annual Market Report</h5>
                    <span style={{ fontSize: '12px', padding: '4px 8px', background: 'rgba(45, 134, 89, 0.2)', color: '#2d8659', borderRadius: '4px' }}>Published Oct 2024</span>
                  </div>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                    Comprehensive analysis of market trends, sales data, and industry growth. 120 pages.
                  </p>
                  <button className="btn btn-secondary btn-sm">Download PDF</button>
                </div>

                <div className="card" style={{ background: 'var(--bg-elevated)', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                    <h5 style={{ fontSize: '15px', margin: 0 }}>Public Health Impact Study</h5>
                    <span style={{ fontSize: '12px', padding: '4px 8px', background: 'rgba(45, 134, 89, 0.2)', color: '#2d8659', borderRadius: '4px' }}>Published Aug 2024</span>
                  </div>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                    Analysis of cannabis legalization effects on public health indicators, conducted with Ministry of Health. 85 pages.
                  </p>
                  <button className="btn btn-secondary btn-sm">Download PDF</button>
                </div>

                <div className="card" style={{ background: 'var(--bg-elevated)', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                    <h5 style={{ fontSize: '15px', margin: 0 }}>Economic Impact Assessment</h5>
                    <span style={{ fontSize: '12px', padding: '4px 8px', background: 'rgba(45, 134, 89, 0.2)', color: '#2d8659', borderRadius: '4px' }}>Published Jun 2024</span>
                  </div>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                    Tax revenue, employment, and economic development impacts of legal cannabis industry. 67 pages.
                  </p>
                  <button className="btn btn-secondary btn-sm">Download PDF</button>
                </div>

                <div className="card" style={{ background: 'var(--bg-elevated)', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                    <h5 style={{ fontSize: '15px', margin: 0 }}>Black Market Analysis</h5>
                    <span style={{ fontSize: '12px', padding: '4px 8px', background: 'rgba(45, 134, 89, 0.2)', color: '#2d8659', borderRadius: '4px' }}>Published Apr 2024</span>
                  </div>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                    Study on reduction in illicit cannabis market since legalization. 42 pages.
                  </p>
                  <button className="btn btn-secondary btn-sm">Download PDF</button>
                </div>

                <div className="card" style={{ background: 'var(--bg-elevated)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                    <h5 style={{ fontSize: '15px', margin: 0 }}>Youth Usage Trends</h5>
                    <span style={{ fontSize: '12px', padding: '4px 8px', background: 'rgba(45, 134, 89, 0.2)', color: '#2d8659', borderRadius: '4px' }}>Published Feb 2024</span>
                  </div>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                    Analysis of cannabis use rates among youth (ages 12-20) pre and post-legalization. 55 pages.
                  </p>
                  <button className="btn btn-secondary btn-sm">Download PDF</button>
                </div>
              </div>

              <div className="info-box">
                <h4>Research Partnerships</h4>
                <p>CTB collaborates with Praya State University, Ministry of Health, and independent research organizations. For research inquiries or data requests, contact research@ctb.gov.py.</p>
              </div>
            </>
          )}

          {category === 'policy' && (
            <>
              <div className="card">
                <h3 className="card-title">Policy Analysis</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
                  Analysis of cannabis policies and regulatory framework in Praya.
                </p>

                <h4>Legalization Timeline</h4>
                <ul>
                  <li><strong>2018:</strong> Referendum passes (62% approval) legalizing adult-use cannabis</li>
                  <li><strong>2019:</strong> Cannabis Tax Bureau established, regulations drafted</li>
                  <li><strong>2020:</strong> First licenses issued, legal sales begin July 1</li>
                  <li><strong>2021-2024:</strong> Market expands, regulations refined based on data</li>
                </ul>

                <h4 style={{ marginTop: '20px' }}>Current Policy Framework</h4>

                <div style={{ marginBottom: '20px' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>Possession Limits</h5>
                  <ul>
                    <li>Adults 21+: Up to 1 ounce (28g) in public</li>
                    <li>At home: Up to 10 ounces (280g)</li>
                    <li>Homegrow: Up to 6 plants per person, 12 per household</li>
                    <li>Gifting: Up to 1 ounce to another adult (no payment)</li>
                  </ul>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>Consumption Restrictions</h5>
                  <ul>
                    <li>No public consumption (must be in private residence)</li>
                    <li>No consumption in vehicles</li>
                    <li>No consumption on federal property</li>
                    <li>Landlords/property owners can prohibit use</li>
                    <li>Employers can maintain drug-free workplace policies</li>
                  </ul>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>DUI Laws</h5>
                  <ul>
                    <li>Illegal to drive under influence of cannabis</li>
                    <li>THC blood limit: 5 nanograms per milliliter</li>
                    <li>Field sobriety tests and blood tests used</li>
                    <li>Penalties: Fine, license suspension, potential jail time</li>
                  </ul>
                </div>

                <h4 style={{ marginTop: '24px' }}>Policy Outcomes (2020-2024)</h4>
                <ul>
                  <li><strong>Black Market:</strong> Estimated 35% reduction in illicit sales</li>
                  <li><strong>Youth Usage:</strong> No statistical increase among ages 12-20</li>
                  <li><strong>DUI Arrests:</strong> Cannabis-involved DUIs up 8% (enforcement improved)</li>
                  <li><strong>Tax Revenue:</strong> $312M collected (2020-2024)</li>
                  <li><strong>Criminal Justice:</strong> 4,200 fewer cannabis possession arrests annually</li>
                  <li><strong>Public Support:</strong> 68% approval rating (2024 survey)</li>
                </ul>
              </div>

              <div className="card">
                <h4 className="card-title">Proposed Policy Changes</h4>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                  Under consideration for 2025:
                </p>
                <ul>
                  <li>Increase homegrow limit to 12 plants per person</li>
                  <li>Allow cannabis cafes/lounges (social consumption)</li>
                  <li>Reduce excise tax to 12% (from 15%)</li>
                  <li>Expand delivery services beyond 10-mile radius</li>
                  <li>Create microbusiness license category</li>
                </ul>
              </div>
            </>
          )}

          {category === 'trends' && (
            <>
              <div className="card">
                <h3 className="card-title">Industry Trends</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
                  Emerging trends and future outlook for the cannabis industry in Praya.
                </p>

                <h4>Market Trends</h4>

                <div style={{ marginBottom: '20px' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>Product Innovation</h5>
                  <ul>
                    <li>Shift toward low-dose edibles (2-5mg THC) for microdosing</li>
                    <li>Growing demand for CBD-dominant products</li>
                    <li>Craft cannabis (small-batch, artisanal) gaining market share</li>
                    <li>Functional products (sleep, focus, relaxation) increasing 25% YoY</li>
                    <li>Beverage category fastest-growing (45% growth in 2024)</li>
                  </ul>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>Consumer Behavior</h5>
                  <ul>
                    <li>Wellness-focused consumers outnumbering recreational users</li>
                    <li>Women 45-65 fastest-growing demographic</li>
                    <li>Preference for smokeless products increasing</li>
                    <li>Emphasis on organic, pesticide-free products</li>
                    <li>Local/sustainable sourcing important to 62% of consumers</li>
                  </ul>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>Business Consolidation</h5>
                  <ul>
                    <li>Multi-state operators entering Praya market</li>
                    <li>Small operators facing increased competition</li>
                    <li>Vertical integration (grow-process-retail) becoming common</li>
                    <li>Industry maturation leading to M&A activity</li>
                  </ul>
                </div>

                <h4 style={{ marginTop: '24px' }}>Technology Trends</h4>
                <ul>
                  <li><strong>Seed-to-Sale Tracking:</strong> RFID and blockchain for supply chain transparency</li>
                  <li><strong>E-Commerce:</strong> Online ordering with curbside pickup standard</li>
                  <li><strong>Delivery:</strong> Licensed delivery services expanding rapidly</li>
                  <li><strong>Cultivation Tech:</strong> Automated systems, LED lighting, hydroponics</li>
                  <li><strong>Testing:</strong> Advanced testing for rare cannabinoids and terpenes</li>
                </ul>

                <h4 style={{ marginTop: '20px' }}>Future Outlook (2025-2027)</h4>
                <ul>
                  <li>Market projected to reach $600M by 2027 (10% annual growth)</li>
                  <li>Federal legalization (if enacted) would open interstate commerce</li>
                  <li>Tourism cannabis market expected to grow significantly</li>
                  <li>Medical cannabis patient base projected to double</li>
                  <li>Industry employment to reach 15,000 jobs by 2027</li>
                </ul>
              </div>

              <div className="card">
                <h4 className="card-title">Challenges Ahead</h4>
                <ul>
                  <li><strong>Banking:</strong> Federal restrictions limiting access to financial services</li>
                  <li><strong>Taxation:</strong> High tax burden affecting competitiveness with black market</li>
                  <li><strong>Regulation:</strong> Compliance costs burden for small businesses</li>
                  <li><strong>Impaired Driving:</strong> Need for better roadside testing technology</li>
                  <li><strong>Workplace:</strong> Balancing legal use with employer policies</li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
