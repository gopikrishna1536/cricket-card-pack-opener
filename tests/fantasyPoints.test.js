import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { calculateMatchFantasyPoints } from '../src/utils/fantasyPointsCalculator.js';

describe('Fantasy Points Calculator Tests', () => {
  test('computes complete match performance points', () => {
    const pts = calculateMatchFantasyPoints({
      runs: 50,
      fours: 4,
      sixes: 2,
      wickets: 2,
      catches: 1
    });
    // 50 + 4 + 4 + 50 + 8 = 116
    assert.equal(pts, 116);
  });
});
