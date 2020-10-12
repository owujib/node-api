const mongoose = require('mongoose');
const app = require('./app');
require('dotenv').config();

/**database server */
mongoose
  .connect(process.env.MONGO_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('database is connected ');
  })
  .catch((err) => console.log(err));

const port = 4000;

app.listen(port, () => {
  console.log(`app is listening on ${port}`);
});
