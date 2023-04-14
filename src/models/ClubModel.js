const mongoose = require("mongoose");

const ClubSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    clubType: { type: String, required: true },
    linkedIn: String,
    instagram: String,
    website: String,
});

mongoose.models = {};
module.exports = mongoose.model("Club", ClubSchema);