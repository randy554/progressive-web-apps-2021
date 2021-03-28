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
  console.log("service worker fetch event has occurred", evt);

  // evt.respondWith(
  //   caches.match(evt.request).then((cacheResponse) => {
  //     return cacheResponse || fetch(evt.request);
  //   })
  // );

  if (evt.request.url.includes("history")) {
    console.log("BINNEN MAN");
    evt.respondWith(
      caches.match(evt.request.url).then((cacheResponse) => {
        return cacheResponse || fetch(evt.request);
      })
    );
  }
  // kijk hier
  if (evt.request.url.includes("/detail")) {
    caches.open(dynamicCache).then((cache) => {
      return cache.add(evt.request.url);
    });
  }

  // if (evt.request.url.includes("detail")) {
  //   evt.respondWith(
  //     caches.open(dynamicCache).then((cache) => {
  //       console.log("History cash open");
  //       cache.match(evt.request.url).then((cacheResponse) => {
  //         return cacheResponse;
  //       });
  //     })
  //   );
  // }

  // else {

  //     // Pause fetch event & respond with own custom event
  // evt.respondWith(
  //   caches
  //     .match(evt.request)
  //     .then((cacheResponse) => {
  //       return (
  //         cacheResponse ||
  //         fetch(evt.request).then((fetchResponse) => {
  //           return caches.open(staticCacheName).then((cache) => {
  //             cache.put(evt.request.url, fetchResponse.clone());
  //             return fetchResponse;
  //           });
  //         })
  //       );
  //     })
  //     .catch(() => caches.match("/offline"))
  // );

  // }
});
