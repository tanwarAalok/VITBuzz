const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

mongoose.models = {};
module.exports = mongoose.model("User", UserSchema);
