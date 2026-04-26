import { FaGear } from 'react-icons/fa6';

export const Header = () => {
    return (
        <header>
            <h1 className='p-3 text-xl text-center italic'>
                <div className='flex items-center justify-center text-3xl'>
                    <span className='font-semibold'>Fallout</span>
                    <span className='ml-1 text-center text-yellow-400'>
                        <FaGear />
                    </span>
                    <span className='font-semibold'>76</span>
                </div>
                <div className='flex flex-col'>
                    <span className='text-yellow-400 text-3xl'>★ ★ ★</span>
                    <span>Legendary Tracker</span>
                </div>
            </h1>
        </header>
    );
};
