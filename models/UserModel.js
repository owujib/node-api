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
});

userSchema.pre('save', async function (next) {
  try {
    this.password = await bcrypt.hash(this.password, 12);
  } catch (error) {
    next(error);
  }
});

userSchema.methods.correctPassword = async function (
  inputPassword,
  userPassword
) {
  return bcrypt.compare(inputPassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
