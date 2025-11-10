import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";
// import CountUp from "react-countup";   // ✅ Enable if needed
import "./style.css";

export default function Reports() {
  const [attendance, setAttendance] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const navigate = useNavigate();

  /* 🔹 FETCH DATA */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [attRes, empRes] = await Promise.all([
          fetch("http://localhost:5000/attendance"),
          fetch("http://localhost:5000/employees"),
        ]);

        if (!attRes.ok || !empRes.ok) {
          throw new Error("Server not responding correctly");
        }

        const attData = await attRes.json();
        const empData = await empRes.json();

        setAttendance(Array.isArray(attData) ? attData : []);
        setEmployees(Array.isArray(empData) ? empData : []);
        setLoading(false);
      } catch (err) {
        setError("Failed to load reports. Check backend connection.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* 🔹 DOWNLOAD PDF */
  const handleDownloadPDF = () => {
    const report = document.querySelector(".reports-page");
    html2canvas(report, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save("Employee_Report.pdf");
    });
  };

  /* 🔹 EXPORT CSV */
  const exportCSV = () => {
    if (!attendance.length) return alert("No attendance data!");

    const header = "Name,Date,Status\n";
    const rows = attendance
      .map((a) => `${a.name},${a.date},${a.status}`)
      .join("\n");

    const blob = new Blob([header + rows], { type: "text/csv" });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "attendance_report.csv";
    link.click();
  };

  /* 🔹 BACK */
  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  if (loading) return <h2 className="loading-text">Loading...</h2>;
  if (error)
    return <h2 className="error-text" style={{ color: "red" }}>{error}</h2>;

  /* 🔹 Stats */
  const totalPresent = attendance.filter((a) => a.status === "Present").length;
  const totalAbsent = attendance.filter((a) => a.status === "Absent").length;
  const totalLeave = attendance.filter((a) => a.status === "Leave").length;

  const chartData = [
    { name: "Present", count: totalPresent },
    { name: "Absent", count: totalAbsent },
    { name: "Leave", count: totalLeave },
  ];

  const COLORS = ["#22C55E", "#EF4444", "#F59E0B"];

  return (
    <div className={`reports-page ${darkMode ? "dark" : ""}`}>

      {/* HEADER */}
      <div className="reports-header">
        <h1>📊 Reports & Analytics</h1>
        <p>Visual overview of employee attendance and performance.</p>

        {/* ✅ Filters */}
        <div className="filter-row">
          <select className="filter-select">
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
            <option>This Year</option>
          </select>

          <select
            className="filter-select"
            onChange={(e) => {
              if (e.target.value === "pdf") handleDownloadPDF();
              if (e.target.value === "csv") exportCSV();
              if (e.target.value === "print") window.print();
            }}
          >
            <option value="">Export Options</option>
            <option value="pdf">📄 PDF</option>
            <option value="csv">📁 CSV</option>
            <option value="print">🖨 Print</option>
          </select>
        </div>

        {/* ✅ Dark Mode Toggle */}
        <button
          className="mode-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>

        {/* ✅ Direct Export PDF */}
        <button className="download-btn" onClick={handleDownloadPDF}>
          📄 Export PDF
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="reports-cards">
        <div className="r-card">
          <div className="r-icon total">👥</div>
          <h2>{employees.length}</h2>
          <p>Total Employees</p>
          <div className="spark"></div>
        </div>

        <div className="r-card present">
          <div className="r-icon present">✅</div>
          <h2>{totalPresent}</h2>
          <p>Present</p>
          <div className="spark"></div>
        </div>

        <div className="r-card absent">
          <div className="r-icon absent">❌</div>
          <h2>{totalAbsent}</h2>
          <p>Absent</p>
          <div className="spark"></div>
        </div>

        <div className="r-card leave">
          <div className="r-icon leave">🟡</div>
          <h2>{totalLeave}</h2>
          <p>On Leave</p>
          <div className="spark"></div>
        </div>
      </div>

      {/* CHARTS */}
      <div className="chart-flex">

        {/* BAR CHART */}
        <div className="chart-box">
          <h2>Attendance Overview</h2>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#4F46E5" barSize={60} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* PIE CHART */}
        <div className="chart-box">
          <h2>Attendance Distribution</h2>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="count"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* BACK BUTTON */}
      <button className="back-btn" onClick={handleBackToDashboard}>
        🏠 Back
      </button>

      <p className="footer-note">
        💡 Reports auto-update as new records are added.
      </p>
    </div>
  );
}
