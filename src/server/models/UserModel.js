const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  coins: { type: Number, default: 0 },
  image: String,
  likedReview: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "LikedReview",
    default: []
  },
});

mongoose.models = {};
module.exports = mongoose.model("User", UserSchema);
