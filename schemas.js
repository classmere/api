const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

const Course = mongoose.model('Course', courseSchema);

exports.Course = Course;
