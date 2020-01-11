import data from '../data/users';

const jwt = require('jsonwebtoken');

const jwtSecretKey = 'dvhdvhdv887dbnbd';

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
    const userExists = data.find((user) => user.email === req.body.email);
    if (userExists) {
      return res.status(400).json({ error: 'user already exists' });
    }
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      id: newID(),
    };
    data.push(newUser);
    return res.status(201).json(newUser);
  },

  signin: (req, res) => {
    const existingUser = data.find((user) => user.email === req.body.email);
    if (!existingUser) {
      return res.status(400).json({ error: 'user does not exist' });
    }
    const { email } = req.body.email;
    const token = jwt.sign({ email }, jwtSecretKey, {
      expiresIn: jwtExpiryTime,
    });
    return res.status(200).json({ token });
  },
};
export default authController;
