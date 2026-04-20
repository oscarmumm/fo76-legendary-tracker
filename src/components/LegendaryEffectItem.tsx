import { useState } from 'react';
import { FaUnlock, FaLock } from 'react-icons/fa';
import type { LegendaryEffect } from '../types';

type LegendaryEffectItemProps = {
    effect: LegendaryEffect;
    toggleUnlockedEffect: (id: string) => void;
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
        <>
            <li
                key={effect.id}
                className="flex justify-between align-center mt-3">
                <span
                    onClick={toggleDescription}
                    className="p-1 cursor-pointer">
                    {effect.name}
                </span>
                <button
                    className="p-3 cursor-pointer rounded-md hover:scale-125 hover:bg-gray-700"
                    onClick={() => toggleUnlockedEffect(effect.id)}>
                    {effect.unlocked ? (
                        <FaUnlock className="text-green-500" />
                    ) : (
                        <FaLock className="text-red-600" />
                    )}
                </button>
            </li>
            {open && <p className="p-3 text-base italic text-gray-200 bg-gray-700 rounded-bl-lg rounded-br-lg">{effect.description}</p>}
        </>
    );
};
