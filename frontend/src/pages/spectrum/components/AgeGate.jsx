import { useEffect, useRef } from 'react'
import { useSpectrumAgeGate } from '../../../contexts/SpectrumAgeGateContext'
import SpectrumLogo from './SpectrumLogo'

export default function AgeGate() {
  const { verified, verify, deny } = useSpectrumAgeGate()
  const verifyRef = useRef(null)

  useEffect(() => {
    if (!verified) verifyRef.current?.focus()
  }, [verified])

  if (verified) return null

  return (
    <div className="sp-modal-backdrop" role="dialog" aria-modal="true" aria-label="Age verification">
      <div className="sp-modal">
        <SpectrumLogo size="sm" wordmark={false} />
        <h2>welcome to spectrum cannabis</h2>
        <p>you must be 19 or older to enter this site.</p>
        <div className="sp-modal-buttons">
          <button ref={verifyRef} className="sp-btn sp-btn-primary" onClick={verify}>I&apos;m 19 or older</button>
          <button className="sp-btn sp-btn-secondary" onClick={deny}>Take me back</button>
        </div>
      </div>
    </div>
  )
}
