import React, { useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import './Department.css'

export default function Interior() {
  const navigate = useNavigate()

  useEffect(() => {
    document.body.classList.add('theme-interior')
    return () => document.body.classList.remove('theme-interior')
  }, [])

  return (
    <>
      <header className="dept-header">
        <div className="container">
          <Link to="/interior" className="dept-logo">
            <div className="logo-mark">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="9" y1="13" x2="15" y2="13"></line>
                <line x1="9" y1="17" x2="15" y2="17"></line>
              </svg>
            </div>
            <div className="logo-text">
              <h1>Interior Department</h1>
              <span className="tagline">Republic of Praya</span>
            </div>
          </Link>
          <nav className="nav">
            <Link to="/interior" className="nav-link">Home</Link>
            <Link to="/interior/land" className="nav-link">Land Registry</Link>
            <Link to="/interior/identity" className="nav-link">Identity Documents</Link>
            <Link to="/interior/civil" className="nav-link">Civil Registry</Link>
            <Link to="/interior/parks" className="nav-link">Parks</Link>
          </nav>
        </div>
      </header>

      <Routes>
        <Route index element={<InteriorHome navigate={navigate} />} />
        <Route path="land" element={<LandRegistry />} />
        <Route path="identity" element={<IdentityDocuments />} />
        <Route path="civil" element={<CivilRegistry />} />
        <Route path="parks" element={<ParksAndReserves />} />
      </Routes>

      <footer className="dept-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <h4>Interior Department</h4>
              <p>Managing land, civil records, and natural resources for the citizens of Praya.</p>
            </div>
            <div className="footer-section">
              <h5>Services</h5>
              <ul>
                <li><Link to="/interior/land">Land Registry</Link></li>
                <li><Link to="/interior/identity">Identity Documents</Link></li>
                <li><Link to="/interior/civil">Civil Records</Link></li>
                <li><Link to="/interior/parks">Parks & Reserves</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5>Resources</h5>
              <ul>
                <li><a href="#">Forms</a></li>
                <li><a href="#">Fees</a></li>
                <li><a href="#">Maps</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h5>Government</h5>
              <ul>
                <li><Link to="/">Gov Portal</Link></li>
                <li><Link to="/ctb">Cannabis Tax Bureau</Link></li>
                <li><Link to="/doj">Dept. of Justice</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>&copy; 2024 Republic of Praya. Interior Department.</span>
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

function InteriorHome({ navigate }) {
  return (
    <>
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
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
              </svg>
              Civil Services
            </div>
            <h2>Managing Praya's <span>Identity & Resources</span></h2>
            <p>The Interior Department oversees land registration, identity documents, civil records, and the preservation of our natural parks and reserves for all citizens.</p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => navigate('/interior/land')}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                Search Land Records
              </button>
              <button className="btn btn-secondary" onClick={() => navigate('/interior/identity')}>
                Identity Documents
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Land Parcels</span>
              <span className="stat-value">847K</span>
              <span className="stat-change">Registered</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">IDs Issued</span>
              <span className="stat-value">1.2M</span>
              <span className="stat-change">FY 2024</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Park Area</span>
              <span className="stat-value">2.4M</span>
              <span className="stat-change">Hectares</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Processing</span>
              <span className="stat-value">3</span>
              <span className="stat-change">Avg Days</span>
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
                  <div className="service-card" onClick={() => navigate('/interior/land')}>
                    <div className="service-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                    </div>
                    <h4>Land Registry</h4>
                    <p>Property title searches, registration, and transfers</p>
                  </div>
                  <div className="service-card" onClick={() => navigate('/interior/identity')}>
                    <div className="service-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="16" rx="2"/>
                        <circle cx="9" cy="10" r="2"/>
                        <path d="M15 9h3M15 13h3"/>
                      </svg>
                    </div>
                    <h4>Identity Documents</h4>
                    <p>National ID cards, passports, and renewals</p>
                  </div>
                  <div className="service-card" onClick={() => navigate('/interior/civil')}>
                    <div className="service-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                        <path d="M23 21v-2a4 4 0 00-3-3.87"/>
                        <path d="M16 3.13a4 4 0 010 7.75"/>
                      </svg>
                    </div>
                    <h4>Civil Registry</h4>
                    <p>Birth, death, marriage certificates</p>
                  </div>
                  <div className="service-card" onClick={() => navigate('/interior/parks')}>
                    <div className="service-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                        <path d="M2 17l10 5 10-5"/>
                        <path d="M2 12l10 5 10-5"/>
                      </svg>
                    </div>
                    <h4>Parks & Reserves</h4>
                    <p>National parks information and permits</p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Latest Updates</h3>
                </div>
                <div className="news-item">
                  <span className="news-date">Nov 18, 2024</span>
                  <h4 className="news-title">Online Title Search Now Available</h4>
                  <p className="news-excerpt">Citizens can now search property records online through our new portal.</p>
                </div>
                <div className="news-item">
                  <span className="news-date">Nov 5, 2024</span>
                  <h4 className="news-title">New Digital ID Cards Available</h4>
                  <p className="news-excerpt">Apply for the new Praya Digital ID with enhanced security features and contactless technology.</p>
                </div>
              </div>
            </div>

            <aside className="sidebar">
              <div className="card">
                <h4 className="card-title">Quick Actions</h4>
                <div className="quick-link" onClick={() => navigate('/interior/land')}>
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"/>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                  </span>
                  Search Land Records
                </div>
                <div className="quick-link" onClick={() => navigate('/interior/identity')}>
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="3" width="20" height="14" rx="2"/>
                      <circle cx="8" cy="10" r="2"/>
                      <path d="M14 9h4M14 13h4"/>
                    </svg>
                  </span>
                  Apply for National ID
                </div>
                <div className="quick-link" onClick={() => navigate('/interior/civil')}>
                  <span className="icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                      <polyline points="14,2 14,8 20,8"/>
                    </svg>
                  </span>
                  Order Certificate
                </div>
              </div>

              <div className="info-box">
                <h4>Office Hours</h4>
                <p>Mon-Fri: 8:00 AM - 5:00 PM<br/>Closed on public holidays</p>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  )
}

function LandRegistry() {
  const [searchType, setSearchType] = React.useState('parcel');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState(null);

  const validateForm = () => {
    const newErrors = {};

    if (!searchTerm.trim()) {
      newErrors.searchTerm = 'Please enter a search term';
    } else if (searchType === 'parcel' && !/^[A-Z0-9]{6,12}$/i.test(searchTerm.trim())) {
      newErrors.searchTerm = 'Parcel number must be 6-12 alphanumeric characters';
    } else if (searchType === 'owner' && searchTerm.trim().length < 2) {
      newErrors.searchTerm = 'Owner name must be at least 2 characters';
    } else if (searchType === 'address' && searchTerm.trim().length < 3) {
      newErrors.searchTerm = 'Address must be at least 3 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSearchResults(null);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSearchResults({
        success: true,
        message: 'Search functionality will be available soon. Your search has been recorded.',
        searchType,
        searchTerm
      });
    }, 1000);
  };

  const getPlaceholder = () => {
    switch(searchType) {
      case 'parcel': return 'e.g., PRY123456';
      case 'address': return 'e.g., 123 Main Street';
      case 'owner': return 'e.g., John Smith';
      default: return 'Enter search term...';
    }
  };

  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/interior">Home</Link> / Land Registry
          </div>
          <h1>Land Registry</h1>
          <p className="subtitle">Search property records and manage land titles</p>
        </div>
      </div>
      <div className="container">
        <div className="card">
          <h4 className="card-title">Property Title Search</h4>
          <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Search for property records by parcel number, address, or owner name.</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Search Type</label>
              <select
                value={searchType}
                onChange={(e) => {
                  setSearchType(e.target.value);
                  setSearchTerm('');
                  setErrors({});
                }}
              >
                <option value="parcel">Parcel Number</option>
                <option value="address">Address</option>
                <option value="owner">Owner Name</option>
              </select>
            </div>
            <div className="form-group">
              <label>Search Term</label>
              <input
                type="text"
                placeholder={getPlaceholder()}
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  if (errors.searchTerm) {
                    setErrors({});
                  }
                }}
                style={{
                  borderColor: errors.searchTerm ? '#ef4444' : undefined
                }}
              />
              {errors.searchTerm && (
                <div style={{ color: '#ef4444', fontSize: '13px', marginTop: '6px' }}>
                  {errors.searchTerm}
                </div>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
              style={{ opacity: isSubmitting ? 0.7 : 1 }}
            >
              {isSubmitting ? 'Searching...' : 'Search Records'}
            </button>
          </form>

          {searchResults && searchResults.success && (
            <div style={{
              marginTop: '20px',
              padding: '16px',
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              borderRadius: '10px',
              color: 'var(--text-secondary)'
            }}>
              <div style={{ fontWeight: '600', marginBottom: '6px', color: '#10b981' }}>
                Search Submitted
              </div>
              {searchResults.message}
            </div>
          )}
        </div>

        <div className="content-text" style={{ marginTop: '24px' }}>
          <h3>Land Registry Services</h3>
          <ul>
            <li><strong>Title Search</strong> - Search property ownership records</li>
            <li><strong>Title Transfer</strong> - Register property sales and transfers</li>
            <li><strong>Lien Recording</strong> - Record mortgages and liens</li>
            <li><strong>Survey Records</strong> - Access property survey documents</li>
            <li><strong>Title Insurance</strong> - Obtain title insurance certificates</li>
          </ul>

          <div className="warning-box">
            <h4>Important Notice</h4>
            <p>All property transfers must be registered within 30 days of closing to be legally recognized.</p>
          </div>

          <h3>Related Services</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '12px', marginTop: '16px' }}>
            <Link to="/interior/identity" style={{
              padding: '16px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '12px',
              textDecoration: 'none',
              transition: 'all 0.2s'
            }}>
              <div style={{ fontWeight: '600', marginBottom: '6px', color: 'var(--text-primary)' }}>Identity Documents</div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Apply for National ID or passport</div>
            </Link>
            <Link to="/interior/civil" style={{
              padding: '16px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '12px',
              textDecoration: 'none',
              transition: 'all 0.2s'
            }}>
              <div style={{ fontWeight: '600', marginBottom: '6px', color: 'var(--text-primary)' }}>Civil Records</div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Order certificates and records</div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

function IdentityDocuments() {
  const [documentType, setDocumentType] = React.useState('national-id');
  const [applicationType, setApplicationType] = React.useState('new');
  const [formData, setFormData] = React.useState({
    fullName: '',
    dateOfBirth: '',
    email: '',
    phone: ''
  });
  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitResult, setSubmitResult] = React.useState(null);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Full name must be at least 3 characters';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitResult(null);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitResult({
        success: true,
        message: 'Application submitted successfully! You will receive a confirmation email shortly.',
        referenceNumber: 'ID-' + Math.random().toString(36).substr(2, 9).toUpperCase()
      });
    }, 1000);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/interior">Home</Link> / Identity Documents
          </div>
          <h1>Identity Documents</h1>
          <p className="subtitle">Apply for National ID cards and passports</p>
        </div>
      </div>
      <div className="container">
        <div className="content-text">
          <h3>Document Types</h3>
          <p>The Interior Department issues the following identity documents:</p>
        </div>

        <div className="license-grid" style={{ marginTop: '20px' }}>
          <div className="license-card">
            <h4>National ID Card</h4>
            <span className="code">ID-NAT</span>
            <p>Official government-issued identification for citizens</p>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '12px' }}>
              Valid for 10 years
            </div>
          </div>
          <div className="license-card">
            <h4>Passport</h4>
            <span className="code">ID-PASS</span>
            <p>International travel document for Praya citizens</p>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '12px' }}>
              Valid for 5 years
            </div>
          </div>
          <div className="license-card">
            <h4>Digital ID</h4>
            <span className="code">ID-DIG</span>
            <p>New contactless ID with enhanced security features</p>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '12px' }}>
              Valid for 10 years
            </div>
          </div>
        </div>

        <div className="card" style={{ marginTop: '32px' }}>
          <h4 className="card-title">Apply for Identity Document</h4>
          <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Complete the form below to start your application.</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Document Type</label>
              <select
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
              >
                <option value="national-id">National ID Card</option>
                <option value="passport">Passport</option>
                <option value="digital-id">Digital ID</option>
              </select>
            </div>

            <div className="form-group">
              <label>Application Type</label>
              <select
                value={applicationType}
                onChange={(e) => setApplicationType(e.target.value)}
              >
                <option value="new">New Application</option>
                <option value="renewal">Renewal</option>
                <option value="replacement">Replacement (Lost/Stolen)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="As it appears on birth certificate"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                style={{
                  borderColor: errors.fullName ? '#ef4444' : undefined
                }}
              />
              {errors.fullName && (
                <div style={{ color: '#ef4444', fontSize: '13px', marginTop: '6px' }}>
                  {errors.fullName}
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                style={{
                  borderColor: errors.dateOfBirth ? '#ef4444' : undefined
                }}
              />
              {errors.dateOfBirth && (
                <div style={{ color: '#ef4444', fontSize: '13px', marginTop: '6px' }}>
                  {errors.dateOfBirth}
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                style={{
                  borderColor: errors.email ? '#ef4444' : undefined
                }}
              />
              {errors.email && (
                <div style={{ color: '#ef4444', fontSize: '13px', marginTop: '6px' }}>
                  {errors.email}
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                placeholder="+1 234 567 8900"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                style={{
                  borderColor: errors.phone ? '#ef4444' : undefined
                }}
              />
              {errors.phone && (
                <div style={{ color: '#ef4444', fontSize: '13px', marginTop: '6px' }}>
                  {errors.phone}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
              style={{ opacity: isSubmitting ? 0.7 : 1 }}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>

          {submitResult && submitResult.success && (
            <div style={{
              marginTop: '20px',
              padding: '16px',
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              borderRadius: '10px',
              color: 'var(--text-secondary)'
            }}>
              <div style={{ fontWeight: '600', marginBottom: '6px', color: '#10b981' }}>
                Application Submitted
              </div>
              {submitResult.message}
              <div style={{ marginTop: '8px', fontFamily: 'monospace', fontSize: '14px' }}>
                Reference: {submitResult.referenceNumber}
              </div>
            </div>
          )}
        </div>

        <div className="info-box" style={{ marginTop: '24px' }}>
          <h4>Processing Times</h4>
          <p>National ID: 3-5 business days | Passport: 7-10 business days | Rush service available for additional fee.</p>
        </div>

        <div className="content-text" style={{ marginTop: '32px' }}>
          <h3>Required Documents</h3>
          <ul>
            <li><strong>Proof of Citizenship</strong> - Birth certificate or previous ID</li>
            <li><strong>Proof of Residence</strong> - Utility bill or lease agreement</li>
            <li><strong>Passport Photo</strong> - Recent color photo (35x45mm)</li>
            <li><strong>Payment</strong> - Application fee varies by document type</li>
          </ul>

          <div className="warning-box">
            <h4>Important Notice</h4>
            <p>All identity documents must be applied for in person at your local Interior Department office after submitting this online pre-application.</p>
          </div>

          <h3>Related Services</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '12px', marginTop: '16px' }}>
            <Link to="/interior/civil" style={{
              padding: '16px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '12px',
              textDecoration: 'none',
              transition: 'all 0.2s'
            }}>
              <div style={{ fontWeight: '600', marginBottom: '6px', color: 'var(--text-primary)' }}>Civil Registry</div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Order birth certificates and other records</div>
            </Link>
            <Link to="/interior/land" style={{
              padding: '16px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '12px',
              textDecoration: 'none',
              transition: 'all 0.2s'
            }}>
              <div style={{ fontWeight: '600', marginBottom: '6px', color: 'var(--text-primary)' }}>Land Registry</div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Search property records</div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

function CivilRegistry() {
  const [certificateType, setCertificateType] = React.useState('birth');
  const [formData, setFormData] = React.useState({
    fullName: '',
    dateOfEvent: '',
    locationOfEvent: '',
    email: '',
    purpose: ''
  });
  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitResult, setSubmitResult] = React.useState(null);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Name is required';
    }

    if (!formData.dateOfEvent) {
      newErrors.dateOfEvent = 'Date is required';
    }

    if (!formData.locationOfEvent.trim()) {
      newErrors.locationOfEvent = 'Location is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitResult(null);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitResult({
        success: true,
        message: 'Certificate request submitted successfully! Processing time is 3-5 business days.',
        referenceNumber: 'CIV-' + Math.random().toString(36).substr(2, 9).toUpperCase()
      });
    }, 1000);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/interior">Home</Link> / Civil Registry
          </div>
          <h1>Civil Registry</h1>
          <p className="subtitle">Birth, death, marriage certificates and vital records</p>
        </div>
      </div>
      <div className="container">
        <div className="content-text">
          <h3>Available Certificates</h3>
          <p>The Civil Registry maintains and issues the following vital records:</p>
        </div>

        <div className="license-grid" style={{ marginTop: '20px' }}>
          <div className="license-card">
            <h4>Birth Certificate</h4>
            <span className="code">CIV-BIRTH</span>
            <p>Official record of birth for Praya citizens</p>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '12px' }}>
              Fee: $25
            </div>
          </div>
          <div className="license-card">
            <h4>Death Certificate</h4>
            <span className="code">CIV-DEATH</span>
            <p>Official record of death registration</p>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '12px' }}>
              Fee: $25
            </div>
          </div>
          <div className="license-card">
            <h4>Marriage Certificate</h4>
            <span className="code">CIV-MARR</span>
            <p>Official marriage license and certificate</p>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '12px' }}>
              Fee: $50
            </div>
          </div>
          <div className="license-card">
            <h4>Name Change</h4>
            <span className="code">CIV-NAME</span>
            <p>Legal name change documentation</p>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '12px' }}>
              Fee: $100
            </div>
          </div>
        </div>

        <div className="card" style={{ marginTop: '32px' }}>
          <h4 className="card-title">Request Certificate</h4>
          <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Complete the form below to request a certified copy.</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Certificate Type</label>
              <select
                value={certificateType}
                onChange={(e) => {
                  setCertificateType(e.target.value);
                  setFormData({ ...formData, fullName: '', dateOfEvent: '', locationOfEvent: '' });
                  setErrors({});
                }}
              >
                <option value="birth">Birth Certificate</option>
                <option value="death">Death Certificate</option>
                <option value="marriage">Marriage Certificate</option>
                <option value="name-change">Name Change Certificate</option>
              </select>
            </div>

            <div className="form-group">
              <label>
                {certificateType === 'birth' ? 'Full Name on Certificate' :
                 certificateType === 'death' ? 'Name of Deceased' :
                 certificateType === 'marriage' ? 'Names on Certificate' :
                 'Current Legal Name'}
              </label>
              <input
                type="text"
                placeholder={certificateType === 'marriage' ? 'John Doe & Jane Smith' : 'Full legal name'}
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                style={{
                  borderColor: errors.fullName ? '#ef4444' : undefined
                }}
              />
              {errors.fullName && (
                <div style={{ color: '#ef4444', fontSize: '13px', marginTop: '6px' }}>
                  {errors.fullName}
                </div>
              )}
            </div>

            <div className="form-group">
              <label>
                {certificateType === 'birth' ? 'Date of Birth' :
                 certificateType === 'death' ? 'Date of Death' :
                 certificateType === 'marriage' ? 'Marriage Date' :
                 'Date of Name Change'}
              </label>
              <input
                type="date"
                value={formData.dateOfEvent}
                onChange={(e) => handleInputChange('dateOfEvent', e.target.value)}
                style={{
                  borderColor: errors.dateOfEvent ? '#ef4444' : undefined
                }}
              />
              {errors.dateOfEvent && (
                <div style={{ color: '#ef4444', fontSize: '13px', marginTop: '6px' }}>
                  {errors.dateOfEvent}
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Location (City/District)</label>
              <input
                type="text"
                placeholder="e.g., Praya City, Central District"
                value={formData.locationOfEvent}
                onChange={(e) => handleInputChange('locationOfEvent', e.target.value)}
                style={{
                  borderColor: errors.locationOfEvent ? '#ef4444' : undefined
                }}
              />
              {errors.locationOfEvent && (
                <div style={{ color: '#ef4444', fontSize: '13px', marginTop: '6px' }}>
                  {errors.locationOfEvent}
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Your Email Address</label>
              <input
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                style={{
                  borderColor: errors.email ? '#ef4444' : undefined
                }}
              />
              {errors.email && (
                <div style={{ color: '#ef4444', fontSize: '13px', marginTop: '6px' }}>
                  {errors.email}
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Purpose of Request (Optional)</label>
              <input
                type="text"
                placeholder="e.g., passport application, legal proceedings"
                value={formData.purpose}
                onChange={(e) => handleInputChange('purpose', e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
              style={{ opacity: isSubmitting ? 0.7 : 1 }}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </button>
          </form>

          {submitResult && submitResult.success && (
            <div style={{
              marginTop: '20px',
              padding: '16px',
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              borderRadius: '10px',
              color: 'var(--text-secondary)'
            }}>
              <div style={{ fontWeight: '600', marginBottom: '6px', color: '#10b981' }}>
                Request Submitted
              </div>
              {submitResult.message}
              <div style={{ marginTop: '8px', fontFamily: 'monospace', fontSize: '14px' }}>
                Reference: {submitResult.referenceNumber}
              </div>
            </div>
          )}
        </div>

        <div className="info-box" style={{ marginTop: '24px' }}>
          <h4>Processing & Delivery</h4>
          <p>Standard processing: 3-5 business days. Express service available for additional $25 fee. Certificates can be picked up in person or mailed to your address.</p>
        </div>

        <div className="content-text" style={{ marginTop: '32px' }}>
          <h3>How to Request</h3>
          <ul>
            <li><strong>Online</strong> - Submit request through this form</li>
            <li><strong>In Person</strong> - Visit any Interior Department office</li>
            <li><strong>By Mail</strong> - Send completed form with payment to Civil Registry, Interior Dept, Praya City</li>
            <li><strong>Payment</strong> - Credit card, check, or money order accepted</li>
          </ul>

          <div className="warning-box">
            <h4>Important Requirements</h4>
            <p>Valid government-issued ID required for all certificate requests. You must be the person named on the certificate, immediate family member, or legal representative to request vital records.</p>
          </div>

          <h3>Related Services</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '12px', marginTop: '16px' }}>
            <Link to="/interior/identity" style={{
              padding: '16px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '12px',
              textDecoration: 'none',
              transition: 'all 0.2s'
            }}>
              <div style={{ fontWeight: '600', marginBottom: '6px', color: 'var(--text-primary)' }}>Identity Documents</div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Apply for National ID or passport</div>
            </Link>
            <Link to="/interior/land" style={{
              padding: '16px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '12px',
              textDecoration: 'none',
              transition: 'all 0.2s'
            }}>
              <div style={{ fontWeight: '600', marginBottom: '6px', color: 'var(--text-primary)' }}>Land Registry</div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Search property records</div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

function ParksAndReserves() {
  const [permitType, setPermitType] = React.useState('day-pass');
  const [formData, setFormData] = React.useState({
    parkName: 'montana-reserve',
    visitDate: '',
    numberOfVisitors: '1',
    email: '',
    vehiclePlate: ''
  });
  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitResult, setSubmitResult] = React.useState(null);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.visitDate) {
      newErrors.visitDate = 'Visit date is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (permitType === 'camping' && !formData.vehiclePlate.trim()) {
      newErrors.vehiclePlate = 'Vehicle plate number is required for camping permits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitResult(null);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitResult({
        success: true,
        message: 'Park permit issued successfully! Please bring a printed copy or show this reference number at the park entrance.',
        referenceNumber: 'PARK-' + Math.random().toString(36).substr(2, 9).toUpperCase()
      });
    }, 1000);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <main className="main">
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/interior">Home</Link> / Parks & Reserves
          </div>
          <h1>Parks & Reserves</h1>
          <p className="subtitle">National parks, nature reserves, and conservation areas</p>
        </div>
      </div>
      <div className="container">
        <div className="content-text">
          <h3>Our Protected Areas</h3>
          <p>Praya's national parks system protects over 2.4 million hectares of pristine natural areas.</p>
        </div>

        <div className="license-grid" style={{ marginTop: '20px' }}>
          <div className="license-card">
            <h4>Montana Nature Reserve</h4>
            <span className="code">PARK-MTN</span>
            <p>Mountain trails, wildlife viewing, camping facilities</p>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '12px' }}>
              450,000 hectares
            </div>
          </div>
          <div className="license-card">
            <h4>Coastal Marine Park</h4>
            <span className="code">PARK-COAST</span>
            <p>Beaches, coral reefs, marine conservation</p>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '12px' }}>
              780,000 hectares
            </div>
          </div>
          <div className="license-card">
            <h4>Central Forest Reserve</h4>
            <span className="code">PARK-FOR</span>
            <p>Old-growth forest, hiking trails, birdwatching</p>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '12px' }}>
              920,000 hectares
            </div>
          </div>
          <div className="license-card">
            <h4>Desert Wildlife Sanctuary</h4>
            <span className="code">PARK-DES</span>
            <p>Unique desert ecosystems and wildlife</p>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '12px' }}>
              250,000 hectares
            </div>
          </div>
        </div>

        <div className="card" style={{ marginTop: '32px' }}>
          <h4 className="card-title">Get Park Permit</h4>
          <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Reserve your visit to Praya's national parks.</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Park Name</label>
              <select
                value={formData.parkName}
                onChange={(e) => handleInputChange('parkName', e.target.value)}
              >
                <option value="montana-reserve">Montana Nature Reserve</option>
                <option value="coastal-marine">Coastal Marine Park</option>
                <option value="central-forest">Central Forest Reserve</option>
                <option value="desert-sanctuary">Desert Wildlife Sanctuary</option>
              </select>
            </div>

            <div className="form-group">
              <label>Permit Type</label>
              <select
                value={permitType}
                onChange={(e) => {
                  setPermitType(e.target.value);
                  setErrors({});
                }}
              >
                <option value="day-pass">Day Pass - $10</option>
                <option value="camping">Camping Permit (3 days) - $45</option>
                <option value="group">Group Tour (10+ people) - $75</option>
                <option value="photography">Photography Permit - $25</option>
              </select>
            </div>

            <div className="form-group">
              <label>Visit Date</label>
              <input
                type="date"
                value={formData.visitDate}
                onChange={(e) => handleInputChange('visitDate', e.target.value)}
                style={{
                  borderColor: errors.visitDate ? '#ef4444' : undefined
                }}
              />
              {errors.visitDate && (
                <div style={{ color: '#ef4444', fontSize: '13px', marginTop: '6px' }}>
                  {errors.visitDate}
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Number of Visitors</label>
              <select
                value={formData.numberOfVisitors}
                onChange={(e) => handleInputChange('numberOfVisitors', e.target.value)}
              >
                <option value="1">1 person</option>
                <option value="2">2 people</option>
                <option value="3">3 people</option>
                <option value="4">4 people</option>
                <option value="5+">5+ people</option>
              </select>
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                style={{
                  borderColor: errors.email ? '#ef4444' : undefined
                }}
              />
              {errors.email && (
                <div style={{ color: '#ef4444', fontSize: '13px', marginTop: '6px' }}>
                  {errors.email}
                </div>
              )}
            </div>

            {permitType === 'camping' && (
              <div className="form-group">
                <label>Vehicle Plate Number</label>
                <input
                  type="text"
                  placeholder="ABC-1234"
                  value={formData.vehiclePlate}
                  onChange={(e) => handleInputChange('vehiclePlate', e.target.value)}
                  style={{
                    borderColor: errors.vehiclePlate ? '#ef4444' : undefined
                  }}
                />
                {errors.vehiclePlate && (
                  <div style={{ color: '#ef4444', fontSize: '13px', marginTop: '6px' }}>
                    {errors.vehiclePlate}
                  </div>
                )}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
              style={{ opacity: isSubmitting ? 0.7 : 1 }}
            >
              {isSubmitting ? 'Processing...' : 'Get Permit'}
            </button>
          </form>

          {submitResult && submitResult.success && (
            <div style={{
              marginTop: '20px',
              padding: '16px',
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              borderRadius: '10px',
              color: 'var(--text-secondary)'
            }}>
              <div style={{ fontWeight: '600', marginBottom: '6px', color: '#10b981' }}>
                Permit Issued
              </div>
              {submitResult.message}
              <div style={{ marginTop: '8px', fontFamily: 'monospace', fontSize: '14px' }}>
                Reference: {submitResult.referenceNumber}
              </div>
            </div>
          )}
        </div>

        <div className="info-box" style={{ marginTop: '24px' }}>
          <h4>Park Rules & Safety</h4>
          <p>Stay on marked trails. No littering. Wildlife feeding prohibited. Campfires only in designated areas. Check weather conditions before visiting.</p>
        </div>

        <div className="content-text" style={{ marginTop: '32px' }}>
          <h3>Visitor Information</h3>
          <ul>
            <li><strong>Park Hours</strong> - Dawn to dusk (day passes), 24hrs (camping)</li>
            <li><strong>Facilities</strong> - Visitor centers, restrooms, picnic areas, camping sites</li>
            <li><strong>Activities</strong> - Hiking, camping, wildlife viewing, photography, guided tours</li>
            <li><strong>Conservation</strong> - All parks are protected areas - follow Leave No Trace principles</li>
          </ul>

          <div className="warning-box">
            <h4>Important Notice</h4>
            <p>All visitors must have a valid permit. Permits are checked at park entrances. Some areas may be temporarily closed for conservation or safety reasons.</p>
          </div>

          <h3>Related Services</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '12px', marginTop: '16px' }}>
            <Link to="/interior/land" style={{
              padding: '16px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '12px',
              textDecoration: 'none',
              transition: 'all 0.2s'
            }}>
              <div style={{ fontWeight: '600', marginBottom: '6px', color: 'var(--text-primary)' }}>Land Registry</div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Property records and surveys</div>
            </Link>
            <Link to="/interior/identity" style={{
              padding: '16px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '12px',
              textDecoration: 'none',
              transition: 'all 0.2s'
            }}>
              <div style={{ fontWeight: '600', marginBottom: '6px', color: 'var(--text-primary)' }}>Identity Documents</div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>National ID and passports</div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
