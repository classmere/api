var express = require('express');
var router  = express.Router();
var db      = require('./db');


db.connect();


router.get('/courses/:q', function(req, res, next) {
  const sqlString = 'SELECT * FROM courses ' +
                    'WHERE title LIKE ? ' +
                    'OR abbr LIKE ?';
  const q = '%' + req.params.q + '%';
  db.query(sqlString, [q, q], function(err, results, fields) {
      if (err) {
        console.error(err);
      }
    res.json(results);
  });
});

module.exports = router;
