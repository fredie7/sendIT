import data from '../data/users';

const jwt = require('jsonwebtoken');
const jwtSecretKey = require('dotenv').config();

const jwtExpiryTime = 300;

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
    const userExists = data.find((user) => user.email === newUser.email);
    if (!userExists) {
      data.push(newUser);
      res.status(201).json(newUser);
    } else {
      res.status(400).json({ error: 'user already exists' });
    }
  },

  signin: (req, res) => {
    const incomingUser = {
      email: req.body.email,
      password: req.body.password,
    };
    const { email } = incomingUser;
    const existingUser = data.find((user) => incomingUser.email === user.email);
    if (existingUser) {
      res.status(200).json({ message: 'user exists' });
      const token = jwt.sign({ email }, jwtSecretKey, {
        expiresIn: jwtExpiryTime,
      })
      res.cookie('token', token, { maxAge: jwtExpiryTime * 1000 });
      res.end();
    } else {
      res.status(400).json({ error: 'user does not exist' });
    }
  }
};
export default authController;
