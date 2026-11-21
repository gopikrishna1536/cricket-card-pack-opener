/**
 * Stadium Pitch and Environmental Multiplier Engine
 */
export const PITCH_TYPES = {
  Dusty: { spinMultiplier: 1.25, paceMultiplier: 0.85, battingMultiplier: 0.90 },
  GreenTop: { spinMultiplier: 0.80, paceMultiplier: 1.30, battingMultiplier: 0.85 },
  Flat: { spinMultiplier: 0.90, paceMultiplier: 0.90, battingMultiplier: 1.35 },
  Balanced: { spinMultiplier: 1.0, paceMultiplier: 1.0, battingMultiplier: 1.0 }
};

export function applyPitchImpact(playerStats, pitchType = 'Balanced') {
  const profile = PITCH_TYPES[pitchType] || PITCH_TYPES.Balanced;
  const isSpinner = playerStats.bowlingStyle === 'Spin';
  const isPacer = playerStats.bowlingStyle === 'Pace';

  let bowlingMod = 1.0;
  if (isSpinner) bowlingMod = profile.spinMultiplier;
  else if (isPacer) bowlingMod = profile.paceMultiplier;

  return {
    batting: Math.round(playerStats.batting * profile.battingMultiplier),
    bowling: Math.round(playerStats.bowling * bowlingMod),
    fielding: playerStats.fielding
  };
}
