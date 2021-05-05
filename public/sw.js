// source: https://www.youtube.com/watch?v=CHBoXdVdPi0&list=PL4cUxeGkcC9gTxqJBcDmoi5Q2pzDusSL7&index=21
const staticCacheName = "static";
const dynamicCache = "history";
const assets = [
  "/css/index.css",
  "/js/index.js",
  "/js/history.js",
  "/images/icons/favicon.png",
  "/images/icons/Icon-192.png",
  "/offline",
];

// Keep dynamic cache limit in check
let limitCacheSize = (cachename, size) => {
  caches.open(cachename).then((cache) => {
    cache.keys().then((key) => {
      if (key.length > size) {
        cache.delete(key[0]).then(limitCacheSize(cachename, size));
      }
    });
  });
};

// Listen to the installation of the service worker
self.addEventListener("install", (evt) => {
  console.log("service worker has been installed");

  evt.waitUntil(
    caches
      .open(staticCacheName)
      .then((cache) => {
        // Add assets to the cache
        cache.addAll(assets);
      })
      .then(() => self.skipWaiting())
  );
});

// Listen to activate event.
self.addEventListener("activate", (evt) => {});

// Listen to fetch events.
self.addEventListener("fetch", (evt) => {
  // Cache detail-page images if not in cache.
  if (evt.request.url.includes("gif")) {
    console.log("Request heeft GIF", evt.request.url);
    // pause fetch and respond with custom event
    evt.respondWith(
      // open dynamic cache.
      caches.open(dynamicCache).then((cache) => {
        // check for a match with request url.
        return cache.match(evt.request).then((cacheResponse) => {
          // responde if gif req in cache || fetch req & add cache
          return (
            cacheResponse ||
            fetch(evt.request)
              .then((fetchResponse) => {
                caches.open(dynamicCache).then((dcCache) => {
                  dcCache.put(evt.request, fetchResponse.clone());
                  limitCacheSize(dynamicCache, 3);
                  return dcCache;
                });
                return fetchResponse.clone();
              })
              .catch(console.error)
          );
        });
      })
    );
  } else {
    console.log("Request heeft GEEN GIF", evt.request.url);
    // pause fetch and respond with custom event
    evt.respondWith(
      // other request if in static cache serve || fetch req
      caches.open(staticCacheName).then((cache) => {
        return cache
          .match(evt.request)
          .then((assetCache) => {
            return (
              assetCache ||
              fetch(evt.request).then((response) => {
                return response;
              })
            );
          })
          .catch(() => {
            return caches
              .open(staticCacheName)
              .then((cache) => cache.match("/offline"));
          });
      })
    );
  }
});
