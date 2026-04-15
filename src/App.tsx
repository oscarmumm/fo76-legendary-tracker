import { useState } from 'react';
import { Header } from './components/Header';
import { legendaryEffects } from './db/LegendaryEffectsDB';
import { MdKeyboardArrowDown } from 'react-icons/md';

function App() {
    const [oneStarEffectsVisible, setOneStarEffectsVisible] = useState(false);
    const [twoStarEffectsVisible, setTwoStarEffectsVisible] = useState(false);
    const [threeStarEffectsVisible, setThreeStarEffectsVisible] =
        useState(false);
    const [fourStarEffectsVisible, setFourStarEffectsVisible] = useState(false);

    return (
        <main className='bg-cyan-900 text-slate-50 min-h-screen'>
            <Header />
            <div className='p-5 m-3 flex justify-between items-center text-xl shadow-md shadow-cyan-950 rounded-lg'>
                <h2>FILTERS</h2>
                <div className='flex flex-col md:flex-row'>
                    <button className='p-3 cursor-pointer w-48'>Locked</button>
                    <button className='p-3 cursor-pointer w-48'>Unlocked</button>
                    <button className='p-3 cursor-pointer w-48'>Ghoul</button>
                </div>
            </div>
            <div className='grid md:grid-cols-2 lg:grid-cols-4 items-start'>
                <section className='p-5 m-3 text-xl shadow-md shadow-cyan-950 rounded-lg'>
                    <div className='flex justify-between items-center'>
                        <h2 className='text-center font-bold'>
                            1 STAR EFFECTS
                        </h2>
                        <button
                            className='text-3xl cursor-pointer'
                            onClick={() =>
                                setOneStarEffectsVisible(!oneStarEffectsVisible)
                            }
                        >
                            <MdKeyboardArrowDown />
                        </button>
                    </div>

                    {oneStarEffectsVisible && (
                        <ul className='mt-5'>
                            {legendaryEffects
                                .filter((e) => e.stars === 1)
                                .map((e) => (
                                    <li
                                        key={e.id}
                                        className='flex justify-between align-center'
                                    >
                                        <span className='p-1'>{e.name}</span>
                                        <input
                                            type='checkbox'
                                            className='cursor-pointer scale-150'
                                        />
                                    </li>
                                ))}
                        </ul>
                    )}
                </section>
                <section className='p-5 m-3 text-xl shadow-md shadow-cyan-950 rounded-lg'>
                    <div className='flex justify-between items-center'>
                        <h2 className='text-center font-bold'>
                            2 STAR EFFECTS
                        </h2>
                        <button
                            className='text-3xl cursor-pointer'
                            onClick={() =>
                                setTwoStarEffectsVisible(!twoStarEffectsVisible)
                            }
                        >
                            <MdKeyboardArrowDown />
                        </button>
                    </div>

                    {twoStarEffectsVisible && (
                        <ul className='mt-5'>
                            {legendaryEffects
                                .filter((e) => e.stars === 2)
                                .map((e) => (
                                    <li
                                        key={e.id}
                                        className='flex justify-between'
                                    >
                                        <span className='p-1'>{e.name}</span>
                                        <input
                                            type='checkbox'
                                            className='cursor-pointer scale-150'
                                        />
                                    </li>
                                ))}
                        </ul>
                    )}
                </section>
                <section className='p-5 m-3 text-xl shadow-md shadow-cyan-950 rounded-lg'>
                    <div className='flex justify-between items-center'>
                        <h2 className='text-center font-bold'>
                            3 STAR EFFECTS
                        </h2>
                        <button
                            className='text-3xl cursor-pointer'
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
                            {legendaryEffects
                                .filter((e) => e.stars === 3)
                                .map((e) => (
                                    <li
                                        key={e.id}
                                        className='flex justify-between'
                                    >
                                        <span className='p-1'>{e.name}</span>
                                        <input
                                            type='checkbox'
                                            className='cursor-pointer scale-150'
                                        />
                                    </li>
                                ))}
                        </ul>
                    )}
                </section>
                <section className='p-5 m-3 text-xl shadow-md shadow-cyan-950 rounded-lg'>
                    <div className='flex justify-between items-center'>
                        <h2 className='text-center font-bold'>
                            4 STAR EFFECTS
                        </h2>
                        <button
                            className='text-3xl cursor-pointer'
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
                            {legendaryEffects
                                .filter((e) => e.stars === 4)
                                .map((e) => (
                                    <li
                                        key={e.id}
                                        className='flex justify-between'
                                    >
                                        <span className='p-1'>{e.name}</span>
                                        <input
                                            type='checkbox'
                                            className='cursor-pointer scale-150'
                                        />
                                    </li>
                                ))}
                        </ul>
                    )}
                </section>
            </div>
        </main>
    );
}

export default App;
