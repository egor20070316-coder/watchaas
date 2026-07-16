const CACHE_NAME = 'watchaas-pwa-v3';
const APP_SHELL = [
  './',
  './index.html',
  './offline.html',
  './manifest.json',
  './assets/css/style.css',
  './assets/js/app.js',
  './assets/img/logo.svg',
  './assets/img/watchaas-logo.png',
  './assets/img/icons/pwa-icon-192.png',
  './assets/img/icons/pwa-icon-512.png',
  './assets/img/watches/real-01.jpg',
  './assets/img/watches/real-02.jpg',
  './assets/img/watches/real-03.jpg',
  './assets/img/watches/real-04.jpg',
  './assets/img/watches/real-05.jpg',
  './assets/img/watches/real-06.jpg',
  './assets/img/watches/real-08.jpg',
  './assets/img/watches/real-09.jpg',
  './assets/img/watches/real-10.jpg',
  './assets/img/watches/real-11.jpg',
  './assets/img/watches/real-12.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(
      cacheNames
        .filter((cacheName) => cacheName !== CACHE_NAME)
        .map((cacheName) => caches.delete(cacheName))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, response.clone()));
          return response;
        })
        .catch(() => caches.match(event.request).then((cached) => cached || caches.match('./offline.html')))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        if (response && response.ok) {
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, response.clone()));
        }
        return response;
      });
    })
  );
});
