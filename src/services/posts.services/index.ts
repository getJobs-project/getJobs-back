import { Prisma, User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { conflictError, duplicatedEmailError } from '@/errors';
import dayjs from 'dayjs';
import { CreatePostParams } from '@/protocols';
import postsRepository from '@/repositories/posts.repositories';

async function findLastPosts(): Promise<Prisma.PostsMaxAggregateOutputType[]> {
  return postsRepository.findLastPosts();
}

async function findMorePosts(createdAt: Date): Promise<Prisma.PostsMaxAggregateOutputType[]> {
  console.log(createdAt);
  return postsRepository.findMorePosts(createdAt);
}

async function createPost({
  text,
  imageUrl,
  location,
  userId,
}: CreatePostParamsService): Promise<Prisma.PostsMaxAggregateOutputType> {
  if (!text || imageUrl === undefined || location === undefined) throw conflictError('Data to new post incomplete');
  return postsRepository.create({
    text,
    imageUrl,
    location,
    userId,
    updatedAt: dayjs().format(),
  });
}

type CreatePostParamsService = Pick<CreatePostParams, 'text' | 'imageUrl' | 'location' | 'userId'>;

const postsService = {
  findLastPosts,
  findMorePosts,
  createPost,
};

export default postsService;
