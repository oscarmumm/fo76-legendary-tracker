import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { useData } from './contexts/DataContext';
import { LegendaryEffectItem } from './components/LegendaryEffectItem';
import { AnimatePresence, motion } from 'motion/react';
// ICONS
import { MdKeyboardArrowDown } from 'react-icons/md';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { FaUnlock, FaLock, FaRadiation } from 'react-icons/fa';
import { IoMdPerson } from 'react-icons/io';
import { FaGun } from 'react-icons/fa6';
import { LuSword } from 'react-icons/lu';
import { GiChestArmor } from 'react-icons/gi';
import { GiShoulderArmor } from 'react-icons/gi';

const filterListAnimation = {
    visible: {
        opacity: 1,
        y: 0,
    },
    hidden: {
        opacity: 0,
        y: -10,
    },
};

function App() {
    const [oneStarEffectsVisible, setOneStarEffectsVisible] = useState(false);
    const [twoStarEffectsVisible, setTwoStarEffectsVisible] = useState(false);
    const [threeStarEffectsVisible, setThreeStarEffectsVisible] =
        useState(false);
    const [fourStarEffectsVisible, setFourStarEffectsVisible] = useState(false);
    const { effects, toggleUnlockedEffect } = useData();
    const [filteredData, setFilteredData] = useState(effects);

    const [filterListOpen, setFilterListOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState('Todos');

    const openAllEffectsColumns = () => {
        setOneStarEffectsVisible(true);
        setTwoStarEffectsVisible(true);
        setThreeStarEffectsVisible(true);
        setFourStarEffectsVisible(true);
    };

    const resetFilters = () => {
        setFilteredData(effects);
        setActiveFilter('Todos');
        setFilterListOpen(false);
        openAllEffectsColumns();
    };
    
    const filterByLocked = () => {
        const temp = effects.filter((e) => !e.unlocked);
        setFilteredData(temp);
        setActiveFilter('Bloqueados');
        setFilterListOpen(false);
        openAllEffectsColumns();
    };
    const filterByUnlocked = () => {
        const temp = effects.filter((e) => e.unlocked);
        setFilteredData(temp);
        setActiveFilter('Desbloqueados');
        setFilterListOpen(false);
        openAllEffectsColumns();
    };
    
    const filterByOnlyHuman = () => {
        const temp = effects.filter((e) => !e.race.includes('ghoul'));
        setFilteredData(temp);
        setActiveFilter('Solo humanos');
        setFilterListOpen(false);
        openAllEffectsColumns();
    };
    
    const filterByOnlyGhoul = () => {
        const temp = effects.filter((e) => !e.race.includes('human'));
        setFilteredData(temp);
        setActiveFilter('Solo necrófagos');
        setFilterListOpen(false);
        openAllEffectsColumns();
    };
    
    const filterByRanged = () => {
        const temp = effects.filter((e) => e.category.includes('ranged'));
        setFilteredData(temp);
        setActiveFilter('Armas a distancia');
        setFilterListOpen(false);
        openAllEffectsColumns();
    };
    
    const filterByMelee = () => {
        const temp = effects.filter((e) => e.category.includes('melee'));
        setFilteredData(temp);
        setActiveFilter('Armas cuerpo a cuerpo');
        setFilterListOpen(false);
        openAllEffectsColumns();
    };
    
    const filterByArmor = () => {
        const temp = effects.filter((e) => e.category.includes('armor'));
        setFilteredData(temp);
        setActiveFilter('Armaduras');
        setFilterListOpen(false);
        openAllEffectsColumns();
    };
    
    const filterByPowerArmor = () => {
        const temp = effects.filter((e) => e.category.includes('power armor'));
        setFilteredData(temp);
        setActiveFilter('Servoarmaduras');
        setFilterListOpen(false);
        openAllEffectsColumns();
    };

    useEffect(() => {
        setFilteredData(effects);
    }, [effects]);

    return (
        <main className='bg-gray-900 text-slate-50 min-h-screen'>
            <Header />
            <div className='flex items-center justify-center'>
                <div className='p-5 m-3 max-w-2xl flex flex-col gap-5 md:items-center md:justify-center md:flex-row shadow-md rounded-xl bg-gray-800'>
                    {/* FILTERS */}
                    <div className='flex flex-col'>
                        <h2 className='p-1 text-lg'>Filtros</h2>
                        <button
                            className='p-3 min-w-72 relative flex justify-between bg-gray-700 hover:bg-gray-600 rounded-xl cursor-pointer'
                            onClick={() => setFilterListOpen(!filterListOpen)}
                        >
                            <span className='text-lg'>{activeFilter}</span>
                            <MdKeyboardArrowDown className='text-3xl' />
                        </button>
                        <AnimatePresence>
                            {filterListOpen && (
                                <motion.ul
                                    variants={filterListAnimation}
                                    initial='hidden'
                                    whileInView='visible'
                                    exit='hidden'
                                    transition={{ duration: 0.2 }}
                                    className='absolute mt-12 min-w-72 bg-gray-600 rounded-xl'
                                >
                                    <li
                                        className='p-3 cursor-pointer hover:bg-gray-500 rounded-xl'
                                        onClick={resetFilters}
                                    >
                                        <span>Todos</span>
                                    </li>
                                    <li
                                        className='p-3 cursor-pointer flex items-center hover:bg-gray-500 rounded-xl'
                                        onClick={filterByLocked}
                                    >
                                        <FaLock />
                                        <span className='ml-3'>Bloqueados</span>
                                    </li>
                                    <li
                                        className='p-3 cursor-pointer flex items-center hover:bg-gray-500 rounded-xl'
                                        onClick={filterByUnlocked}
                                    >
                                        <FaUnlock />
                                        <span className='ml-3'>
                                            Desbloqueados
                                        </span>
                                    </li>
                                    <li
                                        className='p-3 cursor-pointer flex items-center hover:bg-gray-500 rounded-xl'
                                        onClick={filterByOnlyGhoul}
                                    >
                                        <FaRadiation />
                                        <span className='ml-3'>
                                            Solo necrófagos
                                        </span>
                                    </li>
                                    <li
                                        className='p-3 cursor-pointer flex items-center hover:bg-gray-500 rounded-xl'
                                        onClick={filterByOnlyHuman}
                                    >
                                        <IoMdPerson />
                                        <span className='ml-3'>
                                            Solo humanos
                                        </span>
                                    </li>
                                    <li
                                        className='p-3 cursor-pointer flex items-center hover:bg-gray-500 rounded-xl'
                                        onClick={filterByRanged}
                                    >
                                        <FaGun />
                                        <span className='ml-3'>
                                            Armas a distancia
                                        </span>
                                    </li>
                                    <li
                                        className='p-3 cursor-pointer flex items-center hover:bg-gray-500 rounded-xl'
                                        onClick={filterByMelee}
                                    >
                                        <LuSword />
                                        <span className='ml-3'>
                                            Armas cuerpo a cuerpo
                                        </span>
                                    </li>
                                    <li
                                        className='p-3 cursor-pointer flex items-center hover:bg-gray-500 rounded-xl'
                                        onClick={filterByArmor}
                                    >
                                        <GiChestArmor />
                                        <span className='ml-3'>Armaduras</span>
                                    </li>
                                    <li
                                        className='p-3 cursor-pointer flex items-center hover:bg-gray-500 rounded-xl'
                                        onClick={filterByPowerArmor}
                                    >
                                        <GiShoulderArmor />
                                        <span className='ml-3'>
                                            Servoarmaduras
                                        </span>
                                    </li>
                                </motion.ul>
                            )}
                        </AnimatePresence>
                    </div>
                    {/* SEARCHBAR */}
                    {/* <div className='bg-gray-100 flex justify-between rounded-xl'>
                        <input
                            className='text-gray-800 p-3 outline-none flex-1 min-w-64'
                            type='text'
                        />
                        <button className='p-3 px-5 cursor-pointer text-xl rounded-tr-xl rounded-br-xl bg-purple-700'>
                            <FaMagnifyingGlass />
                        </button>
                    </div> */}
                </div>
            </div>
            {/* EFFECTS COLUMNS SECTION */}
            <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-start'>
                <section className='p-5 m-3 text-xl shadow-md rounded-xl bg-gray-800'>
                    <div className='flex justify-between items-center'>
                        <h2 className='text-center font-bold text-2xl'>
                            Efectos <span className='text-yellow-400'>★</span>
                        </h2>
                        <button
                            className='text-3xl hover:bg-gray-600 rounded-xl cursor-pointer'
                            onClick={() =>
                                setOneStarEffectsVisible(!oneStarEffectsVisible)
                            }
                        >
                            <MdKeyboardArrowDown />
                        </button>
                    </div>

                    {oneStarEffectsVisible && (
                        <motion.ul
                            variants={filterListAnimation}
                            initial='hidden'
                            whileInView='visible'
                            exit='hidden'
                            transition={{ duration: 0.2 }}
                            className='mt-5'
                        >
                            {filteredData
                                .filter((e) => e.stars === 1)
                                .map((e) => (
                                    <LegendaryEffectItem
                                        key={e.id}
                                        effect={e}
                                        toggleUnlockedEffect={
                                            toggleUnlockedEffect
                                        }
                                    />
                                ))}
                        </motion.ul>
                    )}
                </section>
                <section className='p-5 m-3 text-xl shadow-md rounded-xl bg-gray-800'>
                    <div className='flex justify-between items-center'>
                        <h2 className='text-center font-bold text-2xl'>
                            Efectos <span className='text-yellow-400'>★ ★</span>
                        </h2>
                        <button
                            className='text-3xl hover:bg-gray-600 rounded-xl cursor-pointer'
                            onClick={() =>
                                setTwoStarEffectsVisible(!twoStarEffectsVisible)
                            }
                        >
                            <MdKeyboardArrowDown />
                        </button>
                    </div>

                    {twoStarEffectsVisible && (
                        <motion.ul
                            variants={filterListAnimation}
                            initial='hidden'
                            whileInView='visible'
                            exit='hidden'
                            transition={{ duration: 0.2 }}
                            className='mt-5'
                        >
                            {filteredData
                                .filter((e) => e.stars === 2)
                                .map((e) => (
                                    <LegendaryEffectItem
                                        key={e.id}
                                        effect={e}
                                        toggleUnlockedEffect={
                                            toggleUnlockedEffect
                                        }
                                    />
                                ))}
                        </motion.ul>
                    )}
                </section>
                <section className='p-5 m-3 text-xl shadow-md rounded-xl bg-gray-800'>
                    <div className='flex justify-between items-center'>
                        <h2 className='text-center font-bold text-2xl'>
                            Efectos{' '}
                            <span className='text-yellow-400'>★ ★ ★</span>
                        </h2>
                        <button
                            className='text-3xl hover:bg-gray-600 rounded-xl cursor-pointer'
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
                        <motion.ul
                            variants={filterListAnimation}
                            initial='hidden'
                            whileInView='visible'
                            exit='hidden'
                            transition={{ duration: 0.2 }}
                            className='mt-5'
                        >
                            {filteredData
                                .filter((e) => e.stars === 3)
                                .map((e) => (
                                    <LegendaryEffectItem
                                        key={e.id}
                                        effect={e}
                                        toggleUnlockedEffect={
                                            toggleUnlockedEffect
                                        }
                                    />
                                ))}
                        </motion.ul>
                    )}
                </section>
                <section className='p-5 m-3 text-xl shadow-md rounded-xl bg-gray-800'>
                    <div className='flex justify-between items-center'>
                        <h2 className='text-center text-2xl font-bold'>
                            Efectos{' '}
                            <span className='text-yellow-400'>★ ★ ★ ★</span>
                        </h2>
                        <button
                            className='text-3xl hover:bg-gray-600 rounded-xl cursor-pointer'
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
                        <motion.ul
                            variants={filterListAnimation}
                            initial='hidden'
                            whileInView='visible'
                            exit='hidden'
                            transition={{ duration: 0.2 }}
                            className='mt-5'
                        >
                            {filteredData
                                .filter((e) => e.stars === 4)
                                .map((e) => (
                                    <LegendaryEffectItem
                                        key={e.id}
                                        effect={e}
                                        toggleUnlockedEffect={
                                            toggleUnlockedEffect
                                        }
                                    />
                                ))}
                        </motion.ul>
                    )}
                </section>
            </div>
        </main>
    );
}

export default App;
