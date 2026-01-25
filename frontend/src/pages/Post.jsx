import React, { useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import './Department.css'

export default function Post() {
  const navigate = useNavigate()

  useEffect(() => {
    document.body.classList.add('theme-post')
    return () => document.body.classList.remove('theme-post')
  }, [])

  return (
    <>
      <header className="dept-header">
        <div className="container">
          <Link to="/post" className="dept-logo">
            <div className="logo-mark">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
                <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
                <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
              </svg>
            </div>
            <div className="logo-text">
              <h1>Praya Post</h1>
              <span className="tagline">Republic of Praya</span>
            </div>
          </Link>
          <nav className="nav">
            <Link to="/post" className="nav-link">Home</Link>
            <Link to="/post/track" className="nav-link">Track Package</Link>
            <Link to="/post/shipping" className="nav-link">Shipping</Link>
            <Link to="/post/stamps" className="nav-link">Stamps</Link>
          </nav>
        </div>
      </header>

      <Routes>
        <Route index element={<PostHome navigate={navigate} />} />
        <Route path="track" element={<TrackPackage />} />
        <Route path="shipping" element={<Shipping />} />
        <Route path="stamps" element={<Stamps />} />
      </Routes>

      <footer className="dept-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <h4>Praya Post</h4>
              <p>Your trusted postal service connecting communities across the Republic of Praya with reliable mail and package delivery.</p>
            </div>
            <div className="footer-section">
              <h5>Services</h5>
              <ul>
                <li><Link to="/post/track">Track Package</Link></li>
                <li><Link to="/post/shipping">Shipping Rates</Link></li>
                <li><Link to="/post/stamps">Buy Stamps</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5>Support</h5>
              <ul>
                <li><a href="tel:1-800-POST-PY">1-800-POST-PY</a></li>
                <li><a href="mailto:support@prayapost.gov.py">Email Support</a></li>
                <li><a href="tel:1-800-POST-PY">File Claim</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5>Government</h5>
              <ul>
                <li><Link to="/">Gov Portal</Link></li>
                <li><a href="#">Postal Regulations</a></li>
                <li><a href="#">Business Solutions</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>&copy; 2024 Republic of Praya. Praya Post.</span>
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

function PostHome({ navigate }) {
  const [trackingNumber, setTrackingNumber] = React.useState('')

  return (
    <div className="layout-utility">
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-bg-shape"></div>
          <div className="hero-bg-shape"></div>
          <div className="hero-bg-shape"></div>
        </div>
        <div className="hero-pattern"></div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-top">
              <div className="hero-text">
                <div className="hero-badge">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  </svg>
                  Postal Services
                </div>
                <h2>Delivering <span>Connections</span></h2>
                <p>Praya Post provides fast, reliable mail and package delivery services to every corner of the Republic. Track shipments, buy stamps, and access postal services online nationwide.</p>
              </div>
              <div className="hero-actions">
                <button className="btn btn-primary" onClick={() => navigate('/post/shipping')}>
                  Shipping Rates
                </button>
                <button className="btn btn-secondary" onClick={() => navigate('/post/stamps')}>
                  Buy Stamps
                </button>
              </div>
            </div>
            <div className="quick-search">
              <div className="search-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                Track Your Package
              </div>
              <div className="search-form">
                <input
                  type="text"
                  className="search-input"
                  placeholder="Enter tracking number (e.g., PY1234567890)"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                />
                <button className="search-button" onClick={() => navigate('/post/track')}>
                  Track Package
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Daily Deliveries</span>
              <span className="stat-value">1.8M</span>
              <span className="stat-change">Packages</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Post Offices</span>
              <span className="stat-value">842</span>
              <span className="stat-change">Nationwide</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">On-Time Delivery</span>
              <span className="stat-value">96.4%</span>
              <span className="stat-change">This Month</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Average Delivery</span>
              <span className="stat-value">2.1 days</span>
              <span className="stat-change">Domestic</span>
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
                  <h3 className="card-title">Postal Services</h3>
                </div>
                <div className="content-text">
                  <h4>Domestic Mail</h4>
                  <ul>
                    <li><strong>First Class Mail</strong> - Letters and postcards delivered in 1-3 business days</li>
                    <li><strong>Priority Mail</strong> - 1-2 day delivery with tracking and insurance up to $100</li>
                    <li><strong>Express Mail</strong> - Overnight delivery with guaranteed service</li>
                    <li><strong>Standard Post</strong> - Economical option for non-urgent mail, 2-8 days</li>
                  </ul>
                  <h4 style={{ marginTop: '20px' }}>Package Services</h4>
                  <ul>
                    <li><strong>Package tracking</strong> included on all Priority and Express shipments</li>
                    <li><strong>Signature confirmation</strong> available for important deliveries</li>
                    <li><strong>Insurance options</strong> up to $5,000 for valuable items</li>
                  </ul>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">International Shipping</h3>
                </div>
                <div className="content-text">
                  <p>Send packages and letters worldwide with Praya Post International:</p>
                  <ul>
                    <li>Global Express - 3-5 business days to major cities</li>
                    <li>International Priority - 6-10 business days</li>
                    <li>Economy International - 2-4 weeks, most affordable option</li>
                    <li>Customs forms and documentation assistance included</li>
                  </ul>
                  <p style={{ marginTop: '12px' }}><strong>Note:</strong> International shipments require customs declaration forms</p>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Service Updates</h3>
                </div>
                <div className="news-item">
                  <span className="news-date">Nov 30, 2024</span>
                  <h4 className="news-title">Extended Holiday Hours</h4>
                  <p className="news-excerpt">Post offices will remain open extended hours during the holiday season through December 24.</p>
                </div>
                <div className="news-item">
                  <span className="news-date">Nov 22, 2024</span>
                  <h4 className="news-title">New Package Lockers Installed</h4>
                  <p className="news-excerpt">Automated package pickup lockers now available at 50 locations across Praya City.</p>
                </div>
              </div>
            </div>

            <aside className="sidebar">
              <div className="card">
                <h4 className="card-title">Quick Services</h4>
                <div className="quick-link" onClick={() => navigate('/post/track')}>
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"/>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                  </span>
                  Track Package
                </div>
                <div className="quick-link">
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                      <circle cx="8.5" cy="7" r="4"/>
                      <line x1="20" y1="8" x2="20" y2="14"/>
                      <line x1="23" y1="11" x2="17" y2="11"/>
                    </svg>
                  </span>
                  Calculate Postage
                </div>
                <div className="quick-link">
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                      <line x1="1" y1="10" x2="23" y2="10"/>
                    </svg>
                  </span>
                  Buy Stamps Online
                </div>
                <div className="quick-link">
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </span>
                  Find Post Office
                </div>
              </div>

              <div className="info-box">
                <h4>Customer Service</h4>
                <p><strong>Phone:</strong> 1-800-POST-PY</p>
                <p><strong>Hours:</strong> Mon-Fri 8AM-6PM</p>
                <p><strong>Email:</strong> help@post.gov.py</p>
              </div>

              <div className="card">
                <h4 className="card-title">Popular Stamps</h4>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '12px' }}>
                  <p style={{ marginBottom: '8px' }}>First Class Letter: $0.68</p>
                  <p style={{ marginBottom: '8px' }}>Postcard: $0.48</p>
                  <p style={{ marginBottom: '8px' }}>International Letter: $1.45</p>
                  <p>Roll of 100: $68.00</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  )
}

function TrackPackage() {
  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/post">Home</Link> / Track Package
          </div>
          <h1>Track Your Package</h1>
          <p className="subtitle">Enter your tracking number to see delivery status</p>
        </div>
      </div>
      <div className="container">
        <div className="content-text">
          <h3>Package Tracking</h3>
          <p>Track your mail and packages using your tracking number. Tracking information is updated in real-time as your package moves through our network.</p>

          <div className="card" style={{ marginTop: '20px' }}>
            <h4 className="card-title">How to Track</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Enter your tracking number in the format below:</p>
            <ul style={{ marginBottom: '12px' }}>
              <li><strong>Priority Mail:</strong> PP1234567890PY (starts with PP)</li>
              <li><strong>Express Mail:</strong> EX9876543210PY (starts with EX)</li>
              <li><strong>International:</strong> IN4567891234PY (starts with IN)</li>
              <li><strong>Registered Mail:</strong> RM3456789012PY (starts with RM)</li>
            </ul>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Tip:</strong> Your tracking number can be found on your receipt or shipping confirmation email
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Tracking Updates</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Typical tracking events you may see:</p>
            <ul>
              <li><strong>Accepted:</strong> Package received at post office</li>
              <li><strong>In Transit:</strong> Package moving through postal network</li>
              <li><strong>Arrived at Facility:</strong> Package at regional distribution center</li>
              <li><strong>Out for Delivery:</strong> Package on delivery vehicle</li>
              <li><strong>Delivered:</strong> Package delivered to recipient</li>
              <li><strong>Available for Pickup:</strong> Held at post office</li>
            </ul>
          </div>

          <div className="card">
            <h4 className="card-title">Delivery Exceptions</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Common reasons for delivery delays:</p>
            <ul>
              <li>Weather conditions or natural disasters</li>
              <li>Incorrect or incomplete address</li>
              <li>Business closed or recipient unavailable</li>
              <li>Customs clearance delays (international shipments)</li>
              <li>Holiday volume</li>
            </ul>
          </div>

          <h3 style={{ marginTop: '32px' }}>Need Help?</h3>
          <p>If your tracking shows no updates for more than 5 business days, or if you need assistance:</p>
          <ul>
            <li>Call customer service: 1-800-POST-PY</li>
            <li>Visit your local post office with tracking number</li>
            <li>File a missing package inquiry online after 7 days</li>
          </ul>

          <div className="info-box" style={{ marginTop: '24px' }}>
            <h4>International Tracking</h4>
            <p>International packages may have limited tracking once they leave the Republic of Praya. Contact the destination country's postal service for updates once the package arrives.</p>
          </div>
        </div>
      </div>
    </main>
  )
}

function Shipping() {
  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/post">Home</Link> / Shipping
          </div>
          <h1>Shipping Rates & Services</h1>
          <p className="subtitle">Choose the right shipping option for your needs</p>
        </div>
      </div>
      <div className="container">
        <div className="content-text">
          <h3>Domestic Shipping Services</h3>

          <div className="card" style={{ marginTop: '20px' }}>
            <h4 className="card-title">First Class Mail</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Affordable option for letters, cards, and small packages.</p>
            <ul style={{ marginBottom: '12px' }}>
              <li><strong>Weight limit:</strong> Up to 500g (1.1 lbs)</li>
              <li><strong>Delivery time:</strong> 2-5 business days</li>
              <li><strong>Pricing:</strong> Starting at $0.85 for letters</li>
              <li><strong>Tracking:</strong> Not included (available for $1.50 extra)</li>
              <li><strong>Insurance:</strong> Available up to $100</li>
            </ul>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Best for:</strong> Personal correspondence, bills, small lightweight items
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Priority Mail</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Fast, reliable service with tracking included.</p>
            <ul style={{ marginBottom: '12px' }}>
              <li><strong>Weight limit:</strong> Up to 30kg (66 lbs)</li>
              <li><strong>Delivery time:</strong> 1-3 business days</li>
              <li><strong>Pricing:</strong> Starting at $9.50 (varies by weight and distance)</li>
              <li><strong>Tracking:</strong> Free tracking included</li>
              <li><strong>Insurance:</strong> Up to $100 included, additional coverage available</li>
              <li><strong>Features:</strong> Free packaging supplies at post office</li>
            </ul>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Best for:</strong> Packages that need to arrive quickly with tracking
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Express Mail</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Fastest delivery with money-back guarantee.</p>
            <ul style={{ marginBottom: '12px' }}>
              <li><strong>Weight limit:</strong> Up to 30kg (66 lbs)</li>
              <li><strong>Delivery time:</strong> Next business day by noon</li>
              <li><strong>Pricing:</strong> Starting at $24.95</li>
              <li><strong>Tracking:</strong> Real-time tracking included</li>
              <li><strong>Insurance:</strong> Up to $200 included</li>
              <li><strong>Guarantee:</strong> Money-back guarantee if not delivered on time</li>
            </ul>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <strong>Best for:</strong> Urgent deliveries, time-sensitive documents
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Flat Rate Shipping</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>One price regardless of weight - pack as much as you can fit!</p>
            <ul>
              <li><strong>Small Box:</strong> $8.50 (22cm x 14cm x 6cm)</li>
              <li><strong>Medium Box:</strong> $15.00 (28cm x 22cm x 15cm)</li>
              <li><strong>Large Box:</strong> $21.50 (30cm x 30cm x 30cm)</li>
              <li><strong>Delivery time:</strong> 2-3 business days</li>
              <li><strong>Free boxes:</strong> Available at any post office</li>
            </ul>
          </div>

          <h3 style={{ marginTop: '32px' }}>International Shipping</h3>

          <div className="card">
            <h4 className="card-title">International First Class</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Economical international shipping for lightweight packages.</p>
            <ul>
              <li><strong>Weight limit:</strong> Up to 2kg (4.4 lbs)</li>
              <li><strong>Delivery time:</strong> 7-21 business days</li>
              <li><strong>Pricing:</strong> Starting at $15.00 (varies by destination)</li>
              <li><strong>Tracking:</strong> Limited tracking to border</li>
            </ul>
          </div>

          <div className="card">
            <h4 className="card-title">International Priority</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Faster international delivery with full tracking.</p>
            <ul>
              <li><strong>Weight limit:</strong> Up to 30kg (66 lbs)</li>
              <li><strong>Delivery time:</strong> 6-10 business days</li>
              <li><strong>Pricing:</strong> Starting at $45.00</li>
              <li><strong>Tracking:</strong> Full international tracking</li>
              <li><strong>Insurance:</strong> Available up to $1,000</li>
            </ul>
          </div>

          <div className="card">
            <h4 className="card-title">International Express</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Premium international shipping service.</p>
            <ul>
              <li><strong>Weight limit:</strong> Up to 30kg (66 lbs)</li>
              <li><strong>Delivery time:</strong> 3-5 business days</li>
              <li><strong>Pricing:</strong> Starting at $85.00</li>
              <li><strong>Customs clearance:</strong> Expedited processing</li>
            </ul>
          </div>

          <h3 style={{ marginTop: '32px' }}>Specialty Services</h3>

          <div className="card">
            <h4 className="card-title">Registered Mail</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Maximum security for valuable items.</p>
            <ul>
              <li>Chain of custody with signature at each step</li>
              <li>Insurance up to $50,000</li>
              <li>Additional fee: $15.00 plus postage</li>
              <li>Delivery time: Same as service selected plus 1-2 days</li>
            </ul>
          </div>

          <div className="card">
            <h4 className="card-title">Certified Mail</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Proof of mailing and delivery for important documents.</p>
            <ul>
              <li>Proof of mailing receipt</li>
              <li>Proof of delivery signature</li>
              <li>Additional fee: $3.75 plus postage</li>
              <li>Electronic delivery confirmation</li>
            </ul>
          </div>

          <h3 style={{ marginTop: '32px' }}>Additional Services</h3>
          <ul>
            <li><strong>Signature Confirmation:</strong> $3.00 - Requires recipient signature</li>
            <li><strong>Adult Signature:</strong> $6.50 - Requires signature from adult (18+)</li>
            <li><strong>Collect on Delivery (COD):</strong> $8.00 - Collect payment upon delivery</li>
            <li><strong>Return Receipt:</strong> $2.85 - Proof of delivery signature</li>
            <li><strong>Insurance:</strong> $2.50 per $100 of value</li>
            <li><strong>Special Handling:</strong> $11.95 - For fragile or perishable items</li>
          </ul>

          <div className="info-box" style={{ marginTop: '24px' }}>
            <h4>Calculate Your Postage</h4>
            <p>Visit any Praya Post location to calculate exact postage for your package, or use our online postage calculator (coming soon). Postal staff can help you choose the best shipping option for your needs.</p>
          </div>

          <div className="card" style={{ marginTop: '20px' }}>
            <h4 className="card-title">Packaging Tips</h4>
            <ul>
              <li>Use sturdy boxes appropriate for item weight</li>
              <li>Wrap fragile items individually with bubble wrap</li>
              <li>Fill empty spaces with packing material to prevent shifting</li>
              <li>Seal all seams with strong packing tape</li>
              <li>Address labels should be clear and legible</li>
              <li>Include return address on all packages</li>
              <li>For international shipments, complete customs forms accurately</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}

function Stamps() {
  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/post">Home</Link> / Stamps
          </div>
          <h1>Stamps & Collectibles</h1>
          <p className="subtitle">Explore our stamp collection and purchase postage</p>
        </div>
      </div>
      <div className="container">
        <div className="content-text">
          <h3>Current Stamp Offerings</h3>

          <div className="card" style={{ marginTop: '20px' }}>
            <h4 className="card-title">First Class Stamps</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Standard postage for letters and cards.</p>
            <ul style={{ marginBottom: '12px' }}>
              <li><strong>Price:</strong> $0.85 each</li>
              <li><strong>Valid for:</strong> Letters up to 50g domestically</li>
              <li><strong>Purchase options:</strong> Book of 20 ($17.00), Roll of 100 ($85.00)</li>
              <li><strong>Designs:</strong> Available in Flag of Praya, National Landmarks, and Wildlife series</li>
            </ul>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Forever stamps: These stamps retain their value even if postage rates increase
            </div>
          </div>

          <div className="card">
            <h4 className="card-title">Additional Ounce Stamps</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>For heavier letters requiring extra postage.</p>
            <ul>
              <li><strong>Price:</strong> $0.25 each</li>
              <li><strong>Use with:</strong> First class stamp for letters over 50g</li>
              <li><strong>Available in:</strong> Books of 10 ($2.50)</li>
            </ul>
          </div>

          <div className="card">
            <h4 className="card-title">Postcard Stamps</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Special rate for standard-size postcards.</p>
            <ul>
              <li><strong>Price:</strong> $0.55 each</li>
              <li><strong>Size limit:</strong> Standard postcard (10cm x 15cm)</li>
              <li><strong>Designs:</strong> Seasonal and tourist destination themes</li>
            </ul>
          </div>

          <h3 style={{ marginTop: '32px' }}>Commemorative Stamps</h3>

          <div className="card">
            <h4 className="card-title">2024 Commemorative Series</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Limited edition stamps celebrating Praya's heritage and achievements.</p>
            <ul>
              <li><strong>Republic Founding Anniversary</strong> - $0.85 (Released January 2024)
                <ul style={{ marginLeft: '20px', marginTop: '8px' }}>
                  <li>Features: Historical buildings and founding fathers</li>
                  <li>Sheet of 12: $10.20</li>
                </ul>
              </li>
              <li><strong>Praya National Parks</strong> - $0.85 (Released March 2024)
                <ul style={{ marginLeft: '20px', marginTop: '8px' }}>
                  <li>Features: 8 national parks across the republic</li>
                  <li>Complete set of 8: $6.80</li>
                </ul>
              </li>
              <li><strong>Endangered Species Series</strong> - $1.25 (Released June 2024)
                <ul style={{ marginLeft: '20px', marginTop: '8px' }}>
                  <li>Features: Native endangered wildlife</li>
                  <li>Premium stamps with detailed artwork</li>
                  <li>Sheet of 6: $7.50</li>
                </ul>
              </li>
              <li><strong>Cultural Festivals</strong> - $0.85 (Released September 2024)
                <ul style={{ marginLeft: '20px', marginTop: '8px' }}>
                  <li>Features: Traditional celebrations and costumes</li>
                  <li>Set of 4: $3.40</li>
                </ul>
              </li>
              <li><strong>Holiday Season</strong> - $0.85 (Released November 2024)
                <ul style={{ marginLeft: '20px', marginTop: '8px' }}>
                  <li>Features: Winter scenes and holiday traditions</li>
                  <li>Book of 20: $17.00</li>
                </ul>
              </li>
            </ul>
          </div>

          <h3 style={{ marginTop: '32px' }}>Collector's Items</h3>

          <div className="card">
            <h4 className="card-title">First Day Covers</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Envelopes bearing new stamps postmarked on their first day of issue.</p>
            <ul>
              <li><strong>Price:</strong> $4.50 - $12.00 depending on stamp</li>
              <li><strong>Features:</strong> Special cancellation mark, commemorative cachet</li>
              <li><strong>Availability:</strong> Limited quantities, sold at major post offices</li>
              <li><strong>Subscription:</strong> Available for all new commemorative releases</li>
            </ul>
          </div>

          <div className="card">
            <h4 className="card-title">Mint Stamp Sheets</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Complete uncut sheets for serious collectors.</p>
            <ul>
              <li><strong>Standard sheet:</strong> 50 stamps</li>
              <li><strong>Limited editions:</strong> Numbered and authenticated</li>
              <li><strong>Pricing:</strong> Face value plus $5.00 premium</li>
              <li><strong>Popular series:</strong> Annual commemoratives, special events</li>
            </ul>
          </div>

          <div className="card">
            <h4 className="card-title">Stamp Yearbooks</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Complete collection of all stamps issued in a calendar year.</p>
            <ul>
              <li><strong>Includes:</strong> All commemorative and definitive stamps</li>
              <li><strong>Presentation:</strong> Hardcover album with protective mounts</li>
              <li><strong>Details:</strong> Historical context and design information</li>
              <li><strong>2024 Yearbook:</strong> $75.00 (pre-order available)</li>
            </ul>
          </div>

          <h3 style={{ marginTop: '32px' }}>How to Purchase</h3>

          <div className="card">
            <h4 className="card-title">In Person</h4>
            <ul>
              <li>Visit any Praya Post office</li>
              <li>All locations stock standard stamps</li>
              <li>Larger offices have commemorative and collector items</li>
              <li>Authorized retailers also sell basic postage stamps</li>
            </ul>
          </div>

          <div className="card">
            <h4 className="card-title">Online (Coming Soon)</h4>
            <ul>
              <li>Order stamps delivered to your door</li>
              <li>Browse full catalog of commemoratives</li>
              <li>Manage collector subscriptions</li>
              <li>Track your stamp collection</li>
            </ul>
          </div>

          <div className="card">
            <h4 className="card-title">Subscription Service</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Automatically receive new commemorative stamps.</p>
            <ul>
              <li>Never miss a new release</li>
              <li>Choose: All commemoratives, specific themes, or first day covers</li>
              <li>Quarterly billing</li>
              <li>Cancel anytime</li>
              <li><strong>Sign up:</strong> At any post office or call 1-800-POST-PY</li>
            </ul>
          </div>

          <h3 style={{ marginTop: '32px' }}>Stamp Collecting Resources</h3>

          <div className="card">
            <h4 className="card-title">For Beginners</h4>
            <ul>
              <li><strong>Starter Kit:</strong> $19.95 - Includes album, mounting supplies, and guide</li>
              <li><strong>Free resources:</strong> Collecting guide available at post offices</li>
              <li><strong>Workshops:</strong> Monthly stamp collecting classes at select locations</li>
              <li><strong>Youth program:</strong> Free program for collectors under 18</li>
            </ul>
          </div>

          <div className="card">
            <h4 className="card-title">Praya Philatelic Society</h4>
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>Join fellow stamp enthusiasts.</p>
            <ul>
              <li><strong>Membership:</strong> $35/year</li>
              <li><strong>Benefits:</strong> Quarterly magazine, trading events, exhibitions</li>
              <li><strong>Events:</strong> Annual stamp show and monthly meetings</li>
              <li><strong>Contact:</strong> philately@prayapost.gov.py</li>
            </ul>
          </div>

          <div className="info-box" style={{ marginTop: '24px' }}>
            <h4>Stamp Care Tips</h4>
            <ul style={{ marginBottom: 0 }}>
              <li>Store stamps in a cool, dry place away from direct sunlight</li>
              <li>Use stamp tongs, never handle stamps with bare fingers</li>
              <li>Keep stamps in acid-free albums or stock books</li>
              <li>Avoid exposing stamps to humidity or temperature fluctuations</li>
              <li>For valuable stamps, consider professional appraisal and insurance</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}

function ComingSoon({ title }) {
  const navigate = useNavigate();

  const getServiceInfo = () => {
    switch(title) {
      case 'Shipping Rates & Services':
        return {
          description: 'Calculate postage costs and compare shipping options for your packages.',
          services: ['Postage Calculator', 'Flat Rate Boxes', 'Bulk Mail Discounts', 'Business Solutions'],
          contact: 'For rate information: Visit any post office or call 1-800-POST-PY'
        };
      case 'Stamps & Collectibles':
        return {
          description: 'Purchase stamps online and explore commemorative stamp collections.',
          services: ['First Class Stamps', 'Commemorative Stamps', 'Collector Sets', 'Online Ordering'],
          contact: 'Buy stamps at any post office or authorized retailer'
        };
      default:
        return {
          description: 'This service is being developed to serve you better.',
          services: [],
          contact: 'For assistance, contact Praya Post at 1-800-POST-PY'
        };
    }
  };

  const info = getServiceInfo();

  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/post">Home</Link> / {title}
          </div>
          <h1>{title}</h1>
          <p className="subtitle">{info.description}</p>
        </div>
      </div>
      <div className="container">
        <div className="card">
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{
              width: '64px',
              height: '64px',
              background: 'linear-gradient(135deg, rgba(29, 78, 216, 0.1) 0%, rgba(29, 78, 216, 0.2) 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px'
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 16v-4M12 8h.01"/>
              </svg>
            </div>
            <h3 style={{ marginBottom: '12px' }}>Service Under Development</h3>
            <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto 24px' }}>
              We're working to bring this service online. In the meantime, you can access these services at any post office.
            </p>

            {info.services.length > 0 && (
              <div style={{ marginTop: '24px', textAlign: 'left', maxWidth: '400px', margin: '24px auto 0' }}>
                <h4 style={{ fontSize: '14px', marginBottom: '12px' }}>Available Services:</h4>
                <ul style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                  {info.services.map(service => (
                    <li key={service} style={{ marginBottom: '8px' }}>{service}</li>
                  ))}
                </ul>
              </div>
            )}

            <div style={{
              marginTop: '32px',
              padding: '16px',
              background: 'rgba(29, 78, 216, 0.05)',
              borderRadius: '10px',
              fontSize: '13px',
              color: 'var(--text-muted)'
            }}>
              {info.contact}
            </div>

            <div style={{ marginTop: '32px' }}>
              <h4 style={{ fontSize: '14px', marginBottom: '12px' }}>Related Services</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                <Link to="/post/track" style={{
                  padding: '14px',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: '500',
                  color: 'var(--text-primary)',
                  transition: 'all 0.2s'
                }}>
                  Track Package
                </Link>
                <button
                  onClick={() => navigate('/post')}
                  className="btn btn-secondary"
                  style={{ fontSize: '13px', padding: '14px' }}
                >
                  Return to Post Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
