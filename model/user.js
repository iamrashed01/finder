const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    provider: String,
    googleId: String,
    googleEmail: {
      type: String,
      trim: true,
    },
    facebookId: String,
    facebookEmail: {
      type: String,
      trim: true,
    },
    name: {
      type: String,
      min: 3,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    phone: {
      type: Number,
      trim: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
    },
  },
  { timestamps: true },
);

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      isVerified: this.isVerified,
      email: this.email,
    },
    process.env.JWT_PRIVATE_KEY,
    { expiresIn: "7d" },
  );
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
