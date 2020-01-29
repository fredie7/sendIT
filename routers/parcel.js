import express from 'express';
import authController from '../controllers/auth';
import parcelController from '../controllers/parcel';

const { createParcel } = parcelController;


const router = express.Router();

router.post('/protected', authController.verifyToken, (req, res) => {
  return res.status(200).send(req.decoded);
});

router.post('/parcel', createParcel);


module.exports = router;
