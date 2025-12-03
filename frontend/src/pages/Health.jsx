import React, { useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import './Department.css'

export default function Health() {
  const navigate = useNavigate()

  useEffect(() => {
    document.body.classList.add('theme-health')
    return () => document.body.classList.remove('theme-health')
  }, [])

  return (
    <>
      <header className="dept-header">
        <div className="container">
          <Link to="/health" className="dept-logo">
            <div className="logo-mark">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
              </svg>
            </div>
            <div className="logo-text">
              <h1>Department of Health</h1>
              <span className="tagline">Republic of Praya</span>
            </div>
          </Link>
          <nav className="nav">
            <Link to="/health" className="nav-link">Home</Link>
            <Link to="/health/insurance" className="nav-link">Insurance</Link>
            <Link to="/health/vaccinations" className="nav-link">Vaccinations</Link>
            <Link to="/health/providers" className="nav-link">Find Provider</Link>
          </nav>
        </div>
      </header>

      <Routes>
        <Route index element={<HealthHome navigate={navigate} />} />
        <Route path="insurance" element={<HealthInsurance />} />
        <Route path="vaccinations" element={<ComingSoon title="Vaccination Services" />} />
        <Route path="providers" element={<ComingSoon title="Healthcare Providers" />} />
      </Routes>

      <footer className="dept-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <h4>Department of Health</h4>
              <p>Committed to protecting and improving the health and well-being of all residents of the Republic of Praya.</p>
            </div>
            <div className="footer-section">
              <h5>Services</h5>
              <ul>
                <li><Link to="/health/insurance">Health Insurance</Link></li>
                <li><a href="#">Find Doctor</a></li>
                <li><a href="#">Prescription Assistance</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5>Emergency</h5>
              <ul>
                <li><a href="tel:911">Emergency: 911</a></li>
                <li><a href="tel:1-800-HEALTH-PY">Health Info: 1-800-HEALTH-PY</a></li>
                <li><a href="#">Find Hospital</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5>Government</h5>
              <ul>
                <li><Link to="/">Gov Portal</Link></li>
                <li><a href="#">Public Health Alerts</a></li>
                <li><a href="#">Health Statistics</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>&copy; 2024 Republic of Praya. Department of Health.</span>
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

function HealthHome({ navigate }) {
  return (
    <>
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-bg-shape"></div>
          <div className="hero-bg-shape"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <h2>Health for <span>Everyone</span></h2>
            <p>The Department of Health ensures access to quality healthcare services, promotes public health initiatives, and protects the well-being of all Praya residents.</p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => navigate('/health/insurance')}>
                Health Insurance
              </button>
              <button className="btn btn-secondary" onClick={() => navigate('/health/providers')}>
                Find Healthcare Provider
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Insured Citizens</span>
              <span className="stat-value">94.2%</span>
              <span className="stat-change">Coverage Rate</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Healthcare Facilities</span>
              <span className="stat-value">1,247</span>
              <span className="stat-change">Nationwide</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Life Expectancy</span>
              <span className="stat-value">81.3 yrs</span>
              <span className="stat-change">Average</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Vaccinated</span>
              <span className="stat-value">89%</span>
              <span className="stat-change">Full Coverage</span>
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
                  <h3 className="card-title">Health Insurance Programs</h3>
                  <Link to="/health/insurance" className="card-link">View Details</Link>
                </div>
                <div className="content-text">
                  <h4>National Health Insurance (NHI)</h4>
                  <ul>
                    <li><strong>Universal Coverage</strong> - Available to all citizens and legal residents</li>
                    <li><strong>Comprehensive Benefits</strong> - Hospitalization, outpatient care, prescriptions</li>
                    <li><strong>Low Cost</strong> - Subsidized premiums based on income</li>
                    <li><strong>No Exclusions</strong> - Pre-existing conditions covered</li>
                  </ul>
                  <h4 style={{ marginTop: '20px' }}>Supplemental Plans</h4>
                  <ul>
                    <li><strong>Premium Care</strong> - Private hospital rooms, specialist access</li>
                    <li><strong>Dental & Vision</strong> - Additional coverage for dental and eye care</li>
                    <li><strong>International Coverage</strong> - Medical care while traveling abroad</li>
                  </ul>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Public Health Services</h3>
                </div>
                <div className="content-text">
                  <h4>Free Services</h4>
                  <ul>
                    <li>Childhood immunizations and school health programs</li>
                    <li>Prenatal care and family planning services</li>
                    <li>Tuberculosis and HIV testing and treatment</li>
                    <li>Health screenings for chronic diseases</li>
                  </ul>
                  <h4 style={{ marginTop: '20px' }}>Health Education</h4>
                  <p>Free workshops and resources on nutrition, exercise, disease prevention, and healthy living available at all public health centers.</p>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Health Alerts & News</h3>
                </div>
                <div className="news-item">
                  <span className="news-date">Dec 1, 2024</span>
                  <h4 className="news-title">Flu Season: Get Your Vaccine</h4>
                  <p className="news-excerpt">Free flu shots available at all public health clinics and pharmacies through February.</p>
                </div>
                <div className="news-item">
                  <span className="news-date">Nov 25, 2024</span>
                  <h4 className="news-title">New Mental Health Hotline Launched</h4>
                  <p className="news-excerpt">24/7 crisis support and counseling now available at 988.</p>
                </div>
              </div>
            </div>

            <aside className="sidebar">
              <div className="card">
                <h4 className="card-title">Quick Services</h4>
                <div className="quick-link" onClick={() => navigate('/health/insurance')}>
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                      <line x1="1" y1="10" x2="23" y2="10"/>
                    </svg>
                  </span>
                  Apply for Insurance
                </div>
                <div className="quick-link" onClick={() => navigate('/health/providers')}>
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"/>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                  </span>
                  Find Healthcare Provider
                </div>
                <div className="quick-link" onClick={() => navigate('/health/vaccinations')}>
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                      <polyline points="22,4 12,14.01 9,11.01"/>
                    </svg>
                  </span>
                  Vaccination Records
                </div>
                <div className="quick-link">
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                      <polyline points="14,2 14,8 20,8"/>
                    </svg>
                  </span>
                  Medical Records Request
                </div>
              </div>

              <div className="info-box">
                <h4>Emergency Contacts</h4>
                <p><strong>Emergency:</strong> 911</p>
                <p><strong>Health Info:</strong> 1-800-HEALTH-PY</p>
                <p><strong>Crisis Line:</strong> 988</p>
                <p><strong>Poison Control:</strong> 1-800-POISON</p>
              </div>

              <div className="card" style={{ background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)', color: 'white', border: 'none' }}>
                <h4 style={{ color: 'white', marginBottom: '8px' }}>When to Call 911</h4>
                <div style={{ fontSize: '13px', lineHeight: '1.6', opacity: 0.95 }}>
                  <p style={{ marginBottom: '6px' }}>• Chest pain or difficulty breathing</p>
                  <p style={{ marginBottom: '6px' }}>• Severe bleeding or injuries</p>
                  <p style={{ marginBottom: '6px' }}>• Loss of consciousness</p>
                  <p style={{ marginBottom: '6px' }}>• Suspected stroke or heart attack</p>
                  <p>• Severe allergic reactions</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  )
}

function HealthInsurance() {
  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/health">Home</Link> / Health Insurance
          </div>
          <h1>Health Insurance Programs</h1>
          <p className="subtitle">Affordable healthcare coverage for all residents</p>
        </div>
      </div>
      <div className="container">
        <div className="content-text">
          <h3>National Health Insurance (NHI)</h3>
          <p>The Republic of Praya's universal health insurance program provides comprehensive medical coverage to all citizens and legal residents.</p>

          <div className="card" style={{ marginTop: '20px' }}>
            <h4 className="card-title">NHI Standard Plan</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Comprehensive coverage for essential healthcare services:</p>
            <ul style={{ marginBottom: '12px' }}>
              <li><strong>Hospitalization:</strong> Full coverage for public hospital stays</li>
              <li><strong>Outpatient Care:</strong> Doctor visits, specialist consultations</li>
              <li><strong>Emergency Services:</strong> 100% coverage for emergency room visits</li>
              <li><strong>Prescription Drugs:</strong> Formulary medications with ¤5-¤20 copay</li>
              <li><strong>Preventive Care:</strong> Annual checkups, screenings, immunizations</li>
              <li><strong>Maternity & Newborn Care:</strong> Prenatal, delivery, and postnatal care</li>
              <li><strong>Mental Health:</strong> Therapy and counseling services</li>
            </ul>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Monthly Premium:</strong> ¤50-¤350 based on income (subsidized for low-income residents)
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">NHI Premium Plan</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Enhanced coverage with additional benefits:</p>
            <ul style={{ marginBottom: '12px' }}>
              <li>All Standard Plan benefits included</li>
              <li>Private hospital room options</li>
              <li>Shorter wait times for elective procedures</li>
              <li>Extended specialist network</li>
              <li>Dental cleanings and basic procedures (2x per year)</li>
              <li>Vision exams and eyewear allowance (¤200 annually)</li>
              <li>Alternative medicine coverage (acupuncture, chiropractic)</li>
            </ul>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Monthly Premium:</strong> ¤180-¤520 based on income
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Supplemental Insurance</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Add-on coverage for specific needs:</p>
            <ul>
              <li><strong>Dental Plus:</strong> Comprehensive dental coverage including major procedures (¤45/month)</li>
              <li><strong>Vision Plus:</strong> Enhanced eyewear benefits and LASIK discounts (¤25/month)</li>
              <li><strong>International Coverage:</strong> Medical care while traveling abroad (¤35/month)</li>
              <li><strong>Long-term Care:</strong> Nursing home and home care services (¤75/month)</li>
            </ul>
          </div>

          <h3 style={{ marginTop: '32px' }}>Eligibility & Enrollment</h3>

          <div className="card">
            <h4 className="card-title">Who Can Apply</h4>
            <ul>
              <li>Citizens of the Republic of Praya</li>
              <li>Legal permanent residents</li>
              <li>Work visa holders (employed 6+ months)</li>
              <li>Dependent children up to age 26</li>
              <li>Spouses and domestic partners</li>
            </ul>
          </div>

          <div className="card">
            <h4 className="card-title">How to Apply</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Enrollment process:</p>
            <ol>
              <li>Complete online application at health.gov.py</li>
              <li>Provide proof of identity and residency</li>
              <li>Submit income documentation for subsidy eligibility</li>
              <li>Select plan and coverage options</li>
              <li>Pay first month's premium</li>
            </ol>
            <p style={{ marginTop: '12px', fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Processing time:</strong> 2-3 weeks | <strong>Coverage starts:</strong> 1st of following month
            </p>
          </div>

          <h3 style={{ marginTop: '32px' }}>Enrollment Periods</h3>
          <ul>
            <li><strong>Open Enrollment:</strong> November 1 - December 31 (coverage starts January 1)</li>
            <li><strong>Special Enrollment:</strong> Available for qualifying life events (marriage, birth, job loss, etc.)</li>
            <li><strong>New Residents:</strong> Can enroll within 60 days of establishing residency</li>
          </ul>

          <div className="info-box" style={{ marginTop: '24px' }}>
            <h4>Need Help Choosing?</h4>
            <p>Free insurance counselors available at all public health centers or call 1-800-HEALTH-PY for personalized guidance.</p>
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
      case 'Vaccination Services':
        return {
          description: 'Immunization records, vaccination schedules, and clinic locations.',
          services: ['View Vaccination Records', 'Childhood Immunization Schedule', 'Travel Vaccines', 'Flu Shot Locations'],
          contact: 'For vaccination info: Call 1-800-HEALTH-PY or visit any public health clinic'
        };
      case 'Healthcare Providers':
        return {
          description: 'Find doctors, specialists, hospitals, and clinics in your area.',
          services: ['Doctor Search by Specialty', 'Hospital Directory', 'Clinic Locations', 'Provider Ratings & Reviews'],
          contact: 'For provider referrals: Contact your insurance or call 1-800-HEALTH-PY'
        };
      default:
        return {
          description: 'This service is being developed to serve you better.',
          services: [],
          contact: 'For assistance, contact the Department of Health'
        };
    }
  };

  const info = getServiceInfo();

  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/health">Home</Link> / {title}
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
              background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.1) 0%, rgba(220, 38, 38, 0.2) 100%)',
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
              background: 'rgba(220, 38, 38, 0.05)',
              borderRadius: '10px',
              fontSize: '13px',
              color: 'var(--text-muted)'
            }}>
              {info.contact}
            </div>

            <div style={{ marginTop: '32px' }}>
              <h4 style={{ fontSize: '14px', marginBottom: '12px' }}>Related Services</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                <Link to="/health/insurance" style={{
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
                  Health Insurance
                </Link>
                <button
                  onClick={() => navigate('/health')}
                  className="btn btn-secondary"
                  style={{ fontSize: '13px', padding: '14px' }}
                >
                  Return to Health Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
