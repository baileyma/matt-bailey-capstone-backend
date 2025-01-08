import initKnex from 'knex';
import configuration from '../knexfile.js';
const knex = initKnex(configuration);

const setDraw = async (req, res) => {
  const year = Number(req.params.year);

  try {
    const drawID1 = await knex('matches')
      .update({
        player1_id: Number(req.body.match1player1),
        player2_id: Number(req.body.match1player2),
      })
      .where('year', year)
      .where('draw', 'Opening')
      .where('round_number', 1);

    const drawID2 = await knex('matches')
      .update({
        player1_id: Number(req.body.match2player1),
        player2_id: Number(req.body.match2player2),
      })
      .where('year', year)
      .where('draw', 'Opening')
      .where('round_number', 2);

    const drawID3 = await knex('matches')
      .update({
        player1_id: Number(req.body.match3player1),
        player2_id: Number(req.body.match3player2),
      })
      .where('year', year)
      .where('draw', 'Opening')
      .where('round_number', 3);

    const drawID4 = await knex('matches')
      .update({
        player1_id: Number(req.body.match4player1),
        player2_id: Number(req.body.match4player2),
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
};

const getAllPlayers = async (_req, res) => {
  try {
    const data = await knex('players');
    console.log('players', data);

    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving players: ${err}`);
  }
};

export { setDraw, getAllPlayers };
