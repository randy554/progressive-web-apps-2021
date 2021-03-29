const staticCacheName = "static";
const dynamicCache = "history";
const assets = [
  "/css/index.css",
  "/js/index.js",
  "https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap",
  "/images/icons/favicon.png",
  "/images/icons/Icon-192.png",
  "/offline",
];

// Listen to the installation of the service worker
self.addEventListener("install", (evt) => {
  console.log("service worker has been installed");

  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log("Caching assets");
      cache.addAll(assets);
    })
  );
});

// Listen to activate event
self.addEventListener("activate", (evt) => {
  console.log("service worker has been activated");
});

// Listen to fetch events
self.addEventListener("fetch", (evt) => {
  // console.log("service worker fetch event has occurred", evt);

  // Cache detail-page images if not in cache
  if (
    // evt.request.destination === "image" &&
    evt.request.url.includes("gif")
  ) {
    // respondewith
    evt.respondWith(
      // open dynamic cache
      caches.open(dynamicCache).then((cache) => {
        // check for a match with request url
        return cache.match(evt.request).then((cacheResponse) => {
          return (
            cacheResponse ||
            fetch(evt.request).then((fetchResponse) => {
              return caches.open(dynamicCache).then((dcCache) => {
                dcCache.put(evt.request.url, fetchResponse.clone());
                return fetchResponse;
              });
            })
          );
        });
      })
    );
  } else {
    evt.respondWith(
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
