/**
 * Appointment Booking System
 * Handles scheduling appointments with government departments
 */

const STORAGE_KEY = 'govpraya_appointments'

// Available departments and services
export const DEPARTMENTS = [
  {
    id: 'npa',
    name: 'National Police Agency',
    services: [
      { id: 'police-clearance', name: 'Police Clearance Certificate', duration: 30 },
      { id: 'passport', name: 'Passport Application', duration: 45 },
      { id: 'report', name: 'File Report', duration: 20 }
    ]
  },
  {
    id: 'revenue',
    name: 'Revenue Department',
    services: [
      { id: 'tax-consultation', name: 'Tax Consultation', duration: 30 },
      { id: 'tax-filing', name: 'Tax Filing Assistance', duration: 45 },
      { id: 'payment-plan', name: 'Payment Plan Setup', duration: 30 }
    ]
  },
  {
    id: 'health',
    name: 'Health Department',
    services: [
      { id: 'vaccination', name: 'Vaccination', duration: 15 },
      { id: 'health-card', name: 'Health Card Application', duration: 30 },
      { id: 'checkup', name: 'General Checkup', duration: 45 }
    ]
  },
  {
    id: 'housing',
    name: 'Housing Authority',
    services: [
      { id: 'application', name: 'Housing Application', duration: 60 },
      { id: 'consultation', name: 'Housing Consultation', duration: 30 },
      { id: 'inspection', name: 'Property Inspection', duration: 45 }
    ]
  }
]

// Time slots available per day
const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00'
]

/**
 * Get all appointments
 */
export function getAllAppointments() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

/**
 * Get user's appointments
 */
export function getUserAppointments(userId = 'current-user') {
  const all = getAllAppointments()
  return all.filter(apt => apt.userId === userId)
}

/**
 * Create new appointment
 */
export function createAppointment(appointmentData) {
  const appointments = getAllAppointments()

  const newAppointment = {
    id: `apt-${Date.now()}`,
    userId: 'current-user',
    ...appointmentData,
    status: 'confirmed',
    createdAt: new Date().toISOString(),
    confirmationCode: generateConfirmationCode()
  }

  appointments.push(newAppointment)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments))

  return {
    success: true,
    appointment: newAppointment
  }
}

/**
 * Cancel appointment
 */
export function cancelAppointment(appointmentId) {
  const appointments = getAllAppointments()
  const index = appointments.findIndex(apt => apt.id === appointmentId)

  if (index === -1) {
    return {
      success: false,
      error: 'Appointment not found'
    }
  }

  appointments[index].status = 'cancelled'
  appointments[index].cancelledAt = new Date().toISOString()

  localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments))

  return {
    success: true,
    appointment: appointments[index]
  }
}

/**
 * Reschedule appointment
 */
export function rescheduleAppointment(appointmentId, newDate, newTime) {
  const appointments = getAllAppointments()
  const index = appointments.findIndex(apt => apt.id === appointmentId)

  if (index === -1) {
    return {
      success: false,
      error: 'Appointment not found'
    }
  }

  appointments[index].date = newDate
  appointments[index].time = newTime
  appointments[index].rescheduledAt = new Date().toISOString()

  localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments))

  return {
    success: true,
    appointment: appointments[index]
  }
}

/**
 * Get available time slots for a date
 */
export function getAvailableSlots(departmentId, date) {
  const appointments = getAllAppointments()

  // Get booked slots for this department and date
  const bookedSlots = appointments
    .filter(apt =>
      apt.departmentId === departmentId &&
      apt.date === date &&
      apt.status === 'confirmed'
    )
    .map(apt => apt.time)

  // Return available slots
  return TIME_SLOTS.filter(slot => !bookedSlots.includes(slot))
}

/**
 * Generate confirmation code
 */
function generateConfirmationCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code = ''
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

/**
 * Format appointment date/time for display
 */
export function formatAppointmentDateTime(date, time) {
  const dateObj = new Date(date)
  const dateStr = dateObj.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return `${dateStr} at ${time}`
}

/**
 * Check if appointment is upcoming
 */
export function isUpcoming(appointment) {
  const now = new Date()
  const aptDate = new Date(`${appointment.date}T${appointment.time}`)
  return aptDate > now && appointment.status === 'confirmed'
}

/**
 * Check if appointment is past
 */
export function isPast(appointment) {
  const now = new Date()
  const aptDate = new Date(`${appointment.date}T${appointment.time}`)
  return aptDate < now
}

/**
 * Get next available date (excluding weekends)
 */
export function getNextAvailableDate() {
  let date = new Date()
  date.setDate(date.getDate() + 1) // Start from tomorrow

  // Skip weekends
  while (date.getDay() === 0 || date.getDay() === 6) {
    date.setDate(date.getDate() + 1)
  }

  return date.toISOString().split('T')[0]
}

/**
 * Validate appointment data
 */
export function validateAppointment(data) {
  const errors = {}

  if (!data.departmentId) errors.department = 'Please select a department'
  if (!data.serviceId) errors.service = 'Please select a service'
  if (!data.date) errors.date = 'Please select a date'
  if (!data.time) errors.time = 'Please select a time'
  if (!data.fullName?.trim()) errors.fullName = 'Please enter your full name'
  if (!data.email?.trim()) errors.email = 'Please enter your email'
  if (!data.phone?.trim()) errors.phone = 'Please enter your phone number'

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}
