require('serviceworker-cache-polyfill');

var CACHE_NAME = 'v1';

var urlsToCache = [
  '/',
  '/app.js',
  'node_modules/todomvc-common/base.css',
  'node_modules/todomvc-app-css/index.css'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
