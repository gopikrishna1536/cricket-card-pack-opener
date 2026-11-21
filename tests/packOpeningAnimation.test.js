import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { PackAnimationFsm } from '../src/utils/packOpeningAnimationSequence.js';

describe('Pack Opening Animation FSM Tests', () => {
  test('transitions through pack reveal stages sequentially', () => {
    const fsm = new PackAnimationFsm();
    assert.equal(fsm.state, 'IDLE');
    assert.equal(fsm.startTear(), true);
    assert.equal(fsm.completeTear(), true);
    assert.equal(fsm.showSummary(), true);
    assert.equal(fsm.state, 'SUMMARY');
  });
});
