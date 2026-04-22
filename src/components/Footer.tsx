import { FaInstagram, FaFacebookSquare, FaTiktok } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

export const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    return (
        <div className="text-center mt-10">
            <button
                className="p-3 bg-gray-700 rounded-xl cursor-pointer"
                onClick={scrollToTop}>
                Volver arriba
            </button>
            <footer className="mt-5 p-3 flex flex-col items-center justify-center bg-gray-800">
                <p className="p-3 bg-gray-800">
                    Creado por <strong>SrGoodneighbor</strong> ™ 2026
                </p>
                <div className="p-3 flex text-2xl">
                    <FaInstagram className="mx-3" />
                    <FaFacebookSquare className="mx-3" />
                    <FaTiktok className="mx-3" />
                    <FaXTwitter className="mx-3" />
                </div>
            </footer>
        </div>
    );
};
