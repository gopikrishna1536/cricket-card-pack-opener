import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { applyPitchImpact } from '../src/utils/pitchImpact.js';

describe('Pitch Environmental Impact Tests', () => {
  test('boosts spinners on dusty turning tracks', () => {
    const player = { batting: 50, bowling: 80, fielding: 70, bowlingStyle: 'Spin' };
    const boosted = applyPitchImpact(player, 'Dusty');
    assert.equal(boosted.bowling, 100);
  });

  test('boosts pacers on greentop seam pitches', () => {
    const player = { batting: 40, bowling: 80, fielding: 70, bowlingStyle: 'Pace' };
    const boosted = applyPitchImpact(player, 'GreenTop');
    assert.equal(boosted.bowling, 104);
  });
});
