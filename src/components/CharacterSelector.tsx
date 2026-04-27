import { useData } from '../contexts/DataContext';

export const CharacterSelector = () => {
    const { characters, activeCharacterId, switchCharacter } = useData();
    
    return (
        <div className="flex items-center justify-center">
            <div className="p-5 m-3 max-w-2xl flex flex-col gap-3 md:items-center md:justify-center md:flex-row shadow-md rounded-xl bg-gray-800">
                <label className="text-lg font-semibold">Personaje:</label>
                <select
                    value={activeCharacterId}
                    onChange={(e) => switchCharacter(e.target.value)}
                    className="p-3 min-w-72 bg-gray-700 hover:bg-gray-600 rounded-xl cursor-pointer text-slate-50 border-none">
                    {characters.map((char) => (
                        <option key={char.id} value={char.id}>
                            {char.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};
