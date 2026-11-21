/**
 * Collector Milestones and In-Game Achievement Tracker
 */
export const ACHIEVEMENTS = [
  { id: 'first_legendary', name: 'Legend in the Making', check: (u) => u.legendaryCount >= 1 },
  { id: 'hundred_packs', name: 'Pack Maniac', check: (u) => u.packsOpened >= 100 },
  { id: 'squad_overall_90', name: 'World Class XI', check: (u) => u.bestSquadOverall >= 90 }
];

export function checkAchievements(userStats) {
  return ACHIEVEMENTS.map(ach => ({
    id: ach.id,
    name: ach.name,
    unlocked: ach.check(userStats)
  }));
}
