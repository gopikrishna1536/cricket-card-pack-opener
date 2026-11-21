import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { checkAchievements } from '../src/utils/achievementTracker.js';

describe('Achievement Tracker Tests', () => {
  test('evaluates milestone unlocks accurately based on user statistics', () => {
    const stats = { packsOpened: 120, legendaryCount: 2, bestSquadOverall: 88 };
    const res = checkAchievements(stats);
    assert.equal(res.find(a => a.id === 'first_legendary').unlocked, true);
    assert.equal(res.find(a => a.id === 'hundred_packs').unlocked, true);
    assert.equal(res.find(a => a.id === 'squad_overall_90').unlocked, false);
  });
});
