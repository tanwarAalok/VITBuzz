const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  comment: String,
  likes: { type: Number, default: 0 },
  ratings: {
    avgRating: { type: String, default: 0 },
    paperRating: { type: String, default: 0 },
    behaviourRating: { type: String, default: 0 },
    teachingRating: { type: String, default: 0 },
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
});

mongoose.models = {};
module.exports = mongoose.model("Review", ReviewSchema);
