import  { Player, Pack } from '../types';
import { players } from '../data/players';

const TIER_ODDS = {
  Bronze: { Legend: 0.01, Epic: 0.05, Rare: 0.24, Common: 0.7 },
  Silver: { Legend: 0.03, Epic: 0.12, Rare: 0.35, Common: 0.5 },
  Gold: { Legend: 0.08, Epic: 0.22, Rare: 0.4, Common: 0.3 }
};

export const generatePack = (type: 'Bronze' | 'Silver' | 'Gold'): Pack => {
  const packPlayers: Player[] = [];
  const odds = TIER_ODDS[type];
  
  for (let i = 0; i < 5; i++) {
    const rand = Math.random();
    let tier: Player['tier'];
    
    if (rand < odds.Legend) tier = 'Legend';
    else if (rand < odds.Legend + odds.Epic) tier = 'Epic';
    else if (rand < odds.Legend + odds.Epic + odds.Rare) tier = 'Rare';
    else tier = 'Common';
    
    const tierPlayers = players.filter(p => p.tier === tier);
    const randomPlayer = tierPlayers[Math.floor(Math.random() * tierPlayers.length)];
    packPlayers.push(randomPlayer);
  }
  
  return {
    id: Math.random().toString(36),
    type,
    price: type === 'Bronze' ? 100 : type === 'Silver' ? 250 : 500,
    players: packPlayers
  };
};
 