/**
 * Player Card Stamina Drain and Bench Recovery
 */
export function calculateStaminaDrain(matchIntensity = 'Medium') {
  if (matchIntensity === 'High') return 25;
  if (matchIntensity === 'Low') return 10;
  return 18;
}

export function recoverStamina(currentStamina, benchMatchesCount = 1) {
  const recoveryPerBench = 20;
  return Math.min(100, currentStamina + (benchMatchesCount * recoveryPerBench));
}
