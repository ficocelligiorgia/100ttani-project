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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>📅 Eventi della Community</h1>
        {isAdmin && (
          <button
            onClick={() => navigate("/crea-evento")}
            title="Crea nuovo evento"
            style={{
              backgroundColor: "crimson",
              color: "#fff",
              border: "none",
              borderRadius: "50%",
              width: "45px",
              height: "45px",
              fontSize: "1.3rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
            }}
          >
            <FaPlus />
          </button>
        )}
      </div>

      <p>Qui troverai i nostri raduni passati e futuri, con sondaggi e foto!</p>

      {events.length === 0 ? (
        <p>Nessun evento disponibile.</p>
      ) : (
        <div style={{ marginTop: "2rem" }}>
          {events.map((event) => (
            <div
              key={event._id}
              style={{
                backgroundColor: theme.cardBackground,
                padding: "1rem",
                marginBottom: "1.5rem",
                borderRadius: "10px",
              }}
            >
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p><strong>📍 {event.location}</strong></p>
              <p><strong>📅 {new Date(event.date).toLocaleDateString()}</strong></p>

              {event.image && (
                <img
                  src={`http://localhost:5000${event.image}`}
                  alt="Evento"
                  style={{ maxWidth: "100%", marginTop: "1rem", borderRadius: "8px" }}
                />
              )}

              {event.poll?.question && (
                <div style={{ marginTop: "1rem" }}>
                  <strong>Sondaggio: {event.poll.question}</strong>
                  <ul>
                    {event.poll.options.map((opt, idx) => (
                      <li key={idx}>
                        {opt.text} - {opt.votes} voti
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {event.coordinates?.lat && event.coordinates?.lng && (
                <div style={{ marginTop: "1rem" }}>
                  <Map locations={[event]} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Events;
