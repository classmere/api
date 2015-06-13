var express = require('express');
var router  = express.Router();
var db      = require('./db');


db.connect();


router.get('/', function(req, res, next) {
  db.query('SELECT title, abbr FROM courses', function (err, results, fields) {
    res.json(results);
  });
});

router.get('/:abbr', function(req, res, next) {
  const sqlString = 'SELECT * FROM courses ' +
                    'LEFT JOIN sections ' +
                    'ON courses.id = sections.course_id ' + 
                    'WHERE courses.abbr = ?';
  db.query(sqlString, [req.params.abbr], function(err, results, fields) {
    var jsonResponse = {
      title: results[0].title,
      abbr: results[0].abbr,
      credits: results[0].credits,
      description: results[0].description,
      sections: [ ]
    };

    results.forEach(function (section, index, array) {
      var days = '';
      if (section.m === 1) { days = days.concat('M'); } 
      if (section.t === 1) { days = days.concat('T'); } 
      if (section.w === 1) { days = days.concat('W'); } 
      if (section.r === 1) { days = days.concat('R'); } 
      if (section.f === 1) { days = days.concat('F'); }

      jsonResponse.sections[index] = {
        term: section.term,
        start_date: section.start_date,
        end_date: section.end_date,
        session: section.session,
        crn: section.crn,
        section_number: section.sec,
        credits: section.credits,
        instructor: section.instructor,
        days: days,
        start_time: section.start_time,
        end_time: section.end_time,
        location: section.location,
        campus: section.campus,
        type: section.type,
        status: section.status,
        cap: section.cap,
        enrolled: section.enrolled,
        waitlist_cap: section.wl_cap,
        waitlist_current: section.wl_current,
        fees: section.fees,
        restrictions: section.restrictions,
        comments: section.comments
      };
    });
  res.json(jsonResponse);
  });
});

module.exports = router;
