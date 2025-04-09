import React, { useState } from "react";

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        onLoginSuccess(data.token);
        setMessage(" Login riuscito!");
        console.log("Token salvato:", data.token);
      } else {
        setMessage(` ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      setMessage(" Errore di connessione al server");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2> Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ marginBottom: "1rem", padding: "0.5rem", width: "300px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ marginBottom: "1rem", padding: "0.5rem", width: "300px" }}
        />
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Accedi
        </button>
      </form>

      {message && (
        <p style={{ marginTop: "1rem", fontWeight: "bold" }}>{message}</p>
      )}
    </div>
  );
}

export default Login;
