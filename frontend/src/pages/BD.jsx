import React, { useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import './Department.css'

export default function BD() {
  const navigate = useNavigate()

  useEffect(() => {
    document.body.classList.add('theme-bd')
    return () => document.body.classList.remove('theme-bd')
  }, [])

  return (
    <>
      <header className="dept-header">
        <div className="container">
          <Link to="/bd" className="dept-logo">
            <div className="logo-mark">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M9 9h.01M15 9h.01M9 13h.01M15 13h.01"/>
              </svg>
            </div>
            <div className="logo-text">
              <h1>Buildings Department</h1>
              <span className="tagline">Republic of Praya</span>
            </div>
          </Link>
          <nav className="nav">
            <Link to="/bd" className="nav-link">Home</Link>
            <Link to="/bd/permits" className="nav-link">Building Permits</Link>
            <Link to="/bd/inspections" className="nav-link">Inspections</Link>
            <Link to="/bd/codes" className="nav-link">Building Codes</Link>
            <Link to="/bd/services" className="nav-link">Services</Link>
          </nav>
        </div>
      </header>

      <Routes>
        <Route index element={<BDHome navigate={navigate} />} />
        <Route path="permits" element={<BDPermits />} />
        <Route path="inspections" element={<BDInspections />} />
        <Route path="codes" element={<BDCodes />} />
        <Route path="services" element={<BDServices />} />
      </Routes>

      <footer className="dept-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <h4>Buildings Department</h4>
              <p>Ensuring safe, sustainable, and compliant construction throughout the Republic of Praya.</p>
            </div>
            <div className="footer-section">
              <h5>Services</h5>
              <ul>
                <li><Link to="/bd/permits">Building Permits</Link></li>
                <li><Link to="/bd/inspections">Inspections</Link></li>
                <li><Link to="/bd/services">Online Services</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5>Resources</h5>
              <ul>
                <li><Link to="/bd/codes">Building Codes</Link></li>
                <li><a href="#">Forms Library</a></li>
                <li><a href="#">Fee Schedule</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5>Government</h5>
              <ul>
                <li><Link to="/">Gov Portal</Link></li>
                <li><a href="/interior">Interior Dept.</a></li>
                <li><a href="/housing">Housing Authority</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>&copy; 2024 Republic of Praya. Buildings Department.</span>
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

function BDHome({ navigate }) {
  return (
    <div className="layout-social">
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
                <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6"/>
              </svg>
              Building Safety
            </div>
            <h2>Building <span>Praya's Future</span></h2>
            <p>The Buildings Department oversees construction safety, issues building permits, and ensures all structures meet safety and environmental standards throughout the Republic of Praya.</p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => navigate('/bd/permits')}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                </svg>
                Apply for Permit
              </button>
              <button className="btn btn-secondary" onClick={() => navigate('/bd/inspections')}>
                Schedule Inspection
              </button>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-image-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M9 9h.01M15 9h.01M9 13h.01M15 13h.01"/>
              </svg>
            </div>
            <div className="hero-image-text">
              Ensuring safe, sustainable construction across the Republic
            </div>
          </div>
        </div>
      </section>

      <section className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Permits Issued</span>
              <span className="stat-value">8,432</span>
              <span className="stat-change">FY 2024</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Inspections</span>
              <span className="stat-value">24,891</span>
              <span className="stat-change">YTD</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Avg Processing</span>
              <span className="stat-value">12</span>
              <span className="stat-change">Business Days</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Compliance Rate</span>
              <span className="stat-value">96.8%</span>
              <span className="stat-change">+1.2% YoY</span>
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
                  <h3 className="card-title">Permit Types</h3>
                  <Link to="/bd/permits" className="card-link">View All</Link>
                </div>
                <div className="content-text">
                  <p>The Buildings Department issues permits for various construction activities:</p>
                  <ul>
                    <li><strong>New Construction</strong> - Residential, commercial, and industrial buildings</li>
                    <li><strong>Renovation Permits</strong> - Major alterations and structural modifications</li>
                    <li><strong>Demolition Permits</strong> - Safe removal of existing structures</li>
                    <li><strong>Electrical & Plumbing</strong> - Specialized trade permits</li>
                  </ul>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Recent Announcements</h3>
                </div>
                <div className="news-item">
                  <span className="news-date">Nov 28, 2024</span>
                  <h4 className="news-title">Updated Energy Efficiency Standards</h4>
                  <p className="news-excerpt">New energy efficiency requirements for commercial buildings take effect January 1, 2025.</p>
                </div>
                <div className="news-item">
                  <span className="news-date">Nov 15, 2024</span>
                  <h4 className="news-title">Online Permit Portal Upgrade</h4>
                  <p className="news-excerpt">Enhanced digital submission system now accepts 3D building models and automated plan checks.</p>
                </div>
              </div>
            </div>

            <aside className="sidebar">
              <div className="card">
                <h4 className="card-title">Quick Services</h4>
                <div className="quick-link" onClick={() => navigate('/bd/permits')}>
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
                <div className="quick-link" onClick={() => navigate('/bd/inspections')}>
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                  </span>
                  Schedule Inspection
                </div>
                <div className="quick-link" onClick={() => navigate('/bd/services')}>
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"/>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                  </span>
                  Permit Status Lookup
                </div>
                <div className="quick-link" onClick={() => navigate('/bd/codes')}>
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
                    </svg>
                  </span>
                  Building Codes
                </div>
              </div>

              <div className="info-box">
                <h4>Need Assistance?</h4>
                <p>Visit our permit center or call 1-800-PRAYA-BUILD for help with your building project.</p>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  )
}

function BDPermits() {
  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/bd">Home</Link> / Building Permits
          </div>
          <h1>Building Permits</h1>
          <p className="subtitle">Apply for construction, renovation, and demolition permits</p>
        </div>
      </div>
      <div className="container">
        <div className="content-text">
          <h3>Permit Categories</h3>
          <p>Select the appropriate permit type for your construction project:</p>

          <div className="card" style={{ marginTop: '20px' }}>
            <h4 className="card-title">New Construction Permit</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>For building new residential, commercial, or industrial structures. Includes foundation, structural, and occupancy approvals.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Fee:</strong> $500 - $5,000 (based on project value) | <strong>Processing:</strong> 15-30 business days
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Renovation Permit</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>For major alterations, additions, or structural modifications to existing buildings. Minor cosmetic changes may not require a permit.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Fee:</strong> $200 - $2,000 | <strong>Processing:</strong> 10-20 business days
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Demolition Permit</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Required for complete or partial demolition of structures. Includes asbestos inspection and environmental clearance.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Fee:</strong> $300 - $1,500 | <strong>Processing:</strong> 7-14 business days
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Trade Permits</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Specialized permits for electrical, plumbing, HVAC, and fire protection systems. Must be obtained by licensed contractors.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Fee:</strong> $100 - $800 | <strong>Processing:</strong> 5-10 business days
            </div>
          </div>

          <h3>Required Documents</h3>
          <ul>
            <li>Completed application form</li>
            <li>Architectural drawings and plans</li>
            <li>Structural engineering reports</li>
            <li>Site survey and land title</li>
            <li>Environmental impact assessment (for large projects)</li>
            <li>Contractor license verification</li>
          </ul>
        </div>
      </div>
    </main>
  )
}

function BDInspections() {
  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/bd">Home</Link> / Building Inspections
          </div>
          <h1>Building Inspections</h1>
          <p className="subtitle">Schedule and manage inspections throughout your construction project</p>
        </div>
      </div>
      <div className="container">
        <div className="content-text">
          <div className="info-box" style={{ marginBottom: '24px', background: 'rgba(217, 119, 6, 0.05)' }}>
            <h4>Important Notice</h4>
            <p>All construction work must be inspected and approved at specific stages. Proceeding without approval may result in fines and requirement to undo work.</p>
          </div>

          <h3>Inspection Types</h3>
          <p>Our inspectors verify compliance with building codes at critical stages of construction:</p>

          <div className="card" style={{ marginTop: '20px' }}>
            <h4 className="card-title">Pre-Construction Inspection</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Site preparation review before breaking ground. Verifies property boundaries, utilities access, and compliance with zoning requirements.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
              <strong>When to Schedule:</strong> After permit approval, before any excavation or construction begins
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>What We Check:</strong> Site survey accuracy, erosion control measures, temporary facilities placement
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Foundation Inspection</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Critical inspection of foundation excavation, reinforcement placement, and formwork before concrete pouring.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
              <strong>When to Schedule:</strong> After excavation and rebar placement, before concrete pour
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>What We Check:</strong> Excavation depth, soil conditions, rebar size and spacing, anchor bolts, drainage systems
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Framing Inspection</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Structural framing verification including wall studs, joists, beams, and roof trusses before walls are closed.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
              <strong>When to Schedule:</strong> After framing complete, before insulation or drywall installation
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>What We Check:</strong> Member sizes, spacing, connections, fire blocking, shear walls, roof structure
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Rough-In Inspection</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Review of electrical, plumbing, and HVAC systems installed in walls and ceilings before they are concealed.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
              <strong>When to Schedule:</strong> After systems installed, before walls are closed up
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>What We Check:</strong> Pipe materials and sizes, electrical wiring and boxes, HVAC ductwork, gas lines
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Insulation Inspection</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Verification of proper insulation installation and vapor barriers to meet energy efficiency requirements.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
              <strong>When to Schedule:</strong> After insulation installed, before interior finish work
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>What We Check:</strong> R-values, coverage, vapor barriers, air sealing, ventilation clearances
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Final Inspection</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Comprehensive inspection of completed building to verify all work meets code requirements and approved plans.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
              <strong>When to Schedule:</strong> After all construction work is complete
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>What We Check:</strong> All systems operational, safety features, accessibility compliance, certificate of occupancy eligibility
            </div>
          </div>

          <h3>Scheduling Inspections</h3>
          <div className="card" style={{ background: 'var(--bg-elevated)' }}>
            <h4 className="card-title">How to Request an Inspection</h4>
            <ol style={{ marginBottom: '16px' }}>
              <li>Call the inspection line at 1-800-PRAYA-INSPECT at least 48 hours before needed date</li>
              <li>Provide your permit number and site address</li>
              <li>Specify which inspection type you need</li>
              <li>Receive confirmation with inspector name and time window</li>
              <li>Ensure site is ready and accessible during scheduled window</li>
            </ol>
            <div style={{ padding: '12px', background: 'rgba(217, 119, 6, 0.1)', borderRadius: '8px', fontSize: '13px' }}>
              <strong>Note:</strong> Inspections are typically conducted Monday-Friday, 8:00 AM - 4:00 PM. Rush inspections available for additional fee.
            </div>
          </div>

          <h3>Inspection Results</h3>
          <ul>
            <li><strong>Approved:</strong> Work meets code requirements. You may proceed to next phase.</li>
            <li><strong>Approved with Comments:</strong> Minor issues noted but work may proceed. Address comments before final inspection.</li>
            <li><strong>Corrections Required:</strong> Deficiencies must be fixed. Re-inspection required after corrections made.</li>
            <li><strong>Failed:</strong> Major code violations. Work must be corrected and re-inspected before proceeding.</li>
          </ul>

          <div className="info-box" style={{ marginTop: '24px' }}>
            <h4>Failed Inspection?</h4>
            <p>Don't worry! Our inspectors will provide detailed notes on what needs correction. You can schedule a re-inspection once issues are addressed. Re-inspection fee: $75</p>
          </div>
        </div>
      </div>
    </main>
  )
}

function BDCodes() {
  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/bd">Home</Link> / Building Codes
          </div>
          <h1>Building Codes & Standards</h1>
          <p className="subtitle">Construction regulations ensuring safety and quality in the Republic of Praya</p>
        </div>
      </div>
      <div className="container">
        <div className="content-text">
          <h3>Building Code Overview</h3>
          <p>The Republic of Praya Building Code (RPBC) establishes minimum requirements for construction safety, structural integrity, fire protection, and public health. All new construction, alterations, and additions must comply with current code provisions.</p>

          <div className="info-box" style={{ marginTop: '20px', marginBottom: '24px' }}>
            <h4>Current Code Version</h4>
            <p>RPBC 2024 Edition - Effective January 1, 2024. Includes updated energy efficiency standards and seismic design requirements.</p>
          </div>

          <h3>Code Categories</h3>

          <div className="card" style={{ marginTop: '20px' }}>
            <h4 className="card-title">Structural Code</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>Governs the design and construction of building structural systems including foundations, walls, floors, and roofs.</p>
            <h5 style={{ fontSize: '14px', marginBottom: '8px' }}>Key Requirements:</h5>
            <ul style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              <li>Dead and live load calculations based on building use</li>
              <li>Seismic design requirements for Risk Zone 3 areas</li>
              <li>Wind load resistance for coastal construction</li>
              <li>Soil bearing capacity and foundation design standards</li>
              <li>Structural steel and concrete specifications</li>
            </ul>
          </div>

          <div className="card">
            <h4 className="card-title">Fire Safety Code</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>Establishes fire-resistive construction requirements, egress systems, and fire protection measures.</p>
            <h5 style={{ fontSize: '14px', marginBottom: '8px' }}>Key Requirements:</h5>
            <ul style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              <li>Fire-rated assemblies for walls, floors, and doors based on occupancy type</li>
              <li>Minimum egress width and exit signage requirements</li>
              <li>Automatic sprinkler system requirements for buildings over 3 stories</li>
              <li>Fire alarm and detection system specifications</li>
              <li>Smoke control and ventilation systems for enclosed spaces</li>
            </ul>
          </div>

          <div className="card">
            <h4 className="card-title">Energy Efficiency Code</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>Mandates minimum energy performance standards for building envelope and mechanical systems.</p>
            <h5 style={{ fontSize: '14px', marginBottom: '8px' }}>Key Requirements:</h5>
            <ul style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              <li>Minimum R-values for insulation: R-30 roofs, R-19 walls, R-13 foundations</li>
              <li>Maximum U-factor 0.30 for windows and doors</li>
              <li>HVAC efficiency minimums: 16 SEER cooling, 95 AFUE heating</li>
              <li>LED lighting required for 90% of fixtures in commercial buildings</li>
              <li>Solar-ready roof design for new residential construction</li>
            </ul>
          </div>

          <div className="card">
            <h4 className="card-title">Accessibility Code</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>Ensures buildings are accessible to persons with disabilities in accordance with Universal Design principles.</p>
            <h5 style={{ fontSize: '14px', marginBottom: '8px' }}>Key Requirements:</h5>
            <ul style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              <li>Accessible routes from parking to building entrances</li>
              <li>Minimum doorway width of 36 inches, 32 inches clear opening</li>
              <li>Ramps with maximum 1:12 slope and handrails both sides</li>
              <li>Elevator required for buildings over 3 stories or 3,000 sq ft per floor</li>
              <li>Accessible bathrooms with proper clearances and grab bars</li>
            </ul>
          </div>

          <div className="card">
            <h4 className="card-title">Plumbing Code</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>Regulates water supply, drainage systems, and plumbing fixtures for health and safety.</p>
            <h5 style={{ fontSize: '14px', marginBottom: '8px' }}>Key Requirements:</h5>
            <ul style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              <li>Approved pipe materials: copper, PEX, CPVC for supply; PVC, cast iron for drainage</li>
              <li>Backflow prevention devices on all potable water connections</li>
              <li>Proper venting for all drainage fixtures</li>
              <li>Low-flow fixtures: 1.6 GPF toilets, 2.0 GPM showerheads</li>
              <li>Water heater temperature and pressure relief valves</li>
            </ul>
          </div>

          <div className="card">
            <h4 className="card-title">Electrical Code</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>Based on National Electrical Code (NEC) with Prayan amendments for safe electrical installations.</p>
            <h5 style={{ fontSize: '14px', marginBottom: '8px' }}>Key Requirements:</h5>
            <ul style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              <li>GFCI protection for bathrooms, kitchens, outdoors, and wet locations</li>
              <li>AFCI protection for all bedroom circuits</li>
              <li>Service panel sizing: minimum 200 amps for new residential</li>
              <li>Dedicated circuits for major appliances</li>
              <li>Proper grounding and bonding of electrical systems</li>
            </ul>
          </div>

          <h3>Code Compliance Resources</h3>
          <div className="card" style={{ background: 'var(--bg-elevated)' }}>
            <h4 className="card-title">Getting Help with Code Requirements</h4>
            <ul>
              <li><strong>Code Interpretation Service:</strong> Email specific questions to codes@buildings.gov.py for official interpretation</li>
              <li><strong>Plan Review Pre-Consultation:</strong> Schedule meeting with plan reviewers before submission ($150/hour)</li>
              <li><strong>Code Reference Library:</strong> Free access at all BD offices - complete code books and reference materials</li>
              <li><strong>Online Code Search:</strong> Search code sections at www.buildings.gov.py/codes</li>
              <li><strong>Educational Workshops:</strong> Monthly code training sessions for contractors and designers</li>
            </ul>
          </div>

          <h3>Common Code Violations</h3>
          <p>Avoid these frequent issues that delay approval:</p>
          <ul>
            <li>Missing or undersized structural members</li>
            <li>Inadequate egress width or travel distance to exits</li>
            <li>Improper fire-rated assemblies between units or occupancies</li>
            <li>Insufficient insulation or air sealing</li>
            <li>Missing GFCI or AFCI protection on required circuits</li>
            <li>Improper drainage venting or trap configurations</li>
            <li>Non-compliant accessibility features</li>
          </ul>
        </div>
      </div>
    </main>
  )
}

function BDServices() {
  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/bd">Home</Link> / Online Services
          </div>
          <h1>Online Services</h1>
          <p className="subtitle">Digital tools for permit management and building information</p>
        </div>
      </div>
      <div className="container">
        <div className="content-text">
          <h3>Available Online Services</h3>
          <p>Access building department services 24/7 through our digital platform:</p>

          <div className="card" style={{ marginTop: '20px' }}>
            <h4 className="card-title">Permit Status Lookup</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Track your permit application in real-time from submission through approval. View inspection results and conditions of approval.</p>
            <div style={{ padding: '16px', background: 'var(--bg-elevated)', borderRadius: '8px', marginTop: '12px' }}>
              <p style={{ fontSize: '13px', marginBottom: '8px', color: 'var(--text-secondary)' }}><strong>Search by:</strong></p>
              <ul style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: 0 }}>
                <li>Permit number</li>
                <li>Property address</li>
                <li>Parcel number</li>
                <li>Applicant name</li>
              </ul>
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Online Permit Applications</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Submit permit applications electronically with digital plan upload. Automated plan check for qualifying projects provides same-day approval.</p>
            <div style={{ padding: '16px', background: 'var(--bg-elevated)', borderRadius: '8px', marginTop: '12px' }}>
              <p style={{ fontSize: '13px', marginBottom: '8px', color: 'var(--text-secondary)' }}><strong>Eligible for expedited review:</strong></p>
              <ul style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: 0 }}>
                <li>Residential re-roofing (no structural changes)</li>
                <li>Residential water heater replacement</li>
                <li>Standard residential solar panel installation</li>
                <li>Fence installation (under 6 feet height)</li>
                <li>Minor electrical and plumbing repairs</li>
              </ul>
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Document Upload Portal</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Submit required documents, revised plans, and inspection-related materials electronically. Accepted formats: PDF, DWG, DXF, JPG.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '12px' }}>
              <strong>Maximum file size:</strong> 50MB per upload | <strong>Storage:</strong> Documents retained for 7 years
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Inspection Scheduling</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Schedule inspections online with real-time availability. Receive email and SMS notifications of inspector arrival time.</p>
            <div style={{ padding: '16px', background: 'var(--bg-elevated)', borderRadius: '8px', marginTop: '12px' }}>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                <strong>Scheduling window:</strong> Request inspections up to 14 days in advance. Same-day requests must be submitted before 9:00 AM. Cancel or reschedule up to 2 hours before appointment.
              </p>
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Fee Payment System</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Pay permit fees, inspection fees, and penalties online using credit card, debit card, or electronic bank transfer.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '12px' }}>
              <strong>Payment methods:</strong> Visa, Mastercard, Praya Debit, direct bank transfer | <strong>Processing:</strong> Instant confirmation
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Code Violation Search</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Research code violations and compliance orders on any property. Essential for due diligence before property purchase.</p>
            <div style={{ padding: '16px', background: 'rgba(217, 119, 6, 0.1)', borderRadius: '8px', marginTop: '12px', fontSize: '13px' }}>
              <strong>Public Records:</strong> Violation database includes open violations, compliance history, and certificate of occupancy status for all properties in Praya.
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Property Reports</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Generate comprehensive reports showing all permits, inspections, and approvals for any property address.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '12px' }}>
              <strong>Report includes:</strong> Permit history, inspection records, certificates of occupancy, zoning information | <strong>Fee:</strong> $25 per report
            </div>
          </div>

          <h3>Account Features</h3>
          <div className="card" style={{ background: 'var(--bg-elevated)' }}>
            <h4 className="card-title">Create a Buildings Department Account</h4>
            <p style={{ marginBottom: '12px' }}>Register for a free account to access enhanced features:</p>
            <ul style={{ marginBottom: '16px' }}>
              <li>Save and track multiple permit applications</li>
              <li>Set up email alerts for application status changes</li>
              <li>Store payment methods for quick fee payment</li>
              <li>Access digital copies of approved permits and certificates</li>
              <li>Schedule recurring inspections for ongoing projects</li>
              <li>View personalized dashboard with all your projects</li>
            </ul>
            <div style={{ padding: '12px', background: 'rgba(217, 119, 6, 0.1)', borderRadius: '8px', fontSize: '13px' }}>
              <strong>Registration:</strong> Create account at www.buildings.gov.py/register with valid email and ID verification
            </div>
          </div>

          <h3>System Requirements</h3>
          <ul>
            <li><strong>Browsers:</strong> Chrome 90+, Firefox 88+, Safari 14+, Edge 90+</li>
            <li><strong>Internet:</strong> Minimum 2 Mbps connection for plan uploads</li>
            <li><strong>PDF Viewer:</strong> Adobe Reader or browser built-in viewer</li>
            <li><strong>CAD Files:</strong> AutoCAD 2018 or later for DWG uploads</li>
          </ul>

          <div className="info-box" style={{ marginTop: '24px' }}>
            <h4>Need Technical Support?</h4>
            <p>For help with online services, contact our technical support team at support@buildings.gov.py or call 1-800-PRAYA-BUILD, Monday-Friday 8:00 AM - 6:00 PM.</p>
          </div>
        </div>
      </div>
    </main>
  )
}
