import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { disenchantCard, bulkDisenchant } from '../src/utils/duplicateDisenchant.js';

describe('Duplicate Disenchant Tests', () => {
  test('converts spare cards into crafting dust', () => {
    assert.equal(disenchantCard({ rarity: 'Legendary' }), 500);
    assert.equal(disenchantCard({ rarity: 'Common' }), 5);
  });

  test('calculates bulk disenchant total', () => {
    const cards = [{ rarity: 'Epic' }, { rarity: 'Rare' }, { rarity: 'Common' }];
    assert.equal(bulkDisenchant(cards), 125);
  });
});
