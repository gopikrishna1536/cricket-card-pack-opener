/**
 * Deterministic Seeded T20 Match Simulator
 * Simulates ball-by-ball cricket interactions between bowling attack and batting lineup
 */
export function simulateBall({ batterPower, bowlerSkill, seed = 0.5 }) {
  const balance = batterPower - bowlerSkill; // between -50 and 50
  const adjustedSeed = seed + (balance / 200);

  if (adjustedSeed < 0.08) return { outcome: 'WICKET', runs: 0, isWicket: true };
  if (adjustedSeed < 0.40) return { outcome: 'DOT', runs: 0, isWicket: false };
  if (adjustedSeed < 0.70) return { outcome: 'SINGLE', runs: 1, isWicket: false };
  if (adjustedSeed < 0.85) return { outcome: 'TWO', runs: 2, isWicket: false };
  if (adjustedSeed < 0.95) return { outcome: 'FOUR', runs: 4, isWicket: false };
  return { outcome: 'SIX', runs: 6, isWicket: false };
}

export function simulateOver(batterPower, bowlerSkill, seeds = [0.1, 0.5, 0.6, 0.8, 0.9, 0.98]) {
  let totalRuns = 0;
  let wickets = 0;
  const balls = seeds.map(seed => {
    const ball = simulateBall({ batterPower, bowlerSkill, seed });
    totalRuns += ball.runs;
    if (ball.isWicket) wickets += 1;
    return ball;
  });

  return { totalRuns, wickets, balls };
}
