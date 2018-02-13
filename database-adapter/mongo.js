'use_strict'

const MongoClient = require('mongodb').MongoClient

const url = process.env.MONGO_URL || 'mongodb://localhost:27017/test'

console.log(`Connecting to MongoDB @${url}`)

MongoClient.connect(url, function (err, db) {
  if (err) {
    throw err
  }

  console.log('Connected!')
  const courses = db.collection('courses')
  const buildings = db.collection('buildings')

  // Create fresh search indexes
  courses.ensureIndex({ title: 'text' })
  courses.ensureIndex({ subjectCode: 1, courseNumber: 1 })
  buildings.ensureIndex({ name: 'text' })

  // Courses
  module.exports.getAllCourses = function (callback) {
    courses
      .find({})
      .project({
        title: 1,
        subjectCode: 1,
        courseNumber: 1,
        _id: 0
      })
      .toArray(callback)
  }

  module.exports.getCoursesInSubject = function (subjectCode, callback) {
    courses
      .find({
        subjectCode: subjectCode
      })
      .project({
        title: 1,
        subjectCode: 1,
        courseNumber: 1,
        _id: 0
      })
      .toArray(callback)
  }

  module.exports.getCourse = function (subjectCode, courseNumber, callback) {
    courses
      .findOne({
        subjectCode: subjectCode,
        courseNumber: courseNumber
      }, callback)
  }

  // Subjects
  module.exports.getAllSubjects = function (callback) {
    courses
      .distinct('subjectCode', callback)
  }

  // Buildings
  module.exports.getAllBuildings = function (callback) {
    buildings
      .find({})
      .toArray((callback))
  }

  module.exports.getBuilding = function (buildingCode, callback) {
    buildings
      .findOne({
        abbr: buildingCode
      }, callback)
  }

  // Search
  module.exports.searchCourse = function (query, callback) {
    courses
      .find({
        $text: { $search: query }
      }, {
        score: { $meta: 'textScore' }
      })
      .sort({ score: { $meta: 'textScore' } })
      .limit(100)
      .toArray(callback)
  }

  module.exports.searchBuilding = function (query, callback) {
    buildings
      .find({
        $text: { $search: query }
      }, {
        score: { $meta: 'textScore' }
      })
      .sort({ score: { $meta: 'textScore' } })
      .limit(100)
      .toArray((callback))
  }
})
