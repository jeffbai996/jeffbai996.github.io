import React, { useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import './Department.css'

export default function CBCA() {
  const navigate = useNavigate()

  useEffect(() => {
    document.body.classList.add('theme-cbca')
    return () => document.body.classList.remove('theme-cbca')
  }, [])

  return (
    <>
      <header className="dept-header">
        <div className="container">
          <Link to="/cbca" className="dept-logo">
            <div className="logo-mark">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="4" width="14" height="17" rx="2"></rect>
                <circle cx="12" cy="15" r="1"></circle>
                <path d="M9 4v-2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path>
              </svg>
            </div>
            <div className="logo-text">
              <h1>Customs & Border Control Agency</h1>
              <span className="tagline">Republic of Praya</span>
            </div>
          </Link>
          <nav className="nav">
            <Link to="/cbca" className="nav-link">Home</Link>
            <Link to="/cbca/customs" className="nav-link">Customs</Link>
            <Link to="/cbca/travel" className="nav-link">Travel</Link>
            <Link to="/cbca/import-export" className="nav-link">Import/Export</Link>
          </nav>
        </div>
      </header>

      <Routes>
        <Route index element={<CBCAHome navigate={navigate} />} />
        <Route path="customs" element={<CustomsInfo />} />
        <Route path="travel" element={<ComingSoon title="Travel Requirements" />} />
        <Route path="import-export" element={<ComingSoon title="Import/Export Regulations" />} />
      </Routes>

      <footer className="dept-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <h4>Customs & Border Control Agency</h4>
              <p>Protecting the Republic of Praya's borders while facilitating legitimate travel and trade.</p>
            </div>
            <div className="footer-section">
              <h5>Services</h5>
              <ul>
                <li><Link to="/cbca/customs">Customs Declaration</Link></li>
                <li><a href="#">Duty Calculator</a></li>
                <li><a href="#">Trusted Traveler Program</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5>Resources</h5>
              <ul>
                <li><a href="#">Border Wait Times</a></li>
                <li><a href="#">Prohibited Items</a></li>
                <li><a href="#">Travel Advisories</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5>Government</h5>
              <ul>
                <li><Link to="/">Gov Portal</Link></li>
                <li><Link to="/doj">Dept. of Justice</Link></li>
                <li><a href="#">Trade Regulations</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>&copy; 2024 Republic of Praya. Customs & Border Control Agency.</span>
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

function CBCAHome({ navigate }) {
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
                <rect x="5" y="4" width="14" height="17" rx="2"></rect>
                <circle cx="12" cy="15" r="1"></circle>
                <path d="M9 4v-2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path>
              </svg>
              Border Security
            </div>
            <h2>Securing Our <span>Borders</span></h2>
            <p>CBCA facilitates lawful international travel and trade while protecting the Republic's borders through effective customs enforcement and immigration control for a safe nation.</p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => navigate('/cbca/customs')}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <line x1="3" y1="9" x2="21" y2="9"/>
                  <line x1="9" y1="21" x2="9" y2="9"/>
                </svg>
                Customs Information
              </button>
              <button className="btn btn-secondary" onClick={() => navigate('/cbca/travel')}>
                Travel Requirements
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Daily Travelers</span>
              <span className="stat-value">42,500</span>
              <span className="stat-change">Processed</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Border Crossings</span>
              <span className="stat-value">18</span>
              <span className="stat-change">Active Points</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Average Wait Time</span>
              <span className="stat-value">12 min</span>
              <span className="stat-change">All Ports</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Trade Volume</span>
              <span className="stat-value">¤4.2B</span>
              <span className="stat-change">Monthly</span>
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
                  <h3 className="card-title">Customs Regulations</h3>
                  <Link to="/cbca/customs" className="card-link">Full Guide</Link>
                </div>
                <div className="content-text">
                  <h4>Duty-Free Allowances</h4>
                  <ul>
                    <li><strong>Personal goods:</strong> Up to ¤800 value per person duty-free</li>
                    <li><strong>Alcohol:</strong> 1 liter of spirits or 2 liters of wine</li>
                    <li><strong>Tobacco:</strong> 200 cigarettes or 50 cigars or 250g tobacco</li>
                    <li><strong>Gifts:</strong> ¤100 per gift (excluding alcohol/tobacco)</li>
                  </ul>
                  <h4 style={{ marginTop: '20px' }}>Declaration Required</h4>
                  <ul>
                    <li>Amounts over ¤10,000 in currency</li>
                    <li>Commercial goods for resale</li>
                    <li>Agricultural products and food items</li>
                    <li>Prescription medications (with documentation)</li>
                  </ul>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Prohibited & Restricted Items</h3>
                </div>
                <div className="content-text">
                  <h4>Prohibited Items</h4>
                  <ul>
                    <li>Illegal drugs and controlled substances</li>
                    <li>Counterfeit goods and pirated media</li>
                    <li>Weapons and ammunition (without permit)</li>
                    <li>Endangered species products</li>
                  </ul>
                  <h4 style={{ marginTop: '20px' }}>Restricted Items (Permit Required)</h4>
                  <ul>
                    <li>Plants, seeds, and soil</li>
                    <li>Meat, dairy, and certain food products</li>
                    <li>Medications (must declare with prescription)</li>
                    <li>Cultural artifacts and antiquities</li>
                  </ul>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Latest Updates</h3>
                </div>
                <div className="news-item">
                  <span className="news-date">Nov 29, 2024</span>
                  <h4 className="news-title">Automated Passport Control Expansion</h4>
                  <p className="news-excerpt">Self-service kiosks now available at all major international airports.</p>
                </div>
                <div className="news-item">
                  <span className="news-date">Nov 15, 2024</span>
                  <h4 className="news-title">Updated Agricultural Restrictions</h4>
                  <p className="news-excerpt">New restrictions on imported plant materials effective December 1.</p>
                </div>
              </div>
            </div>

            <aside className="sidebar">
              <div className="card">
                <h4 className="card-title">Quick Services</h4>
                <div className="quick-link" onClick={() => navigate('/cbca/customs')}>
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                      <polyline points="14,2 14,8 20,8"/>
                    </svg>
                  </span>
                  Customs Declaration
                </div>
                <div className="quick-link">
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                      <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
                    </svg>
                  </span>
                  Duty Calculator
                </div>
                <div className="quick-link">
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"/>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                  </span>
                  Border Wait Times
                </div>
                <div className="quick-link">
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                      <polyline points="22,4 12,14.01 9,11.01"/>
                    </svg>
                  </span>
                  Trusted Traveler
                </div>
              </div>

              <div className="info-box">
                <h4>Border Information</h4>
                <p><strong>Phone:</strong> 1-800-CBCA-PY</p>
                <p><strong>Email:</strong> info@cbca.gov.py</p>
                <p><strong>Emergency:</strong> 911</p>
              </div>

              <div className="card">
                <h4 className="card-title">Travel Tips</h4>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '12px' }}>
                  <p style={{ marginBottom: '8px' }}>Always carry valid identification</p>
                  <p style={{ marginBottom: '8px' }}>Declare all items exceeding limits</p>
                  <p style={{ marginBottom: '8px' }}>Check wait times before arrival</p>
                  <p>Pack prohibited items in checked luggage only</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  )
}

function CustomsInfo() {
  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/cbca">Home</Link> / Customs Information
          </div>
          <h1>Customs Regulations</h1>
          <p className="subtitle">What you need to know when entering the Republic of Praya</p>
        </div>
      </div>
      <div className="container">
        <div className="content-text">
          <h3>Customs Declaration</h3>
          <p>All travelers entering the Republic of Praya must complete a customs declaration form. This can be done online before arrival or on paper at the port of entry.</p>

          <div className="card" style={{ marginTop: '20px' }}>
            <h4 className="card-title">Duty-Free Allowances</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Personal items and goods within these limits are duty-free:</p>
            <ul style={{ marginBottom: '12px' }}>
              <li><strong>General goods:</strong> ¤800 value per person (proof of purchase required)</li>
              <li><strong>Alcoholic beverages:</strong> 1 liter of spirits OR 2 liters of wine</li>
              <li><strong>Tobacco products:</strong> 200 cigarettes OR 50 cigars OR 250g loose tobacco</li>
              <li><strong>Perfume:</strong> 50ml of perfume and 250ml of eau de toilette</li>
              <li><strong>Gifts:</strong> ¤100 per gift item (excluding alcohol and tobacco)</li>
            </ul>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Note:</strong> Allowances apply to passengers 18 years and older (21+ for alcohol)
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Customs Duty Rates</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Items exceeding duty-free limits are subject to customs duty:</p>
            <ul>
              <li><strong>General goods:</strong> 15% of value exceeding ¤800</li>
              <li><strong>Electronics:</strong> 20% customs duty + 12% VAT</li>
              <li><strong>Vehicles:</strong> 35% customs duty + fees (varies by type)</li>
              <li><strong>Luxury goods:</strong> 25% customs duty + 12% VAT</li>
              <li><strong>Alcohol/tobacco:</strong> Excise tax rates apply (varies by product)</li>
            </ul>
          </div>

          <div className="card">
            <h4 className="card-title">Declaration Requirements</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>You must declare:</p>
            <ul>
              <li>All goods exceeding duty-free allowances</li>
              <li>Currency or monetary instruments exceeding ¤10,000</li>
              <li>Commercial goods or merchandise for resale</li>
              <li>Agricultural products, plants, animals, or food</li>
              <li>Prescription medications (with valid prescription)</li>
              <li>Firearms, weapons, or ammunition</li>
              <li>Cultural artifacts, antiques, or art over 100 years old</li>
            </ul>
          </div>

          <h3 style={{ marginTop: '32px' }}>Prohibited Items</h3>
          <p>The following items are strictly prohibited from entry:</p>
          <ul>
            <li>Illegal drugs and controlled substances</li>
            <li>Counterfeit goods, pirated software, and media</li>
            <li>Weapons and ammunition (without proper permits)</li>
            <li>Endangered species and products derived from them</li>
            <li>Pornographic materials</li>
            <li>Seditious or treasonable materials</li>
          </ul>

          <h3 style={{ marginTop: '32px' }}>Restricted Items (Permit Required)</h3>
          <ul>
            <li><strong>Agricultural products:</strong> Fresh fruits, vegetables, meat, dairy products</li>
            <li><strong>Plants and seeds:</strong> Require phytosanitary certificate</li>
            <li><strong>Live animals:</strong> Require veterinary health certificate and import permit</li>
            <li><strong>Medications:</strong> Personal supply with prescription (max 3 months)</li>
            <li><strong>Firearms:</strong> Import license and registration required</li>
          </ul>

          <div className="info-box" style={{ marginTop: '24px' }}>
            <h4>Important</h4>
            <p>Failure to declare dutiable or restricted goods may result in seizure of items, fines, or criminal prosecution. When in doubt, declare it.</p>
          </div>

          <div className="card" style={{ marginTop: '20px' }}>
            <h4 className="card-title">Trusted Traveler Program</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Frequent travelers can apply for expedited clearance:</p>
            <ul>
              <li>Dedicated express lanes at major ports of entry</li>
              <li>Automated kiosk processing</li>
              <li>Valid for 5 years</li>
              <li>Application fee: ¤85</li>
              <li>Background check and interview required</li>
            </ul>
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
      case 'Travel Requirements':
        return {
          description: 'Visa requirements, passport information, and entry procedures for the Republic of Praya.',
          services: ['Visa Application', 'Passport Requirements', 'Travel Advisories', 'Entry/Exit Procedures'],
          contact: 'For visa inquiries: visa@cbca.gov.py or call 1-800-CBCA-PY'
        };
      case 'Import/Export Regulations':
        return {
          description: 'Commercial trade regulations, import permits, and export documentation.',
          services: ['Import Permits', 'Export Licenses', 'Trade Compliance', 'Tariff Information'],
          contact: 'For trade inquiries: trade@cbca.gov.py'
        };
      default:
        return {
          description: 'This service is being developed to serve you better.',
          services: [],
          contact: 'For assistance, contact CBCA at 1-800-CBCA-PY'
        };
    }
  };

  const info = getServiceInfo();

  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/cbca">Home</Link> / {title}
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
              background: 'linear-gradient(135deg, rgba(29, 78, 216, 0.1) 0%, rgba(29, 78, 216, 0.2) 100%)',
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
              We're working to bring this service online. In the meantime, you can access these services by contacting CBCA directly.
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
              background: 'rgba(29, 78, 216, 0.05)',
              borderRadius: '10px',
              fontSize: '13px',
              color: 'var(--text-muted)'
            }}>
              {info.contact}
            </div>

            <div style={{ marginTop: '32px' }}>
              <h4 style={{ fontSize: '14px', marginBottom: '12px' }}>Related Services</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                <Link to="/cbca/customs" style={{
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
                  Customs Information
                </Link>
                <button
                  onClick={() => navigate('/cbca')}
                  className="btn btn-secondary"
                  style={{ fontSize: '13px', padding: '14px' }}
                >
                  Return to CBCA Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
