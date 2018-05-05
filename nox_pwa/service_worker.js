var cacheName = 'nox-v1';

self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] Install');
});

self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request).then(function(r) {
            console.log('[ServiceWorker] Fetching resource: ' + e.request.url);
            return r || fetch(e.request).then(function(response) {
                return caches.open(cacheName).then(function(cache) {
                    console.log('[ServiceWorker] Caching new resource: ' + e.request.url);
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })
    );
});
