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
      .leftJoin('players as pl1', 'ma.player1_id', 'pl1.id')
      .leftJoin('players as pl2', 'ma.player2_id', 'pl2.id')
      .where('ma.year', year);
    console.log('players', players);

    res.status(200).json(players);
  } catch (error) {
    res
      .status(400)
      .send(`Error retrieving players for opening round: ${error}`);
  }
});

router.get('/placings/:year', async (req, res) => {
  const { year } = req.params;
  console.log('Tried');

  try {
    const data = await knex
      .select('pl1.name as winner', 'pl2.name as loser', 'draw', 'round')
      .from('matches as ma')
      .where('year', year)
      .whereIn('round', ['final', 'Play off'])
      .innerJoin('players as pl1', 'ma.winner_id', 'pl1.id')
      .innerJoin('players as pl2', 'ma.loser_id', 'pl2.id');
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving placings data: ${err}`);
  }
});

router.get('/placings-allyears', async (_req, res) => {
  try {
    const data = await knex
      .select('pl1.name as winner', 'pl2.name as loser', 'draw', 'year')
      .from('matches as ma')
      .where('round', 'final')
      .innerJoin('players as pl1', 'ma.winner_id', 'pl1.id')
      .innerJoin('players as pl2', 'ma.loser_id', 'pl2.id');
    console.log('hit it');
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

    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving head-to-head matches: ${err}`);
  }
});

export default router;
