import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../utils/AuthContext'
import './Portal.css'

const departments = [
  {
    id: 'npa',
    name: 'National Police Agency',
    abbrev: 'NPA',
    url: '/NPA_Praya.html',
    description: 'National policing, emergency response, and community safety services across Praya.',
    color: '#1d4ed8',
    services: ['Emergency Response', 'Public Safety', 'Licensing', 'Community Programs']
  },
  {
    id: 'bop',
    name: 'Bank of Praya',
    abbrev: 'BOP',
    url: '/BOP_Praya.html',
    description: 'Central bank responsible for monetary policy, financial stability, and banking supervision.',
    color: '#0ea5e9',
    services: ['Monetary Policy', 'Banking Supervision', 'Currency Services', 'Economic Research']
  },
  {
    id: 'ctb',
    name: 'Cannabis Tax Bureau',
    abbrev: 'CTB',
    url: '/CTB_Praya.html',
    description: 'Licensing, taxation, and regulation of cannabis industry in the Republic of Praya.',
    color: '#2d8659',
    services: ['Business Licensing', 'Tax Filing', 'Compliance', 'Research']
  },
  {
    id: 'doj',
    name: 'Department of Justice',
    abbrev: 'DOJ',
    url: '/DOJ_Praya.html',
    description: 'Court system, prosecution services, and legal resources for citizens of Praya.',
    color: '#7c3aed',
    services: ['Court Services', 'Case Lookup', 'Legal Aid', 'Criminal Code']
  },
  {
    id: 'interior',
    name: 'Interior Department',
    abbrev: 'ID',
    url: '/ID_Praya.html',
    description: 'Land registry, building permits, civil records, and parks management.',
    color: '#7c3aed',
    services: ['Land Registry', 'Building Permits', 'Civil Records', 'Parks & Reserves']
  },
  {
    id: 'revenue',
    name: 'Revenue Department',
    abbrev: 'RD',
    url: '/RD_Praya.html',
    description: 'Tax collection, benefits, and financial services for individuals and businesses.',
    color: '#0ea5e9',
    services: ['Tax Filing', 'Business Accounts', 'Benefits', 'Compliance']
  },
  {
    id: 'post',
    name: 'Praya Post',
    abbrev: 'PP',
    url: '/Praya_Post.html',
    description: 'National postal service providing domestic and international mail and package delivery.',
    color: '#f97316',
    services: ['Package Delivery', 'International Mail', 'Express Shipping', 'P.O. Boxes']
  },
  {
    id: 'health',
    name: 'Health Department',
    abbrev: 'HD',
    url: '/Health_Praya.html',
    description: 'Public health services, disease control, healthcare licensing, and health statistics.',
    color: '#dc2626',
    services: ['Public Health', 'Disease Control', 'Healthcare Licensing', 'Health Statistics']
  },
  {
    id: 'housing',
    name: 'Housing Authority',
    abbrev: 'HA',
    url: '/Housing_Authority_Praya.html',
    description: 'Affordable public housing programs and subsidized rental assistance for eligible citizens.',
    color: '#ea580c',
    services: ['Housing Applications', 'Eligibility Check', 'Regional Availability', 'Tenant Resources']
  },
  {
    id: 'cbca',
    name: 'Customs & Border Control',
    abbrev: 'CBCA',
    url: '/CBCA_Praya.html',
    description: 'Border security, customs duties, immigration services, and trade facilitation for the Republic.',
    color: '#0891b2',
    services: ['Customs Declarations', 'Immigration & Visas', 'Border Enforcement', 'Traveler Information']
  },
  {
    id: 'legislative',
    name: 'Legislative Council',
    abbrev: 'LC',
    url: '/LC_Praya.html',
    description: 'The unicameral legislature of Praya, responsible for enacting laws and providing oversight.',
    color: '#7c3aed',
    services: ['View Legislation', 'Council Members', 'Session Calendar', 'Public Comment']
  }
]

const priorities = [
  {
    title: 'Safety & Justice',
    detail: 'Fast access to courts, case lookup, and policing resources for every district.',
    link: '/DOJ_Praya.html'
  },
  {
    title: 'Land, Housing & Parks',
    detail: 'Land registry searches, building permits, and protected areas managed by Interior.',
    link: '/ID_Praya.html'
  },
  {
    title: 'Business & Tax',
    detail: 'Licensing, tax filings, and compliance guidance for entrepreneurs and companies.',
    link: '/RD_Praya.html'
  },
  {
    title: 'Public Health',
    detail: 'Disease surveillance, healthcare licensing, and health statistics for all citizens.',
    link: '/Health_Praya.html'
  },
  {
    title: 'Financial Stability',
    detail: 'Central banking, monetary policy, and economic research from the Bank of Praya.',
    link: '/BOP_Praya.html'
  },
  {
    title: 'Cannabis Regulation',
    detail: 'Industry licensing, tax filing, and compliance for legal cannabis businesses.',
    link: '/CTB_Praya.html'
  },
  {
    title: 'Customs & Border',
    detail: 'Import duties, immigration visas, and border control for travelers and traders.',
    link: '/CBCA_Praya.html'
  },
  {
    title: 'Postal Services',
    detail: 'Domestic and international mail delivery, package shipping, and P.O. box services nationwide.',
    link: '/Praya_Post.html'
  },
  {
    title: 'Legislative Oversight',
    detail: 'View bills, contact council members, and participate in the democratic process.',
    link: '/LC_Praya.html'
  }
]

const quickLinks = [
  { label: 'Report an incident', href: '/NPA_Praya.html#report' },
  { label: 'File cannabis taxes', href: '/CTB_Praya.html#taxes' },
  { label: 'Book a court date', href: '/DOJ_Praya.html#courts' },
  { label: 'Check land records', href: '/ID_Praya.html#land' },
  { label: 'Submit business returns', href: '/RD_Praya.html#business' },
  { label: 'View government notices', href: '/DOJ_Praya.html#news' }
]

export default function Portal() {
  const [servicesOpen, setServicesOpen] = React.useState(false);
  const { user, isAuthenticated, loading } = useAuth();

  return (
    <>
      <header className="portal-header">
        <div className="container">
          <div className="portal-logo">
            <div className="logo-emblem">
              <svg viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="9" height="18" fill="#4b5563" rx="2" ry="2"/>
                <rect x="12" y="3" width="9" height="18" fill="#f97316" rx="2" ry="2"/>
              </svg>
            </div>
            <div className="logo-text">
              <h1>Republic of Praya</h1>
              <span className="tagline">Official Government Portal</span>
            </div>
          </div>
          <nav className="portal-nav">
            <div
              className="nav-dropdown"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className="nav-link">
                Services
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>
              {servicesOpen && (
                <div className="dropdown-menu">
                  <div className="dropdown-grid">
                    {departments.map(dept => (
                      <a key={dept.id} href={dept.url} className="dropdown-item">
                        <div className="dropdown-item-icon" style={{background: `color-mix(in srgb, ${dept.color} 15%, transparent)`, color: dept.color}}>
                          {dept.abbrev}
                        </div>
                        <div>
                          <div className="dropdown-item-title">{dept.name}</div>
                          <div className="dropdown-item-desc">{dept.description.substring(0, 60)}...</div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {!loading && (
              isAuthenticated ? (
                <Link to="/account" className="nav-account-btn">
                  <div className="nav-avatar">
                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                  </div>
                  <span>{user?.firstName}</span>
                </Link>
              ) : (
                <Link to="/login" className="nav-login-btn">
                  <svg width="18" height="18" viewBox="0 0 40 40" fill="none">
                    <rect width="40" height="40" rx="8" fill="url(#nav-logo-gradient)" />
                    <path d="M12 20c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M20 16v8M16 20h8" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                    <defs>
                      <linearGradient id="nav-logo-gradient" x1="0" y1="0" x2="40" y2="40">
                        <stop stopColor="#f97316" />
                        <stop offset="1" stopColor="#ea580c" />
                      </linearGradient>
                    </defs>
                  </svg>
                  Login with PrayaPass
                </Link>
              )
            )}
          </nav>
        </div>
      </header>

      <section className="portal-hero">
        <div className="hero-bg">
          <div className="hero-bg-shape"></div>
          <div className="hero-bg-shape"></div>
          <div className="hero-bg-shape"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <h2>Welcome to <span style={{color: '#f97316'}}>GOV.PRAYA</span></h2>
            <p>Your central gateway to government services, information, and resources. Access everything from banking and postal services to justice, policing, and tax administration—all from one unified platform serving 2.4 million citizens nationwide.</p>
            <div className="hero-features">
              <div className="hero-feature">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>127 online services available 24/7</span>
              </div>
              <div className="hero-feature">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <span>Secure, encrypted government services</span>
              </div>
              <div className="hero-feature">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
                <span>11 major departments & agencies</span>
              </div>
            </div>
            <div className="hero-actions">
              <a href="#departments" className="btn btn-primary">Browse Departments</a>
              <a href="#services" className="btn btn-secondary">Featured Services</a>
            </div>
          </div>
        </div>
      </section>

      <section className="portal-stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Air Quality Index</span>
              <span className="stat-value" style={{color: '#10b981'}}>42</span>
              <span className="stat-change">Good • Updated 1hr ago</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">National Security Level</span>
              <span className="stat-value" style={{color: '#0ea5e9'}}>2</span>
              <span className="stat-change">Elevated • Routine vigilance</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Citizens Served</span>
              <span className="stat-value">2.4M</span>
              <span className="stat-change">Population</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Online Services</span>
              <span className="stat-value">127</span>
              <span className="stat-change">Available 24/7</span>
            </div>
          </div>
        </div>
      </section>

      <section className="featured-services" id="services">
        <div className="container">
          <div className="featured-header">
            <div>
              <p className="eyebrow">Featured Services</p>
              <h2 className="section-title">Essential Government Services</h2>
              <p className="section-subtitle">Quick access to our most-used departments and services</p>
            </div>
          </div>
          <div className="featured-grid">
            <a href="/BOP_Praya.html" className="featured-card featured-large">
              <div className="featured-badge">Central Banking</div>
              <div className="featured-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                  <path d="M2 10h20"></path>
                </svg>
              </div>
              <h3>Bank of Praya</h3>
              <p>Monetary policy, banking supervision, and economic research. View interest rates, inflation data, and financial stability reports.</p>
              <div className="featured-stats">
                <div className="featured-stat">
                  <span className="featured-stat-value">3.75%</span>
                  <span className="featured-stat-label">Base Rate</span>
                </div>
                <div className="featured-stat">
                  <span className="featured-stat-value">2.1%</span>
                  <span className="featured-stat-label">Inflation</span>
                </div>
                <div className="featured-stat">
                  <span className="featured-stat-value">¤82.4B</span>
                  <span className="featured-stat-label">Reserves</span>
                </div>
              </div>
              <span className="featured-link">
                Visit Bank of Praya
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </a>
            <a href="/Praya_Post.html" className="featured-card">
              <div className="featured-badge">Postal Services</div>
              <div className="featured-icon featured-icon-sm">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                </svg>
              </div>
              <h3>Praya Post</h3>
              <p>Ship packages nationwide and internationally. Request shipping labels, track deliveries, and find post offices.</p>
              <div className="featured-stat-row">
                <div><strong>4.2M</strong> packages delivered</div>
                <div><strong>124</strong> post offices</div>
              </div>
              <span className="featured-link">
                Request Shipping Label
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </a>
            <a href="/Housing_Authority_Praya.html" className="featured-card">
              <div className="featured-badge">Public Housing</div>
              <div className="featured-icon featured-icon-sm">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              </div>
              <h3>Housing Authority</h3>
              <p>Apply for affordable public housing. Heavily subsidized rental units for eligible Prayan citizens across all regions.</p>
              <div className="featured-stat-row">
                <div><strong>24,847</strong> active units</div>
                <div><strong>¤385</strong> avg. rent</div>
              </div>
              <span className="featured-link">
                Apply for Housing
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </a>
            <a href="/NPA_Praya.html" className="featured-card">
              <div className="featured-badge">Public Safety</div>
              <div className="featured-icon featured-icon-sm">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2l7 4v6c0 5-4 9-7 10-3-1-7-5-7-10V6z"></path>
                </svg>
              </div>
              <h3>National Police</h3>
              <p>Emergency response, public safety services, background checks, and community programs across all districts.</p>
              <div className="featured-stat-row">
                <div><strong>7m 42s</strong> avg response</div>
                <div><strong>18,240</strong> officers</div>
              </div>
              <span className="featured-link">
                Police Services
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </a>
            <a href="/Health_Praya.html" className="featured-card">
              <div className="featured-badge">Public Health</div>
              <div className="featured-icon featured-icon-sm">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>
              <h3>Health Department</h3>
              <p>Public health services, disease control, healthcare licensing, and vital statistics for all citizens.</p>
              <div className="featured-stat-row">
                <div><strong>127</strong> hospitals</div>
                <div><strong>24/7</strong> emergency</div>
              </div>
              <span className="featured-link">
                Health Services
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </a>
            <a href="/DOJ_Praya.html" className="featured-card">
              <div className="featured-badge">Justice System</div>
              <div className="featured-icon featured-icon-sm">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 6v6l4 2"></path>
                </svg>
              </div>
              <h3>Department of Justice</h3>
              <p>Court services, case lookup, legal aid, and access to the criminal code and legal resources.</p>
              <div className="featured-stat-row">
                <div><strong>42</strong> court locations</div>
                <div><strong>98.4%</strong> resolved</div>
              </div>
              <span className="featured-link">
                Court Services
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </a>
          </div>
        </div>
      </section>

      <section className="digital-services">
        <div className="container">
          <div className="digital-header">
            <div>
              <p className="eyebrow">Digital Government</p>
              <h2 className="section-title">Modern Services for Modern Citizens</h2>
              <p className="section-subtitle">Access government services anytime, anywhere with our secure digital platform</p>
            </div>
          </div>
          <div className="digital-grid">
            <div className="digital-card">
              <div className="digital-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </div>
              <h3>Online Portal Access</h3>
              <p>Manage all your government interactions through one unified account. Apply for permits, pay taxes, and access services 24/7.</p>
              <div className="digital-stat">
                <span className="digital-stat-number">98.7%</span>
                <span className="digital-stat-label">Uptime reliability</span>
              </div>
            </div>
            <div className="digital-card">
              <div className="digital-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="5" y="2" width="14" height="20" rx="2"></rect>
                  <line x1="12" y1="18" x2="12.01" y2="18"></line>
                </svg>
              </div>
              <h3>Mobile Government</h3>
              <p>Access critical services on the go with our mobile-optimized platform. Report issues, check applications, and receive real-time updates.</p>
              <div className="digital-stat">
                <span className="digital-stat-number">847K</span>
                <span className="digital-stat-label">Monthly active users</span>
              </div>
            </div>
            <div className="digital-card">
              <div className="digital-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  <path d="M9 12l2 2 4-4"></path>
                </svg>
              </div>
              <h3>Bank-Level Security</h3>
              <p>Your data is protected with end-to-end encryption, multi-factor authentication, and regular security audits following international standards.</p>
              <div className="digital-stat">
                <span className="digital-stat-number">ISO 27001</span>
                <span className="digital-stat-label">Security certified</span>
              </div>
            </div>
            <div className="digital-card">
              <div className="digital-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
              </div>
              <h3>Instant Document Access</h3>
              <p>Download official certificates, tax records, and legal documents instantly. Digital signatures accepted for most government transactions.</p>
              <div className="digital-stat">
                <span className="digital-stat-number">2.3M</span>
                <span className="digital-stat-label">Documents issued last year</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="announcements">
        <div className="container">
          <div className="announcements-header">
            <div>
              <p className="eyebrow">Latest Updates</p>
              <h2 className="section-title">Government Announcements</h2>
              <p className="section-subtitle">Stay informed about new policies, services, and important notices</p>
            </div>
            <a href="#news" className="btn btn-accent">View All News</a>
          </div>
          <div className="announcements-grid">
            <div className="announcement-card announcement-featured">
              <div className="announcement-badge">Policy Update</div>
              <span className="announcement-date">November 28, 2024</span>
              <h3>New Housing Subsidy Program Expanded</h3>
              <p>The Housing Authority announces expansion of rental assistance programs to include middle-income families. Applications now open for eligible households earning up to ¤65,000 annually.</p>
              <a href="/Housing_Authority_Praya.html" className="announcement-link">
                Read full announcement
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
            <div className="announcement-card">
              <div className="announcement-badge">Service Launch</div>
              <span className="announcement-date">November 25, 2024</span>
              <h3>Digital ID Cards Now Available</h3>
              <p>Apply for your digital government ID through the Interior Department portal. Accepted at all government facilities and participating businesses.</p>
              <a href="/ID_Praya.html" className="announcement-link">
                Learn more
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
            <div className="announcement-card">
              <div className="announcement-badge">Tax Notice</div>
              <span className="announcement-date">November 20, 2024</span>
              <h3>2025 Tax Filing Season Opens January 15</h3>
              <p>Revenue Department reminds citizens that tax returns for 2024 are due by April 15, 2025. Early filers may receive refunds within 10 business days.</p>
              <a href="/RD_Praya.html" className="announcement-link">
                Tax information
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <main className="portal-main" id="departments">
        <div className="container">
          <h2 className="section-title">All Government Departments</h2>
          <p className="section-subtitle">Browse the complete directory of Praya government agencies and services</p>

          <div className="dept-grid">
            {departments.map(dept => (
              <a href={dept.url} key={dept.id} className="dept-card" style={{'--dept-color': dept.color}}>
                <div className="dept-icon">
                  <span>{dept.abbrev}</span>
                </div>
                <h3>{dept.name}</h3>
                <p>{dept.description}</p>
                <ul className="dept-services">
                  {dept.services.map(service => (
                    <li key={service}>{service}</li>
                  ))}
                </ul>
                <span className="dept-link">
                  Visit Department
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </span>
              </a>
            ))}
          </div>
        </div>
      </main>

      <section className="portal-priorities">
        <div className="container">
          <div className="priorities-header">
            <div>
              <p className="eyebrow">Key Service Areas</p>
              <h3>Core programs serving every citizen</h3>
              <p className="section-subtitle">Explore our department sites for detailed policies, forms, and up-to-date announcements.</p>
            </div>
            <a href="#departments" className="btn btn-accent">View all departments</a>
          </div>
          <div className="priorities-grid">
            {priorities.map(priority => (
              <a key={priority.title} href={priority.link} className="priority-card">
                <div className="priority-dot" />
                <div>
                  <h4>{priority.title}</h4>
                  <p>{priority.detail}</p>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="portal-quicklinks">
        <div className="container">
          <h3 className="section-title">Popular actions</h3>
          <p className="section-subtitle">Jump straight into the completed department pages for the most requested services.</p>
          <div className="quicklink-grid">
            {quickLinks.map(link => (
              <a key={link.label} href={link.href} className="quicklink-card">
                <span>{link.label}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="portal-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <h4>Republic of Praya</h4>
              <p>The official digital gateway to government services for the Republic of Praya's 2.4 million citizens. We're building a transparent, efficient, and accessible government through modern technology and comprehensive online services. From central banking and public housing to healthcare, justice, and postal services—access everything you need in one unified platform designed to serve you 24/7.</p>
            </div>
            <div className="footer-section">
              <h5>Quick Links</h5>
              <ul>
                <li><a href="#">About Praya</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Accessibility</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5>Departments</h5>
              <ul>
                <li><a href="/NPA_Praya.html">National Police Agency</a></li>
                <li><a href="/BOP_Praya.html">Bank of Praya</a></li>
                <li><a href="/CTB_Praya.html">Cannabis Tax Bureau</a></li>
                <li><a href="/DOJ_Praya.html">Department of Justice</a></li>
                <li><a href="/ID_Praya.html">Interior Department</a></li>
                <li><a href="/RD_Praya.html">Revenue Department</a></li>
                <li><a href="/Praya_Post.html">Praya Post</a></li>
                <li><a href="/Health_Praya.html">Health Department</a></li>
                <li><a href="/Housing_Authority_Praya.html">Housing Authority</a></li>
                <li><a href="/CBCA_Praya.html">Customs & Border Control</a></li>
                <li><a href="/LC_Praya.html">Legislative Council</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5>Help</h5>
              <ul>
                <li><a href="#">FAQs</a></li>
                <li><a href="#">Support</a></li>
                <li><a href="#">Feedback</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>&copy; 2011-2026 Republic of Praya. All rights reserved.</span>
            <div className="footer-legal">
              <a href="#">Terms of Service</a>
              <a href="#">Privacy</a>
              <a href="#">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
