import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();
const router = express.Router();

// TODO: 'Add origin, remove credentials?'
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json());
app.use(routes(router));
export default app;
