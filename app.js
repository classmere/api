const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

// ----- MOUNT MIDDLEWARE FUNCTIONS -----

// Import routes
const courses = require('./routes/courses');

// TODO
//const search = require('./routes/search');

// Initilize express app
var app = express();

// Allow cross-origin resource sharing (cause the JS is blocking HTTP requests) - for Angular app
app.use(cors());

// Logging stuff (dev level)
app.use(logger('dev'));

// Returns middleware that only parses json
app.use(bodyParser.json());

// Returns middleware that only parses urlencoded bodies
app.use(bodyParser.urlencoded({ extended: false }));

// Initilize express app to use courses route and search route
app.use('/courses', courses);

// TODO
// app.use('/search', search);

// ----- ERROR HANDLING -----

// Catch 404 status and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// If envionment is in development, will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500)
      .json({
        message: err.message,
        error: err,
      });
  });
}

// Envionment is in production - No stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500)
    .json({
      message: err.message,
      error: {},
    });
});

// Export app
module.exports = app;
