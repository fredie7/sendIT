import db from '../db';
import logger from '../services/logger';

class Parcel {
  async create(data) {
    const createParcel = `INSERT INTO parcels (
        "pickupLocation", 
        "deliveryLocation", 
        "presentLocation", 
        "receiverPhone",
        "receiverEmail", 
        "description", 
        "weight", 
        "createdAt", 
        "updatedAt", 
        "status"
      )
    VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
    returning *`;
    const values = [
      data.pickupLocation,
      data.deliveryLocation,
      data.presentLocation,
      data.receiverPhone,
      data.receiverEmail,
      data.description,
      data.weight,
      data.createdAt,
      data.updatedAt,
      data.status,
    ]

    try {
      const { rows } = await db.query(createParcel, values);
      return rows[0]; 
    } catch (error) {
      logger.error(error);
      return error;
    }
  };

  async getById(id) {
    const text = 'SELECT * FROM parcels WHERE id = $1';
    try {
      const { rows } = await db.query(text, [id]);
      return rows[0];
    } catch (error) {
      return error;
    }
  }

  async getByField(field, value) {
    const text = `SELECT * FROM parcels WHERE '${field}' = $1`;
    try {
      const { rows } = await db.query(text, [value]);
      return rows[0];
    } catch (error) {
      return error;
    }
  }
  
  async getOneParcel(id) {
    const text = `SELECT * FROM parcels WHERE id = ${id}`;
    try {
      const { rows } = await db.query(text);
      return rows[0];
    } catch (error) {
      return error;
    }
  }
}

export default new Parcel();
