import React, { useEffect, useState } from "react";
import axios from "axios";

const Gallery = () => {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await axios.get("http://localhost:5000/media");
        setMediaList(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Errore nel caricamento della galleria:", error);
        setLoading(false);
      }
    };

    fetchMedia();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>🎞️ Galleria Multimediale</h1>
      {loading ? (
        <p>Caricamento in corso...</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {mediaList.map((media) => (
            <div
              key={media._id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "12px",
                padding: "1rem",
                background: "#fdfdfd",
              }}
            >
              <h4>{media.title}</h4>
              {media.fileType === "image" ? (
                <img
                  src={`http://localhost:5000${media.fileUrl}`}
                  alt={media.title}
                  style={{ width: "100%", borderRadius: "10px" }}
                />
              ) : (
                <video
                  controls
                  src={`http://localhost:5000${media.fileUrl}`}
                  style={{ width: "100%", borderRadius: "10px" }}
                />
              )}
              <p style={{ fontSize: "0.8rem", color: "#555" }}>
                Caricato il: {new Date(media.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
