import uuidV4 from 'uuid/v4';
import parcels from '../data/parcelData';

const parcelController = {
  createParcel: ((req, res) => {
    const newParcel = {
      id: uuidV4(),
      createdBy: req.decoded.id,
      pickupLocation: req.body.pickupLocation,
      deliveryLocation: req.body.deliveryLocation,
      presentLocation: req.body.presentLocation,
      receiverPhone: req.body.receiverPhone,
      receiverEmail: req.body.receiverEmail,
      description: req.body.description,
      weight: req.body.weight,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'pending',
    };
    parcels.push(newParcel);
    res.status(201).json(newParcel);
  }),

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
      status: 'pending',
    };
    const parcelIndex = parcels.indexOf(foundParcel);
    parcels.splice(parcelIndex, 1, updatedParcel);
    return res.status(200).json(updatedParcel);
  }),

  getOneParcel: ((req, res) => {
    const parcel = parcels.find((parcel) => parcel.id === req.params.parcelId);
    if (!parcel) {
      return res.status(404).json({ error: 'parcel not found' });
    }
    return res.status(200).json(parcel);
  }),

  cancelParcelOrder: ((req, res) => {
    const newParcel = {
      id: uuidV4(),
      createdBy: req.decoded.id,
      pickupLocation: req.body.pickupLocation,
      deliveryLocation: req.body.deliveryLocation,
      presentLocation: req.body.presentLocation,
      receiverPhone: req.body.receiverPhone,
      receiverEmail: req.body.receiverEmail,
      description: req.body.description,
      weight: req.body.weight,
    };
    parcels.push(newParcel);

    const foundParcel = parcels.find(parcel => parcel.id === newParcel.id);
  
    if (!foundParcel) {
      return res.status(404).json({error: 'parcel not found'});
    }
    return res.json({ message: 'parcel order cancelled' });
    // check that the order exists
    const orderExists = parcels.find((order) => order.id === req.params.parcelId);
    const updatedParcel = {
      ...orderExists,
      pickupLocation: req.body.pickupLocation || orderExists.pickupLocation,
      deliveryLocation: req.body.deliveryLocation || orderExists.deliveryLocation,
      presentLocation: req.body.presentLocation || orderExists.presentLocation,
      receiverPhone: req.body.receiverPhone || orderExists.receiverPhone,
      receiverEmail: req.body.receiverEmail || orderExists.receiverEmail,
      description: req.body.description || orderExists.description,
      weight: req.body.weight || orderExists.weight,
      updatedAt: new Date(),
      status: 'pending',
    };
    // update the status of the order
    if (orderExists) {
      updatedParcel.status = 'cancelled';
    }
    // return the updated order
    const parcelIndex = parcels.indexOf(orderExists);
    parcels.splice(parcelIndex, 1, updatedParcel);
    return res.status(200).json(updatedParcel);
  }),
};

export default parcelController;
