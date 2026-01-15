import express, { Express } from 'express';
import cors from 'cors';
import { config } from './config/env';
import { errorHandler } from './middlewares/errorHandler';
import healthRouter from './routes/health';
import authTestRouter from './routes/auth-test';
import notesRouter from './routes/notes';
import aiRouter from './routes/ai';

export function createApp(): Express {
  const app = express();

  // Middleware
  app.use(cors({
    origin: config.frontendOrigin,
    credentials: true,
  }));
  app.use(express.json());

  // Routes
  app.use('/', healthRouter);
  app.use('/api/auth', authTestRouter); // Test auth endpoint
  app.use('/api/notes', notesRouter);
  app.use('/api/ai', aiRouter);

  // Error handling (must be last)
  app.use(errorHandler);

  return app;
}
