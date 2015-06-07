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


self.addEventListener("push", function(event) {
  let tag = 'unfinished-todo';
  let title = "Unfinished business!";
  event.waitUntil(
    fetch('/get')
      .then(r => r.json())
      .then(r => r.filter(t => !t.completed).length)
      .then(count => self.registration.showNotification(title, {
        tag,
        body: `You have ${count} unfinished todo!`
      }))
  );
});


self.addEventListener('notificationclick', function(event) {
  event.waitUntil(clients.matchAll({
    type: "window"
  }).then(function(clientList) {
    for (var i = 0; i < clientList.length; i++) {
      var client = clientList[i];
      if (client.url.indexOf(location.host) !== false)
        return client.focus();
    }
    if (clients.openWindow) {
      return clients.openWindow('/');
    }
  }));

});
