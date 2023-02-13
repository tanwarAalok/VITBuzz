const mongoose = require("mongoose");

const FacultySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  gender: { type: String, required: true },
  ratings: { 
    avgRating: {type: String, default: 0},
    paperRating: {type: String, default: 0},
    behaviourRating: {type: String, default: 0},
    teachingRating: {type: String, default: 0},
  },
  review: { type: String },
  totalRatings: {type: String, default: 0},
  totalReviews: {type: String, default: 0},
});

mongoose.models = {};
module.exports = mongoose.model("Faculty", FacultySchema);
