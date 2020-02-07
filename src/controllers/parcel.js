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
    };
    parcels.push(newParcel);
    res.status(201).json(newParcel);
  }),

  editParcel: ((req, res) => {
    // console.log(parcels)
    const foundParcel = parcels.find((parcel) => parcel.id === req.params.parcelId);
    if (!foundParcel) {
      return res.status(404).json({ error: 'parcel not found' });
    }
    const updatedParcel = {
      pickupLocation: req.body.pickupLocation || foundParcel.pickupLocation,
      deliveryLocation: req.body.deliveryLocation || foundParcel.deliveryLocation,
      presentLocation: req.body.presentLocation || foundParcel.presentLocation,
      receiverPhone: req.body.receiverPhone || foundParcel.receiverPhone,
      receiverEmail: req.body.receiverEmail || foundParcel.receiverEmail,
      description: req.body.description || foundParcel.description,
      weight: req.body.weight || foundParcel.weight,
    };
    const parcelIndex = parcels.indexOf(foundParcel);
    const newCollection = parcels.splice(parcelIndex, 1, updatedParcel);
    return res.status(200).json(newCollection);
  }),
};

export default parcelController;
