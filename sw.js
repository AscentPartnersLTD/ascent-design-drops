/* Col du Fantasy - service worker for on-the-clock web push (v1, 2026-07-19).
   Pushes arrive with NO payload (VAPID-only, no message encryption); the
   notification text is fixed here. */
self.addEventListener('install', function (e) { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(clients.claim()); });

self.addEventListener('push', function (e) {
  e.waitUntil(self.registration.showNotification("You're on the clock", {
    body: "Col du Fantasy - your pick is up. Tap to open the board.",
    icon: "tour-icon-192.png",
    badge: "tour-icon-192.png",
    tag: "cdf-clock",
    renotify: true
  }));
});

self.addEventListener('notificationclick', function (e) {
  e.notification.close();
  e.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (list) {
    for (var i = 0; i < list.length; i++) { if ('focus' in list[i]) return list[i].focus(); }
    return clients.openWindow('./');
  }));
});
