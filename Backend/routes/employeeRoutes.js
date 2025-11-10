import express from "express";
import Employee from "../models/Employee.js";

const router = express.Router();

// ✅ GET all employees
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: "Server Error: " + err.message });
  }
});

// ✅ GET single employee by ID
router.get("/:id", async (req, res) => {
  console.log("🟢 Requested employee ID:", req.params.id);
  try {
    const empId = req.params.id.trim();
    const emp = await Employee.findById(empId);
    if (!emp) return res.status(404).json({ message: "Employee not found" });
    res.status(200).json(emp);
  } catch (err) {
    console.error("❌ Error fetching employee:", err.message);
    res.status(400).json({ message: "Invalid employee ID" });
  }
});

// ✅ POST create new employee
router.post("/", async (req, res) => {
  console.log("📩 Received Data:", req.body);
  try {
    const emp = new Employee(req.body);
    await emp.save();
    res.status(201).json({ message: "Employee added successfully", data: emp });
  } catch (err) {
    res.status(400).json({ message: "Failed to save employee: " + err.message });
  }
});

// ✅ PUT update existing employee
router.put("/:id", async (req, res) => {
  try {
    const empId = req.params.id.trim();
    const updated = await Employee.findByIdAndUpdate(empId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: "Employee not found" });
    res.status(200).json({ message: "Employee updated successfully", data: updated });
  } catch (err) {
    res.status(400).json({ message: "Failed to update: " + err.message });
  }
});

// ✅ DELETE employee
router.delete("/:id", async (req, res) => {
  try {
    const empId = req.params.id.trim();
    const deleted = await Employee.findByIdAndDelete(empId);
    if (!deleted) return res.status(404).json({ message: "Employee not found" });
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Failed to delete: " + err.message });
  }
});

export default router;
