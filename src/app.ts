import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import useRoutes from './routes/userRoutes';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/', useRoutes);

const PORT = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
