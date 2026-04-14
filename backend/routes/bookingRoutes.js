require("dotenv").config();
const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const Bus = require("../models/Bus");
const User = require("../models/User");
const Razorpay = require("razorpay");
const Pricing = require("../models/TicketPricing");

const SibApiV3Sdk = require("sib-api-v3-sdk");

const client = SibApiV3Sdk.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY; // 🔁 paste here

const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// 🎟️ BOOK TICKET
router.post("/book", async (req, res) => {
  try {
    const { userId, userName, busId, seats, gender, age, isDisabled } = req.body;

    const bus = await Bus.findById(busId);

    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (bus.availableSeats < seats) {
      return res.status(400).json({ message: "Not enough seats" });
    }


    // 🔥 Get price from DB
    const pricing = await Pricing.findOne({
      source: bus.source,
      destination: bus.destination,
      type: bus.type,
    });

    let basePrice = pricing ? pricing.price : 0;
    let finalPrice = basePrice;

    // 🎯 DISCOUNT LOGIC
    if (isDisabled) {
      finalPrice = 0;
    } else if (age > 60) {
      finalPrice = 0;
    } else if (gender === "Female") {
      finalPrice = basePrice * 0.5;
    }

    const totalPrice = finalPrice * seats;

    const booking = new Booking({
    userId, // ✅ ADD THIS
    userName,
    busId,
    source: bus.source,
    destination: bus.destination,
    date: new Date(),
    seatsBooked: seats,
    totalPrice,
    status: "CONFIRMED",
  });

    await booking.save();

    bus.availableSeats -= seats;
    await bus.save();

    res.json({
      message: totalPrice === 0
        ? "Free ticket booked successfully 🎉"
        : "Proceed to payment 💳",
      booking,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ error: "Amount required" });
    }

    const options = {
      amount: amount * 100, // paise
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.json(order);

  } catch (error) {
    console.log("RAZORPAY ERROR:", error); // 🔥 IMPORTANT
    res.status(500).json({ error: error.message });
  }
});

router.post("/send-email", async (req, res) => {
  try {
    const { userEmail, userName, booking } = req.body;

    await tranEmailApi.sendTransacEmail({
      sender: {
        email: "mahajandarshana299@gmail.com", // ⚠️ replace with Brevo verified email
        name: "MSRTC Booking",
      },

      to: [
        {
          email: userEmail,
          name: userName,
        },
      ],

      subject: "🚌 Ticket Booking Confirmed",

      htmlContent: `
        <h2>Booking Confirmed 🎉</h2>
        <p><b>Name:</b> ${userName}</p>
        <p><b>From:</b> ${booking.source}</p>
        <p><b>To:</b> ${booking.destination}</p>
        <p><b>Seats:</b> ${booking.seatsBooked}</p>
        <p><b>Total Paid:</b> ₹${booking.totalPrice}</p>
        <p><b>Status:</b> SUCCESS</p>
        <br/>
        <p>Thank you for booking with MSRTC 🚍</p>
      `,
    });

    res.json({ success: true });

  } catch (error) {
    console.log("EMAIL ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

// 📊 ANALYTICS
router.get("/analytics", async (req, res) => {
  try {
    const bookings = await Booking.find();

    // ✅ Total Bookings
    const totalBookings = bookings.length;

    // ✅ Total Revenue
    const totalRevenue = bookings.reduce(
      (sum, b) => sum + (b.totalPrice || 0),
      0
    );

    // ✅ Most Popular Route
    const routeCount = {};

    bookings.forEach((b) => {
      const route = `${b.source} → ${b.destination}`;
      routeCount[route] = (routeCount[route] || 0) + 1;
    });

    let topRoute = "N/A";
    let max = 0;

    for (let route in routeCount) {
      if (routeCount[route] > max) {
        max = routeCount[route];
        topRoute = route;
      }
    }

    res.json({
      totalBookings,
      totalRevenue,
      topRoute,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📋 Get All Bookings (Admin)
router.get("/all", async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userId", "email name");

    res.json(bookings);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;