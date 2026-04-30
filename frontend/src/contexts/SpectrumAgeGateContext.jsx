import { createContext, useContext, useState, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

const STORAGE_KEY = 'spectrum-age-verified'

const SpectrumAgeGateContext = createContext(null)

function loadVerified() {
  if (typeof window === 'undefined') return false
  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'true'
  } catch {
    return false
  }
}

export function SpectrumAgeGateProvider({ children }) {
  const [verified, setVerified] = useState(loadVerified)
  const navigate = useNavigate()

  const verify = useCallback(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, 'true')
    } catch {
      // ignore
    }
    setVerified(true)
  }, [])

  const deny = useCallback(() => {
    navigate('/')
  }, [navigate])

  const value = useMemo(() => ({ verified, verify, deny }), [verified, verify, deny])

  return (
    <SpectrumAgeGateContext.Provider value={value}>
      {children}
    </SpectrumAgeGateContext.Provider>
  )
}

SpectrumAgeGateProvider.propTypes = {
  children: PropTypes.node
}

export function useSpectrumAgeGate() {
  const ctx = useContext(SpectrumAgeGateContext)
  if (!ctx) throw new Error('useSpectrumAgeGate must be used inside SpectrumAgeGateProvider')
  return ctx
}
