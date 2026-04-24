import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { LegendaryEffect } from '../types';
import { legendaryEffects } from '../db/LegendaryEffectsDB';
import { useNotification} from '../hooks/useNotification';

type DataContextType = {
    effects: LegendaryEffect[];
    toggleUnlockedEffect: (id: string, effect: string) => void;
    notificationActive: boolean;
    notificationMsg: string;
};

export const DataContext = createContext<DataContextType | undefined>(
    undefined,
);

export const DataProvider = ({ children }: { children: ReactNode }) => {
    const [effects, setEffects] = useState<LegendaryEffect[]>(() => {
        const stored = localStorage.getItem('fo76trackerData');
        return stored ? JSON.parse(stored) : legendaryEffects;
    });
    const {notificationActive, notificationMsg, showNotification} = useNotification()

    useEffect(() => {
        localStorage.setItem('fo76trackerData', JSON.stringify(effects));
    }, [effects]);

    const sentNotification = (effect: string) => {
        showNotification(effect)
    };


    const toggleUnlockedEffect = (id: string, effect: string) => {
        const selectedEffect = effects.find((el) => el.id === id);

        const temp = effects.map((el) =>
            el.id === id ? { ...el, unlocked: !el.unlocked } : el,
        );

        if (selectedEffect && !selectedEffect.unlocked) {
            sentNotification(effect);
        }

        setEffects(temp);
    };

    return (
        <DataContext.Provider
            value={{ effects, toggleUnlockedEffect, notificationActive, notificationMsg }}>
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
