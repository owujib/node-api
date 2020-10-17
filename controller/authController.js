const jwt = require('jsonwebtoken');

require('dotenv').config();
const User = require('../models/UserModel');
const AppError = require('../utils/appError');

exports.register = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      status: 'success',
      message: user,
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    /**check if user exists */
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(new AppError('User does not exists please register', 400));
    }

    /**check for correct password */
    if (!(await user.correctPassword(req.body.password, user.password))) {
      return next(new AppError('incorrect credentials', 400));
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
};

exports.isAuth = async (req, res, next) => {
  try {
    let token = req.header('auth_token');
    if (!token) {
      return next(new AppError('User is not authorized please login', 403));
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById({ _id: verified.id });
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    const user = await User.findById({ _id: req.user._id }).select('password'); //you can exclude or include document fields to exclude use the minus sign -password
    if (
      !(await user.correctPassword(req.body.currentpassword, user.password))
    ) {
      return next(new AppError('you current password is wrong', 401));
    }

    user.password = req.body.password;

    await user.save();
    return res.status(201).json({
      status: 'success',
      message: user,
    });
  } catch (error) {
    next(error);
  }
};
