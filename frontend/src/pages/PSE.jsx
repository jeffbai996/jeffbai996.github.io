import React, { useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import './Department.css'

export default function PSE() {
  const navigate = useNavigate()

  useEffect(() => {
    document.body.classList.add('theme-pse')
    return () => document.body.classList.remove('theme-pse')
  }, [])

  return (
    <>
      <header className="dept-header">
        <div className="container">
          <Link to="/pse" className="dept-logo">
            <div className="logo-mark">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/>
              </svg>
            </div>
            <div className="logo-text">
              <h1>Praya Stock Exchange</h1>
              <span className="tagline">Republic of Praya</span>
            </div>
          </Link>
          <nav className="nav">
            <Link to="/pse" className="nav-link">Home</Link>
            <Link to="/pse/markets" className="nav-link">Markets</Link>
            <Link to="/pse/listed" className="nav-link">Listed Companies</Link>
            <Link to="/pse/investors" className="nav-link">Investors</Link>
          </nav>
        </div>
      </header>

      <Routes>
        <Route index element={<PSEHome navigate={navigate} />} />
        <Route path="markets" element={<Markets />} />
        <Route path="listed" element={<ComingSoon title="Listed Companies" />} />
        <Route path="investors" element={<ComingSoon title="Investor Resources" />} />
      </Routes>

      <footer className="dept-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <h4>Praya Stock Exchange</h4>
              <p>The primary securities exchange of the Republic of Praya, facilitating capital formation and providing a transparent marketplace for investors.</p>
            </div>
            <div className="footer-section">
              <h5>Trading</h5>
              <ul>
                <li><a href="#">Market Data</a></li>
                <li><a href="#">Trading Hours</a></li>
                <li><a href="#">Indices</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5>Resources</h5>
              <ul>
                <li><a href="#">Investor Education</a></li>
                <li><a href="#">IPO Calendar</a></li>
                <li><a href="#">Research Reports</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5>Government</h5>
              <ul>
                <li><Link to="/">Gov Portal</Link></li>
                <li><a href="#">Securities Regulations</a></li>
                <li><a href="#">Financial Oversight</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>&copy; 2024 Republic of Praya. Praya Stock Exchange.</span>
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

function PSEHome({ navigate }) {
  return (
    <>
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-bg-shape"></div>
          <div className="hero-bg-shape"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <h2>Powering <span>Economic Growth</span></h2>
            <p>The Praya Stock Exchange is the nation's premier securities marketplace, connecting investors with growth opportunities and helping companies raise capital for expansion.</p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => navigate('/pse/markets')}>
                Market Data
              </button>
              <button className="btn btn-secondary" onClick={() => navigate('/pse/investors')}>
                Investor Resources
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">PSE Index</span>
              <span className="stat-value">8,742</span>
              <span className="stat-change">+1.2% Today</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Market Cap</span>
              <span className="stat-value">¤892B</span>
              <span className="stat-change">Total Value</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Listed Companies</span>
              <span className="stat-value">347</span>
              <span className="stat-change">Active</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Daily Volume</span>
              <span className="stat-value">¤3.2B</span>
              <span className="stat-change">Traded</span>
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
                  <h3 className="card-title">Market Overview</h3>
                  <Link to="/pse/markets" className="card-link">Full Data</Link>
                </div>
                <div className="content-text">
                  <h4>Major Indices</h4>
                  <ul>
                    <li><strong>PSE Composite Index:</strong> Broad market index tracking all listed companies</li>
                    <li><strong>PSE 50:</strong> Top 50 companies by market capitalization</li>
                    <li><strong>PSE Industrial Index:</strong> Manufacturing and industrial sector</li>
                    <li><strong>PSE Financial Index:</strong> Banks, insurance, and financial services</li>
                    <li><strong>PSE Technology Index:</strong> Tech and telecommunications companies</li>
                  </ul>
                  <h4 style={{ marginTop: '20px' }}>Trading Information</h4>
                  <ul>
                    <li><strong>Trading hours:</strong> Monday-Friday, 9:30 AM - 4:00 PM</li>
                    <li><strong>Pre-market:</strong> 8:00 AM - 9:30 AM</li>
                    <li><strong>After-hours:</strong> 4:00 PM - 6:30 PM</li>
                    <li><strong>Settlement:</strong> T+2 (trade date plus 2 business days)</li>
                  </ul>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Listing Requirements</h3>
                </div>
                <div className="content-text">
                  <h4>Main Board Listing</h4>
                  <ul>
                    <li><strong>Operating history:</strong> Minimum 3 years</li>
                    <li><strong>Market capitalization:</strong> Minimum ¤500 million</li>
                    <li><strong>Public float:</strong> At least 25% of shares</li>
                    <li><strong>Shareholders:</strong> Minimum 1,000 public shareholders</li>
                    <li><strong>Financial performance:</strong> Profitable for 2 of last 3 years</li>
                  </ul>
                  <h4 style={{ marginTop: '20px' }}>Growth Board (Emerging Companies)</h4>
                  <ul>
                    <li><strong>Operating history:</strong> Minimum 1 year</li>
                    <li><strong>Market capitalization:</strong> Minimum ¤100 million</li>
                    <li><strong>Public float:</strong> At least 20% of shares</li>
                    <li><strong>Focus:</strong> High-growth technology and innovation companies</li>
                  </ul>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Market News</h3>
                </div>
                <div className="news-item">
                  <span className="news-date">Dec 2, 2024</span>
                  <h4 className="news-title">PSE Composite Reaches Record High</h4>
                  <p className="news-excerpt">Index closes at 8,742, up 1.2% on strong financial sector performance.</p>
                </div>
                <div className="news-item">
                  <span className="news-date">Nov 28, 2024</span>
                  <h4 className="news-title">TechCorp Announces IPO Plans</h4>
                  <p className="news-excerpt">Leading software company to list on Growth Board in Q1 2025.</p>
                </div>
                <div className="news-item">
                  <span className="news-date">Nov 25, 2024</span>
                  <h4 className="news-title">New Trading Platform Launch</h4>
                  <p className="news-excerpt">Enhanced trading system offers faster execution and improved features.</p>
                </div>
              </div>
            </div>

            <aside className="sidebar">
              <div className="card" style={{ background: 'linear-gradient(135deg, #059669 0%, #047857 100%)', color: 'white', border: 'none' }}>
                <h4 style={{ color: 'white', marginBottom: '8px' }}>Market Status</h4>
                <div style={{ fontSize: '32px', fontWeight: '800', marginBottom: '4px' }}>OPEN</div>
                <div style={{ fontSize: '13px', opacity: 0.9, marginBottom: '16px' }}>Trading in Progress</div>
                <div style={{ paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '13px' }}>Opens</span>
                    <span style={{ fontSize: '13px', fontWeight: '600' }}>9:30 AM</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '13px' }}>Closes</span>
                    <span style={{ fontSize: '13px', fontWeight: '600' }}>4:00 PM</span>
                  </div>
                </div>
              </div>

              <div className="card">
                <h4 className="card-title">Quick Links</h4>
                <div className="quick-link" onClick={() => navigate('/pse/markets')}>
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/>
                    </svg>
                  </span>
                  Real-Time Market Data
                </div>
                <div className="quick-link" onClick={() => navigate('/pse/listed')}>
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 9h18v10a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                      <path d="M3 9V7a2 2 0 012-2h14a2 2 0 012 2v2"/>
                    </svg>
                  </span>
                  Company Directory
                </div>
                <div className="quick-link">
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                  </span>
                  IPO Calendar
                </div>
                <div className="quick-link" onClick={() => navigate('/pse/investors')}>
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                      <polyline points="14,2 14,8 20,8"/>
                    </svg>
                  </span>
                  Investor Education
                </div>
              </div>

              <div className="info-box">
                <h4>Market Information</h4>
                <p><strong>Phone:</strong> 1-800-PSE-INFO</p>
                <p><strong>Email:</strong> info@pse.gov.py</p>
                <p><strong>Trading Support:</strong> trading@pse.gov.py</p>
              </div>

              <div className="card">
                <h4 className="card-title">Sector Performance</h4>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>Financials</span>
                    <span style={{ color: '#059669', fontWeight: '600' }}>+2.4%</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>Technology</span>
                    <span style={{ color: '#059669', fontWeight: '600' }}>+1.8%</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>Industrials</span>
                    <span style={{ color: '#059669', fontWeight: '600' }}>+0.9%</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Energy</span>
                    <span style={{ color: '#dc2626', fontWeight: '600' }}>-0.5%</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  )
}

function Markets() {
  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/pse">Home</Link> / Markets
          </div>
          <h1>Market Data & Indices</h1>
          <p className="subtitle">Real-time information on the Praya securities market</p>
        </div>
      </div>
      <div className="container">
        <div className="content-text">
          <h3>Praya Stock Exchange Indices</h3>
          <p>The PSE maintains several benchmark indices to track market performance across different sectors and company sizes.</p>

          <div className="card" style={{ marginTop: '20px' }}>
            <h4 className="card-title">PSE Composite Index</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>The primary benchmark of the Praya stock market:</p>
            <ul style={{ marginBottom: '12px' }}>
              <li><strong>Components:</strong> All 347 companies listed on the exchange</li>
              <li><strong>Weighting:</strong> Market capitalization-weighted</li>
              <li><strong>Base date:</strong> January 1, 2000 (Base value: 1,000)</li>
              <li><strong>Current level:</strong> 8,742 (+1.2% today)</li>
              <li><strong>52-week range:</strong> 7,845 - 8,850</li>
              <li><strong>Rebalancing:</strong> Quarterly</li>
            </ul>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Most widely followed</strong> market indicator for the Praya economy
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">PSE 50 Index</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Blue-chip index of the largest companies:</p>
            <ul>
              <li><strong>Components:</strong> 50 largest companies by market cap</li>
              <li><strong>Selection criteria:</strong> Size, liquidity, sector representation</li>
              <li><strong>Minimum market cap:</strong> ¤5 billion for inclusion</li>
              <li><strong>Represents:</strong> Approximately 75% of total market value</li>
              <li><strong>Review:</strong> Semi-annually (June and December)</li>
            </ul>
          </div>

          <div className="card">
            <h4 className="card-title">Sector Indices</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Track performance by industry sector:</p>
            <ul>
              <li><strong>PSE Financial Index:</strong> Banks, insurance, investment firms (42 companies)</li>
              <li><strong>PSE Technology Index:</strong> Software, hardware, IT services (38 companies)</li>
              <li><strong>PSE Industrial Index:</strong> Manufacturing, construction, aerospace (54 companies)</li>
              <li><strong>PSE Consumer Index:</strong> Retail, food & beverage, consumer goods (48 companies)</li>
              <li><strong>PSE Energy Index:</strong> Oil, gas, renewable energy (22 companies)</li>
              <li><strong>PSE Healthcare Index:</strong> Pharmaceuticals, medical devices, services (28 companies)</li>
              <li><strong>PSE Real Estate Index:</strong> REITs, property developers (31 companies)</li>
            </ul>
          </div>

          <h3 style={{ marginTop: '32px' }}>Trading Mechanisms</h3>

          <div className="card">
            <h4 className="card-title">Order Types</h4>
            <ul>
              <li><strong>Market order:</strong> Executes immediately at current market price</li>
              <li><strong>Limit order:</strong> Executes only at specified price or better</li>
              <li><strong>Stop order:</strong> Triggers market order when stop price reached</li>
              <li><strong>Stop-limit order:</strong> Combines stop and limit order features</li>
              <li><strong>Good-til-cancelled (GTC):</strong> Remains active until executed or cancelled</li>
              <li><strong>Day order:</strong> Expires if not executed by market close</li>
            </ul>
          </div>

          <div className="card">
            <h4 className="card-title">Trading Sessions</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Daily trading schedule:</p>
            <ul>
              <li><strong>Pre-opening (8:00-9:30 AM):</strong> Order entry, no execution</li>
              <li><strong>Opening call auction (9:30 AM):</strong> Opening price determination</li>
              <li><strong>Continuous trading (9:30 AM-3:50 PM):</strong> Regular trading</li>
              <li><strong>Pre-closing (3:50-4:00 PM):</strong> Final order entry</li>
              <li><strong>Closing call auction (4:00 PM):</strong> Closing price determination</li>
              <li><strong>After-hours trading (4:00-6:30 PM):</strong> Extended hours (limited liquidity)</li>
            </ul>
          </div>

          <h3 style={{ marginTop: '32px' }}>Market Regulations</h3>

          <div className="card">
            <h4 className="card-title">Price Limits & Circuit Breakers</h4>
            <ul>
              <li><strong>Daily price limits:</strong> ±10% for individual stocks</li>
              <li><strong>Market-wide circuit breaker:</strong> Trading halts if PSE Composite drops:
                <ul style={{ marginTop: '8px', marginLeft: '20px' }}>
                  <li>Level 1: 7% decline - 15 minute halt</li>
                  <li>Level 2: 13% decline - 30 minute halt</li>
                  <li>Level 3: 20% decline - trading suspended for the day</li>
                </ul>
              </li>
              <li><strong>Volatility halt:</strong> Individual stock trading paused for 5 minutes if price moves ±5% in 5 minutes</li>
            </ul>
          </div>

          <div className="card">
            <h4 className="card-title">Disclosure Requirements</h4>
            <ul>
              <li><strong>Quarterly reports:</strong> Financial statements within 45 days of quarter end</li>
              <li><strong>Annual reports:</strong> Audited financials within 90 days of fiscal year end</li>
              <li><strong>Material events:</strong> Immediate disclosure of market-moving information</li>
              <li><strong>Insider trading reports:</strong> Directors/officers must report trades within 2 days</li>
              <li><strong>Shareholder meetings:</strong> 21 days' advance notice required</li>
            </ul>
          </div>

          <h3 style={{ marginTop: '32px' }}>Market Statistics</h3>
          <ul>
            <li><strong>Total market capitalization:</strong> ¤892 billion</li>
            <li><strong>Average daily trading volume:</strong> ¤3.2 billion</li>
            <li><strong>Number of trades per day:</strong> ~120,000</li>
            <li><strong>Most traded stock:</strong> Praya National Bank (¤285M daily avg)</li>
            <li><strong>IPOs this year:</strong> 18 companies</li>
            <li><strong>Total capital raised (YTD):</strong> ¤12.4 billion</li>
          </ul>

          <div className="info-box" style={{ marginTop: '24px' }}>
            <h4>Market Data Services</h4>
            <p>Real-time and historical market data available through PSE Data Portal. Free delayed quotes (15 minutes) or subscribe to real-time data feeds for professional use.</p>
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
      case 'Listed Companies':
        return {
          description: 'Directory of all companies trading on the Praya Stock Exchange.',
          services: ['Company Profiles', 'Financial Statements', 'Corporate Actions', 'Shareholder Information'],
          contact: 'For company information: info@pse.gov.py or call 1-800-PSE-INFO'
        };
      case 'Investor Resources':
        return {
          description: 'Educational resources and tools for investors.',
          services: ['Investment Guides', 'Market Tutorials', 'Research Tools', 'Account Management'],
          contact: 'For investor support: investors@pse.gov.py or call 1-800-PSE-INFO'
        };
      default:
        return {
          description: 'This service is being developed to serve you better.',
          services: [],
          contact: 'For assistance, contact the Praya Stock Exchange'
        };
    }
  };

  const info = getServiceInfo();

  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/pse">Home</Link> / {title}
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
              We're working to bring this service online. In the meantime, you can access market information through traditional channels.
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
                <Link to="/pse/markets" style={{
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
                  Market Data
                </Link>
                <button
                  onClick={() => navigate('/pse')}
                  className="btn btn-secondary"
                  style={{ fontSize: '13px', padding: '14px' }}
                >
                  Return to PSE Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
