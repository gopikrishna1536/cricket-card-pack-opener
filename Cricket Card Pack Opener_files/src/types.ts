export  interface Player {
  id: string;
  name: string;
  role: 'BAT' | 'BOWL' | 'AR' | 'WK';
  team: string;
  rating: number;
  tier: 'Common' | 'Rare' | 'Epic' | 'Legend';
  photo: string;
  stats: {
    matches: number;
    average: number;
    strikeRate: number;
  };
}

export interface Pack {
  id: string;
  type: 'Bronze' | 'Silver' | 'Gold';
  price: number;
  players: Player[];
}
 