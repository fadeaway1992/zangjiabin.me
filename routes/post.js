var express = require('express')
var router = express.Router()
var markdown = require('markdown').markdown
var transformDateObjectToCommonTimeString = require('../utils/utils.js').transformDateObjectToCommonTimeStirng

router.get('/:post_id', function(req, res) {
  const postId = req.params.post_id
  const db = req.db
  db.get('posts').find({id: postId}, {_id: 0}).then((cursor) => {
    if (!cursor.length) {
      res.render('error', { message: '文章不存在', error: { status: 404} })
    } else {
      const post = cursor[0]
      const token = req.headers.token
      post.html = markdown.toHTML(post.body)
      post.postDate = transformDateObjectToCommonTimeString(post.postDate)
      if (post.lastModified) {
        post.lastModified = transformDateObjectToCommonTimeString(post.lastModified)
      }
      if (token) {
        db.get('sessions').find({access_token: token}).then((cursor) => {
          if (cursor.length) {
            const user = cursor[0]
            if (user.role === 'admin') {
              post.admin = true
              return res.render('index', post)
            }
          }
        })
      }
      res.render('index', post)
    }
  })
});

module.exports = router;
