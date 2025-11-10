import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css"; // <- separate CSS

function Homepage() {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const userData = localStorage.getItem("user");
      if (userData && userData !== "undefined") {
        const user = JSON.parse(userData);
        setUserName(user.name);
      }
    } catch {
      localStorage.removeItem("user");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.info("Logged out successfully!", { position: "top-center", autoClose: 1500 });
    setTimeout(() => navigate("/signup"), 1600);
  };

  const handleGetStarted = () => {
    if (userName) navigate("/dashboard");
    else {
      toast.warning("Please sign up or log in first!", { position: "top-center", autoClose: 1500 });
      setTimeout(() => navigate("/signup"), 1600);
    }
  };

  return (
    <div className="home-shell">
      <ToastContainer />

      {/* Navbar */}
      <header className="navbar">
        <div className="brand">
          <img src="image/logo.png" alt="EmployeeHub Logo" />
        </div>

        <nav className="menu">
          <Link to="/">Home</Link>
          <Link to="/employeeList">Employee List</Link>
          <Link to="/attendance">Attendance</Link>
          <Link to="/reports">Reports</Link>
          <Link to="/dashboard">Dashboard</Link>
          {userName ? (
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link to="/signup" className="btn-link">Signup</Link>
          )}
        </nav>
      </header>

      {/* New Hero (no stats) */}
      <section className="new-hero">
        <div className="hero-content">
          <h1 className="new-title">
            {userName ? `Welcome, ${userName}!` : "Smart Management for a Smarter Workforce"}
          </h1>
          <p className="new-subtext">
            Keep teams aligned, automate routine tasks, and manage people with clarity.
          </p>

          <button className="new-cta" onClick={handleGetStarted}>
            Start Managing →
          </button>
        </div>

        <div className="hero-art">
          <img src="image/3d illustration.png" alt="Employee Art" className="hero-image" />
        </div>
      </section>

      <footer className="footer">
        <p>© 2025 Employee Management System | Designed by Aditi Sundaram</p>
      </footer>
    </div>
  );
}

export default Homepage;
