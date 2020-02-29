import db from '../db';
import logger from '../services/logger'

class Parcels {
  async parcel(data) {
    const createParcel = `INSERT INTO parcels "id","pickupLocation","deliveryLocation","presentLocation","receiverPhone"
    ,"receiverEmail","description","weight","createdAt","updatedAt","status" returning *`;
    const values = [
        data.id,
        data.createdBy,
        data.pickupLocation,
        data.deliveryLocation,
        data.presentLocation,
        data.receiverPhone,
        data.receiverEmail,
        data.description,
        data.weight,
        data.status
    ]

    try {
        const { rows } = await db.query(createParcel, values);
        return rows[0]; 
    } catch (error) {
        logger.error(error)
        return error
    }
  };

    async getById(id) {
        const text = `SELECT * FROM parcels WHERE id = $1`;
        try {
            const { rows } = await db.query(text, [id]);
            return rows[0];
        } catch (error) {
            return error;
        }
    };

    async getByField(field, value) {
        const text =   `SELECT * FROM parcels WHERE '${FIELD}' = $1`;
        try {
            const { rows } = await db.query(text, [value])
        } catch (error) {
            return error;
        }
    }
      
}

export default Parcels;
