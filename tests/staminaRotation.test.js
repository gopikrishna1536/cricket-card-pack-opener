import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { calculateStaminaDrain, recoverStamina } from '../src/utils/staminaRotation.js';

describe('Stamina and Squad Rotation Tests', () => {
  test('drains stamina according to match intensity', () => {
    assert.equal(calculateStaminaDrain('High'), 25);
    assert.equal(calculateStaminaDrain('Low'), 10);
  });

  test('recovers stamina when benched up to max 100', () => {
    const recovered = recoverStamina(70, 2);
    assert.equal(recovered, 100);
  });
});
