// Minimal service worker: offline caching + push notification display.
const CACHE = "nca-v1";

self.addEventListener("install", (e) => { self.skipWaiting(); });
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  // Network first, fall back to cache when offline; cache successful responses.
  e.respondWith(
    fetch(req).then((res) => {
      const copy = res.clone();
      caches.open(CACHE).then((c) => c.put(req, copy));
      return res;
    }).catch(() => caches.match(req).then((hit) => hit || caches.match("/dashboard")))
  );
});

self.addEventListener("push", (e) => {
  const data = e.data ? e.data.json() : { title: "NCA Safe Space", body: "You have a new update." };
  e.waitUntil(self.registration.showNotification(data.title, { body: data.body, icon: "/icon-192.png" }));
});
