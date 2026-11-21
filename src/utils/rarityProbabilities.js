/**
 * Lootbox Probability Verification
 * Validates pull distributions against regulatory published drop rates
 */
export const PUBLISHED_ODDS = {
  Common: 0.70,
  Rare: 0.22,
  Epic: 0.07,
  Legendary: 0.01
};

export function resolveRarityFromRandom(rand) {
  if (rand < PUBLISHED_ODDS.Legendary) return 'Legendary';
  if (rand < PUBLISHED_ODDS.Legendary + PUBLISHED_ODDS.Epic) return 'Epic';
  if (rand < PUBLISHED_ODDS.Legendary + PUBLISHED_ODDS.Epic + PUBLISHED_ODDS.Rare) return 'Rare';
  return 'Common';
}
