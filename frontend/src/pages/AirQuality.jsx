import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Department.css'

const aqiLevels = [
  {
    range: '0-50',
    level: 'Good',
    color: '#10b981',
    bgColor: '#d1fae5',
    description: 'Air quality is satisfactory, and air pollution poses little or no risk.',
    healthAdvice: 'No precautions necessary. Ideal conditions for outdoor activities.'
  },
  {
    range: '51-100',
    level: 'Moderate',
    color: '#f59e0b',
    bgColor: '#fef3c7',
    description: 'Air quality is acceptable. However, there may be a risk for some people who are unusually sensitive to air pollution.',
    healthAdvice: 'People with respiratory or heart conditions should limit prolonged outdoor exertion.'
  },
  {
    range: '101-150',
    level: 'Unhealthy for Sensitive Groups',
    color: '#f97316',
    bgColor: '#ffedd5',
    description: 'Members of sensitive groups may experience health effects. The general public is less likely to be affected.',
    healthAdvice: 'Children, elderly, and those with respiratory conditions should limit outdoor activity.'
  },
  {
    range: '151-200',
    level: 'Unhealthy',
    color: '#ef4444',
    bgColor: '#fee2e2',
    description: 'Some members of the general public may experience health effects; sensitive groups may experience more serious health effects.',
    healthAdvice: 'Everyone should reduce prolonged outdoor exertion. Sensitive groups should avoid outdoor activity.'
  },
  {
    range: '201-300',
    level: 'Very Unhealthy',
    color: '#7c3aed',
    bgColor: '#ede9fe',
    description: 'Health alert: The risk of health effects is increased for everyone.',
    healthAdvice: 'Everyone should avoid prolonged outdoor exertion. Consider staying indoors.'
  },
  {
    range: '301-500',
    level: 'Hazardous',
    color: '#991b1b',
    bgColor: '#fecaca',
    description: 'Health warning of emergency conditions: everyone is more likely to be affected.',
    healthAdvice: 'Everyone should avoid all outdoor activity. Stay indoors with windows closed.'
  }
]

const pollutants = [
  {
    name: 'PM2.5',
    fullName: 'Fine Particulate Matter',
    description: 'Tiny particles less than 2.5 micrometers in diameter that can penetrate deep into the lungs and bloodstream.',
    sources: 'Vehicle emissions, industrial processes, wildfires, construction'
  },
  {
    name: 'PM10',
    fullName: 'Coarse Particulate Matter',
    description: 'Particles between 2.5 and 10 micrometers in diameter that can irritate the respiratory system.',
    sources: 'Dust, pollen, mold spores, road dust'
  },
  {
    name: 'O₃',
    fullName: 'Ground-Level Ozone',
    description: 'A harmful gas formed when pollutants react with sunlight. Not to be confused with protective stratospheric ozone.',
    sources: 'Vehicle exhaust, industrial emissions reacting with sunlight'
  },
  {
    name: 'NO₂',
    fullName: 'Nitrogen Dioxide',
    description: 'A reddish-brown gas with a pungent odor that can irritate airways and aggravate respiratory diseases.',
    sources: 'Vehicle engines, power plants, industrial facilities'
  },
  {
    name: 'SO₂',
    fullName: 'Sulfur Dioxide',
    description: 'A colorless gas with a sharp odor that can harm the respiratory system and contribute to acid rain.',
    sources: 'Power plants burning coal/oil, industrial processes'
  },
  {
    name: 'CO',
    fullName: 'Carbon Monoxide',
    description: 'A colorless, odorless gas that reduces oxygen delivery to the body\'s organs and tissues.',
    sources: 'Vehicle exhaust, fuel combustion, industrial processes'
  }
]

export default function AirQuality() {
  useEffect(() => {
    document.body.classList.add('theme-health')
    return () => document.body.classList.remove('theme-health')
  }, [])

  return (
    <>
      <header className="dept-header">
        <div className="container">
          <Link to="/air-quality" className="dept-logo">
            <div className="logo-mark" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 7a5 5 0 0 0-10 0"></path>
                <path d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
                <path d="M19 12c0 7-7 10-7 10S5 19 5 12"></path>
              </svg>
            </div>
            <div className="logo-text">
              <h1>Air Quality Index</h1>
              <span className="tagline">Environmental Monitoring • Republic of Praya</span>
            </div>
          </Link>
          <nav className="nav">
            <Link to="/" className="nav-link">Gov Portal</Link>
            <Link to="/health" className="nav-link">Health Dept</Link>
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
            <div className="hero-badge" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
              Environmental Health
            </div>
            <h2>Understanding <span style={{ color: '#10b981' }}>Air Quality</span></h2>
            <p>The Air Quality Index (AQI) is a standardized indicator used to communicate the current state of air pollution and its potential health effects. The Republic of Praya monitors air quality across all regions to protect public health.</p>
          </div>
        </div>
      </section>

      <section className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Current AQI</span>
              <span className="stat-value" style={{ color: '#10b981' }}>42</span>
              <span className="stat-change">Good</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Monitoring Stations</span>
              <span className="stat-value">87</span>
              <span className="stat-change">Nationwide</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Days "Good" This Year</span>
              <span className="stat-value">312</span>
              <span className="stat-change">Out of 337</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Last Updated</span>
              <span className="stat-value">1hr</span>
              <span className="stat-change">Ago</span>
            </div>
          </div>
        </div>
      </section>

      <section className="services-section">
        <div className="container">
          <div className="section-header">
            <h2>AQI Scale Reference</h2>
            <p>Understanding what the numbers mean for your health</p>
          </div>

          <div className="aqi-scale-container">
            {aqiLevels.map((level, index) => (
              <div
                key={index}
                className="aqi-level-card"
                style={{
                  borderLeft: `4px solid ${level.color}`,
                  background: level.bgColor
                }}
              >
                <div className="aqi-level-header">
                  <div className="aqi-range" style={{ color: level.color }}>
                    {level.range}
                  </div>
                  <div className="aqi-level-name" style={{ color: level.color }}>
                    {level.level}
                  </div>
                </div>
                <p className="aqi-description">{level.description}</p>
                <div className="aqi-advice">
                  <strong>Health Advice:</strong> {level.healthAdvice}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="info-section">
        <div className="container">
          <div className="section-header">
            <h2>Key Pollutants Monitored</h2>
            <p>Learn about the pollutants that affect air quality in Praya</p>
          </div>

          <div className="pollutants-grid">
            {pollutants.map((pollutant, index) => (
              <div key={index} className="pollutant-card">
                <div className="pollutant-header">
                  <span className="pollutant-symbol">{pollutant.name}</span>
                  <span className="pollutant-name">{pollutant.fullName}</span>
                </div>
                <p className="pollutant-description">{pollutant.description}</p>
                <div className="pollutant-sources">
                  <strong>Common Sources:</strong> {pollutant.sources}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="tips-section">
        <div className="container">
          <div className="section-header">
            <h2>Protecting Your Health</h2>
            <p>Practical steps to reduce your exposure to air pollution</p>
          </div>

          <div className="tips-grid">
            <div className="tip-card">
              <div className="tip-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <h3>Check Daily AQI</h3>
              <p>Monitor air quality forecasts before planning outdoor activities, especially for exercise.</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              </div>
              <h3>Stay Indoors on High AQI Days</h3>
              <p>When AQI exceeds 150, limit outdoor exposure. Keep windows closed and use air filtration.</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M8 12h8M12 8v8"></path>
                </svg>
              </div>
              <h3>Use N95 Masks When Needed</h3>
              <p>Properly fitted N95 masks can filter fine particles during poor air quality episodes.</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3>Know Your Sensitivity</h3>
              <p>Children, elderly, and those with respiratory conditions should take extra precautions.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="dept-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <h4>Air Quality Monitoring</h4>
              <p>A service of the Republic of Praya's Department of Health and Environmental Protection Agency, providing real-time air quality data to protect public health.</p>
            </div>
            <div className="footer-section">
              <h5>Related Services</h5>
              <ul>
                <li><Link to="/health">Health Department</Link></li>
                <li><a href="#">Environmental Agency</a></li>
                <li><a href="#">Weather Service</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5>Resources</h5>
              <ul>
                <li><a href="#">Air Quality Reports</a></li>
                <li><a href="#">Historical Data</a></li>
                <li><a href="#">Research Publications</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5>Government</h5>
              <ul>
                <li><Link to="/">Gov Portal</Link></li>
                <li><a href="#">Public Health Alerts</a></li>
                <li><a href="#">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>&copy; 2024 Republic of Praya. Air Quality Monitoring Service.</span>
            <div className="footer-legal">
              <a href="#">Terms</a>
              <a href="#">Privacy</a>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        .aqi-scale-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 2rem;
        }

        .aqi-level-card {
          padding: 1.5rem;
          border-radius: 8px;
          transition: transform 0.2s ease;
        }

        .aqi-level-card:hover {
          transform: translateX(4px);
        }

        .aqi-level-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 0.75rem;
        }

        .aqi-range {
          font-size: 1.5rem;
          font-weight: 700;
          min-width: 100px;
        }

        .aqi-level-name {
          font-size: 1.1rem;
          font-weight: 600;
        }

        .aqi-description {
          color: var(--text-secondary, #4b5563);
          margin-bottom: 0.75rem;
          line-height: 1.6;
        }

        .aqi-advice {
          font-size: 0.9rem;
          color: var(--text-secondary, #374151);
          background: rgba(255, 255, 255, 0.5);
          padding: 0.75rem;
          border-radius: 6px;
        }

        .pollutants-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 1.5rem;
          margin-top: 2rem;
        }

        .pollutant-card {
          background: var(--card-bg, #fff);
          border: 1px solid var(--border-color, #e5e7eb);
          border-radius: 12px;
          padding: 1.5rem;
          transition: box-shadow 0.2s ease;
        }

        .pollutant-card:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .pollutant-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .pollutant-symbol {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          padding: 0.5rem 0.75rem;
          border-radius: 6px;
          font-weight: 700;
          font-size: 0.9rem;
        }

        .pollutant-name {
          font-weight: 600;
          color: var(--text-primary, #111827);
        }

        .pollutant-description {
          color: var(--text-secondary, #4b5563);
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .pollutant-sources {
          font-size: 0.85rem;
          color: var(--text-tertiary, #6b7280);
          padding-top: 0.75rem;
          border-top: 1px solid var(--border-color, #e5e7eb);
        }

        .tips-section {
          padding: 4rem 0;
          background: var(--section-alt-bg, #f9fafb);
        }

        .tips-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-top: 2rem;
        }

        .tip-card {
          background: var(--card-bg, #fff);
          border: 1px solid var(--border-color, #e5e7eb);
          border-radius: 12px;
          padding: 1.5rem;
          text-align: center;
        }

        .tip-icon {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
        }

        .tip-icon svg {
          width: 24px;
          height: 24px;
          color: white;
        }

        .tip-card h3 {
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
          color: var(--text-primary, #111827);
        }

        .tip-card p {
          color: var(--text-secondary, #4b5563);
          font-size: 0.9rem;
          line-height: 1.5;
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
