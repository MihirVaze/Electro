import z from 'zod';
import { User } from '../src/feature-modules/user/user.types';
import { Payload } from '../src/feature-modules/auth/auth.type';

export const ZEnv = z.object({
  PORT: z.coerce.number(),

  DB_NAME: z.string().nonempty(),
  DB_USERNAME: z.string().nonempty(),
  DB_PASSWORD: z.string().nonempty(),
  DB_DIALECT: z.enum(['postgres']),

  JWT_SECRET_KEY: z.string().nonempty(),

  EMAIL_HOST: z.string(),
  EMAIL_PORT: z.string(),
  EMAIL_AUTH_USER: z.string(),
  EMAIL_AUTH_PASS: z.string(),
  EMAIL_SENDMAIL_FROM: z.string(),
});

type Env = z.infer<typeof ZEnv>

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Env { }
  }
  namespace Express {
    interface Request {
      payload: Payload;
      parsedQuery: any;
    }
  }
}