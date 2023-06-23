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
          name: true,
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
  findByUserId,
  create,
};

export default postsRepository;
