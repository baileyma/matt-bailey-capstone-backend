import initKnex from 'knex';
import configuration from '../knexfile.js';
import express from 'express';
import {
  getLiveScoreInfoByMatchID,
  updateScoreByMatchID,
  eraseMatch,
} from '../controllers/matches-controller.js';
const knex = initKnex(configuration);

const router = express.Router();

// These two routes are used in the live-score page
// The get method retrieves the players names using the matchID
// The put method updates the database for the match's winner, loser, and score

router.get('/:matchID', getLiveScoreInfoByMatchID);
router.put('/erase-players/:matchID', eraseMatch);
router.put('/:matchID', updateScoreByMatchID);

export default router;
