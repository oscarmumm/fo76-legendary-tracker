export const UpdateBanner = () => {
    return (
        <div
            className="fixed top-0 w-full bg-gray-500 text-white p-5 text-center cursor-pointer"
            onClick={() => window.location.reload()}>
            Nueva versión disponible!! Click aquí para recargar
        </div>
    );
};
