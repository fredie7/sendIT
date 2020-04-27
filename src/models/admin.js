import db from '../db';
import logger from '../services/logger';

class Admin {
  async create(data) {
    const createQuery = `INSERT INTO admins ("name", "email", "password")
         VALUES($1, $2, $3)
         returning *`;
    
    const values = [
      data.name,
      data.email,
      data.password,
    ];

    try {
      const { rows } = await db.query(createQuery, values);
      return rows[0];
    } catch (error) {
      logger.error(error);
      return error;
    }
  }

  async getByField(field, value) {
    const text = `SELECT * FROM admins WHERE ${field} = $1`;
    try {
      const { rows } = await db.query(text, [value]);
      return rows[0];
    } catch (error) {
      return error;
    }
  }

  async getAllParcels() {
    const createQuery = 'SELECT * FROM parcels';
    try {
      const { row } = await db.query(createQuery);
      return row[0];
    } catch (error) {
      logger.info(error);
      return error;
    }
  }

  async getAllUsers() {
    const createQuery = 'SELECT * FROM users';
    try {
      const { row } = await db.query(createQuery);
      return row[0];
    } catch (error) {
      logger.info(error);
      return error;
    }
  }

  async getAllDeliveredParcels(field, value) {
    const createQuery = `SELECT * FROM parcels WHERE ${field} = $1`;
    try {
      const { row } = db.query(createQuery, [value]);
      return row[0];
    } catch (error) {
      logger.info(error);
      return error;
    }
  }

  async getAllPendingOrders(field, value) {
    const createQuery = `SELECT * FROM parcels WHERE ${field} = $1`;
    try {
      const { row } = db.query(createQuery, [value]);
      return row[0];
    } catch (error) {
      logger.info(error);
      return error;
    }
  }

  async getAllCancelledOrders(field, value) {
    const createQuery = `SELECT * FROM parcels WHERE ${field} = $1`;
    try {
      const { row } = db.query(createQuery, [value]);
      return row[0];
    } catch (error) {
      logger.info(error);
      return error;
    }
  }
}
export default new Admin();
