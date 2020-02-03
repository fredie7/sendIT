import users from './users';

const parcelData = [
  {
    id: 1,
    createdBy: users[0].id,
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
    createdBy: users[0].id,
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
    createdBy: users[0].id,
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