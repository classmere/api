'use_strict';

const express = require('express');
const router = express.Router();

const database = require('../sperm-whale/database');

// GET: Search course by name 
router.get('/courses/:query', function search(req, res) {
  database.searchCourse(req.params.query, function(err, r) {
    res.json(r);
  });
});

// GET: Search building by name 
router.get('/buildings/:query', function search(req, res) {
  database.searchBuilding(req.params.query, function(err, r) {
    res.json(r);
  });
});

module.exports = router;
