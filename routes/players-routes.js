import initKnex from 'knex';
import configuration from '../knexfile.js';
import express from 'express';

const knex = initKnex(configuration);

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const data = await knex('players');
    console.log('players', data);

    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving players: ${err}`);
  }
});

router.get('/year/:year', async (req, res) => {
  const year = Number(req.params.year);

  try {
    const players = await knex('matches as ma')
      .select(
        'ma.id',
        'ma.year',
        'ma.draw',
        'ma.round',
        'ma.round_number',
        'pl1.name as player1_name',
        'pl2.name as player2_name',
        'ma.score'
      )
      .innerJoin('players as pl1', 'ma.player1_id', 'pl1.id')
      .innerJoin('players as pl2', 'ma.player2_id', 'pl2.id')
      .where('ma.year', year);
    console.log('players', players);

    res.status(200).json(players);
  } catch (error) {
    res
      .status(400)
      .send(`Error retrieving players for opening round: ${error}`);
  }
});

router.get('/placings', async (_req, res) => {
  try {
    const data = await knex
      .select('winner_id', 'loser_id', 'draw', 'round')
      .from('matches')
      .whereIn('round', ['final', 'playoff']);

    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving placings data: ${err}`);
  }
});

// getting previous scores

router.get('/head-to-head', async (req, res) => {
  const winnerid = req.query.winnerid;
  const loserid = req.query.loserid;

  try {
    const data = await knex('matches')
      .where('winner_id', winnerid)
      .where('loser_id', loserid);
    console.log(data, 'this did worked');

    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving head-to-head matches: ${err}`);
  }
});

// http://localhost:8080/players/placings2/2024
// router.get('/placings2/:year', async (req, res) => {
//   const year = req.params.year;
//   console.log('got it');

//   try {
//     const data = await knex('matches as ma')
//       .select('ma.draw', 'ma.round', 'ma.winner_id', 'ma.loser_id')
//       .innerJoin('players as pl1', 'ma.winner_id', 'pl1.id')
//       .innerJoin('players as pl2', 'ma.loser_id', 'pl2.id')
//       .where('year', year);

//     console.log(data);

//     res.status(200).json(data);
//   } catch (err) {
//     res.status(400).send(`Error retrieving placings: ${err}`);
//   }
// });

export default router;
