import {} from 'babel-core/polyfill';
import {} from 'serviceworker-cache-polyfill';

const CACHE_NAME = 'v4';

const urlsToCache = [
  '/',
  '/app.js',
  '/node_modules/todomvc-common/base.css',
  '/node_modules/todomvc-app-css/index.css',
];

const whiteList = urlsToCache.concat([
  '/get'
]);

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

const host = location.protocol + "//" + location.host;

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request, { cacheName: CACHE_NAME })
      .then(function(response) {
        return fetch(event.request).then((response) => {

          let isAllowed = whiteList.includes(response.url.replace(host, ''));

          if(isAllowed && response.status === 200) {
            return caches.open(CACHE_NAME)
              .then(cache => cache.put(event.request, response.clone()))
              .then(r => response);
          }
          return response;
        }, function() {
          if(response) {
            return Promise.resolve(response.clone());
          }
        });
      })
    );
});
