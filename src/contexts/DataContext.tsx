import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { LegendaryEffect } from '../types';
import { legendaryEffects } from '../db/LegendaryEffectsDB';

type DataContextType = {
    effects: LegendaryEffect[];
    toggleUnlockedEffect: (id: string) => void;
};

export const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
    const [effects, setEffects] = useState(legendaryEffects);

    const toggleUnlockedEffect = (id: string) => {
        const temp = effects.map((el) =>
            el.id === id ? { ...el, unlocked: !el.unlocked } : el,
        );
        setEffects(temp);
    };

    return (
        <DataContext.Provider value={{ effects, toggleUnlockedEffect }}>
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
