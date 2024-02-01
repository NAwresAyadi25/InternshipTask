// db.js
const mongoose = require('mongoose');
//change the url by ur mongodbURL
mongoose.connect('mongodb://localhost:27017/studenty', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

module.exports = mongoose;

