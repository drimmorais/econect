import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export default new Pool({
  user: 'postgres',
  password: process.env.PASSWORD,
  host: 'localhost',
  port: 5432,
  database: process.env.DATABASE,
  // ssl: {
  //   rejectUnauthorized: false,
  // },
});
