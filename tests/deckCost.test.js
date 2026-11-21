import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { validateSquad } from '../src/utils/deckCostLimiter.js';

describe('Deck Cost & Squad Limiter Tests', () => {
  test('rejects squad if cost exceeds 100 credits', () => {
    const squad = new Array(11).fill({ role: 'Batter', cost: 10 });
    const res = validateSquad(squad);
    assert.equal(res.valid, false);
    assert.ok(res.error.includes('exceeds maximum salary cap'));
  });

  test('approves balanced squad within budget limits', () => {
    const squad = [
      { role: 'WicketKeeper', cost: 9 },
      { role: 'Batter', cost: 8.5 },
      { role: 'Batter', cost: 8.5 },
      { role: 'Batter', cost: 8.0 },
      { role: 'Batter', cost: 8.0 },
      { role: 'AllRounder', cost: 9.0 },
      { role: 'AllRounder', cost: 8.5 },
      { role: 'Bowler', cost: 8.5 },
      { role: 'Bowler', cost: 8.5 },
      { role: 'Bowler', cost: 8.0 },
      { role: 'Bowler', cost: 7.5 }
    ];
    const res = validateSquad(squad);
    assert.equal(res.valid, true);
    assert.ok(res.totalCost <= 100);
  });
});
