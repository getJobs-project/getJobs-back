import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { SignInParams } from '@/services/auth.services';
import userService from '@/services/user.services';

export async function createUser(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body as SignInParams;

  try {
    await userService.createUser({ email, password });

    return res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    next(error);
  }
}
