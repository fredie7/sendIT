import { pool } from 'pg';
import db, { connectionString } from './index';
import logger from '../services/logger';
// import seedData from '../db/seed';
// import seedDatabase from '../db/seed';

const queryText = `
CREATE EXTENSION IF NOT EXISTS 'uuid-ossp';
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS parcels;

CREATE TABLE IF NOT EXIST users (
  "id" UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
  "name VARCHAR(100) NOT NULL",
  "email" VARCHAR(100) UNIQUE NOT NULL,
  "password VARCHAR(100) NOT NULL",
)

CREATE TABLE IF NOT EXIST Parcels (
  "id" UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
  "pickupLocation VARCHAR(100) NOT NULL",
  "deliveryLocation" VARCHAR(100) NOT NULL,
  "description" VARCHAR(100) NOT NULL,
  "receiverPhone"  "deliveryLocation" INT UNIQUE NOT NULL,
  "receiverEmail"  "deliveryLocation" VARCHAR(100) UNIQUE NOT NULL,
  "presentLocation" VARCHAR(100) NOT NULL,
  "weight"  "deliveryLocation" INT UNIQUE NOT NULL,
)
`;

db.query(queryText)
  .then((result) => {
    logger.info(result);
    process.exit(0);
  })
  .catch((error) => {
      logger.info(error)
      process.exit(1);
    });