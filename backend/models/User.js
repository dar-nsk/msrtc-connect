const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["Passenger", "Staff", "Admin"],
    required: true,
    default: "Passenger",
  },

  name: String,
  surname: String,
  age: Number,
  gender: String,

  mobile: {
    type: String,
    required: true,
    unique: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Invalid email format ❌"],
  },

  password: {
    type: String,
    required: true,
  },

}, {
  timestamps: true
});

module.exports = mongoose.model("User", userSchema);