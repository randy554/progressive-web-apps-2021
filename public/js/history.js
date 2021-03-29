// console.log("HISTORY JS IS ALIVE!");
const dynamicCache = "history";

window.addEventListener("load", () => {
  let mainEl = document.querySelector("#offline");

  if (mainEl) {
    console.log("Offline page: ONLINE");

    caches.open(dynamicCache).then((cache) => {
      cache.keys().then((keys) => {
        keys.forEach((cacheRequest) => {
          // console.log("Item", cacheRequest.url);
          mainEl.insertAdjacentHTML(
            "beforeend",
            `<img src="${cacheRequest.url}" width="200" height="200">`
          );
        });
      });
      console.log("IN CACHE", cache.keys());
    });
  } else {
    console.log("Offline page: OFFLINE");
  }
});
