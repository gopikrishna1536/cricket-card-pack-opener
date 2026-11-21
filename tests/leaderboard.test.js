import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { calculateExpectedScore, updateEloRating, rankPlayers } from '../src/utils/leaderboardRanker.js';

describe('Leaderboard & Elo Rating Tests', () => {
  test('equal ratings result in 50% expected win probability', () => {
    const expected = calculateExpectedScore(1500, 1500);
    assert.equal(Number(expected.toFixed(2)), 0.50);
  });

  test('winner gains Elo and loser loses proportional rating points', () => {
    const winnerNew = updateEloRating(1500, 1500, 1.0);
    const loserNew = updateEloRating(1500, 1500, 0.0);
    assert.equal(winnerNew, 1516);
    assert.equal(loserNew, 1484);
  });

  test('ranks players in descending order of Elo rating', () => {
    const players = [{ name: 'A', elo: 1200 }, { name: 'B', elo: 1600 }];
    const ranked = rankPlayers(players);
    assert.equal(ranked[0].name, 'B');
    assert.equal(ranked[0].rank, 1);
  });
});
