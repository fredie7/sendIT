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
};

export default parcelController;
