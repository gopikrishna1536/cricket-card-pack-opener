/**
 * Squad Chemistry and Synergy Bonus Calculator
 */
export function calculateSquadChemistry(squad) {
  if (!Array.isArray(squad) || squad.length === 0) return 0;
  let matches = 0;
  for (let i = 0; i < squad.length; i++) {
    for (let j = i + 1; j < squad.length; j++) {
      if (squad[i].nationality === squad[j].nationality) matches += 1;
    }
  }
  return Math.min(100, Math.round((matches / (squad.length * 2)) * 100));
}
