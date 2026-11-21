import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { PityTracker } from '../src/utils/pitySystem.js';

describe('Gacha Pity System Tests', () => {
  test('increments counter on non-legendary pack openings', () => {
    const tracker = new PityTracker();
    tracker.recordPackOpen('Common');
    tracker.recordPackOpen('Rare');
    const state = tracker.getState();
    assert.equal(state.packsSinceEpic, 2);
    assert.equal(state.packsSinceLegendary, 2);
  });

  test('triggers epic guarantee at threshold of 10 packs', () => {
    const tracker = new PityTracker({ packsSinceEpic: 9, packsSinceLegendary: 9 });
    tracker.recordPackOpen('Rare');
    assert.equal(tracker.isEpicGuaranteed(), true);
  });

  test('resets counters when Legendary card is dropped', () => {
    const tracker = new PityTracker({ packsSinceEpic: 8, packsSinceLegendary: 45 });
    tracker.recordPackOpen('Legendary');
    const state = tracker.getState();
    assert.equal(state.packsSinceEpic, 0);
    assert.equal(state.packsSinceLegendary, 0);
  });
});
