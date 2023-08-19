const mongoose = require("mongoose");

const PaperSchema = new mongoose.Schema({
    courseCode: { type: String, required: true },
    courseTitle: {type: String, required: true},
    facultyName: { type: String, required: true },
    paperType: { type: String, required: true, enum: ['Mid-Term', 'Term-End'] },
    link: { type: String, required: true },
    approved: {type: Boolean, default: false}
});

mongoose.models = {};
module.exports = mongoose.model("Paper", PaperSchema);