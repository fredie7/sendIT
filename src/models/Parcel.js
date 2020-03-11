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
    const text = 'SELECT * FROM parcels WHERE id = $1';
    try {
      const { rows } = await db.query(text, [id]);
      return rows[0];
    } catch (error) {
      logger.error(error)
      return error;
    }
  }

  async getAllParcels() {
    const text = 'SELECT * FROM parcels';
    try {
      const { rows } = await db.query(text);
      return rows;
    } catch (error) {
      return error;
    }
  }

  async parcelLocation(field, id) {
    const text = 'UPDATE parcels SET "pickupLocation" = $1 WHERE id = $2 RETURNING *';
    try {
      const { rows } = await db.query(text, [field, id]);
      return rows[0];
    } catch (error) {
      return error;
    }
  }

  async parcelDestination(field, id) {
    const text = 'UPDATE parcels SET "deliveryLocation" = $1 WHERE id = $2 RETURNING *';
    try {
      const { rows } = await db.query(text, [field, id]);
      return rows[0];
    } catch (error) {
      return error;
    }
  }

  async cancelOrder(field, id) {
    const text = 'UPDATE parcels SET "status" = $1 WHERE id = $2 RETURNING *';
    try {
      const { rows } = await db.query(text, [field, id]);
      return rows[0];
    } catch (error) {
      return error;
    }
  }

  async editOrder(field, id) {
    const text = `UPDATE parcels SET 
    "pickupLocation" = $1, 
    "deliveryLocation" = $2, 
    "presentLocation" = $3, 
    "receiverPhone" = $4,
    "receiverEmail" = $5, 
    "description" = $6, 
    "weight" = $7, 
    "createdAt" = $8, 
    "updatedAt" = $9, 
    "status" = $10
    WHERE id = $11 RETURNING *`;

    try {
      const { rows } = db.query(text, [id]);
      return rows[0];
    } catch (error) {
      return error;
    }
  }
}

export default new Parcel();
