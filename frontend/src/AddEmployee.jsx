import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

function AddEmployee() {
  const [form, setForm] = useState({ name: "", position: "", salary: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert("✅ Employee added successfully!");
        navigate("/employeeList");
      } else {
        alert("❌ Failed to add employee.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("⚠️ Something went wrong.");
    }
  };

  return (
    <div className="add-container">
      <div className="add-card">
        <h2 className="add-title">Add New Employee</h2>
        <p className="add-subtitle">
          Fill the details below to add a new team member.
        </p>

        <form onSubmit={handleSubmit} className="add-form">
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter employee name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Position</label>
            <input
              type="text"
              name="position"
              placeholder="Enter job position"
              value={form.position}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Salary (₹)</label>
            <input
              type="number"
              name="salary"
              placeholder="Enter salary amount"
              value={form.salary}
              onChange={handleChange}
              required
            />
          </div>

          <div className="btns">
            <button type="button" className="back-btn" onClick={() => navigate("/employeeList")}>
              ← Back
            </button>
            <button type="submit" className="save-btn">
              Save Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEmployee;
