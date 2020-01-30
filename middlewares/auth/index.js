// import data from '../data/users';

const jwt = require('jsonwebtoken');

const jwtSecretKey = 'dvhdvhdv887dbnbd';

const jwtExpiryTime = 3600;


const middlewares = {
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

export default middlewares;
