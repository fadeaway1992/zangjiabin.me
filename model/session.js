const mongoose = require('mongoose')

// Session
const SessionSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  access_token: {
    type: String,
    unique: true,
    required: true
  },
  expiry: {
    type: Date,
    required: true
  }
})

const SessionModel = mongoose.model('Session', SessionSchema, 'sessions')

module.exports = SessionModel