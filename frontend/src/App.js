import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";   // ✅ ✅ ADD THIS

import Homepage from "./Homepage";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import EmployeeList from "./EmployeeList";
import AddEmployee from "./AddEmployee";
import EditEmployee from "./EditEmployee";
import Attendance from "./Attendance";
import GetStarted from "./GetStarted";
import Reports from "./Reports";

function App() {
  return (
    <Router>
      <Routes>
        {/* 🔹 Main Pages */}
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* 🔹 Employee Management */}
        <Route path="/employeeList" element={<EmployeeList />} />
        <Route path="/addEmployee" element={<AddEmployee />} />
        <Route path="/edit/:id" element={<EditEmployee />} />

        {/* 🔹 Attendance & Reports */}
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/reports" element={<Reports />} />

        {/* 🔹 Info Section */}
        <Route path="/getstarted" element={<GetStarted />} />
      </Routes>
    </Router>
  );
}

export default App;
