import { Pool } from 'pg';
import dotenv from 'dotenv';
import logger from '../services/logger';

dotenv.config();

let connectionString;

if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.DATABASE_TEST_URL;
} else {
  connectionString = process.env.DATABASE_URL;
}

logger.info(`NODE_environment: ${process.env.NODE_ENV}`)

const db = new Pool({ 
  connectionString,
});

db.connect();

db.on('connect', () => {
  logger.info('connected to the database');
});

db.on('error', () => {
  logger.info('failed to connect to the database');
});

export { connectionString };
export default db;
