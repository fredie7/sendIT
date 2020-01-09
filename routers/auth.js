import express from 'express';
import authController from '../controllers/auth';

const router = express.Router();

const { signup } = authController;

router.post('/signup', signup);


module.exports = router;
