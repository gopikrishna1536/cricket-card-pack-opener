/**
 * Card Trading Equity Validator
 * Computes fair trade value based on rarity tier scores, star levels, and trade lock status
 */
export const RARITY_VALUES = {
  Common: 1,
  Rare: 5,
  Epic: 25,
  Legendary: 100
};

export function calculateTradeValue(cards) {
  if (!Array.isArray(cards)) return 0;
  return cards.reduce((sum, c) => {
    const base = RARITY_VALUES[c.rarity] || 1;
    const levelBonus = 1 + (c.level || 1) * 0.05;
    return sum + (base * levelBonus);
  }, 0);
}

export function validateTrade(sideA, sideB, maxDisparityPercent = 25) {
  if (!sideA || !sideB) return { valid: false, error: 'Both sides required' };
  
  // Check trade locks
  const lockedA = sideA.some(c => c.isLocked);
  const lockedB = sideB.some(c => c.isLocked);
  if (lockedA || lockedB) {
    return { valid: false, error: 'Trade contains trade-locked card' };
  }

  const valA = calculateTradeValue(sideA);
  const valB = calculateTradeValue(sideB);

  if (valA === 0 || valB === 0) {
    return { valid: false, error: 'Both sides must offer cards' };
  }

  const higher = Math.max(valA, valB);
  const lower = Math.min(valA, valB);
  const disparity = ((higher - lower) / higher) * 100;

  return {
    valid: disparity <= maxDisparityPercent,
    disparityPercent: Number(disparity.toFixed(1)),
    valA: Number(valA.toFixed(1)),
    valB: Number(valB.toFixed(1)),
    error: disparity > maxDisparityPercent ? `Trade disparity ${disparity.toFixed(1)}% exceeds allowed threshold` : null
  };
}
