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
            className='modal items-center justify-center'
            variants={modalBackgroundVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
            <motion.div
                className='p-5 m-3 text-lg relative flex flex-col min-w-72 max-w-3xl max-h-150 overflow-auto italic bg-gray-800 rounded-xl'
                variants={modalWindowVariants}
                initial='hidden'
                animate='visible'
                exit='exit'
                transition={{ duration: 0.2, ease: 'easeInOut' }}
            >
                <button
                    className='p-3 absolute text-3xl top-0 right-0 rounded-xl cursor-pointer hover:bg-gray-600'
                    onClick={(e) => closeModal(e)}
                >
                    <IoMdClose />
                </button>
                <p className='mb-3 pr-20'>
                    Bienvenido a la aplicación Fallout 76 Legendary Tracker!
                </p>
                <p className='mb-3'>
                    Esta aplicación fue creada para hacer un seguimiento de los efectos legendarios que vayas aprendiendo en Fallout 76
                </p>
                <p className='mb-3'>
                    Estas son las referencias de los íconos que verás en los
                    efectos:
                </p>
                <ul className='mb-3'>
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
                    <li className='flex items-center gap-3'>
                        <FaLock className='text-red-600' />
                        <span>Efecto bloqueado</span>
                    </li>
                    <li className='flex items-center gap-3'>
                        <FaUnlock className='text-green-500' />
                        <span>Efecto desbloqueado</span>
                    </li>
                </ul>
                <p className='mb-3'>
                    Al pulsar sobre el nombre de un efecto se desplegará su{' '}
                    <strong className='font-bold'>descripción</strong>
                </p>
                <p className='mb-3'>
                    Puedes gestionar los efectos aprendidos de hasta{' '}
                    <strong className='font-bold'>5 personajes</strong>, a los
                    cuales puedes asignarles un nombre para identificarlos
                    (ejemplo: "pj principal xbox")
                </p>
                <p className='mb-3'>
                    Tambíen puedes aplicar{' '}
                    <strong className='font-bold'>filtros</strong> para
                    encontrar mas rápido los efectos
                </p>
            </motion.div>
        </motion.div>
    );
};
