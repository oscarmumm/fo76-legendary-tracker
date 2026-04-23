import { FaGear } from 'react-icons/fa6';

export const Header = () => {
    return (
        <header>
            <h1 className="p-5 text-3xl text-center italic">
                <div className='flex items-center justify-center text-5xl'>
                    <span className='font-semibold'>Fallout</span>
                    <span className="ml-2 text-center text-yellow-400">
                        <FaGear />
                    </span>
                    <span className='font-semibold'>76</span>
                </div>
                <span className='text-yellow-400'>★</span>
                <span className='mx-2'>Seguimiento de Efectos Legendarios</span>
                <span className='text-yellow-400'>★</span>
            </h1>
        </header>
    );
};
