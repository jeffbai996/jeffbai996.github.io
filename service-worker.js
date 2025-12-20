// Service Worker for GOV.PRAYA PWA
const CACHE_NAME = 'govpraya-v1'
const RUNTIME_CACHE = 'govpraya-runtime'

// Assets to cache on install
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/favicon.svg',
  '/manifest.json'
]

// Install event - cache core assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => self.clients.claim())
  )
})

// Fetch event - network first, fallback to cache
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return
  }

  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return
  }

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Return cached response if found
        if (cachedResponse) {
          // Update cache in background
          fetch(event.request)
            .then((networkResponse) => {
              if (networkResponse && networkResponse.status === 200) {
                caches.open(RUNTIME_CACHE).then((cache) => {
                  cache.put(event.request, networkResponse.clone())
                })
              }
            })
            .catch(() => {}) // Fail silently if network request fails

          return cachedResponse
        }

        // No cached response, try network
        return fetch(event.request)
          .then((networkResponse) => {
            // Cache successful responses
            if (networkResponse && networkResponse.status === 200) {
              const responseToCache = networkResponse.clone()
              caches.open(RUNTIME_CACHE).then((cache) => {
                cache.put(event.request, responseToCache)
              })
            }
            return networkResponse
          })
          .catch(() => {
            // Network failed, return offline page if it's a navigation request
            if (event.request.mode === 'navigate') {
              return caches.match('/offline.html')
            }
          })
      })
  )
})

// Background sync
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-data') {
    event.waitUntil(syncData())
  }
})

async function syncData() {
  // Sync any pending data when back online
  console.log('Background sync triggered')
}

// Push notifications
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New update from GOV.PRAYA',
    icon: '/favicon.svg',
    badge: '/favicon.svg',
    vibrate: [200, 100, 200],
    tag: 'govpraya-notification',
    requireInteraction: false
  }

  event.waitUntil(
    self.registration.showNotification('GOV.PRAYA', options)
  )
})

// Notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  event.waitUntil(
    clients.openWindow('/')
  )
})
