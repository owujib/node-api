const express = require('express');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const authController = require('../controller/authController');
const userController = require('../controller/userController');

const router = express.Router();

router.post('/register', authController.register);

router.post('/login', authController.login);

router.post('/:id/cart', authController.isAuth, userController.addCart);

router.get('/profile', authController.isAuth, userController.userProfile);

/** authorization */

module.exports = router;
