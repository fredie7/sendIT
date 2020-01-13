import express from 'express';
import authController from '../controllers/auth';
import validate from '../validator';

const router = express.Router();

const { signinValidator, signupValidator } = validate;
const { signup, signin } = authController;

router.post('/signup', signupValidator, signup);
router.post('/signin', signinValidator, signin);

module.exports = router;
