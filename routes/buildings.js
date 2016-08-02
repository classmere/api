'use_strict';

const express  = require('express');
const router   = express.Router();

const database = require('../sperm-whale/database');

// GET: list of all buildings
router.get('/', function getAllBuildings(req, res) {
  database.getAllBuildings(function(err, r) {
    res.json(r);
  });
});

// GET: a building
router.get('/:abbr', function getAllBuildings(req, res) {
  database.getBuilding(req.params.abbr, function(err, r) {
    res.json(r);
  });
});

module.exports = router;
