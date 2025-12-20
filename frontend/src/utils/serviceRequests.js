/**
 * Service Request Tracking System
 * Track status of government service applications
 */

const STORAGE_KEY = 'govpraya_service_requests'

export const REQUEST_TYPES = {
  PASSPORT: 'Passport Application',
  VISA: 'Visa Application',
  LICENSE: 'Driver License',
  PERMIT: 'Building Permit',
  CERTIFICATE: 'Certificate Request',
  TAX_REFUND: 'Tax Refund',
  HOUSING: 'Housing Application',
  POLICE_CLEARANCE: 'Police Clearance'
}

export const REQUEST_STATUS = {
  SUBMITTED: { label: 'Submitted', color: '#3b82f6', step: 1 },
  UNDER_REVIEW: { label: 'Under Review', color: '#f59e0b', step: 2 },
  PROCESSING: { label: 'Processing', color: '#f59e0b', step: 3 },
  APPROVED: { label: 'Approved', color: '#10b981', step: 4 },
  COMPLETED: { label: 'Completed', color: '#10b981', step: 5 },
  REJECTED: { label: 'Rejected', color: '#ef4444', step: 4 }
}

export function getAllRequests() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function createRequest(data) {
  const requests = getAllRequests()

  const newRequest = {
    id: `REQ-${Date.now().toString().slice(-8)}`,
    ...data,
    status: 'SUBMITTED',
    submittedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    timeline: [
      {
        status: 'SUBMITTED',
        timestamp: new Date().toISOString(),
        note: 'Request submitted successfully'
      }
    ]
  }

  requests.push(newRequest)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(requests))

  return { success: true, request: newRequest }
}

export function getRequestById(id) {
  const requests = getAllRequests()
  return requests.find(r => r.id === id)
}

export function updateRequestStatus(id, status, note) {
  const requests = getAllRequests()
  const index = requests.findIndex(r => r.id === id)

  if (index === -1) return { success: false, error: 'Request not found' }

  requests[index].status = status
  requests[index].updatedAt = new Date().toISOString()
  requests[index].timeline.push({
    status,
    timestamp: new Date().toISOString(),
    note
  })

  localStorage.setItem(STORAGE_KEY, JSON.stringify(requests))
  return { success: true, request: requests[index] }
}

export function formatRequestDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
