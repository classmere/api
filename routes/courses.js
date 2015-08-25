'use_strict';

const express  = require('express');
const router   = express.Router();
const pg       = require('pg').native;
const moment   = require('moment');

const PG_URL = process.env.DATABASE_URL;
const client = new pg.Client(PG_URL);

client.connect(function connectDB(err) {
  if (err) {
    console.error(err);
  }
});

// GET: list of all courses
router.get('/', function listAllCourses(req, res, next) {
  const query = client.query('SELECT title, abbr FROM course');

  query.on('error', (err) => {
    next(err);
  });

  query.on('end', (result) => {
    const data = result.rows;
    res.json(data);
  });
});

// GET: Lookup a course by abbreviation
router.get('/:abbr', function serveCourse(req, res, next) {
  const sql = 'SELECT * FROM course ' +
              'LEFT JOIN section ' +
              'ON course.id = section.course_id ' +
              'WHERE course.abbr = $1';

  const query = client.query({
    text: sql,
    values: [req.params.abbr],
    name: 'course join section',
  });

  query.on('error', (err) => {
    next(err);
  });

  query.on('end', (result) => {
    const data = result.rows;

    if (data.length === 0) {
      const err = new Error('Course not found');
      err.status = 404;
      next(err);
      return;
    }

    const jsonResponse = {
      title: data[0].title,
      abbr: data[0].abbr,
      credits: data[0].credits,
      description: data[0].description,
      sections: [ ],
    };

    data.forEach(function populateSectionArray(section, index) {
      // Make modifications to section data here
      var days = '';
      if (section.days) {
        days = section.days
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
    res.json(jsonResponse);
  });
});

module.exports = router;
