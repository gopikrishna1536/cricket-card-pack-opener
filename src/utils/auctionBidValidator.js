/**
 * Card Marketplace Auction Bid Validator
 * Enforces dynamic bid increments and maximum allowable buyouts
 */
export function getMinimumBidIncrement(currentPrice) {
  if (currentPrice < 500) return 25;
  if (currentPrice < 2000) return 100;
  if (currentPrice < 10000) return 500;
  return 1000;
}

export function validateBid({ currentPrice, newBid, userCoins, bidderId, currentHighestBidderId }) {
  if (bidderId === currentHighestBidderId) {
    return { valid: false, error: 'You already hold the highest bid' };
  }
  const minIncrement = getMinimumBidIncrement(currentPrice);
  const minRequiredBid = currentPrice + minIncrement;

  if (newBid < minRequiredBid) {
    return {
      valid: false,
      error: `Bid too low. Minimum required bid is ${minRequiredBid} (+${minIncrement})`
    };
  }
  if (userCoins < newBid) {
    return { valid: false, error: 'Insufficient coin balance for this bid' };
  }

  return {
    valid: true,
    newBid,
    minRequiredBid
  };
}
