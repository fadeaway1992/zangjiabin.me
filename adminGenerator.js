var bcrypt = require('bcryptjs')
var salt = bcrypt.genSaltSync(10)
var hash = bcrypt.hashSync('fq_690513', salt)

console.log(hash)

db.userscollection.insert({"username":"zangjiabin", "password":"$2a$10$2KWjZI91cX.U5uQFqRLx5eB9DAXWog1qYjv/WwJlXsSqRdkH71x0O", "role":"admin"})