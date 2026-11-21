import { describe, it, expect } from 'vitest';
import { getPackOdds, openPack } from './packLogic';
import { generatePack } from './packGenerator';

describe('Pack Logic Odds Calculation', () => {
  it('should return valid odds for bronze pack summing close to 1.0', () => {
    const odds = getPackOdds('bronze');
    expect(odds.common).toBe(0.6);
    expect(odds.rare).toBe(0.3);
    expect(odds.epic).toBe(0.09);
    expect(odds.legend).toBe(0.01);
    const sum = odds.common + odds.rare + odds.epic + odds.legend;
    expect(sum).toBeCloseTo(1.0, 5);
  });

  it('should return higher legend probability for gold pack than bronze', () => {
    const bronze = getPackOdds('bronze');
    const gold = getPackOdds('gold');
    expect(gold.legend).toBeGreaterThan(bronze.legend);
    expect(gold.epic).toBeGreaterThan(bronze.epic);
  });

  it('should handle case insensitivity in getPackOdds', () => {
    const odds = getPackOdds('SILVER');
    expect(odds.rare).toBe(0.4);
  });
});

describe('Pack Opening Mechanics', () => {
  it('openPack should always generate exactly 5 valid players', () => {
    const pack = openPack('gold');
    expect(pack).toHaveLength(5);
    pack.forEach(player => {
      expect(player).toBeDefined();
      expect(player.id).toBeDefined();
      expect(player.name).toBeTruthy();
      expect(['Common', 'Rare', 'Epic', 'Legend']).toContain(player.tier);
      expect(player.stats.matches).toBeGreaterThan(0);
    });
  });

  it('generatePack should return valid pack metadata with 5 players', () => {
    const pack = generatePack('Silver');
    expect(pack.type).toBe('Silver');
    expect(pack.price).toBe(250);
    expect(pack.players).toHaveLength(5);
    expect(pack.id).toBeTruthy();
  });

  it('gold pack should cost more than bronze pack', () => {
    const bronze = generatePack('Bronze');
    const gold = generatePack('Gold');
    expect(gold.price).toBe(500);
    expect(bronze.price).toBe(100);
    expect(gold.price).toBeGreaterThan(bronze.price);
  });
});
