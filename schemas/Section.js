const thinky = require('./database');
const type = thinky.type;

const Section = thinky.createModel('Section', {
  id: type.string(),
  idCourse: type.string(),
  term: type.string().max(4),
  session: type.string(),
  crn: type.number().integer().max(99999),
  section: type.number().integer().max(999),
  credits: [type.number().integer().max(16)],
  instructor: type.string(),
  startTime: type.string(),
  endTime: type.string(),
  days: type.string().max(7),
  startDate: type.date(),
  endDate: type.date(),
  location: type.string(),
  campus: type.string(),
  type: type.string(),
  status: type.string(),
  capacity: type.number().integer(),
  currentEnrollment: type.number().integer(),
  waitlistCapacity: type.number().integer(),
  waitlistCurrent: type.number().integer(),
  fees: type.string(),
  restrictions: type.string(),
  comments: type.string(),
});

module.exports = Section;

// Relations
const Course = require('./Course');
Section.belongsTo(Course, 'course', 'idCourse', 'id');
const User = require('./User');
Section.hasAndBelongsToMany(User, 'users', 'id', 'id');
