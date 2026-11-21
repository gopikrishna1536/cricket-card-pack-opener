import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { applyLeadershipMultipliers } from '../src/utils/captaincyBonus.js';

describe('Captaincy Multiplier Tests', () => {
  test('doubles points for captain', () => {
    assert.equal(applyLeadershipMultipliers(100, 'Captain'), 200);
  });

  test('applies 1.5x multiplier for vice-captain', () => {
    assert.equal(applyLeadershipMultipliers(100, 'ViceCaptain'), 150);
  });
});
