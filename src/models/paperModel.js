const mongoose = require("mongoose");

const PaperSchema = new mongoose.Schema({
    courseCode: { type: String, required: true },
    faculty: { type: String, required: true },
    paperType: { type: String, required: true },
    link: { type: String, required: true }
});

mongoose.models = {};
module.exports = mongoose.model("Paper", PaperSchema);