// source: https://developer.mozilla.org/en-US/docs/Web/API/Cache/keys
window.addEventListener("load", () => {
  let mainEl = document.querySelector("#offline");

  if (mainEl) {
    caches.open("history").then((cache) => {
      cache.keys().then((keys) => {
        if (keys.length > 0) {
          keys.forEach((cacheRequest) => {
            mainEl.insertAdjacentHTML(
              "beforeend",
              `<img src="${cacheRequest.url}" width="200" height="200">`
            );
          });
        }
      });
    });
  }
});
