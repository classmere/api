const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/test';

MongoClient.connect(url, function(err, db) {
  console.log(`Connected to MongoDB @${url}`);
  const courses = db.collection('courses');
  const buildings = db.collection('buildings');

  // Create search indexes
  courses.ensureIndex({ title : 'text' });
  buildings.ensureIndex({ name : 'text' });

  // Courses
  module.exports.getAllCourses = function(cb) {
    courses.find({}).toArray((err, r) => returnRes(err, r, cb));
  };

  module.exports.getCourse = function(subjectCode, courseNumber, cb) {
    const abbr = `${subjectCode} ${courseNumber}`;
    courses.findOne(
      {abbr: abbr}, 
      (err, r) => returnRes(err, r, cb)
    );
  };

  module.exports.searchCourse = function(query, cb) {
    courses.find(
      { $text : { $search : query } },
      { score : { $meta : 'textScore' } }
    ).sort({ score: { $meta : 'textScore' } }).limit(100).toArray((err, r) => returnRes(err, r, cb));
  };

  // Buildings
  module.exports.getAllBuildings = function(cb) {
    buildings.find({}).toArray((err, r) => returnRes(err, r, cb));
  };

  module.exports.getBuilding = function(buildingCode, cb) {
    buildings.findOne(
      {abbr: buildingCode}, 
      (err, r) => returnRes(err, r, cb)
    );
  };

  module.exports.searchBuilding = function(query, cb) {
    buildings.find(
      { $text : { $search : query } },
      { score : { $meta : 'textScore' } }
    ).sort({ score: { $meta : 'textScore' } }).limit(100).toArray((err, r) => returnRes(err, r, cb));
  };

  function returnRes(err, r, cb) {
    if (err) {
      cb(err);
    } else {
      cb(null, r);
    }
  }
});

