import data from '../data/users.json';

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
  signin: (req, res) => {
    const id = newID;
    const { email, password } = req.body;
    data.findOne({ email }, (err, user) => {
      if (err || !user) {
        res.status(401).json({ error: 'user does not exist' });
      }
      const isValidPassword = bycrypt.compareSync(user.password, password);
      if (!isValidPassword) {
        res.status(401).json({ error: 'email and password do no match' });
      }
      const token = JWT.sign({ _id: id }, process.env.JWT.SECRET);
      const { _id,email,name } = user;
      return res.json({ token, user: { _id, email, name } });
    });
  },

  // signin: (req, res) => {
  //   const id = newID;
  //   const { email, password } = req.body;
  //   const user = data.find((info) => info.id === id);
  //   if (user.email !== email && user.password !== password) {
  //     res.status(401).json({ error: 'email and password do no match' });
  //   } else {
  //     const token = JWT.sign({ _id: id }, process.env.JWT.SECRET);
  //     const { _id,email,name } = user;
  //     return res.json({ token, user: { _id, email, name } });
  //   }
  // },
};
export default authController;
