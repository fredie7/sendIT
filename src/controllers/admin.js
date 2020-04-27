import bcrypt from 'bcryptjs'
import User from '../models/User';
import Parcel from '../models/Parcel';
import Admin from '../models/admin';
import hashPassword from '../services/hash';

const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtWxpiryTime = 3600;

const adminController = {
  adminSignup: async (req, res) => {
    const existingAdmin = await Admin.getByField('email', req.body.email);
    console.log(existingAdmin)
    console.log(req.body)
    if (existingAdmin) {
      return res.status(401).json({ error: 'admin already exists' });
    }
    const newAdmin = await Admin.create({ ...req.body, password: hashPassword(req.body.password) });
    return res.status(201).json(newAdmin);
  },

  adminSignin: async (req, res) => {
    const { email, password } = req.body;
    const existingAdmin = await Admin.getByField('email', email);
    const isCorrectPassword = existingAdmin && bcrypt.compareSync(password, existingAdmin.password);
    if (!isCorrectPassword) {
      return res.status(401).json({ error: 'admin do not exist' });
    }
    const { id } = existingAdmin;
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: jwtWxpiryTime,
    });
    return res.status(200).json({ token, id });
  },

  getAllParcels: async (req, res) => {
    try {
      const parcels = await Admin.getAllParcels();
      return res.status(200).json(parcels);
    } catch (error) {
      return res.status(500).json({ error: 'internal server error' });
    }
  },
  getDeliveredParcels: async (req, res) => {
    try {
      const parcels = await Admin.getAllDeliveredParcels();
      return res.status(200).json(parcels);
    } catch (error) {
      return res.status(500).json({ error: 'internal server error' });
    }
  },
  getPendingOrders: async (req, res) => {
    try {
      const parcels = await Admin.getAllPendingOrders();
      return res.status(200).json(parcels);
    } catch (error) {
      return res.status(500).json({ error: 'internal server error' });
    }
  },
  getCanceledOrders: async (req, res) => {
    try {
      const parcels = await Admin.getAllCancelledOrders();
      return res.status(200).json(parcels);
    } catch (error) {
      return res.status(500).json({ error: 'internal server error' });
    }
  },
};

export default adminController;
