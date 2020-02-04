import uuidV4 from 'uuid/v4';
import parcelData from '../data/parcelData';

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
    parcelData.push(newParcel);
    res.status(201).json(newParcel);
  }),

  editParcel: ((req, res) => {
    const foundParcel = parcelData.find((parcel) => parcel.id === parcelData.id);
    console.log(foundParcel)
    if (!foundParcel) {
      return res.status(404).json({ error: 'parcel not found' });
    }
    const newParcel = {
      pickupLocation: req.body.pickupLocation,
      deliveryLocation: req.body.deliveryLocation,
      presentLocation: req.body.presentLocation,
      receiverPhone: req.body.receiverPhone,
      receiverEmail: req.body.receiverEmail,
      description: req.body.description,
      weight: req.body.weight,
    };
    const parcelIndex = parcelData.indexOf(foundParcel);
    const updatedParcel = parcelData.splice(parcelIndex, 1, newParcel);
    return res.status(200).json(updatedParcel);
  }),
};

export default parcelController;
