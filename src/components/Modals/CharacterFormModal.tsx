import { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { motion } from 'motion/react';
import { modalBackgroundVariants, modalWindowVariants } from '../../animations';
import { IoMdClose } from 'react-icons/io';

interface CharacterFormModalProps {
    closeCharacterFormModal: () => void;
}

export const CharacterFormModal = ({
    closeCharacterFormModal,
}: CharacterFormModalProps) => {
    const { updateCharacterName, activeCharacterId, characters } = useData();
    const [characterName, setCharacterName] = useState<string>(() => {
        const activeCharacter = characters.find(
            (c) => c.id === activeCharacterId,
        );
        return activeCharacter ? activeCharacter.name : '';
    });

    const closeModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        closeCharacterFormModal();
    };

    return (
        <motion.div
            className="modal items-center justify-center"
            variants={modalBackgroundVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2, ease: 'easeInOut' }}>
            <motion.form
                className="p-3 flex flex-col min-w-72 bg-gray-800 rounded-xl"
                variants={modalWindowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.2, ease: 'easeInOut' }}>
                <button
                    className="p-1 text-3xl self-end cursor-pointer hover:bg-gray-600"
                    onClick={(e) => closeModal(e)}>
                    <IoMdClose />
                </button>
                <label className="mb-8">Editar nombre del personaje</label>
                <input
                    className="p-3 mb-8 bg-slate-50 text-slate-900 rounded-xl outline-none"
                    onChange={(e) =>
                        setCharacterName(e.target.value.trimStart())
                    }
                    type="text"
                    value={characterName}
                    maxLength={30}
                />
                <div className="grid grid-cols-2 gap-3">
                    <button
                        className="p-3 min-w-24 bg-sky-500 hover:bg-sky-400 rounded-xl cursor-pointer"
                        onClick={(e) => {
                            updateCharacterName(
                                activeCharacterId,
                                characterName,
                            );
                            closeModal(e);
                        }}>
                        Guardar
                    </button>
                    <button
                        className="p-3 min-w-24 bg-purple-500 hover:bg-purple-400 rounded-xl cursor-pointer"
                        onClick={(e) => closeModal(e)}>
                        Cancelar
                    </button>
                </div>
            </motion.form>
        </motion.div>
    );
};
