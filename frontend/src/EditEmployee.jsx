import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./style.css";

export default function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({ name: "", position: "", salary: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch employee data by ID
  useEffect(() => {
    console.log("📡 Fetching employee:", id);
    fetch(`http://localhost:5000/employees/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Employee not found");
        return res.json();
      })
      .then((data) => {
        console.log("✅ Employee fetched:", data);
        setEmployee({
          name: data.name || "",
          position: data.position || "",
          salary: data.salary || "",
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching employee:", err);
        setError("Failed to load employee details");
        setLoading(false);
      });
  }, [id]);

  // ✅ Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  // ✅ Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/employees/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee),
      });

      if (res.ok) {
        alert("✅ Employee updated successfully!");
        navigate("/employeeList");
      } else {
        alert("❌ Failed to update employee");
      }
    } catch (err) {
      alert("❌ Error updating employee: " + err.message);
    }
  };

  if (loading) return <h2 className="loading-text">Loading employee...</h2>;
  if (error) return <h2 className="error-text">{error}</h2>;

  return (
    <div className="form-page">
      <div className="form-container">
        <h2>Edit Employee</h2>
        <p>Modify the employee details and save changes.</p>

        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={employee.name}
            onChange={handleChange}
            required
          />

          <label>Position</label>
          <input
            type="text"
            name="position"
            value={employee.position}
            onChange={handleChange}
            required
          />

          <label>Salary (₹)</label>
          <input
            type="number"
            name="salary"
            value={employee.salary}
            onChange={handleChange}
            required
          />

          <div className="form-buttons">
            <button
              type="button"
              className="back-btn"
              onClick={() => navigate("/employeeList")}
            >
              ← Back
            </button>
            <button type="submit" className="save-btn">
              💾 Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
