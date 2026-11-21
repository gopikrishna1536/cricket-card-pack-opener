/**
 * Tournament Elimination Bracket Generator
 */
export function generateBracket(teams) {
  if (!Array.isArray(teams) || teams.length < 2) {
    throw new Error('At least 2 teams required to generate tournament');
  }

  // Next power of 2
  const count = Math.pow(2, Math.ceil(Math.log2(teams.length)));
  const matches = [];

  for (let i = 0; i < count / 2; i++) {
    const team1 = teams[i] || { name: 'BYE', isBye: true };
    const team2 = teams[count - 1 - i] || { name: 'BYE', isBye: true };
    matches.push({
      matchId: `R1-M${i + 1}`,
      team1,
      team2,
      winner: team1.isBye ? team2 : (team2.isBye ? team1 : null)
    });
  }

  return {
    totalTeams: teams.length,
    bracketSize: count,
    round1Matches: matches
  };
}
