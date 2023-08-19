const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LikedReviewSchema = new Schema({
  review: {
    type: Schema.Types.ObjectId,
    ref: "Review",
  },
  liked: { type: Boolean },
});

mongoose.models = {};
module.exports = mongoose.model("LikedReview", LikedReviewSchema);
