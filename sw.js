/**
 * Auto 28 Landing Page - Service Worker (SW 2026 PWA Core)
 * Strategy: Stale-While-Revalidate with Cache Quota Safety & Search Normalization
 */

const CACHE_NAME = 'auto28-v2.1.0-cache';
const MAX_IMAGE_CACHE_ITEMS = 30;
const PRECACHE_ASSETS = [
    '/',
    '/style.css',
    '/main.js?v=2.1.0',
    '/cars_data.js?v=2.1.0',
    '/modules/car-modal.js?v=2.1.0',
    '/modules/car-filter.js?v=2.1.0',
    '/modules/ui-effects.js?v=2.1.0',
    '/assets/logos/logo.jpg'
];

// ⚡ Helper: Trim cache to max allowed items (LRU Eviction with while loop)
async function trimCache(cacheName, maxItems) {
    try {
        const cache = await caches.open(cacheName);
        const keys = await cache.keys();
        const imageKeys = keys.filter(req => req.url.includes('cloudinary.com'));
        let excessCount = imageKeys.length - maxItems;
        let idx = 0;
        while (excessCount > 0 && idx < imageKeys.length) {
            await cache.delete(imageKeys[idx]);
            excessCount--;
            idx++;
        }
    } catch (e) {
        console.warn('SW Trim Cache Error:', e);
    }
}

// ⚡ Install Event: Pre-cache core app shell assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(PRECACHE_ASSETS);
        }).then(() => self.skipWaiting())
    );
});

// 🧹 Activate Event: Clean up legacy caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// 🚀 Fetch Event: Stale-While-Revalidate strategy for sub-second response
self.addEventListener('fetch', (event) => {
    // Only handle GET requests
    if (event.request.method !== 'GET') return;

    const url = new URL(event.request.url);

    // Don't intercept analytics or external trackers
    if (url.origin !== location.origin && !url.hostname.includes('cloudinary.com')) {
        return;
    }

    event.respondWith(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.match(event.request, { ignoreSearch: true }).then((cachedResponse) => {
                const fetchPromise = fetch(event.request).then((networkResponse) => {
                    if (networkResponse && (networkResponse.status === 200 || networkResponse.type === 'opaque')) {
                        cache.put(event.request, networkResponse.clone());
                        if (url.hostname.includes('cloudinary.com')) {
                            trimCache(CACHE_NAME, MAX_IMAGE_CACHE_ITEMS);
                        }
                    }
                    return networkResponse;
                }).catch(() => {
                    return cachedResponse;
                });

                return cachedResponse || fetchPromise;
            });
        })
    );
});
