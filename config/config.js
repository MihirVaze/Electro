import { config } from 'dotenv';
config();
const { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_DIALECT } = process.env;

export default {
    development: {
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_NAME,
        host: 'localhost',
        dialect: DB_DIALECT,
    },
};
