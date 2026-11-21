/**
 * Gacha Pity System
 * Soft and Hard pity tracker for card pack drops
 * Guarantees Epic card within 10 packs, Legendary within 50 packs
 */
export const PITY_CONFIG = {
  epicThreshold: 10,
  legendaryThreshold: 50,
  softPityStart: 40
};

export class PityTracker {
  constructor(state = { packsSinceEpic: 0, packsSinceLegendary: 0 }) {
    this.packsSinceEpic = state.packsSinceEpic || 0;
    this.packsSinceLegendary = state.packsSinceLegendary || 0;
  }

  recordPackOpen(highestRarityInPack) {
    this.packsSinceEpic += 1;
    this.packsSinceLegendary += 1;

    if (highestRarityInPack === 'Legendary') {
      this.packsSinceLegendary = 0;
      this.packsSinceEpic = 0;
    } else if (highestRarityInPack === 'Epic') {
      this.packsSinceEpic = 0;
    }

    return this.getState();
  }

  isEpicGuaranteed() {
    return this.packsSinceEpic >= PITY_CONFIG.epicThreshold;
  }

  isLegendaryGuaranteed() {
    return this.packsSinceLegendary >= PITY_CONFIG.legendaryThreshold;
  }

  getLegendaryBonusProbability() {
    if (this.packsSinceLegendary < PITY_CONFIG.softPityStart) return 0.0;
    const excess = this.packsSinceLegendary - PITY_CONFIG.softPityStart;
    return excess * 0.10; // +10% per pack in soft pity range
  }

  getState() {
    return {
      packsSinceEpic: this.packsSinceEpic,
      packsSinceLegendary: this.packsSinceLegendary,
      isEpicGuaranteed: this.isEpicGuaranteed(),
      isLegendaryGuaranteed: this.isLegendaryGuaranteed()
    };
  }
}
