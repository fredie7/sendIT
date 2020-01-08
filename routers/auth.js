import authController from '../controllers/auth';

const express = require('express');

const router = express.Router();

// const { signup, signin } = require('../controllers/auth')
const { signup, signin } = authController;

router.post('/signup', signup);
router.post('/signin', signin);

module.exports = router;
