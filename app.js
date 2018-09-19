var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var postsRouter = require('./routes/post');
var bodyParser = require('body-parser')
var APIs = require('./api/index')

var monk = require('monk');
var db = monk('localhost:27017/myapp');

var mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/myapp')

var app = express();

// Add headers
app.use(function (req, res, next) {

  res.setHeader('Access-Control-Expose-Headers', '*');

  res.setHeader('Access-Control-Allow-Credentials', true);

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'withCredentials, content-type');

  // Pass to next layer of middleware
  next();
});

// Make our db accessible to our router
app.use(function(req,res,next){
  req.db = db;
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'spa/dist/static')))


// 分配路由
// 文章列表
app.use('/posts', postsRouter);
// api
app.use('/api/v1', APIs)
// spa
app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
