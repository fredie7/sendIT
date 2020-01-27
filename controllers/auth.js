import data from '../data/users';

const jwt = require('jsonwebtoken');

const jwtSecretKey = 'dvhdvhdv887dbnbd';

const jwtExpiryTime = 36000;

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
      return res.status(401).json({ error: 'user already exists' });
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
    const existingUser = data.find((user) => user.email === req.body.email && user.password === req.body.password);
    if (!existingUser) {
      return res.status(401).json({ error: 'user does not exist' });
    }
    const { id } = existingUser;
    const token = jwt.sign({ id }, jwtSecretKey, {
      expiresIn: jwtExpiryTime,
    });
    return res.status(200).json({ token });
  },

  verifyToken: (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(403).json({ error: 'user unauthorized' });
    }
    jwt.verify(token, jwtSecretKey, (err, authData) => {
      if (err) {
        return res.status(403).json({ error: 'unauthorized' });
      }
      req.decoded = authData;
      next();
    });
  },

};
export default authController;
