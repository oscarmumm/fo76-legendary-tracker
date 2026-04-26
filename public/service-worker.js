// Variables de configuración
const CACHE_NAME = 'fo76-cache-v2';
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

// Instalando el service worker
self.addEventListener('install', (event) => {
    console.log('Service worker instalando...');

    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Cacheando archivos críticos');
            return cache.addAll(URLS_TO_CACHE);
        }),
    );

    self.skipWaiting();
});

// Cuando se activa el service worker
self.addEventListener('activate', (event) => {
    console.log('Service worker activando...');

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Eliminando caché antigua: ', cacheName);
                        return caches.delete(cacheName);
                    }
                }),
            );
        }),
    );
    return self.clients.claim();
});

// Cuando el navegador hace una petición
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Solo cachear peticiones GET
    if (request.method !== 'GET') {
        return;
    }

    // Estrategia para assets (JS, CSS, PNG): Cache First
    if (url.pathname.includes('/assets/') || url.pathname.endsWith('.png') || url.pathname.endsWith('.ico')) {
        event.respondWith(
            caches.match(request).then((response) => {
                return response || fetch(request).then((response) => {
                    if (response && response.status === 200) {
                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(request, responseToCache);
                        });
                    }
                    return response;
                }).catch(() => new Response('Offline', { status: 503 }));
            }),
        );
        return;
    }

    // Estrategia para HTML: Network First
    if (url.pathname === '/' || url.pathname.endsWith('.html')) {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    if (response && response.status === 200) {
                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(request, responseToCache);
                        });
                    }
                    return response;
                })
                .catch(() => caches.match(request) || new Response('Offline', { status: 503 })),
        );
        return;
    }

    // Por defecto: Cache First
    event.respondWith(
        caches.match(request).then((response) => {
            return response || fetch(request).then((response) => {
                if (response && response.status === 200) {
                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(request, responseToCache);
                    });
                }
                return response;
            }).catch(() => new Response('Offline', { status: 503 }));
        }),
    );
});
