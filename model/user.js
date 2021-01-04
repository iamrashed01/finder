const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    min: 3,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationCode: {
    type: String,
  },
}, { timestamps: true });

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({
    _id: this._id,
    isVerified: this.isVerified,
    email: this.email,
  }, process.env.JWT_PRIVATE_KEY);
  return token;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
