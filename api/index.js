const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const multer  = require('multer')
const path = require('path')
const uuidv1 = require('uuid/v1')
const transformDateObjectToCommonTimeString = require('../utils/utils.js').transformDateObjectToCommonTimeString
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../images'))
  },
  filename: function (req, file, cb) {
    const nameArray = file.originalname.split('.')
    const extName = '.' + nameArray[nameArray.length - 1]
    cb(null, uuidv1() + extName)
  }
})
const upload = multer({ storage: storage })

const generateNewSession = require('../utils/utils.js').generateNewSession

// import models
const sessionModel = require('../model/session.js')
const userModel = require('../model/user.js')
const postModel = require('../model/post.js')

// generate new sitemap
const generateSitemap = require('../utils/utils.js').generateSitemap

function generateNewSitemap () {
  postModel.find({}).lean().then(function (posts) {
    generateSitemap(posts)
  })
}

/* 鉴权 */
function checkAuth (token) {
  return new Promise(async function (resolve, reject) {
    if (!token) {
      return reject(0) // token 不存在
    }
    try {
      const session = await sessionModel.findOne({access_token: token}).lean()
      if (!session) {
        return reject(1) // 找不到该token
      }
      if (session.role !== 'admin') {
        return reject(2) // 该会话非管理员
      }
      if (session.expiry.getTime() < new Date().getTime()) {
        return reject(3) // token 已经过期
      }
      return resolve(session)
    } catch (error) {
      return reject(error)
    }
  })
}

function handleError (error, res) {
  console.log(error)
  console.log('handle error')
  if (typeof error === 'number' && error <=3 && error >=0) {
    return res.status(401).json({error: {code: '401', message: '没有权限'}})
  } else {
    return res.status(500).send(error)
  }
}


// upload images
router.post('/upload_images', upload.any(), function (req, res) {
  const token = req.headers.token
  checkAuth(token).then(function (session) {
    const files = req.files
    let paths = files.map(function (file) {
      return '/images/' + file.filename
    })
    return res.json(paths)
  }).catch(function (error) {
    handleError(error, res)
  })
})

// log in
router.post('/login', function (req, res) {
  (async function () {
    const username = req.body.username
    const password = req.body.password
    try {
      const user = await userModel.findOne({"username": username})
      if (!user) { // 用户不存在
        return res.status(422).json({error: {code: '001', message: '用户名不存在'}})
      } else {
        var validation = bcrypt.compareSync(password, user.password)
        if(!validation) { // 密码错误
          return res.status(422).json({error: {code: '002', message: '密码错误'}})
        } else { // 更新或者创建 session
          const newSession = generateNewSession({username, role:user.role})
          await sessionModel.update({username}, newSession, {upsert: true})
          res.json({token: newSession.access_token}).end()
          return
        }
      }
    } catch (error) {
      res.status(500).send(error)
    }
  })()
})


router.get('/login_status', function (req, res) {
  (async function () {
    const token = req.headers.token
    let session
    if (!token) {
      return res.json({logged: false, user: null})
    }
    try {
      session = await sessionModel.findOne({access_token: token}).lean()
    } catch (error) {
      return res.status(500).send(error)
    }
    if (!session) {
      return res.json({logged: false, user: null})
    }
    if (session.expiry.getTime() < new Date().getTime()) {
      return res.json({logged: false, user: null})
    }
    return res.json({logged: true, user: session})
  })()
})

router.get('/post', function (req, res) {
  (async function () {
    const page = req.query.page || 1
    const perPage = 10
    const posts = await postModel.find({}, '-_id', {skip: perPage * (page - 1), limit: perPage, sort: {_id: -1}}).lean()
    if (posts.length) {
      posts.forEach(function (post) {
        post.postDate = transformDateObjectToCommonTimeString(post.postDate)
        if (post.lastModified) {
          post.lastModified = transformDateObjectToCommonTimeString(post.lastModified)
        }
      })
    }
    const result = {
      page,
      posts
    }
    return res.send(result)
  })()
})

router.get('/post_index', function (req, res) {
  (async function () {
    const page = req.query.page || 1
    const perPage = 10
    const posts = await postModel.find({}, '-_id -body', {skip: perPage * (page - 1), limit: perPage + 1, sort: {_id: -1}}).lean()
    console.log(posts, 'posts')
    if (posts.length) {
      posts.forEach(function (post) {
        post.postDate = transformDateObjectToCommonTimeString(post.postDate)
        if (post.lastModified) {
          post.lastModified = transformDateObjectToCommonTimeString(post.lastModified)
        }
      })
    }
    const result = {
      page: parseInt(page),
      perPage,
      posts: posts.slice(0, perPage),
      more: posts.length === perPage + 1
    }
    return res.send(result)
  })()
})

// Post a blog
router.post('/post', function (req, res) {
  const token = req.headers.token
  checkAuth(token).then(function (session) {
    const params = {
      id: uuidv1(),
      author: session.username,
      postDate: new Date(),
      title: req.body.title,
      body: req.body.content,
      labels: req.body.labels
    }
    const newPost = new postModel(params)
    newPost.save(function (err) {
      if (err) {
        return handleError(error, res)
      }
      generateNewSitemap()
      return res.send(newPost)
    })
  }).catch(function(error){
    return handleError(error, res)
  })
})

router.get('/post/:postId', function (req, res) {
  const postId = req.params.postId
  postModel.findOne({id: postId}, '-_id').lean().then((post) => {
    if (!post) {
      return res.status(404).json({error: {code: '404', message: '该文章不存在'}}) // 文章不存在
    } else {
      return res.json(post)
    }
  })
})

router.put('/post/:postId', function(req, res) {
  const token = req.headers.token
  const postId = req.params.postId
  req.body.lastModified = new Date()
  checkAuth(token).then(function (session) {
    postModel.findOneAndUpdate({id: postId}, req.body, {new: true}).lean().then((post) => {
      if (!post) {
        return res.status(404).json({error: {code: '404', message: '该文章不存在'}}) // 文章不存在
      } else {
        generateNewSitemap()
        return res.send(post)
      }
    })
  }).catch(function (error) {
    handleError(error, res)
  })
})

router.delete('/post/:postId', function(req, res) {
  const token = req.headers.token
  const postId = req.params.postId
  checkAuth(token).then(function (session) {
    postModel.findOneAndDelete({id: postId}).lean().then((post) => {
      if (!post) {
        return res.status(404).json({error: {code: '404', message: '该文章不存在'}}) // 文章不存在
      } else {
        generateNewSitemap()
        return res.send(post)
      }
    })
  }).catch(function (error) {
    handleError(error, res)
  })
})

module.exports = router