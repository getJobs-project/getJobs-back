import { Prisma } from '@prisma/client';
import { prisma } from '@/config';
import { array } from 'joi';
import { CreatePostParams } from '@/protocols';

async function findLastPosts() {
  return prisma.posts.findMany({
    orderBy: [{ updatedAt: 'desc' }],
    take: 20,
    include: {
      User: {
        select: {
          profilePicture: true,
          userName: true,
        },
      },
    },
  });
}

async function findMorePosts(createAt: Date) {
  return prisma.posts.findMany({
    where: {
      createdAt: { lt: createAt },
    },
    orderBy: [{ updatedAt: 'desc' }],
    take: 10,
    include: {
      User: {
        select: {
          profilePicture: true,
          userName: true,
        },
      },
    },
  });
}

async function findByUserId(userId: number) {
  return prisma.posts.findMany({
    where: {
      userId,
    },
  });
}

async function create(data: CreatePostParams) {
  return prisma.posts.create({
    data,
  });
}

const postsRepository = {
  findLastPosts,
  findMorePosts,
  findByUserId,
  create,
};

export default postsRepository;
