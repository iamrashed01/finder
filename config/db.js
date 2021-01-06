const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect('mongodb://localhost/finder', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log('MongoDB server successfully connected');
    })
    .catch((ex) => {
      console.log('MongoDB server couldn\'t connected');
      console.error(ex.message);
      process.exit(1);
    });
};
