import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import matchesRoutes from './routes/matches-routes.js';
import playersRoutes from './routes/players-routes.js';
import drawRoutes from './routes/draw-routes.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.use('/matches', matchesRoutes);
app.use('/players', playersRoutes);
app.use('/draw', drawRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

export { app };
