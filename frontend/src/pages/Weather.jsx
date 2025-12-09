import React, { useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import './Department.css'

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
              <span className="tagline">Interior Department</span>
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
              <p>Providing accurate weather forecasts and alerts to protect lives and property across Praya.</p>
            </div>
            <div className="footer-section">
              <h5>Services</h5>
              <ul>
                <li><Link to="/weather/forecasts">Weather Forecasts</Link></li>
                <li><Link to="/weather/alerts">Weather Alerts</Link></li>
                <li><Link to="/weather/radar">Radar & Maps</Link></li>
                <li><Link to="/weather/climate">Climate Data</Link></li>
                <li><Link to="/weather/marine">Marine Weather</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5>Resources</h5>
              <ul>
                <li><a href="#">Historical Data</a></li>
                <li><a href="#">API Access</a></li>
                <li><a href="#">Education</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5>Government</h5>
              <ul>
                <li><Link to="/">Gov Portal</Link></li>
                <li><Link to="/interior">Interior Department</Link></li>
                <li><Link to="/health">Health Department</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>&copy; 2024 Republic of Praya. National Weather Service.</span>
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

function WeatherHome({ navigate }) {
  // Simulated current conditions
  const currentConditions = {
    location: 'Praya City',
    temperature: 24,
    condition: 'Partly Cloudy',
    humidity: 65,
    wind: '12 km/h NE',
    feelsLike: 26
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
            <p>The National Weather Service provides accurate forecasts, severe weather warnings, and climate data to protect lives and property across the Republic of Praya.</p>
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
              <span className="stat-value">{currentConditions.temperature}°C</span>
              <span className="stat-change">{currentConditions.condition}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Humidity</span>
              <span className="stat-value">{currentConditions.humidity}%</span>
              <span className="stat-change">Praya City</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Wind</span>
              <span className="stat-value">{currentConditions.wind}</span>
              <span className="stat-change">Current</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Feels Like</span>
              <span className="stat-value">{currentConditions.feelsLike}°C</span>
              <span className="stat-change">Heat Index</span>
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
                    <p>7-day and extended forecasts for all regions</p>
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
                    <p>Severe weather warnings and advisories</p>
                  </div>
                  <div className="service-card" onClick={() => navigate('/weather/radar')}>
                    <div className="service-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <circle cx="12" cy="12" r="10"/>
                        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
                      </svg>
                    </div>
                    <h4>Radar & Maps</h4>
                    <p>Live radar imagery and weather maps</p>
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
                    <p>Historical records and climate reports</p>
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
                    <p>Coastal forecasts and sea conditions</p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Latest Weather Updates</h3>
                </div>
                <div className="news-item">
                  <span className="news-date">Dec 9, 2024</span>
                  <h4 className="news-title">Seasonal Outlook: Warm Dry Season Expected</h4>
                  <p className="news-excerpt">The NWS forecasts above-average temperatures and below-normal rainfall for the upcoming dry season.</p>
                </div>
                <div className="news-item">
                  <span className="news-date">Dec 5, 2024</span>
                  <h4 className="news-title">New Radar Station Online</h4>
                  <p className="news-excerpt">The Eastern Province radar station is now operational, improving coverage for mountain regions.</p>
                </div>
                <div className="news-item">
                  <span className="news-date">Nov 28, 2024</span>
                  <h4 className="news-title">Weather App Update Available</h4>
                  <p className="news-excerpt">Download the latest version of the Praya Weather app for improved alerts and forecasts.</p>
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
              </div>

              <div className="info-box">
                <h4>Emergency Hotline</h4>
                <p>Weather Emergency: <strong>1-800-WEATHER</strong><br/>Available 24/7</p>
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
  const [selectedRegion, setSelectedRegion] = React.useState('praya-city')

  const regions = [
    { id: 'praya-city', name: 'Praya City' },
    { id: 'northern-province', name: 'Northern Province' },
    { id: 'eastern-province', name: 'Eastern Province' },
    { id: 'southern-coast', name: 'Southern Coast' },
    { id: 'western-highlands', name: 'Western Highlands' }
  ]

  const forecast = [
    { day: 'Today', high: 26, low: 18, condition: 'Partly Cloudy', precip: '10%', icon: 'cloud-sun' },
    { day: 'Tomorrow', high: 28, low: 19, condition: 'Sunny', precip: '0%', icon: 'sun' },
    { day: 'Wednesday', high: 27, low: 20, condition: 'Mostly Sunny', precip: '5%', icon: 'sun' },
    { day: 'Thursday', high: 25, low: 18, condition: 'Scattered Showers', precip: '40%', icon: 'cloud-rain' },
    { day: 'Friday', high: 24, low: 17, condition: 'Thunderstorms', precip: '60%', icon: 'cloud-lightning' },
    { day: 'Saturday', high: 26, low: 18, condition: 'Partly Cloudy', precip: '20%', icon: 'cloud-sun' },
    { day: 'Sunday', high: 27, low: 19, condition: 'Sunny', precip: '5%', icon: 'sun' }
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
      case 'cloud-rain':
        return (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <line x1="16" y1="13" x2="16" y2="21"/>
            <line x1="8" y1="13" x2="8" y2="21"/>
            <line x1="12" y1="15" x2="12" y2="23"/>
            <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"/>
          </svg>
        )
      case 'cloud-lightning':
        return (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"/>
            <polyline points="13 11 9 17 15 17 11 23"/>
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
          <p className="subtitle">7-day forecasts for all regions of Praya</p>
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
                background: index === 0 ? 'rgba(59, 130, 246, 0.1)' : 'var(--bg-card)',
                border: `1px solid ${index === 0 ? 'rgba(59, 130, 246, 0.3)' : 'var(--border-subtle)'}`,
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <div style={{ fontWeight: '600', marginBottom: '8px', color: 'var(--text-primary)' }}>{day.day}</div>
                <div style={{ margin: '12px 0', color: 'var(--primary-color)' }}>{getWeatherIcon(day.icon)}</div>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>{day.condition}</div>
                <div style={{ fontWeight: '700', fontSize: '18px', color: 'var(--text-primary)' }}>
                  {day.high}° / {day.low}°
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>
                  Precip: {day.precip}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="content-text" style={{ marginTop: '24px' }}>
          <h3>Forecast Information</h3>
          <ul>
            <li><strong>Updates</strong> - Forecasts are updated every 6 hours</li>
            <li><strong>Accuracy</strong> - 3-day forecasts are 90% accurate; 7-day are 80% accurate</li>
            <li><strong>Severe Weather</strong> - Check the Alerts page for watches and warnings</li>
            <li><strong>Mobile App</strong> - Download the Praya Weather app for push notifications</li>
          </ul>
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
            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Check for active warnings</div>
          </Link>
          <Link to="/weather/radar" style={{
            padding: '16px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '12px',
            textDecoration: 'none',
            transition: 'all 0.2s'
          }}>
            <div style={{ fontWeight: '600', marginBottom: '6px', color: 'var(--text-primary)' }}>Radar & Maps</div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>View live radar imagery</div>
          </Link>
        </div>
      </div>
    </main>
  )
}

function WeatherAlerts() {
  const [selectedType, setSelectedType] = React.useState('all')

  const alerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Thunderstorm Warning',
      region: 'Eastern Province',
      issued: 'Dec 9, 2024 - 2:30 PM',
      expires: 'Dec 9, 2024 - 8:00 PM',
      description: 'Severe thunderstorms expected with potential for damaging winds up to 80 km/h, heavy rainfall, and small hail. Seek shelter immediately if outdoors.'
    },
    {
      id: 2,
      type: 'watch',
      title: 'Flash Flood Watch',
      region: 'Southern Coast',
      issued: 'Dec 9, 2024 - 10:00 AM',
      expires: 'Dec 10, 2024 - 6:00 AM',
      description: 'Heavy rainfall may lead to flash flooding in low-lying areas and near streams. Monitor conditions and be prepared to move to higher ground.'
    },
    {
      id: 3,
      type: 'advisory',
      title: 'Heat Advisory',
      region: 'Praya City',
      issued: 'Dec 8, 2024 - 8:00 AM',
      expires: 'Dec 10, 2024 - 6:00 PM',
      description: 'Heat index values up to 38°C expected. Drink plenty of fluids, stay in air-conditioned rooms, and check on elderly neighbors.'
    }
  ]

  const getAlertStyle = (type) => {
    switch (type) {
      case 'warning':
        return { bg: 'rgba(239, 68, 68, 0.1)', border: 'rgba(239, 68, 68, 0.3)', color: '#ef4444' }
      case 'watch':
        return { bg: 'rgba(245, 158, 11, 0.1)', border: 'rgba(245, 158, 11, 0.3)', color: '#f59e0b' }
      case 'advisory':
        return { bg: 'rgba(59, 130, 246, 0.1)', border: 'rgba(59, 130, 246, 0.3)', color: '#3b82f6' }
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
              <option value="all">All Alerts</option>
              <option value="warning">Warnings</option>
              <option value="watch">Watches</option>
              <option value="advisory">Advisories</option>
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
                  <div style={{ display: 'flex', gap: '24px', fontSize: '13px', color: 'var(--text-muted)' }}>
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
            <li><strong style={{ color: '#ef4444' }}>Warning:</strong> Dangerous conditions are occurring or imminent. Take action now.</li>
            <li><strong style={{ color: '#f59e0b' }}>Watch:</strong> Conditions are favorable for dangerous weather. Be prepared.</li>
            <li><strong style={{ color: '#3b82f6' }}>Advisory:</strong> Weather may cause inconvenience. Use caution.</li>
          </ul>
        </div>

        <div className="warning-box" style={{ marginTop: '24px' }}>
          <h4>Emergency Preparedness</h4>
          <p>For severe weather emergencies, call the Emergency Hotline at 1-800-WEATHER or contact local emergency services at 911.</p>
        </div>
      </div>
    </main>
  )
}

function Radar() {
  const [radarType, setRadarType] = React.useState('precipitation')
  const [isLoading, setIsLoading] = React.useState(false)

  const handleTypeChange = (type) => {
    setIsLoading(true)
    setRadarType(type)
    setTimeout(() => setIsLoading(false), 500)
  }

  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/weather">Home</Link> / Radar
          </div>
          <h1>Radar & Maps</h1>
          <p className="subtitle">Live weather radar and satellite imagery</p>
        </div>
      </div>
      <div className="container">
        <div className="card">
          <h4 className="card-title">Radar Type</h4>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {['precipitation', 'wind', 'temperature', 'satellite'].map(type => (
              <button
                key={type}
                className={`btn ${radarType === type ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => handleTypeChange(type)}
                style={{ textTransform: 'capitalize' }}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="card" style={{ marginTop: '24px' }}>
          <h4 className="card-title">{radarType.charAt(0).toUpperCase() + radarType.slice(1)} Radar</h4>
          <div style={{
            height: '400px',
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid var(--border-subtle)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {isLoading ? (
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  border: '3px solid var(--border-color)',
                  borderTopColor: 'var(--primary-color)',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  margin: '0 auto 16px'
                }} />
                <p style={{ color: 'var(--text-muted)' }}>Loading radar...</p>
              </div>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--primary-color)', marginBottom: '16px' }} aria-hidden="true">
                  <circle cx="12" cy="12" r="10"/>
                  <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  Interactive {radarType} radar for Praya
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
                  Last updated: {new Date().toLocaleTimeString()}
                </p>
              </div>
            )}
            <style>{`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        </div>

        <div className="license-grid" style={{ marginTop: '24px' }}>
          <div className="license-card">
            <h4>Precipitation</h4>
            <span className="code">RADAR-P</span>
            <p>Real-time precipitation intensity and movement</p>
          </div>
          <div className="license-card">
            <h4>Wind</h4>
            <span className="code">RADAR-W</span>
            <p>Wind speed and direction patterns</p>
          </div>
          <div className="license-card">
            <h4>Temperature</h4>
            <span className="code">RADAR-T</span>
            <p>Surface temperature distribution</p>
          </div>
          <div className="license-card">
            <h4>Satellite</h4>
            <span className="code">SAT-VIS</span>
            <p>Visible and infrared satellite imagery</p>
          </div>
        </div>

        <div className="info-box" style={{ marginTop: '24px' }}>
          <h4>Radar Coverage</h4>
          <p>Praya's weather radar network consists of 5 stations providing complete coverage of all regions. Data is updated every 5 minutes.</p>
        </div>
      </div>
    </main>
  )
}

function Climate() {
  const [selectedYear, setSelectedYear] = React.useState('2024')
  const [selectedMetric, setSelectedMetric] = React.useState('temperature')

  const climateData = {
    temperature: { avg: '24.5°C', high: '38°C', low: '12°C', trend: '+0.3°C/decade' },
    precipitation: { avg: '1,450 mm', high: '2,100 mm', low: '980 mm', trend: '-2%/decade' },
    humidity: { avg: '72%', high: '95%', low: '45%', trend: '+1%/decade' }
  }

  const monthlyData = [
    { month: 'Jan', temp: 22, rain: 180 },
    { month: 'Feb', temp: 23, rain: 160 },
    { month: 'Mar', temp: 25, rain: 120 },
    { month: 'Apr', temp: 27, rain: 80 },
    { month: 'May', temp: 28, rain: 60 },
    { month: 'Jun', temp: 27, rain: 90 },
    { month: 'Jul', temp: 26, rain: 110 },
    { month: 'Aug', temp: 26, rain: 130 },
    { month: 'Sep', temp: 25, rain: 150 },
    { month: 'Oct', temp: 24, rain: 170 },
    { month: 'Nov', temp: 23, rain: 190 },
    { month: 'Dec', temp: 22, rain: 210 }
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
          <p className="subtitle">Historical climate records and trends for Praya</p>
        </div>
      </div>
      <div className="container">
        <div className="card">
          <h4 className="card-title">Select Data</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label>Year</label>
              <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
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
                <option value="humidity">Humidity</option>
              </select>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '24px' }}>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>Average</div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--primary-color)' }}>{currentData.avg}</div>
          </div>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>Record High</div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: '#ef4444' }}>{currentData.high}</div>
          </div>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>Record Low</div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: '#3b82f6' }}>{currentData.low}</div>
          </div>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>Trend</div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--text-primary)' }}>{currentData.trend}</div>
          </div>
        </div>

        <div className="card" style={{ marginTop: '24px' }}>
          <h4 className="card-title">Monthly Averages ({selectedYear})</h4>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '16px' }}>
              <thead>
                <tr>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '13px' }}>Month</th>
                  <th style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '13px' }}>Avg Temp (°C)</th>
                  <th style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '13px' }}>Rainfall (mm)</th>
                </tr>
              </thead>
              <tbody>
                {monthlyData.map((row, index) => (
                  <tr key={index}>
                    <td style={{ padding: '12px', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}>{row.month}</td>
                    <td style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-secondary)' }}>{row.temp}</td>
                    <td style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-secondary)' }}>{row.rain}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="content-text" style={{ marginTop: '24px' }}>
          <h3>Climate Services</h3>
          <ul>
            <li><strong>Historical Data</strong> - Access records dating back to 1950</li>
            <li><strong>Climate Reports</strong> - Annual and seasonal climate summaries</li>
            <li><strong>Research Support</strong> - Data for academic and commercial research</li>
            <li><strong>API Access</strong> - Programmatic access to climate data</li>
          </ul>
        </div>

        <div className="info-box" style={{ marginTop: '24px' }}>
          <h4>Data Request</h4>
          <p>For detailed historical data or custom reports, contact the Climate Services Division at climate@nws.praya.gov or call 1-800-CLIMATE.</p>
        </div>
      </div>
    </main>
  )
}

function Marine() {
  const [selectedZone, setSelectedZone] = React.useState('coastal-waters')

  const zones = [
    { id: 'coastal-waters', name: 'Coastal Waters (0-20nm)' },
    { id: 'offshore', name: 'Offshore Waters (20-60nm)' },
    { id: 'high-seas', name: 'High Seas (60nm+)' },
    { id: 'ports', name: 'Ports & Harbors' }
  ]

  const marineConditions = {
    'coastal-waters': {
      windSpeed: '15-20 knots',
      windDirection: 'NE',
      waveHeight: '1-2 meters',
      swellPeriod: '8 seconds',
      visibility: 'Good (>10nm)',
      seaTemp: '26°C'
    },
    'offshore': {
      windSpeed: '20-25 knots',
      windDirection: 'NE',
      waveHeight: '2-3 meters',
      swellPeriod: '10 seconds',
      visibility: 'Good (>10nm)',
      seaTemp: '25°C'
    },
    'high-seas': {
      windSpeed: '25-30 knots',
      windDirection: 'E',
      waveHeight: '3-4 meters',
      swellPeriod: '12 seconds',
      visibility: 'Moderate (5-10nm)',
      seaTemp: '24°C'
    },
    'ports': {
      windSpeed: '10-15 knots',
      windDirection: 'NE',
      waveHeight: '0.5-1 meter',
      swellPeriod: '6 seconds',
      visibility: 'Excellent (>15nm)',
      seaTemp: '27°C'
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
          <p className="subtitle">Coastal forecasts and sea conditions for Praya waters</p>
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
            <div style={{ padding: '16px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>Wind</div>
              <div style={{ fontWeight: '700', fontSize: '18px', color: 'var(--text-primary)' }}>{currentConditions.windSpeed}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{currentConditions.windDirection}</div>
            </div>
            <div style={{ padding: '16px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>Waves</div>
              <div style={{ fontWeight: '700', fontSize: '18px', color: 'var(--text-primary)' }}>{currentConditions.waveHeight}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Period: {currentConditions.swellPeriod}</div>
            </div>
            <div style={{ padding: '16px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>Visibility</div>
              <div style={{ fontWeight: '700', fontSize: '18px', color: 'var(--text-primary)' }}>{currentConditions.visibility}</div>
            </div>
            <div style={{ padding: '16px', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>Sea Temp</div>
              <div style={{ fontWeight: '700', fontSize: '18px', color: 'var(--text-primary)' }}>{currentConditions.seaTemp}</div>
            </div>
          </div>
        </div>

        <div className="warning-box" style={{ marginTop: '24px' }}>
          <h4>Marine Advisory</h4>
          <p>Small craft advisory in effect for offshore waters. Inexperienced mariners should avoid navigating in these conditions. Monitor VHF Channel 16 for updates.</p>
        </div>

        <div className="license-grid" style={{ marginTop: '24px' }}>
          <div className="license-card">
            <h4>Coastal Forecast</h4>
            <span className="code">MARINE-C</span>
            <p>Near-shore conditions for recreational boating</p>
          </div>
          <div className="license-card">
            <h4>Offshore Forecast</h4>
            <span className="code">MARINE-O</span>
            <p>Extended range conditions for commercial vessels</p>
          </div>
          <div className="license-card">
            <h4>Tide Tables</h4>
            <span className="code">MARINE-T</span>
            <p>High and low tide predictions for all ports</p>
          </div>
          <div className="license-card">
            <h4>Tropical Outlook</h4>
            <span className="code">MARINE-TR</span>
            <p>Tropical storm and hurricane tracking</p>
          </div>
        </div>

        <div className="content-text" style={{ marginTop: '24px' }}>
          <h3>Marine Services</h3>
          <ul>
            <li><strong>VHF Weather</strong> - Continuous broadcasts on VHF WX channels</li>
            <li><strong>NAVTEX</strong> - Maritime safety information broadcasts</li>
            <li><strong>Port Forecasts</strong> - Detailed conditions for all major ports</li>
            <li><strong>Emergency Support</strong> - Search and rescue weather assistance</li>
          </ul>
        </div>

        <div className="info-box" style={{ marginTop: '24px' }}>
          <h4>Marine Emergency</h4>
          <p>For maritime emergencies, contact the Coast Guard on VHF Channel 16 or call 1-800-MAYDAY. Always file a float plan before departing.</p>
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
