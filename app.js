'use_strict';

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const courses = require('./routes/courses');
const search  = require('./routes/search');

const app = express();

// Allow cross-origin resource sharing
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Initilize express app to use courses route and search route
app.use('/courses', courses);
app.use('/search', search);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500)
      .json({
        message: err.message,
        error: err,
      });
  });
}

// Production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500)
    .json({
      message: err.message,
      error: {},
    });
});

module.exports = app;
