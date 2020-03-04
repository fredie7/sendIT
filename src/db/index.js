import { Pool } from 'pg';
import dotenv from 'dotenv';
import logger from '../services/logger';

dotenv.config();

// this should be made dynamic based on the environment
// development, test, production
const connectionString = process.env.DATABASE_URL;

const db = new Pool({ connectionString });

// this was the missing piece.
// the database connection was not being established
// hence, the 'on connect' event below wasn't triggered
db.connect();

db.on('connect', () => {
  logger.info('connected to the database');
});

db.on('error', () => {
  logger.info('failed to connect to the database');
});

export { connectionString };
export default db;
