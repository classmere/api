const thinky = require('./database');
const type = thinky.type;

const Course = thinky.createModel('Course', {
  id: type.string(),
  title: type.string().required(),
  subjectCode: type.string().max(4).required(),
  courseNumber: type.number().integer().max(999).required(),
  credits: [type.number().integer().max(40)],
  description: type.string(),
  prereqs: [{
    subjectCode: type.string().max(6),
    courseNumber: type.number().integer().max(999),
  }],
  dateScraped: type.date().default(Date.now()),
});

// Indexes
Course.ensureIndex('subjectCode');
Course.ensureIndex('courseNumber');

// Methods
Course.defineStatic('getView', function getCourseView() {
  return this.without('dateScraped');
});

module.exports = Course;

// Relations
const Section = require('./Section');
Course.hasMany(Section, 'sections', 'id', 'idCourse');
