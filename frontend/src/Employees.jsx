import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({ name: "", position: "", salary: "" });
  const [search, setSearch] = useState("");

  // Fetch employees
  const fetchEmployees = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/employees?search=${search}`);
      setEmployees(res.data);
    } catch (error) {
      console.error("❌ Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [search]);

  // Add new employee
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/employees", formData);
      setFormData({ name: "", position: "", salary: "" });
      fetchEmployees();
    } catch (error) {
      console.error("❌ Error adding employee:", error);
    }
  };

  // Delete employee
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/employees/${id}`);
      fetchEmployees();
    } catch (error) {
      console.error("❌ Error deleting employee:", error);
    }
  };

  return (
    <div className="employees-container">
      <h1>Employee Management System</h1>

      {/* Search */}
      <div className="top-bar">
        <input
          type="text"
          placeholder="Search employees..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Add form */}
      <form className="add-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Employee Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Position"
          value={formData.position}
          onChange={(e) => setFormData({ ...formData, position: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Salary"
          value={formData.salary}
          onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
          required
        />
        <button type="submit">Add Employee</button>
      </form>

      {/* Employees list */}
      <div className="table-container">
        {employees.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp._id}>
                  <td>{emp.name}</td>
                  <td>{emp.position}</td>
                  <td>₹{emp.salary}</td>
                  <td>
                    <button onClick={() => handleDelete(emp._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No employees found.</p>
        )}
      </div>
    </div>
  );
};

export default Employees;
