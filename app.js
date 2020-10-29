const express = require('express');
const cors = require('cors');

const productRoutes = require('./routes/product-routes');
const userRoutes = require('./routes/user-routes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./utils/errorHandler');

const app = express();

/**middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/uploads', express.static('./uploads'));

/**Product routes */
app.use('/api/product', productRoutes);

/**User routes */
app.use('/api/user', userRoutes);

app.all('*', (req, res, next) => {
  next(new AppError('the given parameter does not match any route', 404));
});

/**global error handler */
app.use(globalErrorHandler);

module.exports = app;
