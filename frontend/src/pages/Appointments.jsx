import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  DEPARTMENTS,
  createAppointment,
  getUserAppointments,
  cancelAppointment,
  getAvailableSlots,
  getNextAvailableDate,
  validateAppointment,
  formatAppointmentDateTime,
  isUpcoming,
  isPast
} from '../utils/appointments'
import './Appointments.css'

export default function Appointments() {
  const [view, setView] = useState('list') // 'list' or 'book'
  const [step, setStep] = useState(1) // Booking wizard step
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Form state
  const [formData, setFormData] = useState({
    departmentId: '',
    serviceId: '',
    date: getNextAvailableDate(),
    time: '',
    fullName: '',
    email: '',
    phone: '',
    notes: ''
  })

  const [availableSlots, setAvailableSlots] = useState([])

  useEffect(() => {
    loadAppointments()
  }, [])

  useEffect(() => {
    if (formData.departmentId && formData.date) {
      const slots = getAvailableSlots(formData.departmentId, formData.date)
      setAvailableSlots(slots)
    }
  }, [formData.departmentId, formData.date])

  const loadAppointments = () => {
    const userApts = getUserAppointments()
    setAppointments(userApts)
  }

  const selectedDepartment = DEPARTMENTS.find(d => d.id === formData.departmentId)
  const selectedService = selectedDepartment?.services.find(s => s.id === formData.serviceId)

  const handleNext = () => {
    setError('')

    if (step === 1 && (!formData.departmentId || !formData.serviceId)) {
      setError('Please select a department and service')
      return
    }

    if (step === 2 && (!formData.date || !formData.time)) {
      setError('Please select a date and time')
      return
    }

    setStep(step + 1)
  }

  const handleSubmit = async () => {
    setError('')
    const validation = validateAppointment(formData)

    if (!validation.isValid) {
      setError(Object.values(validation.errors)[0])
      return
    }

    setLoading(true)

    try {
      const result = createAppointment({
        ...formData,
        departmentName: selectedDepartment.name,
        serviceName: selectedService.name
      })

      if (result.success) {
        setSuccess('Appointment booked successfully!')
        setFormData({
          departmentId: '',
          serviceId: '',
          date: getNextAvailableDate(),
          time: '',
          fullName: '',
          email: '',
          phone: '',
          notes: ''
        })
        setStep(4) // Confirmation step
        loadAppointments()
      }
    } catch (err) {
      setError('Failed to book appointment. Please try again.')
    }

    setLoading(false)
  }

  const handleCancel = async (appointmentId) => {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      const result = cancelAppointment(appointmentId)
      if (result.success) {
        setSuccess('Appointment cancelled successfully')
        loadAppointments()
      }
    }
  }

  if (view === 'book') {
    return (
      <div className="appointments-page">
        <div className="appointments-container">
          <div className="appointments-header">
            <button onClick={() => setView('list')} className="back-button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <h1>Book Appointment</h1>
          </div>

          {error && (
            <div className="alert alert-error">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </div>
          )}

          <div className="booking-wizard">
            {/* Progress Steps */}
            <div className="wizard-steps">
              {['Service', 'Date & Time', 'Details', 'Confirm'].map((label, i) => (
                <div key={i} className={`wizard-step ${step > i + 1 ? 'completed' : ''} ${step === i + 1 ? 'active' : ''}`}>
                  <div className="step-number">{step > i + 1 ? '✓' : i + 1}</div>
                  <div className="step-label">{label}</div>
                </div>
              ))}
            </div>

            {/* Step 1: Select Service */}
            {step === 1 && (
              <div className="wizard-content">
                <h2>Select Department and Service</h2>

                <div className="form-group">
                  <label>Department</label>
                  <select
                    value={formData.departmentId}
                    onChange={(e) => setFormData({ ...formData, departmentId: e.target.value, serviceId: '' })}
                    className="form-select"
                  >
                    <option value="">Choose a department...</option>
                    {DEPARTMENTS.map(dept => (
                      <option key={dept.id} value={dept.id}>{dept.name}</option>
                    ))}
                  </select>
                </div>

                {selectedDepartment && (
                  <div className="form-group">
                    <label>Service</label>
                    <div className="service-grid">
                      {selectedDepartment.services.map(service => (
                        <button
                          key={service.id}
                          className={`service-card ${formData.serviceId === service.id ? 'selected' : ''}`}
                          onClick={() => setFormData({ ...formData, serviceId: service.id })}
                        >
                          <h3>{service.name}</h3>
                          <p>{service.duration} minutes</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <button onClick={handleNext} className="btn-primary" disabled={!formData.departmentId || !formData.serviceId}>
                  Continue
                </button>
              </div>
            )}

            {/* Step 2: Select Date & Time */}
            {step === 2 && (
              <div className="wizard-content">
                <h2>Choose Date and Time</h2>

                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    min={getNextAvailableDate()}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value, time: '' })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Available Time Slots</label>
                  <div className="time-slots">
                    {availableSlots.length > 0 ? (
                      availableSlots.map(slot => (
                        <button
                          key={slot}
                          className={`time-slot ${formData.time === slot ? 'selected' : ''}`}
                          onClick={() => setFormData({ ...formData, time: slot })}
                        >
                          {slot}
                        </button>
                      ))
                    ) : (
                      <p className="no-slots">No available slots for this date. Please choose another date.</p>
                    )}
                  </div>
                </div>

                <div className="wizard-actions">
                  <button onClick={() => setStep(1)} className="btn-secondary">Back</button>
                  <button onClick={handleNext} className="btn-primary" disabled={!formData.time}>Continue</button>
                </div>
              </div>
            )}

            {/* Step 3: Personal Details */}
            {step === 3 && (
              <div className="wizard-content">
                <h2>Your Details</h2>

                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="form-input"
                    placeholder="John Doe"
                  />
                </div>

                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="form-input"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="form-input"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div className="form-group">
                  <label>Additional Notes (Optional)</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="form-textarea"
                    rows="4"
                    placeholder="Any special requirements or information..."
                  />
                </div>

                <div className="wizard-actions">
                  <button onClick={() => setStep(2)} className="btn-secondary">Back</button>
                  <button onClick={handleSubmit} className="btn-primary" disabled={loading}>
                    {loading ? 'Booking...' : 'Book Appointment'}
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {step === 4 && (
              <div className="wizard-content confirmation">
                <div className="success-icon">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h2>Appointment Confirmed!</h2>
                <p>Your appointment has been successfully booked.</p>

                <div className="confirmation-details">
                  <div className="detail-row">
                    <span className="detail-label">Department:</span>
                    <span className="detail-value">{selectedDepartment?.name}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Service:</span>
                    <span className="detail-value">{selectedService?.name}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Date & Time:</span>
                    <span className="detail-value">{formatAppointmentDateTime(formData.date, formData.time)}</span>
                  </div>
                </div>

                <button onClick={() => { setView('list'); setStep(1) }} className="btn-primary">
                  View All Appointments
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // List view
  const upcomingApts = appointments.filter(isUpcoming)
  const pastApts = appointments.filter(isPast)

  return (
    <div className="appointments-page">
      <div className="appointments-container">
        <div className="appointments-header">
          <div>
            <h1>My Appointments</h1>
            <p>View and manage your government service appointments</p>
          </div>
          <button onClick={() => setView('book')} className="btn-primary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Book Appointment
          </button>
        </div>

        {success && (
          <div className="alert alert-success">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            {success}
            <button onClick={() => setSuccess('')} className="alert-close">&times;</button>
          </div>
        )}

        <div className="appointments-section">
          <h2>Upcoming Appointments ({upcomingApts.length})</h2>
          {upcomingApts.length > 0 ? (
            <div className="appointments-grid">
              {upcomingApts.map(apt => (
                <div key={apt.id} className="appointment-card">
                  <div className="appointment-header">
                    <h3>{apt.departmentName}</h3>
                    <span className="status-badge confirmed">Confirmed</span>
                  </div>
                  <div className="appointment-body">
                    <p className="service-name">{apt.serviceName}</p>
                    <p className="appointment-datetime">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      {formatAppointmentDateTime(apt.date, apt.time)}
                    </p>
                    <p className="confirmation-code">Code: {apt.confirmationCode}</p>
                  </div>
                  <div className="appointment-actions">
                    <button onClick={() => handleCancel(apt.id)} className="btn-secondary btn-sm">
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <p>No upcoming appointments</p>
              <button onClick={() => setView('book')} className="btn-primary">Book Your First Appointment</button>
            </div>
          )}
        </div>

        {pastApts.length > 0 && (
          <div className="appointments-section">
            <h2>Past Appointments</h2>
            <div className="appointments-grid">
              {pastApts.map(apt => (
                <div key={apt.id} className="appointment-card past">
                  <div className="appointment-header">
                    <h3>{apt.departmentName}</h3>
                    <span className={`status-badge ${apt.status}`}>{apt.status}</span>
                  </div>
                  <div className="appointment-body">
                    <p className="service-name">{apt.serviceName}</p>
                    <p className="appointment-datetime">
                      {formatAppointmentDateTime(apt.date, apt.time)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
