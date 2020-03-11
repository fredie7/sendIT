import uuidV4 from 'uuid/v4';
// import parcels from '../data/parcels';
import Parcel from '../models/Parcel';
import db from '../db';


const parcelController = {
  createParcel: async (req, res) => {
    const newParcel = await Parcel.create(req.body);
    res.status(201).json(newParcel);
  },

  editParcel: async (req, res) => {
    const foundParcel = Parcel.editOrder(req.body, req.params.parcelId)
    if (!foundParcel) {
      return res.status(404).json({ error: 'parcel not found' });
    }
    const updatedParcel = {
      ...foundParcel,
      pickupLocation: req.body.pickupLocation || foundParcel.pickupLocation,
      deliveryLocation: req.body.deliveryLocation || foundParcel.deliveryLocation,
      presentLocation: req.body.presentLocation || foundParcel.presentLocation,
      receiverPhone: req.body.receiverPhone || foundParcel.receiverPhone,
      receiverEmail: req.body.receiverEmail || foundParcel.receiverEmail,
      description: req.body.description || foundParcel.description,
      weight: req.body.weight || foundParcel.weight,
      updatedAt: new Date(),
    };
    return res.status(200).json(updatedParcel);
  },

  getOneParcel: async (req, res) => {
    const foundParcel = await Parcel.getOneParcel(req.params.parcelId);
    if (!foundParcel) {
      return res.status(404).json({ error: 'parcel not found' });
    }
    return res.status(200).json(foundParcel);
  },

  cancelParcelOrder: async (req, res) => {
    const foundParcel = await Parcel.cancelOrder(req.body.status, req.params.parcelId);
    console.log(foundParcel)
    if (!foundParcel) {
      return res.status(404).json({ error: 'parcel not found' });
    }
    if (foundParcel.status === 'delivered') {
      return res.status(401).json({ error: 'parcel has already been delivered' });
    }
    res.status(200).json(foundParcel);
  },

  changeParcelLocation: async (req, res) => {
    const foundParcel = await Parcel.parcelLocation(req.body.pickupLocation, req.params.parcelId);
    if (!foundParcel) {
      return res.status(404).json({ error: 'parcel not found' });
    }
    return res.status(200).json(foundParcel);
  },

  changeParcelDestination: async (req, res) => {
    const foundParcel = await Parcel.parcelDestination(req.body.deliveryLocation, req.params.parcelId);
    if (!foundParcel) {
      return res.status(404).json({ error: 'parcel not found' });
    }
    return res.status(200).json(foundParcel);
  },

  getAllParcels: async (req, res) => {
    const parcels = await Parcel.getAllParcels();
    console.log(parcels)
    return res.status(200).json(parcels);
  },

};

export default parcelController;
