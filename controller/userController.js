const User = require('../models/UserModel');
const Product = require('../models/ProductModel');
const AppError = require('../utils/appError');

const filterObj = (obj, ...allowedFields) => {
  let newObject = {};
  Object.keys(obj).forEach((element) => {
    if (allowedFields.includes(element)) {
      return (newObject[element] = obj[element]);
    }
  });
  return newObject;
};

exports.userProfile = async (req, res, next) => {
  res.status(200).json(req.user);
};

exports.updateUserProfile = async (req, res, next) => {
  try {
    if (req.body.password) {
      return next(
        new AppError(
          'sorry you can not updated your password with this route use the updatepassword route instead',
          400
        )
      );
    }
    const filteredBody = filterObj(req.body, 'fullname', 'email');
    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      filteredBody,
      {
        new: true,
        runValidators: false, //incase you get any validation error while updating a user data
      }
    );
    res.status(201).json({
      status: 'success',
      message: user,
    });
  } catch (error) {
    next(error);
  }
};

exports.addCart = async (req, res, next) => {
  try {
    const productId = req.params.id;
    let product = await Product.findById(productId);

    let cart = await req.user.addToCart(product);
    res.status(201).json({
      status: 'success',
      message: cart,
    });
  } catch (error) {
    next(error);
  }
};
