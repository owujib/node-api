const express = require('express');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const User = require('../models/UserModel');

const router = express.Router();

router.post('/register', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      status: 'success',
      message: user,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    /**check if user exists */
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(new Error('User does not exists please register'));
    }

    /**check for correct password */
    if (!(await user.correctPassword(req.body.password, user.password))) {
      return next(new Error('incorrect credentials'));
    }

    /**send auth token */
    let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.header('auth_token', token).status(200).json({
      status: 'success',
      message: { user, token },
    });
  } catch (error) {
    next(error);
  }
});

/** authorization */

module.exports = router;
