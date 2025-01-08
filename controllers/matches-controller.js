import initKnex from 'knex';
import configuration from '../knexfile.js';
const knex = initKnex(configuration);

const getLiveScoreInfoByMatchID = async (req, res) => {
  const matchID = Number(req.params.matchID);

  try {
    const data = await knex('matches as ma')
      .select(
        'ma.year',
        'ma.draw',
        'ma.round',
        'ma.round_number',
        'pl1.name as player1_name',
        'pl1.id as player1_id',
        'pl2.name as player2_name',
        'pl2.id as player2_id',
        'ma.score'
      )
      .innerJoin('players as pl1', 'ma.player1_id', 'pl1.id')
      .innerJoin('players as pl2', 'ma.player2_id', 'pl2.id')
      .where('ma.id', matchID)
      .first();

    console.log('I tried');

    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving players: ${err}`);
  }
};

const eraseMatch = async (req, res) => {
  const matchID = Number(req.params.matchID);
  try {
    const ID = await knex('matches')
      .update({
        player1_id: null,
        player2_id: null,
        winner_id: null,
        loser_id: null,
        score: null,
      })
      .where('id', matchID);
    res.status(201).json(ID);
  } catch (err) {
    res.status(400).send(`Error deleting players: ${err}`);
  }
};

const updateScoreByMatchID = async (req, res) => {
  const matchID = Number(req.params.matchID);
  const { winnerID, loserID, score } = req.body;

  try {
    const ID = await knex('matches')
      .update({
        winner_id: winnerID,
        loser_id: loserID,
        score: score,
      })
      .where('id', matchID);

    const data = await knex('matches')
      .select('year', 'draw', 'round', 'round_number')
      .where('id', matchID)
      .first();

    const { year, draw, round, round_number } = data;

    if (draw === 'Opening' && round_number === 1) {
      const ID2 = await knex('matches')
        .update({
          player1_id: winnerID,
        })
        .where('year', year)
        .where('draw', 'Main')
        .where('round', 'Semi Final')
        .where('round_number', 1);

      const ID3 = await knex('matches')
        .update({
          player1_id: loserID,
        })
        .where('year', year)
        .where('draw', 'Plate')
        .where('round', 'Semi Final')
        .where('round_number', 1);
    }

    if (draw === 'Opening' && round_number === 2) {
      const ID4 = await knex('matches')
        .update({
          player2_id: winnerID,
        })
        .where('year', year)
        .where('draw', 'Main')
        .where('round', 'Semi Final')
        .where('round_number', 1);

      const ID5 = await knex('matches')
        .update({
          player2_id: loserID,
        })
        .where('year', year)
        .where('draw', 'Plate')
        .where('round', 'Semi Final')
        .where('round_number', 1);
    }

    if (draw === 'Opening' && round_number === 3) {
      const ID6 = await knex('matches')
        .update({
          player1_id: winnerID,
        })
        .where('year', year)
        .where('draw', 'Main')
        .where('round', 'Semi Final')
        .where('round_number', 2);

      const ID7 = await knex('matches')
        .update({
          player1_id: loserID,
        })
        .where('year', year)
        .where('draw', 'Plate')
        .where('round', 'Semi Final')
        .where('round_number', 2);
    }

    if (draw === 'Opening' && round_number === 4) {
      const ID8 = await knex('matches')
        .update({
          player2_id: winnerID,
        })
        .where('year', year)
        .where('draw', 'Main')
        .where('round', 'Semi Final')
        .where('round_number', 2);

      const ID9 = await knex('matches')
        .update({
          player2_id: loserID,
        })
        .where('year', year)
        .where('draw', 'Plate')
        .where('round', 'Semi Final')
        .where('round_number', 2);
    }

    if (draw === 'Plate' && round === 'Semi Final' && round_number === 1) {
      const ID10 = await knex('matches')
        .update({
          player1_id: winnerID,
        })
        .where('year', year)
        .where('draw', 'Plate')
        .where('round', 'Final')
        .where('round_number', 1);

      const ID11 = await knex('matches')
        .update({
          player1_id: loserID,
        })
        .where('year', year)
        .where('draw', 'Plate')
        .where('round', 'Play off')
        .where('round_number', 1);
    }

    if (draw === 'Plate' && round === 'Semi Final' && round_number === 2) {
      const ID12 = await knex('matches')
        .update({
          player2_id: winnerID,
        })
        .where('year', year)
        .where('draw', 'Plate')
        .where('round', 'Final')
        .where('round_number', 1);

      const ID13 = await knex('matches')
        .update({
          player2_id: loserID,
        })
        .where('year', year)
        .where('draw', 'Plate')
        .where('round', 'Play off')
        .where('round_number', 1);
    }

    if (draw === 'Main' && round === 'Semi Final' && round_number === 1) {
      const ID14 = await knex('matches')
        .update({
          player1_id: winnerID,
        })
        .where('year', year)
        .where('draw', 'Main')
        .where('round', 'Final')
        .where('round_number', 1);

      const ID15 = await knex('matches')
        .update({
          player1_id: loserID,
        })
        .where('year', year)
        .where('draw', 'Main')
        .where('round', 'Play off')
        .where('round_number', 1);
    }

    if (draw === 'Main' && round === 'Semi Final' && round_number === 2) {
      const ID16 = await knex('matches')
        .update({
          player2_id: winnerID,
        })
        .where('year', year)
        .where('draw', 'Main')
        .where('round', 'Final')
        .where('round_number', 1);

      const ID17 = await knex('matches')
        .update({
          player2_id: loserID,
        })
        .where('year', year)
        .where('draw', 'Main')
        .where('round', 'Play off')
        .where('round_number', 1);
    }

    res.status(201).json(ID);
  } catch (err) {
    res.status(400).send(`Error publishing result: ${err}`);
  }
};

export { getLiveScoreInfoByMatchID, updateScoreByMatchID, eraseMatch };
