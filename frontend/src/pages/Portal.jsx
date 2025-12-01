import { Link } from 'react-router-dom'
import './Portal.css'

const departments = [
  {
    id: 'ctb',
    name: 'Cannabis Tax Bureau',
    abbrev: 'CTB',
    description: 'Licensing, taxation, and regulation of cannabis industry in the Republic of Praya.',
    color: '#2d8659',
    services: ['Business Licensing', 'Tax Filing', 'Compliance', 'Research']
  },
  {
    id: 'doj',
    name: 'Department of Justice',
    abbrev: 'DOJ',
    description: 'Court system, prosecution services, and legal resources for citizens of Praya.',
    color: '#7c3aed',
    services: ['Court Services', 'Case Lookup', 'Legal Aid', 'Criminal Code']
  },
  {
    id: 'interior',
    name: 'Interior Department',
    abbrev: 'ID',
    description: 'Land registry, building permits, civil records, and parks management.',
    color: '#7c3aed',
    services: ['Land Registry', 'Building Permits', 'Civil Records', 'Parks & Reserves']
  }
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
            <p>Access government services, information, and resources from one central location. Serving the citizens of the Republic of Praya.</p>
            <div className="hero-actions">
              <Link to="/interior" className="btn btn-primary">Find Services</Link>
              <a href="#departments" className="btn btn-secondary">View Departments</a>
            </div>
          </div>
        </div>
      </section>

      <section className="portal-stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Citizens Served</span>
              <span className="stat-value">2.4M</span>
              <span className="stat-change">Population</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Online Services</span>
              <span className="stat-value">127</span>
              <span className="stat-change">Available</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Departments</span>
              <span className="stat-value">12</span>
              <span className="stat-change">Active</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Response Time</span>
              <span className="stat-value">2.5</span>
              <span className="stat-change">Avg Days</span>
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
              <Link to={`/${dept.id}`} key={dept.id} className="dept-card" style={{'--dept-color': dept.color}}>
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
              </Link>
            ))}
          </div>
        </div>
      </main>

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
                <li><Link to="/ctb">Cannabis Tax Bureau</Link></li>
                <li><Link to="/doj">Department of Justice</Link></li>
                <li><Link to="/interior">Interior Department</Link></li>
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
