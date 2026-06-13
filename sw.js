const CACHE = 'pubgolf-v1';
const ASSETS = [
  './pub-golf.html',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(cache) {
      return Promise.allSettled(ASSETS.map(function(url) {
        return cache.add(url).catch(function() {});
      }));
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.filter(function(k) { return k !== CACHE; }).map(function(k) { return caches.delete(k); }));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  // Network first for map tiles and live score API, cache-first for everything else
  var url = e.request.url;
  if (url.includes('firebaseio.com') || url.includes('firebasedatabase.app') || url.includes('googleapis.com') || url.includes('cartocdn') || url.includes('openstreetmap')) {
    e.respondWith(fetch(e.request).catch(function() { return caches.match(e.request); }));
    return;
  }
  e.respondWith(
    caches.match(e.request).then(function(cached) {
      return cached || fetch(e.request).then(function(response) {
        var clone = response.clone();
        caches.open(CACHE).then(function(cache) { cache.put(e.request, clone); });
        return response;
      });
    })
  );
});
