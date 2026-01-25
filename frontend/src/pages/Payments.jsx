import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../utils/AuthContext'
import './Payments.css'

const paymentTypes = [
  {
    id: 'income-tax',
    category: 'Taxes',
    name: 'Income Tax Payment',
    description: 'Pay your annual income tax or quarterly estimated payments',
    department: 'Revenue Department',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8M12 18V6"/>
      </svg>
    ),
    fees: null
  },
  {
    id: 'property-tax',
    category: 'Taxes',
    name: 'Property Tax',
    description: 'Pay property taxes on land and buildings',
    department: 'Revenue Department',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    fees: null
  },
  {
    id: 'business-tax',
    category: 'Taxes',
    name: 'Business Tax',
    description: 'Corporate taxes, VAT, and business levies',
    department: 'Revenue Department',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
      </svg>
    ),
    fees: null
  },
  {
    id: 'vehicle-registration',
    category: 'Fees',
    name: 'Vehicle Registration',
    description: 'Annual vehicle registration and renewal fees',
    department: 'Transport Department',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 17h14v-5H5v5z"/>
        <path d="M7 12l1-5h8l1 5"/>
        <circle cx="7" cy="17" r="2"/>
        <circle cx="17" cy="17" r="2"/>
      </svg>
    ),
    fees: '$85'
  },
  {
    id: 'driver-license',
    category: 'Fees',
    name: 'Driver License Renewal',
    description: 'Renew your driver license',
    department: 'Transport Department',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="5" width="18" height="14" rx="2"/>
        <circle cx="9" cy="12" r="2"/>
        <path d="M15 10h2M15 14h2"/>
      </svg>
    ),
    fees: '$45'
  },
  {
    id: 'passport',
    category: 'Fees',
    name: 'Passport Application',
    description: 'New passport or renewal fees',
    department: 'Customs & Border Control',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="4" y="2" width="16" height="20" rx="2"/>
        <circle cx="12" cy="10" r="3"/>
        <path d="M8 18h8"/>
      </svg>
    ),
    fees: '$120'
  },
  {
    id: 'building-permit',
    category: 'Fees',
    name: 'Building Permit',
    description: 'Construction and renovation permit fees',
    department: 'Buildings Department',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 21h18M5 21V7l7-4 7 4v14"/>
        <path d="M9 21v-6h6v6M9 9h.01M15 9h.01"/>
      </svg>
    ),
    fees: 'Variable'
  },
  {
    id: 'court-filing',
    category: 'Fees',
    name: 'Court Filing Fees',
    description: 'Legal case filing and documentation fees',
    department: 'Justice Department',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 3v4M6 11h12M3 11l3 10h12l3-10"/>
      </svg>
    ),
    fees: 'Variable'
  },
  {
    id: 'fines',
    category: 'Fines',
    name: 'Traffic & Parking Fines',
    description: 'Pay traffic violations and parking tickets',
    department: 'National Police Agency',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
    fees: null
  },
  {
    id: 'utilities',
    category: 'Utilities',
    name: 'Utility Payments',
    description: 'Water, electricity, and municipal services',
    department: 'Interior Department',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v10M18.36 5.64l-5.66 5.66M22 12h-10M18.36 18.36l-5.66-5.66M12 22v-10M5.64 18.36l5.66-5.66M2 12h10M5.64 5.64l5.66 5.66"/>
      </svg>
    ),
    fees: null
  }
]

const paymentHistory = [
  { id: 'TXN-2025-12847', date: '2025-12-05', type: 'Income Tax Payment', amount: '$2,450.00', status: 'completed' },
  { id: 'TXN-2025-12683', date: '2025-11-28', type: 'Vehicle Registration', amount: '$85.00', status: 'completed' },
  { id: 'TXN-2025-12541', date: '2025-11-15', type: 'Property Tax', amount: '$890.00', status: 'completed' },
  { id: 'TXN-2025-12398', date: '2025-10-30', type: 'Traffic Fine', amount: '$150.00', status: 'completed' },
]

export default function Payments() {
  const { isAuthenticated } = useAuth()
  const [selectedPayment, setSelectedPayment] = useState(null)
  const [paymentStep, setPaymentStep] = useState('select') // select, details, confirm, success
  const [formData, setFormData] = useState({
    amount: '',
    referenceNumber: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    name: ''
  })
  const [activeTab, setActiveTab] = useState('make-payment')

  const categories = [...new Set(paymentTypes.map(p => p.category))]

  const handlePaymentSelect = (payment) => {
    setSelectedPayment(payment)
    setPaymentStep('details')
  }

  const handleSubmitDetails = (e) => {
    e.preventDefault()
    setPaymentStep('confirm')
  }

  const handleConfirmPayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      setPaymentStep('success')
    }, 1500)
  }

  const resetPayment = () => {
    setSelectedPayment(null)
    setPaymentStep('select')
    setFormData({
      amount: '',
      referenceNumber: '',
      cardNumber: '',
      expiry: '',
      cvv: '',
      name: ''
    })
  }

  return (
    <div className="payments-page">
      <header className="payments-header">
        <div className="container">
          <div className="payments-header-content">
            <Link to="/" className="payments-back">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Back to Portal
            </Link>
            <h1>Government Payments</h1>
            <p>Pay taxes, fees, fines, and utilities securely online</p>
          </div>
        </div>
      </header>

      <main className="payments-main">
        <div className="container">
          {!isAuthenticated && (
            <div className="payments-auth-notice">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 16v-4M12 8h.01"/>
              </svg>
              <div>
                <strong>Sign in for a better experience</strong>
                <p>Login to access payment history, saved payment methods, and automatic receipt delivery.</p>
              </div>
              <Link to="/login" className="btn-primary">Sign In</Link>
            </div>
          )}

          <div className="payments-tabs">
            <button
              className={`payments-tab ${activeTab === 'make-payment' ? 'active' : ''}`}
              onClick={() => setActiveTab('make-payment')}
            >
              Make a Payment
            </button>
            <button
              className={`payments-tab ${activeTab === 'history' ? 'active' : ''}`}
              onClick={() => setActiveTab('history')}
            >
              Payment History
            </button>
          </div>

          {activeTab === 'make-payment' && (
            <>
              {paymentStep === 'select' && (
                <div className="payments-selection">
                  {categories.map(category => (
                    <section key={category} className="payment-category">
                      <h2>{category}</h2>
                      <div className="payment-options-grid">
                        {paymentTypes.filter(p => p.category === category).map(payment => (
                          <button
                            key={payment.id}
                            className="payment-option-card"
                            onClick={() => handlePaymentSelect(payment)}
                          >
                            <div className="payment-option-icon">
                              {payment.icon}
                            </div>
                            <div className="payment-option-content">
                              <h3>{payment.name}</h3>
                              <p>{payment.description}</p>
                              <span className="payment-option-dept">{payment.department}</span>
                            </div>
                            {payment.fees && (
                              <span className="payment-option-fee">{payment.fees}</span>
                            )}
                            <svg className="payment-option-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M9 18l6-6-6-6"/>
                            </svg>
                          </button>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              )}

              {paymentStep === 'details' && selectedPayment && (
                <div className="payment-details">
                  <button className="payment-back" onClick={resetPayment}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                    Back to payment types
                  </button>

                  <div className="payment-details-header">
                    <div className="payment-details-icon">
                      {selectedPayment.icon}
                    </div>
                    <div>
                      <h2>{selectedPayment.name}</h2>
                      <p>{selectedPayment.department}</p>
                    </div>
                  </div>

                  <form className="payment-form" onSubmit={handleSubmitDetails}>
                    <div className="form-section">
                      <h3>Payment Details</h3>
                      <div className="form-grid">
                        <div className="form-group">
                          <label>Amount ($)</label>
                          <input
                            type="number"
                            placeholder="0.00"
                            value={formData.amount}
                            onChange={(e) => setFormData({...formData, amount: e.target.value})}
                            required
                            min="1"
                            step="0.01"
                          />
                        </div>
                        <div className="form-group">
                          <label>Reference Number (optional)</label>
                          <input
                            type="text"
                            placeholder="Tax ID, Case Number, etc."
                            value={formData.referenceNumber}
                            onChange={(e) => setFormData({...formData, referenceNumber: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-section">
                      <h3>Card Information</h3>
                      <div className="form-group">
                        <label>Cardholder Name</label>
                        <input
                          type="text"
                          placeholder="Name on card"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Card Number</label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          value={formData.cardNumber}
                          onChange={(e) => setFormData({...formData, cardNumber: e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim()})}
                          maxLength="19"
                          required
                        />
                      </div>
                      <div className="form-grid">
                        <div className="form-group">
                          <label>Expiry Date</label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            value={formData.expiry}
                            onChange={(e) => {
                              let val = e.target.value.replace(/\D/g, '')
                              if (val.length >= 2) val = val.slice(0,2) + '/' + val.slice(2)
                              setFormData({...formData, expiry: val})
                            }}
                            maxLength="5"
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>CVV</label>
                          <input
                            type="password"
                            placeholder="123"
                            value={formData.cvv}
                            onChange={(e) => setFormData({...formData, cvv: e.target.value.replace(/\D/g, '')})}
                            maxLength="4"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="payment-security-notice">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2"/>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                      </svg>
                      <span>Your payment is secured with 256-bit SSL encryption</span>
                    </div>

                    <button type="submit" className="btn-primary btn-large">
                      Continue to Review
                    </button>
                  </form>
                </div>
              )}

              {paymentStep === 'confirm' && selectedPayment && (
                <div className="payment-confirm">
                  <h2>Review Your Payment</h2>

                  <div className="payment-summary-card">
                    <div className="payment-summary-row">
                      <span>Payment Type</span>
                      <strong>{selectedPayment.name}</strong>
                    </div>
                    <div className="payment-summary-row">
                      <span>Department</span>
                      <strong>{selectedPayment.department}</strong>
                    </div>
                    {formData.referenceNumber && (
                      <div className="payment-summary-row">
                        <span>Reference</span>
                        <strong>{formData.referenceNumber}</strong>
                      </div>
                    )}
                    <div className="payment-summary-row">
                      <span>Card</span>
                      <strong>•••• •••• •••• {formData.cardNumber.slice(-4)}</strong>
                    </div>
                    <div className="payment-summary-divider" />
                    <div className="payment-summary-row payment-summary-total">
                      <span>Total Amount</span>
                      <strong>${parseFloat(formData.amount).toFixed(2)}</strong>
                    </div>
                  </div>

                  <div className="payment-confirm-actions">
                    <button className="btn-secondary" onClick={() => setPaymentStep('details')}>
                      Edit Details
                    </button>
                    <button className="btn-primary btn-large" onClick={handleConfirmPayment}>
                      Confirm & Pay ${parseFloat(formData.amount).toFixed(2)}
                    </button>
                  </div>
                </div>
              )}

              {paymentStep === 'success' && (
                <div className="payment-success">
                  <div className="payment-success-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                  </div>
                  <h2>Payment Successful</h2>
                  <p>Your payment has been processed successfully.</p>

                  <div className="payment-receipt">
                    <div className="payment-receipt-row">
                      <span>Transaction ID</span>
                      <strong>TXN-2025-{Math.floor(Math.random() * 99999)}</strong>
                    </div>
                    <div className="payment-receipt-row">
                      <span>Date</span>
                      <strong>{new Date().toLocaleDateString()}</strong>
                    </div>
                    <div className="payment-receipt-row">
                      <span>Amount Paid</span>
                      <strong>${parseFloat(formData.amount).toFixed(2)}</strong>
                    </div>
                    <div className="payment-receipt-row">
                      <span>Payment Type</span>
                      <strong>{selectedPayment.name}</strong>
                    </div>
                  </div>

                  <div className="payment-success-actions">
                    <button className="btn-secondary">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="7 10 12 15 17 10"/>
                        <line x1="12" y1="15" x2="12" y2="3"/>
                      </svg>
                      Download Receipt
                    </button>
                    <button className="btn-primary" onClick={resetPayment}>
                      Make Another Payment
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {activeTab === 'history' && (
            <div className="payment-history">
              {!isAuthenticated ? (
                <div className="payment-history-empty">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  <h3>Sign in to view payment history</h3>
                  <p>Your payment history will be available after you sign in with your PrayaPass account.</p>
                  <Link to="/login" className="btn-primary">Sign In</Link>
                </div>
              ) : (
                <>
                  <div className="payment-history-header">
                    <h2>Recent Payments</h2>
                    <button className="btn-secondary btn-small">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="7 10 12 15 17 10"/>
                        <line x1="12" y1="15" x2="12" y2="3"/>
                      </svg>
                      Export All
                    </button>
                  </div>
                  <div className="payment-history-table">
                    <div className="payment-history-row payment-history-header-row">
                      <span>Transaction ID</span>
                      <span>Date</span>
                      <span>Type</span>
                      <span>Amount</span>
                      <span>Status</span>
                      <span></span>
                    </div>
                    {paymentHistory.map(payment => (
                      <div key={payment.id} className="payment-history-row">
                        <span className="payment-history-id">{payment.id}</span>
                        <span>{payment.date}</span>
                        <span>{payment.type}</span>
                        <span className="payment-history-amount">{payment.amount}</span>
                        <span className={`payment-status payment-status-${payment.status}`}>
                          {payment.status}
                        </span>
                        <button className="btn-icon" title="Download receipt">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="7 10 12 15 17 10"/>
                            <line x1="12" y1="15" x2="12" y2="3"/>
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </main>

      <footer className="payments-footer">
        <div className="container">
          <div className="payments-footer-content">
            <div className="payments-footer-security">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <span>PCI-DSS Compliant</span>
              <span>256-bit SSL Encryption</span>
              <span>Secure Processing</span>
            </div>
            <p>&copy; 2025 Republic of Praya. All payments are processed securely.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
