import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { calculateSquadChemistry } from '../src/utils/squadChemistryCalculator.js';

describe('Squad Chemistry Tests', () => {
  test('calculates synergy based on shared player nationality', () => {
    const squad = [
      { nationality: 'India' },
      { nationality: 'India' },
      { nationality: 'India' }
    ];
    const chem = calculateSquadChemistry(squad);
    assert.ok(chem > 0);
  });
});
