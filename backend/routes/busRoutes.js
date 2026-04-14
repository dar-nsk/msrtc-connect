const express = require("express");
const router = express.Router();
const Bus = require("../models/Bus");

// 🔍 Search Buses
router.post("/search", async (req, res) => {
  const { source, destination, date, busType } = req.body;

  try {
    let query = {
      source: source,
      destination: destination,
    };

    // Optional filter for bus type
    if (busType && busType !== "All") {
      query.type = busType;
    }

    const buses = await Bus.find(query);

    res.json(buses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/add", async (req, res) => {
  try {
    const newBus = new Bus(req.body);
    await newBus.save();
    res.json({ message: "Bus added" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get All Buses
router.get("/", async (req, res) => {
  const buses = await Bus.find();
  res.json(buses);
});

// Delete Bus
router.delete("/:id", async (req, res) => {
  await Bus.findByIdAndDelete(req.params.id);
  res.json({ message: "Bus deleted" });
});

module.exports = router;