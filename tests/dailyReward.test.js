import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { getDailyReward } from '../src/utils/dailyRewardStreak.js';

describe('Daily Reward Streak Tests', () => {
  test('day 7 grants massive coin boost and gold pack', () => {
    const reward = getDailyReward(7);
    assert.equal(reward.coins, 2000);
    assert.equal(reward.pack, 'GoldPack');
  });

  test('cycles back to day 1 after 7 days', () => {
    const reward = getDailyReward(8);
    assert.equal(reward.day, 1);
  });
});
