import express from "express";
import Employee from "../models/Employee.js";
const router = express.Router();

// 🧾 Get all employees (with optional search)
router.get("/employees", async (req, res) => {
  try {
    const search = req.query.search || "";
    const employees = await Employee.find({
      name: { $regex: search, $options: "i" },
    });
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ➕ Add new employee
router.post("/employees", async (req, res) => {
  try {
    const { name, position, salary } = req.body;
    const newEmployee = new Employee({ name, position, salary });
    await newEmployee.save();
    res.status(201).json({ message: "Employee added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✏️ Update employee
router.put("/employees/:id", async (req, res) => {
  try {
    const { name, position, salary, status } = req.body;
    const updated = await Employee.findByIdAndUpdate(
      req.params.id,
      { name, position, salary, status },
      { new: true }
    );
    res.json({ message: "Employee updated", updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ❌ Delete employee
router.delete("/employees/:id", async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: "Employee deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
