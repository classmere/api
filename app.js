'use_strict'

const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

const courses = require('./routes/courses')
const buildings = require('./routes/buildings')
const search = require('./routes/search')

const app = express()

// Allow cross-origin resource sharing
app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Initilize express app to use courses route and search route
app.use('/courses', courses)
app.use('/buildings', buildings)
app.use('/search', search)

// Send welcome message for '/'' endpoint
app.use('/$', function baseRoute (req, res) {
  res.json({'message': 'Welcome to the classmere api.'})
})

// Catch 404 and forward to error handler
app.use(function handle404 (req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// Log errors
app.use(function logErrors (err, req, res, next) {
  console.error(err)
  next(err)
})

// Development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function devErrorHandler (err, req, res) {
    res.status(err.status || 500)
      .json({
        message: err.message,
        error: err
      })
  })
}

// Production error handler
// no stacktraces leaked to user
app.use(function prodErrorHandler (err, req, res) {
  res.status(err.status || 500)
    .json({
      message: err.message,
      error: {}
    })
})

module.exports = app
