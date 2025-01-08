import initKnex from 'knex';
import configuration from '../knexfile.js';
const knex = initKnex(configuration);
import express from 'express';
import { setDraw, getAllPlayers } from '../controllers/draw-controller.js';

const router = express.Router();

// This post method is called from the Set Draw page.
// It populates the players in the four opening matches.

router.post('/:year', setDraw);

// This get method retrieves all the players for the
// dropdown menu from the Set Draw page

router.get('/players', getAllPlayers);

export default router;
