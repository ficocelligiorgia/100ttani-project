import React, { useState } from "react";

function UploadMedia() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("❌ Devi selezionare un file.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/media", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Media caricato con successo!");
        setTitle("");
        setFile(null);
      } else {
        setMessage(`❌ Errore: ${data.message}`);
      }
    } catch (err) {
      console.error("Errore durante l'upload:", err);
      setMessage("❌ Errore durante il caricamento.");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>📤 Carica un Media</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Titolo: </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ marginLeft: "1rem", padding: "0.5rem", width: "300px" }}
            required
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>File: </label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ marginLeft: "1rem" }}
            required
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "0.5rem 1.5rem",
            backgroundColor: "#222",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Carica
        </button>
      </form>

      {message && (
        <p
          style={{
            marginTop: "1rem",
            color: message.includes("✅") ? "green" : "red",
            fontWeight: "bold",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default UploadMedia;
