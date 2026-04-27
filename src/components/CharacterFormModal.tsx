import { useState } from 'react';
import { useData } from '../contexts/DataContext';
import type { Character } from '../types';

interface CharacterFormModalProps {
    name: Character['name'];
}

export const CharacterFormModal = ({ name }: CharacterFormModalProps) => {
    const { characters } = useData();
    const [characterName, setCharacterName] = useState(name);
    return (
        <div>
            <form>
                <input
                    onChange={(e) => setCharacterName(e.target.value)}
                    type="text"
                />
                <button>Guardar</button>
                <button>Cancelar</button>
            </form>
        </div>
    );
};
