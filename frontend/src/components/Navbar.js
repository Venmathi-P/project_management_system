import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const { pathname } = useLocation();
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const navLinks = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/projects",  label: "Projects" },
    { to: "/tasks",     label: "Tasks" },
  ];

  return (
    <nav style={{
      background: "var(--surface)",
      borderBottom: "1px solid var(--border)",
      padding: "0 24px",
      display: "flex",
      alignItems: "center",
      height: 56,
      position: "sticky",
      top: 0,
      zIndex: 100,
    }}>
      {/* Logo */}
      <Link to="/dashboard" style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 18,
        fontWeight: 700,
        color: "var(--indigo)",
        textDecoration: "none",
        marginRight: 32,
        letterSpacing: "-.01em",
      }}>
        ◈ PMS
      </Link>

      {/* Nav links */}
      <div style={{ display: "flex", gap: 4, flex: 1 }}>
        {navLinks.map(({ to, label }) => {
          const active = pathname === to;
          return (
            <Link key={to} to={to} style={{
              padding: "6px 14px",
              borderRadius: 8,
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 500,
              color: active ? "#fff" : "var(--muted)",
              background: active ? "var(--indigo-dim)" : "transparent",
              transition: "all .15s",
            }}>
              {label}
            </Link>
          );
        })}
      </div>

      {/* Logout */}
      <button className="btn btn-ghost btn-sm" onClick={logout}>
        Sign out
      </button>
    </nav>
  );
}

export default Navbar;
