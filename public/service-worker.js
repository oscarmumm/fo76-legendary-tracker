// Variables de configuración
const CACHE_NAME = 'fo76-cache-v5';
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
    console.log('📥 Instalando service worker v5...');
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('📦 Pre-cacheando assets...');
            return cache.addAll(URLS_TO_CACHE).then(() => {
                console.log('✅ Assets pre-cacheados exitosamente');
                self.skipWaiting();
            }).catch((error) => {
                console.error('❌ Error pre-cacheando:', error);
                self.skipWaiting();
            });
        }),
    );
});

// Cuando se activa el service worker
self.addEventListener('activate', (event) => {
    event.waitUntil(
        (async () => {
            // Limpiar caches antiguos
            const cacheNames = await caches.keys();
            await Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('🗑️ Eliminando cache antiguo:', cacheName);
                        return caches.delete(cacheName);
                    }
                }),
            );

            // Pre-cachear todos los assets en la nueva versión
            try {
                const cache = await caches.open(CACHE_NAME);
                const cachedUrls = await cache.keys();
                const cachedUrlStrings = cachedUrls.map(req => req.url);

                const urlsToAdd = URLS_TO_CACHE.filter(
                    url => !cachedUrlStrings.some(cachedUrl => cachedUrl.includes(url))
                );

                if (urlsToAdd.length > 0) {
                    console.log('📦 Pre-cacheando nuevos assets:', urlsToAdd);
                    await cache.addAll(urlsToAdd);
                }
            } catch (error) {
                console.error('❌ Error pre-cacheando assets:', error);
            }

            return self.clients.claim();
        })(),
    );
});

async function networkFirst(request) {
    try {
        const response = await fetch(request);
        if (response && response.status === 200) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, response.clone());
        }
        return response;
    } catch (error) {
        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        return new Response('Offline', { status: 503 });
    }
}

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

    // Assets - usar networkFirst para obtener versión más nueva
    if (
        url.pathname.includes('/assets/') ||
        url.pathname.endsWith('.png') ||
        url.pathname.endsWith('.ico') ||
        url.pathname.endsWith('.js') ||
        url.pathname.endsWith('.css')
    ) {
        event.respondWith(
            networkFirst(request).catch(() =>
                new Response('Offline', { status: 503 }),
            ),
        );
        return;
    }

    // HTML y manifest - usar cacheFirst
    if (url.pathname === '/' || url.pathname.endsWith('.html') || url.pathname.endsWith('.json')) {
        event.respondWith(
            cacheFirst(request).catch(() =>
                new Response('Offline', { status: 503 }),
            ),
        );
        return;
    }

    // Por defecto - cacheFirst
    event.respondWith(
        cacheFirst(request).catch(() =>
            new Response('Offline', { status: 503 }),
        ),
    );
});

// Verifica si hay versión nueva disponible
self.addEventListener('message', (event) => {
    const message = event.data;

    if (message === 'checkForUpdate') {
        event.waitUntil(
            (async () => {
                const hasUpdate = await checkForUpdate();
                if (hasUpdate) {
                    await broadcastMessage({ type: 'NEW_VERSION_AVAILABLE' });
                }
            })(),
        );
    }

    if (message === 'SKIP_WAITING' || message?.type === 'SKIP_WAITING') {
        event.waitUntil(self.skipWaiting());
    }
});
