const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true, 'please provide a name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'please provide an email'],
    unique: [true, 'email alread taken'],
    trim: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    min: 8,
    max: 15,
    required: [true, 'please provide a password'],
  },
  cart: {
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  createdAt: {
    type: Date,
    defualt: Date.now(),
  },
});

userSchema.pre('save', async function (next) {
  try {
    this.password = await bcrypt.hash(this.password, 12);
  } catch (error) {
    next(error);
  }
});

userSchema.methods.addToCart = function (product) {
  /**Check if any product exist in my cart if not return -1*/
  const cartItemIndex = this.cart.items.findIndex((cart) => {
    return cart.product._id.toString() === product._id.toString();
  });
  console.log(cartItemIndex);

  /**add 1 to qty */
  let newQuantity = 1;
  const updateCartItems = [...this.cart.items];
  console.log('updateCart', updateCartItems);

  if (cartItemIndex >= 0) {
    console.log(cartItemIndex);
    newQuantity = this.cart.items[cartItemIndex].quantity + 1;
    updateCartItems[cartItemIndex].quantity = newQuantity;
  } else {
    updateCartItems.push({
      product,
      quantity: newQuantity,
    });
  }
  const updatedCart = {
    items: updateCartItems,
  };
  this.cart = updatedCart;

  return this.save();
};

userSchema.methods.correctPassword = async function (
  inputPassword,
  userPassword
) {
  return bcrypt.compare(inputPassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
