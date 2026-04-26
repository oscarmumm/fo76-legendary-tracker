// Variables de configuración
const CACHE_NAME = 'fo76-cache-v1';
const URLS_TO_CACHE = ['/', '/manifest.json', '/favicon.ico'];

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

    // Solo cachear peticiones GET
    if (request.method !== 'GET') {
        return;
    }

    event.respondWith(
        // Primero intenta servir desde caché
        caches
            .match(request)
            .then((response) => {
                // Si está en caché, devolverlo
                if (response) {
                    return response;
                }

                // Si NO está en caché, descargar de la red
                return fetch(request).then((response) => {
                    // Si es una respuesta válida, cachearla para próximas veces
                    if (response && response.status === 200) {
                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(request, responseToCache);
                        });
                    }
                    return response;
                });
            })
            .catch(() => {
                // Si falla la red Y no está en caché
                return new Response('Offline - Sin caché disponible', {
                    status: 503,
                    statusText: 'Service Unavailable',
                });
            }),
    );
});
