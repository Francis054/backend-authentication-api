import express, { type Request, type Response } from 'express';

import { errorHandler } from './middleware/error-handler.js';
import { notFound } from './middleware/not-found.js';
import { authRouter } from './modules/auth/auth.routes.js';

export const app = express();

app.disable('x-powered-by');

app.use(express.json({ limit: '10kb' }));

app.get('/health', (_request: Request, response: Response): void => {
  response.status(200).json({
    success: true,
    message: 'Server is healthy.',
    timestamp: new Date().toISOString(),
  });
});

app.use('/auth', authRouter);

app.use(notFound);

app.use(errorHandler);
