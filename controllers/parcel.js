import parcelData from '../data/parcelData';

const newParcelId = () => {
  let id;
  if (parcelData.length > 0) {
    id = parcelData[parcelData.length - 1].id + 1;
  } else {
    id = 1;
  }
  return id;
};

const parcelController = {
  createParcel: ((req, res) => {
    const parcelExists = parcelData.find((parcel) => parcel.receiverEmail === req.body.receiverEmail);
    if (parcelExists) {
      return res.status(401).json({mesage: 'parcel already exists'});
    }
    const newParcel = {
      pickuplocation: req.body.pickuplocation,
      deliveryLocation: req.body.deliveryLocation,
      presentLocation: req.body.presentLocation,
      receiverPhone: req.body.receiverPhone,
      receiverEmail: req.body.receiverEmail,
      parcelDescription: req.body.parcelDescription,
      parcelWeight: req.body.parcelWeight,
      id: newParcelId(),
    };
    parcelData.push(newParcel);
    res.status(201).json(newParcel);
  }),
};

export default parcelController;
