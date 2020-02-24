import uuidV4 from 'uuid/v4';
import data from '../data/users';

const jwt = require('jsonwebtoken');
require('dotenv').config()

const jwtExpiryTime = 3600;

const authController = {
  signup: (req, res) => {
    const existingUser = data.find((user) => user.email === req.body.email);
    if (existingUser) {
      return res.status(401).json({ error: 'user already exists' });
    }
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      id: uuidV4(),
    };
    data.push(newUser);
    return res.status(201).json(newUser);
  },

  signin: (req, res) => {
    const existingUser = data.find((user) => user.email === req.body.email && user.password === req.body.password);
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
