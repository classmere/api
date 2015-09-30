'use_strict';

const express  = require('express');
const router   = express.Router();

const Course   = require('../schemas/Course');

// GET: list of all courses
router.get('/', function getAllCourses(req, res) {
  Course.then((result) => {
    res.json(result);
  });
});

// GET: Lookup a course by abbreviation
router.get('/:subject/:number', function getCourse(req, res) {
  Course.filter({
    subjectCode: req.params.subject,
    courseNumber: parseInt(req.params.number, 10),
  })
  .getView()
  .getJoin()
  .run()
  .then((result) => {
    if (result.length === 0) {
      res.status(404).json({ 'ohsh***': 'course not found' });
    } else {
      const c = result[0];
      res.json({
        id: c.id,
        title: c.title,
        subjectCode: c.subjectCode,
        courseNumber: c.courseNumber,
        credits: c.credits,
        description: c.description,
        sections: c.sections.map(function formatSections(s) {
          return ({
            id: s.id,
            term: s.term,
            session: s.session,
            crn: s.crn,
            credits: s.credits,
            instructor: s.instructor,
            meetingTimes: s.meetingTimes,
            startDate: s.startDate,
            endDate: s.endDate,
            campus: s.campus,
            type: s.type,
            status: s.status,
            capacity: s.capacity,
            currentEnrollment: s.currentEnrollment,
            waitlistCapacity: s.waitlistCapacity,
            waitlistCurrent: s.waitlistCurrent,
            fees: s.fees,
            restrictions: s.restrictions,
            comments: s.comments,
          });
        }),
      });
    }
  });
});

module.exports = router;
