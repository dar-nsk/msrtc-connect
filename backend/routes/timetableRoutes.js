const express = require("express");
const router = express.Router();
const Timetable = require("../models/Timetable");

// Add or Update timetable
router.post("/add", async (req, res) => {
  const { city, fileName } = req.body;

  try {
    const existing = await Timetable.findOne({ city });

    if (existing) {
      existing.fileName = fileName;
      await existing.save();
      return res.json({ message: "Updated successfully" });
    }

    const newEntry = new Timetable({ city, fileName });
    await newEntry.save();

    res.json({ message: "Added successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all timetables
router.get("/", async (req, res) => {
  const data = await Timetable.find();
  res.json(data);
});

// Delete
router.delete("/:city", async (req, res) => {
  await Timetable.findOneAndDelete({ city: req.params.city });
  res.json({ message: "Deleted" });
});

module.exports = router;