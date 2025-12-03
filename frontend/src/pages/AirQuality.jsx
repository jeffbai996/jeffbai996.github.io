import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Department.css'
import { getCurrentAQI, getNationalStatus } from '../utils/nationalStatus'

const aqiLevels = [
  {
    range: '0-50',
    level: 'Good',
    color: '#10b981',
    bgColor: 'rgba(16, 185, 129, 0.15)',
    description: 'Air quality is satisfactory, and air pollution poses little or no risk.',
    healthAdvice: 'No precautions necessary. Ideal conditions for outdoor activities.',
    sensitiveGroups: 'All individuals can enjoy outdoor activities without restrictions.',
    outdoorWorkers: 'Normal working conditions. No protective measures required.'
  },
  {
    range: '51-100',
    level: 'Moderate',
    color: '#f59e0b',
    bgColor: 'rgba(245, 158, 11, 0.15)',
    description: 'Air quality is acceptable. However, there may be a risk for some people who are unusually sensitive to air pollution.',
    healthAdvice: 'People with respiratory or heart conditions should limit prolonged outdoor exertion.',
    sensitiveGroups: 'Unusually sensitive individuals may experience symptoms. Consider reducing intense outdoor activity.',
    outdoorWorkers: 'Consider more frequent breaks for sensitive individuals.'
  },
  {
    range: '101-150',
    level: 'Unhealthy for Sensitive Groups',
    color: '#f97316',
    bgColor: 'rgba(249, 115, 22, 0.15)',
    description: 'Members of sensitive groups may experience health effects. The general public is less likely to be affected.',
    healthAdvice: 'Children, elderly, and those with respiratory conditions should limit outdoor activity.',
    sensitiveGroups: 'People with asthma, heart disease, or lung disease should significantly reduce outdoor exertion.',
    outdoorWorkers: 'Workers with respiratory conditions should wear protective masks or limit exposure time.'
  },
  {
    range: '151-200',
    level: 'Unhealthy',
    color: '#ef4444',
    bgColor: 'rgba(239, 68, 68, 0.15)',
    description: 'Some members of the general public may experience health effects; sensitive groups may experience more serious health effects.',
    healthAdvice: 'Everyone should reduce prolonged outdoor exertion. Sensitive groups should avoid outdoor activity.',
    sensitiveGroups: 'All sensitive groups should remain indoors with air filtration if possible.',
    outdoorWorkers: 'Employers should consider rescheduling outdoor work or provide respiratory protection (N95 masks).'
  },
  {
    range: '201-300',
    level: 'Very Unhealthy',
    color: '#a855f7',
    bgColor: 'rgba(168, 85, 247, 0.15)',
    description: 'Health alert: The risk of health effects is increased for everyone.',
    healthAdvice: 'Everyone should avoid prolonged outdoor exertion. Consider staying indoors.',
    sensitiveGroups: 'All sensitive groups must avoid any outdoor activity. Use air purifiers indoors.',
    outdoorWorkers: 'Outdoor work should be suspended or relocated indoors where possible. Essential outdoor work requires N95 or P100 masks.'
  },
  {
    range: '301-500',
    level: 'Hazardous',
    color: '#991b1b',
    bgColor: 'rgba(153, 27, 27, 0.15)',
    description: 'Health warning of emergency conditions: everyone is more likely to be affected.',
    healthAdvice: 'Everyone should avoid all outdoor activity. Stay indoors with windows closed.',
    sensitiveGroups: 'Emergency conditions - remain indoors, seal doors and windows, run air purifiers continuously.',
    outdoorWorkers: 'All non-essential outdoor work must be suspended. Emergency responders require full respiratory protection.'
  }
]

const pollutants = [
  {
    name: 'PM2.5',
    fullName: 'Fine Particulate Matter',
    description: 'Tiny particles less than 2.5 micrometers in diameter that can penetrate deep into the lungs and bloodstream. These particles are so small they can enter the bloodstream and affect the cardiovascular system.',
    sources: 'Vehicle emissions, industrial processes, wildfires, construction, cooking, burning of fossil fuels',
    healthEffects: 'Aggravated asthma, decreased lung function, irregular heartbeat, heart attacks, premature death',
    standards: 'WHO guideline: 5 μg/m³ annual mean; Praya standard: 12 μg/m³'
  },
  {
    name: 'PM10',
    fullName: 'Coarse Particulate Matter',
    description: 'Particles between 2.5 and 10 micrometers in diameter that can irritate the respiratory system. While larger than PM2.5, they still pose significant health risks.',
    sources: 'Dust, pollen, mold spores, road dust, construction sites, mining operations',
    healthEffects: 'Respiratory irritation, aggravated asthma, lung damage, reduced lung function',
    standards: 'WHO guideline: 15 μg/m³ annual mean; Praya standard: 50 μg/m³'
  },
  {
    name: 'O₃',
    fullName: 'Ground-Level Ozone',
    description: 'A harmful gas formed when pollutants react with sunlight. Not to be confused with protective stratospheric ozone. Ground-level ozone is the main ingredient in smog.',
    sources: 'Vehicle exhaust, industrial emissions, gasoline vapors, chemical solvents reacting with sunlight',
    healthEffects: 'Chest pain, coughing, throat irritation, airway inflammation, reduced lung function, worsened bronchitis and emphysema',
    standards: 'WHO guideline: 100 μg/m³ 8-hour mean; Praya standard: 120 μg/m³'
  },
  {
    name: 'NO₂',
    fullName: 'Nitrogen Dioxide',
    description: 'A reddish-brown gas with a pungent odor that can irritate airways and aggravate respiratory diseases. It also contributes to the formation of ground-level ozone and particulate matter.',
    sources: 'Vehicle engines, power plants, industrial facilities, home heating',
    healthEffects: 'Airway inflammation, increased asthma attacks, reduced lung function, increased susceptibility to respiratory infections',
    standards: 'WHO guideline: 10 μg/m³ annual mean; Praya standard: 40 μg/m³'
  },
  {
    name: 'SO₂',
    fullName: 'Sulfur Dioxide',
    description: 'A colorless gas with a sharp odor that can harm the respiratory system and contribute to acid rain. It is highly reactive and can form secondary pollutants.',
    sources: 'Power plants burning coal/oil, industrial processes, volcanic eruptions, shipping emissions',
    healthEffects: 'Irritation of nose, throat, and airways, aggravated asthma, increased respiratory symptoms, hospital admissions',
    standards: 'WHO guideline: 40 μg/m³ 24-hour mean; Praya standard: 75 μg/m³'
  },
  {
    name: 'CO',
    fullName: 'Carbon Monoxide',
    description: 'A colorless, odorless gas that reduces oxygen delivery to the body\'s organs and tissues. At high concentrations, it can be lethal.',
    sources: 'Vehicle exhaust, fuel combustion, industrial processes, faulty heating systems, fires',
    healthEffects: 'Reduced oxygen delivery, chest pain in heart patients, impaired vision and coordination, headaches, dizziness, at high levels: fatal',
    standards: 'WHO guideline: 4 mg/m³ 24-hour mean; Praya standard: 9 ppm'
  }
]

const monitoringStations = [
  { region: 'Capital District', stations: 15, status: 'Online', avgAQI: 38, trend: 'stable' },
  { region: 'Northern Province', stations: 12, status: 'Online', avgAQI: 45, trend: 'improving' },
  { region: 'Eastern Coastal', stations: 18, status: 'Online', avgAQI: 52, trend: 'stable' },
  { region: 'Southern Region', stations: 14, status: 'Online', avgAQI: 41, trend: 'improving' },
  { region: 'Western Highlands', stations: 10, status: 'Online', avgAQI: 35, trend: 'stable' },
  { region: 'Central Plains', stations: 18, status: 'Online', avgAQI: 48, trend: 'worsening' }
]

const historicalData = [
  { year: 2020, goodDays: 285, moderateDays: 55, unhealthyDays: 25 },
  { year: 2021, goodDays: 295, moderateDays: 50, unhealthyDays: 20 },
  { year: 2022, goodDays: 302, moderateDays: 48, unhealthyDays: 15 },
  { year: 2023, goodDays: 310, moderateDays: 45, unhealthyDays: 10 },
  { year: 2024, goodDays: 312, moderateDays: 45, unhealthyDays: 8 }
]

export default function AirQuality() {
  // Get current AQI from national status
  const currentAQI = getCurrentAQI()
  const nationalStatus = getNationalStatus()

  useEffect(() => {
    document.body.classList.add('theme-dark-aqi')
    return () => document.body.classList.remove('theme-dark-aqi')
  }, [])

  return (
    <div className="aqi-dark-page">
      <header className="dept-header aqi-dark-header">
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
            </div>
          </Link>
          <nav className="nav">
            <Link to="/" className="nav-link">Gov Portal</Link>
            <Link to="/health" className="nav-link">Health Dept</Link>
          </nav>
        </div>
      </header>

      <section className="aqi-hero-dark">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
              Environmental Health Monitoring
            </div>
            <h2>Understanding <span>Air Quality</span></h2>
            <p>The Air Quality Index (AQI) is a standardized indicator used to communicate the current state of air pollution and its potential health effects. The Republic of Praya operates a comprehensive network of 87 monitoring stations across all regions, providing real-time data to protect public health and inform policy decisions.</p>
            <p className="hero-sub">Our monitoring system tracks six major pollutants 24/7, with data updated every hour. Citizens can access real-time readings and receive alerts when air quality deteriorates in their area.</p>
          </div>
        </div>
      </section>

      <section className="stats-bar-dark">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Current AQI</span>
              <span className="stat-value" style={{color: currentAQI.color}}>{currentAQI.value}</span>
              <span className="stat-change">{currentAQI.label}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Monitoring Stations</span>
              <span className="stat-value">{nationalStatus.airQuality.monitoringStations}</span>
              <span className="stat-change">Nationwide</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Days "Good" This Year</span>
              <span className="stat-value">{nationalStatus.airQuality.goodDaysThisYear}</span>
              <span className="stat-change">Out of {nationalStatus.airQuality.totalDaysThisYear}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Last Updated</span>
              <span className="stat-value">{nationalStatus.airQuality.lastUpdated.replace(' ago', '')}</span>
              <span className="stat-change">Ago</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-dark">
        <div className="container">
          <div className="section-header-dark">
            <h2>AQI Scale Reference</h2>
            <p>Understanding what the numbers mean for your health and daily activities</p>
          </div>

          <div className="aqi-scale-container-dark">
            {aqiLevels.map((level, index) => (
              <div
                key={index}
                className="aqi-level-card-dark"
                style={{
                  borderLeft: `4px solid ${level.color}`,
                  background: level.bgColor
                }}
              >
                <div className="aqi-level-header-dark">
                  <div className="aqi-range-dark" style={{ color: level.color }}>
                    {level.range}
                  </div>
                  <div className="aqi-level-name-dark" style={{ color: level.color }}>
                    {level.level}
                  </div>
                </div>
                <p className="aqi-description-dark">{level.description}</p>
                <div className="aqi-details-grid">
                  <div className="aqi-detail-block">
                    <strong>General Health Advice:</strong>
                    <p>{level.healthAdvice}</p>
                  </div>
                  <div className="aqi-detail-block">
                    <strong>Sensitive Groups:</strong>
                    <p>{level.sensitiveGroups}</p>
                  </div>
                  <div className="aqi-detail-block">
                    <strong>Outdoor Workers:</strong>
                    <p>{level.outdoorWorkers}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-dark section-alt">
        <div className="container">
          <div className="section-header-dark">
            <h2>Key Pollutants Monitored</h2>
            <p>Learn about the pollutants that affect air quality in Praya and their health implications</p>
          </div>

          <div className="pollutants-grid-dark">
            {pollutants.map((pollutant, index) => (
              <div key={index} className="pollutant-card-dark">
                <div className="pollutant-header-dark">
                  <span className="pollutant-symbol-dark">{pollutant.name}</span>
                  <span className="pollutant-name-dark">{pollutant.fullName}</span>
                </div>
                <p className="pollutant-description-dark">{pollutant.description}</p>
                <div className="pollutant-details">
                  <div className="pollutant-detail">
                    <strong>Common Sources:</strong>
                    <p>{pollutant.sources}</p>
                  </div>
                  <div className="pollutant-detail">
                    <strong>Health Effects:</strong>
                    <p>{pollutant.healthEffects}</p>
                  </div>
                  <div className="pollutant-detail standards">
                    <strong>Standards:</strong>
                    <p>{pollutant.standards}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-dark">
        <div className="container">
          <div className="section-header-dark">
            <h2>Regional Monitoring Network</h2>
            <p>Real-time status of air quality monitoring stations across Praya</p>
          </div>

          <div className="monitoring-table-container">
            <table className="monitoring-table-dark">
              <thead>
                <tr>
                  <th>Region</th>
                  <th>Active Stations</th>
                  <th>Status</th>
                  <th>Average AQI</th>
                  <th>Trend</th>
                </tr>
              </thead>
              <tbody>
                {monitoringStations.map((station, index) => (
                  <tr key={index}>
                    <td>{station.region}</td>
                    <td>{station.stations}</td>
                    <td><span className="status-badge online">{station.status}</span></td>
                    <td>
                      <span className={`aqi-badge ${station.avgAQI <= 50 ? 'good' : station.avgAQI <= 100 ? 'moderate' : 'unhealthy'}`}>
                        {station.avgAQI}
                      </span>
                    </td>
                    <td>
                      <span className={`trend-indicator ${station.trend}`}>
                        {station.trend === 'improving' ? '↓ Improving' : station.trend === 'worsening' ? '↑ Worsening' : '→ Stable'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section-dark section-alt">
        <div className="container">
          <div className="section-header-dark">
            <h2>Air Quality Trends (2020-2024)</h2>
            <p>Historical data showing improvement in air quality over the past five years</p>
          </div>

          <div className="historical-grid">
            {historicalData.map((year, index) => (
              <div key={index} className="historical-card-dark">
                <div className="year-label">{year.year}</div>
                <div className="days-breakdown">
                  <div className="day-stat good">
                    <span className="day-count">{year.goodDays}</span>
                    <span className="day-label">Good Days</span>
                  </div>
                  <div className="day-stat moderate">
                    <span className="day-count">{year.moderateDays}</span>
                    <span className="day-label">Moderate Days</span>
                  </div>
                  <div className="day-stat unhealthy">
                    <span className="day-count">{year.unhealthyDays}</span>
                    <span className="day-label">Unhealthy Days</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-dark">
        <div className="container">
          <div className="section-header-dark">
            <h2>Protecting Your Health</h2>
            <p>Practical steps to reduce your exposure to air pollution</p>
          </div>

          <div className="tips-grid-dark">
            <div className="tip-card-dark">
              <div className="tip-icon-dark">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <h3>Check Daily AQI</h3>
              <p>Monitor air quality forecasts before planning outdoor activities, especially for exercise. Use the official Praya Air app for real-time updates and personalized alerts based on your location.</p>
            </div>
            <div className="tip-card-dark">
              <div className="tip-icon-dark">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              </div>
              <h3>Stay Indoors on High AQI Days</h3>
              <p>When AQI exceeds 150, limit outdoor exposure. Keep windows closed, use air filtration systems, and consider running HEPA air purifiers in rooms where you spend the most time.</p>
            </div>
            <div className="tip-card-dark">
              <div className="tip-icon-dark">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M8 12h8M12 8v8"></path>
                </svg>
              </div>
              <h3>Use N95 Masks When Needed</h3>
              <p>Properly fitted N95 or KN95 masks can filter fine particles during poor air quality episodes. Ensure a tight seal around your nose and mouth for maximum protection.</p>
            </div>
            <div className="tip-card-dark">
              <div className="tip-icon-dark">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3>Know Your Sensitivity</h3>
              <p>Children, elderly individuals, and those with respiratory or cardiovascular conditions should take extra precautions. Consult your doctor about personal air quality thresholds.</p>
            </div>
            <div className="tip-card-dark">
              <div className="tip-icon-dark">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h3>Time Your Activities</h3>
              <p>Ozone levels typically peak in afternoon hours. Schedule outdoor exercise for early morning when pollution levels are generally lower, especially during summer months.</p>
            </div>
            <div className="tip-card-dark">
              <div className="tip-icon-dark">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
              </div>
              <h3>Reduce Indoor Sources</h3>
              <p>Minimize indoor air pollution by avoiding smoking indoors, using exhaust fans when cooking, and ensuring proper ventilation. Consider houseplants that help filter indoor air.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-dark section-alt">
        <div className="container">
          <div className="section-header-dark">
            <h2>Air Quality Alerts & Notifications</h2>
            <p>Stay informed with our multi-channel alert system</p>
          </div>

          <div className="alerts-info-grid">
            <div className="alert-info-card">
              <h3>Mobile App Alerts</h3>
              <p>Download the Praya Air app for iOS and Android. Receive push notifications when air quality in your area changes significantly. Set custom thresholds based on your health needs.</p>
            </div>
            <div className="alert-info-card">
              <h3>SMS Alerts</h3>
              <p>Register your phone number at gov.praya/air-alerts to receive text message notifications when AQI reaches Unhealthy levels in your registered locations.</p>
            </div>
            <div className="alert-info-card">
              <h3>Email Digest</h3>
              <p>Subscribe to daily or weekly air quality reports delivered to your inbox. Includes regional analysis, health recommendations, and upcoming forecast.</p>
            </div>
            <div className="alert-info-card">
              <h3>Emergency Broadcasts</h3>
              <p>During hazardous air quality events, emergency broadcasts will be issued through the National Emergency Alert System on TV and radio.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer-dark">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand-dark">
              <h4>Air Quality Monitoring</h4>
              <p>A service of the Republic of Praya's Department of Health and Environmental Protection Agency, providing real-time air quality data to protect public health. Operating 87 monitoring stations across all regions with data updated hourly.</p>
            </div>
            <div className="footer-section-dark">
              <h5>Related Services</h5>
              <ul>
                <li><Link to="/health">Health Department</Link></li>
                <li><a href="#">Environmental Agency</a></li>
                <li><a href="#">Weather Service</a></li>
                <li><a href="#">Climate Action</a></li>
              </ul>
            </div>
            <div className="footer-section-dark">
              <h5>Resources</h5>
              <ul>
                <li><a href="#">Air Quality Reports</a></li>
                <li><a href="#">Historical Data</a></li>
                <li><a href="#">Research Publications</a></li>
                <li><a href="#">API Documentation</a></li>
              </ul>
            </div>
            <div className="footer-section-dark">
              <h5>Government</h5>
              <ul>
                <li><Link to="/">Gov Portal</Link></li>
                <li><a href="#">Public Health Alerts</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Accessibility</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom-dark">
            <span>&copy; 2024 Republic of Praya. Air Quality Monitoring Service.</span>
            <div className="footer-legal-dark">
              <a href="#">Terms</a>
              <a href="#">Privacy</a>
              <a href="#">Data Policy</a>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        .aqi-dark-page {
          background: #0f172a;
          min-height: 100vh;
          color: #e2e8f0;
        }

        .aqi-dark-header {
          background: #1e293b !important;
          border-bottom: 1px solid #334155;
        }

        .aqi-dark-header .logo-text h1 {
          color: #f1f5f9;
          font-size: 1.75rem;
          font-weight: 700;
          margin: 0;
        }

        .aqi-dark-header .nav-link {
          color: #94a3b8;
        }

        .aqi-dark-header .nav-link:hover {
          color: #10b981;
        }

        .aqi-hero-dark {
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          padding: 4rem 0;
          border-bottom: 1px solid #334155;
        }

        .aqi-hero-dark .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(16, 185, 129, 0.15);
          color: #10b981;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.875rem;
          margin-bottom: 1.5rem;
        }

        .aqi-hero-dark h2 {
          font-size: 2.5rem;
          color: #f1f5f9;
          margin-bottom: 1.5rem;
        }

        .aqi-hero-dark h2 span {
          color: #10b981;
        }

        .aqi-hero-dark p {
          color: #94a3b8;
          font-size: 1.1rem;
          line-height: 1.7;
          max-width: 800px;
          margin-bottom: 1rem;
        }

        .aqi-hero-dark .hero-sub {
          font-size: 1rem;
          color: #64748b;
        }

        .stats-bar-dark {
          background: #1e293b;
          padding: 2rem 0;
          border-bottom: 1px solid #334155;
        }

        .stats-bar-dark .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 2rem;
        }

        .stats-bar-dark .stat-item {
          text-align: center;
        }

        .stats-bar-dark .stat-label {
          color: #64748b;
          font-size: 0.875rem;
          display: block;
          margin-bottom: 0.5rem;
        }

        .stats-bar-dark .stat-value {
          color: #f1f5f9;
          font-size: 2rem;
          font-weight: 700;
          display: block;
        }

        .stats-bar-dark .stat-value.good {
          color: #10b981;
        }

        .stats-bar-dark .stat-change {
          color: #94a3b8;
          font-size: 0.875rem;
        }

        .section-dark {
          padding: 4rem 0;
          background: #0f172a;
        }

        .section-dark.section-alt {
          background: #1e293b;
        }

        .section-header-dark {
          text-align: center;
          margin-bottom: 2rem;
        }

        .section-header-dark h2 {
          font-size: 1.75rem;
          color: #f1f5f9;
          margin-bottom: 0.5rem;
        }

        .section-header-dark p {
          color: #94a3b8;
        }

        .aqi-scale-container-dark {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .aqi-level-card-dark {
          padding: 1.5rem;
          border-radius: 8px;
          transition: transform 0.2s ease;
        }

        .aqi-level-card-dark:hover {
          transform: translateX(4px);
        }

        .aqi-level-header-dark {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 0.75rem;
        }

        .aqi-range-dark {
          font-size: 1.5rem;
          font-weight: 700;
          min-width: 100px;
        }

        .aqi-level-name-dark {
          font-size: 1.1rem;
          font-weight: 600;
        }

        .aqi-description-dark {
          color: #cbd5e1;
          margin-bottom: 1rem;
          line-height: 1.6;
        }

        .aqi-details-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
        }

        .aqi-detail-block {
          background: rgba(0, 0, 0, 0.2);
          padding: 0.75rem;
          border-radius: 6px;
        }

        .aqi-detail-block strong {
          color: #f1f5f9;
          font-size: 0.85rem;
          display: block;
          margin-bottom: 0.25rem;
        }

        .aqi-detail-block p {
          color: #94a3b8;
          font-size: 0.85rem;
          margin: 0;
          line-height: 1.5;
        }

        .pollutants-grid-dark {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 1.5rem;
        }

        .pollutant-card-dark {
          background: #0f172a;
          border: 1px solid #334155;
          border-radius: 12px;
          padding: 1.5rem;
          transition: border-color 0.2s ease;
        }

        .pollutant-card-dark:hover {
          border-color: #10b981;
        }

        .pollutant-header-dark {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .pollutant-symbol-dark {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          padding: 0.5rem 0.75rem;
          border-radius: 6px;
          font-weight: 700;
          font-size: 0.9rem;
        }

        .pollutant-name-dark {
          font-weight: 600;
          color: #f1f5f9;
        }

        .pollutant-description-dark {
          color: #94a3b8;
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .pollutant-details {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .pollutant-detail {
          padding-top: 0.75rem;
          border-top: 1px solid #334155;
        }

        .pollutant-detail:first-child {
          border-top: none;
          padding-top: 0;
        }

        .pollutant-detail strong {
          color: #cbd5e1;
          font-size: 0.8rem;
          display: block;
          margin-bottom: 0.25rem;
        }

        .pollutant-detail p {
          color: #64748b;
          font-size: 0.85rem;
          margin: 0;
          line-height: 1.5;
        }

        .pollutant-detail.standards p {
          color: #10b981;
        }

        .monitoring-table-container {
          overflow-x: auto;
        }

        .monitoring-table-dark {
          width: 100%;
          border-collapse: collapse;
          background: #1e293b;
          border-radius: 8px;
          overflow: hidden;
        }

        .monitoring-table-dark th,
        .monitoring-table-dark td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid #334155;
        }

        .monitoring-table-dark th {
          background: #0f172a;
          color: #94a3b8;
          font-weight: 600;
          font-size: 0.85rem;
          text-transform: uppercase;
        }

        .monitoring-table-dark td {
          color: #e2e8f0;
        }

        .status-badge {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .status-badge.online {
          background: rgba(16, 185, 129, 0.2);
          color: #10b981;
        }

        .aqi-badge {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border-radius: 6px;
          font-weight: 600;
        }

        .aqi-badge.good {
          background: rgba(16, 185, 129, 0.2);
          color: #10b981;
        }

        .aqi-badge.moderate {
          background: rgba(245, 158, 11, 0.2);
          color: #f59e0b;
        }

        .aqi-badge.unhealthy {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
        }

        .trend-indicator {
          font-size: 0.85rem;
        }

        .trend-indicator.improving {
          color: #10b981;
        }

        .trend-indicator.worsening {
          color: #ef4444;
        }

        .trend-indicator.stable {
          color: #94a3b8;
        }

        .historical-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1.5rem;
        }

        .historical-card-dark {
          background: #0f172a;
          border: 1px solid #334155;
          border-radius: 12px;
          padding: 1.5rem;
          text-align: center;
        }

        .year-label {
          font-size: 1.5rem;
          font-weight: 700;
          color: #f1f5f9;
          margin-bottom: 1rem;
        }

        .days-breakdown {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .day-stat {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem;
          border-radius: 6px;
        }

        .day-stat.good {
          background: rgba(16, 185, 129, 0.15);
        }

        .day-stat.moderate {
          background: rgba(245, 158, 11, 0.15);
        }

        .day-stat.unhealthy {
          background: rgba(239, 68, 68, 0.15);
        }

        .day-count {
          font-weight: 700;
          font-size: 1.1rem;
        }

        .day-stat.good .day-count { color: #10b981; }
        .day-stat.moderate .day-count { color: #f59e0b; }
        .day-stat.unhealthy .day-count { color: #ef4444; }

        .day-label {
          font-size: 0.75rem;
          color: #94a3b8;
        }

        .tips-grid-dark {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .tip-card-dark {
          background: #1e293b;
          border: 1px solid #334155;
          border-radius: 12px;
          padding: 1.5rem;
        }

        .tip-icon-dark {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
        }

        .tip-icon-dark svg {
          width: 24px;
          height: 24px;
          color: white;
        }

        .tip-card-dark h3 {
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
          color: #f1f5f9;
        }

        .tip-card-dark p {
          color: #94a3b8;
          font-size: 0.9rem;
          line-height: 1.6;
        }

        .alerts-info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .alert-info-card {
          background: #0f172a;
          border: 1px solid #334155;
          border-radius: 12px;
          padding: 1.5rem;
        }

        .alert-info-card h3 {
          color: #10b981;
          font-size: 1.1rem;
          margin-bottom: 0.75rem;
        }

        .alert-info-card p {
          color: #94a3b8;
          font-size: 0.9rem;
          line-height: 1.6;
        }

        .footer-dark {
          background: #0f172a;
          border-top: 1px solid #334155;
          padding: 3rem 0 1.5rem;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr repeat(3, 1fr);
          gap: 2rem;
          margin-bottom: 2rem;
        }

        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }
        }

        .footer-brand-dark h4 {
          color: #f1f5f9;
          font-size: 1.25rem;
          margin-bottom: 0.75rem;
        }

        .footer-brand-dark p {
          color: #64748b;
          font-size: 0.9rem;
          line-height: 1.6;
        }

        .footer-section-dark h5 {
          color: #f1f5f9;
          font-size: 0.9rem;
          margin-bottom: 1rem;
          text-transform: uppercase;
        }

        .footer-section-dark ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-section-dark li {
          margin-bottom: 0.5rem;
        }

        .footer-section-dark a {
          color: #64748b;
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.2s;
        }

        .footer-section-dark a:hover {
          color: #10b981;
        }

        .footer-bottom-dark {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1.5rem;
          border-top: 1px solid #334155;
          color: #64748b;
          font-size: 0.85rem;
        }

        .footer-legal-dark a {
          color: #64748b;
          text-decoration: none;
          margin-left: 1.5rem;
        }

        .footer-legal-dark a:hover {
          color: #10b981;
        }
      `}</style>
    </div>
  )
}
