import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function Gallery({ onNotify, theme }) {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState({});

  const token = localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null;

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/media");
        setMediaList(res.data);
      } catch (err) {
        console.error("Errore nel recupero dei media:", err);
        onNotify("Errore nel recupero dei media.", "error");
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [onNotify]);


  const fetchMedia = async () => {
    try {
      const res = await axios.get("http://localhost:5000/media");
      setMediaList(res.data);
    } catch (err) {
      console.error("Errore nel recupero dei media:", err);
      onNotify("Errore nel recupero dei media.", "error");
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
      fetchMedia();
      onNotify("💬 Commento aggiunto!", "success");
    } catch (err) {
      console.error("Errore nel commento:", err);
      onNotify("Errore nel commento", "error");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Sei sicura di voler eliminare questo post?")) return;

    try {
      await axios.delete(`http://localhost:5000/media/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchMedia();
      onNotify("🗑️ Post eliminato con successo!", "success");
    } catch (err) {
      console.error("Errore nella cancellazione:", err);
      onNotify("Errore nella cancellazione", "error");
    }
  };

  return (
    <div style={{ padding: "2rem", color: theme.color }}>
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
                backgroundColor: theme.cardBackground,
                color: theme.color,
                border: `1px solid ${theme.borderColor}`,
                borderRadius: "10px",
                padding: "1rem",
                boxShadow: theme.shadow || "0 0 8px rgba(0,0,0,0.1)",
              }}
            >
              <h4>{media.title || "Senza titolo"}</h4>

              {media.fileType === "image" ? (
                <img
                  src={`http://localhost:5000${media.fileUrl}`}
                  alt={media.title}
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    marginBottom: "1rem",
                  }}
                />
              ) : (
                <video
                  controls
                  src={`http://localhost:5000${media.fileUrl}`}
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    marginBottom: "1rem",
                  }}
                />
              )}

              <div style={{ marginTop: "0.5rem" }}>
                <button
                  onClick={() => handleLike(media._id)}
                  style={{
                    background: "none",
                    border: "none",
                    color: theme.color,
                    cursor: "pointer",
                  }}
                >
                  ❤️ Like
                </button>
                <span style={{ marginLeft: "1rem" }}>
                  {media.likes?.length || 0} like
                </span>
              </div>

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
                  style={{
                    width: "80%",
                    padding: "0.5rem",
                    backgroundColor: theme.inputBackground,
                    color: theme.inputText,
                    border: `1px solid ${theme.borderColor}`,
                    borderRadius: "5px",
                  }}
                />
                <button
                  onClick={() => handleComment(media._id)}
                  style={{
                    marginLeft: "0.5rem",
                    padding: "0.4rem 1rem",
                    backgroundColor: theme.buttonBackground,
                    color: theme.buttonColor,
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  💬
                </button>
              </div>

              <div style={{ marginTop: "1rem" }}>
                <h5>Commenti:</h5>
                {media.comments && media.comments.length > 0 ? (
                  media.comments.map((c, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        marginBottom: "1rem",
                      }}
                    >
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          backgroundColor: "#888",
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "bold",
                          marginRight: "0.75rem",
                          fontSize: "0.9rem",
                        }}
                      >
                        {c.user?.username?.charAt(0).toUpperCase() || "?"}
                      </div>
                      <div
                        style={{
                          background: theme.inputBackground,
                          padding: "0.75rem",
                          borderRadius: "12px",
                          border: `1px solid ${theme.borderColor}`,
                          maxWidth: "80%",
                          color: theme.color,
                        }}
                      >
                        <strong>{c.user?.username || "Anonimo"}</strong>
                        <p style={{ margin: "0.25rem 0 0.5rem" }}>{c.text}</p>
                        <span
                          style={{ fontSize: "0.75rem", color: theme.color }}
                        >
                          {new Date(c.createdAt).toLocaleString("it-IT", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p style={{ color: theme.color }}>Nessun commento ancora.</p>
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
