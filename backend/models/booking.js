const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: {   // ✅ ADD THIS FIELD
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  userName: String,
  busId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bus",
  },
  source: String,
  destination: String,
  date: String,
  seatsBooked: Number,
  totalPrice: Number,
  status: {
    type: String,
    default: "Pending"
  },
}, {
  collection: "ticket_book",
  timestamps: true
});

module.exports = mongoose.model("Booking", bookingSchema);