import Joi from 'joi';
import { CreateUserParams } from '@/services/user.services';

export const createUserSchema = Joi.object<CreateUserParams>({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});