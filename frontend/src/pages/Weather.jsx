import React, { useEffect, useState } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import './Department.css'

// Inline styles for weather-specific typography
const tempStyle = {
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  fontWeight: '600',
  letterSpacing: '-0.5px'
}

const tempLargeStyle = {
  ...tempStyle,
  fontSize: '48px',
  lineHeight: '1'
}

const tempMediumStyle = {
  ...tempStyle,
  fontSize: '24px'
}

const tempSmallStyle = {
  ...tempStyle,
  fontSize: '18px'
}

export default function Weather() {
  const navigate = useNavigate()

  useEffect(() => {
    document.body.classList.add('theme-weather')
    return () => document.body.classList.remove('theme-weather')
  }, [])

  return (
    <>
      <header className="dept-header">
        <div className="container">
          <Link to="/weather" className="dept-logo">
            <div className="logo-mark">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="Weather icon">
                <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
              </svg>
            </div>
            <div className="logo-text">
              <h1>National Weather Service</h1>
              <span className="tagline">Interior Department &bull; Republic of Praya</span>
            </div>
          </Link>
          <nav className="nav">
            <Link to="/weather" className="nav-link">Home</Link>
            <Link to="/weather/forecasts" className="nav-link">Forecasts</Link>
            <Link to="/weather/alerts" className="nav-link">Alerts</Link>
            <Link to="/weather/radar" className="nav-link">Radar</Link>
            <Link to="/weather/climate" className="nav-link">Climate</Link>
            <Link to="/weather/marine" className="nav-link">Marine</Link>
          </nav>
        </div>
      </header>

      <Routes>
        <Route index element={<WeatherHome navigate={navigate} />} />
        <Route path="forecasts" element={<Forecasts />} />
        <Route path="alerts" element={<WeatherAlerts />} />
        <Route path="radar" element={<Radar />} />
        <Route path="climate" element={<Climate />} />
        <Route path="marine" element={<Marine />} />
      </Routes>

      <footer className="dept-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <h4>National Weather Service</h4>
              <p>The Praya National Weather Service provides accurate weather forecasts, severe weather warnings, and climate data to protect lives and property. Our temperate maritime climate brings mild summers, cool winters, and significant snowfall from November through April.</p>
            </div>
            <div className="footer-section">
              <h5>Services</h5>
              <ul>
                <li><Link to="/weather/forecasts">Weather Forecasts</Link></li>
                <li><Link to="/weather/alerts">Weather Alerts</Link></li>
                <li><Link to="/weather/radar">Radar & Satellite</Link></li>
                <li><Link to="/weather/climate">Climate Data</Link></li>
                <li><Link to="/weather/marine">Marine Weather</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5>Resources</h5>
              <ul>
                <li><a href="#">Historical Data</a></li>
                <li><a href="#">API Access</a></li>
                <li><a href="#">Weather Education</a></li>
                <li><a href="#">Snow Reports</a></li>
                <li><a href="#">Aviation Weather</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5>Government</h5>
              <ul>
                <li><Link to="/">Gov Portal</Link></li>
                <li><Link to="/interior">Interior Department</Link></li>
                <li><Link to="/health">Health Department</Link></li>
                <li><Link to="/transport">Transport Department</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>&copy; 2024 Republic of Praya. National Weather Service.</span>
            <div className="footer-legal">
              <a href="#">Terms</a>
              <a href="#">Privacy</a>
              <a href="#">Data Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

function WeatherHome({ navigate }) {
  // Current date to determine season
  const currentMonth = new Date().getMonth() + 1 // 1-12
  const isWinter = currentMonth >= 11 || currentMonth <= 3
  const isSnowSeason = currentMonth >= 11 || currentMonth <= 4

  // Temperate climate conditions (similar to Juneau/Vancouver/Hokkaido)
  const currentConditions = {
    location: 'Praya City',
    temperature: isWinter ? 2 : 16,
    condition: isSnowSeason ? 'Light Snow' : 'Partly Cloudy',
    humidity: 78,
    wind: '18 km/h NW',
    feelsLike: isWinter ? -2 : 14,
    dewPoint: isWinter ? -3 : 10,
    pressure: '1018 mb',
    visibility: isSnowSeason ? '8 km' : '16 km',
    uvIndex: isWinter ? 1 : 4,
    snowDepth: isSnowSeason ? '45 cm' : '0 cm'
  }

  return (
    <div className="layout-civic">
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
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
              </svg>
              Weather Services
            </div>
            <h2>Protecting Praya Through <span>Weather Intelligence</span></h2>
            <p>The National Weather Service provides accurate forecasts for Praya's temperate maritime climate. With cold, snowy winters and mild summers, stay informed about conditions that affect your daily life.</p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => navigate('/weather/forecasts')}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1" x2="12" y2="3"/>
                  <line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/>
                  <line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
                View Forecasts
              </button>
              <button className="btn btn-secondary" onClick={() => navigate('/weather/alerts')}>
                Active Alerts
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Temperature</span>
              <span className="stat-value" style={tempStyle}>{currentConditions.temperature}°C</span>
              <span className="stat-change">{currentConditions.condition}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Feels Like</span>
              <span className="stat-value" style={tempStyle}>{currentConditions.feelsLike}°C</span>
              <span className="stat-change">Wind Chill</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Wind</span>
              <span className="stat-value" style={tempStyle}>{currentConditions.wind}</span>
              <span className="stat-change">Gusts to 28 km/h</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Snow Depth</span>
              <span className="stat-value" style={tempStyle}>{currentConditions.snowDepth}</span>
              <span className="stat-change">Praya City</span>
            </div>
          </div>
        </div>
      </section>

      <main className="main">
        <div className="container">
          {/* Current Conditions Card */}
          <div className="card" style={{ marginBottom: '24px' }}>
            <div className="card-header">
              <h3 className="card-title">Current Conditions - Praya City</h3>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                Updated: {new Date().toLocaleTimeString()}
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.2) 0%, rgba(224, 242, 254, 0.2) 100%)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {isSnowSeason ? (
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: '#e0f2fe' }} aria-label="Snow icon">
                      <path d="M12 2v20M4.93 4.93l14.14 14.14M2 12h20M4.93 19.07l14.14-14.14"/>
                      <circle cx="12" cy="12" r="2"/>
                    </svg>
                  ) : (
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: '#60a5fa' }} aria-label="Cloudy icon">
                      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
                    </svg>
                  )}
                </div>
                <div>
                  <div style={{ ...tempLargeStyle, color: 'var(--text-primary)' }}>
                    {currentConditions.temperature}°
                  </div>
                  <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                    {currentConditions.condition}
                  </div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ padding: '12px', background: 'var(--bg-elevated)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Humidity</div>
                  <div style={{ ...tempSmallStyle, color: 'var(--text-primary)' }}>{currentConditions.humidity}%</div>
                </div>
                <div style={{ padding: '12px', background: 'var(--bg-elevated)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Dew Point</div>
                  <div style={{ ...tempSmallStyle, color: 'var(--text-primary)' }}>{currentConditions.dewPoint}°C</div>
                </div>
                <div style={{ padding: '12px', background: 'var(--bg-elevated)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Pressure</div>
                  <div style={{ ...tempSmallStyle, color: 'var(--text-primary)' }}>{currentConditions.pressure}</div>
                </div>
                <div style={{ padding: '12px', background: 'var(--bg-elevated)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Visibility</div>
                  <div style={{ ...tempSmallStyle, color: 'var(--text-primary)' }}>{currentConditions.visibility}</div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ padding: '12px', background: 'var(--bg-elevated)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>UV Index</div>
                  <div style={{ ...tempSmallStyle, color: 'var(--text-primary)' }}>{currentConditions.uvIndex} Low</div>
                </div>
                <div style={{ padding: '12px', background: 'var(--bg-elevated)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Wind</div>
                  <div style={{ ...tempSmallStyle, color: 'var(--text-primary)' }}>{currentConditions.wind}</div>
                </div>
                <div style={{ padding: '12px', background: 'rgba(224, 242, 254, 0.1)', borderRadius: '8px', gridColumn: 'span 2' }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Snow on Ground</div>
                  <div style={{ ...tempSmallStyle, color: '#e0f2fe' }}>{currentConditions.snowDepth}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="content-grid">
            <div className="main-content">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Our Services</h3>
                </div>
                <div className="service-grid">
                  <div className="service-card" onClick={() => navigate('/weather/forecasts')}>
                    <div className="service-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <circle cx="12" cy="12" r="5"/>
                        <line x1="12" y1="1" x2="12" y2="3"/>
                        <line x1="12" y1="21" x2="12" y2="23"/>
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                        <line x1="1" y1="12" x2="3" y2="12"/>
                        <line x1="21" y1="12" x2="23" y2="12"/>
                      </svg>
                    </div>
                    <h4>Weather Forecasts</h4>
                    <p>7-day and extended forecasts with snow accumulation predictions</p>
                  </div>
                  <div className="service-card" onClick={() => navigate('/weather/alerts')}>
                    <div className="service-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                        <line x1="12" y1="9" x2="12" y2="13"/>
                        <line x1="12" y1="17" x2="12.01" y2="17"/>
                      </svg>
                    </div>
                    <h4>Weather Alerts</h4>
                    <p>Winter storm warnings, blizzard alerts, and frost advisories</p>
                  </div>
                  <div className="service-card" onClick={() => navigate('/weather/radar')}>
                    <div className="service-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <circle cx="12" cy="12" r="10"/>
                        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
                      </svg>
                    </div>
                    <h4>Radar & Satellite</h4>
                    <p>Live precipitation radar and satellite imagery</p>
                  </div>
                  <div className="service-card" onClick={() => navigate('/weather/climate')}>
                    <div className="service-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <line x1="18" y1="20" x2="18" y2="10"/>
                        <line x1="12" y1="20" x2="12" y2="4"/>
                        <line x1="6" y1="20" x2="6" y2="14"/>
                      </svg>
                    </div>
                    <h4>Climate Data</h4>
                    <p>Historical snowfall records and temperature trends</p>
                  </div>
                  <div className="service-card" onClick={() => navigate('/weather/marine')}>
                    <div className="service-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M2 12h20"/>
                        <path d="M2 12c2-3 6-3 8 0s6 3 8 0"/>
                        <path d="M2 16c2-3 6-3 8 0s6 3 8 0"/>
                        <path d="M2 8c2-3 6-3 8 0s6 3 8 0"/>
                      </svg>
                    </div>
                    <h4>Marine Weather</h4>
                    <p>Coastal forecasts, sea ice warnings, and tide tables</p>
                  </div>
                  <div className="service-card" onClick={() => navigate('/weather/forecasts')}>
                    <div className="service-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M12 2v20M4.93 4.93l14.14 14.14M2 12h20M4.93 19.07l14.14-14.14"/>
                      </svg>
                    </div>
                    <h4>Snow Reports</h4>
                    <p>Daily snowfall, accumulation, and road conditions</p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Latest Weather Updates</h3>
                </div>
                <div className="news-item">
                  <span className="news-date">Jan 25, 2026</span>
                  <h4 className="news-title">Winter Storm Warning: 15-25 cm Snow Expected</h4>
                  <p className="news-excerpt">A Pacific storm system will bring significant snowfall to Praya City and surrounding areas through Tuesday. Expect reduced visibility and hazardous driving conditions.</p>
                </div>
                <div className="news-item">
                  <span className="news-date">Jan 23, 2026</span>
                  <h4 className="news-title">Seasonal Snowpack Above Average</h4>
                  <p className="news-excerpt">Mountain snowpack is currently at 118% of normal for this time of year, indicating good water reserves for the summer months.</p>
                </div>
                <div className="news-item">
                  <span className="news-date">Jan 20, 2026</span>
                  <h4 className="news-title">New Mountain Weather Station Online</h4>
                  <p className="news-excerpt">The Western Highlands weather station is now operational at 1,450m elevation, improving high-altitude forecasting accuracy.</p>
                </div>
                <div className="news-item">
                  <span className="news-date">Jan 15, 2026</span>
                  <h4 className="news-title">February Outlook: Continued Cold and Snowy</h4>
                  <p className="news-excerpt">Long-range models indicate above-normal snowfall and below-normal temperatures for February, typical of Praya's Hokkaido-like winter pattern.</p>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Regional Observations</h3>
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr>
                        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '12px' }}>Location</th>
                        <th style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '12px' }}>Temp</th>
                        <th style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '12px' }}>Condition</th>
                        <th style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '12px' }}>Wind</th>
                        <th style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '12px' }}>Snow</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { loc: 'Praya City', temp: 2, cond: 'Light Snow', wind: '18 NW', snow: '45 cm' },
                        { loc: 'Downtown', temp: 3, cond: 'Cloudy', wind: '15 NW', snow: '42 cm' },
                        { loc: 'Surowski Valley', temp: -1, cond: 'Snow', wind: '22 W', snow: '58 cm' },
                        { loc: 'Western District', temp: 1, cond: 'Light Snow', wind: '20 NW', snow: '52 cm' },
                        { loc: 'Braemar', temp: -3, cond: 'Heavy Snow', wind: '25 W', snow: '72 cm' },
                        { loc: 'Oakville', temp: -2, cond: 'Snow Showers', wind: '18 NW', snow: '65 cm' },
                        { loc: 'Western Highlands', temp: -8, cond: 'Blowing Snow', wind: '45 W', snow: '185 cm' },
                        { loc: 'Northern Province', temp: -5, cond: 'Light Snow', wind: '30 N', snow: '95 cm' }
                      ].map((row, idx) => (
                        <tr key={idx}>
                          <td style={{ padding: '12px', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-primary)', fontWeight: '500' }}>{row.loc}</td>
                          <td style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid var(--border-subtle)', ...tempSmallStyle, color: row.temp < 0 ? '#60a5fa' : 'var(--text-secondary)' }}>{row.temp}°C</td>
                          <td style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', fontSize: '13px' }}>{row.cond}</td>
                          <td style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', fontSize: '13px' }}>{row.wind}</td>
                          <td style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid var(--border-subtle)', color: '#e0f2fe', fontSize: '13px' }}>{row.snow}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <aside className="sidebar">
              <div className="card">
                <h4 className="card-title">Quick Actions</h4>
                <div className="quick-link" onClick={() => navigate('/weather/forecasts')}>
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <circle cx="12" cy="12" r="5"/>
                      <line x1="12" y1="1" x2="12" y2="3"/>
                    </svg>
                  </span>
                  Today's Forecast
                </div>
                <div className="quick-link" onClick={() => navigate('/weather/alerts')}>
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                    </svg>
                  </span>
                  Check Alerts
                </div>
                <div className="quick-link" onClick={() => navigate('/weather/radar')}>
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <circle cx="12" cy="12" r="10"/>
                      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
                    </svg>
                  </span>
                  View Radar
                </div>
                <div className="quick-link" onClick={() => navigate('/weather/forecasts')}>
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M12 2v20M4.93 4.93l14.14 14.14"/>
                    </svg>
                  </span>
                  Snow Report
                </div>
              </div>

              <div className="info-box">
                <h4>Winter Storm Warning</h4>
                <p>In effect until Tuesday 6:00 PM. Expect 15-25 cm of snow with reduced visibility.</p>
              </div>

              <div className="card" style={{ marginTop: '16px' }}>
                <h4 className="card-title">Road Conditions</h4>
                <div style={{ fontSize: '13px', lineHeight: '1.8' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                    <span>Highway 1 (City)</span>
                    <span style={{ color: '#f59e0b' }}>Snow Covered</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                    <span>Highway 2 (North)</span>
                    <span style={{ color: '#ef4444' }}>Poor</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                    <span>Mountain Pass</span>
                    <span style={{ color: '#ef4444' }}>Closed</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                    <span>Coastal Route</span>
                    <span style={{ color: '#10b981' }}>Good</span>
                  </div>
                </div>
              </div>

              <div className="warning-box" style={{ marginTop: '16px' }}>
                <h4>Emergency Hotline</h4>
                <p>Weather Emergency: <strong>1-800-WEATHER</strong><br/>Road Conditions: <strong>1-800-ROADS</strong><br/>Available 24/7</p>
              </div>

              <div className="card" style={{ marginTop: '16px' }}>
                <h4 className="card-title">Sunrise/Sunset</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '8px' }}>
                  <div style={{ textAlign: 'center', padding: '12px', background: 'var(--bg-elevated)', borderRadius: '8px' }}>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Sunrise</div>
                    <div style={{ ...tempSmallStyle, color: '#f59e0b' }}>7:42 AM</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: '12px', background: 'var(--bg-elevated)', borderRadius: '8px' }}>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Sunset</div>
                    <div style={{ ...tempSmallStyle, color: '#6366f1' }}>4:58 PM</div>
                  </div>
                </div>
              </div>

              <div className="card" style={{ marginTop: '16px' }}>
                <h4 className="card-title">Parent Department</h4>
                <Link to="/interior" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  color: 'var(--text-primary)'
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                  <div>
                    <div style={{ fontWeight: '600' }}>Interior Department</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Parent Agency</div>
                  </div>
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  )
}

function Forecasts() {
  const [selectedRegion, setSelectedRegion] = useState('praya-city')

  const regions = [
    { id: 'praya-city', name: 'Praya City' },
    { id: 'downtown', name: 'Downtown' },
    { id: 'surowski-valley', name: 'Surowski Valley' },
    { id: 'western-district', name: 'Western District' },
    { id: 'braemar', name: 'Braemar' },
    { id: 'oakville', name: 'Oakville' },
    { id: 'western-highlands', name: 'Western Highlands' },
    { id: 'northern-province', name: 'Northern Province' },
    { id: 'southern-coast', name: 'Southern Coast' }
  ]

  // Temperate winter forecast (January - snow season)
  const forecast = [
    { day: 'Today', high: 1, low: -4, condition: 'Light Snow', precip: '80%', snow: '5-10 cm', icon: 'snow' },
    { day: 'Tomorrow', high: -1, low: -7, condition: 'Heavy Snow', precip: '90%', snow: '15-20 cm', icon: 'snow-heavy' },
    { day: 'Wednesday', high: -3, low: -9, condition: 'Snow Showers', precip: '60%', snow: '3-5 cm', icon: 'snow' },
    { day: 'Thursday', high: 0, low: -5, condition: 'Cloudy', precip: '20%', snow: '0 cm', icon: 'cloud' },
    { day: 'Friday', high: 2, low: -3, condition: 'Partly Cloudy', precip: '10%', snow: '0 cm', icon: 'cloud-sun' },
    { day: 'Saturday', high: 3, low: -2, condition: 'Mostly Sunny', precip: '5%', snow: '0 cm', icon: 'sun' },
    { day: 'Sunday', high: 1, low: -5, condition: 'Light Snow', precip: '70%', snow: '5-8 cm', icon: 'snow' }
  ]

  const getWeatherIcon = (type) => {
    switch (type) {
      case 'sun':
        return (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/>
            <line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
        )
      case 'cloud-sun':
        return (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
          </svg>
        )
      case 'cloud':
        return (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
          </svg>
        )
      case 'snow':
        return (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"/>
            <line x1="8" y1="16" x2="8.01" y2="16"/>
            <line x1="8" y1="20" x2="8.01" y2="20"/>
            <line x1="12" y1="18" x2="12.01" y2="18"/>
            <line x1="12" y1="22" x2="12.01" y2="22"/>
            <line x1="16" y1="16" x2="16.01" y2="16"/>
            <line x1="16" y1="20" x2="16.01" y2="20"/>
          </svg>
        )
      case 'snow-heavy':
        return (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"/>
            <line x1="8" y1="16" x2="8.01" y2="16"/>
            <line x1="8" y1="20" x2="8.01" y2="20"/>
            <line x1="12" y1="18" x2="12.01" y2="18"/>
            <line x1="12" y1="22" x2="12.01" y2="22"/>
            <line x1="16" y1="16" x2="16.01" y2="16"/>
            <line x1="16" y1="20" x2="16.01" y2="20"/>
            <line x1="10" y1="14" x2="10.01" y2="14"/>
            <line x1="14" y1="14" x2="14.01" y2="14"/>
          </svg>
        )
      default:
        return (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
          </svg>
        )
    }
  }

  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/weather">Home</Link> / Forecasts
          </div>
          <h1>Weather Forecasts</h1>
          <p className="subtitle">7-day forecasts with snow accumulation predictions for all regions of Praya</p>
        </div>
      </div>
      <div className="container">
        <div className="card">
          <h4 className="card-title">Select Region</h4>
          <div className="form-group">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
            >
              {regions.map(region => (
                <option key={region.id} value={region.id}>{region.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="card" style={{ marginTop: '24px' }}>
          <h4 className="card-title">7-Day Forecast: {regions.find(r => r.id === selectedRegion)?.name}</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px', marginTop: '20px' }}>
            {forecast.map((day, index) => (
              <div key={index} style={{
                padding: '16px',
                background: index === 0 ? 'rgba(96, 165, 250, 0.1)' : 'var(--bg-card)',
                border: `1px solid ${index === 0 ? 'rgba(96, 165, 250, 0.3)' : 'var(--border-subtle)'}`,
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <div style={{ fontWeight: '600', marginBottom: '8px', color: 'var(--text-primary)' }}>{day.day}</div>
                <div style={{ margin: '12px 0', color: day.icon.includes('snow') ? '#e0f2fe' : 'var(--primary-color)' }}>{getWeatherIcon(day.icon)}</div>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>{day.condition}</div>
                <div style={{ ...tempMediumStyle, color: 'var(--text-primary)' }}>
                  {day.high}° / <span style={{ color: '#60a5fa' }}>{day.low}°</span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>
                  Precip: {day.precip}
                </div>
                {day.snow !== '0 cm' && (
                  <div style={{ fontSize: '12px', color: '#e0f2fe', marginTop: '4px', fontWeight: '500' }}>
                    Snow: {day.snow}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ marginTop: '24px' }}>
          <h4 className="card-title">Extended Outlook (Days 8-14)</h4>
          <div style={{ padding: '16px', background: 'var(--bg-elevated)', borderRadius: '8px', marginTop: '12px' }}>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '12px' }}>
              The extended outlook indicates continued cold temperatures with periodic snow events.
              An active pattern will bring several snow-producing systems through the region.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Temperature Trend</div>
                <div style={{ ...tempSmallStyle, color: '#60a5fa' }}>Below Normal</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Precipitation</div>
                <div style={{ ...tempSmallStyle, color: '#e0f2fe' }}>Above Normal</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Expected Snow</div>
                <div style={{ ...tempSmallStyle, color: '#e0f2fe' }}>30-50 cm</div>
              </div>
            </div>
          </div>
        </div>

        <div className="content-text" style={{ marginTop: '24px' }}>
          <h3>Forecast Information</h3>
          <ul>
            <li><strong>Updates</strong> - Forecasts are updated every 6 hours</li>
            <li><strong>Accuracy</strong> - 3-day forecasts are 90% accurate; 7-day are 80% accurate</li>
            <li><strong>Snow Accumulation</strong> - Predictions based on multiple weather models</li>
            <li><strong>Winter Driving</strong> - Check road conditions before travel during snow events</li>
            <li><strong>Mobile App</strong> - Download the Praya Weather app for push notifications</li>
          </ul>
        </div>

        <div className="info-box" style={{ marginTop: '24px' }}>
          <h4>About Praya's Climate</h4>
          <p>Praya experiences a temperate maritime climate similar to Juneau, Alaska or Sapporo, Japan. Winters (November-April) are cold and snowy with average temperatures of -5°C to 3°C. Annual snowfall averages 350-400 cm, with most snow falling between December and March.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '12px', marginTop: '24px' }}>
          <Link to="/weather/alerts" style={{
            padding: '16px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '12px',
            textDecoration: 'none',
            transition: 'all 0.2s'
          }}>
            <div style={{ fontWeight: '600', marginBottom: '6px', color: 'var(--text-primary)' }}>Weather Alerts</div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Check for winter storm warnings</div>
          </Link>
          <Link to="/weather/radar" style={{
            padding: '16px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '12px',
            textDecoration: 'none',
            transition: 'all 0.2s'
          }}>
            <div style={{ fontWeight: '600', marginBottom: '6px', color: 'var(--text-primary)' }}>Radar & Satellite</div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>View live precipitation radar</div>
          </Link>
        </div>
      </div>
    </main>
  )
}

function WeatherAlerts() {
  const [selectedType, setSelectedType] = useState('all')

  const alerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Winter Storm Warning',
      region: 'Praya City, Braemar, Western Highlands',
      issued: 'Jan 25, 2026 - 6:00 AM',
      expires: 'Jan 27, 2026 - 6:00 PM',
      description: 'Heavy snow expected with accumulations of 15-25 cm in lowland areas and 30-50 cm in higher elevations. Winds gusting to 50 km/h will create blowing and drifting snow with significantly reduced visibility. Travel is strongly discouraged.'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Wind Chill Warning',
      region: 'Western Highlands, Northern Province',
      issued: 'Jan 25, 2026 - 8:00 AM',
      expires: 'Jan 26, 2026 - 12:00 PM',
      description: 'Wind chill values as low as -25°C to -30°C expected. Frostbite can occur in as little as 10 minutes on exposed skin. Limit outdoor exposure and dress in layers.'
    },
    {
      id: 3,
      type: 'watch',
      title: 'Avalanche Watch',
      region: 'Western Highlands',
      issued: 'Jan 25, 2026 - 10:00 AM',
      expires: 'Jan 28, 2026 - 6:00 PM',
      description: 'Heavy snowfall combined with wind loading will create dangerous avalanche conditions in backcountry terrain. Avoid steep slopes and avalanche paths. Check avalanche forecasts before backcountry travel.'
    },
    {
      id: 4,
      type: 'advisory',
      title: 'Winter Weather Advisory',
      region: 'Southern Coast',
      issued: 'Jan 25, 2026 - 7:00 AM',
      expires: 'Jan 26, 2026 - 6:00 AM',
      description: 'Mixed precipitation expected with rain changing to snow overnight. 5-10 cm of snow accumulation possible. Roads may become slippery. Use caution while driving.'
    },
    {
      id: 5,
      type: 'advisory',
      title: 'Freezing Rain Advisory',
      region: 'Downtown, Surowski Valley',
      issued: 'Jan 25, 2026 - 2:00 PM',
      expires: 'Jan 26, 2026 - 8:00 AM',
      description: 'Brief period of freezing rain possible during the transition from rain to snow. Ice accumulation up to 3mm on untreated surfaces. Exercise extreme caution on bridges and overpasses.'
    }
  ]

  const getAlertStyle = (type) => {
    switch (type) {
      case 'warning':
        return { bg: 'rgba(239, 68, 68, 0.1)', border: 'rgba(239, 68, 68, 0.3)', color: '#ef4444' }
      case 'watch':
        return { bg: 'rgba(245, 158, 11, 0.1)', border: 'rgba(245, 158, 11, 0.3)', color: '#f59e0b' }
      case 'advisory':
        return { bg: 'rgba(96, 165, 250, 0.1)', border: 'rgba(96, 165, 250, 0.3)', color: '#60a5fa' }
      default:
        return { bg: 'var(--bg-card)', border: 'var(--border-subtle)', color: 'var(--text-primary)' }
    }
  }

  const filteredAlerts = selectedType === 'all' ? alerts : alerts.filter(a => a.type === selectedType)

  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/weather">Home</Link> / Alerts
          </div>
          <h1>Weather Alerts</h1>
          <p className="subtitle">Active watches, warnings, and advisories for Praya</p>
        </div>
      </div>
      <div className="container">
        <div className="card">
          <h4 className="card-title">Filter Alerts</h4>
          <div className="form-group">
            <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
              <option value="all">All Alerts ({alerts.length})</option>
              <option value="warning">Warnings ({alerts.filter(a => a.type === 'warning').length})</option>
              <option value="watch">Watches ({alerts.filter(a => a.type === 'watch').length})</option>
              <option value="advisory">Advisories ({alerts.filter(a => a.type === 'advisory').length})</option>
            </select>
          </div>
        </div>

        <div style={{ marginTop: '24px' }}>
          {filteredAlerts.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text-muted)', margin: '0 auto 16px' }} aria-hidden="true">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              <h4 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>No Active Alerts</h4>
              <p style={{ color: 'var(--text-muted)' }}>There are currently no active weather alerts for this category.</p>
            </div>
          ) : (
            filteredAlerts.map(alert => {
              const style = getAlertStyle(alert.type)
              return (
                <div key={alert.id} className="card" style={{
                  marginBottom: '16px',
                  background: style.bg,
                  borderColor: style.border
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '20px',
                      background: style.color,
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: '600',
                      textTransform: 'uppercase'
                    }}>
                      {alert.type}
                    </span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{alert.region}</span>
                  </div>
                  <h4 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>{alert.title}</h4>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '12px' }}>{alert.description}</p>
                  <div style={{ display: 'flex', gap: '24px', fontSize: '13px', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
                    <span><strong>Issued:</strong> {alert.issued}</span>
                    <span><strong>Expires:</strong> {alert.expires}</span>
                  </div>
                </div>
              )
            })
          )}
        </div>

        <div className="info-box" style={{ marginTop: '24px' }}>
          <h4>Alert Definitions</h4>
          <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
            <li><strong style={{ color: '#ef4444' }}>Warning:</strong> Dangerous winter conditions are occurring or imminent. Take action now to protect life and property.</li>
            <li><strong style={{ color: '#f59e0b' }}>Watch:</strong> Conditions are favorable for hazardous weather. Be prepared and monitor updates closely.</li>
            <li><strong style={{ color: '#60a5fa' }}>Advisory:</strong> Weather may cause inconvenience or be hazardous if caution is not exercised.</li>
          </ul>
        </div>

        <div className="warning-box" style={{ marginTop: '24px' }}>
          <h4>Winter Preparedness</h4>
          <p>During winter storms: Stay home if possible. If you must travel, carry emergency supplies including blankets, food, water, and a fully charged phone. Call 1-800-WEATHER for updates or 911 for emergencies.</p>
        </div>
      </div>
    </main>
  )
}

function Radar() {
  const [radarType, setRadarType] = useState('precipitation')
  const [isLoading, setIsLoading] = useState(false)

  const handleTypeChange = (type) => {
    setIsLoading(true)
    setRadarType(type)
    setTimeout(() => setIsLoading(false), 500)
  }

  // Using NOAA/GOES satellite imagery for realistic radar display
  const radarImages = {
    precipitation: 'https://cdn.star.nesdis.noaa.gov/GOES16/ABI/SECTOR/ne/GEOCOLOR/600x600.jpg',
    satellite: 'https://cdn.star.nesdis.noaa.gov/GOES16/ABI/CONUS/GEOCOLOR/625x375.jpg',
    infrared: 'https://cdn.star.nesdis.noaa.gov/GOES16/ABI/SECTOR/ne/13/600x600.jpg',
    water_vapor: 'https://cdn.star.nesdis.noaa.gov/GOES16/ABI/SECTOR/ne/09/600x600.jpg'
  }

  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/weather">Home</Link> / Radar
          </div>
          <h1>Radar & Satellite</h1>
          <p className="subtitle">Live weather radar, satellite imagery, and precipitation maps</p>
        </div>
      </div>
      <div className="container">
        <div className="card">
          <h4 className="card-title">Image Type</h4>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {[
              { id: 'precipitation', label: 'Precipitation' },
              { id: 'satellite', label: 'Visible Satellite' },
              { id: 'infrared', label: 'Infrared' },
              { id: 'water_vapor', label: 'Water Vapor' }
            ].map(type => (
              <button
                key={type.id}
                className={`btn ${radarType === type.id ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => handleTypeChange(type.id)}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        <div className="card" style={{ marginTop: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h4 className="card-title" style={{ margin: 0 }}>
              {radarType === 'precipitation' && 'Precipitation Radar'}
              {radarType === 'satellite' && 'Visible Satellite Imagery'}
              {radarType === 'infrared' && 'Infrared Satellite'}
              {radarType === 'water_vapor' && 'Water Vapor Imagery'}
            </h4>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Updated: {new Date().toLocaleTimeString()}
            </span>
          </div>
          <div style={{
            background: '#0a1628',
            borderRadius: '12px',
            border: '1px solid var(--border-subtle)',
            overflow: 'hidden',
            position: 'relative'
          }}>
            {isLoading ? (
              <div style={{
                height: '400px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  border: '3px solid var(--border-color)',
                  borderTopColor: 'var(--primary-color)',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
              </div>
            ) : (
              <div style={{ position: 'relative' }}>
                <img
                  src={radarImages[radarType]}
                  alt={`${radarType} radar imagery`}
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    minHeight: '300px',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'flex'
                  }}
                />
                <div style={{
                  display: 'none',
                  height: '400px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, rgba(30, 58, 95, 0.3) 0%, rgba(10, 22, 40, 0.8) 100%)'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--primary-color)', marginBottom: '16px' }} aria-hidden="true">
                      <circle cx="12" cy="12" r="10"/>
                      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                    <p style={{ color: 'var(--text-secondary)' }}>Satellite imagery temporarily unavailable</p>
                  </div>
                </div>
                <div style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '12px',
                  background: 'rgba(10, 22, 40, 0.85)',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  color: 'var(--text-muted)'
                }}>
                  Source: NOAA/NESDIS GOES Satellite
                </div>
              </div>
            )}
            <style>{`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        </div>

        <div className="card" style={{ marginTop: '24px' }}>
          <h4 className="card-title">Precipitation Legend</h4>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '20px', height: '20px', background: '#00ff00', borderRadius: '4px' }}></div>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Light Rain/Snow</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '20px', height: '20px', background: '#ffff00', borderRadius: '4px' }}></div>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Moderate</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '20px', height: '20px', background: '#ff9900', borderRadius: '4px' }}></div>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Heavy</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '20px', height: '20px', background: '#ff0000', borderRadius: '4px' }}></div>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Very Heavy</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '20px', height: '20px', background: '#ff00ff', borderRadius: '4px' }}></div>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Extreme</span>
            </div>
          </div>
        </div>

        <div className="license-grid" style={{ marginTop: '24px' }}>
          <div className="license-card">
            <h4>Doppler Radar</h4>
            <span className="code">RADAR-D</span>
            <p>Real-time precipitation detection with velocity data</p>
          </div>
          <div className="license-card">
            <h4>Snow Radar</h4>
            <span className="code">RADAR-S</span>
            <p>Specialized mode for detecting frozen precipitation</p>
          </div>
          <div className="license-card">
            <h4>Satellite IR</h4>
            <span className="code">SAT-IR</span>
            <p>Cloud top temperatures for storm intensity analysis</p>
          </div>
          <div className="license-card">
            <h4>Water Vapor</h4>
            <span className="code">SAT-WV</span>
            <p>Atmospheric moisture for storm development tracking</p>
          </div>
        </div>

        <div className="info-box" style={{ marginTop: '24px' }}>
          <h4>Radar Coverage</h4>
          <p>Praya's weather radar network consists of 5 Doppler radar stations providing complete coverage of all regions. During winter, specialized snow mode provides enhanced detection of light snow and freezing precipitation. Data is updated every 5 minutes.</p>
        </div>
      </div>
    </main>
  )
}

function Climate() {
  const [selectedYear, setSelectedYear] = useState('2025')
  const [selectedMetric, setSelectedMetric] = useState('temperature')

  // Temperate climate data similar to Juneau/Vancouver/Hokkaido
  const climateData = {
    temperature: { avg: '7.2°C', high: '32°C', low: '-18°C', trend: '+0.2°C/decade' },
    precipitation: { avg: '1,850 mm', high: '2,400 mm', low: '1,450 mm', trend: '+3%/decade' },
    snowfall: { avg: '385 cm', high: '520 cm', low: '280 cm', trend: '-2%/decade' }
  }

  // Monthly data for temperate maritime climate with snowy winters
  const monthlyData = [
    { month: 'Jan', avgTemp: -2, highTemp: 2, lowTemp: -6, precip: 145, snow: 65 },
    { month: 'Feb', avgTemp: -1, highTemp: 3, lowTemp: -5, precip: 120, snow: 55 },
    { month: 'Mar', avgTemp: 2, highTemp: 7, lowTemp: -2, precip: 110, snow: 45 },
    { month: 'Apr', avgTemp: 7, highTemp: 12, lowTemp: 2, precip: 95, snow: 15 },
    { month: 'May', avgTemp: 11, highTemp: 16, lowTemp: 6, precip: 90, snow: 0 },
    { month: 'Jun', avgTemp: 14, highTemp: 19, lowTemp: 10, precip: 85, snow: 0 },
    { month: 'Jul', avgTemp: 17, highTemp: 22, lowTemp: 13, precip: 95, snow: 0 },
    { month: 'Aug', avgTemp: 17, highTemp: 22, lowTemp: 13, precip: 110, snow: 0 },
    { month: 'Sep', avgTemp: 14, highTemp: 18, lowTemp: 10, precip: 145, snow: 0 },
    { month: 'Oct', avgTemp: 9, highTemp: 13, lowTemp: 5, precip: 175, snow: 5 },
    { month: 'Nov', avgTemp: 4, highTemp: 7, lowTemp: 0, precip: 165, snow: 35 },
    { month: 'Dec', avgTemp: 0, highTemp: 3, lowTemp: -4, precip: 155, snow: 60 }
  ]

  const currentData = climateData[selectedMetric]

  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/weather">Home</Link> / Climate
          </div>
          <h1>Climate Data</h1>
          <p className="subtitle">Historical climate records, snowfall data, and temperature trends for Praya</p>
        </div>
      </div>
      <div className="container">
        <div className="card">
          <h4 className="card-title">Select Data</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label>Year</label>
              <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
              </select>
            </div>
            <div className="form-group">
              <label>Metric</label>
              <select value={selectedMetric} onChange={(e) => setSelectedMetric(e.target.value)}>
                <option value="temperature">Temperature</option>
                <option value="precipitation">Precipitation</option>
                <option value="snowfall">Snowfall</option>
              </select>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '24px' }}>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>Average</div>
            <div style={{ ...tempMediumStyle, fontSize: '28px', color: 'var(--primary-color)' }}>{currentData.avg}</div>
          </div>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>Record High</div>
            <div style={{ ...tempMediumStyle, fontSize: '28px', color: '#f59e0b' }}>{currentData.high}</div>
          </div>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>Record Low</div>
            <div style={{ ...tempMediumStyle, fontSize: '28px', color: '#60a5fa' }}>{currentData.low}</div>
          </div>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>Trend</div>
            <div style={{ ...tempMediumStyle, fontSize: '28px', color: 'var(--text-primary)' }}>{currentData.trend}</div>
          </div>
        </div>

        <div className="card" style={{ marginTop: '24px' }}>
          <h4 className="card-title">Monthly Climate Normals (1991-2020)</h4>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '16px' }}>
              <thead>
                <tr>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '12px' }}>Month</th>
                  <th style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '12px' }}>Avg (°C)</th>
                  <th style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '12px' }}>High (°C)</th>
                  <th style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '12px' }}>Low (°C)</th>
                  <th style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '12px' }}>Rain (mm)</th>
                  <th style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '12px' }}>Snow (cm)</th>
                </tr>
              </thead>
              <tbody>
                {monthlyData.map((row, index) => (
                  <tr key={index}>
                    <td style={{ padding: '12px', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-primary)', fontWeight: '500' }}>{row.month}</td>
                    <td style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid var(--border-subtle)', ...tempSmallStyle, color: row.avgTemp < 0 ? '#60a5fa' : 'var(--text-secondary)' }}>{row.avgTemp}</td>
                    <td style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', fontSize: '14px' }}>{row.highTemp}</td>
                    <td style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid var(--border-subtle)', color: row.lowTemp < 0 ? '#60a5fa' : 'var(--text-secondary)', fontSize: '14px' }}>{row.lowTemp}</td>
                    <td style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', fontSize: '14px' }}>{row.precip}</td>
                    <td style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid var(--border-subtle)', color: row.snow > 0 ? '#e0f2fe' : 'var(--text-muted)', fontSize: '14px', fontWeight: row.snow > 0 ? '500' : '400' }}>{row.snow}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr style={{ background: 'var(--bg-elevated)' }}>
                  <td style={{ padding: '12px', fontWeight: '600', color: 'var(--text-primary)' }}>Annual</td>
                  <td style={{ padding: '12px', textAlign: 'right', ...tempSmallStyle, color: 'var(--text-primary)' }}>7.2</td>
                  <td style={{ padding: '12px', textAlign: 'right', color: 'var(--text-primary)', fontWeight: '500' }}>12</td>
                  <td style={{ padding: '12px', textAlign: 'right', color: 'var(--text-primary)', fontWeight: '500' }}>2</td>
                  <td style={{ padding: '12px', textAlign: 'right', color: 'var(--text-primary)', fontWeight: '500' }}>1,490</td>
                  <td style={{ padding: '12px', textAlign: 'right', color: '#e0f2fe', fontWeight: '600' }}>385</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <div className="card" style={{ marginTop: '24px' }}>
          <h4 className="card-title">Climate Classification</h4>
          <div style={{ padding: '16px', background: 'var(--bg-elevated)', borderRadius: '8px', marginTop: '12px' }}>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
              Praya has a <strong>humid continental climate (Köppen: Dfb)</strong> with strong oceanic influences,
              similar to Sapporo (Japan), Juneau (Alaska), and coastal British Columbia. The maritime influence
              moderates temperatures while delivering significant precipitation year-round.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Winter (Nov-Apr)</div>
                <div style={{ color: '#60a5fa', fontWeight: '500' }}>Cold & Snowy</div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>-5°C to 5°C avg</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Summer (May-Oct)</div>
                <div style={{ color: '#10b981', fontWeight: '500' }}>Mild & Pleasant</div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>12°C to 18°C avg</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Snow Season</div>
                <div style={{ color: '#e0f2fe', fontWeight: '500' }}>November - April</div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>385 cm annual avg</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Frost-Free Days</div>
                <div style={{ color: '#f59e0b', fontWeight: '500' }}>145 days</div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Mid-May to early Oct</div>
              </div>
            </div>
          </div>
        </div>

        <div className="content-text" style={{ marginTop: '24px' }}>
          <h3>Climate Services</h3>
          <ul>
            <li><strong>Historical Data</strong> - Access temperature and precipitation records dating back to 1950</li>
            <li><strong>Snowfall Archives</strong> - Daily snowfall measurements and snow depth records</li>
            <li><strong>Climate Reports</strong> - Annual and seasonal climate summaries</li>
            <li><strong>Research Support</strong> - Data for academic and commercial research</li>
            <li><strong>API Access</strong> - Programmatic access to climate data</li>
          </ul>
        </div>

        <div className="info-box" style={{ marginTop: '24px' }}>
          <h4>Data Request</h4>
          <p>For detailed historical data, snowfall records, or custom reports, contact the Climate Services Division at climate@nws.praya.gov or call 1-800-CLIMATE.</p>
        </div>
      </div>
    </main>
  )
}

function Marine() {
  const [selectedZone, setSelectedZone] = useState('coastal-waters')

  const zones = [
    { id: 'coastal-waters', name: 'Coastal Waters (0-20nm)' },
    { id: 'offshore', name: 'Offshore Waters (20-60nm)' },
    { id: 'high-seas', name: 'High Seas (60nm+)' },
    { id: 'ports', name: 'Ports & Harbors' }
  ]

  // Cold water marine conditions for temperate climate
  const marineConditions = {
    'coastal-waters': {
      windSpeed: '20-25 knots',
      windDirection: 'NW',
      waveHeight: '2-3 meters',
      swellPeriod: '9 seconds',
      visibility: 'Moderate (5-10nm)',
      seaTemp: '6°C',
      iceWarning: 'None'
    },
    'offshore': {
      windSpeed: '25-35 knots',
      windDirection: 'W',
      waveHeight: '3-5 meters',
      swellPeriod: '11 seconds',
      visibility: 'Poor (<5nm)',
      seaTemp: '5°C',
      iceWarning: 'None'
    },
    'high-seas': {
      windSpeed: '35-45 knots',
      windDirection: 'W',
      waveHeight: '5-7 meters',
      swellPeriod: '13 seconds',
      visibility: 'Very Poor (<2nm)',
      seaTemp: '4°C',
      iceWarning: 'Growlers possible'
    },
    'ports': {
      windSpeed: '15-20 knots',
      windDirection: 'NW',
      waveHeight: '0.5-1 meter',
      swellPeriod: '6 seconds',
      visibility: 'Good (>10nm)',
      seaTemp: '7°C',
      iceWarning: 'Shore ice forming'
    }
  }

  const currentConditions = marineConditions[selectedZone]

  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/weather">Home</Link> / Marine
          </div>
          <h1>Marine Weather</h1>
          <p className="subtitle">Coastal forecasts, sea conditions, and ice warnings for Praya waters</p>
        </div>
      </div>
      <div className="container">
        <div className="card">
          <h4 className="card-title">Select Marine Zone</h4>
          <div className="form-group">
            <select value={selectedZone} onChange={(e) => setSelectedZone(e.target.value)}>
              {zones.map(zone => (
                <option key={zone.id} value={zone.id}>{zone.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="card" style={{ marginTop: '24px' }}>
          <h4 className="card-title">Current Conditions: {zones.find(z => z.id === selectedZone)?.name}</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px', marginTop: '20px' }}>
            <div style={{ padding: '16px', background: 'rgba(96, 165, 250, 0.1)', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>Wind</div>
              <div style={{ ...tempSmallStyle, color: 'var(--text-primary)' }}>{currentConditions.windSpeed}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{currentConditions.windDirection}</div>
            </div>
            <div style={{ padding: '16px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>Waves</div>
              <div style={{ ...tempSmallStyle, color: 'var(--text-primary)' }}>{currentConditions.waveHeight}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Period: {currentConditions.swellPeriod}</div>
            </div>
            <div style={{ padding: '16px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>Visibility</div>
              <div style={{ ...tempSmallStyle, color: 'var(--text-primary)' }}>{currentConditions.visibility}</div>
            </div>
            <div style={{ padding: '16px', background: 'rgba(96, 165, 250, 0.1)', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>Sea Temp</div>
              <div style={{ ...tempSmallStyle, color: '#60a5fa' }}>{currentConditions.seaTemp}</div>
            </div>
            <div style={{ padding: '16px', background: 'rgba(224, 242, 254, 0.1)', borderRadius: '12px', textAlign: 'center', gridColumn: 'span 2' }}>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>Ice Conditions</div>
              <div style={{ ...tempSmallStyle, color: '#e0f2fe' }}>{currentConditions.iceWarning}</div>
            </div>
          </div>
        </div>

        <div className="warning-box" style={{ marginTop: '24px' }}>
          <h4>Gale Warning</h4>
          <p>Gale warning in effect for offshore and high seas waters. Winds 35-45 knots with seas building to 5-7 meters. All vessels should seek shelter or avoid the affected areas. Small craft should remain in port.</p>
        </div>

        <div className="card" style={{ marginTop: '24px' }}>
          <h4 className="card-title">Tide Tables - Praya Harbor</h4>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '12px' }}>
              <thead>
                <tr>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '12px' }}>Date</th>
                  <th style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '12px' }}>High Tide</th>
                  <th style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '12px' }}>Height</th>
                  <th style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '12px' }}>Low Tide</th>
                  <th style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '12px' }}>Height</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { date: 'Jan 25', high: '6:42 AM', highH: '4.2m', low: '12:58 PM', lowH: '0.8m' },
                  { date: 'Jan 26', high: '7:28 AM', highH: '4.0m', low: '1:45 PM', lowH: '1.0m' },
                  { date: 'Jan 27', high: '8:15 AM', highH: '3.8m', low: '2:32 PM', lowH: '1.2m' },
                  { date: 'Jan 28', high: '9:05 AM', highH: '3.6m', low: '3:22 PM', lowH: '1.4m' },
                ].map((row, idx) => (
                  <tr key={idx}>
                    <td style={{ padding: '12px', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-primary)', fontWeight: '500' }}>{row.date}</td>
                    <td style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-secondary)' }}>{row.high}</td>
                    <td style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid var(--border-subtle)', color: '#60a5fa' }}>{row.highH}</td>
                    <td style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-secondary)' }}>{row.low}</td>
                    <td style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid var(--border-subtle)', color: '#f59e0b' }}>{row.lowH}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="license-grid" style={{ marginTop: '24px' }}>
          <div className="license-card">
            <h4>Coastal Forecast</h4>
            <span className="code">MARINE-C</span>
            <p>Near-shore conditions including ice and hypothermia risk</p>
          </div>
          <div className="license-card">
            <h4>Offshore Forecast</h4>
            <span className="code">MARINE-O</span>
            <p>Extended range conditions for commercial vessels</p>
          </div>
          <div className="license-card">
            <h4>Ice Reports</h4>
            <span className="code">MARINE-I</span>
            <p>Sea ice extent and shore ice conditions</p>
          </div>
          <div className="license-card">
            <h4>Storm Tracking</h4>
            <span className="code">MARINE-ST</span>
            <p>Winter storm and nor'easter tracking</p>
          </div>
        </div>

        <div className="content-text" style={{ marginTop: '24px' }}>
          <h3>Marine Services</h3>
          <ul>
            <li><strong>VHF Weather</strong> - Continuous broadcasts on VHF WX channels</li>
            <li><strong>Ice Advisory</strong> - Shore ice and sea ice condition reports</li>
            <li><strong>Cold Water Safety</strong> - Hypothermia risk and survival time estimates</li>
            <li><strong>Port Forecasts</strong> - Detailed conditions for all major ports</li>
            <li><strong>Emergency Support</strong> - Search and rescue weather assistance</li>
          </ul>
        </div>

        <div className="info-box" style={{ marginTop: '24px' }}>
          <h4>Marine Emergency</h4>
          <p>For maritime emergencies, contact the Coast Guard on VHF Channel 16 or call 1-800-MAYDAY. Water temperature is currently 6°C - survival time in water without protective gear is approximately 1-2 hours. Always file a float plan before departing.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '12px', marginTop: '24px' }}>
          <Link to="/weather/forecasts" style={{
            padding: '16px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '12px',
            textDecoration: 'none',
            transition: 'all 0.2s'
          }}>
            <div style={{ fontWeight: '600', marginBottom: '6px', color: 'var(--text-primary)' }}>Land Forecasts</div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Weather forecasts for inland areas</div>
          </Link>
          <Link to="/weather/alerts" style={{
            padding: '16px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '12px',
            textDecoration: 'none',
            transition: 'all 0.2s'
          }}>
            <div style={{ fontWeight: '600', marginBottom: '6px', color: 'var(--text-primary)' }}>Weather Alerts</div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Active warnings and advisories</div>
          </Link>
        </div>
      </div>
    </main>
  )
}
