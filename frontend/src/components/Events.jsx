import React, { useEffect, useState } from "react";
import axios from "axios";
import Map from "./Map";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Events({ theme, token, userRole }) {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const isAdmin = userRole === "admin" || userRole === "staff";

  useEffect(() => {
    axios
      .get("http://localhost:5000/events")
      .then((res) => setEvents(res.data))
      .catch((err) => console.error("Errore nel recupero eventi", err));
  }, []);

  return (
    <div style={{ padding: "2rem", color: theme.color, position: "relative" }}>
      <h1>📅 Eventi della Community</h1>
      <p>Qui troverai i nostri raduni passati e futuri, con sondaggi e foto!</p>

      <div style={{ display: "grid", gap: "1.5rem", marginTop: "2rem" }}>
        {events.map((event, i) => (
          <div
            key={i}
            style={{
              padding: "1rem",
              border: `1px solid ${theme.borderColor}`,
              borderRadius: "10px",
              backgroundColor: theme.cardBackground,
              color: theme.color,
            }}
          >
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p><strong>📍 Luogo:</strong> {event.location}</p>
            <p><strong>📅 Data:</strong> {new Date(event.date).toLocaleDateString()}</p>
            {event.image && (
              <img
                src={`http://localhost:5000${event.image}`}
                alt={event.title}
                style={{ width: "100%", maxHeight: "250px", objectFit: "cover", marginTop: "0.5rem", borderRadius: "6px" }}
              />
            )}

            {event.poll && event.poll.question && (
              <div style={{ marginTop: "1rem" }}>
                <strong>{event.poll.question}</strong>
                <ul>
                  {event.poll.options.map((opt, idx) => (
                    <li key={idx}>{opt.text} ({opt.votes})</li>
                  ))}
                </ul>
              </div>
            )}

            {event.coordinates?.lat && event.coordinates?.lng && (
              <div style={{ height: "200px", marginTop: "1rem" }}>
                <Map locations={[event]} mini={true} />
              </div>
            )}
          </div>
        ))}
      </div>

      {isAdmin && (
        <button
          onClick={() => navigate("/crea-evento")}
          title="Crea nuovo evento"
          style={{
            position: "fixed",
            top: "1rem",
            right: "1rem",
            backgroundColor: "crimson",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            fontSize: "1.4rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
            cursor: "pointer",
            zIndex: 1000,
          }}
        >
          <FaPlus />
        </button>
      )}
    </div>
  );
}

export default Events;
