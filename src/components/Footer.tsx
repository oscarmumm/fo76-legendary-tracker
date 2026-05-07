import { FaInstagram, FaFacebookSquare, FaTiktok } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { useEffect, useState } from 'react';

export const Footer = () => {
    const [version, setVersion] = useState<string>('1.0.2');

    useEffect(() => {
        const fetchVersion = async () => {
            try {
                const response = await fetch('/manifest.json?cache-bust=' + Date.now());
                const manifest = await response.json();
                setVersion(manifest.version || '1.0.2');
            } catch (error) {
                console.error('Error fetching version:', error);
            }
        };

        fetchVersion();
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    return (
        <div className="text-center mt-10 w-full">
            <button
                className="p-3 bg-gray-700 rounded-xl cursor-pointer"
                onClick={scrollToTop}>
                Volver arriba
            </button>
            <footer className="mt-5 p-3 flex flex-col items-center justify-center bg-gray-800">
                <p className="p-3 bg-gray-800">
                    Creado por <strong className='font-bold'>SrGoodneighbor</strong> ™ 2026
                </p>
                <p className="p-3 bg-gray-800">
                    Version {version}
                </p>
                <div className="p-3 flex text-3xl">
                    <a
                        href="https://www.instagram.com/srgoodneighbor/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className='cursor-pointer hover:text-sky-400'>
                        <FaInstagram className="mx-5" />
                    </a>
                    <a
                        href="https://www.facebook.com/srgoodneighbor"
                        target="_blank"
                        rel="noopener noreferrer"
                        className='cursor-pointer hover:text-sky-400'>
                        <FaFacebookSquare className="mx-5" />
                    </a>
                    <a
                        href="https://www.tiktok.com/@srgoodneighbor"
                        target="_blank"
                        rel="noopener noreferrer"
                        className='cursor-pointer hover:text-sky-400'>
                        <FaTiktok className="mx-5" />
                    </a>
                    <a
                        href="https://x.com/SrGoodneighbor"
                        target="_blank"
                        rel="noopener noreferrer"
                        className='cursor-pointer hover:text-sky-400'>
                        <FaXTwitter className="mx-5" />
                    </a>
                </div>
            </footer>
        </div>
    );
};
