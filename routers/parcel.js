import express from 'express';
import parcelController from '../controllers/parcel';
import middlewares from '../middlewares/auth';

const { verifyToken } = middlewares;
const { createParcel } = parcelController;


const router = express.Router();

router.post('/parcels', verifyToken, createParcel);


module.exports = router;
