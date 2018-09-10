var express = require('express');
var router = express.Router();
var path = require('path')

/* GET admin listing. */
router.get(/.*/, function(req, res, next) {
  res.sendFile(path.join(__dirname, '../admin/dist/index.html'));
});

module.exports = router;