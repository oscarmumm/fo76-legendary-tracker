// Variables de configuración
const CACHE_NAME = 'fo76-cache-v3';
const URLS_TO_CACHE = [
    '/',
    '/manifest.json',
    '/favicon.ico',
    '/icons/icon-72x72.png',
    '/icons/icon-96x96.png',
    '/icons/icon-128x128.png',
    '/icons/icon-144x144.png',
    '/icons/icon-152x152.png',
    '/icons/icon-192x192.png',
    '/icons/icon-384x384.png',
    '/icons/icon-512x512.png',
    '/assets/index.css',
    '/assets/index.js',
];

async function broadcastMessage(message) {
    const clients = await self.clients.matchAll({ includeUncontrolled: true });
    clients.forEach((client) => client.postMessage(message));
}

async function checkForUpdate() {
    try {
        const cache = await caches.open(CACHE_NAME);
        const cachedManifest = await cache.match('/manifest.json');
        const cachedVersion = cachedManifest
            ? (await cachedManifest.clone().json()).version
            : null;

        const networkResponse = await fetch(
            '/manifest.json?cache-bust=' + Date.now(),
        );

        if (!networkResponse || networkResponse.status !== 200) {
            return false;
        }

        const networkManifest = await networkResponse.clone().json();

        if (cachedVersion !== networkManifest.version) {
            await cache.put('/manifest.json', networkResponse.clone());
            return true;
        }
    } catch (error) {
        // Puede estar offline o la petición falló
    }
    return false;
}

// Instalando el service worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(URLS_TO_CACHE);
        }),
    );
});

// Cuando se activa el service worker
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                }),
            );
        }),
    );
    return self.clients.claim();
});

async function cacheFirst(request) {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
        return cachedResponse;
    }

    const response = await fetch(request);
    if (response && response.status === 200) {
        cache.put(request, response.clone());
    }
    return response;
}

// Cuando el navegador hace una petición
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    if (request.method !== 'GET') {
        return;
    }

    if (
        url.pathname.includes('/assets/') ||
        url.pathname.endsWith('.png') ||
        url.pathname.endsWith('.ico')
    ) {
        event.respondWith(
            cacheFirst(request).catch(() =>
                new Response('Offline', { status: 503 }),
            ),
        );
        return;
    }

    if (url.pathname === '/' || url.pathname.endsWith('.html')) {
        event.respondWith(
            cacheFirst(request).catch(() =>
                new Response('Offline', { status: 503 }),
            ),
        );
        return;
    }

    event.respondWith(
        cacheFirst(request).catch(() =>
            new Response('Offline', { status: 503 }),
        ),
    );
});

// Verifica si hay versión nueva disponible
self.addEventListener('message', (event) => {
    if (event.data === 'checkForUpdate') {
        event.waitUntil(
            (async () => {
                const hasUpdate = await checkForUpdate();
                if (hasUpdate) {
                    await broadcastMessage({ type: 'NEW_VERSION_AVAILABLE' });
                }
            })(),
        );
    }

    if (event.data === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
