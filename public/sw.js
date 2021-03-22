const staticCacheName = "site-static";
const assets = [
  "/",
  "/css/index.css",
  "/js/index.js",
  "https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap",
  "/images/icons/favicon.png",
  "/images/icons/Icon-192.png",
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
});
