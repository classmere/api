// schemas.js

// Import and initilize mongooose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// =============================================================================
// DEFINE SCHEMAS

// Initilize section schema
const sectionSchema = new Schema({
  term: String,
  startDate: Date,
  endDate: Date,
  session: String,
  crn: Number,
  sec: Number,
  credits: String,
  instructor: String,
  days: String,
  startTime: Date,
  endTime: Date,
  location: String,
  campus: String,
  type: String,
  status: String,
  enrollCap: Number,
  enrolled: Number,
  waitlistCap: Number,
  waitlisted: Number,
  fees: String,
  restrictions: String,
  comments: String
});

// -----------------------------------------------------------------------------
// Initilize course schema
const courseSchema = new Schema({
  title: String,
  abbr: String,
  credits: String,
  desc: String,
  sections: [sectionSchema],
  updated: { type: Date, default: Date.now },
  meta: {
    likes: Number,
    dislikes: Number
  }
});

// =============================================================================
// DEFINE SCHEMAS

// Initilize course model with course schema
const Course = mongoose.model('Course', courseSchema);

// Export model
exports.Course = Course;
