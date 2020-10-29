const multer = require('multer');
const Product = require('../models/ProductModel');

exports.productList = async (req, res, next) => {
  try {
    const product = await Product.find();
    res.status(200).json({
      status: 'success',
      result: product.length,
      message: product,
    });
  } catch (error) {
    next(error);
  }
};
exports.singleProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      message: product,
    });
  } catch (error) {
    next(error);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    console.log(req.file);
    const product = await Product.create(req.body);
    res.status(201).json({
      status: 'success',
      message: product,
    });
    res.send(req.file);
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    res.status(201).json({
      status: 'success',
      message: product,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteProduct = (req, res) => {
  res.send('home');
};
