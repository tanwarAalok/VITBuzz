const mongoose = require("mongoose");

const FacultySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  gender: { type: String, required: true },
  overallRating: {type: Number, default: 0},
  overallPaperRating: {type: Number, default: 0},
  overallBehaviourRating: {type: Number, default: 0},
  overallTeachingRating: {type: Number, default: 0},
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

mongoose.models = {};
module.exports = mongoose.model("Faculty", FacultySchema);
