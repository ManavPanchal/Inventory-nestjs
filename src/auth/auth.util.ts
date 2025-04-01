import bcrypt from 'bcryptjs';
import { config } from 'dotenv';
import { USER_ROLE } from 'src/auth/user/user.utils';
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

// eslint-disable-next-line no-shadow
export const compare = async (plainText: string, hash: string) =>
  bcrypt.compare(plainText, hash);

// export const getToken = async (user: Partial<User>) => {
//   const token = jwt.sign();
// };
