const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const passport = require('passport');
const cookieParser = require('cookie-parser');
require('express-async-errors');

const upload = multer();
require('dotenv').config();

const app = express();
const connectDB = require('./config/db');

// initialize middleware
const loginLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 20, // start blocking after 5 requests
  statusCode: 200,
  message: {
    status: 429, // optional, of course
    limiter: true,
    type: 'error',
    message: 'Too many login attemped from this IP, please try again after an hour',
  },
});
const createLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 2, // start blocking after 5 requests
  statusCode: 200,
  message: {
    status: 429, // optional, of course
    limiter: true,
    type: 'error',
    message: 'Too many accounts created from this IP, please try again after an hour',
  },
});

//  apply to all requests
app.use('/api/auth/login', loginLimiter);
app.use('/api/auth/register', createLimiter);
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// initialize passport for OAuth2
app.use(passport.initialize());
app.use(passport.session());
require('./services/googleStrategy');
require('./services/facebookStrategy');

// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static('public'));

// rutes for oAuth
app.use('/auth/google', require('./routes/googleAuth'));
app.use('/auth/facebook', require('./routes/facebookAuth'));
// general routes
app.use('/api/user', require('./routes/user'));
app.use('/api/auth', require('./routes/auth'));

// error handling
app.use((err, req, res, next) => {
  // here will log the errors
  res.status(500).send('Something failed.');
});

const port = process.env.PORT || 5000;

// app listener
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
  // connect to mongo DB
  connectDB();
});
