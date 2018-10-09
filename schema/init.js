var mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/myapp')

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))

db.once('open', function() {
  const Schema = mongoose.Schema

  // User
  const UserSchema = new Schema({
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

  const UserModel = mongoose.model('User', UserSchema)

  const UserInstance = new UserModel({"username" : "zangjiabin", "password" : "$2a$10$2KWjZI91cX.U5uQFqRLx5eB9DAXWog1qYjv/WwJlXsSqRdkH71x0O", "role" : "admin"})

  UserInstance.save(function (err, doc) {
    if (err) {
      console.log(err)
    } else {
      console.log(doc)
    }
  })

  // Session
  const SessionSchema = new Schema({
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

  const SessionModel = mongoose.model('Session', SessionSchema)

  // Post
  const PostSchema = new Schema({
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

  const PostModel = mongoose.model('Post', PostSchema)
})