/**
 * Elo Rating Calculator for PvP Matchmaking and Leaderboards
 */
export function calculateExpectedScore(ratingA, ratingB) {
  return 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));
}

export function updateEloRating(currentRating, opponentRating, score, kFactor = 32) {
  // score: 1.0 for win, 0.5 for tie, 0.0 for loss
  const expected = calculateExpectedScore(currentRating, opponentRating);
  const newRating = currentRating + kFactor * (score - expected);
  return Math.round(newRating);
}

export function rankPlayers(players) {
  if (!Array.isArray(players)) return [];
  return [...players]
    .sort((a, b) => (b.elo || 1000) - (a.elo || 1000))
    .map((p, idx) => ({ ...p, rank: idx + 1 }));
}
