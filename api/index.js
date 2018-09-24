var express = require('express')
var router = express.Router()
var bcrypt = require('bcryptjs')
var multer  = require('multer')
var upload = multer()
const uuidv1 = require('uuid/v1')

var generateNewSession = require('../utils/utils.js').generateNewSession

// log in
router.post('/login', upload.none(), function (req, res, next) {
  var db = req.db
  var username = req.body.username
  var password = req.body.password
  db.get('users').find({"username": username}, {}).then(function(cursor){
    if (!cursor.length) {
      return res.status(422).json({error: {code: '001', message: '用户名不存在'}})
    } else {
      var validation = bcrypt.compareSync(password, cursor[0].password); // 验证密码
      if(!validation) {
        return res.status(422).json({error: {code: '002', message: '密码错误'}})
      } else {
        const sessions = db.get('sessions')
        const role = cursor[0].role
        sessions.find({username}).then((cursor) => {
          const newSession = generateNewSession({username, role})
          function finalAction () {
            res.json({token: newSession.access_token}).end()
          }
          if (!cursor.length) {
            sessions.insert(newSession).then((cursor) => {
              finalAction()
            }).catch((err) => {
              console.log(err)
            })
          } else {
            sessions.remove({username}).then(() => {
              sessions.insert(newSession).then((cursor) => {
                finalAction()
              }).catch((err) => {
                console.log(err)
              })
            }).catch((err) => {
              console.log(err)
            })
          }
        }).catch((err) => {
          res.sendStatus(500)
        })
      }
    }
  }).catch((err) => {
    res.sendStatus(500)
  })
})

router.get('/login_status', function (req, res) {
  const token = req.headers.token
  const db = req.db
  if (!token) {
    res.json({logged: false, user: null})
  } else {
    const sessions = db.get('sessions')
    sessions.find({access_token: token}, {"_id": 0}).then((cursor) => {
      if (!cursor.length) {
        res.json({logged: false, user: null})
      } else {
        const user = cursor[0]
        if (user.expiry.getTime() < new Date().getTime()) {
          res.json({logged: false, user: null})
        } else {
          res.json({logged: true, user: user})
        }
      }
    })
  }
})

// Post a blog
router.post('/post', function (req, res) {
  const token = req.headers.token
  const db = req.db
  if (!token) {
    return res.status(401).json({error: {code: '401', message: '没有权限'}}) // 没有 token
  } else {
    db.get('sessions').find({access_token: token}).then((cursor) => {
      if (!cursor.length) {
        return res.status(401).json({error: {code: '401', message: '没有权限'}}) // 数据库中找不到该 token
      }
      const session = cursor[0]
      if (session.role !== 'admin') {
        return res.status(401).json({error: {code: '401', message: '没有权限'}}) // 该 会话 非管理员
      } else if (session.expiry.getTime() < new Date().getTime()) {
        return res.status(401).json({error: {code: '401', message: '没有权限'}}) // token 已经过期
      } else {
        const newPost = {
          id: uuidv1(),
          author: session.username,
          postDate: new Date(),
          title: req.body.title,
          body: req.body.content
        }
        db.get('posts').insert(newPost).then((cursor) => {
          return res.json(cursor)
        })
      }
    })
  }
})

module.exports = router