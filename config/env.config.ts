import { config } from 'dotenv';
import { ZEnv } from './env.types';

export const configure = () => {
    config();
    ZEnv.passthrough().parse(process.env);
};
