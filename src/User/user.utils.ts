import bcrypt from 'bcryptjs';

export enum USER_ROLE {
  ADMIN = 'admin',
  STAFF = 'staff',
  CUSTOMER = 'customer',
}

export const hash = async (plainText: string) => {
  const saltRounds = 10;
  return bcrypt.hash(plainText, saltRounds);
};

// eslint-disable-next-line no-shadow
export const compare = async (plainText: string, hash: string) =>
  bcrypt.compare(plainText, hash);

module.exports = {
  hash,
  compare,
};
