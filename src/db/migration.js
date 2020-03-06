import { Pool } from 'pg';
import db, { connectionString } from './index';
import logger from '../services/logger';
import seedDatabase from './seed';
// import seedData from '../db/seed';
// import seedDatabase from '../db/seed';

const queryText = `
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS parcels;

CREATE TABLE IF NOT EXISTS users (
  "id" UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
  "name" VARCHAR(100) NOT NULL,
  "email" VARCHAR(100) UNIQUE NOT NULL,
  "password" VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS parcels (
  "id" UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
  "pickupLocation" VARCHAR(100) NOT NULL,
  "deliveryLocation" VARCHAR(100) NOT NULL,
  "description" VARCHAR(100) NOT NULL,
  "receiverPhone" VARCHAR(20) NOT NULL,
  "receiverEmail" VARCHAR(100) UNIQUE NOT NULL,
  "presentLocation" VARCHAR(100) NOT NULL,
  "weight" VARCHAR(11) NOT NULL
);
`;

const dBase = new Pool({ connectionString });

dBase.on('connect', ()=> {
  logger.info('CONNECTED TO DATABASE');
  seedDatabase();
})

db.query(queryText)
  .then((result) => {
    logger.info(result);
    process.exit(0);
  })
  .catch((error) => {
    logger.info(error);
    process.exit(1);
  });
