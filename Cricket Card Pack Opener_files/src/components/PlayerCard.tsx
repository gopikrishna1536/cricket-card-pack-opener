import  React from 'react';
import { motion } from 'framer-motion';
import { Player } from '../types';
import { Star } from 'lucide-react';

interface PlayerCardProps {
  player: Player;
  index?: number;
}

const tierColors = {
  Common: 'from-gray-400 to-gray-600',
  Rare: 'from-blue-400 to-blue-600',
  Epic: 'from-purple-400 to-purple-600',
  Legend: 'from-yellow-400 to-orange-600'
};

export const PlayerCard: React.FC<PlayerCardProps> = ({ player, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateY: 180 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ delay: index * 0.2, duration: 0.8 }}
      className={`relative w-48 h-64 rounded-xl bg-gradient-to-br ${tierColors[player.tier]} p-1 shadow-2xl`}
    >
      <div className="w-full h-full bg-white rounded-lg overflow-hidden">
        <div className="relative h-32">
          <img
            src={player.photo}
            alt={player.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
            {player.rating}
          </div>
        </div>
        
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-sm truncate">{player.name}</h3>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">{player.role}</span>
          </div>
          
          <p className="text-xs text-gray-600 mb-2">{player.team}</p>
          
          <div className="flex items-center justify-between">
            <div className={`flex items-center ${player.tier === 'Legend' ? 'text-yellow-500' : 'text-gray-400'}`}>
              {[...Array(player.tier === 'Legend' ? 5 : player.tier === 'Epic' ? 4 : player.tier === 'Rare' ? 3 : 2)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-current" />
              ))}
            </div>
            <span className={`text-xs font-bold ${player.tier === 'Legend' ? 'text-yellow-600' : player.tier === 'Epic' ? 'text-purple-600' : player.tier === 'Rare' ? 'text-blue-600' : 'text-gray-600'}`}>
              {player.tier}
            </span>
          </div>
          
          <div className="text-xs text-gray-500 mt-2">
            <div>Avg: {player.stats.average}</div>
            <div>SR: {player.stats.strikeRate}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
 