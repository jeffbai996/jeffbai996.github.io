import { useState, useEffect } from 'react'
import { setupInstallPrompt, showInstallPrompt, isInstalled } from '../utils/pwa'
import './PWAInstallPrompt.css'

export default function PWAInstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false)
  const [installing, setInstalling] = useState(false)

  useEffect(() => {
    // Don't show if already installed
    if (isInstalled()) {
      return
    }

    // Setup install prompt listener
    setupInstallPrompt((canInstall) => {
      setShowPrompt(canInstall)
    })

    // Auto-show after 30 seconds if not dismissed
    const timer = setTimeout(() => {
      if (!localStorage.getItem('pwa-install-dismissed')) {
        setShowPrompt(true)
      }
    }, 30000)

    return () => clearTimeout(timer)
  }, [])

  const handleInstall = async () => {
    setInstalling(true)
    const result = await showInstallPrompt()

    if (result.success) {
      if (result.outcome === 'accepted') {
        setShowPrompt(false)
      }
    }

    setInstalling(false)
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    localStorage.setItem('pwa-install-dismissed', Date.now())
  }

  if (!showPrompt) return null

  return (
    <div className="pwa-install-prompt" role="dialog" aria-labelledby="pwa-prompt-title">
      <div className="pwa-prompt-content">
        <div className="pwa-prompt-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M9 11l3 3 3-3" />
          </svg>
        </div>
        <div className="pwa-prompt-text">
          <h4 id="pwa-prompt-title">Install GOV.PRAYA</h4>
          <p>Add this app to your home screen for quick and easy access when you're on the go.</p>
        </div>
        <div className="pwa-prompt-actions">
          <button
            onClick={handleInstall}
            disabled={installing}
            className="pwa-install-btn"
            aria-label="Install GOV.PRAYA app"
          >
            {installing ? 'Installing...' : 'Install'}
          </button>
          <button
            onClick={handleDismiss}
            className="pwa-dismiss-btn"
            aria-label="Dismiss install prompt"
          >
            Not Now
          </button>
        </div>
      </div>
    </div>
  )
}
