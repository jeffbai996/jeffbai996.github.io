import React, { useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import './Department.css'

export default function NPA() {
  const navigate = useNavigate()

  useEffect(() => {
    document.body.classList.add('theme-npa')
    return () => document.body.classList.remove('theme-npa')
  }, [])

  return (
    <>
      <header className="dept-header">
        <div className="container">
          <Link to="/npa" className="dept-logo">
            <div className="logo-mark">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2l7 4v6c0 5-4 9-7 10-3-1-7-5-7-10V6z"></path>
                <path d="M9 12h6"></path>
                <path d="M12 9v6"></path>
              </svg>
            </div>
            <div className="logo-text">
              <h1>National Police Agency</h1>
              <span className="tagline">Republic of Praya</span>
            </div>
          </Link>
          <nav className="nav">
            <Link to="/npa" className="nav-link">Home</Link>
            <Link to="/npa/report" className="nav-link">File Report</Link>
            <Link to="/npa/services" className="nav-link">Services</Link>
            <Link to="/npa/safety" className="nav-link">Public Safety</Link>
          </nav>
        </div>
      </header>

      <Routes>
        <Route index element={<NPAHome navigate={navigate} />} />
        <Route path="report" element={<FileReport />} />
        <Route path="services" element={<PoliceServices />} />
        <Route path="safety" element={<PublicSafety />} />
      </Routes>

      <footer className="dept-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <h4>National Police Agency</h4>
              <p>Protecting and serving the citizens of the Republic of Praya with integrity and professionalism.</p>
            </div>
            <div className="footer-section">
              <h5>Services</h5>
              <ul>
                <li><Link to="/npa/report">File Police Report</Link></li>
                <li><Link to="/npa/services">Police Services</Link></li>
                <li><Link to="/npa/safety">Public Safety</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5>Emergency</h5>
              <ul>
                <li><a href="tel:911">Emergency: 911</a></li>
                <li><a href="tel:311">Non-Emergency: 311</a></li>
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
            <span>&copy; 2024 Republic of Praya. National Police Agency.</span>
          </div>
        </div>
      </footer>
    </>
  )
}

function NPAHome({ navigate }) {
  return (
    <div className="layout-emergency">
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-bg-shape"></div>
          <div className="hero-bg-shape"></div>
          <div className="hero-bg-shape"></div>
        </div>
        <div className="hero-pattern"></div>
        <div className="container">
          <div className="hero-main">
            <div className="hero-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l7 4v6c0 5-4 9-7 10-3-1-7-5-7-10V6z"></path>
                <path d="M9 12h6"></path>
                <path d="M12 9v6"></path>
              </svg>
              Public Safety
            </div>
            <h2>Protecting <span>Our Community</span></h2>
            <p>The National Police Agency is committed to maintaining public safety, preventing crime, and serving the citizens of Praya with professionalism and integrity. Keeping our nation secure 24/7.</p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => navigate('/npa/report')}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                </svg>
                File Police Report
              </button>
              <button className="btn btn-secondary" onClick={() => navigate('/npa/services')}>
                Police Services
              </button>
            </div>
          </div>
          <div className="hero-emergency">
            <div className="emergency-title">EMERGENCY CONTACT</div>
            <div className="emergency-numbers">
              <a href="tel:911" className="emergency-number">
                <div className="emergency-label">Life-Threatening Emergency</div>
                <div className="emergency-phone">911</div>
              </a>
              <a href="tel:311" className="emergency-number">
                <div className="emergency-label">Non-Emergency</div>
                <div className="emergency-phone">311</div>
              </a>
              <a href="tel:1-800-CRIME-TIP" className="emergency-number">
                <div className="emergency-label">Anonymous Tips</div>
                <div className="emergency-phone">1-800-CRIME-TIP</div>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Response Time</span>
              <span className="stat-value">4.2min</span>
              <span className="stat-change">Average</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Crime Rate</span>
              <span className="stat-value">-12%</span>
              <span className="stat-change">vs Last Year</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Cases Solved</span>
              <span className="stat-value">87%</span>
              <span className="stat-change">This Year</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Officers</span>
              <span className="stat-value">3,421</span>
              <span className="stat-change">Active Duty</span>
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
                  <h3 className="card-title">Emergency Services</h3>
                </div>
                <div className="content-text">
                  <h4>When to Call 911</h4>
                  <ul>
                    <li><strong>Life-threatening emergencies</strong> - Medical, fire, serious injuries</li>
                    <li><strong>Crimes in progress</strong> - Burglary, assault, robbery</li>
                    <li><strong>Immediate danger</strong> - Threats to life or property</li>
                    <li><strong>Missing children</strong> - Urgent missing person cases</li>
                  </ul>
                  <h4 style={{ marginTop: '20px' }}>Non-Emergency: 311</h4>
                  <p>For non-urgent police matters, noise complaints, general inquiries, or to file reports after the fact.</p>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">File a Police Report</h3>
                  <Link to="/npa/report" className="card-link">File Now</Link>
                </div>
                <div className="content-text">
                  <p>You can file online reports for:</p>
                  <ul>
                    <li>Theft (under ¤2,500)</li>
                    <li>Lost property</li>
                    <li>Vandalism</li>
                    <li>Vehicle accidents (no injuries)</li>
                  </ul>
                  <p style={{ marginTop: '12px' }}><strong>Processing time:</strong> 24-48 hours for case number confirmation</p>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Recent Updates</h3>
                </div>
                <div className="news-item">
                  <span className="news-date">Nov 28, 2024</span>
                  <h4 className="news-title">Community Policing Initiative Expansion</h4>
                  <p className="news-excerpt">NPA expands neighborhood watch programs to 15 additional districts.</p>
                </div>
                <div className="news-item">
                  <span className="news-date">Nov 20, 2024</span>
                  <h4 className="news-title">New Online Report Filing System</h4>
                  <p className="news-excerpt">File non-emergency reports online with faster processing times.</p>
                </div>
              </div>
            </div>

            <aside className="sidebar">
              <div className="card">
                <h4 className="card-title">Quick Services</h4>
                <div className="quick-link" onClick={() => navigate('/npa/report')}>
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                      <polyline points="14,2 14,8 20,8"/>
                    </svg>
                  </span>
                  File Police Report
                </div>
                <div className="quick-link">
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"/>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                  </span>
                  Case Status Lookup
                </div>
                <div className="quick-link">
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                      <polyline points="14,2 14,8 20,8"/>
                      <line x1="16" y1="13" x2="8" y2="13"/>
                      <line x1="16" y1="17" x2="8" y2="17"/>
                      <polyline points="10,9 9,9 8,9"/>
                    </svg>
                  </span>
                  Police Clearance
                </div>
                <div className="quick-link">
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </span>
                  Find Police Station
                </div>
              </div>

              <div className="info-box">
                <h4>Emergency Contacts</h4>
                <p><strong>Emergency:</strong> 911</p>
                <p><strong>Non-Emergency:</strong> 311</p>
                <p><strong>Anonymous Tips:</strong> 1-800-CRIME-TIP</p>
                <p style={{ marginTop: '12px', borderTop: '1px solid var(--border-subtle)', paddingTop: '12px' }}><strong>NPA Headquarters:</strong><br />87 Mikkelson Road, Western District</p>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  )
}

function FileReport() {
  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/npa">Home</Link> / File Police Report
          </div>
          <h1>File a Police Report</h1>
          <p className="subtitle">Submit non-emergency reports online</p>
        </div>
      </div>
      <div className="container">
        <div className="content-text">
          <h3>Online Report Filing</h3>
          <p>You can file online reports for the following incident types:</p>

          <div className="card" style={{ marginTop: '20px' }}>
            <h4 className="card-title">Theft - Minor (under ¤2,500)</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Report theft of personal property valued under ¤2,500. Include description of stolen items, approximate value, and time of incident.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Processing:</strong> 24-48 hours for case number | <strong>Response:</strong> Officer may contact for details
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Lost Property</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Report lost items for insurance or replacement documentation. Check our lost & found database first.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Processing:</strong> Immediate case number | <strong>Follow-up:</strong> Check lost & found weekly
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Vandalism/Property Damage</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Report damage to personal or public property. Include photos if available and any witness information.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Processing:</strong> 24-48 hours | <strong>Follow-up:</strong> Officer visit may be scheduled
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Vehicle Accident (No Injuries)</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>For minor traffic accidents with no injuries. Exchange insurance information at the scene first.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Processing:</strong> 48 hours | <strong>Required:</strong> Driver info, insurance, photos
            </div>
          </div>

          <h3 style={{ marginTop: '32px' }}>Cannot File Online</h3>
          <p>Please call 911 or 311 for:</p>
          <ul>
            <li>Crimes in progress or emergencies</li>
            <li>Theft over ¤2,500</li>
            <li>Assault or violence</li>
            <li>Domestic incidents</li>
            <li>Missing persons</li>
            <li>Drug-related crimes</li>
          </ul>

          <div className="info-box" style={{ marginTop: '24px' }}>
            <h4>Need Help?</h4>
            <p>Call 311 for assistance with report filing or visit your nearest police station during business hours.</p>
          </div>
        </div>
      </div>
    </main>
  )
}

function PoliceServices() {
  const [serviceType, setServiceType] = React.useState('clearance');

  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/npa">Home</Link> / Police Services
          </div>
          <h1>Police Services</h1>
          <p className="subtitle">Access police clearances, case lookups, and community programs</p>
        </div>
      </div>
      <div className="container">
        <div className="content-text">
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setServiceType('clearance')}
                className={serviceType === 'clearance' ? 'btn btn-primary' : 'btn btn-secondary'}
                style={{ fontSize: '13px', padding: '10px 20px' }}
              >
                Police Clearance
              </button>
              <button
                onClick={() => setServiceType('case')}
                className={serviceType === 'case' ? 'btn btn-primary' : 'btn btn-secondary'}
                style={{ fontSize: '13px', padding: '10px 20px' }}
              >
                Case Status
              </button>
              <button
                onClick={() => setServiceType('community')}
                className={serviceType === 'community' ? 'btn btn-primary' : 'btn btn-secondary'}
                style={{ fontSize: '13px', padding: '10px 20px' }}
              >
                Community Programs
              </button>
              <button
                onClick={() => setServiceType('statistics')}
                className={serviceType === 'statistics' ? 'btn btn-primary' : 'btn btn-secondary'}
                style={{ fontSize: '13px', padding: '10px 20px' }}
              >
                Crime Statistics
              </button>
            </div>
          </div>

          {serviceType === 'clearance' && (
            <>
              <div className="card">
                <h3 className="card-title">Police Clearance Certificate</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
                  A police clearance certificate (also known as a criminal record check) is an official document certifying whether you have a criminal record in Praya.
                </p>

                <h4>Types of Clearance</h4>

                <div style={{ marginBottom: '20px' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>Standard Police Clearance</h5>
                  <ul>
                    <li>Shows criminal convictions in the Republic of Praya</li>
                    <li>Valid for 6 months from date of issue</li>
                    <li>Processing time: 5-10 business days</li>
                    <li>Fee: ¤50</li>
                    <li>Common uses: Employment, visa applications, licensing</li>
                  </ul>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>Enhanced Clearance (Vulnerable Sector)</h5>
                  <ul>
                    <li>Required for work with children, elderly, or vulnerable persons</li>
                    <li>Includes pardoned offenses and pending charges</li>
                    <li>Processing time: 10-15 business days</li>
                    <li>Fee: ¤75</li>
                    <li>Requires fingerprinting and additional documentation</li>
                  </ul>
                </div>

                <h4 style={{ marginTop: '24px' }}>How to Apply</h4>
                <ol>
                  <li><strong>Complete Application:</strong> Fill out form at npa.gov.py/clearance or at police station</li>
                  <li><strong>Provide ID:</strong> Valid National ID or passport required</li>
                  <li><strong>Fingerprinting:</strong> Visit designated police station for digital fingerprinting (enhanced clearance only)</li>
                  <li><strong>Pay Fee:</strong> Online payment or at police station</li>
                  <li><strong>Submit:</strong> Submit application online or in person</li>
                  <li><strong>Receive Certificate:</strong> Delivered by mail or pickup at police station</li>
                </ol>

                <h4 style={{ marginTop: '24px' }}>Required Documents</h4>
                <ul>
                  <li>Valid National ID or Passport</li>
                  <li>Proof of address (utility bill, lease, etc.)</li>
                  <li>Passport-size photo (recent, color)</li>
                  <li>Purpose statement (employment letter, visa requirement, etc.)</li>
                  <li>Consent form (signed and dated)</li>
                </ul>
              </div>

              <div className="card">
                <h4 className="card-title">International Police Clearance</h4>
                <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>
                  For use outside of Praya (visa applications, immigration):
                </p>
                <ul>
                  <li>Includes apostille certification for international recognition</li>
                  <li>Processing time: 15-20 business days</li>
                  <li>Fee: ¤100 (includes apostille)</li>
                  <li>Translated versions available (English, Spanish, French) for additional ¤25</li>
                </ul>
              </div>

              <div className="info-box">
                <h4>Need Assistance?</h4>
                <p>For questions about police clearance applications, call the NPA Clearance Division at 1-800-CLEAR-PY or email clearance@npa.gov.py. Office hours: Monday-Friday 8:00 AM - 5:00 PM.</p>
              </div>
            </>
          )}

          {serviceType === 'case' && (
            <>
              <div className="card">
                <h3 className="card-title">Case Status Lookup</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
                  Check the status of police reports, investigations, and court cases online.
                </p>

                <h4>What You Can Check</h4>
                <ul>
                  <li><strong>Police Reports:</strong> Status of filed reports (theft, vandalism, accidents)</li>
                  <li><strong>Investigations:</strong> Active investigation updates (if authorized)</li>
                  <li><strong>Case Numbers:</strong> Verify case number validity and type</li>
                  <li><strong>Evidence Status:</strong> Property evidence collection and return status</li>
                </ul>

                <h4 style={{ marginTop: '24px' }}>How to Look Up Your Case</h4>
                <ol style={{ marginBottom: '20px' }}>
                  <li><strong>Gather Information:</strong> You'll need your case number and last name</li>
                  <li><strong>Visit Portal:</strong> Go to npa.gov.py/case-lookup</li>
                  <li><strong>Enter Details:</strong> Input case number and verification information</li>
                  <li><strong>View Status:</strong> See current status, assigned officer, next steps</li>
                </ol>

                <h4>Case Status Definitions</h4>

                <div style={{ marginBottom: '16px' }}>
                  <div style={{ padding: '12px', background: 'var(--bg-elevated)', borderRadius: '8px', marginBottom: '8px' }}>
                    <h5 style={{ fontSize: '14px', marginBottom: '4px', color: '#3b82f6' }}>Under Investigation</h5>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>Case is actively being investigated by assigned detective/officer</p>
                  </div>
                  <div style={{ padding: '12px', background: 'var(--bg-elevated)', borderRadius: '8px', marginBottom: '8px' }}>
                    <h5 style={{ fontSize: '14px', marginBottom: '4px', color: '#f59e0b' }}>Pending Review</h5>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>Report submitted, awaiting assignment to investigating officer</p>
                  </div>
                  <div style={{ padding: '12px', background: 'var(--bg-elevated)', borderRadius: '8px', marginBottom: '8px' }}>
                    <h5 style={{ fontSize: '14px', marginBottom: '4px', color: '#10b981' }}>Closed - Resolved</h5>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>Case solved, charges filed, or property recovered</p>
                  </div>
                  <div style={{ padding: '12px', background: 'var(--bg-elevated)', borderRadius: '8px', marginBottom: '8px' }}>
                    <h5 style={{ fontSize: '14px', marginBottom: '4px', color: '#6b7280' }}>Closed - Inactive</h5>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>Insufficient evidence or leads; can be reopened with new information</p>
                  </div>
                  <div style={{ padding: '12px', background: 'var(--bg-elevated)', borderRadius: '8px' }}>
                    <h5 style={{ fontSize: '14px', marginBottom: '4px', color: '#8b5cf6' }}>Referred to Prosecutor</h5>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>Investigation complete, case forwarded to prosecutor's office</p>
                  </div>
                </div>

                <h4 style={{ marginTop: '24px' }}>Evidence Return</h4>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                  If property was held as evidence:
                </p>
                <ul>
                  <li>Check case status to see if evidence is released for return</li>
                  <li>Bring case number and ID to police station</li>
                  <li>Sign evidence release form</li>
                  <li>Evidence held for maximum 1 year after case closure</li>
                  <li>Unclaimed evidence may be destroyed or auctioned</li>
                </ul>
              </div>

              <div className="info-box">
                <h4>Questions About Your Case?</h4>
                <p>Contact the investigating officer listed on your case or call 311 for general case inquiries. For urgent matters, visit your local police station with your case number.</p>
              </div>
            </>
          )}

          {serviceType === 'community' && (
            <>
              <div className="card">
                <h3 className="card-title">Community Programs</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
                  The NPA partners with communities to prevent crime, build trust, and create safer neighborhoods.
                </p>

                <h4>Active Programs</h4>

                <div style={{ marginBottom: '20px' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>Neighborhood Watch</h5>
                  <ul>
                    <li>Citizen-led crime prevention program</li>
                    <li>Regular meetings with community policing officers</li>
                    <li>Free training on spotting and reporting suspicious activity</li>
                    <li>Direct communication channel with local police</li>
                    <li>Active in 142 neighborhoods across Praya</li>
                    <li><strong>To start a watch group:</strong> Contact community@npa.gov.py</li>
                  </ul>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>Citizens Police Academy</h5>
                  <ul>
                    <li>12-week program teaching law enforcement basics</li>
                    <li>Learn about investigations, traffic enforcement, emergency response</li>
                    <li>Hands-on demonstrations and ride-alongs</li>
                    <li>Free for Praya residents 18+</li>
                    <li>Classes held quarterly in major cities</li>
                    <li><strong>Application:</strong> npa.gov.py/citizens-academy</li>
                  </ul>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>Youth Programs</h5>
                  <ul>
                    <li><strong>Junior Police Program:</strong> Ages 10-14, summer camps and mentorship</li>
                    <li><strong>Police Explorers:</strong> Ages 14-21, career exploration and training</li>
                    <li><strong>School Resource Officers:</strong> Officers in schools building positive relationships</li>
                    <li><strong>Anti-Bullying Workshops:</strong> Free presentations for schools</li>
                    <li><strong>Info:</strong> youth@npa.gov.py or 1-800-YOUTH-PY</li>
                  </ul>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>Coffee with a Cop</h5>
                  <ul>
                    <li>Informal meet-and-greet events with local officers</li>
                    <li>Held monthly at rotating coffee shops and community centers</li>
                    <li>Ask questions, share concerns, get to know your police</li>
                    <li>No agenda, no speeches - just conversation</li>
                    <li><strong>Schedule:</strong> npa.gov.py/coffee-cop</li>
                  </ul>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>Business Watch</h5>
                  <ul>
                    <li>Crime prevention program for business owners</li>
                    <li>Security assessments and recommendations</li>
                    <li>Alert network for suspicious activity in commercial areas</li>
                    <li>Training on robbery prevention and employee safety</li>
                    <li><strong>Registration:</strong> business@npa.gov.py</li>
                  </ul>
                </div>
              </div>

              <div className="card">
                <h4 className="card-title">Volunteer Opportunities</h4>
                <ul>
                  <li><strong>Reserve Officer Program:</strong> Volunteer police officers (part-time, trained)</li>
                  <li><strong>Civilian Volunteers:</strong> Office support, community events, education programs</li>
                  <li><strong>Chaplain Program:</strong> Provide spiritual support to officers and community</li>
                  <li><strong>Requirements:</strong> Background check, training varies by program</li>
                </ul>
              </div>

              <div className="info-box">
                <h4>Get Involved</h4>
                <p>Join a community program or start one in your neighborhood. Contact the Community Policing Division at community@npa.gov.py or call 311 and ask for Community Programs.</p>
              </div>
            </>
          )}

          {serviceType === 'statistics' && (
            <>
              <div className="card">
                <h3 className="card-title">Crime Statistics</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
                  Transparent crime data for the Republic of Praya, updated quarterly.
                </p>

                <h4>2024 Crime Summary (Year to Date)</h4>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ padding: '16px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#10b981', marginBottom: '4px' }}>-12%</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Overall Crime Rate</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>vs. 2023</div>
                  </div>
                  <div style={{ padding: '16px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#3b82f6', marginBottom: '4px' }}>87%</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Case Clearance Rate</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>12,450 solved</div>
                  </div>
                  <div style={{ padding: '16px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '8px', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#f59e0b', marginBottom: '4px' }}>4.2min</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Avg Response Time</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>Emergency calls</div>
                  </div>
                </div>

                <h4>Crime by Category (2024 YTD)</h4>
                <div style={{ fontSize: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: 'var(--bg-elevated)', borderRadius: '8px', marginBottom: '8px' }}>
                    <div>
                      <strong>Property Crime</strong>
                      <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Theft, burglary, vandalism</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: '600' }}>5,240 cases</div>
                      <div style={{ fontSize: '13px', color: '#10b981' }}>-18% ↓</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: 'var(--bg-elevated)', borderRadius: '8px', marginBottom: '8px' }}>
                    <div>
                      <strong>Violent Crime</strong>
                      <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Assault, robbery, homicide</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: '600' }}>1,130 cases</div>
                      <div style={{ fontSize: '13px', color: '#10b981' }}>-8% ↓</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: 'var(--bg-elevated)', borderRadius: '8px', marginBottom: '8px' }}>
                    <div>
                      <strong>Drug Offenses</strong>
                      <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Possession, trafficking</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: '600' }}>2,180 cases</div>
                      <div style={{ fontSize: '13px', color: '#10b981' }}>-5% ↓</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: 'var(--bg-elevated)', borderRadius: '8px', marginBottom: '8px' }}>
                    <div>
                      <strong>Traffic Violations</strong>
                      <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>DUI, speeding, accidents</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: '600' }}>8,940 citations</div>
                      <div style={{ fontSize: '13px', color: '#ef4444' }}>+3% ↑</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: 'var(--bg-elevated)', borderRadius: '8px' }}>
                    <div>
                      <strong>Cybercrime</strong>
                      <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Fraud, identity theft, hacking</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: '600' }}>1,625 cases</div>
                      <div style={{ fontSize: '13px', color: '#ef4444' }}>+15% ↑</div>
                    </div>
                  </div>
                </div>

                <h4 style={{ marginTop: '24px' }}>Crime by District</h4>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                  Crime rate per 1,000 residents (January - November 2024):
                </p>
                <ul style={{ fontSize: '14px' }}>
                  <li><strong>Central District:</strong> 24.5 (highest density, mostly property crime)</li>
                  <li><strong>North District:</strong> 18.2</li>
                  <li><strong>South District:</strong> 15.7</li>
                  <li><strong>East District:</strong> 12.3</li>
                  <li><strong>West District:</strong> 10.1 (lowest, mostly residential)</li>
                </ul>
              </div>

              <div className="card">
                <h4 className="card-title">Detailed Reports</h4>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                  Download comprehensive crime statistics:
                </p>
                <ul>
                  <li><strong>Quarterly Reports:</strong> Detailed breakdowns by district, type, demographics</li>
                  <li><strong>Annual Crime Report:</strong> Published each January for previous year</li>
                  <li><strong>Interactive Map:</strong> View crime incidents by location and type</li>
                  <li><strong>Trend Analysis:</strong> Multi-year comparisons and forecasts</li>
                  <li><strong>Available at:</strong> npa.gov.py/statistics</li>
                </ul>
              </div>

              <div className="info-box">
                <h4>Data Transparency</h4>
                <p>The NPA is committed to transparency and accountability. All crime statistics are independently audited and published quarterly. For data requests or questions, contact stats@npa.gov.py.</p>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

function PublicSafety() {
  const [topic, setTopic] = React.useState('prevention');

  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/npa">Home</Link> / Public Safety
          </div>
          <h1>Public Safety Information</h1>
          <p className="subtitle">Safety tips, crime prevention resources, and community awareness programs</p>
        </div>
      </div>
      <div className="container">
        <div className="content-text">
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setTopic('prevention')}
                className={topic === 'prevention' ? 'btn btn-primary' : 'btn btn-secondary'}
                style={{ fontSize: '13px', padding: '10px 20px' }}
              >
                Crime Prevention
              </button>
              <button
                onClick={() => setTopic('emergency')}
                className={topic === 'emergency' ? 'btn btn-primary' : 'btn btn-secondary'}
                style={{ fontSize: '13px', padding: '10px 20px' }}
              >
                Emergency Preparedness
              </button>
              <button
                onClick={() => setTopic('safety')}
                className={topic === 'safety' ? 'btn btn-primary' : 'btn btn-secondary'}
                style={{ fontSize: '13px', padding: '10px 20px' }}
              >
                Safety Workshops
              </button>
              <button
                onClick={() => setTopic('scams')}
                className={topic === 'scams' ? 'btn btn-primary' : 'btn btn-secondary'}
                style={{ fontSize: '13px', padding: '10px 20px' }}
              >
                Scam Awareness
              </button>
            </div>
          </div>

          {topic === 'prevention' && (
            <>
              <div className="card">
                <h3 className="card-title">Crime Prevention Tips</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
                  Simple steps you can take to protect yourself, your family, and your property.
                </p>

                <h4>Home Security</h4>
                <ul>
                  <li><strong>Lock all doors and windows</strong> - Even when home, especially at night</li>
                  <li><strong>Install quality locks</strong> - Deadbolts on exterior doors, window locks</li>
                  <li><strong>Outdoor lighting</strong> - Motion-sensor lights deter intruders</li>
                  <li><strong>Trim bushes</strong> - Eliminate hiding spots near doors and windows</li>
                  <li><strong>Security system</strong> - Alarms, cameras, smart doorbells</li>
                  <li><strong>Don't advertise absences</strong> - Use timers for lights, hold mail delivery</li>
                  <li><strong>Valuables out of sight</strong> - Don't leave expensive items visible from windows</li>
                  <li><strong>Know your neighbors</strong> - Watch out for each other</li>
                </ul>

                <h4 style={{ marginTop: '20px' }}>Vehicle Security</h4>
                <ul>
                  <li><strong>Always lock your car</strong> - Even in your driveway or garage</li>
                  <li><strong>Never leave keys in car</strong> - Most vehicle thefts involve keys left in ignition</li>
                  <li><strong>Hide valuables</strong> - Or better, don't leave them in car at all</li>
                  <li><strong>Park in well-lit areas</strong> - Especially at night</li>
                  <li><strong>Install anti-theft devices</strong> - Steering wheel locks, car alarms, GPS trackers</li>
                  <li><strong>VIN etching</strong> - Engraving VIN on windows deters thieves</li>
                  <li><strong>Don't leave car running</strong> - Never leave unattended with engine on</li>
                </ul>

                <h4 style={{ marginTop: '20px' }}>Personal Safety</h4>
                <ul>
                  <li><strong>Stay aware</strong> - Don't walk distracted (phone, headphones)</li>
                  <li><strong>Trust your instincts</strong> - If something feels wrong, it probably is</li>
                  <li><strong>Walk in groups</strong> - Safety in numbers, especially at night</li>
                  <li><strong>Well-lit routes</strong> - Stick to populated, illuminated areas</li>
                  <li><strong>Tell someone</strong> - Share your plans and location</li>
                  <li><strong>Carry phone</strong> - Charged and ready to call for help</li>
                  <li><strong>Self-defense</strong> - Consider taking a self-defense class</li>
                </ul>
              </div>

              <div className="card">
                <h4 className="card-title">If You're a Victim</h4>
                <ul>
                  <li><strong>Immediate danger:</strong> Call 911 immediately</li>
                  <li><strong>Safe location:</strong> Get to a safe place first</li>
                  <li><strong>Don't alter scene:</strong> If possible, preserve evidence</li>
                  <li><strong>Note descriptions:</strong> Remember suspect details, vehicle info</li>
                  <li><strong>Witnesses:</strong> Get names and contact info if possible</li>
                  <li><strong>File report:</strong> Contact police as soon as possible</li>
                  <li><strong>Document everything:</strong> Take photos, keep records</li>
                </ul>
              </div>
            </>
          )}

          {topic === 'emergency' && (
            <>
              <div className="card">
                <h3 className="card-title">Emergency Preparedness</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
                  Be prepared for emergencies with these essential tips and resources.
                </p>

                <h4>Emergency Kit</h4>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                  Every household should have a basic emergency kit with supplies for at least 72 hours:
                </p>
                <ul>
                  <li><strong>Water:</strong> 1 gallon per person per day</li>
                  <li><strong>Food:</strong> Non-perishable items (canned goods, energy bars)</li>
                  <li><strong>First aid kit:</strong> Bandages, medications, antiseptic</li>
                  <li><strong>Flashlight & batteries:</strong> LED flashlight, extra batteries</li>
                  <li><strong>Radio:</strong> Battery-powered or hand-crank weather radio</li>
                  <li><strong>Phone charger:</strong> Portable power bank</li>
                  <li><strong>Cash:</strong> ATMs may not work during emergencies</li>
                  <li><strong>Documents:</strong> Copies of IDs, insurance, medical records (waterproof container)</li>
                  <li><strong>Medications:</strong> 7-day supply of prescriptions</li>
                  <li><strong>Tools:</strong> Multi-tool, whistle, duct tape, local maps</li>
                </ul>

                <h4 style={{ marginTop: '24px' }}>Family Emergency Plan</h4>
                <ol style={{ marginBottom: '20px' }}>
                  <li><strong>Meeting Places:</strong> Designate two locations (near home, outside neighborhood)</li>
                  <li><strong>Communication Plan:</strong> Out-of-town contact person all family members call</li>
                  <li><strong>Evacuation Routes:</strong> Know multiple ways out of your home and neighborhood</li>
                  <li><strong>Important Contacts:</strong> List of emergency contacts (laminated copy)</li>
                  <li><strong>Special Needs:</strong> Plan for infants, elderly, pets, disabilities</li>
                  <li><strong>Practice:</strong> Conduct family drills twice a year</li>
                </ol>

                <h4>Natural Disaster Preparedness</h4>

                <div style={{ marginBottom: '16px' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>Hurricanes (June - November)</h5>
                  <ul>
                    <li>Monitor weather forecasts during hurricane season</li>
                    <li>Know evacuation routes and shelter locations</li>
                    <li>Secure outdoor items, board windows if needed</li>
                    <li>Fill bathtub with water (for sanitation if water supply disrupted)</li>
                    <li>Never go outside during eye of hurricane</li>
                  </ul>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>Earthquakes</h5>
                  <ul>
                    <li>Drop, Cover, Hold On - Drop to hands/knees, cover head, hold on</li>
                    <li>If indoors: Stay inside, get under desk/table</li>
                    <li>If outdoors: Move away from buildings, power lines</li>
                    <li>If in car: Pull over safely, stay in vehicle</li>
                    <li>After quake: Check for injuries, gas leaks, structural damage</li>
                  </ul>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>Floods</h5>
                  <ul>
                    <li>Never walk or drive through flood water (6 inches can knock you down)</li>
                    <li>Turn around, don't drown - Find alternative route</li>
                    <li>Move to higher ground if flooding imminent</li>
                    <li>Avoid contact with flood water (may be contaminated)</li>
                  </ul>
                </div>
              </div>

              <div className="info-box">
                <h4>Emergency Alerts</h4>
                <p>Sign up for Praya Emergency Alert System to receive warnings about severe weather, natural disasters, and public safety threats via text, email, and phone. Register at npa.gov.py/alerts or text ALERTS to 67283.</p>
              </div>
            </>
          )}

          {topic === 'safety' && (
            <>
              <div className="card">
                <h3 className="card-title">Safety Workshops & Training</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
                  Free community workshops offered by the National Police Agency.
                </p>

                <h4>Available Workshops</h4>

                <div style={{ marginBottom: '20px' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>Personal Safety & Self-Defense</h5>
                  <ul>
                    <li>Basic self-defense techniques</li>
                    <li>Situational awareness training</li>
                    <li>How to respond to threats</li>
                    <li>Duration: 4 hours</li>
                    <li>Offered: Monthly at police stations</li>
                  </ul>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>Home Security Assessment</h5>
                  <ul>
                    <li>Free home security evaluation by trained officer</li>
                    <li>Recommendations for improving security</li>
                    <li>Learn about alarm systems, lighting, landscaping</li>
                    <li>Duration: 1 hour (at your home)</li>
                    <li>Schedule: Call 311 to book appointment</li>
                  </ul>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>Active Shooter Response (Run, Hide, Fight)</h5>
                  <ul>
                    <li>Preparation for active shooter situations</li>
                    <li>Run, Hide, Fight protocol</li>
                    <li>Workplace and school scenarios</li>
                    <li>Duration: 2 hours</li>
                    <li>Available for businesses, schools, organizations</li>
                  </ul>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>Internet Safety for Families</h5>
                  <ul>
                    <li>Protecting children online</li>
                    <li>Recognizing online predators and scams</li>
                    <li>Social media safety</li>
                    <li>Cyberbullying prevention</li>
                    <li>Duration: 2 hours</li>
                    <li>Offered: Quarterly at community centers</li>
                  </ul>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>Senior Safety Workshop</h5>
                  <ul>
                    <li>Fraud and scam prevention for seniors</li>
                    <li>Home safety for aging in place</li>
                    <li>Emergency preparedness</li>
                    <li>Duration: 2 hours</li>
                    <li>Offered: Monthly at senior centers</li>
                  </ul>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px' }}>Business Security Training</h5>
                  <ul>
                    <li>Robbery prevention and response</li>
                    <li>Workplace violence prevention</li>
                    <li>Loss prevention strategies</li>
                    <li>Employee safety training</li>
                    <li>Duration: 3 hours</li>
                    <li>Available for businesses and organizations</li>
                  </ul>
                </div>
              </div>

              <div className="card">
                <h4 className="card-title">Register for Workshops</h4>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                  All workshops are free and open to Praya residents. To register:
                </p>
                <ul>
                  <li><strong>Online:</strong> npa.gov.py/workshops</li>
                  <li><strong>Phone:</strong> Call 311 and ask for Community Programs</li>
                  <li><strong>In Person:</strong> Visit any police station</li>
                  <li><strong>Email:</strong> safety@npa.gov.py</li>
                </ul>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '12px' }}>
                  <strong>Group bookings:</strong> Organizations can request workshops for their members. Minimum 15 participants.
                </p>
              </div>

              <div className="info-box">
                <h4>Upcoming Workshops</h4>
                <p>Check the NPA events calendar at npa.gov.py/events for upcoming workshop dates and locations. New workshops added monthly based on community demand.</p>
              </div>
            </>
          )}

          {topic === 'scams' && (
            <>
              <div className="card">
                <h3 className="card-title">Scam Awareness & Prevention</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
                  Learn to recognize and avoid common scams targeting Praya residents.
                </p>

                <h4>Common Scams</h4>

                <div style={{ marginBottom: '20px', padding: '16px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px', color: '#dc2626' }}>Phone Scams (Vishing)</h5>
                  <ul style={{ marginBottom: '8px' }}>
                    <li><strong>IRS/Tax Scam:</strong> Caller claims you owe taxes, demands immediate payment</li>
                    <li><strong>Tech Support Scam:</strong> Fake call about computer virus or problem</li>
                    <li><strong>Grandparent Scam:</strong> Pretend to be grandchild in trouble needing money</li>
                    <li><strong>Police Impersonation:</strong> Fake officer claims warrant, demands payment</li>
                  </ul>
                  <div style={{ fontSize: '13px', color: '#dc2626', fontWeight: '600' }}>
                    ⚠️ Police will NEVER call demanding money or gift cards to avoid arrest!
                  </div>
                </div>

                <div style={{ marginBottom: '20px', padding: '16px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px', color: '#dc2626' }}>Email Scams (Phishing)</h5>
                  <ul style={{ marginBottom: '8px' }}>
                    <li><strong>Bank Alert:</strong> Fake email claiming account problem, links to fake website</li>
                    <li><strong>Package Delivery:</strong> Fake shipping notice with malicious link</li>
                    <li><strong>Prize Winner:</strong> You've won a prize, just pay small fee or provide info</li>
                    <li><strong>Business Email Compromise:</strong> Fake email from "boss" requesting urgent wire transfer</li>
                  </ul>
                  <div style={{ fontSize: '13px', color: '#dc2626', fontWeight: '600' }}>
                    ⚠️ Never click links in unexpected emails! Go directly to official website instead.
                  </div>
                </div>

                <div style={{ marginBottom: '20px', padding: '16px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px', color: '#dc2626' }}>Romance Scams</h5>
                  <ul style={{ marginBottom: '8px' }}>
                    <li>Scammer creates fake online profile, builds relationship</li>
                    <li>Eventually asks for money (medical emergency, travel, business trouble)</li>
                    <li>May ask for gift cards, wire transfers, or cryptocurrency</li>
                    <li>Never meets in person, always has excuse</li>
                  </ul>
                  <div style={{ fontSize: '13px', color: '#dc2626', fontWeight: '600' }}>
                    ⚠️ Never send money to someone you've only met online!
                  </div>
                </div>

                <div style={{ marginBottom: '20px', padding: '16px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                  <h5 style={{ fontSize: '15px', marginBottom: '8px', color: '#dc2626' }}>Investment Scams</h5>
                  <ul style={{ marginBottom: '8px' }}>
                    <li>Promise of high returns with little/no risk</li>
                    <li>Ponzi schemes and pyramid schemes</li>
                    <li>Cryptocurrency investment scams</li>
                    <li>Pressure to invest immediately</li>
                  </ul>
                  <div style={{ fontSize: '13px', color: '#dc2626', fontWeight: '600' }}>
                    ⚠️ If it sounds too good to be true, it probably is!
                  </div>
                </div>

                <h4 style={{ marginTop: '24px' }}>Protect Yourself</h4>
                <ul>
                  <li><strong>Verify identity:</strong> Hang up and call back using official number</li>
                  <li><strong>Don't rush:</strong> Scammers create urgency - take time to think</li>
                  <li><strong>Never give personal info:</strong> SSN, bank account, passwords</li>
                  <li><strong>Don't pay with gift cards:</strong> Legitimate businesses don't accept gift cards</li>
                  <li><strong>Check URLs:</strong> Look for misspellings, suspicious domains</li>
                  <li><strong>Use strong passwords:</strong> Unique passwords for each account</li>
                  <li><strong>Enable 2FA:</strong> Two-factor authentication adds security</li>
                  <li><strong>Monitor accounts:</strong> Check bank/credit card statements regularly</li>
                </ul>
              </div>

              <div className="card">
                <h4 className="card-title">If You've Been Scammed</h4>
                <ol>
                  <li><strong>Stop contact:</strong> Cease all communication with scammer</li>
                  <li><strong>Don't send more money:</strong> They may claim fees to get your money back</li>
                  <li><strong>Contact your bank:</strong> Report unauthorized transactions immediately</li>
                  <li><strong>File police report:</strong> Call 311 or visit police station</li>
                  <li><strong>Report to authorities:</strong> File complaint with Consumer Protection Bureau</li>
                  <li><strong>Credit freeze:</strong> Consider freezing credit if identity compromised</li>
                  <li><strong>Change passwords:</strong> For any accounts that may be affected</li>
                </ol>
              </div>

              <div className="info-box" style={{ background: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.3)' }}>
                <h4 style={{ color: '#dc2626' }}>Report Scams</h4>
                <p>Report scams to help prevent others from becoming victims. Call 311 to file a report or visit npa.gov.py/report-scam. For urgent matters or active scams, call the NPA Fraud Hotline: 1-800-FRAUD-PY.</p>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
