import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { conflictError, duplicatedEmailError } from '@/errors';
import userRepository from '@/repositories/user.repositories';
import dayjs from 'dayjs';

export async function createUser({
  name,
  birthday,
  cpf,
  email,
  password,
  profilePicture,
  userName,
}: CreateUserParams): Promise<User> {
  await validateUniqueEmailOrFail(email);
  await validateUniqueCPFOrFail(cpf);
  await validateUniqueUsernameOrFail(userName);

  const hashedPassword = await bcrypt.hash(password, 12);
  return userRepository.create({
    name,
    birthday,
    cpf,
    email,
    profilePicture,
    userName,
    password: hashedPassword,
    updatedAt: dayjs().format(),
  });
}

async function validateUniqueEmailOrFail(email: string) {
  const userWithSameEmail = await userRepository.findByEmail(email);

  if (userWithSameEmail) throw duplicatedEmailError();
}

async function validateUniqueCPFOrFail(cpf: string) {
  const userWithSameEmail = await userRepository.findByCPF(cpf);

  if (userWithSameEmail) throw conflictError('There is already an user with given CPF');
}

async function validateUniqueUsernameOrFail(username: string) {
  const userWithSameEmail = await userRepository.findByUsername(username);

  if (userWithSameEmail) throw conflictError('There is already an user with given username');
}

export type CreateUserParams = Pick<
  User,
  'email' | 'password' | 'birthday' | 'cpf' | 'name' | 'profilePicture' | 'userName'
>;

const userService = {
  createUser,
};

export default userService;
