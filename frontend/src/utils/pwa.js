/**
 * PWA Utilities
 * Handles service worker registration and PWA install prompts
 */

let deferredPrompt = null

/**
 * Register service worker
 */
export async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js', {
        scope: '/'
      })

      console.log('Service Worker registered successfully:', registration.scope)

      // Check for updates every hour
      setInterval(() => {
        registration.update()
      }, 60 * 60 * 1000)

      return registration
    } catch (error) {
      console.error('Service Worker registration failed:', error)
      return null
    }
  }
  return null
}

/**
 * Unregister service worker (for debugging)
 */
export async function unregisterServiceWorker() {
  if ('serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.ready
    return registration.unregister()
  }
  return false
}

/**
 * Check if app is installed as PWA
 */
export function isInstalled() {
  // Check if running in standalone mode
  return window.matchMedia('(display-mode: standalone)').matches ||
         window.navigator.standalone === true
}

/**
 * Setup PWA install prompt handler
 */
export function setupInstallPrompt(callback) {
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing
    e.preventDefault()

    // Store the event for later use
    deferredPrompt = e

    // Notify callback that install is available
    if (callback) {
      callback(true)
    }
  })

  // Detect when app was installed
  window.addEventListener('appinstalled', () => {
    console.log('PWA was installed')
    deferredPrompt = null

    if (callback) {
      callback(false)
    }
  })
}

/**
 * Show install prompt
 */
export async function showInstallPrompt() {
  if (!deferredPrompt) {
    return {
      success: false,
      error: 'Install prompt not available'
    }
  }

  // Show the install prompt
  deferredPrompt.prompt()

  // Wait for the user's response
  const { outcome } = await deferredPrompt.userChoice

  // Clear the deferred prompt
  deferredPrompt = null

  return {
    success: true,
    outcome // 'accepted' or 'dismissed'
  }
}

/**
 * Request push notification permission
 */
export async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    return {
      success: false,
      error: 'Notifications not supported'
    }
  }

  if (Notification.permission === 'granted') {
    return {
      success: true,
      permission: 'granted'
    }
  }

  if (Notification.permission === 'denied') {
    return {
      success: false,
      error: 'Notifications denied',
      permission: 'denied'
    }
  }

  try {
    const permission = await Notification.requestPermission()
    return {
      success: permission === 'granted',
      permission
    }
  } catch (error) {
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Subscribe to push notifications
 */
export async function subscribeToPushNotifications() {
  try {
    const registration = await navigator.serviceWorker.ready

    // Check if already subscribed
    const existingSubscription = await registration.pushManager.getSubscription()
    if (existingSubscription) {
      return {
        success: true,
        subscription: existingSubscription
      }
    }

    // Subscribe to push notifications
    // Note: You'll need to generate VAPID keys for production
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: null // Replace with your VAPID public key
    })

    return {
      success: true,
      subscription
    }
  } catch (error) {
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Check if device is online
 */
export function isOnline() {
  return navigator.onLine
}

/**
 * Setup online/offline event listeners
 */
export function setupOnlineStatus(onlineCallback, offlineCallback) {
  window.addEventListener('online', () => {
    console.log('App is online')
    if (onlineCallback) onlineCallback()
  })

  window.addEventListener('offline', () => {
    console.log('App is offline')
    if (offlineCallback) offlineCallback()
  })

  // Return current status
  return isOnline()
}

/**
 * Clear all caches (for debugging)
 */
export async function clearAllCaches() {
  if ('caches' in window) {
    const cacheNames = await caches.keys()
    await Promise.all(cacheNames.map(name => caches.delete(name)))
    return true
  }
  return false
}
