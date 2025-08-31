import  React from 'react';
import { motion } from 'framer-motion';
import { Package } from 'lucide-react';

interface PackCardProps {
  type: 'Bronze' | 'Silver' | 'Gold';
  price: number;
  onClick: () => void;
}

const packColors = {
  Bronze: 'from-orange-400 to-orange-600',
  Silver: 'from-gray-300 to-gray-500',
  Gold: 'from-yellow-400 to-yellow-600'
};

export const PackCard: React.FC<PackCardProps> = ({ type, price, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative w-48 h-64 rounded-xl bg-gradient-to-br ${packColors[type]} p-1 shadow-2xl cursor-pointer`}
      onClick={onClick}
    >
      <div className="w-full h-full bg-white rounded-lg flex flex-col items-center justify-center p-4">
        <Package className="w-16 h-16 mb-4 text-gray-700" />
        <h3 className="text-xl font-bold mb-2">{type} Pack</h3>
        <p className="text-lg font-semibold text-green-600">${price}</p>
        <p className="text-xs text-gray-500 mt-2 text-center">5 Random Players</p>
      </div>
    </motion.div>
  );
};
 