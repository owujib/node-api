const express = require('express');

const productRoutes = require('./routes/product-routes');
const userRoutes = require('./routes/user-routes');
const AppError = require('./utils/appError');

const app = express();

/**middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/uploads', express.static('./uploads'));

/**Product routes */
app.use('/api/product', productRoutes);

/**User routes */
app.use('/api/user', userRoutes);

app.all('*', (req, res, next) => {
  next(new AppError('the given parameter does not match any route', 404));
});

/**global error handler */
app.use((err, req, res, next) => {
  console.log(err.stack);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'errors';
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
