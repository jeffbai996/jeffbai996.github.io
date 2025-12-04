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
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
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
            <Link to="/health/alerts" className="nav-link">Health Alerts</Link>
          </nav>
        </div>
      </header>

      <Routes>
        <Route index element={<HealthHome navigate={navigate} />} />
        <Route path="insurance" element={<HealthInsurance />} />
        <Route path="vaccinations" element={<Vaccinations />} />
        <Route path="providers" element={<HealthcareProviders />} />
        <Route path="alerts" element={<HealthAlerts />} />
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
                <li><Link to="/health/providers">Find Doctor</Link></li>
                <li><Link to="/health/vaccinations">Vaccinations</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5>Emergency</h5>
              <ul>
                <li><a href="tel:911">Emergency: 911</a></li>
                <li><a href="tel:1-800-HEALTH-PY">Health Info: 1-800-HEALTH-PY</a></li>
                <li><Link to="/health/providers">Find Hospital</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5>Government</h5>
              <ul>
                <li><Link to="/">Gov Portal</Link></li>
                <li><Link to="/health/alerts">Public Health Alerts</Link></li>
                <li><Link to="/health">Health Statistics</Link></li>
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
          <div className="hero-bg-shape"></div>
        </div>
        <div className="hero-pattern"></div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
              Public Health Services
            </div>
            <h2>Health for <span>Everyone</span></h2>
            <p>The Department of Health ensures access to quality healthcare services, promotes public health initiatives, and protects the well-being of all Praya residents through comprehensive medical programs.</p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => navigate('/health/insurance')}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                  <line x1="1" y1="10" x2="23" y2="10"/>
                </svg>
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

              <div className="card emergency-card">
                <h4>When to Call 911</h4>
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

function Vaccinations() {
  const [ageGroup, setAgeGroup] = React.useState('adult');

  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/health">Home</Link> / Vaccinations
          </div>
          <h1>Vaccination Services</h1>
          <p className="subtitle">Immunization schedules, vaccine information, and clinic locations</p>
        </div>
      </div>
      <div className="container">
        <div className="content-grid">
          <div className="main-content">
            <div className="card">
              <h3 className="card-title">View Vaccination Schedule</h3>
              <div className="content-text">
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Age Group</label>
                  <select
                    value={ageGroup}
                    onChange={(e) => setAgeGroup(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}
                  >
                    <option value="infant">Infants (0-2 years)</option>
                    <option value="child">Children (2-12 years)</option>
                    <option value="teen">Teens (13-17 years)</option>
                    <option value="adult">Adults (18-64 years)</option>
                    <option value="senior">Seniors (65+ years)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="card-title">Recommended Vaccines by Age</h3>
              <div className="content-text">
                <h4>Infants & Children (Birth - 6 years)</h4>
                <ul style={{ marginBottom: '16px' }}>
                  <li><strong>Hepatitis B:</strong> Birth, 1-2 months, 6-18 months</li>
                  <li><strong>DTaP (Diphtheria, Tetanus, Pertussis):</strong> 2, 4, 6, 15-18 months, 4-6 years</li>
                  <li><strong>Hib (Haemophilus influenzae type b):</strong> 2, 4, 6, 12-15 months</li>
                  <li><strong>Polio (IPV):</strong> 2, 4, 6-18 months, 4-6 years</li>
                  <li><strong>Pneumococcal (PCV13):</strong> 2, 4, 6, 12-15 months</li>
                  <li><strong>Rotavirus:</strong> 2, 4, 6 months</li>
                  <li><strong>MMR (Measles, Mumps, Rubella):</strong> 12-15 months, 4-6 years</li>
                  <li><strong>Varicella (Chickenpox):</strong> 12-15 months, 4-6 years</li>
                  <li><strong>Hepatitis A:</strong> 12-23 months (2 doses)</li>
                </ul>

                <h4>Preteens & Teens (7-18 years)</h4>
                <ul style={{ marginBottom: '16px' }}>
                  <li><strong>Tdap booster:</strong> 11-12 years</li>
                  <li><strong>HPV (Human Papillomavirus):</strong> 11-12 years (2-3 doses)</li>
                  <li><strong>Meningococcal:</strong> 11-12 years, booster at 16</li>
                  <li><strong>Annual flu vaccine:</strong> Recommended for all ages</li>
                </ul>

                <h4>Adults (19+ years)</h4>
                <ul style={{ marginBottom: '16px' }}>
                  <li><strong>Td/Tdap booster:</strong> Every 10 years</li>
                  <li><strong>HPV:</strong> Through age 26 (catch-up)</li>
                  <li><strong>Shingles (Zoster):</strong> Age 50+ (2 doses)</li>
                  <li><strong>Pneumococcal:</strong> Age 65+ (PCV15/PCV20 or PPSV23)</li>
                  <li><strong>Annual flu vaccine:</strong> All adults</li>
                  <li><strong>COVID-19:</strong> Per current recommendations</li>
                </ul>
              </div>
            </div>

            <div className="card">
              <h3 className="card-title">Travel Vaccinations</h3>
              <div className="content-text">
                <p>Required or recommended vaccines for international travel:</p>
                <ul style={{ marginTop: '12px' }}>
                  <li><strong>Yellow Fever:</strong> Required for travel to certain countries in Africa and South America</li>
                  <li><strong>Typhoid:</strong> Recommended for travel to developing countries</li>
                  <li><strong>Japanese Encephalitis:</strong> For travel to rural areas of Asia</li>
                  <li><strong>Rabies:</strong> For extended travel in areas with limited medical care</li>
                  <li><strong>Hepatitis A & B:</strong> Recommended for most international travel</li>
                  <li><strong>Meningococcal:</strong> Required for pilgrimage to Mecca (Hajj)</li>
                </ul>
                <p style={{ marginTop: '12px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                  <strong>Note:</strong> Schedule travel clinic appointment 4-6 weeks before departure
                </p>
              </div>
            </div>

            <div className="card">
              <h3 className="card-title">Vaccination Records</h3>
              <div className="content-text">
                <p>Access and manage your immunization records:</p>
                <ul style={{ marginTop: '12px' }}>
                  <li>View complete vaccination history</li>
                  <li>Download official immunization certificate</li>
                  <li>Check upcoming due dates for boosters</li>
                  <li>Submit records for school/work requirements</li>
                  <li>Request catch-up vaccination recommendations</li>
                </ul>
                <button className="btn btn-primary" style={{ width: '100%', marginTop: '16px', padding: '14px' }}>
                  Access My Records
                </button>
              </div>
            </div>
          </div>

          <aside className="sidebar">
            <div className="card" style={{ background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)', color: 'white', border: 'none' }}>
              <h4 style={{ color: 'white', marginBottom: '8px' }}>Vaccine Safety</h4>
              <p style={{ fontSize: '14px', opacity: 0.9, lineHeight: '1.5' }}>
                All vaccines are rigorously tested for safety and effectiveness. Serious side effects are rare. Benefits far outweigh risks.
              </p>
            </div>

            <div className="info-box">
              <h4>Find a Clinic</h4>
              <p><strong>Public Health Clinics:</strong> 87 locations nationwide</p>
              <p><strong>Hours:</strong> Mon-Fri 8AM-5PM</p>
              <p><strong>Walk-ins welcome</strong> for most vaccines</p>
            </div>

            <div className="card">
              <h4 className="card-title">Vaccine Costs</h4>
              <ul style={{ fontSize: '14px' }}>
                <li><strong>Children:</strong> Free under National Program</li>
                <li><strong>Adults:</strong> Covered by most insurance</li>
                <li><strong>Travel vaccines:</strong> ¤35-¤150 per dose</li>
                <li><strong>No insurance:</strong> Sliding scale available</li>
              </ul>
            </div>

            <div className="info-box">
              <h4>Questions?</h4>
              <p><strong>Phone:</strong> 1-800-HEALTH-PY</p>
              <p><strong>Email:</strong> vaccines@health.gov.py</p>
              <p><strong>Hours:</strong> Mon-Fri 8AM-6PM</p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}

function HealthcareProviders() {
  const [specialty, setSpecialty] = React.useState('');
  const [location, setLocation] = React.useState('');

  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/health">Home</Link> / Find Provider
          </div>
          <h1>Find Healthcare Providers</h1>
          <p className="subtitle">Search for doctors, specialists, hospitals, and clinics</p>
        </div>
      </div>
      <div className="container">
        <div className="content-grid">
          <div className="main-content">
            <div className="card">
              <h3 className="card-title">Provider Search</h3>
              <div className="content-text">
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Specialty or Type</label>
                  <select
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}
                  >
                    <option value="">All Providers</option>
                    <option value="primary">Primary Care Physician</option>
                    <option value="cardiology">Cardiologist</option>
                    <option value="dermatology">Dermatologist</option>
                    <option value="orthopedics">Orthopedic Surgeon</option>
                    <option value="pediatrics">Pediatrician</option>
                    <option value="obgyn">OB/GYN</option>
                    <option value="psychiatry">Psychiatrist</option>
                    <option value="dentist">Dentist</option>
                    <option value="hospital">Hospital</option>
                    <option value="urgent">Urgent Care</option>
                  </select>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="City, postal code, or address"
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-subtle)', fontSize: '16px' }}
                  />
                </div>

                <button className="btn btn-primary" style={{ width: '100%', padding: '14px' }}>
                  Search Providers
                </button>
              </div>
            </div>

            <div className="card">
              <h3 className="card-title">Major Hospitals</h3>
              <div className="content-text">
                <div style={{ marginBottom: '16px' }}>
                  <h4 style={{ marginBottom: '4px' }}>Praya General Hospital</h4>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '4px' }}>Level 1 Trauma Center • 847 beds</p>
                  <p style={{ fontSize: '14px' }}>1200 Medical Center Drive, Praya City • (555) 100-1000</p>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <h4 style={{ marginBottom: '4px' }}>Central Medical Center</h4>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '4px' }}>Teaching Hospital • 612 beds</p>
                  <p style={{ fontSize: '14px' }}>450 University Ave, Praya City • (555) 200-2000</p>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <h4 style={{ marginBottom: '4px' }}>Children's Hospital of Praya</h4>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '4px' }}>Pediatric Specialty Center • 285 beds</p>
                  <p style={{ fontSize: '14px' }}>89 Children's Way, Praya City • (555) 300-3000</p>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="card-title">Choosing a Provider</h3>
              <div className="content-text">
                <p>Factors to consider when selecting a healthcare provider:</p>
                <ul style={{ marginTop: '12px' }}>
                  <li><strong>Insurance network:</strong> Check if provider accepts your insurance</li>
                  <li><strong>Location & hours:</strong> Convenient access and appointment availability</li>
                  <li><strong>Board certification:</strong> Verify credentials and specialties</li>
                  <li><strong>Hospital affiliations:</strong> Which hospitals provider uses</li>
                  <li><strong>Languages spoken:</strong> Communication preferences</li>
                  <li><strong>Patient reviews:</strong> Ratings and experiences from other patients</li>
                  <li><strong>Gender preference:</strong> Some patients prefer male or female providers</li>
                </ul>
              </div>
            </div>

            <div className="card">
              <h3 className="card-title">Urgent & Emergency Care</h3>
              <div className="content-text">
                <p><strong>When to use each:</strong></p>
                <ul style={{ marginTop: '12px', marginBottom: '16px' }}>
                  <li><strong>911/Emergency Room:</strong> Life-threatening conditions (chest pain, stroke, severe bleeding, major trauma)</li>
                  <li><strong>Urgent Care:</strong> Non-life-threatening issues needing same-day care (sprains, minor cuts, flu, infections)</li>
                  <li><strong>Telehealth:</strong> Minor issues, prescription refills, follow-ups</li>
                  <li><strong>Primary Care:</strong> Routine checkups, chronic condition management, preventive care</li>
                </ul>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  <strong>Emergency:</strong> Call 911 or go to nearest ER
                </p>
              </div>
            </div>
          </div>

          <aside className="sidebar">
            <div className="card">
              <h4 className="card-title">Quick Access</h4>
              <div className="quick-link">
                <span className="icon">📋</span>
                Verify Provider License
              </div>
              <div className="quick-link">
                <span className="icon">⭐</span>
                Read Patient Reviews
              </div>
              <div className="quick-link">
                <span className="icon">📅</span>
                Book Appointment
              </div>
              <div className="quick-link">
                <span className="icon">💊</span>
                Find Pharmacy
              </div>
            </div>

            <div className="info-box">
              <h4>Provider Statistics</h4>
              <p><strong>Active Physicians:</strong> 8,450</p>
              <p><strong>Specialists:</strong> 3,200</p>
              <p><strong>Primary Care:</strong> 5,250</p>
              <p><strong>Hospitals:</strong> 47</p>
              <p><strong>Clinics:</strong> 1,200+</p>
            </div>

            <div className="card">
              <h4 className="card-title">Need Help Choosing?</h4>
              <p style={{ fontSize: '14px' }}>Call our Provider Referral Line for assistance finding the right doctor for your needs.</p>
              <p style={{ fontSize: '14px', marginTop: '12px' }}><strong>1-800-FIND-DOC</strong></p>
            </div>

            <div className="info-box">
              <h4>Report Provider Concerns</h4>
              <p style={{ fontSize: '14px' }}>File complaints about medical care, billing, or professional conduct.</p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}

function HealthAlerts() {
  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/health">Home</Link> / Health Alerts
          </div>
          <h1>Public Health Alerts</h1>
          <p className="subtitle">Current advisories, disease outbreaks, and safety recommendations</p>
        </div>
      </div>
      <div className="container">
        <div className="content-grid">
          <div className="main-content">
            <div className="card" style={{ background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.1) 0%, rgba(220, 38, 38, 0.05) 100%)', border: '2px solid #dc2626' }}>
              <h3 style={{ color: '#dc2626', marginBottom: '12px' }}>⚠️ Current Alerts</h3>
              <div style={{ fontSize: '14px' }}>
                <div style={{ padding: '12px', background: 'white', borderRadius: '8px', marginBottom: '12px', border: '1px solid #fee2e2' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <strong>Influenza Activity Level: MODERATE</strong>
                    <span style={{ color: '#dc2626' }}>Dec 4, 2024</span>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Flu cases increasing across Praya. Get vaccinated if you haven't already. Practice good hand hygiene.</p>
                </div>
                <div style={{ padding: '12px', background: 'white', borderRadius: '8px', marginBottom: '12px', border: '1px solid #fee2e2' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <strong>Air Quality Advisory - Praya City</strong>
                    <span style={{ color: '#dc2626' }}>Dec 3, 2024</span>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Elevated particulate matter levels. Sensitive groups should limit outdoor activity. Expected to clear by evening.</p>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="card-title">Disease Surveillance</h3>
              <div className="content-text">
                <h4>Seasonal Trends</h4>
                <ul style={{ marginBottom: '16px' }}>
                  <li><strong>Influenza:</strong> Moderate activity, increasing trend. Peak expected in January.</li>
                  <li><strong>COVID-19:</strong> Low community transmission. Vaccines available.</li>
                  <li><strong>RSV:</strong> Moderate activity in children under 5. Consider vaccination for high-risk infants.</li>
                  <li><strong>Norovirus:</strong> Typical seasonal activity. Practice hand hygiene, especially in group settings.</li>
                </ul>

                <h4>No Current Outbreaks</h4>
                <p style={{ marginTop: '12px', fontSize: '14px', color: 'var(--text-muted)' }}>
                  No significant disease outbreaks reported in Praya at this time. Continue routine preventive measures.
                </p>
              </div>
            </div>

            <div className="card">
              <h3 className="card-title">Food Safety Recalls</h3>
              <div className="content-text">
                <div style={{ marginBottom: '16px' }}>
                  <strong style={{ color: '#dc2626' }}>Dec 1, 2024:</strong> Fresh spinach recalled due to possible Salmonella contamination
                  <p style={{ fontSize: '13px', marginTop: '4px', color: 'var(--text-muted)' }}>
                    Brand: GreenLeaf Farms • UPC: 123456789 • Best by dates: 12/05-12/10
                  </p>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <strong style={{ color: '#dc2626' }}>Nov 28, 2024:</strong> Ground beef recalled for potential E. coli O157:H7
                  <p style={{ fontSize: '13px', marginTop: '4px', color: 'var(--text-muted)' }}>
                    Brand: Prime Meats • Production dates: 11/15-11/20 • Sold at major retailers
                  </p>
                </div>
                <p style={{ marginTop: '16px', fontSize: '13px' }}>
                  <strong>If you have recalled products:</strong> Do not consume. Return to store for refund or discard.
                </p>
              </div>
            </div>

            <div className="card">
              <h3 className="card-title">Seasonal Health Tips</h3>
              <div className="content-text">
                <h4>Winter Health</h4>
                <ul>
                  <li><strong>Get vaccinated:</strong> Flu, COVID-19, RSV (if eligible)</li>
                  <li><strong>Wash hands frequently:</strong> 20 seconds with soap and water</li>
                  <li><strong>Stay home when sick:</strong> Prevent spreading illness to others</li>
                  <li><strong>Manage chronic conditions:</strong> Cold weather can affect heart, asthma</li>
                  <li><strong>Carbon monoxide safety:</strong> Check detectors, never use generators indoors</li>
                  <li><strong>Winter driving:</strong> Prepare vehicle, check weather before travel</li>
                </ul>
              </div>
            </div>

            <div className="card">
              <h3 className="card-title">Travel Health Notices</h3>
              <div className="content-text">
                <p>Current health advisories for international travelers:</p>
                <ul style={{ marginTop: '12px' }}>
                  <li><strong>Dengue Fever:</strong> Increased activity in Southeast Asia and Caribbean. Use insect repellent.</li>
                  <li><strong>Measles:</strong> Outbreaks in several European countries. Ensure MMR vaccination up to date.</li>
                  <li><strong>Yellow Fever:</strong> Ongoing transmission in parts of Africa and South America. Vaccination required.</li>
                </ul>
                <p style={{ marginTop: '16px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                  <strong>Before travel:</strong> Visit travel clinic 4-6 weeks before departure for vaccines and guidance.
                </p>
              </div>
            </div>
          </div>

          <aside className="sidebar">
            <div className="card">
              <h4 className="card-title">Sign Up for Alerts</h4>
              <p style={{ fontSize: '14px', marginBottom: '12px' }}>Receive emergency health notifications by:</p>
              <ul style={{ fontSize: '14px' }}>
                <li>Email</li>
                <li>Text message (SMS)</li>
                <li>Mobile app push notifications</li>
              </ul>
              <button className="btn btn-primary" style={{ width: '100%', marginTop: '12px', padding: '12px' }}>
                Subscribe to Alerts
              </button>
            </div>

            <div className="info-box">
              <h4>Alert Levels</h4>
              <div style={{ fontSize: '13px', marginTop: '8px' }}>
                <p style={{ marginBottom: '8px' }}><strong style={{ color: '#dc2626' }}>🔴 HIGH:</strong> Immediate action needed</p>
                <p style={{ marginBottom: '8px' }}><strong style={{ color: '#f59e0b' }}>🟠 MODERATE:</strong> Take precautions</p>
                <p><strong style={{ color: '#10b981' }}>🟢 LOW:</strong> Routine monitoring</p>
              </div>
            </div>

            <div className="card">
              <h4 className="card-title">Report Public Health Concern</h4>
              <p style={{ fontSize: '14px' }}>Report suspected disease outbreaks, foodborne illness, or environmental health hazards.</p>
              <p style={{ fontSize: '14px', marginTop: '12px' }}><strong>24/7 Hotline:</strong></p>
              <p style={{ fontSize: '14px' }}>1-800-REPORT-H</p>
            </div>

            <div className="info-box">
              <h4>Emergency Resources</h4>
              <p><strong>Poison Control:</strong> 1-800-222-1222</p>
              <p><strong>Mental Health Crisis:</strong> 988</p>
              <p><strong>Emergency:</strong> 911</p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
