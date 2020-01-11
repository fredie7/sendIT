import express from 'express';
import authController from '../controllers/auth';

const router = express.Router();

const { signup, signin } = authController;

router.post('/signup', signup);
router.post('/signin', signin);

module.exports = router;
