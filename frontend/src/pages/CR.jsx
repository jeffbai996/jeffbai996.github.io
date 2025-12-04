import React, { useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import './Department.css'

export default function CR() {
  const navigate = useNavigate()

  useEffect(() => {
    document.body.classList.add('theme-cr')
    return () => document.body.classList.remove('theme-cr')
  }, [])

  return (
    <>
      <header className="dept-header">
        <div className="container">
          <Link to="/cr" className="dept-logo">
            <div className="logo-mark">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <div className="logo-text">
              <h1>Companies Registry</h1>
              <span className="tagline">Republic of Praya</span>
            </div>
          </Link>
          <nav className="nav">
            <Link to="/cr" className="nav-link">Home</Link>
            <Link to="/cr/register" className="nav-link">Register Company</Link>
            <Link to="/cr/search" className="nav-link">Company Search</Link>
            <Link to="/cr/filings" className="nav-link">Annual Filings</Link>
            <Link to="/cr/services" className="nav-link">Services</Link>
          </nav>
        </div>
      </header>

      <Routes>
        <Route index element={<CRHome navigate={navigate} />} />
        <Route path="register" element={<CRRegister />} />
        <Route path="search" element={<CRSearch />} />
        <Route path="filings" element={<CRFilings />} />
        <Route path="services" element={<CRServices />} />
      </Routes>

      <footer className="dept-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <h4>Companies Registry</h4>
              <p>The official registry for business incorporation and company records in the Republic of Praya.</p>
            </div>
            <div className="footer-section">
              <h5>Services</h5>
              <ul>
                <li><Link to="/cr/register">Register Company</Link></li>
                <li><Link to="/cr/search">Company Search</Link></li>
                <li><Link to="/cr/filings">Annual Filings</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5>Resources</h5>
              <ul>
                <li><a href="#">Companies Act</a></li>
                <li><a href="#">Forms Library</a></li>
                <li><a href="#">Fee Schedule</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5>Government</h5>
              <ul>
                <li><Link to="/">Gov Portal</Link></li>
                <li><a href="/revenue">Revenue Dept.</a></li>
                <li><a href="/ctb">Cannabis Tax Bureau</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>&copy; 2024 Republic of Praya. Companies Registry.</span>
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

function CRHome({ navigate }) {
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
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
              </svg>
              Business Registration
            </div>
            <h2>Register Your <span>Business</span></h2>
            <p>The Companies Registry is the official authority for incorporating businesses, maintaining company records, and ensuring corporate compliance throughout the Republic of Praya.</p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => navigate('/cr/register')}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="16"/>
                  <line x1="8" y1="12" x2="16" y2="12"/>
                </svg>
                Incorporate Now
              </button>
              <button className="btn btn-secondary" onClick={() => navigate('/cr/search')}>
                Search Companies
              </button>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-image-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
              </svg>
            </div>
            <div className="hero-image-text">
              Empowering entrepreneurs and businesses across the Republic of Praya
            </div>
          </div>
        </div>
      </section>

      <section className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Registered Companies</span>
              <span className="stat-value">147,832</span>
              <span className="stat-change">Active</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">New Incorporations</span>
              <span className="stat-value">12,456</span>
              <span className="stat-change">FY 2024</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Avg Processing</span>
              <span className="stat-value">3</span>
              <span className="stat-change">Business Days</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Online Filings</span>
              <span className="stat-value">94.2%</span>
              <span className="stat-change">Digital Rate</span>
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
                  <h3 className="card-title">Business Entity Types</h3>
                  <Link to="/cr/register" className="card-link">Register Now</Link>
                </div>
                <div className="content-text">
                  <p>Choose the appropriate business structure for your needs:</p>
                  <ul>
                    <li><strong>Private Limited Company (Ltd)</strong> - Most common for small to medium businesses</li>
                    <li><strong>Public Limited Company (PLC)</strong> - For companies seeking public investment</li>
                    <li><strong>Limited Liability Partnership (LLP)</strong> - Combines partnership flexibility with limited liability</li>
                    <li><strong>Sole Proprietorship</strong> - Simple registration for individual traders</li>
                  </ul>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Recent Announcements</h3>
                </div>
                <div className="news-item">
                  <span className="news-date">Nov 25, 2024</span>
                  <h4 className="news-title">Simplified Incorporation Process</h4>
                  <p className="news-excerpt">New streamlined online registration now allows same-day incorporation for standard company types.</p>
                </div>
                <div className="news-item">
                  <span className="news-date">Nov 18, 2024</span>
                  <h4 className="news-title">Annual Return Deadline Reminder</h4>
                  <p className="news-excerpt">All companies must file annual returns by December 31, 2024 to avoid late filing penalties.</p>
                </div>
              </div>
            </div>

            <aside className="sidebar">
              <div className="card">
                <h4 className="card-title">Quick Services</h4>
                <div className="quick-link" onClick={() => navigate('/cr/register')}>
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                      <polyline points="14,2 14,8 20,8"/>
                      <line x1="12" y1="18" x2="12" y2="12"/>
                      <line x1="9" y1="15" x2="15" y2="15"/>
                    </svg>
                  </span>
                  New Registration
                </div>
                <div className="quick-link" onClick={() => navigate('/cr/search')}>
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"/>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                  </span>
                  Company Search
                </div>
                <div className="quick-link" onClick={() => navigate('/cr/filings')}>
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                  </span>
                  Annual Filings
                </div>
                <div className="quick-link">
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                      <polyline points="14,2 14,8 20,8"/>
                    </svg>
                  </span>
                  Download Forms
                </div>
              </div>

              <div className="info-box">
                <h4>Starting a Business?</h4>
                <p>Our business advisory service can help you choose the right company structure. Call 1-800-PRAYA-BIZ for free consultation.</p>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  )
}

function CRRegister() {
  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/cr">Home</Link> / Register Company
          </div>
          <h1>Company Registration</h1>
          <p className="subtitle">Incorporate your business in the Republic of Praya</p>
        </div>
      </div>
      <div className="container">
        <div className="content-text">
          <h3>Company Types</h3>
          <p>Select the business structure that best fits your needs:</p>

          <div className="card" style={{ marginTop: '20px' }}>
            <h4 className="card-title">Private Limited Company (Ltd)</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Ideal for small to medium businesses. Requires minimum 1 director and 1 shareholder. Share capital minimum ¤1.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Fee:</strong> ¤350 | <strong>Processing:</strong> 1-3 business days
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Public Limited Company (PLC)</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>For companies seeking to raise capital from the public. Requires minimum 2 directors and share capital of ¤50,000.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Fee:</strong> ¤1,500 | <strong>Processing:</strong> 5-10 business days
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Limited Liability Partnership (LLP)</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Combines the flexibility of a partnership with limited liability protection. Popular for professional services firms.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Fee:</strong> ¤250 | <strong>Processing:</strong> 1-3 business days
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Sole Proprietorship</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Simplest form of business registration for individual traders. No separation between owner and business entity.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Fee:</strong> ¤50 | <strong>Processing:</strong> Same day
            </div>
          </div>

          <h3>Required Documents</h3>
          <ul>
            <li>Completed incorporation form</li>
            <li>Articles of Association</li>
            <li>Memorandum of Association</li>
            <li>Director and shareholder identification</li>
            <li>Registered office address proof</li>
            <li>Company secretary appointment (for PLCs)</li>
          </ul>
        </div>
      </div>
    </main>
  )
}

function CRSearch() {
  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/cr">Home</Link> / Company Search
          </div>
          <h1>Company Search</h1>
          <p className="subtitle">Access comprehensive company information and public records</p>
        </div>
      </div>
      <div className="container">
        <div className="content-text">
          <div className="info-box" style={{ marginBottom: '24px', background: 'rgba(59, 130, 246, 0.05)' }}>
            <h4>Public Information Database</h4>
            <p>Search our registry of 147,832 active companies. All registered company information is public record and freely accessible.</p>
          </div>

          <h3>Search Methods</h3>
          <p>Find company information using any of these search options:</p>

          <div className="card" style={{ marginTop: '20px' }}>
            <h4 className="card-title">Company Name Search</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Search by full or partial company name. Results include all companies with matching names and similar names to avoid duplication.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Search tips:</strong> Use wildcards (*) for partial names. Search is case-insensitive. Include entity type (Ltd, PLC, LLP) for more precise results.
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Registration Number Search</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Look up companies using their unique registration number (CRN). Most accurate search method for specific company verification.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Format:</strong> CRN consists of 8 digits (e.g., 12345678). Old format companies may have 6-digit numbers with letter prefix.
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Director Search</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Find all companies where a specific person serves as director or officer. Useful for due diligence and conflict of interest checks.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Search by:</strong> Full name, national ID number, or previous names. Results show current and resigned directorships.
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Address Search</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Locate all companies registered at a specific address. Identifies virtual offices and shared registered addresses.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Note:</strong> Searches registered office address only. Business operating address may differ.
            </div>
          </div>

          <h3>Available Information</h3>
          <p>Search results provide access to the following public records:</p>

          <div className="card" style={{ background: 'var(--bg-elevated)' }}>
            <h4 className="card-title">Company Profile</h4>
            <ul style={{ marginBottom: '12px' }}>
              <li>Full legal name and registration number</li>
              <li>Entity type and incorporation date</li>
              <li>Registered office address</li>
              <li>Company status (Active, Dissolved, Strike-Off, Liquidation)</li>
              <li>Business activities and industry classification</li>
              <li>Share capital and shareholder structure</li>
            </ul>
          </div>

          <div className="card" style={{ background: 'var(--bg-elevated)' }}>
            <h4 className="card-title">Officers and Directors</h4>
            <ul style={{ marginBottom: '12px' }}>
              <li>Names and addresses of all current directors</li>
              <li>Appointment and resignation dates</li>
              <li>Company secretary details (if applicable)</li>
              <li>Authorized signatories and their powers</li>
              <li>Beneficial ownership information (25%+ shareholding)</li>
            </ul>
          </div>

          <div className="card" style={{ background: 'var(--bg-elevated)' }}>
            <h4 className="card-title">Filing History</h4>
            <ul style={{ marginBottom: '12px' }}>
              <li>Annual returns and accounts submission dates</li>
              <li>Changes to company structure or officers</li>
              <li>Charge registrations (mortgages and liens)</li>
              <li>Notices and resolutions</li>
              <li>Compliance status and late filing penalties</li>
            </ul>
          </div>

          <h3>Document Retrieval</h3>
          <p>Official company documents available for download or certified copies:</p>

          <div className="card">
            <h4 className="card-title">Available Documents</h4>
            <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              <ul>
                <li><strong>Certificate of Incorporation</strong> - Original incorporation certificate (¤25)</li>
                <li><strong>Certificate of Good Standing</strong> - Current compliance certificate (¤50)</li>
                <li><strong>Articles of Association</strong> - Company constitution and rules (¤15)</li>
                <li><strong>Annual Returns</strong> - Filed annual statements (¤10 per year)</li>
                <li><strong>Financial Statements</strong> - Audited accounts if filed (¤20 per year)</li>
                <li><strong>Charge Certificates</strong> - Security interest registrations (¤15 each)</li>
              </ul>
              <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px', fontSize: '13px' }}>
                <strong>Certification:</strong> Add ¤25 for official stamp and seal. Certified copies accepted by banks and government agencies worldwide.
              </div>
            </div>
          </div>

          <h3>Certificate Verification</h3>
          <div className="card" style={{ background: 'var(--bg-elevated)' }}>
            <h4 className="card-title">Verify Document Authenticity</h4>
            <p style={{ marginBottom: '12px' }}>All official certificates issued by the Companies Registry include a unique verification code. Enter the code to confirm document authenticity and issuance date.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Verification code format:</strong> CR-YYYY-XXXXXXXX (where YYYY is year, X is unique identifier)<br/>
              <strong>Service:</strong> Free, instant verification available 24/7
            </div>
          </div>

          <h3>Special Searches</h3>
          <div className="card">
            <h4 className="card-title">Advanced Search Services</h4>
            <p style={{ marginBottom: '16px' }}>Request customized searches and reports from our research team:</p>
            <ul style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              <li><strong>Ownership Tracing</strong> - Follow corporate ownership through multiple layers (¤200)</li>
              <li><strong>Director Network Analysis</strong> - Map connections between directors and companies (¤300)</li>
              <li><strong>Company Group Structures</strong> - Identify parent, subsidiary relationships (¤250)</li>
              <li><strong>Historical Records</strong> - Research dissolved companies and archived records (¤150/hour)</li>
              <li><strong>Bulk Data Exports</strong> - Download datasets for research or compliance (quote required)</li>
            </ul>
            <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px', fontSize: '13px' }}>
              <strong>Turnaround:</strong> Standard searches completed within 5 business days. Rush service available.
            </div>
          </div>

          <div className="info-box" style={{ marginTop: '24px' }}>
            <h4>Need Help Searching?</h4>
            <p>Our registry helpdesk can assist with complex searches and interpretation of company records. Call 1-800-PRAYA-REG or email search@cr.gov.py, Monday-Friday 9:00 AM - 5:00 PM.</p>
          </div>
        </div>
      </div>
    </main>
  )
}

function CRFilings() {
  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/cr">Home</Link> / Annual Filings
          </div>
          <h1>Annual Filings</h1>
          <p className="subtitle">Maintain your company's compliance with statutory filing requirements</p>
        </div>
      </div>
      <div className="container">
        <div className="content-text">
          <div className="info-box" style={{ marginBottom: '24px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
            <h4>Important Deadline</h4>
            <p>All companies must file annual returns within 42 days of their incorporation anniversary. Late filing penalties apply: ¤100 first month, ¤50 each additional month. Companies more than 6 months late may be struck off the register.</p>
          </div>

          <h3>Required Annual Filings</h3>
          <p>All registered companies must submit these documents each year:</p>

          <div className="card" style={{ marginTop: '20px' }}>
            <h4 className="card-title">Annual Return (Form AR1)</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Comprehensive snapshot of company structure, officers, shareholders, and registered particulars as of the return date.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
              <strong>Filing deadline:</strong> Within 42 days of incorporation anniversary | <strong>Fee:</strong> ¤150
            </div>
            <div style={{ padding: '12px', background: 'var(--bg-elevated)', borderRadius: '8px', fontSize: '13px' }}>
              <strong>Required information:</strong>
              <ul style={{ marginTop: '8px', marginBottom: 0 }}>
                <li>Confirmation of registered office address</li>
                <li>Details of all directors and company secretary</li>
                <li>Statement of share capital and shareholders</li>
                <li>Principal business activities</li>
                <li>Declaration of beneficial ownership (25%+ stakes)</li>
              </ul>
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Financial Statements</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Annual audited accounts showing financial position, profit and loss, and cash flow statement.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
              <strong>Filing deadline:</strong> Within 6 months of financial year end | <strong>Fee:</strong> ¤100
            </div>
            <div style={{ padding: '12px', background: 'var(--bg-elevated)', borderRadius: '8px', fontSize: '13px' }}>
              <strong>Requirements vary by company size:</strong>
              <ul style={{ marginTop: '8px', marginBottom: 0 }}>
                <li><strong>Small companies</strong> (turnover under ¤2M): Abbreviated accounts acceptable</li>
                <li><strong>Medium companies</strong> (turnover ¤2M-10M): Full accounts, audit optional</li>
                <li><strong>Large companies</strong> (turnover over ¤10M): Full audited accounts required</li>
                <li><strong>Public companies</strong> (all PLCs): Full audited accounts mandatory</li>
              </ul>
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Directors' Report</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Narrative report on business activities, principal risks, future developments, and key performance indicators.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Required for:</strong> Medium and large companies, all PLCs | <strong>Exemption:</strong> Small companies may omit
            </div>
          </div>

          <h3>Other Statutory Filings</h3>
          <p>Submit these forms within specified timeframes when changes occur:</p>

          <div className="card" style={{ marginTop: '20px' }}>
            <h4 className="card-title">Change of Directors (Form D1)</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Notify the Registry of director appointments or resignations.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Deadline:</strong> 14 days from effective date | <strong>Fee:</strong> ¤50 | <strong>Required info:</strong> Full name, address, date of birth, ID number, appointment/resignation date
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Change of Company Secretary (Form S1)</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Update secretary appointment or resignation (required for PLCs).</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Deadline:</strong> 14 days from change | <strong>Fee:</strong> ¤50
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Change of Registered Office (Form A1)</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Notify new registered office address within Praya.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Deadline:</strong> 14 days before relocation | <strong>Fee:</strong> ¤75 | <strong>Note:</strong> Address must be physical location, not PO Box
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Allotment of Shares (Form SH1)</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Report new share issuances and changes to share capital.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Deadline:</strong> 30 days from allotment | <strong>Fee:</strong> ¤100 + 0.5% of share value
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Charge Registration (Form CH1)</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Register mortgages, liens, and security interests over company assets.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Deadline:</strong> 21 days from creation of charge | <strong>Fee:</strong> ¤200 | <strong>Critical:</strong> Unregistered charges may be void against creditors
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Special Resolutions (Form R1)</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>File resolutions amending articles, changing company name, or approving major transactions.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Deadline:</strong> 15 days from resolution passing | <strong>Fee:</strong> ¤100
            </div>
          </div>

          <h3>Filing Methods</h3>
          <div className="card" style={{ background: 'var(--bg-elevated)' }}>
            <h4 className="card-title">How to Submit Filings</h4>
            <p style={{ marginBottom: '12px' }}>Choose the most convenient filing method:</p>
            <ul style={{ marginBottom: '16px' }}>
              <li><strong>Online Filing Portal:</strong> Submit forms electronically with instant confirmation (www.cr.gov.py/efile)</li>
              <li><strong>Registered Agent:</strong> Authorize corporate services provider to file on your behalf</li>
              <li><strong>Email Submission:</strong> Send completed PDF forms to filings@cr.gov.py (confirmation within 24 hours)</li>
              <li><strong>Post:</strong> Mail documents to Companies Registry, PO Box 1234, Central Praya (processing time 5-7 days)</li>
              <li><strong>In Person:</strong> Submit at Registry counter, Government Tower, Monday-Friday 9:00 AM - 4:00 PM</li>
            </ul>
            <div style={{ padding: '12px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px', fontSize: '13px' }}>
              <strong>Recommendation:</strong> Online filing is fastest and provides automatic validation to prevent errors.
            </div>
          </div>

          <h3>Compliance Calendar</h3>
          <div className="card">
            <h4 className="card-title">Set Up Filing Reminders</h4>
            <p style={{ marginBottom: '12px' }}>Never miss a deadline with our automated reminder service:</p>
            <ul style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              <li>Email alerts 60, 30, and 7 days before annual return due date</li>
              <li>SMS notifications for urgent deadlines</li>
              <li>Personalized compliance calendar with all your filing obligations</li>
              <li>Integration with accounting software (Xero, QuickBooks, MYOB)</li>
            </ul>
            <div style={{ marginTop: '12px', fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Setup:</strong> Free service available through your online account at www.cr.gov.py
            </div>
          </div>

          <h3>Late Filing Penalties</h3>
          <div className="card" style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
            <h4 className="card-title">Consequences of Non-Compliance</h4>
            <p style={{ marginBottom: '12px' }}>Failing to file on time results in:</p>
            <ul style={{ marginBottom: '16px' }}>
              <li><strong>Automatic penalties:</strong> ¤100 first month late, ¤50 each additional month</li>
              <li><strong>Director liability:</strong> Directors personally liable for penalties if company fails to pay</li>
              <li><strong>Loss of good standing:</strong> Cannot obtain certificates or file other documents</li>
              <li><strong>Strike-off notice:</strong> Company may be dissolved after 6 months non-compliance</li>
              <li><strong>Prosecution:</strong> Persistent default may result in criminal charges (max fine ¤10,000)</li>
            </ul>
            <div style={{ padding: '12px', background: 'white', borderRadius: '8px', fontSize: '13px' }}>
              <strong>Rectification:</strong> File outstanding returns immediately and pay penalties to restore compliance. Contact filings@cr.gov.py for payment arrangements.
            </div>
          </div>

          <div className="info-box" style={{ marginTop: '24px' }}>
            <h4>Filing Assistance</h4>
            <p>Our filing support team can help complete forms and answer questions about requirements. Call 1-800-PRAYA-FILE or email filings@cr.gov.py, Monday-Friday 9:00 AM - 5:00 PM. Professional filing agent list available on our website.</p>
          </div>
        </div>
      </div>
    </main>
  )
}

function CRServices() {
  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/cr">Home</Link> / Online Services
          </div>
          <h1>Online Services</h1>
          <p className="subtitle">Digital tools for company registration, management, and compliance</p>
        </div>
      </div>
      <div className="container">
        <div className="content-text">
          <h3>Available Digital Services</h3>
          <p>Manage your company obligations online 24/7:</p>

          <div className="card" style={{ marginTop: '20px' }}>
            <h4 className="card-title">Online Company Registration</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Incorporate your business entirely online with same-day approval for standard company types. Automated name checking and document generation.</p>
            <div style={{ padding: '16px', background: 'var(--bg-elevated)', borderRadius: '8px', marginTop: '12px' }}>
              <p style={{ fontSize: '13px', marginBottom: '8px', color: 'var(--text-secondary)' }}><strong>Process:</strong></p>
              <ol style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: 0 }}>
                <li>Check name availability (instant results)</li>
                <li>Select company structure and complete online form</li>
                <li>Upload ID documents for directors and shareholders</li>
                <li>Pay registration fee online</li>
                <li>Receive Certificate of Incorporation (usually within 4 hours)</li>
              </ol>
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Name Availability Check</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Search proposed company names instantly. System checks for duplicates, similar names, and restricted words requiring approval.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '12px' }}>
              <strong>Features:</strong> Alternative suggestions, trademark conflict warnings, instant reservation (¤50 for 90 days)
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Electronic Filing System</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Submit all statutory forms and documents electronically. Automatic validation reduces errors and speeds processing.</p>
            <div style={{ padding: '16px', background: 'var(--bg-elevated)', borderRadius: '8px', marginTop: '12px' }}>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                <strong>Supported filings:</strong> Annual returns, director changes, address updates, share allotments, charges, resolutions, financial statements
              </p>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '8px', marginBottom: 0 }}>
                <strong>Benefits:</strong> Instant confirmation, automatic fee calculation, digital signature support, batch filing for corporate groups
              </p>
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Document Management Portal</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Secure online repository for all your company documents. Access filed documents, certificates, and correspondence anytime.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '12px' }}>
              <strong>Storage includes:</strong> Incorporation documents, annual returns, financial statements, change notifications, official certificates
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Certificate Requests</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Order official certificates online with home or office delivery. Digital certificates available for immediate download.</p>
            <div style={{ padding: '16px', background: 'var(--bg-elevated)', borderRadius: '8px', marginTop: '12px', fontSize: '13px' }}>
              <strong>Available certificates:</strong>
              <ul style={{ marginTop: '8px', marginBottom: '8px' }}>
                <li>Certificate of Incorporation - ¤25 (digital ¤15)</li>
                <li>Certificate of Good Standing - ¤50 (digital ¤30)</li>
                <li>Certificate of Status - ¤40 (digital ¤25)</li>
                <li>Certified Company Extract - ¤35 (digital ¤20)</li>
              </ul>
              <strong>Delivery:</strong> Standard mail (5-7 days) free, express (1-2 days) ¤25, digital immediate
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Compliance Dashboard</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Personalized dashboard showing all your compliance obligations, deadlines, and company status at a glance.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '12px' }}>
              <strong>Dashboard features:</strong> Next filing due dates, outstanding fees, document status tracking, compliance score, renewal reminders
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Bulk Operations</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Manage multiple companies efficiently with bulk filing capabilities. Ideal for corporate services providers and holding companies.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '12px' }}>
              <strong>Bulk services:</strong> Multi-company annual returns, batch document requests, group-wide updates, consolidated billing
            </div>
          </div>

          <h3>Account Features</h3>
          <div className="card" style={{ background: 'var(--bg-elevated)' }}>
            <h4 className="card-title">Companies Registry Online Account</h4>
            <p style={{ marginBottom: '12px' }}>Create a free account to access all digital services:</p>
            <ul style={{ marginBottom: '16px' }}>
              <li><strong>Company portfolio:</strong> Add and manage all your companies in one place</li>
              <li><strong>Authorized users:</strong> Grant access to accountants, lawyers, or staff members</li>
              <li><strong>Notification preferences:</strong> Customize email and SMS alerts</li>
              <li><strong>Payment methods:</strong> Save credit cards or bank accounts for quick payment</li>
              <li><strong>Transaction history:</strong> View all filings, payments, and certificate requests</li>
              <li><strong>Document library:</strong> Download all filed documents and certificates</li>
              <li><strong>API access:</strong> Integrate with your business systems (developer accounts)</li>
            </ul>
            <div style={{ padding: '12px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px', fontSize: '13px' }}>
              <strong>Registration:</strong> Sign up at www.cr.gov.py/register using national ID or corporate login credentials
            </div>
          </div>

          <h3>Payment Options</h3>
          <div className="card">
            <h4 className="card-title">Accepted Payment Methods</h4>
            <p style={{ marginBottom: '12px' }}>Pay fees securely online using:</p>
            <ul style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
              <li><strong>Credit/Debit Cards:</strong> Visa, Mastercard, Praya Express (2% processing fee)</li>
              <li><strong>Bank Transfer:</strong> Direct debit from Prayan bank accounts (no fee)</li>
              <li><strong>E-Wallet:</strong> PrayaPay, GovPay digital wallets (no fee)</li>
              <li><strong>Account Credit:</strong> Pre-load account balance for instant payments (no fee)</li>
            </ul>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Receipts:</strong> Automatic email receipt for all transactions. Downloadable tax invoices available in account history.
            </div>
          </div>

          <h3>API Integration</h3>
          <div className="card" style={{ background: 'var(--bg-elevated)' }}>
            <h4 className="card-title">Developer API</h4>
            <p style={{ marginBottom: '12px' }}>Integrate Companies Registry data and services into your applications:</p>
            <ul style={{ marginBottom: '16px' }}>
              <li><strong>Company Search API:</strong> Query company information programmatically</li>
              <li><strong>Filing Submission API:</strong> Submit documents through your system</li>
              <li><strong>Status Updates:</strong> Receive webhooks for filing status changes</li>
              <li><strong>Document Retrieval:</strong> Download certificates and filed documents</li>
              <li><strong>Validation Services:</strong> Verify director details and company status</li>
            </ul>
            <div style={{ padding: '12px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px', fontSize: '13px' }}>
              <strong>Access:</strong> Apply for API credentials at www.cr.gov.py/developers. Documentation and sandbox environment available. Usage fees apply for high-volume queries.
            </div>
          </div>

          <h3>Mobile App</h3>
          <div className="card">
            <h4 className="card-title">Companies Registry Mobile App</h4>
            <p style={{ marginBottom: '12px' }}>Manage your companies on the go with our mobile application:</p>
            <ul style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              <li>Quick company search and verification</li>
              <li>Push notifications for filing deadlines</li>
              <li>Mobile-optimized filing forms</li>
              <li>Document upload using phone camera</li>
              <li>Digital certificate downloads</li>
              <li>QR code scanning for instant company lookup</li>
            </ul>
            <div style={{ marginTop: '12px', fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Download:</strong> Available free on iOS App Store and Google Play Store. Search "Praya Companies Registry"
            </div>
          </div>

          <h3>System Requirements</h3>
          <ul>
            <li><strong>Browsers:</strong> Chrome 90+, Firefox 88+, Safari 14+, Edge 90+</li>
            <li><strong>Connection:</strong> Minimum 1 Mbps internet speed</li>
            <li><strong>Digital Signatures:</strong> DocuSign, Adobe Sign, or Praya eSign supported</li>
            <li><strong>File Formats:</strong> PDF, JPG, PNG for documents; CSV or XML for bulk data</li>
          </ul>

          <div className="info-box" style={{ marginTop: '24px' }}>
            <h4>Technical Support</h4>
            <p>For help with online services, contact our digital support team at support@cr.gov.py or call 1-800-PRAYA-BIZ. Live chat available Monday-Friday 9:00 AM - 6:00 PM. Video tutorials and user guides at www.cr.gov.py/help</p>
          </div>
        </div>
      </div>
    </main>
  )
}
