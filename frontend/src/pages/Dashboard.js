import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";

const StatCard = ({ label, value, colorClass }) => (
  <div className="stat-card">
    <div className="stat-label">{label}</div>
    <div className={`stat-value ${colorClass || ""}`}>{value ?? "—"}</div>
  </div>
);

function Dashboard() {
  const [stats, setStats]   = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/dashboard")
      .then((res) => setStats(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // progress bar percentage
  const pct = stats.totalTasks
    ? Math.round((stats.completedTasks / stats.totalTasks) * 100)
    : 0;

  return (
    <>
      <Navbar />
      <div className="page">
        <div className="page-header">
          <h2 className="page-title">Overview</h2>
          {!loading && (
            <span style={{ fontSize: 13, color: "var(--muted)" }}>
              {new Date().toLocaleDateString("en-IN", { dateStyle: "long" })}
            </span>
          )}
        </div>

        {loading ? (
          <p style={{ color: "var(--muted)" }}>Loading stats…</p>
        ) : (
          <>
            <div className="stat-grid">
              <StatCard label="Total Projects"     value={stats.totalProjects}      colorClass="stat-accent" />
              <StatCard label="In Progress"        value={stats.inProgressProjects} colorClass="stat-amber"  />
              <StatCard label="Total Tasks"        value={stats.totalTasks}         />
              <StatCard label="Completed Tasks"    value={stats.completedTasks}     colorClass="stat-green"  />
              <StatCard label="Pending Tasks"      value={stats.pendingTasks}       colorClass="stat-red"    />
            </div>

            {/* Task completion bar */}
            {stats.totalTasks > 0 && (
              <div className="card">
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>Task completion</span>
                  <span style={{ fontSize: 13, color: "var(--green)", fontWeight: 600 }}>{pct}%</span>
                </div>
                <div style={{
                  height: 8, borderRadius: 99,
                  background: "var(--border)", overflow: "hidden"
                }}>
                  <div style={{
                    height: "100%", borderRadius: 99,
                    width: `${pct}%`,
                    background: "linear-gradient(90deg, var(--indigo), var(--green))",
                    transition: "width .6s ease",
                  }} />
                </div>
                <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 8 }}>
                  {stats.completedTasks} of {stats.totalTasks} tasks done
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Dashboard;
