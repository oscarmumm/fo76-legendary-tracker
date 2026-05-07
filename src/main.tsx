import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { DataProvider } from './contexts/DataContext.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <DataProvider>
            <App />
        </DataProvider>
    </StrictMode>,
);

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('/service-worker.js')
            .then((registration) => {
                console.log('✅ Service Worker registrado:', registration);
                if (navigator.onLine) {
                    registration.update();
                }

                window.addEventListener('online', () => {
                    if (navigator.onLine) {
                        registration.update();
                    }
                });

                window.setInterval(() => {
                    if (navigator.onLine) {
                        registration.update();
                    }
                }, 30 * 60 * 1000);
            })
            .catch((error) => {
                console.error('❌ Error al registrar SW:', error);
            });
    });
}
