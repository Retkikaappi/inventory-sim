import express from 'express';
import hiScoreRouter from './routes/hiscore';

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.use('/api/hiscore', hiScoreRouter);
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

export default app;
