import  { players } from '../data/players';
import { Player } from '../types';

export const getPackOdds = (packType: string) => {
  switch (packType) {
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
    let tier: string;
    
    if (random < odds.legend) tier = 'legend';
    else if (random < odds.legend + odds.epic) tier = 'epic';
    else if (random < odds.legend + odds.epic + odds.rare) tier = 'rare';
    else tier = 'common';
    
    const availablePlayers = players.filter(p => p.tier === tier);
    const randomPlayer = availablePlayers[Math.floor(Math.random() * availablePlayers.length)];
    pack.push(randomPlayer);
  }
  
  return pack;
};
 