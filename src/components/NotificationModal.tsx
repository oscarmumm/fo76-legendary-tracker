import { motion } from 'motion/react';
import { modalBackgroundVariants, modalWindowVariants } from '../animations';

type NotificationModalProps = {
    effect: string;
}

export const NotificationModal = ({effect} : NotificationModalProps) => {
    return (
        <motion.div
            variants={modalBackgroundVariants}
            className='modal'
            initial='hidden'
            animate='visible'
            exit='exit'
            transition={{ duration: 0.2 }}
        >
            <motion.div
            className='p-12 flex flex-col items-center justify-center w-md h-64 shadow-lg rounded-lg bg-slate-100'
                variants={modalWindowVariants}
                initial='hidden'
                animate='visible'
                exit='exit'
                transition={{ duration: 0.2 }}
            >
                <p>Desbloqueaste {effect}!!</p>
            </motion.div>
        </motion.div>
    );
};
