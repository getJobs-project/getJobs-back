import { createPost, findLastPosts, findMorePosts } from '@/controllers/posts.controllers';
import { authenticateToken } from '@/middlewares/auth.middleware';
import { Router } from 'express';

const postsRouter = Router();

postsRouter
  .all('/*', authenticateToken)
  .get('/', findLastPosts)
  .get('/old/:createdAt', findMorePosts)
  .post('/', createPost);

export { postsRouter };
