import jwt from 'jsonwebtoken';

require('dotenv').config();

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ error: 'user unauthorized' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, authData) => {
    if (err) {
      return res.status(403).json({ error: 'unauthorized' });
    }
    req.decoded = authData;
    next();
  });
}