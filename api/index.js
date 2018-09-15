var express = require('express')
var router = express.Router()
var bcrypt = require('bcryptjs')
var multer  = require('multer')
var upload = multer()

// log in
router.post('/login', upload.none(), function (req, res, next) {
  var db = req.db
  var username = req.body.username
  var password = req.body.password
  db.collection('userscollection').find({"role": "admin", "username": username}, {_id: 0, role: 0}, function(err, cursor){
    if (err) {
      res.send('500 error')
    } else {
      if (!cursor.length) {
        res.send('用户名不存在')
      } else {
        var validation = bcrypt.compareSync(password, cursor[0].password); // 验证密码
        if(!validation) {
          res.send('密码错误')
        } else {
          res.send('登录成功')
        }
      }
    }
  })
})

module.exports = router