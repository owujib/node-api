const express = require('express');
const Product = require('../models/ProductModel');
const authController = require('../controller/authController');

const router = express.Router();

router.use(authController.isAuth);
router.get('/product-list', async (req, res, next) => {
  try {
    console.log(req.user);
    const product = await Product.find();
    res.status(200).json({
      status: 'success',
      result: product.length,
      message: product,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/create-product', async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
      status: 'success',
      message: product,
    });
  } catch (error) {
    next(error);
  }
});
router.patch('/:id/update-product', async (req, res, next) => {
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
});
router.delete('/delete-product', (req, res) => {
  res.send('home');
});

module.exports = router;
