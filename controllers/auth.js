const bcrypt = require('bcrypt');
const _ = require('lodash');
const {
  localRegisterValidation,
  verificationValidation,
  loginValidation,
} = require('../validator/auth');
const User = require('../model/user');
const sendMail = require('../utils/sendMail');

const createUser = async (req, res) => {
  const { error } = localRegisterValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  let user = await User.findOne({ email: req.body.email });
  const code = Math.floor(100000 + Math.random() * 900000);
  const salt = await bcrypt.genSalt(10);

  if (user && !user.isVerified) {
    sendMail(user.email, code);
    user.verificationCode = await bcrypt.hash(code.toString(), salt);
    await user.save();
    return res.status(200).json({
      data: {
        email_status: 0,
        user: null,
      },
      success: true,
      message:
        'user already registered Please check you email to verify your account',
    });
  }

  if (user) {
    return res
      .status(400)
      .json({ success: false, message: 'user already registered' });
  }

  user = await new User(_.pick(req.body, ['name', 'email', 'password']));
  user.password = await bcrypt.hash(user.password, salt);

  user.verificationCode = await bcrypt.hash(code.toString(), salt);

  sendMail(user.email, code);

  await user.save();

  return res.status(200).json({
    data: {
      email_status: 0,
      email: user.email,
      user: null,
    },
    message: 'Please check your email to verify account',
  });
};

const loginUser = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const user = await User.findOne({ email: req.body.email });
  const code = Math.floor(100000 + Math.random() * 900000);
  const salt = await bcrypt.genSalt(10);

  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: 'username or password wrong!' });
  }

  const isPasswordMatch = await bcrypt.compare(
    req.body.password,
    user.password,
  );

  if (!isPasswordMatch) {
    return res
      .status(401)
      .json({ success: false, message: 'username or password wrong!' });
  }

  if (user && !user.isVerified) {
    sendMail(user.email, code);
    user.verificationCode = await bcrypt.hash(code.toString(), salt);
    await user.save();
    const token = user.generateAuthToken();
    return res.status(200).json({
      data: {
        email_status: 0,
        email: user.email,
        user: null,
      },
      auth_token: token,
      success: false,
      message:
        'user already registered Please check you email to verify your account',
    });
  }

  const token = user.generateAuthToken();

  return res
    .status(200)
    .json({ data: user, auth_token: token, message: 'successfully loged in' });
};

const verifyUser = async (req, res) => {
  const { error } = verificationValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: 'Verification failed due to wrong information',
    });
  }

  if (user.isVerified) {
    return res
      .status(400)
      .json({ success: false, message: 'User Already verified' });
  }

  const isMatch = await bcrypt.compare(
    req.body.code.toString(),
    user.verificationCode,
  );
  if (!isMatch) {
    return res.status(400).json({ success: false, message: 'Invalid Code' });
  }

  const token = user.generateAuthToken();

  user.verificationCode = null;
  user.isVerified = true;
  await user.save();

  return res.header('x-auth-token', token).status(200).json({
    success: true,
    email: user.email,
    isVerified: user.isVerified,
    message: 'User successfully verified',
  });
};

const authStatus = async (req, res) => {
  const provider = { google: 'googleId', facebook: 'googleId', email: 'email' };
  const reqProvider = { google: 'id', facebook: 'id', email: 'email' };
  const searchFor = req.user.provider || 'email';

  const serviceId = provider[searchFor];
  const reqId = reqProvider[searchFor];

  console.log(reqId, 'reqId');
  console.log(req.user[reqId], 'req.user[reqId]');
  console.log(serviceId, 'serviceId');

  if (!req.user[reqId]) {
    return res.status(401).json({ data: null, message: 'wrong credential' });
  }
  const user = await User.findOne({ [serviceId]: req.user[reqId] }).select(
    '-createdAt -__v -_id -password',
  );

  console.log(user, 'user==========');

  if (!user) {
    return res.status(401).json({ data: null, message: 'access denied!' });
  }

  return res.status(200).json({
    data: user,
    auth_status: 'in',
    success: true,
    messgae: 'Authurization verifed',
  });
};

module.exports = {
  createUser,
  verifyUser,
  loginUser,
  authStatus,
};
