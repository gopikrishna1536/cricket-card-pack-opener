import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { calculateTradeValue, validateTrade } from '../src/utils/tradeValidator.js';

describe('Card Trade Validator Tests', () => {
  test('evaluates trade value by rarity points and level multiplier', () => {
    const cards = [
      { rarity: 'Legendary', level: 10 },
      { rarity: 'Rare', level: 1 }
    ];
    const val = calculateTradeValue(cards);
    assert.ok(val > 150);
  });

  test('validates fair trade within allowed percentage disparity', () => {
    const cardsA = [{ rarity: 'Epic', level: 1, isLocked: false }];
    const cardsB = [
      { rarity: 'Rare', level: 1, isLocked: false },
      { rarity: 'Rare', level: 1, isLocked: false },
      { rarity: 'Rare', level: 1, isLocked: false },
      { rarity: 'Rare', level: 1, isLocked: false },
      { rarity: 'Rare', level: 1, isLocked: false }
    ];
    const result = validateTrade(cardsA, cardsB);
    assert.equal(result.valid, true);
  });

  test('rejects trade containing trade-locked cards', () => {
    const cardsA = [{ rarity: 'Legendary', level: 1, isLocked: true }];
    const cardsB = [{ rarity: 'Legendary', level: 1, isLocked: false }];
    const result = validateTrade(cardsA, cardsB);
    assert.equal(result.valid, false);
    assert.ok(result.error.includes('trade-locked'));
  });
});
