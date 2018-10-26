const mongoose = require('mongoose')

// Post
const PostSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  author: {
    type: String,
    required: true
  },
  postDate: {
    type: Date,
    required: true
  },
  lastModified: {
    type: Date
  },
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  labels: {
    type: [String],
  }
})

const PostModel = mongoose.model('Post', PostSchema, 'posts')

module.exports = PostModel