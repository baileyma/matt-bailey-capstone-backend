import initKnex from 'knex';
import configuration from '../knexfile.js';
const knex = initKnex(configuration);

const getPlacingsAllYears = async (_req, res) => {
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
};

const getPlacingsByYear = async (req, res) => {
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
};

const getPlayersForEachMatch = async (req, res) => {
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
        'ma.score',
        'ma.winner_id',
        'ma.loser_id',
        'pl3.name as winner_name',
        'pl4.name as loser_name'
      )
      .leftJoin('players as pl1', 'ma.player1_id', 'pl1.id')
      .leftJoin('players as pl2', 'ma.player2_id', 'pl2.id')
      .leftJoin('players as pl3', 'ma.winner_id', 'pl3.id')
      .leftJoin('players as pl4', 'ma.loser_id', 'pl4.id')
      .where('ma.year', year);
    console.log('players', players);

    res.status(200).json(players);
  } catch (error) {
    res
      .status(400)
      .send(`Error retrieving players for opening round: ${error}`);
  }
};

const getPreviousMatches = async (req, res) => {
  const player1ID = req.query.player1ID;
  const player2ID = req.query.player2ID;

  console.log('player2ID', typeof player2ID);

  if (Number(player2ID) === 0) {
    console.log('running');

    try {
      const data = await knex('matches as ma')
        .select(
          'ma.id',
          'ma.year',
          'ma.draw',
          'ma.round',
          'ma.round_number',
          'ma.score',
          'ma.winner_id',
          'ma.loser_id',
          'pl1.name as winner_name',
          'pl2.name as loser_name'
        )
        .where(function () {
          this.where('ma.winner_id', player1ID).orWhere(
            'ma.loser_id',
            player1ID
          );
        })
        .leftJoin('players as pl1', 'ma.winner_id', 'pl1.id')
        .leftJoin('players as pl2', 'ma.loser_id', 'pl2.id');
      res.status(200).json(data);
    } catch (error) {
      res.status(400).send(`Error retrieving all matches: ${error}`);
    }
  } else {
    try {
      const data = await knex('matches as ma')
        .select(
          'ma.id',
          'ma.year',
          'ma.draw',
          'ma.round',
          'ma.round_number',
          'ma.score',
          'ma.winner_id',
          'ma.loser_id',
          'pl1.name as winner_name',
          'pl2.name as loser_name'
        )
        .where(function () {
          this.where('ma.winner_id', player1ID).orWhere(
            'ma.winner_id',
            player2ID
          );
        })
        .andWhere(function () {
          this.where('ma.loser_id', player1ID).orWhere(
            'ma.loser_id',
            player2ID
          );
        })
        .leftJoin('players as pl1', 'ma.winner_id', 'pl1.id')
        .leftJoin('players as pl2', 'ma.loser_id', 'pl2.id');

      // where the winner is either player 1 or 2
      // and the loser is either player 1 or 2
      // then join the players table twice to get the names of the winner and loser

      res.status(200).json(data);
    } catch (err) {
      res.status(400).send(`Error retrieving head-to-head matches: ${err}`);
    }
  }
};

export {
  getPlacingsAllYears,
  getPlacingsByYear,
  getPlayersForEachMatch,
  getPreviousMatches,
};
