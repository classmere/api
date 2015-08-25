'use_strict';

const express  = require('express');
const router   = express.Router();
const pg       = require('pg').native;

const PG_URL = process.env.DATABASE_URL;
const client = new pg.Client(PG_URL);

client.connect(function connectDB(err) {
  if (err) {
    console.error(err);
  }
});

// GET: Search for a course
router.get('/courses/:q', function searchCourse(req, res, next) {
  const sql = 'SELECT * FROM course ' +
              'WHERE title LIKE $1 ' +
              'OR abbr LIKE $2';
  const q = ('%' + req.params.q + '%').toUpperCase();

  const query = client.query({
    text: sql,
    values: [q, q],
    name: 'select like',
  });

  query.on('error', (err) => {
    next(err);
  });

  query.on('end', (result) => {
    const data = result.rows;
    res.json(data);
  });
});

module.exports = router;
