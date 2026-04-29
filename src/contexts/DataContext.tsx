import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { Character } from '../types';
import { legendaryEffects } from '../db/LegendaryEffectsDB';
import { useNotification } from '../hooks/useNotification';

type DataContextType = {
    characters: Character[];
    activeCharacterId: string;
    switchCharacter: (id: string) => void;
    toggleUnlockedEffect: (id: string, effect: string) => void;
    notificationActive: boolean;
    notificationMsg: string;
    updateCharacterName: (id: string, newName: string) => void;
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

    const [characters, setCharacters] =
        useState<Character[]>(initializeCharacters);
    const [activeCharacterId, setActiveCharacterId] =
        useState<string>('character-1');
    const { notificationActive, notificationMsg, showNotification } =
        useNotification();

    useEffect(() => {
        localStorage.setItem('fo76trackerData', JSON.stringify(characters));
    }, [characters]);

    const toggleUnlockedEffect = (id: string, effect: string) => {
        setCharacters((chars) =>
            chars.map((char) => {
                if (char.id === activeCharacterId) {
                    return {
                        ...char,
                        effects: char.effects.map((el) => {
                            if (el.id === id) {
                                if (!el.unlocked) {
                                    showNotification(effect);
                                }
                                return { ...el, unlocked: !el.unlocked };
                            }
                            return el;
                        }),
                    };
                }
                return char;
            }),
        );
    };

    const switchCharacter = (id: string) => {
        setActiveCharacterId(id);
    };

    const updateCharacterName = (id: string, newName: string) => {
        setCharacters((prev) =>
            prev.map((c) => (c.id === id ? { ...c, name: newName } : c)),
        );
    };

    return (
        <DataContext.Provider
            value={{
                characters,
                activeCharacterId,
                switchCharacter,
                toggleUnlockedEffect,
                notificationActive,
                notificationMsg,
                updateCharacterName,
            }}
        >
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
