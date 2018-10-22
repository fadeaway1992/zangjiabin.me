const express = require('express')
const router = express.Router()
const markdown = require('markdown').markdown
const transformDateObjectToCommonTimeString = require('../utils/utils.js').transformDateObjectToCommonTimeString
const postModel = require('../model/post.js')

router.get('/:post_id', function(req, res) {
  const postId = req.params.post_id;
  (async function () {
    try {
      let post = await postModel.findOne({id:postId}).lean()
      if (!post) {
        res.render('error', { message: '文章不存在', error: { status: 404} })
        return
      } else {
        post.html = markdown.toHTML(post.body)
        post.postDate = transformDateObjectToCommonTimeString(post.postDate)
        if (post.lastModified) {
          post.lastModified = transformDateObjectToCommonTimeString(post.lastModified)
        }
        console.log(post,'post')
        res.render('index', post)
        return
      }
    } catch (error) {
      console.log(error, 'error ')
      res.status(500).send(error)
      return
    }
  })()
});

module.exports = router;
