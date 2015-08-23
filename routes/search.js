'use_strict';

const express  = require('express');
const router   = express.Router();
const pg       = require('pg').native;

const PG_URL = process.env.DATABASE_URL;
const client = new pg.Client(PG_URL);

client.connect(function(err) {
  if (err) {
    console.error(err);
  }

  // GET: Search for a course
  router.get('/courses/:q', function(req, res, next) {
    const sql = 'SELECT * FROM course ' +
                'WHERE title LIKE $1 ' +
                'OR abbr LIKE $2';
    var q = ('%' + req.params.q + '%').toUpperCase();
    console.log(q);
    const query = client.query({
      text: sql,
      values: [q, q],
      name: 'select like'
    });

    query.on('error', function(err) {
      next(err);
    });

    query.on('end', function(result) {
      const data = result.rows;
      res.json(data);
    });
  });
});

module.exports = router;
