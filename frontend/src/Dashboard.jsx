import React from "react";
import "./dashboard.css";

export default function EverestDashboard() {
  return (
    <div className="dashboard">
      <div className="container">
        <div className="layout">

          {/* Sidebar */}
          <aside className="sidebar">
            {/* Brand */}
            <div className="brand">
              <div className="brand-icon">E</div>
              <div className="brand-title">EVEREST</div>
            </div>

            {/* Profile */}
            <div className="profile">
              <img
                className="profile-img"
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop"
                alt="avatar"
              />
              <div>
                <div className="profile-name">Katherine B.</div>
                <div className="profile-role">Sales Manager</div>
              </div>
            </div>

            {/* Nav */}
            <div className="nav">
              <div className="nav-label">MAIN</div>
              <div className="nav-item">
                <span>🏠 Dashboard</span>
                <span className="nav-badge">6</span>
              </div>
              <div className="nav-item">💸 Transactions</div>
              <div className="nav-item">📈 Reports</div>
              <div className="nav-item">📄 Documents</div>
              <div className="nav-item">👥 Customers</div>
              <div className="nav-item">🧾 Orders</div>
              <div className="nav-item">🕓 History</div>

              <div className="nav-label">OTHERS</div>
              <div className="nav-item">👤 Profile</div>
              <div className="nav-item">⚙️ Settings</div>
              <div className="nav-item">🚪 Logout</div>
            </div>

            {/* Upgrade */}
            <div className="upgrade-box">
              <div className="upgrade-title">Upgrade to Pro</div>
              <div className="upgrade-text">
                Unlock more features. Try without limits.
              </div>
              <button className="upgrade-btn">Update Subscription</button>
            </div>

          </aside>

          {/* Main */}
          <main className="main">

            {/* Top Bar */}
            <div className="topbar">
              <div className="breadcrumb">
                HOME / DASHBOARD / SALES MONITORING
              </div>

              <div className="right-controls">
                <input
                  className="date-input"
                  value="Aug 26, 2020 - Sep 19, 2020"
                  readOnly
                />
                <button className="button-primary">Download Report</button>
              </div>
            </div>

            {/* Title */}
            <h2 className="main-heading">Dashboard Overview</h2>

            {/* STAT CARDS */}
            <div className="stats-grid">

              <div className="stat-box">
                <p className="stat-title">TODAY’S SALES</p>
                <h3 className="stat-value">$1,812</h3>
                <span className="stat-up">↑ 1,582 since last day</span>
              </div>

              <div className="stat-box">
                <p className="stat-title">TODAY’S EARNINGS</p>
                <h3 className="stat-value">$11,241</h3>
                <span className="stat-down">↓ 1,002 since last day</span>
              </div>

              <div className="stat-box">
                <p className="stat-title">AVERAGE ORDER VALUE</p>
                <h3 className="stat-value">$3,241</h3>
                <span className="stat-up">↑ 203 since last day</span>
              </div>

            </div>


            {/* ================= SALES OVERVIEW + DONUT ================= */}
            <div className="section-grid">

              {/* ==== SALES OVERVIEW ==== */}
              <div className="sales-card">
                <div className="sales-header">
                  <div>
                    <p className="box-title">SALES OVERVIEW</p>
                    <p className="box-sub">Profit sharing between customers</p>
                  </div>

                  <select className="month-select">
                    <option>Monthly</option>
                    <option>Weekly</option>
                  </select>
                </div>

                <div className="bar-wrapper">
                  {[
                    40, 60, 50, 90, 70, 85,
                    95, 75, 65, 90, 110, 95
                  ].map((h, i) => (
                    <div key={i} className="bar-col">
                      <div className="bars">
                        <div className="bar1" style={{ height: h }}></div>
                        <div className="bar2" style={{ height: h - 10 }}></div>
                        <div className="bar3" style={{ height: Math.max(25, h - 35) }}></div>
                      </div>
                      <p className="bar-month">{"JFMAMJJASOND"[i]}</p>
                    </div>
                  ))}
                </div>
              </div>


              {/* ==== PROFIT SHARE ==== */}
              <div className="donut-card">
                <p className="box-title">PROFIT SHARE</p>
                <p className="box-sub">Profit sharing between customers</p>

                <div className="donut-wrap">
                  <div
                    className="donut"
                    style={{
                      background:
                        "conic-gradient(#818CF8 0deg 135deg, #22C55E 135deg 290deg, #FCA5A5 290deg 360deg)"
                    }}
                  ></div>

                  <div className="legend">
                    <p><span className="dot dot1"></span>37% Sports Ticket</p>
                    <p><span className="dot dot2"></span>43% Starred Items</p>
                    <p><span className="dot dot3"></span>20% Others</p>
                  </div>
                </div>
              </div>


              {/* ==== REVENUE CHANGE ==== */}
              <div className="donut-card">
                <p className="box-title">REVENUE CHANGE</p>
                <p className="box-sub">Breakdown by Cities</p>

                <div className="donut-wrap">
                  <div
                    className="donut"
                    style={{
                      background:
                        "conic-gradient(#818CF8 0deg 145deg, #60A5FA 145deg 235deg, #F472B6 235deg 360deg)"
                    }}
                  ></div>

                  <div className="legend">
                    <p><span className="dot dot1"></span>40% New York</p>
                    <p><span className="dot dot2"></span>25% Washington</p>
                    <p><span className="dot dot3"></span>35% Others</p>
                  </div>
                </div>
              </div>

            </div>


            {/* ✅ RIGHT SIDE CARDS + RECENT ORDERS TABLE ✅ */}
            <div className="right-side">

              {/* Gradient Card 1 */}
              <div className="gradient-card">
                <p className="grad-title">TOTAL EARNINGS</p>
                <h3 className="grad-value">$74,254.75</h3>
                <p className="grad-sub">Updated just now</p>
              </div>

              {/* Gradient Card 2 */}
              <div className="gradient-card">
                <p className="grad-title">GROSS EARNINGS</p>
                <h3 className="grad-value">$51,958.50</h3>
                <p className="grad-sub">FY 2019-2020</p>
              </div>

              {/* Recent Orders */}
              <div className="table-card">
                <div className="table-header">RECENT ORDERS</div>

                <div className="table-scroll">
                  <table>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Orders</th>
                        <th>Earnings</th>
                      </tr>
                    </thead>

                    <tbody>
                      {[...Array(10)].map((_, i) => (
                        <tr key={i}>
                          <td>{`${12 - i}/09/2019`}</td>
                          <td>{Math.round(3000 - i * 245)}</td>
                          <td>${(2589.63 + i * 134.2).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>


            {/* ✅ BOTTOM SECTION ✅ */}
            <div className="bottom-grid">

              {/* MOST RECENT EARNINGS */}
              <div className="bottom-card recent-earnings">
                <p className="small-sub">MOST RECENT EARNINGS</p>
                <p className="small-heading">Today • Week • Month • Year</p>

                <div className="three-grid">
                  {[
                    { name: "EXPANSIONS", amount: "$92,350.50" },
                    { name: "CANCELLATIONS", amount: "$10,301.50" },
                    { name: "RE-ORDERS", amount: "$45,254.00" },
                  ].map((x) => (
                    <div key={x.name} className="mini-box">
                      <p className="mini-title">{x.name}</p>
                      <p className="mini-value">{x.amount}</p>
                    </div>
                  ))}
                </div>
              </div>


              {/* WORLDWIDE */}
              <div className="bottom-card worldwide">
                <p className="small-sub">WORLDWIDE</p>
                <p className="small-heading">Active users by region</p>

                <div className="map-box">
                  Map Placeholder
                </div>
              </div>


              {/* NOTES */}
              <div className="bottom-card notes-box">
                <p className="small-sub">NOTES</p>
                <p className="note-text">
                  This UI is a static clone for demonstration and styling. Replace these widgets with your live charts/tables as needed.
                </p>

                <div className="two-grid">
                  <div className="note-small">
                    <p className="mini-title">NET EARNINGS</p>
                    <p className="mini-value">$31,608.50</p>
                  </div>

                  <div className="note-small">
                    <p className="mini-title">TAX WITHHELD</p>
                    <p className="mini-value">$24,769.50</p>
                  </div>
                </div>
              </div>

            </div>

          </main>

        </div>
      </div>
    </div>
  );
}
