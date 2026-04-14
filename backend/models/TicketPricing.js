const mongoose = require("mongoose");

const pricingSchema = new mongoose.Schema({
  source: String,
  destination: String,
  type: String,
  price: Number,
});

module.exports = mongoose.model("TicketPricing", pricingSchema);