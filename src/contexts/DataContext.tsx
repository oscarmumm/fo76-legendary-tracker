import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { LegendaryEffect, Character } from '../types';
import { legendaryEffects } from '../db/LegendaryEffectsDB';
import { useNotification} from '../hooks/useNotification';

type DataContextType = {
    characters: Character[];
    activeCharacterId: string;
    switchCharacter: (id: string) => void;
    toggleUnlockedEffect: (id: string, effect: string) => void;
    notificationActive: boolean;
    notificationMsg: string;
};

export const DataContext = createContext<DataContextType | undefined>(
    undefined,
);

export const DataProvider = ({ children }: { children: ReactNode }) => {
    // Declarar la función ANTES de usarla
    const initializeCharacters = (): Character[] => {
        const stored = localStorage.getItem('fo76trackerData');
        if (stored) {
            return JSON.parse(stored);
        }
        // Crear 5 personajes vacíos
        return Array.from({ length: 5 }, (_, i) => ({
            id: `character-${i + 1}`,
            name: `Personaje ${i + 1}`,
            effects: legendaryEffects,
        }));
    };

    const [characters, setCharacters] = useState<Character[]>(initializeCharacters);
    const [activeCharacterId, setActiveCharacterId] = useState<string>('character-1');
    const {notificationActive, notificationMsg, showNotification} = useNotification();

    useEffect(() => {
        localStorage.setItem('fo76trackerData', JSON.stringify(characters));
    }, [characters]);

    const toggleUnlockedEffect = (id: string, effect: string) => {
        setCharacters(chars =>
            chars.map(char =>
                char.id === activeCharacterId
                    ? {
                        ...char,
                        effects: char.effects.map(el =>
                            el.id === id ? { ...el, unlocked: !el.unlocked } : el,
                        ),
                    }
                    : char,
            ),
        );
        showNotification(effect);
    };

    const switchCharacter = (id: string) => {
        setActiveCharacterId(id);
    };

    return (
        <DataContext.Provider
            value={{ characters, activeCharacterId, switchCharacter, toggleUnlockedEffect, notificationActive, notificationMsg }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
