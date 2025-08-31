import  { Pack } from '../types';

export const packs: Pack[] = [
  {
    id: 'bronze',
    name: 'Bronze Pack',
    type: 'bronze',
    price: 100,
    rarity: 'Basic players with standard odds',
    image: 'https://images.unsplash.com/photo-1646809014333-db4c6d539697?w=300&h=400&fit=crop'
  },
  {
    id: 'silver',
    name: 'Silver Pack',
    type: 'silver',
    price: 250,
    rarity: 'Increased rare card chances',
    image: 'https://images.unsplash.com/photo-1637757960303-6b152b77e161?w=300&h=400&fit=crop'
  },
  {
    id: 'gold',
    name: 'Gold Pack',
    type: 'gold',
    price: 500,
    rarity: 'Guaranteed epic or legend',
    image: 'https://images.unsplash.com/photo-1660501487209-d2c08971ca2f?w=300&h=400&fit=crop'
  }
];
 