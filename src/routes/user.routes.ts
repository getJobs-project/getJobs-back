import { createUser } from '@/controllers/user.controllers';
import { validateBody } from '@/middlewares/validation.middleware';
import { createUserSchema } from '@/schemas/user.schemas';
import { Router } from 'express';

const userRouter = Router();

userRouter.post('/', validateBody(createUserSchema), createUser);

export { userRouter };
