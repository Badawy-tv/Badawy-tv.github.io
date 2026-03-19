const CACHE_NAME = 'badawy-tv-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/css/layout.css',
  '/assets/css/style.css',
  '/assets/css/responsive.css',
  '/assets/js/components.js',
  '/assets/js/donation-bar.js',
  '/assets/images/logo.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
