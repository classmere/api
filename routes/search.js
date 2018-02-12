'use_strict'

const express = require('express')
const router = express.Router()

const database = require('../database-adapter/mongo')

// GET: Search course by name
router.get('/courses/:query', function search (req, res, next) {
  database.searchCourse(req.params.query, function (err, r) {
    if (err) { next(err) }
    res.json(r)
  })
})

// GET: Search building by name
router.get('/buildings/:query', function search (req, res, next) {
  database.searchBuilding(req.params.query, function (err, r) {
    if (err) { next(err) }
    res.json(r)
  })
})

module.exports = router
