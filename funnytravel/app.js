var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs');
var swig = require('swig')
var mongoose = require("mongoose")
// 将post发送的数据解析为json，并通过req.body来调用
var bodyParser = require("body-parser")
var Cookies = require("cookies")
var User = require('./models/User')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

swig.setDefaults({cache: false})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 中间件 处理post提交数据为json格式，必须在路由之前
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(function (req, res, next) {
  req.cookies = new Cookies(req, res)
  // 解析登录用户的cookies信息
  var userInfo = {}
  if (req.cookies.get('userInfo')) {
    try{
      req.userInfo = JSON.parse(req.cookies.get("userInfo"));
      User.findById(req.userInfo._id).then(function (userInfo) {
        req.userInfo.isAdmin = Boolean(userInfo.isAdmin)
      })
    }catch(e){
    	console.log(e)
    }
  }
  next()
})

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
mongoose.connect("mongodb://127.0.0.1:27017/FunnyTravel", { useNewUrlParser: true },error => {
  if (error) {
    console.log("数据库连接失败：" + error)
  } else {
    console.log("------数据库连接成功！------")
    // 监听http请求
   
  }
});
module.exports = app;
