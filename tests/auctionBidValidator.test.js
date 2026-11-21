import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { getMinimumBidIncrement, validateBid } from '../src/utils/auctionBidValidator.js';

describe('Marketplace Auction Bid Validator Tests', () => {
  test('computes tiered minimum bid increments', () => {
    assert.equal(getMinimumBidIncrement(300), 25);
    assert.equal(getMinimumBidIncrement(1500), 100);
    assert.equal(getMinimumBidIncrement(8000), 500);
    assert.equal(getMinimumBidIncrement(25000), 1000);
  });

  test('approves bid meeting min increment and user balance', () => {
    const res = validateBid({
      currentPrice: 1000,
      newBid: 1100,
      userCoins: 5000,
      bidderId: 'user1',
      currentHighestBidderId: 'user2'
    });
    assert.equal(res.valid, true);
  });

  test('rejects bid if user cannot afford it or does not meet minimum increment', () => {
    const resLow = validateBid({
      currentPrice: 1000,
      newBid: 1050,
      userCoins: 5000,
      bidderId: 'user1',
      currentHighestBidderId: 'user2'
    });
    assert.equal(resLow.valid, false);

    const resBroke = validateBid({
      currentPrice: 1000,
      newBid: 1200,
      userCoins: 500,
      bidderId: 'user1',
      currentHighestBidderId: 'user2'
    });
    assert.equal(resBroke.valid, false);
  });
});
