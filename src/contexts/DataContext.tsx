import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { Character, LegendaryEffect } from '../types';
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
    const mergeEffects = (savedEffects?: LegendaryEffect[]) => {
        if (!Array.isArray(savedEffects)) {
            return legendaryEffects;
        }

        const savedById = new Map(savedEffects.map((effect) => [effect.id, effect]));
        const baseIds = new Set(legendaryEffects.map((effect) => effect.id));

        const merged = legendaryEffects.map((base) => ({
            ...base,
            unlocked: savedById.get(base.id)?.unlocked ?? base.unlocked,
        }));

        const extraSaved = savedEffects.filter((effect) => !baseIds.has(effect.id));

        return [...merged, ...extraSaved];
    };

    const initializeCharacters = (): Character[] => {
        const stored = localStorage.getItem('fo76trackerData');
        if (stored) {
            try {
                const parsed = JSON.parse(stored) as Character[];
                return parsed.map((char) => ({
                    ...char,
                    effects: mergeEffects(char.effects),
                }));
            } catch {
                // Si el JSON está corrupto, conservar los datos existentes es imposible;
                // inicializamos con los valores por defecto actualizados.
            }
        }

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
