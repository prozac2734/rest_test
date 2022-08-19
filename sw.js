self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
  e.waitUntil((async () => {
    console.log('[Service Worker] Caching all: app shell and content');
  })());
});