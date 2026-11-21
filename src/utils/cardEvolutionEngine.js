/**
 * Card Evolution and Leveling Engine
 * Upgrades batting, bowling, and fielding stats based on XP progression and star ascension
 */
export const MAX_LEVEL = 50;

export function calculateCardStats(baseStats, level = 1, stars = 1) {
  const safeLevel = Math.max(1, Math.min(level, MAX_LEVEL));
  const levelMultiplier = 1 + (safeLevel - 1) * 0.02; // +2% per level
  const starMultiplier = 1 + (stars - 1) * 0.15; // +15% per star

  return {
    batting: Math.round(baseStats.batting * levelMultiplier * starMultiplier),
    bowling: Math.round(baseStats.bowling * levelMultiplier * starMultiplier),
    fielding: Math.round(baseStats.fielding * levelMultiplier * starMultiplier),
    overall: Math.round(
      ((baseStats.batting * 0.45) + (baseStats.bowling * 0.45) + (baseStats.fielding * 0.10)) *
      levelMultiplier * starMultiplier
    )
  };
}

export function calculateXpForNextLevel(currentLevel) {
  if (currentLevel >= MAX_LEVEL) return null;
  return Math.round(100 * Math.pow(1.12, currentLevel - 1));
}
