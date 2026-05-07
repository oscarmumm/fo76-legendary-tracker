export const UpdateBanner = () => {
    const handleUpdate = async () => {
        if ('serviceWorker' in navigator) {
            const registration = await navigator.serviceWorker.ready;
            registration.active?.postMessage('SKIP_WAITING');
            
            navigator.serviceWorker.addEventListener('controllerchange', () => {
                window.location.reload();
            });
        } else {
            window.location.reload();
        }
    };

    return (
        <div
            className="fixed top-0 w-full bg-gray-500 text-white p-5 text-center cursor-pointer"
            onClick={handleUpdate}>
            Nueva versión disponible!! Click aquí para recargar
        </div>
    );
};
