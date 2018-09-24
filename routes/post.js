var express = require('express')
var router = express.Router()

router.get('/:post_id', function(req, res) {
  const postId = req.params.post_id
  const db = req.db
  db.get('posts').find({_id: postId}).then((cursor) => {
    if (!cursor.length) {
      res.render('error', { message: '文章不存在', error: { status: 404} })
    } else {
      res.render('index', { title: '臧甲彬的博客' })
    }
  })
});

module.exports = router;
