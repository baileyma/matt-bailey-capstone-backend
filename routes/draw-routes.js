import initKnex from 'knex';
import configuration from '../knexfile.js';
import express from 'express';

const knex = initKnex(configuration);
const router = express.Router();

router.post('/:year', async (req, res) => {
  try {
    console.log('worked here');
    console.log(req.body);

    const players = await knex('players').whereIn('name', [
      req.body.match1player1,
      req.body.match1player2,
      req.body.match2player1,
      req.body.match2player2,
      req.body.match3player1,
      req.body.match3player2,
      req.body.match4player1,
      req.body.match4player2,
    ]);

    const playerIdMap = players.reduce((map, player) => {
      map[player.name] = player.id;
      return map;
    }, {});

    const drawID = await knex('draw').insert({
      year: req.body.year,
      match1player1: playerIdMap[req.body.match1player1],
      match1player2: playerIdMap[req.body.match1player2],
      match2player1: playerIdMap[req.body.match2player1],
      match2player2: playerIdMap[req.body.match2player2],
      match3player1: playerIdMap[req.body.match3player1],
      match3player2: playerIdMap[req.body.match3player2],
      match4player1: playerIdMap[req.body.match4player1],
      match4player2: playerIdMap[req.body.match4player2],
    });

    console.log(req);

    res.status(201).json({
      message: `The draw for the ${req.body.year} renewal has been populated with id: ${drawID}`,
    });
  } catch (error) {
    res.status(400).json({ msg: `Error populating draw: ${error}` });
  }
});

export default router;
