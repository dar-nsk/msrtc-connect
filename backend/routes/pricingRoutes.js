const express = require("express");
const router = express.Router();
const Pricing = require("../models/TicketPricing");

// ➕ Add / Update Pricing
router.post("/add", async (req, res) => {
  const { source, destination, type, price } = req.body;

  try {
    // Replace if already exists
    const existing = await Pricing.findOne({ source, destination, type });

    if (existing) {
      existing.price = price;
      await existing.save();
      return res.json({ message: "Price updated" });
    }

    const newPrice = new Pricing(req.body);
    await newPrice.save();

    res.json({ message: "Price added" });

  } catch (err) {
    res.status(500).json(err);
  }
});

// 📋 Get All Pricing
router.get("/", async (req, res) => {
  const data = await Pricing.find();
  res.json(data);
});

// ❌ Delete
router.delete("/:id", async (req, res) => {
  await Pricing.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;