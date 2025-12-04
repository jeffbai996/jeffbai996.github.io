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
        <Route path="travel" element={<TravelRequirements />} />
        <Route path="import-export" element={<ImportExport />} />
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
                <li><Link to="/cbca/customs">Customs Information</Link></li>
                <li><Link to="/cbca/travel">Travel Requirements</Link></li>
                <li><Link to="/cbca/import-export">Import/Export</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5>Government</h5>
              <ul>
                <li><Link to="/">Gov Portal</Link></li>
                <li><Link to="/doj">Dept. of Justice</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>&copy; 2024 Republic of Praya. Customs & Border Control Agency.</span>
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

function TravelRequirements() {
  const [section, setSection] = React.useState('visa');

  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/cbca">Home</Link> / Travel Requirements
          </div>
          <h1>Travel Requirements</h1>
          <p className="subtitle">Visa requirements, passport information, and entry procedures for the Republic of Praya</p>
        </div>
      </div>
      <div className="container">
        <div className="content-text">
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setSection('visa')}
                className={section === 'visa' ? 'btn btn-primary' : 'btn btn-secondary'}
                style={{ fontSize: '13px', padding: '10px 20px' }}
              >
                Visa Requirements
              </button>
              <button
                onClick={() => setSection('passport')}
                className={section === 'passport' ? 'btn btn-primary' : 'btn btn-secondary'}
                style={{ fontSize: '13px', padding: '10px 20px' }}
              >
                Passport & Documents
              </button>
              <button
                onClick={() => setSection('entry')}
                className={section === 'entry' ? 'btn btn-primary' : 'btn btn-secondary'}
                style={{ fontSize: '13px', padding: '10px 20px' }}
              >
                Entry/Exit Procedures
              </button>
              <button
                onClick={() => setSection('advisories')}
                className={section === 'advisories' ? 'btn btn-primary' : 'btn btn-secondary'}
                style={{ fontSize: '13px', padding: '10px 20px' }}
              >
                Travel Advisories
              </button>
            </div>
          </div>

          {section === 'visa' && (
            <>
              <div className="card">
                <h3 className="card-title">Visa Requirements</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
                  Citizens of certain countries need a visa to enter the Republic of Praya. Check if you need a visa and how to apply.
                </p>

                <h4>Visa-Free Entry (90 days)</h4>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                  Citizens of the following countries can enter without a visa for tourism or business stays up to 90 days:
                </p>
                <ul>
                  <li>All European Union member states</li>
                  <li>United States, Canada, United Kingdom</li>
                  <li>Australia, New Zealand, Japan, South Korea, Singapore</li>
                  <li>Brazil, Argentina, Chile, Uruguay</li>
                  <li>UAE, Qatar, Kuwait, Bahrain</li>
                </ul>

                <h4 style={{ marginTop: '20px' }}>Visa Required</h4>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                  All other nationalities must obtain a visa before travel. Visa types:
                </p>

                <div style={{ marginBottom: '20px' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>Tourist Visa (Type T)</h5>
                  <ul>
                    <li>Valid for stays up to 90 days</li>
                    <li>Single or multiple entry options</li>
                    <li>Processing time: 5-10 business days</li>
                    <li>Fee: ¤75 (single), ¤120 (multiple entry)</li>
                  </ul>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>Business Visa (Type B)</h5>
                  <ul>
                    <li>Valid for stays up to 180 days</li>
                    <li>Requires business invitation letter</li>
                    <li>Processing time: 7-15 business days</li>
                    <li>Fee: ¤150</li>
                  </ul>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>Student Visa (Type S)</h5>
                  <ul>
                    <li>Valid for duration of study program</li>
                    <li>Requires acceptance letter from Prayan institution</li>
                    <li>Processing time: 15-30 business days</li>
                    <li>Fee: ¤200</li>
                  </ul>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>Work Visa (Type W)</h5>
                  <ul>
                    <li>Valid for up to 2 years (renewable)</li>
                    <li>Requires job offer and work permit</li>
                    <li>Processing time: 30-45 business days</li>
                    <li>Fee: ¤350</li>
                  </ul>
                </div>
              </div>

              <div className="card">
                <h4 className="card-title">How to Apply</h4>
                <ol>
                  <li><strong>Complete Application:</strong> Fill out online visa form at visa.cbca.gov.py</li>
                  <li><strong>Gather Documents:</strong> Passport, photo, proof of funds, travel itinerary</li>
                  <li><strong>Pay Fee:</strong> Online payment or at embassy/consulate</li>
                  <li><strong>Submit:</strong> Upload documents online or visit embassy in person</li>
                  <li><strong>Interview:</strong> May be required for certain visa types</li>
                  <li><strong>Receive Visa:</strong> Via email (e-visa) or passport stamp</li>
                </ol>
              </div>

              <div className="info-box">
                <h4>Visa Support</h4>
                <p>For visa inquiries and application assistance, contact CBCA Visa Services at visa@cbca.gov.py or call 1-800-CBCA-PY. Appointments available at all Prayan embassies and consulates worldwide.</p>
              </div>
            </>
          )}

          {section === 'passport' && (
            <>
              <div className="card">
                <h3 className="card-title">Passport Requirements</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
                  All travelers must have a valid passport to enter the Republic of Praya.
                </p>

                <h4>Passport Validity</h4>
                <ul>
                  <li>Passport must be valid for at least 6 months beyond your planned departure date</li>
                  <li>Passport must have at least 2 blank pages for entry/exit stamps</li>
                  <li>Damaged or defaced passports may be rejected</li>
                  <li>Emergency or temporary passports accepted with valid visa</li>
                </ul>

                <h4 style={{ marginTop: '20px' }}>Required Documents for Entry</h4>
                <ul>
                  <li><strong>Valid passport</strong> (meeting requirements above)</li>
                  <li><strong>Visa</strong> (if required for your nationality)</li>
                  <li><strong>Completed customs declaration</strong> form</li>
                  <li><strong>Proof of accommodation</strong> (hotel booking, host address)</li>
                  <li><strong>Return or onward ticket</strong> (proof of planned departure)</li>
                  <li><strong>Proof of sufficient funds</strong> (bank statement, credit cards)</li>
                  <li><strong>Travel insurance</strong> (recommended, may be required for certain visas)</li>
                </ul>
              </div>

              <div className="card">
                <h4 className="card-title">Special Cases</h4>

                <div style={{ marginBottom: '16px' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>Minors (Under 18)</h5>
                  <ul>
                    <li>Valid passport required (no age exemptions)</li>
                    <li>Birth certificate (if traveling with one parent only)</li>
                    <li>Notarized consent letter from non-traveling parent(s)</li>
                    <li>Court order if sole custody applies</li>
                  </ul>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>Dual Citizens</h5>
                  <ul>
                    <li>Must use same passport for entry and exit</li>
                    <li>Prayan citizens must enter/exit using Prayan passport</li>
                    <li>Declare dual citizenship at border control if asked</li>
                  </ul>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>Refugees & Stateless Persons</h5>
                  <ul>
                    <li>Travel document issued by country of residence required</li>
                    <li>Visa required regardless of nationality</li>
                    <li>Additional documentation may be requested</li>
                  </ul>
                </div>
              </div>

              <div className="info-box" style={{ background: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.3)' }}>
                <h4 style={{ color: '#dc2626' }}>Important</h4>
                <p>Travelers who do not meet passport requirements will be denied entry and returned to their point of origin at their own expense. Verify all requirements before traveling.</p>
              </div>
            </>
          )}

          {section === 'entry' && (
            <>
              <div className="card">
                <h3 className="card-title">Entry Procedures</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
                  What to expect when arriving at Prayan ports of entry.
                </p>

                <h4>Arrival Process</h4>
                <ol style={{ marginBottom: '20px' }}>
                  <li><strong>Disembark:</strong> Follow signs to immigration (passport control)</li>
                  <li><strong>Complete Forms:</strong> Fill out arrival card and customs declaration if not done in advance</li>
                  <li><strong>Immigration:</strong> Present passport, visa (if applicable), and arrival card to officer</li>
                  <li><strong>Biometrics:</strong> Fingerprints and photo taken (first-time visitors)</li>
                  <li><strong>Questioning:</strong> Officer may ask purpose of visit, length of stay, accommodation</li>
                  <li><strong>Stamp:</strong> Entry stamp placed in passport with permitted stay duration</li>
                  <li><strong>Baggage Claim:</strong> Collect checked luggage</li>
                  <li><strong>Customs:</strong> Declare items if required, proceed through customs inspection</li>
                  <li><strong>Exit:</strong> Welcome to the Republic of Praya!</li>
                </ol>

                <h4>Ports of Entry</h4>
                <ul>
                  <li><strong>Praya International Airport (PYA)</strong> - Main gateway, 24/7 operations</li>
                  <li><strong>Port of Praya</strong> - Seaport for cruise ships and cargo vessels</li>
                  <li><strong>18 Land Border Crossings</strong> - Hours vary by location (most 6 AM - 10 PM)</li>
                </ul>

                <h4 style={{ marginTop: '20px' }}>Automated Passport Control (APC)</h4>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                  Available at major airports for eligible travelers:
                </p>
                <ul>
                  <li>Citizens of visa-free countries</li>
                  <li>Trusted Traveler Program members</li>
                  <li>E-passport holders from participating countries</li>
                  <li>Self-service kiosks - scan passport, answer questions, proceed to officer for verification</li>
                </ul>
              </div>

              <div className="card">
                <h3 className="card-title">Exit Procedures</h3>

                <h4>Departure Process</h4>
                <ol>
                  <li><strong>Check-in:</strong> At airline counter or online</li>
                  <li><strong>Security Screening:</strong> Standard airport security procedures</li>
                  <li><strong>Exit Immigration:</strong> Present passport and boarding pass</li>
                  <li><strong>Exit Stamp:</strong> Passport stamped confirming departure</li>
                  <li><strong>Departure:</strong> Proceed to gate</li>
                </ol>

                <h4 style={{ marginTop: '20px' }}>Exit Requirements</h4>
                <ul>
                  <li>Must depart before visa or permitted stay expires</li>
                  <li>Overstaying may result in fines (¤50-500 depending on duration)</li>
                  <li>Serious overstays may result in deportation and entry ban</li>
                  <li>Exit tax: None (abolished 2023)</li>
                </ul>
              </div>

              <div className="info-box">
                <h4>Need to Extend Your Stay?</h4>
                <p>If you need to stay longer than your visa or permitted period allows, you must apply for an extension at least 7 days before expiration. Visit CBCA Extension Office in Praya City or apply online at cbca.gov.py/extension. Extension fee: ¤100 for up to 30 days.</p>
              </div>
            </>
          )}

          {section === 'advisories' && (
            <>
              <div className="card">
                <h3 className="card-title">Travel Advisories</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
                  Current travel information and safety updates for the Republic of Praya.
                </p>

                <div style={{ padding: '16px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" style={{ marginRight: '8px' }}>
                      <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                      <polyline points="22,4 12,14.01 9,11.01"/>
                    </svg>
                    <h4 style={{ margin: 0, color: '#10b981' }}>Level 1: Exercise Normal Precautions</h4>
                  </div>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0 }}>
                    The Republic of Praya is generally safe for travelers. Exercise normal safety precautions as you would in any country.
                  </p>
                </div>

                <h4>Current Advisories</h4>

                <div className="card" style={{ background: 'var(--bg-elevated)', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                    <h5 style={{ fontSize: '15px', margin: 0 }}>Seasonal Weather Alert</h5>
                    <span style={{ fontSize: '12px', padding: '4px 8px', background: 'rgba(251, 191, 36, 0.2)', color: '#f59e0b', borderRadius: '4px' }}>Updated Dec 1, 2024</span>
                  </div>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: '8px 0 0 0' }}>
                    Hurricane season runs June-November. Monitor weather forecasts if traveling to coastal areas. Follow local authorities' instructions during severe weather events.
                  </p>
                </div>

                <div className="card" style={{ background: 'var(--bg-elevated)', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                    <h5 style={{ fontSize: '15px', margin: 0 }}>Health Requirements</h5>
                    <span style={{ fontSize: '12px', padding: '4px 8px', background: 'rgba(59, 130, 246, 0.2)', color: '#3b82f6', borderRadius: '4px' }}>Ongoing</span>
                  </div>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: '8px 0 0 0' }}>
                    No mandatory vaccinations required for entry. Routine vaccinations (MMR, DTaP, etc.) recommended. Yellow fever vaccination required if arriving from endemic countries. COVID-19 restrictions lifted as of January 2024.
                  </p>
                </div>

                <h4 style={{ marginTop: '24px' }}>Safety Tips</h4>
                <ul>
                  <li><strong>Crime:</strong> Petty theft occurs in tourist areas. Keep valuables secure and be aware of surroundings</li>
                  <li><strong>Transportation:</strong> Use licensed taxis or rideshare apps. Road conditions generally good in cities</li>
                  <li><strong>Emergency Services:</strong> Dial 911 for police, fire, or medical emergencies</li>
                  <li><strong>Natural Disasters:</strong> Praya is in a seismically active zone. Know emergency procedures</li>
                  <li><strong>Local Laws:</strong> Respect local laws and customs. Drug possession carries severe penalties</li>
                  <li><strong>LGBTQ+ Travelers:</strong> Same-sex marriage legal since 2020. Discrimination prohibited by law</li>
                  <li><strong>Women Travelers:</strong> Generally safe. Exercise normal precautions, especially at night</li>
                </ul>
              </div>

              <div className="card">
                <h4 className="card-title">Before You Go</h4>
                <ul>
                  <li>Register your trip with your embassy or consulate</li>
                  <li>Purchase comprehensive travel insurance</li>
                  <li>Make copies of important documents (passport, visa, insurance)</li>
                  <li>Check latest travel advisories from your government</li>
                  <li>Ensure prescriptions are legal in Praya (some medications restricted)</li>
                  <li>Learn basic phrases in Prayan (English widely spoken)</li>
                  <li>Notify your bank of travel plans to avoid card blocks</li>
                </ul>
              </div>

              <div className="card">
                <h4 className="card-title">Important Contacts</h4>
                <ul style={{ fontSize: '14px' }}>
                  <li><strong>Emergency Services:</strong> 911</li>
                  <li><strong>Tourist Police:</strong> 1-800-HELP-PY</li>
                  <li><strong>CBCA Hotline:</strong> 1-800-CBCA-PY</li>
                  <li><strong>Medical Emergency:</strong> 911 or visit nearest hospital ER</li>
                  <li><strong>US Embassy:</strong> +1 (555) 123-4567</li>
                  <li><strong>Travel Advisory Updates:</strong> cbca.gov.py/advisories</li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

function ImportExport() {
  const [category, setCategory] = React.useState('import');

  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/cbca">Home</Link> / Import/Export Regulations
          </div>
          <h1>Import/Export Regulations</h1>
          <p className="subtitle">Commercial trade regulations, permits, and compliance requirements</p>
        </div>
      </div>
      <div className="container">
        <div className="content-text">
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setCategory('import')}
                className={category === 'import' ? 'btn btn-primary' : 'btn btn-secondary'}
                style={{ fontSize: '13px', padding: '10px 20px' }}
              >
                Import Permits
              </button>
              <button
                onClick={() => setCategory('export')}
                className={category === 'export' ? 'btn btn-primary' : 'btn btn-secondary'}
                style={{ fontSize: '13px', padding: '10px 20px' }}
              >
                Export Licenses
              </button>
              <button
                onClick={() => setCategory('compliance')}
                className={category === 'compliance' ? 'btn btn-primary' : 'btn btn-secondary'}
                style={{ fontSize: '13px', padding: '10px 20px' }}
              >
                Trade Compliance
              </button>
              <button
                onClick={() => setCategory('tariffs')}
                className={category === 'tariffs' ? 'btn btn-primary' : 'btn btn-secondary'}
                style={{ fontSize: '13px', padding: '10px 20px' }}
              >
                Tariffs & Duties
              </button>
            </div>
          </div>

          {category === 'import' && (
            <>
              <div className="card">
                <h3 className="card-title">Import Permits & Procedures</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
                  Regulations and requirements for importing commercial goods into the Republic of Praya.
                </p>

                <h4>Import Permit Categories</h4>

                <div style={{ marginBottom: '20px' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>General Import License (GIL)</h5>
                  <ul>
                    <li>Required for most commercial imports</li>
                    <li>Valid for 12 months from date of issue</li>
                    <li>Application fee: ¤200</li>
                    <li>Processing time: 5-10 business days</li>
                    <li>Renewable annually</li>
                  </ul>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>Restricted Goods Permit</h5>
                  <ul>
                    <li>Required for controlled items (firearms, chemicals, pharmaceuticals)</li>
                    <li>Additional documentation required (safety certificates, licenses)</li>
                    <li>Processing time: 15-30 business days</li>
                    <li>Fee: ¤500-2,000 depending on goods</li>
                  </ul>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>Agricultural Import Permit</h5>
                  <ul>
                    <li>Required for plants, seeds, animals, and food products</li>
                    <li>Phytosanitary or veterinary certificate required</li>
                    <li>Inspection at port of entry mandatory</li>
                    <li>Processing time: 10-20 business days</li>
                    <li>Fee: ¤150</li>
                  </ul>
                </div>

                <h4 style={{ marginTop: '24px' }}>Import Procedure</h4>
                <ol>
                  <li><strong>Obtain Import License:</strong> Apply at cbca.gov.py/import or at CBCA office</li>
                  <li><strong>Arrange Shipping:</strong> Use licensed customs broker for documentation</li>
                  <li><strong>Submit Declaration:</strong> File customs entry form before arrival</li>
                  <li><strong>Pay Duties:</strong> Customs duties and taxes must be paid before release</li>
                  <li><strong>Inspection:</strong> Goods subject to inspection at port of entry</li>
                  <li><strong>Clearance:</strong> Release of goods after approval and payment</li>
                </ol>
              </div>

              <div className="card">
                <h4 className="card-title">Required Documentation</h4>
                <ul>
                  <li>Commercial invoice (original)</li>
                  <li>Packing list with detailed description</li>
                  <li>Bill of lading or airway bill</li>
                  <li>Certificate of origin</li>
                  <li>Import license or permit</li>
                  <li>Insurance certificate</li>
                  <li>Any required health/safety certificates</li>
                  <li>Payment proof for duties and taxes</li>
                </ul>
              </div>

              <div className="info-box">
                <h4>Customs Broker Services</h4>
                <p>While not mandatory, using a licensed customs broker is highly recommended for efficient clearance. Licensed brokers can handle documentation, duty calculation, and clearance procedures. Find licensed brokers at cbca.gov.py/brokers.</p>
              </div>
            </>
          )}

          {category === 'export' && (
            <>
              <div className="card">
                <h3 className="card-title">Export Licenses & Procedures</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
                  Requirements for exporting goods from the Republic of Praya.
                </p>

                <h4>Export License Types</h4>

                <div style={{ marginBottom: '20px' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>General Export License</h5>
                  <ul>
                    <li>Required for commercial exports</li>
                    <li>Valid for 12 months</li>
                    <li>Application fee: ¤150</li>
                    <li>Processing time: 3-7 business days</li>
                    <li>No export license needed for shipments under ¤1,000</li>
                  </ul>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>Strategic Goods License</h5>
                  <ul>
                    <li>Required for dual-use items, technology, defense materials</li>
                    <li>End-user certificate required</li>
                    <li>Strict compliance with international sanctions</li>
                    <li>Processing time: 30-60 business days</li>
                    <li>Fee: ¤1,000+</li>
                  </ul>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>Cultural Property Export License</h5>
                  <ul>
                    <li>Required for artwork, antiques, artifacts over 50 years old</li>
                    <li>Certificate from National Heritage Board required</li>
                    <li>Items of national significance may not be exportable</li>
                    <li>Processing time: 20-45 business days</li>
                    <li>Fee: ¤500</li>
                  </ul>
                </div>

                <h4 style={{ marginTop: '24px' }}>Export Procedure</h4>
                <ol>
                  <li><strong>Obtain Export License:</strong> Apply online or at CBCA Export Division</li>
                  <li><strong>Prepare Documentation:</strong> Commercial invoice, packing list, certificate of origin</li>
                  <li><strong>Arrange Shipping:</strong> Book freight and obtain shipping documents</li>
                  <li><strong>Customs Declaration:</strong> File export declaration at port of exit</li>
                  <li><strong>Inspection:</strong> Goods may be inspected before loading</li>
                  <li><strong>Clearance:</strong> Goods cleared for export after verification</li>
                  <li><strong>Shipment:</strong> Goods loaded and shipped to destination</li>
                </ol>
              </div>

              <div className="card">
                <h4 className="card-title">Prohibited Exports</h4>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                  The following items cannot be exported from Praya:
                </p>
                <ul>
                  <li>National treasures and cultural heritage items</li>
                  <li>Endangered species and protected wildlife products</li>
                  <li>Items violating international sanctions</li>
                  <li>Certain strategic minerals and resources (license required)</li>
                  <li>Counterfeit goods</li>
                </ul>
              </div>

              <div className="card">
                <h4 className="card-title">Export Incentives</h4>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                  The government offers incentives to promote exports:
                </p>
                <ul>
                  <li>Export tax exemptions for manufactured goods</li>
                  <li>Duty drawback on imported raw materials used in exports</li>
                  <li>Reduced VAT rate for export-oriented businesses</li>
                  <li>Grants and subsidies for export development</li>
                  <li>Free trade zone benefits</li>
                </ul>
              </div>
            </>
          )}

          {category === 'compliance' && (
            <>
              <div className="card">
                <h3 className="card-title">Trade Compliance</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
                  Regulatory compliance requirements for international trade operations.
                </p>

                <h4>Compliance Requirements</h4>

                <div style={{ marginBottom: '20px' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>Importer/Exporter Registration</h5>
                  <ul>
                    <li>All businesses must register with CBCA Trade Registry</li>
                    <li>Tax identification number (TIN) required</li>
                    <li>Business license and incorporation documents</li>
                    <li>Annual renewal required</li>
                    <li>Registration fee: ¤300</li>
                  </ul>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>Product Standards & Labeling</h5>
                  <ul>
                    <li>Imported goods must meet Prayan safety and quality standards</li>
                    <li>Labeling requirements: Country of origin, ingredients/materials, warnings</li>
                    <li>Language: Labels must include Prayan or English</li>
                    <li>Standards certificates required for electronics, toys, food products</li>
                  </ul>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>Record Keeping</h5>
                  <ul>
                    <li>Maintain records of all import/export transactions for 7 years</li>
                    <li>Include: Invoices, shipping documents, permits, payment records</li>
                    <li>Records subject to audit by CBCA</li>
                    <li>Electronic records acceptable</li>
                  </ul>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>Sanctions Compliance</h5>
                  <ul>
                    <li>Praya enforces UN Security Council sanctions</li>
                    <li>Additional national sanctions may apply</li>
                    <li>Prohibited to trade with designated countries/entities</li>
                    <li>Screen all parties against sanctions lists before transactions</li>
                    <li>Violations subject to severe penalties</li>
                  </ul>
                </div>

                <h4 style={{ marginTop: '24px' }}>Authorized Economic Operator (AEO) Program</h4>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                  Trusted traders can apply for AEO status for expedited processing:
                </p>
                <ul>
                  <li>Simplified customs procedures</li>
                  <li>Reduced physical inspections (risk-based)</li>
                  <li>Priority processing during congestion</li>
                  <li>Mutual recognition with 45 partner countries</li>
                  <li>Requirements: 2+ years trade history, compliance record, security measures</li>
                  <li>Application fee: ¤1,500, valid for 3 years</li>
                </ul>
              </div>

              <div className="card">
                <h4 className="card-title">Penalties for Non-Compliance</h4>
                <ul>
                  <li><strong>False declarations:</strong> Fine up to ¤50,000 or 3x value of goods</li>
                  <li><strong>Smuggling:</strong> Criminal prosecution, imprisonment up to 10 years</li>
                  <li><strong>Unlicensed imports:</strong> Seizure of goods, fine ¤5,000-25,000</li>
                  <li><strong>Prohibited goods:</strong> Seizure, fine, possible criminal charges</li>
                  <li><strong>Failure to pay duties:</strong> Interest charges, penalty fees, legal action</li>
                  <li><strong>Repeat violations:</strong> Suspension or revocation of trading privileges</li>
                </ul>
              </div>

              <div className="info-box">
                <h4>Compliance Assistance</h4>
                <p>CBCA offers free compliance workshops and guidance for traders. Contact the Trade Compliance Division at compliance@cbca.gov.py or 1-800-TRADE-PY for assistance with regulations, classification, and compliance programs.</p>
              </div>
            </>
          )}

          {category === 'tariffs' && (
            <>
              <div className="card">
                <h3 className="card-title">Tariffs & Customs Duties</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
                  Duty rates and tax requirements for imported goods.
                </p>

                <h4>Customs Duty Structure</h4>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                  Praya uses the Harmonized System (HS) for tariff classification. Duty rates vary by product category:
                </p>

                <div style={{ marginBottom: '20px' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>Ad Valorem Duties</h5>
                  <ul>
                    <li>Most goods subject to percentage of declared value</li>
                    <li>Standard rate: 10% for most products</li>
                    <li>Raw materials & industrial inputs: 0-5%</li>
                    <li>Consumer goods: 10-20%</li>
                    <li>Luxury items: 25-35%</li>
                    <li>Sensitive products (agriculture, textiles): Up to 40%</li>
                  </ul>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>Specific Duties</h5>
                  <ul>
                    <li>Certain goods subject to per-unit charges</li>
                    <li>Alcoholic beverages: ¤5-15 per liter</li>
                    <li>Tobacco products: ¤50-100 per kg</li>
                    <li>Fuel: ¤0.30 per liter</li>
                  </ul>
                </div>

                <h4 style={{ marginTop: '24px' }}>Additional Taxes</h4>
                <ul>
                  <li><strong>Value Added Tax (VAT):</strong> 12% on most imports (calculated on duty-paid value)</li>
                  <li><strong>Excise Tax:</strong> Applies to alcohol, tobacco, fuel, luxury vehicles</li>
                  <li><strong>Environmental Levy:</strong> 2% on plastic products, electronics</li>
                  <li><strong>Anti-Dumping Duties:</strong> Additional duties on certain products from specific countries</li>
                </ul>

                <h4 style={{ marginTop: '24px' }}>Duty-Free & Reduced Rates</h4>

                <div style={{ marginBottom: '16px' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>Free Trade Agreements</h5>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                    Praya has FTAs with:
                  </p>
                  <ul>
                    <li>Regional Economic Community (REC) - 0% on most goods</li>
                    <li>Pacific Alliance - Reduced tariffs (0-5%)</li>
                    <li>EU Partnership - Preferential rates on qualifying goods</li>
                    <li>Certificate of origin required to claim FTA benefits</li>
                  </ul>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>Duty Exemptions</h5>
                  <ul>
                    <li>Personal effects and household goods (for returning residents)</li>
                    <li>Diplomatic imports</li>
                    <li>Goods for charitable organizations (with approval)</li>
                    <li>Temporary imports for re-export (carnet system)</li>
                    <li>Samples of negligible value</li>
                  </ul>
                </div>
              </div>

              <div className="card">
                <h4 className="card-title">Duty Calculation Example</h4>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                  Importing consumer electronics worth ¤10,000:
                </p>
                <div style={{ fontSize: '14px', fontFamily: 'monospace', background: 'var(--bg-elevated)', padding: '16px', borderRadius: '8px' }}>
                  <div>Declared Value: ¤10,000</div>
                  <div>Customs Duty (15%): ¤1,500</div>
                  <div>Duty-Paid Value: ¤11,500</div>
                  <div>VAT (12% of ¤11,500): ¤1,380</div>
                  <div>Environmental Levy (2%): ¤230</div>
                  <div style={{ borderTop: '1px solid var(--border-subtle)', marginTop: '8px', paddingTop: '8px', fontWeight: 'bold' }}>
                    Total Payable: ¤13,110
                  </div>
                </div>
              </div>

              <div className="card">
                <h4 className="card-title">Tariff Resources</h4>
                <ul>
                  <li><strong>Online Tariff Database:</strong> Search HS codes and rates at cbca.gov.py/tariff</li>
                  <li><strong>Duty Calculator:</strong> Estimate duties and taxes online</li>
                  <li><strong>Binding Rulings:</strong> Request advance classification ruling (fee: ¤250, valid 3 years)</li>
                  <li><strong>Tariff Helpline:</strong> 1-800-TARIFF-PY (Monday-Friday 8 AM - 6 PM)</li>
                </ul>
              </div>

              <div className="info-box">
                <h4>Customs Valuation</h4>
                <p>Customs value is based on transaction value (invoice price plus shipping, insurance). CBCA may adjust declared values that appear inconsistent with market prices. Keep accurate invoices and be prepared to provide supporting documentation.</p>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
