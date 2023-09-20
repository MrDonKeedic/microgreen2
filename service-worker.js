// service-worker.js

const CACHE_NAME = 'my-microgreens-app';
const urlsToCache = [
    '/',  // Add other URLs you want to cache
    '/style.css',
    '/script.js',
    // Add other files you want to cache
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => response || fetch(event.request))
    );
});
