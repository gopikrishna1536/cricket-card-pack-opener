import  React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pack } from '../types';
import { PlayerCard } from './PlayerCard';
import { X } from 'lucide-react';

interface PackOpeningProps {
  pack: Pack;
  onClose: () => void;
}

export const PackOpening: React.FC<PackOpeningProps> = ({ pack, onClose }) => {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpen = () => {
    setIsOpened(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300"
      >
        <X className="w-8 h-8" />
      </button>

      <AnimatePresence>
        {!isOpened ? (
          <motion.div
            key="pack"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="text-center"
          >
            <motion.div
              animate={{ rotateY: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className={`w-64 h-80 rounded-xl bg-gradient-to-br ${
                pack.type === 'Bronze' ? 'from-orange-400 to-orange-600' :
                pack.type === 'Silver' ? 'from-gray-300 to-gray-500' :
                'from-yellow-400 to-yellow-600'
              } p-2 shadow-2xl cursor-pointer`}
              onClick={handleOpen}
            >
              <div className="w-full h-full bg-white rounded-lg flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold mb-4">{pack.type} Pack</h2>
                <p className="text-gray-600">Click to open!</p>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="cards"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-wrap gap-4 justify-center max-w-6xl"
          >
            {pack.players.map((player, index) => (
              <PlayerCard key={player.id} player={player} index={index} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
 