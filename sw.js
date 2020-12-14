const cacheName = "unplashImages";
const staticAssets = [
  "./",
  "./images",
  "./index.html",
  "./style.css",
  "./manifest-webmanifest",
];

// install all the static assets on service worker installation
self.addEventListener("install", async (e) => {
  const cache = await caches.open(cacheName);
  await cache.addAll(staticAssets);
  return self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  self.clients.claim();
});

// When browser fetch event is called, parse it
self.addEventListener("fetch", (e) => {
  const req = e.request;
  const url = new URL(req.url);
  // if the origin is same, get data from cache
  if (url.origin === location.origin) {
    e.respondWith(cacheFirst(req));
  } else {
    //otherwise get data and save in cache
    e.respondWith(networkAndCache(req));
  }
});

async function cacheFirst(req) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  return cached || fetch(req);
}

async function networkAndCache(req) {
  const cache = await caches.open(cacheName);
  try {
    const fresh = await fetch(req);
    await cache.put(req, fresh.clone());
    return fresh;
  } catch (error) {
    const cached = await cache.match(req);
    return cached;
  }
}
