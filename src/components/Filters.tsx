import { useState } from "react";

interface FilterProps {
    onFilterChange: (filter: string) => void;
}

export const Filters = ({onFilterChange} : FilterProps) => {
    const [activeFilter, setActiveFilter] = useState<string>('all')
    
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement, HTMLSelectElement>) => {
        const value = e.target.value;
        setActiveFilter(value);
        onFilterChange(value)
    }
    return (
        <div>
            <label className="text-lg font-semibold">Filtros:</label>
            <select
                value={activeFilter}
                onChange={handleChange}
                className="p-3 min-w-72 bg-gray-700 hover:bg-gray-600 rounded-xl cursor-pointer text-slate-50 border-none">
                <option value="all">Todos los efectos</option>
                <option value="locked">Bloqueados</option>
                <option value="unlocked">Desbloqueados</option>
                <option value="ranged">Armas a distancia</option>
                <option value="melee">Armas cuerpo a cuerpo</option>
                <option value="armor">Armaduras</option>
                <option value="powerArmor">Servoarmaduras</option>
                <option value="human">Solo humanos</option>
                <option value="ghoul">Solo necrófagos</option>
                <option value="bounty">
                    Solo Caza de matones y Cazarrecompensas
                </option>
            </select>
        </div>
    );
};
