import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function Gallery() {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState({});

  const token = localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null;

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const res = await axios.get("http://localhost:5000/media");
      setMediaList(res.data);
    } catch (err) {
      console.error("Errore nel recupero dei media:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (id) => {
    try {
      await axios.post(`http://localhost:5000/media/${id}/like`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchMedia();
    } catch (err) {
      console.error("Errore nel like:", err);
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
      fetchMedia();
    } catch (err) {
      console.error("Errore nel commento:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Sei sicura di voler eliminare questo post?")) return;
    try {
      await axios.delete(`http://localhost:5000/media/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchMedia();
    } catch (err) {
      console.error("Errore nella cancellazione:", err);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>🖼️ Galleria</h2>

      {loading ? (
        <p>Caricamento in corso...</p>
      ) : mediaList.length === 0 ? (
        <p>Nessun media disponibile.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {mediaList.map((media) => (
            <div
              key={media._id}
              style={{
                border: "1px solid #ccc",
                padding: "1rem",
                borderRadius: "10px",
              }}
            >
              <h4>{media.title || "Senza titolo"}</h4>

              {media.fileType === "image" ? (
                <img
                  src={`http://localhost:5000${media.fileUrl}`}
                  alt={media.title}
                  style={{ width: "100%", borderRadius: "8px" }}
                />
              ) : (
                <video
                  controls
                  src={`http://localhost:5000${media.fileUrl}`}
                  style={{ width: "100%", borderRadius: "8px" }}
                />
              )}

              {/* ❤️ Like */}
              <div style={{ marginTop: "1rem" }}>
                <button onClick={() => handleLike(media._id)}>❤️ Like</button>
                <span style={{ marginLeft: "1rem" }}>
                  {media.likes?.length || 0} like
                </span>
              </div>

              {/* 💬 Commento */}
              <div style={{ marginTop: "1rem" }}>
                <input
                  type="text"
                  value={commentText[media._id] || ""}
                  onChange={(e) =>
                    setCommentText({
                      ...commentText,
                      [media._id]: e.target.value,
                    })
                  }
                  placeholder="Scrivi un commento..."
                  style={{ width: "80%", padding: "0.5rem" }}
                />
                <button onClick={() => handleComment(media._id)}>💬</button>
              </div>

              {/* Lista commenti */}
              <div style={{ marginTop: "1rem" }}>
                <h5>Commenti:</h5>
                {media.comments && media.comments.length > 0 ? (
                  media.comments.map((c, index) => (
                    <p key={index} style={{ fontSize: "0.9rem" }}>
                      <strong>{c.user?.username || "Utente"}:</strong> {c.text}
                    </p>
                  ))
                ) : (
                  <p style={{ color: "gray" }}>Nessun commento ancora.</p>
                )}
              </div>

              {user && media.userId && user.id === media.userId._id && (
              <button
                onClick={() => handleDelete(media._id)}
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
              🗑️ Elimina
              </button>
              )}

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Gallery;
