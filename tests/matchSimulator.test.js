import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { simulateBall, simulateOver } from '../src/utils/matchSimulator.js';

describe('Match Simulator Tests', () => {
  test('simulates individual ball outcomes based on batter vs bowler ratings', () => {
    const wicketBall = simulateBall({ batterPower: 70, bowlerSkill: 90, seed: 0.01 });
    assert.equal(wicketBall.outcome, 'WICKET');
    assert.equal(wicketBall.isWicket, true);

    const sixBall = simulateBall({ batterPower: 95, bowlerSkill: 70, seed: 0.99 });
    assert.equal(sixBall.outcome, 'SIX');
    assert.equal(sixBall.runs, 6);
  });

  test('simulates 6-ball over and aggregates runs and wickets', () => {
    const over = simulateOver(85, 80);
    assert.equal(over.balls.length, 6);
    assert.ok(over.totalRuns >= 0);
  });
});
