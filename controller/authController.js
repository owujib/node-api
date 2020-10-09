const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
require('dotenv').config();

exports.isAuth = async (req, res, next) => {
  try {
    let token = req.header('auth_token');
    if (!token) {
      return next(new Error('User is not authorized please login'));
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById({ _id: verified.id });
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
