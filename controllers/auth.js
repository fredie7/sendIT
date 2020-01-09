import data from '../data/users';

const JWT = require('jsonwebtoken');
const bycrypt = require('bcryptjs')
require ('dotenv').config();

const { newID } = '../helpers/helper';

const authController = {
  signup: (req, res) => {
    const { name, email, password } = req.body;
    const id = newID;
    const userExists = data.find((info) => info.id === id);
    if (!userExists) {
      data.push(req.body);
      res.status(201).json({ message: 'you are now signed up' });
    } else {
      res.status(400).json({ error: 'user already exists' });
    }
  },
};
export default authController;
