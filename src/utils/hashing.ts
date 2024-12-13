import * as bcrypt from 'bcrypt';

export const hashPass = async (password: string) =>
  bcrypt.hashSync(password, 10);

export const comparePass = (password: string, hash: string) =>
  bcrypt.compareSync(password, hash);
