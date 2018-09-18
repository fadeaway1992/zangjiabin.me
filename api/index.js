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
      res.sendStatus(500)
    } else {
      if (!cursor.length) {
        res.status(422).json({error: {code: '001', message: '用户名不存在'}})
      } else {
        var validation = bcrypt.compareSync(password, cursor[0].password); // 验证密码
        if(!validation) {
          res.status(422).json({error: {code: '002', message: '密码错误'}})
        } else {
          req.session.user = {
            name: username
          }
          res.send('登录成功')
        }
      }
    }
  })
})

module.exports = router