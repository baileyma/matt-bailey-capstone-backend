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

router.get('/:year', async (req, res) => {
  const year = Number(req.params.year);
  try {
    const players = await knex('draw').where('year', year);
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
    const data = await knex
      .select('*')
      .from('matches')
      .where('matches.winner_id', winnerid)
      .where('matches.loser_id', loserid);
    console.log(data);

    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving head-to-head matches: ${err}`);
  }
});

// Counting wins

router.get('/head-to-head-count', async (req, res) => {
  const winnerid = req.query.winnerid;
  const loserid = req.query.loserid;

  try {
    const data = await knex
      .count('*')
      .from('matches')
      .where('matches.winner_id', winnerid)
      .where('matches.loser_id', loserid);
    console.log(data);

    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving head-to-head matches: ${err}`);
  }
});

export default router;
