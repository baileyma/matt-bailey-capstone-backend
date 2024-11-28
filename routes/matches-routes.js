import initKnex from 'knex';
import configuration from '../knexfile.js';
import express from 'express';

const knex = initKnex(configuration);

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const data = await knex('matches');
    console.log('matches', data);

    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving players: ${err}`);
  }
});

export default router;
