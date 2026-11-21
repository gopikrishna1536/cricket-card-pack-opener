import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { generateBracket } from '../src/utils/tournamentBracket.js';

describe('Tournament Bracket Generator Tests', () => {
  test('generates 4-team single elimination bracket', () => {
    const teams = [{ name: 'India' }, { name: 'Australia' }, { name: 'England' }, { name: 'South Africa' }];
    const bracket = generateBracket(teams);
    assert.equal(bracket.round1Matches.length, 2);
  });

  test('handles uneven team counts with automatic byes', () => {
    const teams = [{ name: 'Team A' }, { name: 'Team B' }, { name: 'Team C' }];
    const bracket = generateBracket(teams);
    assert.equal(bracket.bracketSize, 4);
    assert.ok(bracket.round1Matches.some(m => m.team1.isBye || m.team2.isBye));
  });
});
