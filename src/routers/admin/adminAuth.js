import express from 'express';
import adminController from '../../controllers/admin';
import signupValidate from '../../middlewares/validations/signupValidation';
import signinValidate from '../../middlewares/validations/signinValidation';
import verifyToken from '../../middlewares/auth';

const router = express.Router();

const { signupValidator } = signupValidate;
const { signinValidator } = signinValidate;
const {
  adminSignup,
  adminSignin,
  getAllParcels,
  getCanceledOrders,
  getDeliveredParcels,
  getPendingOrders,
} = adminController;

router.post('/signup', adminSignup);
router.post('/signin', signinValidator, adminSignin);

router.get('/parcels', verifyToken, getAllParcels);
router.get('/parcels/cancelled', verifyToken, getCanceledOrders);
router.get('/parcels/delivered', verifyToken, getDeliveredParcels);
router.get('/parcels/pending', verifyToken, getPendingOrders);

module.exports = router;
