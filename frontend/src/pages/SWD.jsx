import React, { useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import './Department.css'

export default function SWD() {
  const navigate = useNavigate()

  useEffect(() => {
    document.body.classList.add('theme-swd')
    return () => document.body.classList.remove('theme-swd')
  }, [])

  return (
    <>
      <header className="dept-header">
        <div className="container">
          <Link to="/swd" className="dept-logo">
            <div className="logo-mark">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </div>
            <div className="logo-text">
              <h1>Social Welfare Department</h1>
              <span className="tagline">Republic of Praya</span>
            </div>
          </Link>
          <nav className="nav">
            <Link to="/swd" className="nav-link">Home</Link>
            <Link to="/swd/benefits" className="nav-link">Benefits</Link>
            <Link to="/swd/family" className="nav-link">Family Services</Link>
            <Link to="/swd/elderly" className="nav-link">Elderly Care</Link>
            <Link to="/swd/services" className="nav-link">Services</Link>
          </nav>
        </div>
      </header>

      <Routes>
        <Route index element={<SWDHome navigate={navigate} />} />
        <Route path="benefits" element={<SWDBenefits />} />
        <Route path="family" element={<SWDFamily />} />
        <Route path="elderly" element={<SWDElderly />} />
        <Route path="services" element={<SWDServices />} />
      </Routes>

      <footer className="dept-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <h4>Social Welfare Department</h4>
              <p>Supporting vulnerable citizens and strengthening families across the Republic of Praya.</p>
            </div>
            <div className="footer-section">
              <h5>Services</h5>
              <ul>
                <li><Link to="/swd/benefits">Social Benefits</Link></li>
                <li><Link to="/swd/family">Family Services</Link></li>
                <li><Link to="/swd/elderly">Elderly Care</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5>Resources</h5>
              <ul>
                <li><a href="#">Eligibility Calculator</a></li>
                <li><a href="#">Application Forms</a></li>
                <li><a href="#">Support Directory</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5>Government</h5>
              <ul>
                <li><Link to="/">Gov Portal</Link></li>
                <li><a href="/health">Health Dept.</a></li>
                <li><a href="/housing">Housing Authority</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>&copy; 2024 Republic of Praya. Social Welfare Department.</span>
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

function SWDHome({ navigate }) {
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
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              Social Services
            </div>
            <h2>Caring for <span>Every Citizen</span></h2>
            <p>The Social Welfare Department provides essential support services, financial assistance, and care programs for families, children, elderly, and vulnerable citizens throughout the Republic of Praya.</p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => navigate('/swd/benefits')}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                </svg>
                Apply for Benefits
              </button>
              <button className="btn btn-secondary" onClick={() => navigate('/swd/services')}>
                Find Services
              </button>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-image-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </div>
            <div className="hero-image-text">
              Supporting vulnerable citizens and strengthening families across Praya
            </div>
          </div>
        </div>
      </section>

      <section className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Citizens Assisted</span>
              <span className="stat-value">342,891</span>
              <span className="stat-change">FY 2024</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Benefits Distributed</span>
              <span className="stat-value">$1.2B</span>
              <span className="stat-change">Annual</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Service Centers</span>
              <span className="stat-value">87</span>
              <span className="stat-change">Nationwide</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Case Workers</span>
              <span className="stat-value">2,340</span>
              <span className="stat-change">Active Staff</span>
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
                  <h3 className="card-title">Assistance Programs</h3>
                  <Link to="/swd/benefits" className="card-link">View All</Link>
                </div>
                <div className="content-text">
                  <p>The Department offers various support programs for eligible citizens:</p>
                  <ul>
                    <li><strong>Financial Assistance</strong> - Monthly payments for low-income families and individuals</li>
                    <li><strong>Child Welfare</strong> - Foster care, adoption services, and child protection</li>
                    <li><strong>Elderly Support</strong> - Home care, day centers, and pension supplements</li>
                    <li><strong>Disability Services</strong> - Support allowances and accessibility programs</li>
                  </ul>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Recent Announcements</h3>
                </div>
                <div className="news-item">
                  <span className="news-date">Nov 30, 2024</span>
                  <h4 className="news-title">Winter Heating Allowance Applications Open</h4>
                  <p className="news-excerpt">Eligible households can now apply for the annual winter heating subsidy of up to $500.</p>
                </div>
                <div className="news-item">
                  <span className="news-date">Nov 22, 2024</span>
                  <h4 className="news-title">Expanded Childcare Support Program</h4>
                  <p className="news-excerpt">New subsidy covers up to 80% of childcare costs for qualifying working families.</p>
                </div>
              </div>
            </div>

            <aside className="sidebar">
              <div className="card">
                <h4 className="card-title">Quick Services</h4>
                <div className="quick-link" onClick={() => navigate('/swd/benefits')}>
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                      <polyline points="14,2 14,8 20,8"/>
                      <line x1="12" y1="18" x2="12" y2="12"/>
                      <line x1="9" y1="15" x2="15" y2="15"/>
                    </svg>
                  </span>
                  Apply for Benefits
                </div>
                <div className="quick-link" onClick={() => navigate('/swd/services')}>
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"/>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                  </span>
                  Check Eligibility
                </div>
                <div className="quick-link" onClick={() => navigate('/swd/family')}>
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                  </span>
                  Family Support
                </div>
                <div className="quick-link" onClick={() => navigate('/swd/elderly')}>
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78"/>
                    </svg>
                  </span>
                  Elderly Services
                </div>
              </div>

              <div className="info-box">
                <h4>Need Immediate Help?</h4>
                <p>Call our 24/7 helpline at 1-800-PRAYA-HELP for emergency assistance and crisis support.</p>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  )
}

function SWDBenefits() {
  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/swd">Home</Link> / Benefits
          </div>
          <h1>Social Benefits</h1>
          <p className="subtitle">Financial assistance and support programs for eligible citizens</p>
        </div>
      </div>
      <div className="container">
        <div className="content-text">
          <h3>Benefit Programs</h3>
          <p>Explore our range of support programs designed to help Praya citizens:</p>

          <div className="card" style={{ marginTop: '20px' }}>
            <h4 className="card-title">Comprehensive Social Assistance (CSA)</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Monthly financial support for individuals and families below the poverty threshold. Includes food, shelter, and basic needs allowance.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Amount:</strong> Up to $1,200/month | <strong>Eligibility:</strong> Income below $18,000/year
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Child Benefit Allowance</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Monthly payment for each dependent child under 18 years. Additional supplements for children with disabilities or special needs.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Amount:</strong> $150-300/child/month | <strong>Eligibility:</strong> All resident families
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Old Age Pension Supplement</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Additional support for seniors aged 65+ whose retirement income falls below the living standard threshold.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Amount:</strong> Up to $600/month | <strong>Eligibility:</strong> Seniors with low pension income
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Disability Support Allowance</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Financial assistance for citizens with permanent disabilities, covering care needs, equipment, and living expenses.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Amount:</strong> $400-800/month | <strong>Eligibility:</strong> Certified disability assessment
            </div>
          </div>

          <h3>How to Apply</h3>
          <ul>
            <li>Complete the online application or visit your local service center</li>
            <li>Provide proof of identity and residency</li>
            <li>Submit income verification documents</li>
            <li>Schedule an assessment interview if required</li>
            <li>Receive decision within 15 business days</li>
          </ul>
        </div>
      </div>
    </main>
  )
}

function SWDFamily() {
  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/swd">Home</Link> / Family Services
          </div>
          <h1>Family Services</h1>
          <p className="subtitle">Support programs for children, families, and child protection</p>
        </div>
      </div>
      <div className="container">
        <div className="content-text">
          <div className="info-box" style={{ marginBottom: '24px', background: 'rgba(236, 72, 153, 0.05)' }}>
            <h4>Our Commitment to Families</h4>
            <p>The Family Services Division provides comprehensive support to strengthen families, protect vulnerable children, and promote child welfare across the Republic of Praya.</p>
          </div>

          <h3>Child Protection Services</h3>
          <p>Safeguarding children from abuse, neglect, and exploitation:</p>

          <div className="card" style={{ marginTop: '20px' }}>
            <h4 className="card-title">Child Abuse Reporting & Investigation</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>24/7 hotline for reporting suspected child abuse or neglect. Trained social workers investigate all reports and take immediate action to protect at-risk children.</p>
            <div style={{ padding: '16px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', marginTop: '12px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
              <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Emergency Hotline: 1-800-CHILD-HELP (1-800-24453-4357)</p>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: 0 }}>
                Available 24 hours a day, 7 days a week. All reports are confidential. Mandatory reporting for teachers, doctors, and childcare workers.
              </p>
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">In-Home Family Support</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Intensive support services delivered in the family home to address challenges and prevent child removal when safe to do so.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Services include:</strong> Parenting skills training, budgeting assistance, substance abuse support referrals, mental health counseling, crisis intervention
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Out-of-Home Care</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>When children cannot safely remain at home, we provide temporary care arrangements while working toward family reunification.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Placement options:</strong> Kinship care (relatives), licensed foster homes, group homes, residential treatment facilities
            </div>
          </div>

          <h3>Foster Care Programs</h3>
          <p>Recruiting, training, and supporting foster families to provide safe, nurturing homes:</p>

          <div className="card" style={{ marginTop: '20px' }}>
            <h4 className="card-title">Become a Foster Parent</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Open your home to children in need. We provide comprehensive training, ongoing support, and monthly financial assistance.</p>
            <div style={{ padding: '12px', background: 'var(--bg-elevated)', borderRadius: '8px', marginTop: '12px', fontSize: '13px' }}>
              <strong>Requirements:</strong>
              <ul style={{ marginTop: '8px', marginBottom: '8px' }}>
                <li>At least 21 years old</li>
                <li>Stable housing with adequate space</li>
                <li>Reliable income (employment or benefits)</li>
                <li>Pass background checks and home safety inspection</li>
                <li>Complete 30 hours of pre-service training</li>
              </ul>
              <strong>Support provided:</strong> Monthly stipend ($400-800 per child), 24/7 caseworker support, respite care, medical coverage for children
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Foster Parent Training</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Comprehensive pre-service training covering trauma-informed care, child development, behavior management, and working with birth families.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Training schedule:</strong> Evening and weekend classes available. Online modules for flexible learning. Ongoing education required annually.
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Kinship Care Support</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Financial and support services for relatives caring for children who cannot live with their parents.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Benefits:</strong> Monthly allowance, child care subsidies, free legal assistance, support groups, emergency funds for clothing and supplies
            </div>
          </div>

          <h3>Adoption Services</h3>
          <p>Helping children find permanent, loving families:</p>

          <div className="card" style={{ marginTop: '20px' }}>
            <h4 className="card-title">Domestic Adoption</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Adoption of children in foster care whose parents' rights have been terminated and who need permanent homes.</p>
            <div style={{ padding: '12px', background: 'var(--bg-elevated)', borderRadius: '8px', marginTop: '12px', fontSize: '13px' }}>
              <strong>Process:</strong>
              <ol style={{ marginTop: '8px', marginBottom: '8px' }}>
                <li>Attend orientation session (free, no obligation)</li>
                <li>Submit adoption application and background checks</li>
                <li>Complete home study assessment (6-9 months)</li>
                <li>Review child profiles and matching</li>
                <li>Pre-placement visits and transition period</li>
                <li>Finalization hearing (6-12 months after placement)</li>
              </ol>
              <strong>Cost:</strong> Free for foster care adoptions. Financial assistance available for children with special needs.
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">International Adoption</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Support for Prayan families adopting children from other countries, including home studies and post-placement supervision.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Services:</strong> Home study preparation ($2,000), Hague Convention compliance, immigration support, cultural integration resources
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Post-Adoption Support</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Ongoing services for adoptive families including counseling, support groups, and crisis intervention.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Available support:</strong> Therapy referrals, adoption-competent counselors, monthly support groups, educational workshops, search/reunion services
            </div>
          </div>

          <h3>Family Counseling & Support</h3>
          <div className="card" style={{ marginTop: '20px' }}>
            <h4 className="card-title">Family Counseling Services</h4>
            <p style={{ marginBottom: '12px' }}>Free or low-cost counseling for families facing challenges:</p>
            <ul style={{ marginBottom: '16px', fontSize: '14px', color: 'var(--text-secondary)' }}>
              <li><strong>Parent-Child Conflict:</strong> Mediation and communication skills for troubled relationships</li>
              <li><strong>Divorce Support:</strong> Helping children and parents navigate separation</li>
              <li><strong>Grief Counseling:</strong> Supporting families after loss of a family member</li>
              <li><strong>Behavioral Issues:</strong> Managing challenging child behavior and mental health concerns</li>
              <li><strong>Substance Abuse Impact:</strong> Family therapy when addiction affects the household</li>
            </ul>
            <div style={{ padding: '12px', background: 'rgba(236, 72, 153, 0.1)', borderRadius: '8px', fontSize: '13px' }}>
              <strong>Access:</strong> Call 1-800-PRAYA-FAMILY to schedule intake appointment. Services provided by licensed therapists. Sliding fee scale based on income.
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Parenting Education Programs</h4>
            <p style={{ marginBottom: '12px' }}>Evidence-based parenting classes offered throughout Praya:</p>
            <ul style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              <li><strong>Triple P (Positive Parenting Program):</strong> Skills for managing behavior and building positive relationships</li>
              <li><strong>Incredible Years:</strong> Program for parents of young children (ages 0-5)</li>
              <li><strong>Teen Parenting 101:</strong> Support for adolescent parents</li>
              <li><strong>Co-Parenting After Divorce:</strong> Putting children first during separation</li>
            </ul>
            <div style={{ marginTop: '12px', fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Format:</strong> 6-8 week courses, evening and weekend options, childcare provided, completion certificates available
            </div>
          </div>

          <h3>Child Care Assistance</h3>
          <div className="card" style={{ background: 'var(--bg-elevated)' }}>
            <h4 className="card-title">Child Care Subsidy Program</h4>
            <p style={{ marginBottom: '12px' }}>Financial assistance for working families to access quality child care:</p>
            <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              <strong>Eligibility:</strong>
              <ul>
                <li>Parents working at least 20 hours per week or in school/training</li>
                <li>Income below 200% of poverty level ($36,000 for family of 3)</li>
                <li>Child under age 13 (or under 18 if disabled)</li>
              </ul>
              <strong>Benefit:</strong> Covers up to 80% of child care costs at licensed providers. Family pays co-payment based on income ($10-200 per week).
              <div style={{ marginTop: '12px', padding: '12px', background: 'white', borderRadius: '8px', fontSize: '13px' }}>
                <strong>How to apply:</strong> Complete online application at www.swd.gov.py/childcare or visit local service center. Processing time 15 business days.
              </div>
            </div>
          </div>

          <div className="info-box" style={{ marginTop: '24px' }}>
            <h4>Family Services Contact</h4>
            <p>For information about family support programs, foster care, or adoption services, call our Family Services Division at 1-800-PRAYA-FAMILY (1-800-77292-326459) or email family@swd.gov.py. Offices open Monday-Friday 8:00 AM - 6:00 PM. Emergency child protection line available 24/7.</p>
          </div>
        </div>
      </div>
    </main>
  )
}

function SWDElderly() {
  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/swd">Home</Link> / Elderly Care
          </div>
          <h1>Elderly Care Services</h1>
          <p className="subtitle">Support and care programs for senior citizens aged 65 and older</p>
        </div>
      </div>
      <div className="container">
        <div className="content-text">
          <div className="info-box" style={{ marginBottom: '24px', background: 'rgba(236, 72, 153, 0.05)' }}>
            <h4>Supporting Our Seniors</h4>
            <p>The Elderly Services Division helps older Praya citizens live independently with dignity through home care, day programs, and residential services.</p>
          </div>

          <h3>Home Care Services</h3>
          <p>Support services delivered in seniors' homes to maintain independence:</p>

          <div className="card" style={{ marginTop: '20px' }}>
            <h4 className="card-title">Personal Care Assistance</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Trained home care aides help with daily living activities including bathing, dressing, grooming, and mobility assistance.</p>
            <div style={{ padding: '12px', background: 'var(--bg-elevated)', borderRadius: '8px', marginTop: '12px', fontSize: '13px' }}>
              <strong>Service levels:</strong>
              <ul style={{ marginTop: '8px', marginBottom: 0 }}>
                <li><strong>Basic care:</strong> 2-4 hours per day, 2-3 days per week ($20/hour, subsidized to $5 for low-income)</li>
                <li><strong>Moderate care:</strong> 4-6 hours per day, 5 days per week ($18/hour with subsidy)</li>
                <li><strong>Intensive care:</strong> 8+ hours per day or overnight care ($15/hour with subsidy)</li>
              </ul>
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Homemaker Services</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Assistance with household tasks including light housekeeping, laundry, meal preparation, and grocery shopping.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Hours:</strong> 2-6 hours per week | <strong>Cost:</strong> $15/hour (subsidized to $3 for eligible seniors)
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Nursing Care at Home</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Registered nurses provide medical care including medication management, wound care, chronic disease monitoring, and post-hospital recovery support.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Services:</strong> Vital signs monitoring, insulin injections, catheter care, physical therapy exercises | <strong>Availability:</strong> Daily visits or as prescribed
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Emergency Response System</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Personal emergency button worn as pendant or wristband connects directly to 24/7 response center for immediate help.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Features:</strong> Two-way voice communication, automatic fall detection, GPS tracking (mobile version) | <strong>Cost:</strong> $30/month (free for low-income seniors)
            </div>
          </div>

          <h3>Day Care Centers</h3>
          <p>Social and therapeutic programs in community settings:</p>

          <div className="card" style={{ marginTop: '20px' }}>
            <h4 className="card-title">Adult Day Care Programs</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Supervised daytime programs providing social activities, meals, and personal care in a community center setting. Gives family caregivers respite while seniors enjoy companionship.</p>
            <div style={{ padding: '12px', background: 'var(--bg-elevated)', borderRadius: '8px', marginTop: '12px', fontSize: '13px' }}>
              <strong>Daily schedule:</strong>
              <ul style={{ marginTop: '8px', marginBottom: '8px' }}>
                <li>8:00 AM - 9:00 AM: Arrival and breakfast</li>
                <li>9:00 AM - 12:00 PM: Morning activities (exercise, crafts, games, outings)</li>
                <li>12:00 PM - 1:00 PM: Hot lunch and social time</li>
                <li>1:00 PM - 3:00 PM: Afternoon programs (music, educational talks, hobbies)</li>
                <li>3:00 PM - 4:00 PM: Snack and departure</li>
              </ul>
              <strong>Cost:</strong> $40 per day (includes meals, transportation, activities). Subsidized rate $10 for eligible seniors.
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Memory Care Day Program</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Specialized program for seniors with Alzheimer's disease or dementia in secure, structured environment with trained staff.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Features:</strong> Small group settings, memory-enhancing activities, sensory stimulation, wandering prevention, respite for caregivers | <strong>Ratio:</strong> 1 staff per 4 participants
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Transportation Services</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Door-to-door accessible van service for seniors attending day programs or needing transport to medical appointments.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Service area:</strong> All urban and suburban regions | <strong>Features:</strong> Wheelchair accessible, trained drivers, assistance to door | <strong>Cost:</strong> Free for day program participants
            </div>
          </div>

          <h3>Meals Programs</h3>
          <div className="card" style={{ marginTop: '20px' }}>
            <h4 className="card-title">Meals on Wheels</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Hot, nutritious meals delivered to homebound seniors' residences five days per week.</p>
            <div style={{ padding: '12px', background: 'var(--bg-elevated)', borderRadius: '8px', marginTop: '12px', fontSize: '13px' }}>
              <strong>What's included:</strong> Hot lunch delivered by noon, cold dinner to be heated later, diet modifications available (diabetic, low-sodium, pureed)
              <div style={{ marginTop: '8px' }}>
                <strong>Eligibility:</strong> Age 65+, homebound or unable to prepare meals | <strong>Cost:</strong> Suggested donation $5 per meal (no one denied for inability to pay)
              </div>
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Congregate Meals</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Hot lunch served at senior centers and community locations. Social dining experience with nutrition education and health screenings.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Locations:</strong> 45 sites across Praya | <strong>Time:</strong> 11:30 AM - 12:30 PM, Monday-Friday | <strong>Cost:</strong> Suggested donation $3
            </div>
          </div>

          <h3>Senior Activity Centers</h3>
          <div className="card" style={{ marginTop: '20px' }}>
            <h4 className="card-title">Community Senior Centers</h4>
            <p style={{ marginBottom: '12px' }}>Vibrant community hubs offering activities, classes, and social opportunities for active seniors:</p>
            <ul style={{ marginBottom: '16px', fontSize: '14px', color: 'var(--text-secondary)' }}>
              <li><strong>Fitness classes:</strong> Yoga, tai chi, water aerobics, strength training, walking clubs</li>
              <li><strong>Arts & crafts:</strong> Painting, pottery, woodworking, knitting, quilting</li>
              <li><strong>Educational programs:</strong> Computer classes, language lessons, history lectures, book clubs</li>
              <li><strong>Social events:</strong> Dances, card games, bingo, movie nights, holiday celebrations</li>
              <li><strong>Volunteer opportunities:</strong> Mentoring youth, community service, peer support</li>
            </ul>
            <div style={{ padding: '12px', background: 'rgba(236, 72, 153, 0.1)', borderRadius: '8px', fontSize: '13px' }}>
              <strong>Membership:</strong> Free for age 60+. Centers open Monday-Saturday 8:00 AM - 6:00 PM. Find your nearest center at www.swd.gov.py/seniors
            </div>
          </div>

          <h3>Residential Care Options</h3>
          <div className="card" style={{ marginTop: '20px' }}>
            <h4 className="card-title">Assisted Living Facilities</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Licensed facilities providing housing, meals, personal care, and 24-hour supervision for seniors who can no longer live independently.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Services:</strong> Private or semi-private rooms, three meals daily, medication management, activities, housekeeping | <strong>Cost:</strong> $2,500-4,500/month
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Nursing Homes</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Skilled nursing facilities for seniors requiring round-the-clock medical care and supervision.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Care provided:</strong> 24/7 nursing staff, physician services, rehabilitation therapy, specialized dementia care | <strong>Funding:</strong> Private pay or Social Welfare subsidy for eligible low-income seniors
            </div>
          </div>

          <h3>Caregiver Support</h3>
          <div className="card" style={{ background: 'var(--bg-elevated)' }}>
            <h4 className="card-title">Family Caregiver Resources</h4>
            <p style={{ marginBottom: '12px' }}>Support for family members caring for aging relatives:</p>
            <ul style={{ marginBottom: '16px' }}>
              <li><strong>Respite Care:</strong> Temporary relief for caregivers (in-home or day program, up to 30 days per year, subsidized)</li>
              <li><strong>Caregiver Training:</strong> Free workshops on elder care, dementia care, transfer techniques, stress management</li>
              <li><strong>Support Groups:</strong> Monthly meetings connecting caregivers facing similar challenges</li>
              <li><strong>Counseling Services:</strong> Individual counseling for caregiver stress and burnout</li>
              <li><strong>Financial Assistance:</strong> Small stipends (up to $200/month) for low-income family caregivers</li>
            </ul>
          </div>

          <h3>Elder Abuse Prevention</h3>
          <div className="card" style={{ marginTop: '20px', background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
            <h4 className="card-title">Report Elder Abuse</h4>
            <p style={{ marginBottom: '12px' }}>Elder abuse, neglect, or financial exploitation is a crime. Report suspected abuse immediately:</p>
            <div style={{ padding: '16px', background: 'white', borderRadius: '8px', fontSize: '14px' }}>
              <p style={{ fontWeight: '600', marginBottom: '8px' }}>Elder Abuse Hotline: 1-800-ELDER-HELP (1-800-35337-4357)</p>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                Available 24/7. All reports investigated by Adult Protective Services. Confidential and anonymous reporting accepted.
              </p>
              <strong style={{ fontSize: '13px' }}>Signs of abuse:</strong>
              <ul style={{ fontSize: '13px', marginTop: '4px' }}>
                <li>Unexplained injuries, bruises, or fractures</li>
                <li>Poor hygiene, malnutrition, or dehydration</li>
                <li>Sudden changes in financial situation</li>
                <li>Withdrawal, depression, or unusual behavior</li>
              </ul>
            </div>
          </div>

          <div className="info-box" style={{ marginTop: '24px' }}>
            <h4>Elderly Services Contact</h4>
            <p>For information about home care, day programs, or senior centers, call our Elderly Services Division at 1-800-PRAYA-SENIOR (1-800-77292-736467) or email elderly@swd.gov.py. Information specialists available Monday-Friday 8:00 AM - 6:00 PM.</p>
          </div>
        </div>
      </div>
    </main>
  )
}

function SWDServices() {
  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/swd">Home</Link> / Online Services
          </div>
          <h1>Online Services</h1>
          <p className="subtitle">Digital tools for benefit applications, case management, and service access</p>
        </div>
      </div>
      <div className="container">
        <div className="content-text">
          <h3>Available Online Services</h3>
          <p>Access Social Welfare services from the comfort of your home:</p>

          <div className="card" style={{ marginTop: '20px' }}>
            <h4 className="card-title">Online Benefit Applications</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Apply for financial assistance and social benefits through our secure online portal. Save your progress and return anytime to complete.</p>
            <div style={{ padding: '16px', background: 'var(--bg-elevated)', borderRadius: '8px', marginTop: '12px' }}>
              <p style={{ fontSize: '13px', marginBottom: '8px', color: 'var(--text-secondary)' }}><strong>Available applications:</strong></p>
              <ul style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: 0 }}>
                <li>Comprehensive Social Assistance (CSA)</li>
                <li>Child Benefit Allowance</li>
                <li>Disability Support Allowance</li>
                <li>Old Age Pension Supplement</li>
                <li>Emergency Financial Assistance</li>
                <li>Child Care Subsidy</li>
              </ul>
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Application Status Tracking</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Check the status of your benefit application in real-time. Receive notifications when your application is approved or if additional documentation is needed.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '12px' }}>
              <strong>Track by:</strong> Application reference number, national ID, or email address | <strong>Updates:</strong> Status refreshed daily
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Document Upload Portal</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Upload required documents electronically including proof of income, identification, bank statements, and medical certificates.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '12px' }}>
              <strong>Accepted formats:</strong> PDF, JPG, PNG | <strong>Max size:</strong> 10MB per file | <strong>Security:</strong> 256-bit encryption for all uploads
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Benefit Payment History</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>View complete history of benefit payments including dates, amounts, and payment methods. Download statements for record keeping.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '12px' }}>
              <strong>Available records:</strong> Current year plus past 7 years | <strong>Export options:</strong> PDF, CSV, print-friendly format
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Eligibility Calculator</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Anonymous tool to check which benefits you may qualify for based on your circumstances. No personal information required.</p>
            <div style={{ padding: '16px', background: 'var(--bg-elevated)', borderRadius: '8px', marginTop: '12px', fontSize: '13px' }}>
              <strong>How it works:</strong> Answer questions about household size, income, employment, disability, and children. Receive instant results showing potential benefits and estimated amounts. Results are confidential and not stored.
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Case Manager Messaging</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Secure messaging with your assigned social worker or case manager. Send questions, request appointments, and receive updates.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '12px' }}>
              <strong>Response time:</strong> Messages answered within 2 business days | <strong>Availability:</strong> 24/7 message sending, office hours for responses
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Appointment Scheduling</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Book appointments with social workers, benefit counselors, or program specialists online. View available time slots and receive confirmation.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '12px' }}>
              <strong>Appointment types:</strong> Initial assessment, benefit review, appeal hearing, program enrollment | <strong>Reminders:</strong> Email and SMS 48 hours before
            </div>
          </div>

          <h3>Mobile Application</h3>
          <div className="card" style={{ marginTop: '20px' }}>
            <h4 className="card-title">Social Welfare Mobile App</h4>
            <p style={{ marginBottom: '12px' }}>Manage your benefits on your smartphone or tablet:</p>
            <ul style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
              <li><strong>Quick apply:</strong> Start benefit applications from your phone</li>
              <li><strong>Document scanning:</strong> Use phone camera to upload required documents</li>
              <li><strong>Payment alerts:</strong> Push notifications when benefits are deposited</li>
              <li><strong>Case updates:</strong> Real-time status updates on your case</li>
              <li><strong>Service locator:</strong> Find nearest SWD office or service center with GPS</li>
              <li><strong>Emergency assistance:</strong> Fast-track application for urgent needs</li>
            </ul>
            <div style={{ padding: '12px', background: 'rgba(236, 72, 153, 0.1)', borderRadius: '8px', fontSize: '13px' }}>
              <strong>Download:</strong> Free on iOS App Store and Google Play Store. Search "Praya Social Welfare"
            </div>
          </div>

          <h3>Account Management</h3>
          <div className="card" style={{ background: 'var(--bg-elevated)' }}>
            <h4 className="card-title">Create Your SWD Account</h4>
            <p style={{ marginBottom: '12px' }}>Register for a free account to access all online services:</p>
            <ul style={{ marginBottom: '16px' }}>
              <li><strong>Personal dashboard:</strong> See all your applications, benefits, and appointments</li>
              <li><strong>Saved applications:</strong> Complete applications at your own pace</li>
              <li><strong>Document library:</strong> Store copies of uploaded documents securely</li>
              <li><strong>Family accounts:</strong> Add dependents and manage family benefits</li>
              <li><strong>Notification preferences:</strong> Choose how to receive updates (email, SMS, mail)</li>
              <li><strong>Authorized representatives:</strong> Grant access to advocates or family members</li>
            </ul>
            <div style={{ padding: '12px', background: 'rgba(236, 72, 153, 0.1)', borderRadius: '8px', fontSize: '13px' }}>
              <strong>Registration:</strong> Sign up at www.swd.gov.py/myaccount using national ID or residency permit. Email verification required. Two-factor authentication available for enhanced security.
            </div>
          </div>

          <h3>Report Changes</h3>
          <div className="card" style={{ marginTop: '20px' }}>
            <h4 className="card-title">Change Reporting Portal</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Report changes in circumstances that may affect your benefits online. Required within 10 days of change.</p>
            <div style={{ padding: '12px', background: 'var(--bg-elevated)', borderRadius: '8px', marginTop: '12px', fontSize: '13px' }}>
              <strong>Report these changes online:</strong>
              <ul style={{ marginTop: '8px', marginBottom: 0 }}>
                <li>Change of address or phone number</li>
                <li>Change in income or employment status</li>
                <li>Change in household composition (birth, marriage, divorce, death)</li>
                <li>Change in disability status or medical condition</li>
                <li>Change in child care arrangements or costs</li>
                <li>Bank account changes for direct deposit</li>
              </ul>
            </div>
          </div>

          <h3>Virtual Services</h3>
          <div className="card" style={{ marginTop: '20px' }}>
            <h4 className="card-title">Video Appointments</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Meet with social workers via secure video call. No need to travel to office for routine appointments.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Requirements:</strong> Device with camera and microphone, internet connection | <strong>Platform:</strong> Browser-based, no software download needed
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Live Chat Support</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Chat with benefit specialists in real-time for quick questions and application assistance.</p>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Hours:</strong> Monday-Friday 8:00 AM - 6:00 PM, Saturday 9:00 AM - 1:00 PM | <strong>Languages:</strong> English, Spanish, Prayan dialects
            </div>
          </div>

          <h3>Resource Library</h3>
          <div className="card" style={{ background: 'var(--bg-elevated)' }}>
            <h4 className="card-title">Self-Service Resources</h4>
            <p style={{ marginBottom: '12px' }}>Access information and tools 24/7:</p>
            <ul style={{ marginBottom: 0 }}>
              <li><strong>FAQ Database:</strong> Answers to common questions about benefits and programs</li>
              <li><strong>Form Library:</strong> Download printable application forms and worksheets</li>
              <li><strong>Video Tutorials:</strong> Step-by-step guides for online services</li>
              <li><strong>Benefits Handbook:</strong> Complete guide to all SWD programs and eligibility</li>
              <li><strong>Community Resources:</strong> Directory of partner agencies and support services</li>
            </ul>
          </div>

          <h3>Accessibility Features</h3>
          <div className="card" style={{ marginTop: '20px' }}>
            <h4 className="card-title">Accessible Online Services</h4>
            <p style={{ marginBottom: '12px' }}>Our website and services are designed for all users:</p>
            <ul style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              <li>Screen reader compatible (WCAG 2.1 Level AA)</li>
              <li>Keyboard navigation support</li>
              <li>Adjustable text size and high contrast mode</li>
              <li>Multilingual support (12 languages)</li>
              <li>Plain language option for forms and content</li>
              <li>Audio versions of written materials</li>
            </ul>
          </div>

          <h3>System Requirements</h3>
          <ul>
            <li><strong>Browsers:</strong> Chrome 90+, Firefox 88+, Safari 14+, Edge 90+ (Internet Explorer not supported)</li>
            <li><strong>Connection:</strong> Minimum 1 Mbps internet speed recommended</li>
            <li><strong>Devices:</strong> Desktop, laptop, tablet, or smartphone</li>
            <li><strong>Operating Systems:</strong> Windows 10+, macOS 11+, iOS 14+, Android 10+</li>
          </ul>

          <div className="info-box" style={{ marginTop: '24px' }}>
            <h4>Need Help with Online Services?</h4>
            <p>Technical support available at 1-800-PRAYA-HELP or techsupport@swd.gov.py. For assistance with applications or eligibility questions, contact your local service center or call our helpline Monday-Friday 7:00 AM - 7:00 PM. Language interpretation available.</p>
          </div>
        </div>
      </div>
    </main>
  )
}
