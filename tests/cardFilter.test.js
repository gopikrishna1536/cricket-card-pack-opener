import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { filterCards } from '../src/utils/cardFilterEngine.js';

describe('Card Filter Engine Tests', () => {
  const cards = [
    { name: 'Player 1', rarity: 'Legendary', nationality: 'India', role: 'Batter' },
    { name: 'Player 2', rarity: 'Rare', nationality: 'Australia', role: 'Bowler' }
  ];

  test('filters by rarity and country', () => {
    const res = filterCards(cards, { rarity: 'Legendary', nationality: 'India' });
    assert.equal(res.length, 1);
    assert.equal(res[0].name, 'Player 1');
  });
});
