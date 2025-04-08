import React, { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import UploadMedia from "./components/UploadMedia";
import Gallery from "./components/Gallery";

function App() {
  const [showLogin, setShowLogin] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLoginSuccess = (receivedToken) => {
    localStorage.setItem("token", receivedToken);
    setToken(receivedToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>🏍️ 100ttani Motoclub</h1>

      {!token && (
        <>
          {showLogin ? (
            <Login onLoginSuccess={handleLoginSuccess} />
          ) : (
            <Register onRegisterSuccess={handleLoginSuccess} />
          )}

          <p style={{ marginTop: "1rem" }}>
            {showLogin ? "Non hai un account?" : "Hai già un account?"}{" "}
            <button
              onClick={() => setShowLogin(!showLogin)}
              style={{
                background: "none",
                border: "none",
                color: "#007bff",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              {showLogin ? "Registrati qui" : "Accedi qui"}
            </button>
          </p>
        </>
      )}

      {token && (
        <>
          <button
            onClick={handleLogout}
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1rem",
              backgroundColor: "crimson",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            🔓 Logout
          </button>

          <UploadMedia />
          <Gallery />
        </>
      )}
    </div>
  );
}

export default App;
