import express from 'express';
import authController from '../controllers/auth';
import validator from '../validator';

const router = express.Router();

const { signinValidator, signupValidator } = validator;
const { signup, signin, verifyUser } = authController;

router.post('/signup', signupValidator, signup);
router.post('/signin', signinValidator, verifyUser, signin);

module.exports = router;
