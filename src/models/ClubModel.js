const mongoose = require("mongoose");

const ClubSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  clubType: { type: String, required: true, enum: ["Tech", "Non-Tech"] },
  linkedIn: { type: String },
  instagram: { type: String },
});

mongoose.models = {};
module.exports = mongoose.model("Club", ClubSchema);