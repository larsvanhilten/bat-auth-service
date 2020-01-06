import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();
const router = express.Router();

// TODO: 'Add origin, remove credentials?'
if (process.env.NODE_ENV !== 'production') {
  app.use(cors());
}

app.use(express.json());
app.use(routes(router));
export default app;
