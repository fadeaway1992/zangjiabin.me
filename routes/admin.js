var express = require('express');
var router = express.Router();
var path = require('path')

/* GET admin listing. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../pages/login/login.html'));
});

module.exports = router;
