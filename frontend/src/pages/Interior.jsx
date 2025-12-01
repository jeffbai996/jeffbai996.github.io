import { useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import './Department.css'

export default function Interior() {
  const navigate = useNavigate()

  useEffect(() => {
    document.body.classList.add('theme-interior')
    return () => document.body.classList.remove('theme-interior')
  }, [])

  return (
    <>
      <header className="dept-header">
        <div className="container">
          <Link to="/interior" className="dept-logo">
            <div className="logo-mark">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11"/>
              </svg>
            </div>
            <div className="logo-text">
              <h1>Interior Department</h1>
              <span className="tagline">Republic of Praya</span>
            </div>
          </Link>
          <nav className="nav">
            <Link to="/interior" className="nav-link">Home</Link>
            <Link to="/interior/land" className="nav-link">Land Registry</Link>
            <Link to="/interior/permits" className="nav-link">Permits</Link>
            <Link to="/interior/civil" className="nav-link">Civil Registry</Link>
            <Link to="/interior/parks" className="nav-link">Parks</Link>
          </nav>
        </div>
      </header>

      <Routes>
        <Route index element={<InteriorHome navigate={navigate} />} />
        <Route path="land" element={<LandRegistry />} />
        <Route path="permits" element={<Permits />} />
        <Route path="civil" element={<ComingSoon title="Civil Registry" />} />
        <Route path="parks" element={<ComingSoon title="Parks & Reserves" />} />
      </Routes>

      <footer className="dept-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <h4>Interior Department</h4>
              <p>Managing land, civil records, and natural resources for the citizens of Praya.</p>
            </div>
            <div className="footer-section">
              <h5>Services</h5>
              <ul>
                <li><Link to="/interior/land">Land Registry</Link></li>
                <li><Link to="/interior/permits">Building Permits</Link></li>
                <li><Link to="/interior/civil">Civil Records</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5>Resources</h5>
              <ul>
                <li><a href="#">Forms</a></li>
                <li><a href="#">Fees</a></li>
                <li><a href="#">Maps</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5>Government</h5>
              <ul>
                <li><Link to="/">Gov Portal</Link></li>
                <li><Link to="/ctb">Cannabis Tax Bureau</Link></li>
                <li><Link to="/doj">Dept. of Justice</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>&copy; 2024 Republic of Praya. Interior Department.</span>
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

function InteriorHome({ navigate }) {
  return (
    <>
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-bg-shape"></div>
          <div className="hero-bg-shape"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <h2>Managing Praya's <span>Land & Resources</span></h2>
            <p>The Interior Department oversees land registration, building permits, civil records, and the preservation of our natural parks and reserves.</p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => navigate('/interior/land')}>
                Search Land Records
              </button>
              <button className="btn btn-secondary" onClick={() => navigate('/interior/permits')}>
                Apply for Permit
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Land Parcels</span>
              <span className="stat-value">847K</span>
              <span className="stat-change">Registered</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Permits Issued</span>
              <span className="stat-value">23,481</span>
              <span className="stat-change">FY 2024</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Park Area</span>
              <span className="stat-value">2.4M</span>
              <span className="stat-change">Hectares</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Processing</span>
              <span className="stat-value">5</span>
              <span className="stat-change">Avg Days</span>
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
                  <h3 className="card-title">Our Services</h3>
                </div>
                <div className="service-grid">
                  <div className="service-card" onClick={() => navigate('/interior/land')}>
                    <div className="service-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                    </div>
                    <h4>Land Registry</h4>
                    <p>Property title searches, registration, and transfers</p>
                  </div>
                  <div className="service-card" onClick={() => navigate('/interior/permits')}>
                    <div className="service-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2"/>
                        <path d="M3 9h18M9 21V9"/>
                      </svg>
                    </div>
                    <h4>Building Permits</h4>
                    <p>Construction, renovation, and zoning permits</p>
                  </div>
                  <div className="service-card" onClick={() => navigate('/interior/civil')}>
                    <div className="service-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                        <path d="M23 21v-2a4 4 0 00-3-3.87"/>
                        <path d="M16 3.13a4 4 0 010 7.75"/>
                      </svg>
                    </div>
                    <h4>Civil Registry</h4>
                    <p>Birth, death, marriage certificates</p>
                  </div>
                  <div className="service-card" onClick={() => navigate('/interior/parks')}>
                    <div className="service-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                        <path d="M2 17l10 5 10-5"/>
                        <path d="M2 12l10 5 10-5"/>
                      </svg>
                    </div>
                    <h4>Parks & Reserves</h4>
                    <p>National parks information and permits</p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Latest Updates</h3>
                </div>
                <div className="news-item">
                  <span className="news-date">Nov 18, 2024</span>
                  <h4 className="news-title">Online Title Search Now Available</h4>
                  <p className="news-excerpt">Citizens can now search property records online through our new portal.</p>
                </div>
                <div className="news-item">
                  <span className="news-date">Nov 5, 2024</span>
                  <h4 className="news-title">New Zoning Regulations Effective</h4>
                  <p className="news-excerpt">Updated zoning codes for residential and commercial areas now in effect.</p>
                </div>
              </div>
            </div>

            <aside className="sidebar">
              <div className="card">
                <h4 className="card-title">Quick Actions</h4>
                <div className="quick-link" onClick={() => navigate('/interior/land')}>
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"/>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                  </span>
                  Search Land Records
                </div>
                <div className="quick-link" onClick={() => navigate('/interior/permits')}>
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                      <polyline points="14,2 14,8 20,8"/>
                      <line x1="12" y1="18" x2="12" y2="12"/>
                      <line x1="9" y1="15" x2="15" y2="15"/>
                    </svg>
                  </span>
                  Apply for Permit
                </div>
                <div className="quick-link" onClick={() => navigate('/interior/civil')}>
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                      <polyline points="14,2 14,8 20,8"/>
                    </svg>
                  </span>
                  Order Certificate
                </div>
              </div>

              <div className="info-box">
                <h4>Office Hours</h4>
                <p>Mon-Fri: 8:00 AM - 5:00 PM<br/>Closed on public holidays</p>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  )
}

function LandRegistry() {
  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/interior">Home</Link> / Land Registry
          </div>
          <h1>Land Registry</h1>
          <p className="subtitle">Search property records and manage land titles</p>
        </div>
      </div>
      <div className="container">
        <div className="card">
          <h4 className="card-title">Property Title Search</h4>
          <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Search for property records by parcel number, address, or owner name.</p>
          <div className="form-group">
            <label>Search Type</label>
            <select>
              <option>Parcel Number</option>
              <option>Address</option>
              <option>Owner Name</option>
            </select>
          </div>
          <div className="form-group">
            <label>Search Term</label>
            <input type="text" placeholder="Enter search term..." />
          </div>
          <button className="btn btn-primary">Search Records</button>
        </div>

        <div className="content-text" style={{ marginTop: '24px' }}>
          <h3>Land Registry Services</h3>
          <ul>
            <li><strong>Title Search</strong> - Search property ownership records</li>
            <li><strong>Title Transfer</strong> - Register property sales and transfers</li>
            <li><strong>Lien Recording</strong> - Record mortgages and liens</li>
            <li><strong>Survey Records</strong> - Access property survey documents</li>
            <li><strong>Title Insurance</strong> - Obtain title insurance certificates</li>
          </ul>

          <div className="warning-box">
            <h4>Important Notice</h4>
            <p>All property transfers must be registered within 30 days of closing to be legally recognized.</p>
          </div>
        </div>
      </div>
    </main>
  )
}

function Permits() {
  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/interior">Home</Link> / Permits
          </div>
          <h1>Building Permits</h1>
          <p className="subtitle">Apply for construction and renovation permits</p>
        </div>
      </div>
      <div className="container">
        <div className="content-text">
          <h3>Permit Types</h3>
          <p>The Interior Department issues the following permit types:</p>
        </div>

        <div className="license-grid" style={{ marginTop: '20px' }}>
          <div className="license-card">
            <h4>New Construction</h4>
            <span className="code">PERM-NEW</span>
            <p>For new building construction projects</p>
            <button className="btn btn-primary btn-sm">Apply</button>
          </div>
          <div className="license-card">
            <h4>Renovation</h4>
            <span className="code">PERM-REN</span>
            <p>For major renovations and alterations</p>
            <button className="btn btn-primary btn-sm">Apply</button>
          </div>
          <div className="license-card">
            <h4>Demolition</h4>
            <span className="code">PERM-DEM</span>
            <p>For structure demolition</p>
            <button className="btn btn-primary btn-sm">Apply</button>
          </div>
          <div className="license-card">
            <h4>Zoning Variance</h4>
            <span className="code">PERM-ZON</span>
            <p>For zoning exception requests</p>
            <button className="btn btn-primary btn-sm">Apply</button>
          </div>
        </div>

        <div className="info-box" style={{ marginTop: '24px' }}>
          <h4>Processing Times</h4>
          <p>Standard permits: 5-10 business days. Complex projects may require additional review.</p>
        </div>
      </div>
    </main>
  )
}

function ComingSoon({ title }) {
  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/interior">Home</Link> / {title}
          </div>
          <h1>{title}</h1>
        </div>
      </div>
      <div className="container">
        <div className="card" style={{ textAlign: 'center', padding: '60px' }}>
          <h3>Coming Soon</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '12px' }}>
            This section is under development. Check back soon!
          </p>
        </div>
      </div>
    </main>
  )
}
