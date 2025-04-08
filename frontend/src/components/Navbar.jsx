import React from "react";

function Navbar({ isLoggedIn, onLogout, onToggleAuth, onToggleTheme, isDark }) {
  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#222",
        padding: "1rem 2rem",
        color: "white",
      }}
    >
      {/* LOGO CLICCABILE */}
      <a href="/" style={{ display: "flex", alignItems: "center" }}>
        <img
          src="/logo.png"
          alt="100ttani Logo"
          style={{ height: "50px", marginRight: "1rem", cursor: "pointer" }}
        />
      </a>

      {/* SWITCH TEMA */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <button
          onClick={onToggleTheme}
          style={{
            backgroundColor: "#555",
            color: "#fff",
            padding: "0.4rem 1rem",
            border: "none",
            borderRadius: "5px",
            marginRight: "1rem",
            cursor: "pointer",
          }}
        >
          🌓 Tema {isDark ? "Chiaro" : "Scuro"}
        </button>

        {/* PULSANTI LOGIN / LOGOUT */}
        {isLoggedIn ? (
          <button
            onClick={onLogout}
            style={{
              backgroundColor: "crimson",
              color: "white",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            🔓 Logout
          </button>
        ) : (
          <button
            onClick={onToggleAuth}
            style={{
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            🔐 Login / Register
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
