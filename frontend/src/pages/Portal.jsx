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
  return (
    <>
      <header className="portal-header">
        <div className="container">
          <div className="portal-logo">
            <div className="logo-emblem">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"/>
              </svg>
            </div>
            <div className="logo-text">
              <h1>Republic of Praya</h1>
              <span className="tagline">Official Government Portal</span>
            </div>
          </div>
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
            <h2>Welcome to the <span>Government Portal</span></h2>
            <p>Access government services, information, and resources from one central location. Every ministry, bureau, and agency of the Republic of Praya is represented here with direct access to their official pages.</p>
            <div className="hero-actions">
              <a href="/ID_Praya.html" className="btn btn-primary">Find Services</a>
              <a href="#departments" className="btn btn-secondary">View Departments</a>
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

      <main className="portal-main" id="departments">
        <div className="container">
          <h2 className="section-title">Government Departments</h2>
          <p className="section-subtitle">Select a department to access services and information</p>

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
              <p className="eyebrow">Nationwide priorities</p>
              <h3>Canon programs every citizen relies on</h3>
              <p className="section-subtitle">Explore the fully built department sites for detailed policies, forms, and up-to-date announcements.</p>
            </div>
            <a href="/DOJ_Praya.html" className="btn btn-accent">View justice updates</a>
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
              <p>The official digital gateway to government services. Building a transparent, efficient, and accessible government for all citizens.</p>
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
            <span>&copy; 2024 Republic of Praya. All rights reserved.</span>
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
