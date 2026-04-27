import { useState } from 'react';
import { useData } from '../contexts/DataContext';
import type { Character } from '../types';

export const CharacterFormModal = () => {
    const { characters, activeCharacterId } = useData();
    const [characterName, setCharacterName] = useState<string>(() => {
        const activeCharacter = characters.find(
            (c) => c.id === activeCharacterId,
        );
        return activeCharacter ? activeCharacter.name : '';
    });
    return (
        <div className='modal items-center justify-center'>
            <form className='p-3 bg-gray-800'>
                <input
                    className='p-3 bg-slate-50 text-slate-900 rounded-xl outline-none'
                    onChange={(e) => setCharacterName(e.target.value)}
                    type='text'
                    value={characterName}
                    placeholder={activeCharacterId}
                />
                <button>Guardar</button>
                <button>Cancelar</button>
            </form>
        </div>
    );
};
