require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ FIXED origins (NO trailing slash)
const allowedOrigins = [
  "http://localhost:5173",
  "https://msrtc-connect.vercel.app"
];

// ✅ Better CORS handling (important)
app.use(cors({
  origin: (origin, callback) => {
    console.log("Origin:", origin); // 🔍 DEBUG

    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// ✅ VERY IMPORTANT (missing in your code)
app.use(express.json());

// 🔗 MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch(err => console.log(err));

// Routes
app.use("/api/bus", require("./routes/busRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/timetables", require("./routes/timetableRoutes"));
app.use("/api/pricing", require("./routes/pricingRoutes"));

// ✅ Use dynamic port for Render
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));