'use_strict';

const express  = require('express');
const router   = express.Router();
const Course   = require('../schemas/schemas').Course;

// GET: Search for a course
router.get('/courses/:q', function searchCourse(req, res) {
  Course.filter()
});

module.exports = router;
