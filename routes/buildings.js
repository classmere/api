'use_strict'

const express = require('express')
const router = express.Router()

const database = require('../database-adapter/mongo')

// GET: list of all buildings
router.get('/', function getAllBuildings (req, res, next) {
  database.getAllBuildings(function (err, r) {
    if (err) { return next(err) }
    res.json(r)
  })
})

// GET: a building
router.get('/:abbr', function getAllBuildings (req, res, next) {
  database.getBuilding(req.params.abbr, function (err, r) {
    if (err) { return next(err) }
    res.json(r)
  })
})

module.exports = router
