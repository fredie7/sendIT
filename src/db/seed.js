import dotenv from 'dotenv';
import User from '../models/User';
import Admin from '../models/admin'
import Parcel from '../models/Parcel';
import hashPassword from '../services/hash';

dotenv.config();

const seedDatabase = async () => {
  const users = [
    {
      name: 'gabby',
      email: 'gabby@gmail.com',
      password: hashPassword('gabbypassword'),
      isAdmin: true,
    },
    {
      name: 'tarik',
      email: 'tarik@gmail.com',
      password: hashPassword('tarikpassword'),
      isAdmin: true,
    },
    {
      name: 'jizael',
      email: 'jizael@gmail.com',
      password: hashPassword('jizaelpassword'),
      isAdmin: true,
    },
  ];

  const seedUsers = users.map(async (userData) => {
    const newUser = await User.create(userData);
    return newUser;
  });
  const insertedUsers = await Promise.all(seedUsers);
  console.log(insertedUsers);

  const admins = [
    {
      name: 'kabby',
      email: 'kabby@gmail.com',
      password: hashPassword('kabbypassword'),
    },
    {
      name: 'karik',
      email: 'karik@gmail.com',
      password: hashPassword('karikpassword'),
    },
    {
      name: 'kizael',
      email: 'kizael@gmail.com',
      password: hashPassword('kizaelpassword'),
    },
  ];

  const seedAdmins = admins.map(async (adminData) => {
    const newAdmin = await Admin.create(adminData);
    return newAdmin;
  });
  const insertedAdmins = await Promise.all(seedAdmins);
  console.log(insertedAdmins);

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
      status: 'pending',
    },
  ];

  const seedParcels = parcels.map(async (parcelData) => {
    const newParcel = await Parcel.create(parcelData);
    return newParcel;
  });
  const insertedParcels = await Promise.all(seedParcels);
  console.log(insertedParcels);
};
export default seedDatabase;
