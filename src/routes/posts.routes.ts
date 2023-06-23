import { createPost, findLastPosts } from '@/controllers/posts.controllers';
import { authenticateToken } from '@/middlewares/auth.middleware';
import { Router } from 'express';

const postsRouter = Router();

postsRouter.all('/*', authenticateToken).get('/', findLastPosts).post('/', createPost);

export { postsRouter };
