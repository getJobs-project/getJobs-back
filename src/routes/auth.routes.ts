import { signIn } from '@/controllers/auth.controllers';
import { Router } from 'express';

const authRouter = Router();

authRouter.post('/', signIn);

export { authRouter };
