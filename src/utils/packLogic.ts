import { players } from '../data/players';
import { Player } from '../types';

export const getPackOdds = (packType: string) => {
  switch (packType.toLowerCase()) {
    case 'bronze':
      return { common: 0.6, rare: 0.3, epic: 0.09, legend: 0.01 };
    case 'silver':
      return { common: 0.4, rare: 0.4, epic: 0.15, legend: 0.05 };
    case 'gold':
      return { common: 0.2, rare: 0.3, epic: 0.3, legend: 0.2 };
    default:
      return { common: 0.6, rare: 0.3, epic: 0.09, legend: 0.01 };
  }
};

export const openPack = (packType: string): Player[] => {
  const odds = getPackOdds(packType);
  const pack: Player[] = [];
  
  for (let i = 0; i < 5; i++) {
    const random = Math.random();
    let tier: Player['tier'];
    
    if (random < odds.legend) tier = 'Legend';
    else if (random < odds.legend + odds.epic) tier = 'Epic';
    else if (random < odds.legend + odds.epic + odds.rare) tier = 'Rare';
    else tier = 'Common';
    
    const availablePlayers = players.filter(p => p.tier === tier);
    const pool = availablePlayers.length > 0 ? availablePlayers : players;
    const randomPlayer = pool[Math.floor(Math.random() * pool.length)];
    pack.push(randomPlayer);
  }
  
  return pack;
};

 