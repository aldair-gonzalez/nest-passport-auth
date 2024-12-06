import { envs } from 'src/config';

export const jwtConstants = {
  secret: envs.jwt.secret,
};
