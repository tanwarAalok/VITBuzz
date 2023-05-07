const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  coins: {type: Number, default: 0}
});

mongoose.models = {};
module.exports = mongoose.model("User", UserSchema);
