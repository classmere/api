'use_strict'

const express = require('express')
const router = express.Router()

const database = require('../database-adapter/mongo')

// GET: list of all courses
router.get('/', function getAllCourses (req, res, next) {
  database.getAllCourses(function (err, r) {
    if (err) { return next(err) }
    res.json(r)
  })
})

// GET: Lookup all courses in a given discipline
router.get('/:subject', function getCoursesInSubject (req, res, next) {
  database.getCoursesInSubject(req.params.subject, function (err, r) {
    if (err) { return next(err) }
    res.json(r)
  })
})

// GET: Lookup a course by abbreviation
router.get('/:subject/:number', function getCourse (req, res, next) {
  database.getCourse(req.params.subject, parseInt(req.params.number), function (err, r) {
    if (err) { return next(err) }
    res.json(r)
  })
})

module.exports = router
