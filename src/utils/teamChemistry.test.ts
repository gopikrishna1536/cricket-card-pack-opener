import { describe, it, expect } from 'vitest';
import { calculateSquadChemistry } from './teamChemistry';
import { Player } from '../types';

describe('Squad Chemistry & Cricket Playing XI Synergy Tests', () => {
  const balancedSquad: Player[] = [
    { id: '1', name: 'Rohit Sharma', role: 'BAT', team: 'India', rating: 92, tier: 'Legend', photo: '', stats: { matches: 250, average: 49, strikeRate: 90 } },
    { id: '2', name: 'Virat Kohli', role: 'BAT', team: 'India', rating: 95, tier: 'Legend', photo: '', stats: { matches: 290, average: 58, strikeRate: 93 } },
    { id: '3', name: 'Joe Root', role: 'BAT', team: 'England', rating: 91, tier: 'Legend', photo: '', stats: { matches: 160, average: 50, strikeRate: 86 } },
    { id: '4', name: 'Steve Smith', role: 'BAT', team: 'Australia', rating: 93, tier: 'Legend', photo: '', stats: { matches: 155, average: 45, strikeRate: 88 } },
    { id: '5', name: 'KL Rahul', role: 'WK', team: 'India', rating: 88, tier: 'Epic', photo: '', stats: { matches: 75, average: 49, strikeRate: 87 } },
    { id: '6', name: 'Hardik Pandya', role: 'AR', team: 'India', rating: 89, tier: 'Epic', photo: '', stats: { matches: 86, average: 34, strikeRate: 110 } },
    { id: '7', name: 'Ben Stokes', role: 'AR', team: 'England', rating: 90, tier: 'Epic', photo: '', stats: { matches: 114, average: 38, strikeRate: 95 } },
    { id: '8', name: 'Jasprit Bumrah', role: 'BOWL', team: 'India', rating: 96, tier: 'Legend', photo: '', stats: { matches: 89, average: 23, strikeRate: 31 } },
    { id: '9', name: 'Pat Cummins', role: 'BOWL', team: 'Australia', rating: 92, tier: 'Legend', photo: '', stats: { matches: 88, average: 27, strikeRate: 33 } },
    { id: '10', name: 'Shaheen Afridi', role: 'BOWL', team: 'Pakistan', rating: 89, tier: 'Epic', photo: '', stats: { matches: 53, average: 25, strikeRate: 26 } },
    { id: '11', name: 'Rashid Khan', role: 'BOWL', team: 'Afghanistan', rating: 93, tier: 'Legend', photo: '', stats: { matches: 103, average: 18, strikeRate: 22 } }
  ];

  it('should validate a balanced 11-player squad with high chemistry and no warnings', () => {
    const report = calculateSquadChemistry(balancedSquad);
    expect(report.totalPlayers).toBe(11);
    expect(report.roleCounts.BAT).toBe(4);
    expect(report.roleCounts.WK).toBe(1);
    expect(report.roleCounts.AR).toBe(2);
    expect(report.roleCounts.BOWL).toBe(4);
    expect(report.dominantTeam.name).toBe('India');
    expect(report.dominantTeam.count).toBe(5);
    expect(report.warnings.length).toBe(0);
    expect(report.isValidXI).toBe(true);
    expect(report.chemistryScore).toBeGreaterThanOrEqual(80);
  });

  it('should flag warning when squad has fewer than 11 players or missing wicketkeeper', () => {
    const incompleteSquad = balancedSquad.filter(p => p.role !== 'WK').slice(0, 8);
    const report = calculateSquadChemistry(incompleteSquad);

    expect(report.isValidXI).toBe(false);
    expect(report.warnings.some(w => w.includes('Wicket-Keeper'))).toBe(true);
    expect(report.warnings.some(w => w.includes('8 players instead of a standard 11'))).toBe(true);
  });
});
