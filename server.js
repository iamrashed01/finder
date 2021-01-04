const morgan = require('morgan');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
require('express-async-errors');

const upload = multer();
require('dotenv').config();

const app = express();
const connectDB = require('./config/db');

// initialize middleware
app.use(cors());
app.use(express.json({ extended: true }));
app.use(morgan('dev'));

// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static('public'));

// general routes
app.use('/api/user', require('./routes/user'));
app.use('/api/auth', require('./routes/auth'));

// error handling
app.use((err, req, res, next) => {
  // here will log the errors
  res.status(500).send('Something failed.');
});

// set port
const port = process.env.PORT || 5000;

// app listener
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
  // connect to mongo DB
  connectDB();
});
