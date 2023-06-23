import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import userService, { CreateUserParams } from '@/services/user.services';

export async function createUser(req: Request, res: Response, next: NextFunction) {
  const { name, birthday, cpf, email, password, profilePicture } = req.body as CreateUserParams;

  try {
    await userService.createUser({ email, password, name, birthday, cpf, profilePicture });

    return res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    next(error);
  }
}
