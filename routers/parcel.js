import express from 'express';
import authController from '../controllers/auth';

const router = express.Router();

router.post('/protected', authController.verifyToken, (req, res) => {
  return res.status(200).send(req.decoded);
});

module.exports = router;
