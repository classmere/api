'use_strict';

const express  = require('express');
const router   = express.Router();
const _        = require('underscore');
const mongoose = require('mongoose');
const schemas  = require('../schemas');

mongoose.createConnection(process.env.MONGO_URL);
const db = mongoose.connection;
const Course = schemas.Course;

db.on('error', console.error.bind(console, 'connection error:'));
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

module.exports = router;
