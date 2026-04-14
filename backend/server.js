require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: "http://localhost:5173", // frontend URL
}));
app.use(express.json());

// 🔗 MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch(err => console.log(err));

// Routes (we'll add later)
app.use("/api/bus", require("./routes/busRoutes"));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/timetables", require("./routes/timetableRoutes"));
app.use("/api/pricing", require("./routes/pricingRoutes"));


app.listen(5000, () => console.log("Server running on port 5000"));

//npx nodemon server.js 