require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const helmet = require("helmet");
const session = require('cookie-session');
const passport = require('passport');
const app = express();

const { connectDatabase } = require('./services/dbService');
const { setPassportStrategy, setUserSerialization } = require('./auth');

const indexRouter = require('./routes/index');
const authRoute = require('./routes/auth');
const documentRoute = require('./routes/document');

connectDatabase();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
/* Set Cookie Settings */
app.use(
  session({
    name: 'session',
    secret: 'ungabunga',
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
  })
);
app.use(passport.initialize());
app.use(passport.session());

setUserSerialization();
setPassportStrategy();

app.use(cors({ credentials: true, origin: true }));
app.use('/', indexRouter);
app.use('/auth', authRoute);
app.use('/document', documentRoute);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
