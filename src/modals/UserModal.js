const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  rating: { type: String },
  review: { type: String },
});

mongoose.models = {};
module.exports = mongoose.model("User", UserSchema);
