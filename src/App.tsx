import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useData } from './contexts/DataContext';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { LegendaryEffectItem } from './components/LegendaryEffectItem';

function App() {
    const [oneStarEffectsVisible, setOneStarEffectsVisible] = useState(false);
    const [twoStarEffectsVisible, setTwoStarEffectsVisible] = useState(false);
    const [threeStarEffectsVisible, setThreeStarEffectsVisible] =
        useState(false);
    const [fourStarEffectsVisible, setFourStarEffectsVisible] = useState(false);
    const { effects, toggleUnlockedEffect } = useData();
    const [filteredData, setFilteredData] = useState(effects);

    const filterByLocked = () => {
        const temp = effects.filter((e) => !e.unlocked);
        setFilteredData(temp);
    };
    const filterByUnlocked = () => {
        const temp = effects.filter((e) => e.unlocked);
        setFilteredData(temp);
    };

    useEffect(() => {
        setFilteredData(effects);
    }, [effects]);

    return (
        <main className="bg-gray-900 text-slate-50 min-h-screen">
            <Header />
            <div className="p-5 m-3 grid grid-cols-2 gap-3 text-xl shadow-md rounded-lg bg-gray-800">
                <div className="flex flex-col text-base">
                    <h2 className="px-3 pb-3 text-lg">Filtros</h2>
                    <div className="grid grid-cols-4 gap-3">
                        <button
                            className="p-3 ml-3 cursor-pointer rounded-lg hover:scale-105 bg-gray-700"
                            onClick={filterByLocked}>
                            Bloqueados
                        </button>
                        <button
                            className="p-3 ml-3 cursor-pointer rounded-lg hover:scale-105 bg-gray-700"
                            onClick={filterByUnlocked}>
                            Desbloqueados
                        </button>
                        <button className="p-3 ml-3 cursor-pointer rounded-lg hover:scale-105 bg-gray-700">
                            Necrófago
                        </button>
                        <button className="p-3 ml-3 cursor-pointer rounded-lg hover:scale-105 bg-gray-700">
                            Armas melee
                        </button>
                        <button className="p-3 ml-3 cursor-pointer rounded-lg hover:scale-105 bg-gray-700">
                            Armas a distancia
                        </button>
                        <button className="p-3 ml-3 cursor-pointer rounded-lg hover:scale-105 bg-gray-700">
                            Armaduras
                        </button>
                        <button className="p-3 ml-3 cursor-pointer rounded-lg hover:scale-105 bg-gray-700">
                            Servoarmaduras
                        </button>
                        <button
                            className="p-3 ml-3 cursor-pointer rounded-lg hover:scale-105 bg-gray-700"
                            onClick={() => setFilteredData(effects)}>
                            Ver Todos
                        </button>
                    </div>
                </div>
                <div>
                    <h2 className="pb-3 text-lg">Buscador</h2>
                    <div className='bg-gray-100 flex justify-between rounded-lg'>
                        <input
                            className="text-gray-800 p-3 outline-none flex-1"
                            type="text"
                        />
                        <button className="p-3 px-5 cursor-pointer rounded-tr-lg rounded-br-lg bg-purple-700">
                            <FaMagnifyingGlass />
                        </button>
                    </div>
                </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 items-start">
                <section className="p-5 m-3 text-xl shadow-md rounded-lg bg-gray-800">
                    <div className="flex justify-between items-center">
                        <h2 className="text-center font-bold text-2xl">
                            Efectos <span className="text-yellow-400">★</span>
                        </h2>
                        <button
                            className="text-3xl cursor-pointer"
                            onClick={() =>
                                setOneStarEffectsVisible(!oneStarEffectsVisible)
                            }>
                            <MdKeyboardArrowDown />
                        </button>
                    </div>

                    {oneStarEffectsVisible && (
                        <ul className="mt-5">
                            {filteredData
                                .filter((e) => e.stars === 1)
                                .map((e) => (
                                    <LegendaryEffectItem
                                        effect={e}
                                        toggleUnlockedEffect={
                                            toggleUnlockedEffect
                                        }
                                    />
                                ))}
                        </ul>
                    )}
                </section>
                <section className="p-5 m-3 text-xl shadow-md rounded-lg bg-gray-800">
                    <div className="flex justify-between items-center">
                        <h2 className="text-center font-bold text-2xl">
                            Efectos <span className="text-yellow-400">★ ★</span>
                        </h2>
                        <button
                            className="text-3xl cursor-pointer"
                            onClick={() =>
                                setTwoStarEffectsVisible(!twoStarEffectsVisible)
                            }>
                            <MdKeyboardArrowDown />
                        </button>
                    </div>

                    {twoStarEffectsVisible && (
                        <ul className="mt-5">
                            {filteredData
                                .filter((e) => e.stars === 2)
                                .map((e) => (
                                    <LegendaryEffectItem
                                        effect={e}
                                        toggleUnlockedEffect={
                                            toggleUnlockedEffect
                                        }
                                    />
                                ))}
                        </ul>
                    )}
                </section>
                <section className="p-5 m-3 text-xl shadow-md rounded-lg bg-gray-800">
                    <div className="flex justify-between items-center">
                        <h2 className="text-center font-bold text-2xl">
                            Efectos{' '}
                            <span className="text-yellow-400">★ ★ ★</span>
                        </h2>
                        <button
                            className="text-3xl cursor-pointer"
                            onClick={() =>
                                setThreeStarEffectsVisible(
                                    !threeStarEffectsVisible,
                                )
                            }>
                            <MdKeyboardArrowDown />
                        </button>
                    </div>

                    {threeStarEffectsVisible && (
                        <ul className="mt-5">
                            {filteredData
                                .filter((e) => e.stars === 3)
                                .map((e) => (
                                    <LegendaryEffectItem
                                        effect={e}
                                        toggleUnlockedEffect={
                                            toggleUnlockedEffect
                                        }
                                    />
                                ))}
                        </ul>
                    )}
                </section>
                <section className="p-5 m-3 text-xl shadow-md rounded-lg bg-gray-800">
                    <div className="flex justify-between items-center">
                        <h2 className="text-center text-2xl font-bold">
                            Efectos{' '}
                            <span className="text-yellow-400">★ ★ ★ ★</span>
                        </h2>
                        <button
                            className="text-3xl cursor-pointer"
                            onClick={() =>
                                setFourStarEffectsVisible(
                                    !fourStarEffectsVisible,
                                )
                            }>
                            <MdKeyboardArrowDown />
                        </button>
                    </div>

                    {fourStarEffectsVisible && (
                        <ul className="mt-5">
                            {filteredData
                                .filter((e) => e.stars === 4)
                                .map((e) => (
                                    <LegendaryEffectItem
                                        effect={e}
                                        toggleUnlockedEffect={
                                            toggleUnlockedEffect
                                        }
                                    />
                                ))}
                        </ul>
                    )}
                </section>
            </div>
        </main>
    );
}

export default App;
