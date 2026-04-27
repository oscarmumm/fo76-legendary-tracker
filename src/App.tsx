import { useEffect, useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'motion/react';

// COMPONENTS
import { Header } from './components/Header';
import { useData } from './contexts/DataContext';
import { LegendaryEffectItem } from './components/LegendaryEffectItem';
import { NotificationModal } from './components/NotificationModal';
import { Footer } from './components/Footer';
import { CharacterSelector } from './components/CharacterSelector';
import { Filters } from './components/Filters';

// ICONS
import { MdKeyboardArrowDown } from 'react-icons/md';

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
        characters,
        activeCharacterId,
        toggleUnlockedEffect,
        notificationActive,
        notificationMsg,
    } = useData();

    const effects =
        characters.find((c) => c.id === activeCharacterId)?.effects || [];
    const [filteredData, setFilteredData] = useState(effects);
    const [filter, setFilter] = useState<string>('all');

    const openAllEffectsColumns = () => {
        setOneStarEffectsVisible(true);
        setTwoStarEffectsVisible(true);
        setThreeStarEffectsVisible(true);
        setFourStarEffectsVisible(true);
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
        let temp = effects;
        switch (filter) {
            case 'locked':
                temp = effects.filter((e) => !e.unlocked);
                break;
            case 'unlocked':
                temp = effects.filter((e) => e.unlocked);
                break;
            case 'human':
                temp = effects.filter((e) => !e.race.includes('ghoul'));
                break;
            case 'ghoul':
                temp = effects.filter((e) => !e.race.includes('human'));
                break;
            case 'ranged':
                temp = effects.filter((e) => e.category.includes('ranged'));
                break;
            case 'melee':
                temp = effects.filter((e) => e.category.includes('melee'));
                break;
            case 'armor':
                temp = effects.filter((e) => e.category.includes('armor'));
                break;
            case 'powerArmor':
                temp = effects.filter((e) =>
                    e.category.includes('power armor'),
                );
                break;
            case 'bounty':
                temp = effects.filter((e) => e.bounty === true);
                break;
            default:
                setFilteredData(effects);
        }
        setFilteredData(temp);
        openAllEffectsColumns();
    }, [filter, effects]);

    return (
        <div className="bg-gray-900 text-slate-50 min-h-screen flex flex-col justify-between">
            <div>
                <Header />
                <main className="bg-gray-900 text-slate-50 flex flex-col">
                    <div className='p-3 m-3 flex flex-col items-center justify-center md:flex-row bg-gray-800 rounded-xl gap-3'>
                        <CharacterSelector />
                        <Filters onFilterChange={(f) => setFilter(f)} />
                    </div>
                    {/* EFFECTS COLUMNS SECTION */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 items-start">
                        <section className="p-5 m-3 text-xl shadow-md rounded-xl bg-gray-800">
                            <div className="flex justify-between items-center">
                                <h2 className="text-center font-bold">
                                    Efectos{' '}
                                    <span className="text-yellow-400 ml-3">
                                        ★
                                    </span>
                                    <span className="text-gray-400 ml-3">
                                        {unlockedCount[1].unlocked}/
                                        {unlockedCount[1].total}
                                    </span>
                                </h2>
                                <button
                                    className="text-3xl hover:bg-gray-600 rounded-xl cursor-pointer"
                                    onClick={() =>
                                        setOneStarEffectsVisible(
                                            !oneStarEffectsVisible,
                                        )
                                    }>
                                    <MdKeyboardArrowDown />
                                </button>
                            </div>

                            {oneStarEffectsVisible && (
                                <motion.ul
                                    variants={filterListAnimation}
                                    initial="hidden"
                                    whileInView="visible"
                                    exit="hidden"
                                    transition={{ duration: 0.2 }}
                                    className="mt-5">
                                    {(() => {
                                        const dataStars1 = filteredData.filter(
                                            (e) => e.stars === 1,
                                        );
                                        if (dataStars1.length === 0) {
                                            return (
                                                <li className="text-gray-400">
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
                        <section className="p-5 m-3 text-xl shadow-md rounded-xl bg-gray-800">
                            <div className="flex justify-between items-center">
                                <h2 className="text-center font-bold">
                                    Efectos{' '}
                                    <span className="text-yellow-400 ml-3">
                                        ★ ★
                                    </span>
                                    <span className="text-gray-400 ml-3">
                                        {unlockedCount[2].unlocked}/
                                        {unlockedCount[2].total}
                                    </span>
                                </h2>
                                <button
                                    className="text-3xl hover:bg-gray-600 rounded-xl cursor-pointer"
                                    onClick={() =>
                                        setTwoStarEffectsVisible(
                                            !twoStarEffectsVisible,
                                        )
                                    }>
                                    <MdKeyboardArrowDown />
                                </button>
                            </div>

                            {twoStarEffectsVisible && (
                                <motion.ul
                                    variants={filterListAnimation}
                                    initial="hidden"
                                    whileInView="visible"
                                    exit="hidden"
                                    transition={{ duration: 0.2 }}
                                    className="mt-5">
                                    {(() => {
                                        const dataStars2 = filteredData.filter(
                                            (e) => e.stars === 2,
                                        );
                                        if (dataStars2.length === 0) {
                                            return (
                                                <li className="text-gray-400">
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
                        <section className="p-5 m-3 text-xl shadow-md rounded-xl bg-gray-800">
                            <div className="flex justify-between items-center">
                                <h2 className="text-center font-bold">
                                    Efectos{' '}
                                    <span className="text-yellow-400 ml-3">
                                        ★ ★ ★
                                    </span>
                                    <span className="text-gray-400 ml-3">
                                        {unlockedCount[3].unlocked}/
                                        {unlockedCount[3].total}
                                    </span>
                                </h2>
                                <button
                                    className="text-3xl hover:bg-gray-600 rounded-xl cursor-pointer"
                                    onClick={() =>
                                        setThreeStarEffectsVisible(
                                            !threeStarEffectsVisible,
                                        )
                                    }>
                                    <MdKeyboardArrowDown />
                                </button>
                            </div>

                            {threeStarEffectsVisible && (
                                <motion.ul
                                    variants={filterListAnimation}
                                    initial="hidden"
                                    whileInView="visible"
                                    exit="hidden"
                                    transition={{ duration: 0.2 }}
                                    className="mt-5">
                                    {(() => {
                                        const dataStars3 = filteredData.filter(
                                            (e) => e.stars === 3,
                                        );
                                        if (dataStars3.length === 0) {
                                            return (
                                                <li className="text-gray-400">
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
                        <section className="p-5 m-3 text-xl shadow-md rounded-xl bg-gray-800">
                            <div className="flex justify-between items-center">
                                <h2 className="text-center font-bold">
                                    Efectos{' '}
                                    <span className="text-yellow-400 ml-3">
                                        ★ ★ ★ ★
                                    </span>
                                    <span className="text-gray-400 ml-3">
                                        {unlockedCount[4].unlocked}/
                                        {unlockedCount[4].total}
                                    </span>
                                </h2>
                                <button
                                    className="text-3xl hover:bg-gray-600 rounded-xl cursor-pointer"
                                    onClick={() =>
                                        setFourStarEffectsVisible(
                                            !fourStarEffectsVisible,
                                        )
                                    }>
                                    <MdKeyboardArrowDown />
                                </button>
                            </div>

                            {fourStarEffectsVisible && (
                                <motion.ul
                                    variants={filterListAnimation}
                                    initial="hidden"
                                    whileInView="visible"
                                    exit="hidden"
                                    transition={{ duration: 0.2 }}
                                    className="mt-5">
                                    {(() => {
                                        const dataStars4 = filteredData.filter(
                                            (e) => e.stars === 4,
                                        );
                                        if (dataStars4.length === 0) {
                                            return (
                                                <li className="text-gray-400">
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
