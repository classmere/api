'use_strict';

const express  = require('express');
const router   = express.Router();
const pg       = require('pg').native;
const moment   = require('moment');
const _        = require('underscore');

const PG_URL = process.env.DATABASE_URL;
const client = new pg.Client(PG_URL);

client.connect(function(err) {
  if (err) console.error(err);

  // GET: list of all courses
  router.get('/', function(req, res, next) {
    const query = client.query('SELECT title, abbr FROM course');
    query.on('end', function(result) {
      const data = result.rows;

      res.json(data);
    });
  });

  // GET: Lookup a course by abbreviation
  router.get('/:abbr', function(req, res, next) {
    const sql = 'SELECT * FROM course ' +
                'LEFT JOIN section ' +
                'ON course.id = section.course_id ' +
                'WHERE course.abbr = $1';

    const query = client.query({
      text: sql,
      values: [req.params.abbr],
      name: 'course join section',
    });

    query.on('end', function(result) {
      const data = result.rows;

      var jsonResponse = {
        title: data[0].title,
        abbr: data[0].abbr,
        credits: data[0].credits,
        description: data[0].description,
        sections: [ ],
      };

      // Disabling JSCS so it wont complain about database column names
      // jscs:disable
      data.forEach(function(section, index, array) {
        // Make modifications to section data here
        if (section.days) {
          const days = section.days
          .toString()
          .replace(',', '');
        }
        const session = section.session === 'null' ? '' : section.session;
        const startDate = moment(section.start_date)
        .format('YYYY-MM-DD');
        const endDate = moment(section.endDate)
        .format('YYYY-MM-DD');

        jsonResponse.sections[index] = {
          term: section.term,
          startDate: startDate,
          endDate: endDate,
          session: session,
          crn: section.crn,
          sectionNumber: section.section,
          credits: section.credits,
          instructor: section.instructor,
          days: days,
          startTime: section.start_time,
          endTime: section.end_time,
          location: section.location,
          campus: section.campus,
          type: section.type,
          status: section.status,
          enrollmentCap: section.cap,
          enrolled: section.enrolled,
          waitlisted: section.wl_current,
          waitlistCap: section.wl_cap,
          fees: section.fees,
          restrictions: section.restrictions,
          comments: section.comments,
        };
      });
      // jscs:enable

      res.json(jsonResponse);
    });
  });
});

module.exports = router;
