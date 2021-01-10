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
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// initialize passport for OAuth2
app.use(passport.initialize());
app.use(passport.session());
require('./services/googleStrategy');

// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static('public'));

// rutes for oAuth
app.use('/auth/google', require('./routes/googleAuth'));
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
