import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // ✅ Fetch all employees from backend
  useEffect(() => {
    fetch("http://localhost:5000/employees")
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch(() => setEmployees([]));
  }, []);

  // ✅ Delete employee
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await fetch(`http://localhost:5000/employees/${id}`, {
          method: "DELETE",
        });
        setEmployees(employees.filter((e) => e._id !== id));
      } catch (error) {
        alert("Error deleting employee.");
      }
    }
  };

  // ✅ Filter employees by name
  const filtered = employees.filter((e) =>
    (e.name || "").toLowerCase().includes(search.toLowerCase())
  );

  // 🖨️ Print single employee — beautifully formatted
  const handlePrint = (emp) => {
    const currentDate = new Date().toLocaleDateString();
    const printContent = `
      <div style="font-family: 'Poppins', sans-serif; text-align: center; padding: 30px;">
        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Logo" width="80" />
        <h2 style="color: #2563eb; margin-top: 10px;">Employee Management System</h2>
        <h3 style="margin-top: 5px; color: #111;">Employee Details Report</h3>
        <p style="color: gray; font-size: 13px;">Generated on: ${currentDate}</p>
        <hr style="margin: 20px 0; border: 1px solid #e5e7eb;" />
        <table style="margin: 0 auto; border-collapse: collapse; width: 60%;">
          <tr><td style="padding: 8px; text-align: left;"><strong>Name:</strong></td><td>${emp.name}</td></tr>
          <tr><td style="padding: 8px; text-align: left;"><strong>Position:</strong></td><td>${emp.position}</td></tr>
          <tr><td style="padding: 8px; text-align: left;"><strong>Salary (₹):</strong></td><td>${emp.salary}</td></tr>
        </table>
        <hr style="margin: 20px 0; border: 1px solid #e5e7eb;" />
        <p style="font-size: 12px; color: gray;">© ${new Date().getFullYear()} Employee Management System</p>
      </div>
    `;
    const newWindow = window.open("", "_blank", "width=500,height=700");
    newWindow.document.write(printContent);
    newWindow.document.close();
    newWindow.print();
  };

  // 🖨️ Print all employees — full professional report layout
  const handlePrintAll = () => {
    const currentDate = new Date().toLocaleDateString();

    const tableRows = employees
      .map(
        (emp, index) => `
          <tr style="background-color: ${index % 2 === 0 ? "#f9fafb" : "#ffffff"};">
            <td style="border: 1px solid #e5e7eb; padding: 8px;">${emp.name}</td>
            <td style="border: 1px solid #e5e7eb; padding: 8px;">${emp.position}</td>
            <td style="border: 1px solid #e5e7eb; padding: 8px;">₹${emp.salary}</td>
          </tr>`
      )
      .join("");

    const printContent = `
      <div style="font-family: 'Poppins', sans-serif; text-align: center; padding: 30px;">
        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Logo" width="80" />
        <h2 style="color: #2563eb; margin-top: 10px;">Employee Management System</h2>
        <h3 style="margin-top: 5px; color: #111;">Complete Employee Report</h3>
        <p style="color: gray; font-size: 13px;">Generated on: ${currentDate}</p>
        <hr style="margin: 20px 0; border: 1px solid #e5e7eb;" />
        <table style="width: 80%; margin: 0 auto; border-collapse: collapse;">
          <thead>
            <tr style="background-color: #e0f2fe; color: #111;">
              <th style="border: 1px solid #e5e7eb; padding: 10px;">Name</th>
              <th style="border: 1px solid #e5e7eb; padding: 10px;">Position</th>
              <th style="border: 1px solid #e5e7eb; padding: 10px;">Salary (₹)</th>
            </tr>
          </thead>
          <tbody>${tableRows}</tbody>
        </table>
        <hr style="margin: 20px 0; border: 1px solid #e5e7eb;" />
        <p style="font-size: 12px; color: gray;">© ${new Date().getFullYear()} Employee Management System</p>
      </div>
    `;

    const newWindow = window.open("", "_blank", "width=900,height=1000");
    newWindow.document.write(printContent);
    newWindow.document.close();
    newWindow.print();
  };

  return (
    <div className="employee-page">
      <div className="employee-container">
        {/* Header Section */}
        <div className="page-header">
          <img src="image/logo.png" alt="EMS Logo" className="header-logo" />
          <h1>Employee List</h1>
          <p>Manage, edit, and view all registered employees easily.</p>
        </div>

        {/* Stats + Buttons */}
        <div className="stats-actions">
          <div className="stats-container">
            <div className="stat-card">
              <h2>{employees.length}</h2>
              <p>Total Employees</p>
            </div>
            <div className="stat-card">
              <h2>
                ₹
                {employees
                  .reduce((sum, e) => sum + (Number(e.salary) || 0), 0)
                  .toLocaleString()}
              </h2>
              <p>Total Salary</p>
            </div>
            <div className="stat-card">
              <h2>93%</h2>
              <p>Performance Rate</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="button-group">
            <button className="add-btn" onClick={() => navigate("/addEmployee")}>
              + Add Employee
            </button>
            <button className="print-all-btn" onClick={handlePrintAll}>
              🖨️ Print All Employees
            </button>
          </div>
        </div>

        {/* Search Input */}
        <div className="search-section">
          <input
            type="text"
            placeholder="Search Employee by Name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Employee Table */}
        <div className="employee-table">
          {filtered.length > 0 ? (
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
                {filtered.map((emp) => (
                  <tr key={emp._id}>
                    <td>{emp.name}</td>
                    <td>{emp.position}</td>
                    <td>₹{emp.salary}</td>
                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => navigate(`/edit/${emp._id}`)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(emp._id)}
                      >
                        Delete
                      </button>
                      <button
                        className="print-btn"
                        onClick={() => handlePrint(emp)}
                      >
                        🖨️ Print
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-data">No employees found</p>
          )}
        </div>
      </div>
    </div>
  );
}
