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
  changeParcelLocation,
  changeParcelDestination,
  getAllParcels,
} = parcelController;


const router = express.Router();

router.post('/parcels', verifyToken, createParcelValidation, createParcel);
router.put('/parcels/:parcelId', verifyToken, editParcelValidation, editParcel);
router.get('/parcels/:parcelId', verifyToken, getOneParcel);
router.put('/parcels/:parcelId/cancel', verifyToken, cancelParcelOrder);
router.put('/parcels/:parcelId/changeLocation', verifyToken, parcelLocationValidation, changeParcelLocation)
router.put('/parcels/:parcelId/destination', verifyToken, parceDestinationlValidation, changeParcelDestination);
router.get('/parcels', verifyToken, getAllParcels);


module.exports = router;