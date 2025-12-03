import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Department.css'

const securityLevels = [
  {
    level: 1,
    name: 'CRITICAL',
    color: '#991b1b',
    bgColor: '#fef2f2',
    description: 'Imminent threat of attack or active emergency situation requiring immediate protective action.',
    publicAction: 'Follow all official emergency broadcasts. Shelter in place unless directed otherwise. Avoid all non-essential travel.',
    governmentAction: 'Full emergency response activation. All government facilities on lockdown. Essential services only.'
  },
  {
    level: 2,
    name: 'ELEVATED',
    color: '#ea580c',
    bgColor: '#fff7ed',
    description: 'Credible intelligence indicates heightened threat. Enhanced security measures in effect.',
    publicAction: 'Maintain heightened awareness. Report suspicious activity. Avoid large public gatherings if possible.',
    governmentAction: 'Increased security at critical infrastructure. Enhanced border monitoring. Interagency coordination activated.'
  },
  {
    level: 3,
    name: 'ENHANCED',
    color: '#f59e0b',
    bgColor: '#fffbeb',
    description: 'General threat environment requires additional vigilance. Precautionary measures recommended.',
    publicAction: 'Stay informed through official channels. Be aware of surroundings. Keep emergency supplies accessible.',
    governmentAction: 'Increased patrol presence. Enhanced monitoring of public events. Regular security briefings.'
  },
  {
    level: 4,
    name: 'GUARDED',
    color: '#0ea5e9',
    bgColor: '#f0f9ff',
    description: 'Standard security posture with minor concerns. Normal operations with routine vigilance.',
    publicAction: 'Maintain normal routines. Stay informed of local news and weather alerts.',
    governmentAction: 'Standard security protocols. Routine monitoring and patrols. Normal government operations.'
  },
  {
    level: 5,
    name: 'LOW',
    color: '#10b981',
    bgColor: '#ecfdf5',
    description: 'No known credible threats. Standard peacetime security measures in place.',
    publicAction: 'No special precautions necessary. Enjoy normal daily activities.',
    governmentAction: 'Baseline security operations. Focus on training and preparedness. Community engagement programs.'
  }
]

const civilDefenseInfo = [
  {
    title: 'Emergency Preparedness Kit',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
      </svg>
    ),
    items: [
      'Water: 1 gallon per person per day for 3 days',
      'Non-perishable food for 3 days',
      'Battery-powered radio and flashlight',
      'First aid kit and essential medications',
      'Important documents in waterproof container',
      'Cash in small denominations',
      'Phone charger and backup battery'
    ]
  },
  {
    title: 'Emergency Contacts',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
      </svg>
    ),
    items: [
      'Emergency Services: 911',
      'National Police Agency: 1-800-NPA-HELP',
      'Fire & Rescue: 1-800-FIRE-PY',
      'Civil Defense Hotline: 1-800-DEFEND',
      'Poison Control: 1-800-222-1222',
      'Mental Health Crisis: 988'
    ]
  },
  {
    title: 'Shelter Locations',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </svg>
    ),
    items: [
      'Public shelters open during Level 1-2 alerts',
      'Check local community center for nearest location',
      'Schools designated as secondary shelters',
      'Bring personal emergency kit if possible',
      'Pets allowed in designated pet-friendly shelters',
      'Special needs shelters available for medical equipment'
    ]
  },
  {
    title: 'Communication Plan',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    ),
    items: [
      'Designate an out-of-area contact person',
      'Ensure all family members know contact info',
      'Establish a family meeting point',
      'Text messages often work when calls don\'t',
      'Monitor official government social media',
      'Register for emergency alerts at gov.praya/alerts'
    ]
  }
]

const alertTypes = [
  {
    name: 'Natural Disaster',
    description: 'Earthquakes, typhoons, floods, volcanic activity, or severe weather events.',
    icon: '🌊'
  },
  {
    name: 'Security Threat',
    description: 'Credible threats to public safety, terrorism concerns, or civil unrest.',
    icon: '🛡️'
  },
  {
    name: 'Public Health',
    description: 'Disease outbreaks, hazardous material incidents, or contamination events.',
    icon: '⚕️'
  },
  {
    name: 'Infrastructure',
    description: 'Major utility failures, transportation emergencies, or communication outages.',
    icon: '⚡'
  }
]

export default function NationalSecurity() {
  useEffect(() => {
    document.body.classList.add('theme-npa')
    return () => document.body.classList.remove('theme-npa')
  }, [])

  return (
    <>
      <header className="dept-header">
        <div className="container">
          <Link to="/national-security" className="dept-logo">
            <div className="logo-mark" style={{ background: 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <div className="logo-text">
              <h1>National Security Level</h1>
              <span className="tagline">Civil Defense • Republic of Praya</span>
            </div>
          </Link>
          <nav className="nav">
            <Link to="/" className="nav-link">Gov Portal</Link>
            <Link to="/npa" className="nav-link">Police Agency</Link>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="hero-bg">
          <div className="hero-bg-shape"></div>
          <div className="hero-bg-shape"></div>
          <div className="hero-bg-shape"></div>
        </div>
        <div className="hero-pattern"></div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge" style={{ background: 'rgba(14, 165, 233, 0.1)', color: '#0ea5e9' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              Civil Defense & Emergency Preparedness
            </div>
            <h2>National <span style={{ color: '#0ea5e9' }}>Security</span> Information</h2>
            <p>The National Security Level system provides citizens with clear guidance on current threat conditions and recommended protective actions. Stay informed, stay prepared, and help keep Praya safe.</p>
          </div>
        </div>
      </section>

      <section className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Current Level</span>
              <span className="stat-value" style={{ color: '#0ea5e9' }}>2</span>
              <span className="stat-change">Elevated</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Status</span>
              <span className="stat-value">ACTIVE</span>
              <span className="stat-change">Routine Vigilance</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Days at Current Level</span>
              <span className="stat-value">14</span>
              <span className="stat-change">Since Nov 19</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Public Shelters</span>
              <span className="stat-value">342</span>
              <span className="stat-change">Nationwide</span>
            </div>
          </div>
        </div>
      </section>

      <section className="services-section">
        <div className="container">
          <div className="section-header">
            <h2>Security Level Scale</h2>
            <p>Level 1 indicates the highest threat; Level 5 indicates minimal threat</p>
          </div>

          <div className="security-scale-container">
            {securityLevels.map((level) => (
              <div
                key={level.level}
                className={`security-level-card ${level.level === 2 ? 'current-level' : ''}`}
                style={{
                  borderLeft: `4px solid ${level.color}`,
                  background: level.bgColor
                }}
              >
                <div className="security-level-header">
                  <div className="security-level-number" style={{ background: level.color }}>
                    {level.level}
                  </div>
                  <div className="security-level-info">
                    <div className="security-level-name" style={{ color: level.color }}>
                      {level.name}
                      {level.level === 2 && <span className="current-badge">CURRENT</span>}
                    </div>
                    <p className="security-description">{level.description}</p>
                  </div>
                </div>
                <div className="security-actions">
                  <div className="action-block">
                    <strong>Public Action:</strong>
                    <p>{level.publicAction}</p>
                  </div>
                  <div className="action-block">
                    <strong>Government Response:</strong>
                    <p>{level.governmentAction}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="info-section" style={{ background: 'var(--section-alt-bg, #f9fafb)' }}>
        <div className="container">
          <div className="section-header">
            <h2>Civil Defense Information</h2>
            <p>Essential resources and guidelines for emergency preparedness</p>
          </div>

          <div className="civil-defense-grid">
            {civilDefenseInfo.map((section, index) => (
              <div key={index} className="civil-defense-card">
                <div className="cd-card-header">
                  <div className="cd-icon">{section.icon}</div>
                  <h3>{section.title}</h3>
                </div>
                <ul className="cd-list">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="alert-types-section">
        <div className="container">
          <div className="section-header">
            <h2>Types of Emergency Alerts</h2>
            <p>Understanding different categories of threats and emergencies</p>
          </div>

          <div className="alert-types-grid">
            {alertTypes.map((alert, index) => (
              <div key={index} className="alert-type-card">
                <div className="alert-emoji">{alert.icon}</div>
                <h3>{alert.name}</h3>
                <p>{alert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="resources-section">
        <div className="container">
          <div className="section-header">
            <h2>Stay Informed</h2>
            <p>Official channels for emergency information</p>
          </div>

          <div className="resources-grid">
            <div className="resource-card">
              <h3>Emergency Alert System</h3>
              <p>All citizens are automatically enrolled in the National Emergency Alert System. Ensure your mobile device settings allow emergency broadcasts.</p>
              <a href="#" className="resource-link">Check Alert Settings →</a>
            </div>
            <div className="resource-card">
              <h3>Official Social Media</h3>
              <p>Follow @PrayaCivilDefense and @NPAPraya on social media for real-time updates during emergencies.</p>
              <a href="#" className="resource-link">Follow Official Accounts →</a>
            </div>
            <div className="resource-card">
              <h3>Emergency Radio</h3>
              <p>Tune to 97.5 FM or 1240 AM for emergency broadcasts. These frequencies are reserved for official government communications.</p>
              <a href="#" className="resource-link">Radio Network Info →</a>
            </div>
          </div>
        </div>
      </section>

      <footer className="dept-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <h4>National Security & Civil Defense</h4>
              <p>Coordinated by the National Security Council in partnership with the National Police Agency, Fire Services, and Emergency Management Authority of the Republic of Praya.</p>
            </div>
            <div className="footer-section">
              <h5>Emergency</h5>
              <ul>
                <li><a href="tel:911">Emergency: 911</a></li>
                <li><a href="tel:1-800-DEFEND">Civil Defense: 1-800-DEFEND</a></li>
                <li><Link to="/npa">National Police Agency</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5>Resources</h5>
              <ul>
                <li><a href="#">Emergency Plan Template</a></li>
                <li><a href="#">Shelter Locations Map</a></li>
                <li><a href="#">Preparedness Guides</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5>Government</h5>
              <ul>
                <li><Link to="/">Gov Portal</Link></li>
                <li><a href="#">National Security Council</a></li>
                <li><a href="#">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>&copy; 2024 Republic of Praya. National Security Council.</span>
            <div className="footer-legal">
              <a href="#">Terms</a>
              <a href="#">Privacy</a>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        .security-scale-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 2rem;
        }

        .security-level-card {
          padding: 1.5rem;
          border-radius: 8px;
          transition: transform 0.2s ease;
        }

        .security-level-card.current-level {
          box-shadow: 0 0 0 2px #0ea5e9, 0 4px 12px rgba(14, 165, 233, 0.2);
        }

        .security-level-card:hover {
          transform: translateX(4px);
        }

        .security-level-header {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .security-level-number {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.5rem;
          font-weight: 700;
          flex-shrink: 0;
        }

        .security-level-info {
          flex: 1;
        }

        .security-level-name {
          font-size: 1.1rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.25rem;
        }

        .current-badge {
          background: #0ea5e9;
          color: white;
          font-size: 0.7rem;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          font-weight: 600;
        }

        .security-description {
          color: var(--text-secondary, #4b5563);
          line-height: 1.5;
          margin: 0;
        }

        .security-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(0, 0, 0, 0.1);
        }

        @media (max-width: 768px) {
          .security-actions {
            grid-template-columns: 1fr;
          }
        }

        .action-block {
          font-size: 0.9rem;
        }

        .action-block strong {
          color: var(--text-primary, #111827);
          display: block;
          margin-bottom: 0.25rem;
        }

        .action-block p {
          color: var(--text-secondary, #4b5563);
          margin: 0;
          line-height: 1.5;
        }

        .civil-defense-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-top: 2rem;
        }

        .civil-defense-card {
          background: var(--card-bg, #fff);
          border: 1px solid var(--border-color, #e5e7eb);
          border-radius: 12px;
          padding: 1.5rem;
        }

        .cd-card-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .cd-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cd-icon svg {
          width: 20px;
          height: 20px;
          color: white;
        }

        .cd-card-header h3 {
          font-size: 1.1rem;
          color: var(--text-primary, #111827);
          margin: 0;
        }

        .cd-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .cd-list li {
          padding: 0.5rem 0;
          padding-left: 1.25rem;
          position: relative;
          color: var(--text-secondary, #4b5563);
          font-size: 0.9rem;
          border-bottom: 1px solid var(--border-color, #f3f4f6);
        }

        .cd-list li:last-child {
          border-bottom: none;
        }

        .cd-list li::before {
          content: '•';
          position: absolute;
          left: 0;
          color: #1d4ed8;
          font-weight: bold;
        }

        .alert-types-section {
          padding: 4rem 0;
        }

        .alert-types-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.5rem;
          margin-top: 2rem;
        }

        .alert-type-card {
          background: var(--card-bg, #fff);
          border: 1px solid var(--border-color, #e5e7eb);
          border-radius: 12px;
          padding: 1.5rem;
          text-align: center;
          transition: box-shadow 0.2s ease;
        }

        .alert-type-card:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .alert-emoji {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .alert-type-card h3 {
          font-size: 1rem;
          color: var(--text-primary, #111827);
          margin-bottom: 0.5rem;
        }

        .alert-type-card p {
          color: var(--text-secondary, #6b7280);
          font-size: 0.85rem;
          line-height: 1.5;
          margin: 0;
        }

        .resources-section {
          padding: 4rem 0;
          background: var(--section-alt-bg, #f9fafb);
        }

        .resources-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-top: 2rem;
        }

        .resource-card {
          background: var(--card-bg, #fff);
          border: 1px solid var(--border-color, #e5e7eb);
          border-radius: 12px;
          padding: 1.5rem;
        }

        .resource-card h3 {
          font-size: 1.1rem;
          color: var(--text-primary, #111827);
          margin-bottom: 0.75rem;
        }

        .resource-card p {
          color: var(--text-secondary, #4b5563);
          font-size: 0.9rem;
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .resource-link {
          color: #1d4ed8;
          font-weight: 500;
          font-size: 0.9rem;
          text-decoration: none;
        }

        .resource-link:hover {
          text-decoration: underline;
        }

        .info-section {
          padding: 4rem 0;
        }

        .section-header {
          text-align: center;
          margin-bottom: 1rem;
        }

        .section-header h2 {
          font-size: 1.75rem;
          color: var(--text-primary, #111827);
          margin-bottom: 0.5rem;
        }

        .section-header p {
          color: var(--text-secondary, #6b7280);
        }
      `}</style>
    </>
  )
}
