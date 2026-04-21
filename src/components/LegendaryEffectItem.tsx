import { useState } from 'react';
import type { LegendaryEffect } from '../types';
import { FaUnlock, FaLock } from 'react-icons/fa';

type LegendaryEffectItemProps = {
    effect: LegendaryEffect;
    toggleUnlockedEffect: (id: string) => void;
    key: string;
};

export const LegendaryEffectItem = ({
    effect,
    toggleUnlockedEffect,
}: LegendaryEffectItemProps) => {
    const [open, setOpen] = useState(false);
    const toggleDescription = () => {
        setOpen(!open);
    };

    return (
        <li key={effect.id} className='flex flex-col mt-3'>
            <div className='flex justify-between'>
                <div
                    onClick={toggleDescription}
                    className='p-3 flex items-center cursor-pointer rounded-xl hover:bg-gray-700'
                >
                    <span className='p-1 hover:bg-gray-700'>{effect.name}</span>
                </div>
                <button
                    className='p-3 cursor-pointer rounded-xl hover:scale-125 hover:bg-gray-700'
                    onClick={() => toggleUnlockedEffect(effect.id)}
                >
                    {effect.unlocked ? (
                        <FaUnlock className='text-green-500' />
                    ) : (
                        <FaLock className='text-red-600' />
                    )}
                </button>
            </div>
            {open && (
                <p className='p-3 text-base italic text-gray-200 bg-gray-700 rounded-bl-lg rounded-br-lg'>
                    {effect.description}
                </p>
            )}
        </li>
    );
};
