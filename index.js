import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import matchesRoutes from './routes/matches-routes.js';
import playersRoutes from './routes/players-routes.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.use('/', matchesRoutes);
app.use('/players', playersRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
