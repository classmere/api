'use_strict';

const express = require('express');
const router = express.Router();

const database = require('../sperm-whale/database');

// GET: list of all courses
router.get('/', function getAllCourses(req, res) {
  database.getAllCourses(function(err, r) {
    res.json(r);
  });
});

// GET: Lookup a course by abbreviation
router.get('/:subject/:number', function getCourse(req, res) {
  database.getCourse(req.params.subject, parseInt(req.params.number), function(err, r) {
    res.json(r);
  });
});

module.exports = router;
