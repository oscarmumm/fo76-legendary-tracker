import { useData } from '../contexts/DataContext';

export const CharacterSelector = () => {
    const { characters, activeCharacterId, switchCharacter } = useData();

    return (
        <div className='w-full lg:w-auto flex flex-col items-start lg:flex-row lg:items-center justify-center'>
            <label className="m-1 text-lg font-semibold">Personaje:</label>
            <select
                value={activeCharacterId}
                onChange={(e) => switchCharacter(e.target.value)}
                className="p-3 w-full md:w-72 bg-gray-700 hover:bg-gray-600 rounded-xl cursor-pointer text-slate-50 border-none outline-none">
                {characters.map((char) => (
                    <option key={char.id} value={char.id}>
                        {char.name}
                    </option>
                ))}
            </select>
        </div>
    );
};
