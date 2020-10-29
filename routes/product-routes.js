const express = require('express');
const Product = require('../models/ProductModel');
const authController = require('../controller/authController');
const productController = require('../controller/productController');
const multer = require('multer');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/product-img/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.jpg' || ext !== '.png' || ext !== '.jfif') {
      return cb(
        res.staus(400).end('only jpg, png and jfif are allowed'),
        false
      );
    }
    cb(null, true);
  },
});

const upload = multer({ storage }).single('image');

router.get('/product-list', productController.productList);
router.get('/:id', productController.singleProduct);

router.post('/create-product', productController.createProduct);

router.patch('/:id/update-product', productController.updateProduct);

router.patch('/:id/upload-img', upload, async (req, res, next) => {
  console.log(req.file);
  const product = await Product.findByIdAndUpdate(
    { _id: req.params.id },
    { productImg: `/uploads/product-img/${req.file.filename}` },
    { new: true }
  );

  res.status(201).json({
    status: 'success',
    message: product,
  });
});

router.delete('/delete-product', productController.deleteProduct);

module.exports = router;
