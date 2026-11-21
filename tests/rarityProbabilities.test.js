import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { resolveRarityFromRandom } from '../src/utils/rarityProbabilities.js';

describe('Rarity Probability Tests', () => {
  test('maps random floating seed to published rarity tiers', () => {
    assert.equal(resolveRarityFromRandom(0.005), 'Legendary');
    assert.equal(resolveRarityFromRandom(0.05), 'Epic');
    assert.equal(resolveRarityFromRandom(0.25), 'Rare');
    assert.equal(resolveRarityFromRandom(0.85), 'Common');
  });
});
