# Cricket Card Pack Opener - Game Design & Economy Specification

## 1. Executive Summary
This document specifies the core game loop, gacha mechanics, rarity probability distributions, and marketplace economy for the Cricket Card Pack Opener.

## 2. Core Architecture
- `src/utils/tradeValidator.js`: Fair trade equity verification.
- `src/utils/pitySystem.js`: Soft and hard pity drop counter.
- `src/utils/auctionBidValidator.js`: Dynamic marketplace auction bidding.
- `src/utils/cardEvolutionEngine.js`: Player attribute leveling engine.
- `src/utils/matchSimulator.js`: T20 deterministic ball-by-ball match simulation.
- `src/utils/leaderboardRanker.js`: Elo matchmaking rating calculations.
- `src/utils/deckCostLimiter.js`: Salary-cap squad balance checks.
- `src/utils/tournamentBracket.js`: Single elimination tournament bracket generator.
- `src/utils/pitchImpact.js`: Environmental pitch multipliers.
- `src/utils/achievementTracker.js`: Collector milestone badges.
- `src/utils/staminaRotation.js`: Fatigue drain and bench recovery.
- `src/utils/rarityProbabilities.js`: Regulatory drop rate validator.
- `src/utils/captaincyBonus.js`: Leadership fantasy point multipliers.
- `src/utils/fantasyPointsCalculator.js`: Cricket scoring calculation engine.
- `src/utils/duplicateDisenchant.js`: Card recycling crafting dust model.
- `src/utils/cardFilterEngine.js`: Multi-attribute inventory filter.
- `src/utils/squadChemistryCalculator.js`: Teammate nationality synergy model.
- `src/utils/dailyRewardStreak.js`: 7-day login streak progression.
- `src/utils/packOpeningAnimationSequence.js`: State machine for pack opening.

## 3. Verification
All mechanics verified via automated `node:test` suites:
```bash
node --test tests/*.test.js
```
