import { describe, it, expect } from 'vitest';
import {
  getPlacingsAllYears,
  getPlacingsByYear,
  getPlayersForEachMatch,
  getPreviousMatches,
} from '../controllers/players-controller.js';
import { it } from 'vitest';

// describe('players-controller', () => {
//   it('should return all players', async () => {
//     const data = await getPlacingsAllYears();
//     expect(data).toEqual(expect.any(Array));
//   });
// });

/*
describe('GET /players', () => {
  it('returns all players when called', async () => {
    const res = await request(app).get('/draw/players');

    expect(res.statusCode).toEqual(200);

    // expect(res.body).toMatchObject([
    //   { id: expect.any(Number), name: expect.any(String) },
    // ]);
  });
});

// Arrange

// Act

// Assert */
