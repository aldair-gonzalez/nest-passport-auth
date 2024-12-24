import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  JWT_SECRET: string;
  JWT_EXPIRATION: string;
  SESSION_GOOGLE_CLIENT_ID: string;
  SESSION_GOOGLE_CLIENT_SECRET: string;
  SESSION_GOOGLE_CALLBACK_URL: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    JWT_SECRET: joi.string().required(),
    JWT_EXPIRATION: joi.string().required(),
    SESSION_GOOGLE_CLIENT_ID: joi.string().required(),
    SESSION_GOOGLE_CLIENT_SECRET: joi.string().required(),
    SESSION_GOOGLE_CALLBACK_URL: joi.string().required(),
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
  session: {
    google: {
      clientID: envVars.SESSION_GOOGLE_CLIENT_ID,
      clientSecret: envVars.SESSION_GOOGLE_CLIENT_SECRET,
      callbackURL: envVars.SESSION_GOOGLE_CALLBACK_URL,
    },
  },
};
