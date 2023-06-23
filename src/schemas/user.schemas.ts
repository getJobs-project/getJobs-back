import Joi from 'joi';
import { CreateUserParams } from '@/services/user.services';

export const createUserSchema = Joi.object<CreateUserParams>({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().min(2).required(),
  birthday: Joi.date().required(),
  cpf: Joi.string().min(11).max(11).required(),
  profilePicture: Joi.string().required(),
  userName: Joi.string().max(20).required(),
});
