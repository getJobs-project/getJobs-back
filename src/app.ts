import express, { Express } from 'express';
import cors from 'cors';

import { loadEnv, connectDb, disconnectDB } from '@/config';
import { authRouter, postsRouter, userRouter } from '@/routes';
import { handleApplicationErrors } from './middlewares/error-handler.middleware';

loadEnv();

const app = express();
app
  .use(cors())
  .use(express.json())
  .get('/test', (_req, res) => res.send('OK!'))
  .use('/users', userRouter)
  .use('/auth', authRouter)
  .use('/posts', postsRouter)
  .use(handleApplicationErrors);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
