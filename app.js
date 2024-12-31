var createError = require('http-errors'); // 404 error
var express = require('express'); //web framework
var path = require('path'); //path module
var cookieParser = require('cookie-parser'); //middleware for parsing cookies
var logger = require('morgan'); //middleware for logging requests

var indexRouter = require('./routes/index'); //routes for home page
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/adminRote/article');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // 如果是https协议，请设置为true
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/article', adminRouter);

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
