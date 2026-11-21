/**
 * Captaincy and Leadership Multipliers
 */
export function applyLeadershipMultipliers(points, role) {
  if (role === 'Captain') return Math.round(points * 2.0);
  if (role === 'ViceCaptain') return Math.round(points * 1.5);
  return points;
}
