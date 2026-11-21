/**
 * Card Collection Multi-Attribute Filter
 */
export function filterCards(cards, { rarity = 'All', nationality = null, role = null }) {
  if (!Array.isArray(cards)) return [];
  return cards.filter(c => {
    if (rarity !== 'All' && c.rarity !== rarity) return false;
    if (nationality && c.nationality !== nationality) return false;
    if (role && c.role !== role) return false;
    return true;
  });
}
