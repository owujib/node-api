const express = require('express');
const mongoose = require('mongoose');

const productRoutes = require('./routes/product-routes');
const userRoutes = require('./routes/user-routes');

const app = express();

/**middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**Product routes */
app.use('/api/product', productRoutes);

/**User routes */
app.use('/api/user', userRoutes);

/**database server */
mongoose
  .connect('mongodb://localhost:27017/expressCommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('database is connected ');
  })
  .catch((err) => console.log(err));

const port = 4000;
app.listen(4000, () => {
  console.log(`app is listening on ${port}`);
});
