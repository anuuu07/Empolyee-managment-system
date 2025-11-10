import express from "express";
import Attendance from "../models/Attendance.js";

const router = express.Router();

// ✅ Mark Attendance
router.post("/", async (req, res) => {
  try {
    const { employeeId, date, status } = req.body;
    console.log("📩 Received Attendance Data:", req.body);

    if (!employeeId || !date || !status) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Normalize date to remove time difference
    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0);

    // Prevent duplicates
    const existing = await Attendance.findOne({ employeeId, date: normalizedDate });
    if (existing) {
      return res.status(400).json({ message: "Attendance already marked for this date" });
    }

    const newRecord = new Attendance({ employeeId, date: normalizedDate, status });
    await newRecord.save();

    const populated = await newRecord.populate("employeeId", "name position");

    res.status(201).json({ message: "Attendance marked successfully", data: populated });
  } catch (err) {
    console.error("❌ Error marking attendance:", err.message);
    res.status(500).json({ message: "Failed to mark attendance", error: err.message });
  }
});

// ✅ Fetch all attendance records
router.get("/", async (req, res) => {
  try {
    const records = await Attendance.find()
      .populate("employeeId", "name position")
      .sort({ date: -1 });
    res.status(200).json(records);
  } catch (err) {
    console.error("❌ Error fetching attendance:", err.message);
    res.status(500).json({ message: "Failed to fetch attendance", error: err.message });
  }
});

export default router;
