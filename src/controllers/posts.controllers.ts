import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { CreatePostParams } from '@/protocols';
import postsService from '@/services/posts.services';
import { AuthenticatedRequest } from '@/middlewares/auth.middleware';

export async function findLastPosts(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const posts = await postsService.findLastPosts();
    return res.send(posts);
  } catch (error) {
    next(error);
  }
}

export async function findMorePosts(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { createdAt } = req.params as Record<string, string>;

  try {
    const posts = await postsService.findMorePosts(new Date(createdAt));
    return res.send(posts);
  } catch (error) {
    next(error);
  }
}

export async function createPost(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { text, imageUrl, location } = req.body as CreatePostParams;
  const userId = req.userId;

  try {
    await postsService.createPost({ text, imageUrl, location, userId });
    return res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    next(error);
  }
}
