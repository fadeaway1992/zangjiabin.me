const mongoose = require('mongoose')

// User
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String
  }
})

const UserModel = mongoose.model('User', UserSchema, 'users')

module.exports = UserModel

