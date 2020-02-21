import uuidV4 from 'uuid/v4';
import parcels from '../data/parcels';


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
    };
    const parcelIndex = parcels.indexOf(foundParcel);
    parcels.splice(parcelIndex, 1, updatedParcel);
    return res.status(200).json(updatedParcel);
  }),

  getOneParcel: ((req, res) => {
    const foundParcel = parcels.find((parcel) => parcel.id === req.params.parcelId);
    if (!foundParcel) {
      return res.status(404).json({ error: 'parcel not found' });
    }
    return res.status(200).json(foundParcel);
  }),

  cancelParcelOrder: ((req, res) => {
    const foundParcel = parcels.find((parcel) => parcel.id === req.params.id);
    if (!foundParcel) {
      return res.status(404).json({ error: 'parcel not found' });
    }

    if (foundParcel.status === 'delivered') {
      return res.status(401).json({ error: 'can\'t change status. parcel has already been delivered' });
    }

    const updatedParcel = {
      ...foundParcel,
      status: 'cancelled',
    };
    const parcelIndex = parcels.indexOf(foundParcel);
    parcels.splice(parcelIndex, 1, updatedParcel);
    return res.status(200).json(updatedParcel);
  }),

  changeParcelPresentLocation: ((req, res) => {
    const foundParcel = parcels.find((parcel) => parcel.id === req.params.parcelId)
    if (!foundParcel) {
      return res.status(404).json({ error: 'parcel not found' })
    }
    const updatedParcelLocation = {
      ...foundParcel,
      presentLocation: req.body.presentLocation,
    }
    const parcelIndex = parcels.indexOf(foundParcel);
    parcels.splice(parcelIndex, 1, updatedParcelLocation)
    return res.status(200).json(updatedParcelLocation);
  }),

  changeParcelDestination: ((req, res) => {
    const foundParcel = parcels.find((parcel) => parcel.id === req.params.parcelId);
    let updatedDeliveryLocation = { };
    if (!foundParcel) {
      return res.status(404).json({ error: 'parcel not found' });
    }
    updatedDeliveryLocation = {
      ...foundParcel,
      deliveryLocation: req.body.deliveryLocation,
    };
    const parcelIndex = parcels.indexOf(foundParcel);
    parcels.splice(parcelIndex, 1, updatedDeliveryLocation);
    return res.status(200).json(updatedDeliveryLocation);
  }),
};

export default parcelController;
