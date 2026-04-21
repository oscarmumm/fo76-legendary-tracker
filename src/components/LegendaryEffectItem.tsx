import { useState, type JSX } from 'react';
import type { LegendaryEffect } from '../types';
import { FaUnlock, FaLock } from 'react-icons/fa';
import { FaGun } from 'react-icons/fa6';
import { LuSword } from 'react-icons/lu';
import { GiShoulderArmor, GiBlackKnightHelm } from 'react-icons/gi';
import { MdKeyboardArrowDown } from 'react-icons/md';

type LegendaryEffectItemProps = {
    effect: LegendaryEffect;
    toggleUnlockedEffect: (id: string) => void;
    key: string;
};

const categoryIcons: Record<
    'ranged' | 'melee' | 'armor' | 'power armor',
    JSX.Element
> = {
    melee: <LuSword />,
    ranged: <FaGun />,
    armor: <GiShoulderArmor />,
    'power armor': <GiBlackKnightHelm />,
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
        <li key={effect.id} className="flex flex-col mt-3 text-lg">
            <div className="flex justify-between">
                <div
                    onClick={toggleDescription}
                    className="py-3 px-1 flex items-center cursor-pointer rounded-xl hover:bg-gray-700">
                    <span className="hover:bg-gray-700">{effect.name}</span>
                    <MdKeyboardArrowDown />
                    <div className='flex'>
                        {effect.category.map((cat) => (
                            <span className='ml-3 text-sky-400'>{categoryIcons[cat]}</span>
                        ))}
                    </div>
                </div>
                <button
                    className="p-3 cursor-pointer rounded-xl hover:scale-125 hover:bg-gray-700"
                    onClick={() => toggleUnlockedEffect(effect.id)}>
                    {effect.unlocked ? (
                        <FaUnlock className="text-green-500" />
                    ) : (
                        <FaLock className="text-red-600" />
                    )}
                </button>
            </div>
            {open && (
                <p className="p-3 text-base italic text-gray-200 bg-gray-700 rounded-xl">
                    {effect.description}
                </p>
            )}
        </li>
    );
};
