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


  async cancelOrder(field, id) {
    const text = 'UPDATE parcels SET "status" = $1 WHERE id = $2 RETURNING *';
    try {
      const { rows } = await db.query(text, [field, id]);
      return rows[0];
    } catch (error) {
      return error;
    }
  }

  async update(data, id) {
    const fields = Object.keys(data);
    let setString = '';
    const placeHolders = [id];
    fields.forEach((fieldName, index) => {
      const placeHolderNumber = index + 2;
      setString = `${setString}, "${fieldName}" = $${placeHolderNumber}`;
      placeHolders.push(data[fieldName]);
    });
    setString = setString.slice(2);
    const date = new Date().toUTCString();
    setString = setString + `, "updatedAt" = '${date}'`;
    const text = `UPDATE parcels SET ${setString} WHERE id = $1 RETURNING *`;
    try {
      const { rows } = await db.query(text, placeHolders);
      return rows[0];
    } catch (error) {
      return error;
    }
  }
}

export default new Parcel();
