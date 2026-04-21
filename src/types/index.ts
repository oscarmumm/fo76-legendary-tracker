export type LegendaryEffect = {
    id: string;
    stars: number;
    name: string;
    description: string;
    category: ('melee' | 'ranged' | 'armor' | 'power armor')[];
    race: ('human' | 'ghoul')[];
    unlocked: boolean;
}