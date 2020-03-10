import uuidV4 from 'uuid/v4';
import parcels from '../data/parcels';
import Parcel from '../models/Parcel';


const parcelController = {
  createParcel: async (req, res) => {
    const newParcel = await Parcel.create(req.body);
    res.status(201).json(newParcel);
  },

  editParcel: ((req, res) => {
    const foundParcel = parcels.find((parcel) => parcel.id === req.params.parcelId);
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
    const parcelIndex = parcels.indexOf(foundParcel);
    parcels.splice(parcelIndex, 1, updatedParcel);
    return res.status(200).json(updatedParcel);
  }),

  getOneParcel: async (req, res) => {
    const foundParcel = await Parcel.getOneParcel(req.body.id);
    if (!foundParcel) {
      return res.status(404).json({ error: 'parcel not found' });
    }
    return res.status(200).json(foundParcel);
  },

  cancelParcelOrder: ((req, res) => {
    const foundParcel = parcels.find((parcel) => parcel.id === req.params.parcelId);
    console.log(foundParcel)
    if (!foundParcel) {
      return res.status(404).json({ error: 'parcel not found' });
    }

    if (foundParcel.status === 'delivered') {
      return res.status(401).json({ error: 'parcel has already been delivered' });
    }
    const updatedParcel = {
      ...foundParcel,
      status: 'cancelled',
    };
    const parcelIndex = parcels.indexOf(foundParcel);
    parcels.splice(parcelIndex, 1, updatedParcel);
    return res.status(200).json(updatedParcel);
  }),

  changeParcelLocation: ((req, res) => {
    const foundParcel = parcels.find((parcel) => parcel.id === req.params.parcelId)
    if (!foundParcel) {
      return res.status(404).json({ error: 'parcel not found' })
    }
    const updatedParcel = {
      ...foundParcel,
      presentLocation: req.body.presentLocation,
    }
    const parcelIndex = parcels.indexOf(foundParcel);
    parcels.splice(parcelIndex, 1, updatedParcel)
    return res.status(200).json(updatedParcel);
  }),

  changeParcelDestination: ((req, res) => {
    const foundParcel = parcels.find((parcel) => parcel.id === req.params.parcelId);
    if (!foundParcel) {
      return res.status(404).json({ error: 'parcel not found' });
    }
    const updatedParcel = {
      ...foundParcel,
      deliveryLocation: req.body.deliveryLocation,
    };
    const parcelIndex = parcels.indexOf(foundParcel);
    parcels.splice(parcelIndex, 1, updatedParcel);
    return res.status(200).json(updatedParcel);
  }),

  getAllParcels: ((req, res) => {
    return res.status(200).json(parcels);
  }),

};

export default parcelController;
