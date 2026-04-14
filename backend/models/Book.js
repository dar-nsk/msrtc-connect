const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: String,
  busId: String,
  passengerName: String,
  age: Number,
  gender: String,
  seats: Number,
  amount: Number,
  status: {
    type: String,
    default: "Pending"
  }
});

module.exports = mongoose.model("Book", bookingSchema);