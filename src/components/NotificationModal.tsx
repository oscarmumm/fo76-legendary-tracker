import { motion } from 'motion/react';
import { modalBackgroundVariants, modalWindowVariants } from '../animations';
import { FaUnlock } from 'react-icons/fa';

type NotificationModalProps = {
    effect: string;
};

export const NotificationModal = ({ effect }: NotificationModalProps) => {
    return (
        <motion.div
            variants={modalBackgroundVariants}
            className="modal"
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2, ease: 'easeInOut' }}>
            <motion.div
                className="px-10 py-5 flex flex-col rounded-tl-xl rounded-bl-xl bg-gray-700"
                variants={modalWindowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.2, ease: 'easeInOut' }}>
                <p className="text-slate-50 font-semibold text-lg flex items-center justify-center">
                    <span>Desbloqueaste</span>
                    <span className='text-yellow-400  ml-2'>{effect}!!</span>
                    <FaUnlock className="ml-3 text-green-500" />
                </p>
            </motion.div>
        </motion.div>
    );
};
