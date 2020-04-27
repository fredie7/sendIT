import express from 'express';
import userController from '../controllers/user';
import verifyToken from '../middlewares/auth';

const router = express.Router();

const { getUserProfile } = userController;

router.get('/users/:userId', verifyToken, getUserProfile);

module.exports = router;
