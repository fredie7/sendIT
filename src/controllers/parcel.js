import uuidV4 from 'uuid/v4';
// import parcels from '../data/parcels';
import Parcel from '../models/Parcel';
import db from '../db';


const parcelController = {
  createParcel: async (req, res) => {
    try {
      const newParcel = await Parcel.create({...req.body, status: 'pending'});
      res.status(201).json(newParcel);
    } catch (error) {
      return res.status(500).json({error: 'internal server error', stack: error});
    }
  },

  editParcel: async (req, res) => {
    try {
      const foundParcel = await Parcel.getById(req.params.parcelId);
      if (!foundParcel) {
        return res.status(404).json({ error: 'parcel not found' });
      }
      const updatedParcel = await Parcel.update(req.body, req.params.parcelId);
      return res.status(200).json(updatedParcel);
    } catch (error) {
      return res.status(500).json({ error: 'internal server error', stack: error })
    }
  },

  getOneParcel: async (req, res) => {
    try {
      const foundParcel = await Parcel.getById(req.params.parcelId);
      if (!foundParcel) {
        return res.status(404).json({ error: 'parcel not found' });
      }
      return res.status(200).json(foundParcel);
    } catch (error) {
      return res.status(500).json({ error: 'internal server error', stack: error })
    }
  },

  cancelParcelOrder: async (req, res) => {
    try {
      const foundParcel = await Parcel.getById(req.params.parcelId);
      if (!foundParcel) {
        return res.status(404).json({ error: 'parcel not found' });
      }
      if (foundParcel.status === 'delivered') {
        return res.status(401).json({ error: 'parcel has already been delivered' });
      }
      const updatedParcel = await Parcel.update({ status: 'cancelled' }, req.params.parcelId);
      return res.status(200).json(updatedParcel);
    } catch (error) {
      return res.status(500).json({ error: 'internal server error', status: error });
    }
  },

  changeParcelLocation: async (req, res) => {
    try {
      const foundParcel = await Parcel.getById(req.params.parcelId)
      if (!foundParcel) {
        return res.status(404).json({ error: 'parcel not found' });
      }
      if (foundParcel.status === 'delivered') {
        return res.status(401).json({ error: 'parcel has already been delivered' });
      }
      const updatedParcel = await Parcel.update({ pickupLocation: req.body.pickupLocation }, req.params.parcelId);
      return res.status(200).json(updatedParcel);
    } catch (error) {
      return res.status(500).json({ error: 'internal server error', stack: error });
    }
  },

  changeParcelDestination: async (req, res) => {
    try {
      const foundParcel = await Parcel.getById(req.params.parcelId);
      console.log(foundParcel);
      if (!foundParcel) {
        return res.status(404).json({ error: 'parcel not found' });
      }
      if (foundParcel.status === 'delivered') {
        return res.status(401).json({ error: 'parcel has already been delivered' });
      }
      const updatedParcel = await Parcel.update({deliveryLocation: req.body.deliveryLocation }, req.params.parcelId);
      return res.status(200).json(updatedParcel);
    } catch (error) {
      return res.status(500).json({ error: 'internal server error', stack: error })
    }
  },

  getAllParcels: async (req, res) => {
    try {
      const parcels = await Parcel.getAllParcels();
      return res.status(200).json(parcels);
    } catch (error) {
      return res.status(500).json({ error: 'internal server error', stack: error })
    }
  },
};

export default parcelController;
