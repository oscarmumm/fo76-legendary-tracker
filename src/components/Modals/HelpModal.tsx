import { motion } from 'motion/react';
import { modalBackgroundVariants, modalWindowVariants } from '../../animations';

import { FaUnlock, FaLock } from 'react-icons/fa';
import { FaGun } from 'react-icons/fa6';
import { LuSword } from 'react-icons/lu';
import { GiShoulderArmor, GiBlackKnightHelm } from 'react-icons/gi';
import { IoMdClose } from 'react-icons/io';

interface HelpModalProps {
    closeHelpModal: () => void;
}

export const HelpModal = ({ closeHelpModal }: HelpModalProps) => {
    const closeModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        closeHelpModal();
    };

    return (
        <motion.div
            className="modal items-center justify-center"
            variants={modalBackgroundVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2, ease: 'easeInOut' }}>
            <motion.div
                className="p-5 m-3 text-xl relative flex flex-col min-w-72 bg-gray-600 rounded-xl"
                variants={modalWindowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.2, ease: 'easeInOut' }}>
                <button
                    className="p-1 absolute text-3xl top-0 right-0 rounded-xl cursor-pointer hover:bg-gray-600"
                    onClick={(e) => closeModal(e)}>
                    <IoMdClose />
                </button>
                <h3 className="mb-5 text-xl underline font-bold">Ayuda:</h3>
                <p className='mb-3'>Bienvenido a la aplicación Fallout 76 Legendary Tracker!</p>
                <p className='mb-3'>
                    Estas son las referencias de los íconos que verá en los
                    efectos:
                </p>
                <ul>
                    <li className='flex items-center gap-3'>
                        <FaGun className='text-sky-400' />
                        <span>Armas a distancia</span>
                    </li>
                    <li className='flex items-center gap-3'>
                        <LuSword className='text-sky-400' />
                        <span>Armas cuerpo a cuerpo</span>
                    </li>
                    <li className='flex items-center gap-3'>
                        <GiShoulderArmor className='text-sky-400' />
                        <span>Armaduras</span>
                    </li>
                    <li className='flex items-center gap-3'>
                        <GiBlackKnightHelm className='text-sky-400' />
                        <span>Servoarmaduras</span>
                    </li>
                </ul>
                <ul>
                    <li>
                        <span>
                            <FaLock />
                        </span>
                        <span></span>
                    </li>
                    <li>
                        <span>
                            <FaUnlock />
                        </span>
                        <span></span>
                    </li>
                </ul>
            </motion.div>
        </motion.div>
    );
};
