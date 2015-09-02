'use_strict';

const express  = require('express');
const router   = express.Router();

const Course   = require('../schemas/Course');
const r        = require('../schemas/database').r;

// GET: list of all courses
router.get('/', function getAllCourses(req, res) {
  Course.then((result) => {
    res.json(result);
  });
});

// GET: Lookup a course by abbreviation
router.get('/:abbr', function getCourse(req, res) {
  Course.filter(
    r.row('abbr')
    .eq(req.params.abbr)
  )
  .getJoin()
  .run()
  .then((result) => {
    if (result.length === 0) {
      res.status(404).json({ 'ohsh***': 'course not found' });
    } else {
      res.json(result[0]);
    }
  });
});

module.exports = router;
