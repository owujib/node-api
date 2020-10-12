const User = require('../models/UserModel');
const Product = require('../models/ProductModel');

exports.userProfile = async (req, res, next) => {
  res.status(200).json(req.user);
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
