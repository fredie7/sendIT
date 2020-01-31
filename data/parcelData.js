import uuidV4 from 'uuid/v4';

const parcelData = [
  {
    id: 1,
    createdBy: uuidV4(),
    pickupLocation: 'ikeja',
    deliveryLocation: 'maryland',
    presentLocation: 'ogba',
    receiverPhone: '08076543245',
    receiverEmail: 'john@gmail.com',
    description: 'john dummy desc desc',
    weight: '12',
  },
  {
    id: 2,
    createdBy: uuidV4(),
    pickupLocation: 'abuja',
    deliveryLocation: 'fct',
    presentLocation: 'agege',
    receiverPhone: '08038374245',
    receiverEmail: 'susan@gmail.com',
    description: 'susan dummy desc desc',
    weight: '16',
  },
  {
    id: 3,
    createdBy: uuidV4(),
    pickupLocation: 'delta',
    deliveryLocation: 'asaba',
    presentLocation: 'yaba',
    receiverPhone: '08092647589',
    receiverEmail: 'peter@gmail.com',
    description: 'peter dummy desc desc',
    weight: '12',
  },
];

export default parcelData;