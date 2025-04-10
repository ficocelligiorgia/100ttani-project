// App.js
import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import UploadMedia from "./components/UploadMedia";
import Gallery from "./components/Gallery";
import Notification from "./components/Notification";
import Navbar from "./components/Navbar";
import Home from "./components/Home";

const lightTheme = {
  background: "#ffffff",
  color: "#222",
  inputBackground: "#fff",
  inputText: "#000",
  borderColor: "#ccc",
  cardBackground: "#fdfdfd",
  buttonBackground: "#c10000",
  buttonColor: "#fff",
};

const darkTheme = {
  background: "#121212",
  color: "#f5f5f5",
  inputBackground: "#1e1e1e",
  inputText: "#fff",
  borderColor: "#444",
  cardBackground: "#1a1a1a",
  buttonBackground: "#c10000",
  buttonColor: "#fff",
};

function App() {
  const [showLogin, setShowLogin] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [isDark, setIsDark] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMuted, setIsMuted] = useState(false); // 👈 stato audio condiviso

  const themeStyles = isDark ? darkTheme : lightTheme;

  const handleLoginSuccess = (receivedToken) => {
    localStorage.setItem("token", receivedToken);
    setToken(receivedToken);
    showNotification("✅ Login effettuato!", "success");
    setActiveSection("home");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    showNotification("🔓 Logout effettuato", "info");
    setActiveSection("home");
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
        onToggleAuth={() => {
          setActiveSection("auth");
          setShowLogin(true);
        }}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onNavigate={setActiveSection}
      />

      <Notification message={notification.message} type={notification.type} />

      {activeSection === "home" && (
        <Home
          theme={themeStyles}
          isDark={isDark}
          isMuted={isMuted}
          setIsMuted={setIsMuted}
          isLoggedIn={!!token}
          onNavigate={setActiveSection}
          onShowLogin={() => {
            setShowLogin(true);
            setActiveSection("auth");
          }}
        />
      )}

      {!token && activeSection === "auth" && (
        showLogin ? (
          <Login
            isMuted={isMuted}
            setIsMuted={setIsMuted}
            onLoginSuccess={handleLoginSuccess}
            onSwitchToRegister={() => setShowLogin(false)}
          />
        ) : (
          <Register
            isMuted={isMuted}
            setIsMuted={setIsMuted}
            onRegisterSuccess={handleLoginSuccess}
            onSwitchToLogin={() => setShowLogin(true)}
          />
        )
      )}

      {token && activeSection === "upload" && (
        <UploadMedia
          onNotify={showNotification}
          theme={themeStyles}
          onUploadSuccess={() => setActiveSection("gallery")}
        />
      )}

      {token && activeSection === "gallery" && (
        <Gallery
          onNotify={showNotification}
          theme={themeStyles}
          onAddPostClick={() => setActiveSection("upload")}
        />
      )}
    </>
  );
}

export default App;
