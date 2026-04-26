export type LegendaryEffect = {
    id: string;
    stars: number;
    name: string;
    description: string;
    category: ('melee' | 'ranged' | 'armor' | 'power armor')[];
    race: ('human' | 'ghoul')[];
    bounty: boolean;
    unlocked: boolean;
}