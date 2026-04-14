const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  busName: String,
  source: String,
  destination: String,
  type: String,
  departureTime: String,
  arrivalTime: String,
  availableSeats: Number,
});

module.exports = mongoose.model("Bus", busSchema);