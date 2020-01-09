import data from '../data/users';

// const JWT = require('jsonwebtoken');
// const bycrypt = require('bcryptjs')
// require ('dotenv').config();


const newID = () => {
  let id;
  if (data.length > 0) {
    id = data[data.length - 1].id + 1;
  } else {
    id = 1;
  }
  return id;
};

const authController = {
  signup: (req, res) => {
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      id: newID(),
    };
    const userExists = data.find((info) => info.id === newUser.id);
    if (!userExists) {
      data.push(newUser);
      res.status(201).json({ message: 'you are now signed up' });
    } else {
      res.status(400).json({ error: 'user already exists' });
    }
  },
};
export default authController;
