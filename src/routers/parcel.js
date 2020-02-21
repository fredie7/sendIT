import express from 'express';
import parcelController from '../controllers/parcel';
import verifyToken from '../middlewares/auth';
import parcelValidation from '../middlewares/validations/parcelValidation';

const { 
  createParcelValidation,
  editParcelValidation,
  parceDestinationlValidation,
  parcelLocationValidation,
} = parcelValidation;
const {
  createParcel,
  editParcel,
  getOneParcel,
  cancelParcelOrder,
  changeParcelPresentLocation,
  changeParcelDestination,
} = parcelController;


const router = express.Router();

router.post('/parcels', verifyToken, createParcelValidation, createParcel);
router.put('/parcels/:parcelId', verifyToken, editParcelValidation, editParcel);
router.get('/parcels/:parcelId', verifyToken, getOneParcel);
router.put('/parcels/:parcelId/cancel', cancelParcelOrder);
router.put('/parcels/:parcelId/changeLocation', verifyToken, parcelLocationValidation, changeParcelPresentLocation)
router.put('/parcels/:parcelId/destination', verifyToken, parceDestinationlValidation, changeParcelDestination);


module.exports = router;
