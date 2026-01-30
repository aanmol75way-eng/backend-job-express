const mongoose = require('mongoose');

const userAuthSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  userEmail: {   // fixed typo
    type: String,
    required: true,
    unique: true, // ensures no duplicate emails
  },
  userPassword: {
    type: String,
    required: true,
  },
});

const userAuthModel = mongoose.model('userAuth', userAuthSchema);

module.exports = { userAuthModel };
