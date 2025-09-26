// Service Worker for Islam Kassem's Portfolio - kassem.dev
// Developed by Islam Kassem

const CACHE_NAME = 'islam-kassem-portfolio-v1.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/critical.css',
  '/css/styles.css',
  '/css/performance.css',
  '/scripts/script.js',
  '/assets/profile-photo-256.png',
  '/assets/profile-photo-white-bg.webp',
  '/assets/favicon_io/favicon-32x32.png',
  '/assets/favicon_io/apple-touch-icon.png',
  '/resume/',
  '/resume/index.html',
  '/blog/',
  '/blog/index.html'
];

// Install event - cache resources
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Service Worker: Caching Islam Kassem portfolio files');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Clearing old cache');
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Handle background sync for offline analytics
self.addEventListener('sync', function(event) {
  if (event.tag === 'islam-kassem-analytics') {
    event.waitUntil(sendAnalytics());
  }
});

function sendAnalytics() {
  // Send any queued analytics data when back online
  return Promise.resolve();
}