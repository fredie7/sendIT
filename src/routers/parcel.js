import express from 'express';
import parcelController from '../controllers/parcel';
import verifyToken, { verifyAsAdmin, verifyAsOwner } from '../middlewares/auth';
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
  getAllUserParcels,
  getDeliveredParcels,
  getPendingOrders,
} = parcelController;


const router = express.Router();

router.post('/parcels', verifyToken, createParcelValidation, createParcel);
router.put('/parcels/:parcelId', verifyToken, editParcelValidation, editParcel);
router.get('/parcels/:parcelId', verifyToken, getOneParcel);
router.put('/parcels/:parcelId/cancel', verifyToken, verifyAsOwner, cancelParcelOrder);
router.put('/parcels/:parcelId/changeLocation', verifyToken, verifyAsAdmin, parcelLocationValidation, changeParcelLocation);
router.put('/parcels/:parcelId/destination', verifyToken, verifyAsOwner, parceDestinationlValidation, changeParcelDestination);
router.get('/parcels', verifyToken, getAllUserParcels);
router.get('/parcels/delivered', verifyToken, getDeliveredParcels);
router.get('/parcels/pending', verifyToken, getPendingOrders);


module.exports = router;
