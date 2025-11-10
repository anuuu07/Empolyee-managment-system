import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

export default function GetStarted() {
  const navigate = useNavigate();

  return (
    <div className="get-started-section">
      <div className="get-started-content">
        <h1>Welcome to the Employee Management System</h1>
        <p>
          A modern solution to manage your employees efficiently — add, update, and
          track attendance with ease.
        </p>

        <div className="steps-container">
          <div className="step-card">
            <h3>👤 Sign Up / Login</h3>
            <p>Get secure access to your management dashboard.</p>
          </div>
          <div className="step-card">
            <h3>➕ Add Employees</h3>
            <p>Register new employees and define their roles.</p>
          </div>
          <div className="step-card">
            <h3>🗓️ Manage Attendance</h3>
            <p>Track presence, absence, and leaves daily.</p>
          </div>
          <div className="step-card">
            <h3>📊 View Reports</h3>
            <p>Visualize employee and attendance analytics.</p>
          </div>
        </div>

        <button className="get-started-btn" onClick={() => navigate("/dashboard")}>
          🚀 Get Started
        </button>
      </div>
    </div>
  );
}
