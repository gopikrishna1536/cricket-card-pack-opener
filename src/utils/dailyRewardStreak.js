/**
 * Daily Login Reward Streak Tracker
 */
export const STREAK_REWARDS = [
  { day: 1, coins: 100 },
  { day: 2, coins: 200 },
  { day: 3, coins: 350 },
  { day: 4, coins: 500 },
  { day: 5, coins: 750 },
  { day: 6, coins: 1000 },
  { day: 7, coins: 2000, pack: 'GoldPack' }
];

export function getDailyReward(streakDay) {
  const day = ((streakDay - 1) % 7) + 1;
  return STREAK_REWARDS[day - 1];
}
