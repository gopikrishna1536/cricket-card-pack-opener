import  { motion } from 'framer-motion';
import { Player } from '../types';
import { PlayerCard } from './PlayerCard';
import { Package } from 'lucide-react';

interface InventoryProps {
  players: Player[];
}

export const Inventory = ({ players }: InventoryProps) => {
  const groupedPlayers = players.reduce((acc, player) => {
    const key = `${player.id}-${player.name}`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const uniquePlayers = Array.from(new Set(players.map(p => p.id)))
    .map(id => players.find(p => p.id === id)!);

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Package className="text-white" size={24} />
        <h2 className="text-2xl font-bold text-white">My Collection</h2>
        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
          {players.length} cards
        </span>
      </div>
      
      {uniquePlayers.length === 0 ? (
        <div className="text-center py-12">
          <Package size={64} className="text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">No cards yet! Open some packs to start your collection.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {uniquePlayers.map((player, index) => {
            const count = groupedPlayers[`${player.id}-${player.name}`];
            return (
              <motion.div
                key={`${player.id}-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="relative"
              >
                <PlayerCard player={player} />
                {count > 1 && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                    {count}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};
 