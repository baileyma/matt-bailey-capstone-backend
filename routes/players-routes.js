import initKnex from 'knex';
import configuration from '../knexfile.js';
import express from 'express';
import {
  getPlacingsAllYears,
  getPlacingsByYear,
  getPlayersForEachMatch,
  getPreviousMatches,
} from '../controllers/players-controller.js';

const knex = initKnex(configuration);

const router = express.Router();

// This get method finds the players for each match as well as the winner/loser in a given year

router.get('/year/:year', getPlayersForEachMatch);

// This get method is called by the placings component
// It provides the placings of all 8 players in a given year

router.get('/placings/:year', getPlacingsByYear);

// This get method is called by the history page
// It provides the names of each year's champion, runner up, and plate winner

router.get('/placings-allyears', getPlacingsAllYears);

// This get the head-to-head for each player

router.get('/head-to-head', getPreviousMatches);

export default router;
