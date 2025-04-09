import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import UploadMedia from "./components/UploadMedia";
import Gallery from "./components/Gallery";
import Notification from "./components/Notification";
import Navbar from "./components/Navbar";

const lightTheme = {
  background: "#ffffff",
  color: "#222",
  inputBackground: "#fff",
  inputText: "#000",
  borderColor: "#ccc",
  cardBackground: "#fdfdfd",
  buttonBackground: "#007bff",
  buttonColor: "#fff",
};

const darkTheme = {
  background: "#121212",
  color: "#f5f5f5",
  inputBackground: "#1e1e1e",
  inputText: "#fff",
  borderColor: "#444",
  cardBackground: "#1a1a1a",
  buttonBackground: "#333",
  buttonColor: "#fff",
};

function App() {
  const [showLogin, setShowLogin] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [isDark, setIsDark] = useState(false);
  const [activeSection, setActiveSection] = useState("gallery");

  const themeStyles = isDark ? darkTheme : lightTheme;

  const handleLoginSuccess = (receivedToken) => {
    localStorage.setItem("token", receivedToken);
    setToken(receivedToken);
    showNotification("✅ Login effettuato!", "success");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    showNotification("🔓 Logout effettuato", "info");
  };

  const showNotification = (message, type = "info") => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 3000);
  };

  const toggleTheme = () => setIsDark((prev) => !prev);

  useEffect(() => {
    document.body.style.backgroundColor = themeStyles.background;
    document.body.style.color = themeStyles.color;
  }, [themeStyles]);

  return (
    <>
      <Navbar
        isLoggedIn={!!token}
        onLogout={handleLogout}
        onToggleAuth={() => setShowLogin(!showLogin)}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onNavigate={setActiveSection}
      />

      <div style={{ padding: "2rem" }}>
        <Notification message={notification.message} type={notification.type} />

        {!token ? (
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
                  color: themeStyles.buttonBackground,
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                {showLogin ? "Registrati qui" : "Accedi qui"}
              </button>
            </p>
          </>
        ) : (
          <>
            {activeSection === "upload" && (
              <UploadMedia
                onNotify={showNotification}
                theme={themeStyles}
                onUploadSuccess={() => setActiveSection("gallery")} // ✅ Redireziona alla galleria
              />
            )}
            {activeSection === "gallery" && (
              <Gallery
                onNotify={showNotification}
                theme={themeStyles}
                onAddPostClick={() => setActiveSection("upload")}
              />
            )}
          </>
        )}
      </div>
    </>
  );
}

export default App;
