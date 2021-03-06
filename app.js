var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var postsRouter = require('./routes/post');
var profileRouter = require('./routes/profile')
var bodyParser = require('body-parser')
var APIs = require('./api/index')

var mongoose = require('mongoose')
mongoose.connect('mongodb://zangjiabin:fade@localhost:27017/myapp?authSource=admin')

var mongoosedb = mongoose.connection
mongoosedb.once('open', function () {
  console.log('非常开心连接成功')
})

var app = express();

// Add headers
app.use(function (req, res, next) {

  res.setHeader('Access-Control-Expose-Headers', '*');

  res.setHeader('Access-Control-Allow-Credentials', true);

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*')

  res.setHeader('Access-Control-Allow-Methods', '*')

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'withCredentials, content-type, token');

  // Pass to next layer of middleware
  next();
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'spa/dist/static')))
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use('/images', express.static(path.join(__dirname, '..', 'images')))
app.use(express.static(path.join(__dirname, 'favicon_package')))
app.use(express.static(path.join(__dirname, 'root')))


// 分配路由
// 文章列表
app.use('/posts', postsRouter);
// api
app.use('/api/v1', APIs)
// profile
app.use('/profile', profileRouter)
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
