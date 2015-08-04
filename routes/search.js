// search.js

// Specify strict mode for 'secure' code
'use_strict';

// Import dependencies and initilize global constants
const express  = require('express');
const router   = express.Router();
const _        = require('underscore');
const mongoose = require('mongoose');
const schemas  = require('../schemas');

// =============================================================================
// MIDDLEWARE FOR ALL REQUESTS
mongoose.createConnection(process.env.MONGO_URL);

// Initilize mongoose constants
const db = mongoose.connection;
const Course = schemas.Course;

// Check for connection errors
db.on('error', console.error.bind(console, 'connection error:'));

// Run DB
db.once('open', function(callback) {

  // GET: Search course titles
  router.get('/courses/:q', function(req, res, next) {
    Course.find({ title: new RegExp(req.params.q, 'i')},
    function(err, courses) {
      if (err) {
        console.error(err);
      } else {
        res.json(courses);
      }
    });
  });
});

// =============================================================================
// Export as router
module.exports = router;
