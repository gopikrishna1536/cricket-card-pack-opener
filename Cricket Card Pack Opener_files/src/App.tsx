import  { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Volume2, VolumeX, ShoppingCart, Trophy } from 'lucide-react';

interface Player {
  id: string;
  name: string;
  role: 'BAT' | 'BOWL' | 'AR' | 'WK';
  team: string;
  rating: number;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legend';
  stats: {
    matches: number;
    runs?: number;
    wickets?: number;
    average: number;
  };
  photo: string;
}

interface Pack {
  id: string;
  name: string;
  type: 'Bronze' | 'Silver' | 'Gold';
  price: number;
  rarity_odds: Record<string, number>;
  glow: string;
}

const packs: Pack[] = [
  { id: '1', name: 'Bronze Pack', type: 'Bronze', price: 100, rarity_odds: { Common: 80, Rare: 18, Epic: 2, Legend: 0 }, glow: 'shadow-amber-600' },
  { id: '2', name: 'Silver Pack', type: 'Silver', price: 500, rarity_odds: { Common: 50, Rare: 35, Epic: 13, Legend: 2 }, glow: 'shadow-gray-400' },
  { id: '3', name: 'Gold Pack', type: 'Gold', price: 1000, rarity_odds: { Common: 25, Rare: 40, Epic: 25, Legend: 10 }, glow: 'shadow-yellow-400' }
];

const players: Player[] = [
  { id: 'p1', name: 'Virat Kohli', role: 'BAT', team: 'India', rating: 95, rarity: 'Legend', stats: { matches: 274, runs: 12898, average: 57.32 }, photo: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=400&fit=crop' },
  { id: 'p2', name: 'Kane Williamson', role: 'BAT', team: 'New Zealand', rating: 92, rarity: 'Epic', stats: { matches: 161, runs: 6173, average: 47.48 }, photo: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=300&h=400&fit=crop' },
  { id: 'p3', name: 'Jasprit Bumrah', role: 'BOWL', team: 'India', rating: 94, rarity: 'Legend', stats: { matches: 72, wickets: 128, average: 24.43 }, photo: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop' },
  { id: 'p4', name: 'Ben Stokes', role: 'AR', team: 'England', rating: 90, rarity: 'Epic', stats: { matches: 104, runs: 3019, wickets: 74, average: 35.89 }, photo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=400&fit=crop' },
  { id: 'p5', name: 'MS Dhoni', role: 'WK', team: 'India', rating: 96, rarity: 'Legend', stats: { matches: 350, runs: 10773, average: 50.57 }, photo: 'https://images.unsplash.com/photo-1593766827351-9c40a6c1c632?w=300&h=400&fit=crop' },
  { id: 'p6', name: 'Joe Root', role: 'BAT', team: 'England', rating: 88, rarity: 'Rare', stats: { matches: 127, runs: 9594, average: 49.44 }, photo: 'https://images.unsplash.com/photo-1566577134816-b19b4c816ba8?w=300&h=400&fit=crop' },
  { id: 'p7', name: 'Pat Cummins', role: 'BOWL', team: 'Australia', rating: 91, rarity: 'Epic', stats: { matches: 44, wickets: 164, average: 28.94 }, photo: 'https://images.unsplash.com/photo-1578662996442-28d4b1c006dc?w=300&h=400&fit=crop' },
  { id: 'p8', name: 'Babar Azam', role: 'BAT', team: 'Pakistan', rating: 87, rarity: 'Rare', stats: { matches: 103, runs: 4442, average: 45.87 }, photo: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=300&h=400&fit=crop' },
  { id: 'p9', name: 'Trent Boult', role: 'BOWL', team: 'New Zealand', rating: 86, rarity: 'Rare', stats: { matches: 78, wickets: 169, average: 27.49 }, photo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=400&fit=crop' },
  { id: 'p10', name: 'David Warner', role: 'BAT', team: 'Australia', rating: 85, rarity: 'Rare', stats: { matches: 128, runs: 5455, average: 44.59 }, photo: 'https://images.unsplash.com/photo-1566577134816-b19b4c816ba8?w=300&h=400&fit=crop' },
  { id: 'p11', name: 'Rohit Sharma', role: 'BAT', team: 'India', rating: 84, rarity: 'Common', stats: { matches: 243, runs: 9205, average: 48.96 }, photo: 'https://images.unsplash.com/photo-1593766827351-9c40a6c1c632?w=300&h=400&fit=crop' },
  { id: 'p12', name: 'Steve Smith', role: 'BAT', team: 'Australia', rating: 83, rarity: 'Common', stats: { matches: 139, runs: 8010, average: 61.62 }, photo: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=400&fit=crop' }
];

const rarityColors = {
  Common: 'from-gray-600 to-gray-800 border-gray-500',
  Rare: 'from-blue-600 to-blue-800 border-blue-400',
  Epic: 'from-purple-600 to-purple-800 border-purple-400',
  Legend: 'from-yellow-500 to-orange-600 border-yellow-400'
};

function App() {
  const [coins, setCoins] = useState(2000);
  const [inventory, setInventory] = useState<Player[]>([]);
  const [openingPack, setOpeningPack] = useState<Pack | null>(null);
  const [revealedCards, setRevealedCards] = useState<Player[]>([]);
  const [showCards, setShowCards] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [currentView, setCurrentView] = useState<'shop' | 'inventory'>('shop');

  useEffect(() => {
    const saved = localStorage.getItem('cricketInventory');
    if (saved) setInventory(JSON.parse(saved));
    const savedCoins = localStorage.getItem('cricketCoins');
    if (savedCoins) setCoins(parseInt(savedCoins));
  }, []);

  useEffect(() => {
    localStorage.setItem('cricketInventory', JSON.stringify(inventory));
    localStorage.setItem('cricketCoins', coins.toString());
  }, [inventory, coins]);

  const generateCard = (packType: string): Player => {
    const pack = packs.find(p => p.type === packType)!;
    const rand = Math.random() * 100;
    let rarity: string = 'Common';
    let cumulative = 0;
    
    for (const [r, odds] of Object.entries(pack.rarity_odds)) {
      cumulative += odds;
      if (rand <= cumulative) {
        rarity = r;
        break;
      }
    }
    
    const availablePlayers = players.filter(p => p.rarity === rarity);
    return availablePlayers[Math.floor(Math.random() * availablePlayers.length)];
  };

  const openPack = async (pack: Pack) => {
    if (coins < pack.price) return;
    
    setCoins(prev => prev - pack.price);
    setOpeningPack(pack);
    
    const newCards = Array.from({ length: 5 }, () => generateCard(pack.type));
    
    setTimeout(() => {
      setRevealedCards(newCards);
      setShowCards(true);
      setInventory(prev => [...prev, ...newCards]);
    }, 2000);
  };

  const closePackOpening = () => {
    setOpeningPack(null);
    setRevealedCards([]);
    setShowCards(false);
  };

  const PlayerCard = ({ player, delay = 0 }: { player: Player; delay?: number }) => (
    <motion.div
      initial={{ rotateY: 180, scale: 0.8 }}
      animate={{ rotateY: 0, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      className={`relative w-48 h-64 bg-gradient-to-br ${rarityColors[player.rarity]} rounded-xl border-2 overflow-hidden transform-gpu perspective-1000`}
    >
      <div className="absolute inset-0 bg-black/20" />
      <img src={player.photo} alt={player.name} className="absolute inset-0 w-full h-full object-cover opacity-40" />
      <div className="relative z-10 p-4 h-full flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <span className={`px-2 py-1 text-xs font-bold rounded ${
            player.rarity === 'Legend' ? 'bg-yellow-400 text-black' :
            player.rarity === 'Epic' ? 'bg-purple-400 text-white' :
            player.rarity === 'Rare' ? 'bg-blue-400 text-white' : 'bg-gray-400 text-black'
          }`}>
            {player.rarity}
          </span>
          <div className="flex items-center text-yellow-400">
            <Star className="w-4 h-4 mr-1" />
            <span className="text-sm font-bold">{player.rating}</span>
          </div>
        </div>
        <div className="text-white">
          <h3 className="text-lg font-bold mb-1">{player.name}</h3>
          <p className="text-sm opacity-90">{player.team} • {player.role}</p>
          <div className="text-xs mt-2 space-y-1">
            <p>Matches: {player.stats.matches}</p>
            {player.stats.runs && <p>Runs: {player.stats.runs}</p>}
            {player.stats.wickets && <p>Wickets: {player.stats.wickets}</p>}
            <p>Avg: {player.stats.average}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 text-white p-4">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Cricket Cards</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-yellow-600 px-4 py-2 rounded-lg">
              <span className="text-2xl">🪙</span>
              <span className="font-bold">{coins}</span>
            </div>
            <button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2 bg-gray-700 rounded-lg">
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
          </div>
        </header>

        <nav className="flex space-x-4 mb-8">
          <button
            onClick={() => setCurrentView('shop')}
            className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-colors ${
              currentView === 'shop' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Shop
          </button>
          <button
            onClick={() => setCurrentView('inventory')}
            className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-colors ${
              currentView === 'inventory' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            <Trophy className="w-5 h-5 mr-2" />
            Collection ({inventory.length})
          </button>
        </nav>

        {currentView === 'shop' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packs.map(pack => (
              <motion.div
                key={pack.id}
                whileHover={{ scale: 1.05 }}
                className={`bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border-2 border-gray-600 cursor-pointer ${pack.glow}`}
                onClick={() => openPack(pack)}
              >
                <h3 className="text-2xl font-bold mb-4">{pack.name}</h3>
                <div className="text-yellow-400 text-xl font-bold mb-4">🪙 {pack.price}</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Common:</span>
                    <span>{pack.rarity_odds.Common}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rare:</span>
                    <span>{pack.rarity_odds.Rare}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Epic:</span>
                    <span>{pack.rarity_odds.Epic}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Legend:</span>
                    <span>{pack.rarity_odds.Legend}%</span>
                  </div>
                </div>
                <button
                  disabled={coins < pack.price}
                  className={`w-full mt-4 py-3 rounded-lg font-bold transition-colors ${
                    coins >= pack.price
                      ? 'bg-green-600 hover:bg-green-500'
                      : 'bg-gray-600 cursor-not-allowed'
                  }`}
                >
                  {coins >= pack.pack ? 'Open Pack' : 'Not Enough Coins'}
                </button>
              </motion.div>
            ))}
          </div>
        )}

        {currentView === 'inventory' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {inventory.length === 0 ? (
              <p className="text-white text-xl col-span-full text-center">No cards yet. Buy some packs!</p>
            ) : (
              inventory.map((player, index) => (
                <PlayerCard key={`${player.id}-${index}-${Date.now()}`} player={player} />
              ))
            )}
          </div>
        )}

        <AnimatePresence>
          {openingPack && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            >
              <div className="text-center">
                {!showCards ? (
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className={`w-64 h-80 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl border-4 ${openingPack.glow} flex items-center justify-center text-6xl shadow-2xl`}
                  >
                    📦
                  </motion.div>
                ) : (
                  <div>
                    <h2 className="text-3xl font-bold mb-6">Pack Opened!</h2>
                    <div className="flex flex-wrap justify-center gap-4 mb-6">
                      {revealedCards.map((card, index) => (
                        <PlayerCard key={`revealed-${card.id}-${index}`} player={card} delay={index * 0.2} />
                      ))}
                    </div>
                    <button
                      onClick={closePackOpening}
                      className="bg-blue-600 hover:bg-blue-500 px-8 py-3 rounded-lg font-bold transition-colors"
                    >
                      Continue
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
 