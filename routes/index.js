var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.session.user.name, 'session')
  res.render('index', { title: req.session.user.name });
});

module.exports = router;
