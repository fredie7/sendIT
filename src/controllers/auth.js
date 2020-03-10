import uuidV4 from 'uuid/v4';
// import data from '../data/users';
import User from '../models/User';

const jwt = require('jsonwebtoken');
require('dotenv').config()

const jwtExpiryTime = 3600;

const authController = {
  signup: async (req, res) => {
    const existingUser = await User.getByField('email', req.body.email);
    if (existingUser) {
      return res.status(401).json({ error: 'user already exists' });
    }
    const newUser = await User.create(req.body);
    return res.status(201).json(newUser);
  },

  signin: (req, res) => {
    // const existingUser = data.find((user) => user.email === req.body.email && user.password === req.body.password);
    const { email, password } = req.body;
    const existingUser = User.checkCredentials(email, password);
    if (!existingUser) {
      return res.status(401).json({ error: 'user does not exist' });
    }
    const { id } = existingUser;
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: jwtExpiryTime,
    });
    return res.status(200).json({ token });
  },
};
export default authController;
