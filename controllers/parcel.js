import uuidV4 from 'uuid/v4';
import parcelData from '../data/parcelData';

const parcelController = {
  createParcel: ((req, res) => {
    const parcelExists = parcelData.find((parcel) => parcel.id === req.body.id);
    if (parcelExists) {
      return res.status(401).json({ mesage: 'parcel already exists' });
    }
    const newParcel = {
      createdBy: req.body.createdBy,
      pickupLocation: req.body.pickupLocation,
      deliveryLocation: req.body.deliveryLocation,
      presentLocation: req.body.presentLocation,
      receiverPhone: req.body.receiverPhone,
      receiverEmail: req.body.receiverEmail,
      description: req.body.description,
      weight: req.body.weight,
      id: uuidV4(),
    };
    parcelData.push(newParcel);
    res.status(201).json(newParcel);
  }),
};

export default parcelController;
