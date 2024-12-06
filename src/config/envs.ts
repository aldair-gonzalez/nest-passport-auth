import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  JWT_SECRET: string;
  JWT_EXPIRATION: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    JWT_SECRET: joi.string().required(),
    JWT_EXPIRATION: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  jwt: {
    secret: envVars.JWT_SECRET,
    expiration: envVars.JWT_EXPIRATION,
  },
};
