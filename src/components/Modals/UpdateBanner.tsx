export const UpdateBanner = () => {
    const handleUpdate = async () => {
        if (!('serviceWorker' in navigator)) {
            window.location.reload();
            return;
        }

        const registration = await navigator.serviceWorker.ready;
        const waitingWorker = registration.waiting;

        if (waitingWorker) {
            waitingWorker.postMessage({ type: 'SKIP_WAITING' });

            const reloadPage = () => window.location.reload();
            navigator.serviceWorker.addEventListener(
                'controllerchange',
                reloadPage,
                { once: true },
            );

            window.setTimeout(reloadPage, 2000);
            return;
        }

        registration.active?.postMessage({ type: 'SKIP_WAITING' });
        window.location.reload();
    };

    return (
        <div
            className="fixed top-0 w-full bg-gray-500 text-white p-5 text-center cursor-pointer"
            onClick={handleUpdate}>
            Nueva versión disponible!! Click aquí para recargar
        </div>
    );
};
