const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  courseTitle: { type: String, required: true },
  courseCode: { type: String, required: true, unique: true },
  semester: { type: String, required: true },
  approved: { type: Boolean, default: false },
});

mongoose.models = {};
module.exports = mongoose.model("Course", CourseSchema);
