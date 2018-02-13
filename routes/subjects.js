'use_strict'

const express = require('express')
const router = express.Router()

const database = require('../database-adapter/mongo')

// GET: list of all subjects
router.get('/', function getAllSubjects (req, res, next) {
  database.getAllSubjects(function (err, r) {
    if (err) { return next(err) }
    res.json(r)
  })
})

module.exports = router
