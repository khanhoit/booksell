var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');
var uniqueString  = require('unique-string');
var uuids = require('uuid/v1');
mongoose.connect('mongodb://localhost/booksell');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var login = require('./routes/login');
var signup = require('./routes/signup');
var sessionMd = require('./middlewares/session.middleware');
var checkLogin = require('./middlewares/checkLogin.middleware');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("fsfsjdfsfskdfjnsdf"));
app.use(express.static(path.join(__dirname, 'public')));

// app.use(sessionMd);
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: true,
      cookie: {}
    })
)
app.use('/',function(req,res,next){
  if(!req.session.sessionId){
    req.session.sessionId = uniqueString();
  }
  next();
})

app.use(checkLogin.checkLoginShowFunctionUser);
app.use('/',indexRouter);
app.use('/users',checkLogin.requireLogin, usersRouter);
app.use('/login',checkLogin.logged, login);
app.use('/signup',checkLogin.logged, signup);


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
