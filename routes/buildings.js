'use_strict';

const express  = require('express');
const router   = express.Router();

const Building = require('../schemas/Building');

// GET: list of all courses
router.get('/', function getAllBuildings(req, res) {
  Building.then((result) => {
    res.json(result);
  });
});

router.get('/:abbr', function getAllBuildings(req, res) {
  Building.filter({
  	abbr: req.params.abbr,
  })
  .run()
  .then((result) => {
  	if (result.length === 0) {
      res.status(404).json({ 'ohsh***': 'course not found' });
    } else {
    	const b = result[0];
    	res.json({
			abbr: b.abbr,
			name: b.name,
			address: b.address,
			buildingNumber: b.buildingNumber,
			sqft: b.sqft,
		});
	}
  })
});