/**
 * Duplicate Card Disenchant and Crafting Dust Converter
 */
export const DUST_VALUES = {
  Common: 5,
  Rare: 20,
  Epic: 100,
  Legendary: 500
};

export function disenchantCard(card) {
  return DUST_VALUES[card.rarity] || 5;
}

export function bulkDisenchant(duplicates) {
  if (!Array.isArray(duplicates)) return 0;
  return duplicates.reduce((sum, c) => sum + disenchantCard(c), 0);
}
