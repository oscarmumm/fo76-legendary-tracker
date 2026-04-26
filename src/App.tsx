import { useEffect, useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'motion/react';

// COMPONENTS
import { Header } from './components/Header';
import { useData } from './contexts/DataContext';
import { LegendaryEffectItem } from './components/LegendaryEffectItem';
import { NotificationModal } from './components/NotificationModal';
import { Footer } from './components/Footer';

// ICONS
import { MdKeyboardArrowDown } from 'react-icons/md';
import { FaUnlock, FaLock, FaRadiation } from 'react-icons/fa';
import { IoMdPerson } from 'react-icons/io';
import { FaGun } from 'react-icons/fa6';
import { LuSword } from 'react-icons/lu';
import { GiBlackKnightHelm, GiShoulderArmor } from 'react-icons/gi';
import { GiWantedReward } from 'react-icons/gi';
import { FaBook } from 'react-icons/fa';

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
    const {
        effects,
        toggleUnlockedEffect,
        notificationActive,
        notificationMsg,
    } = useData();
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

    const filterByOnlyBounty = () => {
        const temp = effects.filter((e) => e.bounty === true);
        setFilteredData(temp);
        setActiveFilter('Solo Caza de matones y Cazarrecompensas');
        setFilterListOpen(false);
        openAllEffectsColumns();
    };

    const unlockedCount = useMemo(
        () => ({
            1: {
                total: effects.filter((e) => e.stars === 1).length,
                unlocked: effects.filter(
                    (e) => e.stars === 1 && e.unlocked === true,
                ).length,
            },
            2: {
                total: effects.filter((e) => e.stars === 2).length,
                unlocked: effects.filter(
                    (e) => e.stars === 2 && e.unlocked === true,
                ).length,
            },
            3: {
                total: effects.filter((e) => e.stars === 3).length,
                unlocked: effects.filter(
                    (e) => e.stars === 3 && e.unlocked === true,
                ).length,
            },
            4: {
                total: effects.filter((e) => e.stars === 4).length,
                unlocked: effects.filter(
                    (e) => e.stars === 4 && e.unlocked === true,
                ).length,
            },
        }),
        [effects],
    );

    useEffect(() => {
        switch (activeFilter) {
            case 'Todos':
                resetFilters();
                break;
            case 'Bloqueados':
                filterByLocked();
                break;
            case 'Desbloqueados':
                filterByUnlocked();
                break;
            case 'Solo humanos':
                filterByOnlyHuman();
                break;
            case 'Solo necrófagos':
                filterByOnlyGhoul();
                break;
            case 'Armas a distancia':
                filterByRanged();
                break;
            case 'Armas cuerpo a cuerpo':
                filterByMelee();
                break;
            case 'Armaduras':
                filterByArmor();
                break;
            case 'Servoarmaduras':
                filterByPowerArmor();
                break;
            case 'Solo Caza de matones y Cazarrecompensas':
                filterByOnlyBounty();
                break;
            default:
                setFilteredData(effects);
        }
    }, [activeFilter, effects]);

    return (
        <div className='bg-gray-900 text-slate-50 min-h-screen flex flex-col justify-between'>
            <div>
                <Header />
                <main className='bg-gray-900 text-slate-50 flex flex-col'>
                    <div className='flex items-center justify-center'>
                        <div className='p-5 m-3 max-w-2xl flex flex-col gap-5 md:items-center md:justify-center md:flex-row shadow-md rounded-xl bg-gray-800'>
                            {/* FILTERS */}
                            <div className='flex flex-col'>
                                <h2 className='p-1 text-lg'>Filtros</h2>
                                <button
                                    className='p-3 min-w-72 relative flex justify-between bg-gray-700 hover:bg-gray-600 rounded-xl cursor-pointer'
                                    onClick={() =>
                                        setFilterListOpen(!filterListOpen)
                                    }
                                >
                                    <span className='text-lg'>
                                        {activeFilter}
                                    </span>
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
                                            className='absolute mt-9 w-72 bg-gray-600 rounded-xl'
                                        >
                                            <li
                                                className='p-3 cursor-pointer flex items-center hover:bg-gray-500 rounded-xl'
                                                onClick={resetFilters}
                                            >
                                                <FaBook className='text-sky-400 text-2xl' />
                                                <span className='ml-3 '>
                                                    Todos los efectos
                                                </span>
                                            </li>
                                            <li
                                                className='p-3 cursor-pointer flex items-center hover:bg-gray-500 rounded-xl'
                                                onClick={filterByLocked}
                                            >
                                                <FaLock className='text-sky-400 text-2xl' />
                                                <span className='ml-3'>
                                                    Bloqueados
                                                </span>
                                            </li>
                                            <li
                                                className='p-3 cursor-pointer flex items-center hover:bg-gray-500 rounded-xl'
                                                onClick={filterByUnlocked}
                                            >
                                                <FaUnlock className='text-sky-400 text-2xl' />
                                                <span className='ml-3'>
                                                    Desbloqueados
                                                </span>
                                            </li>
                                            <li
                                                className='p-3 cursor-pointer flex items-center hover:bg-gray-500 rounded-xl'
                                                onClick={filterByRanged}
                                            >
                                                <FaGun className='text-sky-400 text-2xl' />
                                                <span className='ml-3'>
                                                    Armas a distancia
                                                </span>
                                            </li>
                                            <li
                                                className='p-3 cursor-pointer flex items-center hover:bg-gray-500 rounded-xl'
                                                onClick={filterByMelee}
                                            >
                                                <LuSword className='text-sky-400 text-2xl' />
                                                <span className='ml-3'>
                                                    Armas cuerpo a cuerpo
                                                </span>
                                            </li>
                                            <li
                                                className='p-3 cursor-pointer flex items-center hover:bg-gray-500 rounded-xl'
                                                onClick={filterByArmor}
                                            >
                                                <GiShoulderArmor className='text-sky-400 text-2xl' />
                                                <span className='ml-3'>
                                                    Armaduras
                                                </span>
                                            </li>
                                            <li
                                                className='p-3 cursor-pointer flex items-center hover:bg-gray-500 rounded-xl'
                                                onClick={filterByPowerArmor}
                                            >
                                                <GiBlackKnightHelm className='text-sky-400 text-2xl' />
                                                <span className='ml-3'>
                                                    Servoarmaduras
                                                </span>
                                            </li>
                                            <li
                                                className='p-3 cursor-pointer flex items-center hover:bg-gray-500 rounded-xl'
                                                onClick={filterByOnlyGhoul}
                                            >
                                                <FaRadiation className='text-sky-400 text-2xl' />
                                                <span className='ml-3'>
                                                    Solo necrófagos
                                                </span>
                                            </li>
                                            <li
                                                className='p-3 cursor-pointer flex items-center hover:bg-gray-500 rounded-xl'
                                                onClick={filterByOnlyHuman}
                                            >
                                                <IoMdPerson className='text-sky-400 text-2xl' />
                                                <span className='ml-3'>
                                                    Solo humanos
                                                </span>
                                            </li>
                                            <li
                                                className='p-3 cursor-pointer flex items-center hover:bg-gray-500 rounded-xl'
                                                onClick={filterByOnlyBounty}
                                            >
                                                <GiWantedReward className='text-sky-400 text-3xl' />
                                                <span className='ml-3'>
                                                    Solo Caza de matones y
                                                    Cazarrecompensas
                                                </span>
                                            </li>
                                        </motion.ul>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                    {/* EFFECTS COLUMNS SECTION */}
                    <div className='grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 items-start'>
                        <section className='p-5 m-3 text-xl shadow-md rounded-xl bg-gray-800'>
                            <div className='flex justify-between items-center'>
                                <h2 className='text-center font-bold text-2xl'>
                                    Efectos{' '}
                                    <span className='text-yellow-400 ml-3'>
                                        ★
                                    </span>
                                    <span className='text-gray-400 ml-3'>
                                        {unlockedCount[1].unlocked}/
                                        {unlockedCount[1].total}
                                    </span>
                                </h2>
                                <button
                                    className='text-3xl hover:bg-gray-600 rounded-xl cursor-pointer'
                                    onClick={() =>
                                        setOneStarEffectsVisible(
                                            !oneStarEffectsVisible,
                                        )
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
                                    {(() => {
                                        const dataStars1 = filteredData.filter(
                                            (e) => e.stars === 1,
                                        );
                                        if (dataStars1.length === 0) {
                                            return (
                                                <li className='text-gray-400'>
                                                    No hay efectos para el
                                                    filtro aplicado
                                                </li>
                                            );
                                        }
                                        return dataStars1.map((e) => (
                                            <LegendaryEffectItem
                                                key={e.id}
                                                effect={e}
                                                toggleUnlockedEffect={
                                                    toggleUnlockedEffect
                                                }
                                            />
                                        ));
                                    })()}
                                </motion.ul>
                            )}
                        </section>
                        <section className='p-5 m-3 text-xl shadow-md rounded-xl bg-gray-800'>
                            <div className='flex justify-between items-center'>
                                <h2 className='text-center font-bold text-2xl'>
                                    Efectos{' '}
                                    <span className='text-yellow-400 ml-3'>
                                        ★ ★
                                    </span>
                                    <span className='text-gray-400 ml-3'>
                                        {unlockedCount[2].unlocked}/
                                        {unlockedCount[2].total}
                                    </span>
                                </h2>
                                <button
                                    className='text-3xl hover:bg-gray-600 rounded-xl cursor-pointer'
                                    onClick={() =>
                                        setTwoStarEffectsVisible(
                                            !twoStarEffectsVisible,
                                        )
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
                                    {(() => {
                                        const dataStars2 = filteredData.filter(
                                            (e) => e.stars === 2,
                                        );
                                        if (dataStars2.length === 0) {
                                            return (
                                                <li className='text-gray-400'>
                                                    No hay efectos para el
                                                    filtro aplicado
                                                </li>
                                            );
                                        }
                                        return dataStars2.map((e) => (
                                            <LegendaryEffectItem
                                                key={e.id}
                                                effect={e}
                                                toggleUnlockedEffect={
                                                    toggleUnlockedEffect
                                                }
                                            />
                                        ));
                                    })()}
                                </motion.ul>
                            )}
                        </section>
                        <section className='p-5 m-3 text-xl shadow-md rounded-xl bg-gray-800'>
                            <div className='flex justify-between items-center'>
                                <h2 className='text-center font-bold text-2xl'>
                                    Efectos{' '}
                                    <span className='text-yellow-400 ml-3'>
                                        ★ ★ ★
                                    </span>
                                    <span className='text-gray-400 ml-3'>
                                        {unlockedCount[3].unlocked}/
                                        {unlockedCount[3].total}
                                    </span>
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
                                    {(() => {
                                        const dataStars3 = filteredData.filter(
                                            (e) => e.stars === 3,
                                        );
                                        if (dataStars3.length === 0) {
                                            return (
                                                <li className='text-gray-400'>
                                                    No hay efectos para el
                                                    filtro aplicado
                                                </li>
                                            );
                                        }
                                        return dataStars3.map((e) => (
                                            <LegendaryEffectItem
                                                key={e.id}
                                                effect={e}
                                                toggleUnlockedEffect={
                                                    toggleUnlockedEffect
                                                }
                                            />
                                        ));
                                    })()}
                                </motion.ul>
                            )}
                        </section>
                        <section className='p-5 m-3 text-xl shadow-md rounded-xl bg-gray-800'>
                            <div className='flex justify-between items-center'>
                                <h2 className='text-center text-2xl font-bold'>
                                    Efectos{' '}
                                    <span className='text-yellow-400 ml-3'>
                                        ★ ★ ★ ★
                                    </span>
                                    <span className='text-gray-400 ml-3'>
                                        {unlockedCount[4].unlocked}/
                                        {unlockedCount[4].total}
                                    </span>
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
                                    {(() => {
                                        const dataStars4 = filteredData.filter(
                                            (e) => e.stars === 4,
                                        );
                                        if (dataStars4.length === 0) {
                                            return (
                                                <li className='text-gray-400'>
                                                    No hay efectos para el
                                                    filtro aplicado
                                                </li>
                                            );
                                        }
                                        return dataStars4.map((e) => (
                                            <LegendaryEffectItem
                                                key={e.id}
                                                effect={e}
                                                toggleUnlockedEffect={
                                                    toggleUnlockedEffect
                                                }
                                            />
                                        ));
                                    })()}
                                </motion.ul>
                            )}
                        </section>
                    </div>
                </main>
            </div>
            <Footer />
            <AnimatePresence>
                {notificationActive && (
                    <NotificationModal effect={notificationMsg} />
                )}
            </AnimatePresence>
        </div>
    );
}

export default App;
