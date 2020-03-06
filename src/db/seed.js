import dotenv from 'dotenv';
import UserModel from '../models/users';
import ParcelModel from '../models/parcels';

dotenv.config();

const User = new UserModel();
const Parcel = new ParcelModel();

const seedDatabase = async () => {
  const users = [
    {
      name: 'gabby',
      email: 'gabby@gmail.com',
      password: 'gabbypassword',
    },
    {
      name: 'tarik',
      email: 'tarik@gmail.com',
      password: 'tarikpassword',
    },
    {
      name: 'jizael',
      email: 'jizael@gmail.com',
      password: 'jizaelpassword',
    },
  ];

  const seedUsers = users.map(async (userData) => {
    const newUser = await User.create(userData);
    return newUser;
  })

  const insertedUsers = await Promise.all(seedUsers);

  const parcels = [
    {
      createdBy: insertedUsers[0].id,
      pickupLocation: 'ikeja',
      deliveryLocation: 'maryland',
      presentLocation: 'ogba',
      receiverPhone: '08076543245',
      receiverEmail: 'john@gmail.com',
      description: 'john dummy desc desc',
      weight: '12',
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'delivered',
    },
    {
      createdBy: insertedUsers[0].id,
      pickupLocation: 'abuja',
      deliveryLocation: 'fct',
      presentLocation: 'agege',
      receiverPhone: '08038374245',
      receiverEmail: 'susan@gmail.com',
      description: 'susan dummy desc desc',
      weight: '16',
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'pending',
    },
    {
      createdBy: insertedUsers[0].id,
      pickupLocation: 'delta',
      deliveryLocation: 'asaba',
      presentLocation: 'yaba',
      receiverPhone: '08092647589',
      receiverEmail: 'peter@gmail.com',
      description: 'peter dummy desc desc',
      weight: '12',
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'pending',
    },
  ];
};
export default seedDatabase;
