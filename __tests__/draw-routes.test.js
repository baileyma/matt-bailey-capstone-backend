import { app } from '../index.js';
import request from 'supertest';
import { describe, it, expect } from 'vitest';

describe('GET /players', () => {
  it('returns all players when called', async () => {
    const res = await request(app).get('/draw/players');

    expect(res.statusCode).toEqual(200);

    // expect(res.body).toMatchObject([
    //   { id: expect.any(Number), name: expect.any(String) },
    // ]);
  });
});
