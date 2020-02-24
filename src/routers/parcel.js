import express from 'express';
import parcelController from '../controllers/parcel';
import { verifyToken } from '../middlewares/auth';
import parcelValidation from '../middlewares/validations/parcelValidation';

const { createParcelValidation, editParcelValidation } = parcelValidation;
const {
  createParcel,
  editParcel,
  getOneParcel,
  cancelParcelOrder,
} = parcelController;

const router = express.Router();

router.post('/parcels', verifyToken, createParcelValidation, createParcel);
router.put('/parcels/:parcelId', verifyToken, editParcelValidation, editParcel);
router.get('/parcels/:parcelId', verifyToken, getOneParcel);
router.put('/parcels/:parcelId/cancel', cancelParcelOrder);

module.exports = router;
