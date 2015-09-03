const thinky = require('./database');
const type = thinky.type;

const Course = thinky.createModel('Course', {
  id: type.string(),
  title: type.string().required(),
  abbr: type.string().max(10).required(),
  credits: [type.number().integer().max(16)],
  description: type.string(),
  dateScraped: type.date().default(Date.now()),
});

// Indexes
Course.ensureIndex('abbr');

module.exports = Course;

// Relations
const Section = require('./Section');
Course.hasMany(Section, 'sections', 'id', 'idCourse');
