import db from '../db';
import logger from '../services/logger';

class Users {
  async create(data) {
    const createQuery = `INSERT INTO users ("name", "email", "password")
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

  async getById(id) {
    const text = 'SELECT * FROM users WHERE id = $1';
    try {
      const { rows } = await db.query(text, [id]);
      return rows[0];
    } catch (error) {
      return error;
    }
  }
}

export default Users;
