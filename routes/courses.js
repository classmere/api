'use_strict';

const express  = require('express');
const router   = express.Router();
const moment   = require('moment');
const _        = require('underscore');
const mongoose = require('mongoose');
const schemas  = require('../schemas');

mongoose.connect(process.env.MONGO_PORT_27017_TCP_ADDR);
const db = mongoose.connection;

const Course = schemas.Course;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback) {

  router.get('/', function(req, res, next) {
    Course.find({}, 'title abbr').sort('title').exec(function(err, course) {
      res.json(course);
    });
  });

  router.get('/:abbr', function(req, res, next) {
    Course.findOne({ abbr: req.params.abbr }, function(err, course) {
      if (!course) res.json(404, {error: 'Empty search'});

      _.each(course.sections, function(section) {
        section.startTime = moment(section.startTime).format('HH:mm');
        section.endTime = moment(section.endTime).format('HH:mm');
      });

      res.json(course);
    });

  });
});

module.exports = router;
