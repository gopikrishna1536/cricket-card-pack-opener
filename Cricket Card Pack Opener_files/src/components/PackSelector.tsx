import  { motion } from 'framer-motion';
import { packs } from '../data/packs';
import { ShoppingBag, Star } from 'lucide-react';

interface PackSelectorProps {
  coins: number;
  onOpenPack: (packType: string, price: number) => void;
}

export const PackSelector = ({ coins, onOpenPack }: PackSelectorProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {packs.map((pack, index) => (
        <motion.div
          key={pack.id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-gray-800 rounded-xl p-6 text-center shadow-xl border border-gray-700 hover:border-gray-600 transition-all"
        >
          <div className="h-48 bg-gray-700 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
            <img 
              src={pack.image} 
              alt={pack.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          
          <h3 className="text-xl font-bold text-white mb-2">{pack.name}</h3>
          <p className="text-gray-400 text-sm mb-4">{pack.rarity}</p>
          
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star size={16} className="text-yellow-400" />
            <span className="text-yellow-400 font-bold">{pack.price} coins</span>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={coins < pack.price}
            onClick={() => onOpenPack(pack.type, pack.price)}
            className={`w-full py-3 px-6 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${
              coins >= pack.price
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            <ShoppingBag size={16} />
            Open Pack
          </motion.button>
        </motion.div>
      ))}
    </div>
  );
};
 