import playersData from '../seed-data/players.js';
import matchesData from '../seed-data/matches.js';

export async function seed(knex) {
  await knex('matches').del();
  await knex('players').del();
  await knex('players').insert(playersData);
  await knex('matches').insert(matchesData);
}
