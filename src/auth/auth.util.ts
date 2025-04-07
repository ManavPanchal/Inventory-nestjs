import * as bcrypt from 'bcryptjs';
import { config } from 'dotenv';
import { USER_ROLE } from 'src/user/user.utils';
import * as jwt from 'jsonwebtoken';
config();

interface User {
  name: string;
  phone: string;
  email: string;
  role: USER_ROLE;
}

export const hash = async (plainText: string) => {
  const saltRounds = 10;
  return bcrypt.hash(plainText, saltRounds);
};

export const compare = async (plainText: string, hash: string) =>
  bcrypt.compare(plainText, hash);

export const getToken = (payload: Partial<User>) =>
  jwt.sign({ ...payload }, process.env.JWT_SECRET as string);
