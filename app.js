// app.js

// Import dependencies
const express = require('express');
const path = require('path'); // Where do we use this?
const favicon = require('serve-favicon');
const logger = require('morgan'); // Why do we use this?
const bodyParser = require('body-parser');
const cors = require('cors'); // Why do we use this?

// =============================================================================
// MOUNT MIDDLEWARE FUNCTIONS

// Import routes
const courses = require('./routes/courses');
//const search = require('./routes/search');

// Initilize express app
var app = express();

// Allow cross-origin resource sharing
app.use(cors());

// Initilize express app to use a favicon.
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev')); //What?

// Returns middleware that only parses json
app.use(bodyParser.json());

// Returns middleware that only parses urlencoded bodies
app.use(bodyParser.urlencoded({ extended: false }));

// Initilize express app to use courses route and search route
app.use('/courses', courses);
// app.use('/search', search);

// =============================================================================

// Catch 404 status and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// development error handler
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

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    .json({
        message: err.message,
        error: {},
    });
});

// Export app
module.exports = app;
