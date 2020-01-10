import express from 'express';
import authController from '../controllers/auth';

const router = express.Router();

<<<<<<< HEAD
// const { signup, signin } = require('../controllers/auth')
const { signup } = authController;

router.post('/signup', signup);
// router.post('/signin', signin);
=======
const { signup } = authController;

router.post('/signup', signup);

>>>>>>> 486a572847b53e5c524d2c88fc4f3f774a8ea45c

module.exports = router;
