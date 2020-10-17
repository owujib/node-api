const express = require('express');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const authController = require('../controller/authController');
const userController = require('../controller/userController');

const router = express.Router();

router.post('/register', authController.register);

router.post('/login', authController.login);

router.use(authController.isAuth);
router.post('/:id/cart', userController.addCart);
router.get('/profile', userController.userProfile);
router.patch('/update/profile', userController.updateUserProfile);
router.patch('/update/password', authController.updatePassword);

/** authorization */

module.exports = router;
