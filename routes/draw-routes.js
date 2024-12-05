import initKnex from 'knex';
import configuration from '../knexfile.js';
import express from 'express';

const knex = initKnex(configuration);
const router = express.Router();

router.post('/new/:year', async (req, res) => {
  const year = Number(req.params.year);
  console.log('also working here');
  console.log(year);

  const newYear = [
    {
      year: year,
      draw: 'Opening',
      round: 'First Round',
      round_number: 1,
    },
    {
      year: year,
      draw: 'Opening',
      round: 'First Round',
      round_number: 2,
    },
    {
      year: year,
      draw: 'Opening',
      round: 'First Round',
      round_number: 3,
    },
    {
      year: year,
      draw: 'Opening',
      round: 'First Round',
      round_number: 4,
    },
    {
      year: year,
      draw: 'Plate',
      round: 'Semi Final',
      round_number: 1,
    },
    {
      year: year,
      draw: 'Plate',
      round: 'Semi Final',
      round_number: 2,
    },
    {
      year: year,
      draw: 'Plate',
      round: 'Play off',
      round_number: 1,
    },
    {
      year: year,
      draw: 'Plate',
      round: 'Final',
      round_number: 2,
    },
    {
      year: year,
      draw: 'Main',
      round: 'Semi Final',
      round_number: 3,
    },
    {
      year: year,
      draw: 'Main',
      round: 'Semi Final',
      round_number: 1,
    },
    {
      year: year,
      draw: 'Main',
      round: 'Play off',
      round_number: 1,
    },
    {
      year: year,
      draw: 'Main',
      round: 'Final',
      round_number: 1,
    },
  ];

  try {
    const ID = await knex('matches').insert(newYear);

    res.status(201).json({
      message: `The rounds for the ${year} renewal has been populated with id: ${ID}`,
    });
  } catch (error) {
    res
      .status(400)
      .json({ msg: `Error populating rounds for ${year}: ${error}` });
  }
});

// do i use this???

router.post('/:year', async (req, res) => {
  const year = Number(req.params.year);
  console.log('worked here');
  console.log(req.body);
  try {
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

    const drawID1 = await knex('matches')
      .update({
        player1_id: playerIdMap[req.body.match1player1],
        player2_id: playerIdMap[req.body.match1player2],
      })
      .where('year', year)
      .where('draw', 'Opening')
      .where('round_number', 1);

    const drawID2 = await knex('matches')
      .update({
        player1_id: playerIdMap[req.body.match2player1],
        player2_id: playerIdMap[req.body.match2player2],
      })
      .where('year', year)
      .where('draw', 'Opening')
      .where('round_number', 2);

    const drawID3 = await knex('matches')
      .update({
        player1_id: playerIdMap[req.body.match3player1],
        player2_id: playerIdMap[req.body.match3player2],
      })
      .where('year', year)
      .where('draw', 'Opening')
      .where('round_number', 3);

    const drawID4 = await knex('matches')
      .update({
        player1_id: playerIdMap[req.body.match4player1],
        player2_id: playerIdMap[req.body.match4player2],
      })
      .where('year', year)
      .where('draw', 'Opening')
      .where('round_number', 4);

    res.status(201).json({
      message: `The draw for the ${year} renewal has been populated with id: ${drawID1} ${drawID2} ${drawID3} ${drawID4}`,
    });
  } catch (error) {
    res.status(400).json({ msg: `Error populating draw: ${error}` });
  }
});

export default router;
