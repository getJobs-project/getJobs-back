import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { duplicatedEmailError } from '@/errors';
import userRepository from '@/repositories/user.repositories';
import dayjs from 'dayjs';

export async function createUser({ name, birthday, cpf, email, password }: CreateUserParams): Promise<User> {
  await validateUniqueEmailOrFail(email);
  console.log({
    name,
    birthday,
    cpf,
    email,
    password: password,
    updateAt: dayjs().format(),
  });
  const hashedPassword = await bcrypt.hash(password, 12);
  return userRepository.create({
    name,
    birthday,
    cpf,
    email,
    password: hashedPassword,
    updatedAt: dayjs().format(),
  });
}

async function validateUniqueEmailOrFail(email: string) {
  const userWithSameEmail = await userRepository.findByEmail(email);

  if (userWithSameEmail) throw duplicatedEmailError();
}

export type CreateUserParams = Pick<User, 'email' | 'password' | 'birthday' | 'cpf' | 'name'>;

const userService = {
  createUser,
};

export default userService;
