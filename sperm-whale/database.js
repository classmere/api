const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/test';

MongoClient.connect(url, function(err, db) {
  console.log(`Connected to MongoDB @${url}`);
  const buildings = db.collection('buildings');
  const courses = db.collection('courses');

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

  function returnRes(err, r, cb) {
    if (err) {
      cb(err);
    } else {
      cb(null, r);
    }
  }
});

