import express from 'express';
import authController from '../controllers/auth';
import valdidate from '../validator';

const router = express.Router();

const { signinValidator, signupValidator } = valdidate;
const { signup, signin } = authController;

router.post('/signup', signupValidator, signup);
router.post('/signin', signinValidator, signin);

module.exports = router;
