import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { useData } from './contexts/DataContext';
import { LegendaryEffectItem } from './components/LegendaryEffectItem';
// ICONS
import { MdKeyboardArrowDown } from 'react-icons/md';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { FaUnlock, FaLock, FaRadiation } from 'react-icons/fa';
import { IoMdPerson } from "react-icons/io";
import { FaGun } from "react-icons/fa6";
import { LuSword } from "react-icons/lu";
import { GiChestArmor } from "react-icons/gi";
import { GiShoulderArmor } from "react-icons/gi";

function App() {
    const [oneStarEffectsVisible, setOneStarEffectsVisible] = useState(false);
    const [twoStarEffectsVisible, setTwoStarEffectsVisible] = useState(false);
    const [threeStarEffectsVisible, setThreeStarEffectsVisible] =
        useState(false);
    const [fourStarEffectsVisible, setFourStarEffectsVisible] = useState(false);
    const { effects, toggleUnlockedEffect } = useData();
    const [filteredData, setFilteredData] = useState(effects);

    const [filterListOpen, setFilterListOpen] = useState(false);

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
        <main className='bg-gray-900 text-slate-50 min-h-screen'>
            <Header />
            <div className='flex items-center justify-center'>
                <div className='p-5 m-3 max-w-xl flex flex-col gap-5 md:items-center md:justify-center md:flex-row shadow-md rounded-lg bg-gray-800'>
                    {/* FILTERS */}
                    <div className='flex flex-col'>
                        <button
                            className='p-3 min-w-48 relative flex justify-between bg-gray-700 hover:bg-gray-600 rounded-lg cursor-pointer'
                            onClick={() => setFilterListOpen(!filterListOpen)}
                        >
                            <span className='text-lg'>Filtros</span>
                            <MdKeyboardArrowDown className='text-3xl' />
                        </button>
                        {filterListOpen && (
                            <ul className='absolute mt-12 min-w-72 bg-gray-600 rounded-lg'>
                                <li
                                    className='p-3 cursor-pointer hover:bg-gray-500 rounded-lg'
                                    onClick={() => setFilteredData(effects)}
                                >
                                    <span>Todos</span>
                                </li>
                                <li
                                    className='p-3 cursor-pointer flex items-center hover:bg-gray-500 rounded-lg'
                                    onClick={filterByLocked}
                                >
                                    <FaLock />
                                    <span className='ml-3'>Bloqueados</span>
                                </li>
                                <li
                                    className='p-3 cursor-pointer flex items-center hover:bg-gray-500 rounded-lg'
                                    onClick={filterByUnlocked}
                                >
                                    <FaUnlock />
                                    <span className='ml-3'>Desbloqueados</span>
                                </li>
                                <li className='p-3 cursor-pointer flex items-center hover:bg-gray-500 rounded-lg'>
                                    <FaRadiation />
                                    <span className='ml-3'>Solo necrófagos</span>
                                </li>
                                <li className='p-3 cursor-pointer flex items-center hover:bg-gray-500 rounded-lg'>
                                    <IoMdPerson />
                                    <span className='ml-3'>Solo humanos</span>
                                </li>
                                <li className='p-3 cursor-pointer flex items-center hover:bg-gray-500 rounded-lg'>
                                    <FaGun />
                                    <span className='ml-3'>Armas a distancia</span>
                                </li>
                                <li className='p-3 cursor-pointer flex items-center hover:bg-gray-500 rounded-lg'>
                                    <LuSword />
                                    <span className='ml-3'>Armas cuerpo a cuerpo</span>
                                </li>
                                <li className='p-3 cursor-pointer flex items-center hover:bg-gray-500 rounded-lg'>
                                    <GiChestArmor />
                                    <span className='ml-3'>Armaduras</span>
                                </li>
                                <li className='p-3 cursor-pointer flex items-center hover:bg-gray-500 rounded-lg'>
                                    <GiShoulderArmor />
                                    <span className='ml-3'>Servoarmaduras</span>
                                </li>
                            </ul>
                        )}
                    </div>
                    {/* SEARCHBAR */}
                    <div className='bg-gray-100 flex justify-between rounded-lg'>
                        <input
                            className='text-gray-800 p-3 outline-none flex-1 min-w-64'
                            type='text'
                        />
                        <button className='p-3 px-5 cursor-pointer text-xl rounded-tr-lg rounded-br-lg bg-purple-700'>
                            <FaMagnifyingGlass />
                        </button>
                    </div>
                </div>
            </div>
            {/* EFFECTS COLUMNS SECTION */}
            <div className='grid md:grid-cols-2 xl:grid-cols-4 items-start'>
                <section className='p-5 m-3 text-xl shadow-md rounded-lg bg-gray-800'>
                    <div className='flex justify-between items-center'>
                        <h2 className='text-center font-bold text-2xl'>
                            Efectos <span className='text-yellow-400'>★</span>
                        </h2>
                        <button
                            className='text-3xl hover:bg-gray-600 rounded-lg cursor-pointer'
                            onClick={() =>
                                setOneStarEffectsVisible(!oneStarEffectsVisible)
                            }
                        >
                            <MdKeyboardArrowDown />
                        </button>
                    </div>

                    {oneStarEffectsVisible && (
                        <ul className='mt-5'>
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
                <section className='p-5 m-3 text-xl shadow-md rounded-lg bg-gray-800'>
                    <div className='flex justify-between items-center'>
                        <h2 className='text-center font-bold text-2xl'>
                            Efectos <span className='text-yellow-400'>★ ★</span>
                        </h2>
                        <button
                            className='text-3xl hover:bg-gray-600 rounded-lg cursor-pointer'
                            onClick={() =>
                                setTwoStarEffectsVisible(!twoStarEffectsVisible)
                            }
                        >
                            <MdKeyboardArrowDown />
                        </button>
                    </div>

                    {twoStarEffectsVisible && (
                        <ul className='mt-5'>
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
                <section className='p-5 m-3 text-xl shadow-md rounded-lg bg-gray-800'>
                    <div className='flex justify-between items-center'>
                        <h2 className='text-center font-bold text-2xl'>
                            Efectos{' '}
                            <span className='text-yellow-400'>★ ★ ★</span>
                        </h2>
                        <button
                            className='text-3xl hover:bg-gray-600 rounded-lg cursor-pointer'
                            onClick={() =>
                                setThreeStarEffectsVisible(
                                    !threeStarEffectsVisible,
                                )
                            }
                        >
                            <MdKeyboardArrowDown />
                        </button>
                    </div>

                    {threeStarEffectsVisible && (
                        <ul className='mt-5'>
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
                <section className='p-5 m-3 text-xl shadow-md rounded-lg bg-gray-800'>
                    <div className='flex justify-between items-center'>
                        <h2 className='text-center text-2xl font-bold'>
                            Efectos{' '}
                            <span className='text-yellow-400'>★ ★ ★ ★</span>
                        </h2>
                        <button
                            className='text-3xl hover:bg-gray-600 rounded-lg cursor-pointer'
                            onClick={() =>
                                setFourStarEffectsVisible(
                                    !fourStarEffectsVisible,
                                )
                            }
                        >
                            <MdKeyboardArrowDown />
                        </button>
                    </div>

                    {fourStarEffectsVisible && (
                        <ul className='mt-5'>
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
