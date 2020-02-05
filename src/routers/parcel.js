import express from 'express';
import parcelController from '../controllers/parcel';
import middlewares from '../middlewares/auth';
import parcelValidation from '../middlewares/validations/parcelValidation';

const { createParcelValidation } = parcelValidation;
const { verifyToken } = middlewares;
const { createParcel, editParcel } = parcelController;


const router = express.Router();

router.post('/parcels', createParcelValidation, verifyToken, createParcel);
router.put('/parcels/:parcelsID', editParcel);


module.exports = router;
