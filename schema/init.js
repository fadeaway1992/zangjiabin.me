var mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/myapp')

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))

db.once('open', function() {
  const Schema = mongoose.Schema

  const UserSchema = new Schema({
    username: String,
    password: String,
    role: String
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
})