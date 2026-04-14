const mongoose = require("mongoose");

const timetableSchema = new mongoose.Schema({
  city: { type: String, required: true },
  fileName: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Timetable", timetableSchema);