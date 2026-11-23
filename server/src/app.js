import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { env } from './config/env.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import authRoutes from './routes/auth.routes.js';

const app = express();

app.set('trust proxy', 1); // Render sits behind a proxy: needed for correct client IPs
app.use(helmet()); // secure HTTP headers
app.use(cors({ origin: env.clientOrigin, credentials: true })); // only our React app may call the API
app.use(express.json({ limit: '100kb' })); // reject huge bodies
app.use(cookieParser());

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
