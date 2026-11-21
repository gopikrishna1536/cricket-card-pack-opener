import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { calculateCardStats, calculateXpForNextLevel } from '../src/utils/cardEvolutionEngine.js';

describe('Card Evolution & Leveling Engine Tests', () => {
  const baseStats = { batting: 80, bowling: 70, fielding: 75 };

  test('level 1 card preserves base stats', () => {
    const stats = calculateCardStats(baseStats, 1, 1);
    assert.equal(stats.batting, 80);
    assert.equal(stats.bowling, 70);
  });

  test('higher levels scale attributes proportionally', () => {
    const statsLvl10 = calculateCardStats(baseStats, 10, 1);
    assert.ok(statsLvl10.batting > 80);
    assert.ok(statsLvl10.overall > 70);
  });

  test('exponential XP requirement for consecutive level ups', () => {
    const xp1 = calculateXpForNextLevel(1);
    const xp2 = calculateXpForNextLevel(2);
    assert.equal(xp1, 100);
    assert.ok(xp2 > xp1);
  });
});
