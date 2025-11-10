import React, { useEffect, useState } from "react";
import "./style.css";

export default function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [status, setStatus] = useState("Present");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [records, setRecords] = useState([]);

  // ✅ Fetch Employees
  useEffect(() => {
    fetch("http://localhost:5000/employees")
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch((err) => console.error("Error fetching employees:", err));
  }, []);

  // ✅ Fetch Attendance
  const fetchAttendance = () => {
    fetch("http://localhost:5000/attendance")
      .then((res) => res.json())
      .then((data) => setRecords(data))
      .catch((err) => console.error("Error fetching attendance:", err));
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  // ✅ Mark Attendance
  const handleMarkAttendance = async () => {
    if (!selectedEmployee) {
      alert("Please select an employee");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ employeeId: selectedEmployee, date, status }),
      });

      const text = await res.text();
      console.log("🔍 Backend Raw Response:", text);

      const data = JSON.parse(text);
      if (res.ok) {
        alert("✅ " + data.message);
        fetchAttendance();
      } else {
        alert("❌ " + data.message);
      }
    } catch (err) {
      alert("⚠️ Error: " + err.message);
    }
  };

  // ✅ Counts
  const presentCount = records.filter((r) => r.status === "Present").length;
  const absentCount = records.filter((r) => r.status === "Absent").length;
  const leaveCount = records.filter((r) => r.status === "Leave").length;

  return (
    <div className="employee-page">
      <div className="employee-container">
        <div className="page-header">
          <img src="image/logo.png" alt="EMS Logo" className="header-logo" />
          <h1>Attendance Management</h1>
          <p>Mark and view attendance records for your employees.</p>
        </div>

        <div className="stats-container">
          <div className="stat-card present">
            <h2>{presentCount}</h2>
            <p>Present</p>
          </div>
          <div className="stat-card absent">
            <h2>{absentCount}</h2>
            <p>Absent</p>
          </div>
          <div className="stat-card leave">
            <h2>{leaveCount}</h2>
            <p>Leave</p>
          </div>
        </div>

        <div className="attendance-form">
          <select
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
          >
            <option value="">Select Employee</option>
            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.name}
              </option>
            ))}
          </select>

          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
            <option value="Leave">Leave</option>
          </select>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <button className="add-btn" onClick={handleMarkAttendance}>
            Mark Attendance
          </button>
        </div>

        <h2>Attendance Records</h2>
        <div className="employee-table">
          {records.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Position</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record._id}>
                    <td>{record.employeeId?.name}</td>
                    <td>{record.employeeId?.position}</td>
                    <td>{new Date(record.date).toLocaleDateString()}</td>
                    <td>
                      <span className={`status-badge ${record.status.toLowerCase()}`}>
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-data">No attendance records found</p>
          )}
        </div>
      </div>
    </div>
  );
}
