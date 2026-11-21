/**
 * Squad Building and Salary Cap Budget Limiter
 * Validates 11-player lineup conforms to salary cap and role requirements
 */
export const SQUAD_RULES = {
  maxBudget: 100,
  squadSize: 11,
  minBowlers: 4,
  minBatters: 3,
  minWicketKeepers: 1
};

export function validateSquad(squad, rules = SQUAD_RULES) {
  if (!Array.isArray(squad) || squad.length !== rules.squadSize) {
    return { valid: false, error: `Squad must contain exactly ${rules.squadSize} players` };
  }

  let totalCost = 0;
  const roleCounts = { Batter: 0, Bowler: 0, AllRounder: 0, WicketKeeper: 0 };

  for (const player of squad) {
    totalCost += (player.cost || 0);
    const role = player.role || 'Batter';
    roleCounts[role] = (roleCounts[role] || 0) + 1;
  }

  if (totalCost > rules.maxBudget) {
    return {
      valid: false,
      error: `Squad cost ${totalCost} exceeds maximum salary cap of ${rules.maxBudget}`
    };
  }

  if (roleCounts.WicketKeeper < rules.minWicketKeepers) {
    return { valid: false, error: 'Squad must include at least 1 Wicketkeeper' };
  }

  const effectiveBowlers = roleCounts.Bowler + roleCounts.AllRounder;
  if (effectiveBowlers < rules.minBowlers) {
    return { valid: false, error: 'Squad must include at least 4 bowling options' };
  }

  return {
    valid: true,
    totalCost,
    roleCounts
  };
}
