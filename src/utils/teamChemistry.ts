import { Player } from '../types';

export interface SquadChemistryReport {
  isValidXI: boolean;
  totalPlayers: number;
  averageRating: number;
  overallPower: number;
  chemistryScore: number; // 0 to 100
  roleCounts: {
    BAT: number;
    BOWL: number;
    AR: number;
    WK: number;
  };
  dominantTeam: {
    name: string;
    count: number;
  };
  warnings: string[];
}

/**
 * Computes squad synergy, role balance, and chemistry rating for a cricket playing XI.
 */
export function calculateSquadChemistry(squad: Player[]): SquadChemistryReport {
  const total = squad.length;
  const warnings: string[] = [];

  const roleCounts = {
    BAT: 0,
    BOWL: 0,
    AR: 0,
    WK: 0
  };

  const teamDistribution: Record<string, number> = {};
  let totalRating = 0;

  squad.forEach(player => {
    totalRating += player.rating;
    if (player.role in roleCounts) {
      roleCounts[player.role]++;
    }
    const team = player.team || 'Unknown';
    teamDistribution[team] = (teamDistribution[team] || 0) + 1;
  });

  const avgRating = total > 0 ? Math.round((totalRating / total) * 10) / 10 : 0;

  // Find dominant team
  let dominantTeamName = 'None';
  let dominantTeamCount = 0;
  for (const [team, count] of Object.entries(teamDistribution)) {
    if (count > dominantTeamCount) {
      dominantTeamCount = count;
      dominantTeamName = team;
    }
  }

  // Role validation checks
  if (total !== 11) {
    warnings.push(`Squad has ${total} players instead of a standard 11-player XI`);
  }
  if (roleCounts.WK < 1) {
    warnings.push('No designated Wicket-Keeper (WK) selected');
  }
  if (roleCounts.BOWL < 3) {
    warnings.push(`Only ${roleCounts.BOWL} frontline Bowlers (BOWL); recommended minimum is 3`);
  }
  if (roleCounts.BAT < 3) {
    warnings.push(`Only ${roleCounts.BAT} pure Batsmen (BAT); batting order may be fragile`);
  }

  // Base chemistry calculation
  let chemistry = 50;

  // Franchise / Nationality cohesion bonus: +5 per player above 3 from the same team (up to +25)
  if (dominantTeamCount >= 3) {
    chemistry += Math.min(25, (dominantTeamCount - 2) * 5);
  }

  // Role balance bonus / penalties
  if (roleCounts.WK >= 1 && roleCounts.BOWL >= 3 && roleCounts.BAT >= 3 && roleCounts.AR >= 1) {
    chemistry += 25; // Perfectly balanced XI
  } else {
    chemistry -= warnings.length * 10;
  }

  // Clamp chemistry between 0 and 100
  const finalChemistry = Math.max(0, Math.min(100, chemistry));

  // Overall power combines raw ratings with chemistry synergy
  const overallPower = Math.round((avgRating * 0.7) + (finalChemistry * 0.3));

  return {
    isValidXI: total === 11 && roleCounts.WK >= 1 && roleCounts.BOWL >= 3 && warnings.length === 0,
    totalPlayers: total,
    averageRating: avgRating,
    overallPower,
    chemistryScore: finalChemistry,
    roleCounts,
    dominantTeam: {
      name: dominantTeamName,
      count: dominantTeamCount
    },
    warnings
  };
}
