import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { FaUserCircle } from "react-icons/fa";

function Profile({ onNotify }) {
  const [user, setUser] = useState({});
  const [media, setMedia] = useState([]);
  const [showInfo, setShowInfo] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [commentText, setCommentText] = useState({});
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const token = localStorage.getItem("token");

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (err) {
      onNotify("Errore nel recupero profilo", "error");
    }
  };

  useEffect(() => {
    if (token) {
      fetchUser();

      axios
        .get("http://localhost:5000/media?mine=true", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setMedia(res.data))
        .catch((err) => onNotify("Errore nel recupero media", "error"));
    }
  }, [token]);

  const handleLike = async (id) => {
    try {
      await axios.post(`http://localhost:5000/media/${id}/like`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      refreshMedia();
    } catch (err) {
      onNotify("Errore nel like", "error");
    }
  };

  const handleComment = async (id) => {
    if (!commentText[id]) return;
    try {
      await axios.post(
        `http://localhost:5000/media/${id}/comment`,
        { text: commentText[id] },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCommentText({ ...commentText, [id]: "" });
      refreshMedia();
    } catch (err) {
      onNotify("Errore nel commento", "error");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Sei sicuro di voler eliminare questo post?")) return;
    try {
      await axios.delete(`http://localhost:5000/media/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedMedia = media.filter((item) => item._id !== id);
      setMedia(updatedMedia);
    } catch (err) {
      onNotify("Errore nella cancellazione", "error");
    }
  };

  const refreshMedia = async () => {
    try {
      const res = await axios.get("http://localhost:5000/media?mine=true", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMedia(res.data);
    } catch (err) {
      onNotify("Errore aggiornamento media", "error");
    }
  };

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSaveUser = async () => {
    try {
      const formData = new FormData();
      formData.append("username", user.username || "");
      formData.append("email", user.email || "");
      formData.append("phone", user.phone || "");
      formData.append("address", user.address || "");
      formData.append("bio", user.bio || "");
      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }

      const res = await axios.post("http://localhost:5000/profile/update", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setUser(res.data.user);
      setAvatarPreview(null);
      setAvatarFile(null);
      onNotify("Profilo aggiornato con successo", "success");
    } catch (err) {
      onNotify("Errore nel salvataggio del profilo", "error");
    }
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Main content */}
      <div style={{ flex: 1, padding: "2rem" }}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "2rem" }}>
          <label style={{ cursor: "pointer" }}>
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="Preview"
                style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover" }}
              />
            ) : user.avatar ? (
              <img
                src={`http://localhost:5000${user.avatar}`}
                alt="Avatar"
                style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover" }}
              />
            ) : (
              <FaUserCircle size={100} color="#ccc" />
            )}
            <input type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: "none" }} />
          </label>
          <div style={{ marginLeft: "1rem" }}>
            <h2>{user.username || "Nome Utente"}</h2>
            <p>{user.bio || "Nessuna biografia disponibile."}</p>
          </div>
        </div>

        <h2>I tuoi Media</h2>
        {media.length === 0 ? (
          <p>Non hai pubblicato nulla.</p>
        ) : (
          media.map((m) => (
            <div
              key={m._id}
              style={{
                background: "#fff",
                padding: "1rem",
                marginBottom: "2rem",
                borderRadius: "10px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                maxWidth: "600px",
              }}
            >
              {m.fileType === "image" ? (
                <img
                  src={`http://localhost:5000${m.fileUrl}`}
                  alt={m.title}
                  style={{
                    width: "100%",
                    height: "350px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              ) : (
                <video
                  controls
                  src={`http://localhost:5000${m.fileUrl}`}
                  style={{ width: "100%", borderRadius: "8px" }}
                />
              )}
              <h4>{m.title}</h4>
              <button onClick={() => handleLike(m._id)} style={{ background: "none", border: "none" }}>
                ❤️ {m.likes?.length || 0} like
              </button>
              <div>
                <input
                  type="text"
                  placeholder="Scrivi un commento..."
                  value={commentText[m._id] || ""}
                  onChange={(e) =>
                    setCommentText({ ...commentText, [m._id]: e.target.value })
                  }
                  style={{ width: "100%", marginTop: "0.5rem" }}
                />
                <button onClick={() => handleComment(m._id)}>Invia</button>
              </div>
              <div style={{ marginTop: "1rem" }}>
                <strong>Commenti:</strong>
                {m.comments?.length ? (
                  m.comments.map((c, i) => (
                    <p key={i}>
                      <strong>{c.user?.username || "Anonimo"}:</strong> {c.text}
                    </p>
                  ))
                ) : (
                  <p>Nessun commento ancora.</p>
                )}
              </div>
              <button
                onClick={() => handleDelete(m._id)}
                style={{
                  marginTop: "1rem",
                  backgroundColor: "crimson",
                  color: "white",
                  border: "none",
                  padding: "0.4rem 0.8rem",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Elimina
              </button>
            </div>
          ))
        )}
      </div>

      {/* Sidebar a destra */}
      <div
        style={{
          width: "220px",
          minHeight: "100vh",
          background: "#f8f8f8",
          padding: "1rem",
          boxShadow: "-2px 0 5px rgba(0,0,0,0.1)",
        }}
      >
        <button
          onClick={() => setShowInfo(!showInfo)}
          style={{ marginBottom: "1rem", width: "100%", padding: "0.5rem" }}
        >
          Informazioni personali ▼
        </button>
        {showInfo && (
          <div>
            <input
              type="text"
              name="username"
              placeholder="Nome"
              value={user.username || ""}
              onChange={handleUserChange}
              style={{ width: "100%", marginBottom: "0.5rem" }}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={user.email || ""}
              onChange={handleUserChange}
              style={{ width: "100%", marginBottom: "0.5rem" }}
            />
            <input
              type="text"
              name="phone"
              placeholder="Telefono"
              value={user.phone || ""}
              onChange={handleUserChange}
              style={{ width: "100%", marginBottom: "0.5rem" }}
            />
            <input
              type="text"
              name="address"
              placeholder="Indirizzo"
              value={user.address || ""}
              onChange={handleUserChange}
              style={{ width: "100%", marginBottom: "0.5rem" }}
            />
            <textarea
              name="bio"
              placeholder="Bio"
              value={user.bio || ""}
              onChange={handleUserChange}
              style={{ width: "100%", marginBottom: "0.5rem" }}
            />
            <button
              onClick={handleSaveUser}
              style={{
                width: "100%",
                padding: "0.5rem",
                backgroundColor: "crimson",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Salva
            </button>
          </div>
        )}

        <button
          onClick={() => setShowCart(!showCart)}
          style={{ width: "100%", padding: "0.5rem", marginTop: "1rem" }}
        >
          Carrello ▼
        </button>
        {showCart && (
          <div>
            <p>Il tuo carrello è vuoto (per ora!).</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;

