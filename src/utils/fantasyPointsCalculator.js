/**
 * Fantasy Points Calculation Engine
 */
export function calculateMatchFantasyPoints({ runs = 0, fours = 0, sixes = 0, wickets = 0, maidenOvers = 0, catches = 0 }) {
  let pts = 0;
  pts += runs * 1;
  pts += fours * 1;
  pts += sixes * 2;
  pts += wickets * 25;
  pts += maidenOvers * 12;
  pts += catches * 8;
  return pts;
}
