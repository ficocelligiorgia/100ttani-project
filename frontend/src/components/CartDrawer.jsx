import React from "react";
import { FaTimes, FaTrashAlt } from "react-icons/fa";

const CartDrawer = ({
  isOpen,
  onClose,
  cartItems,
  onQuantityChange,
  onRemoveItem,
  onCheckout,
  theme,
}) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: isOpen ? 0 : "-100%",
        width: "320px",
        height: "100%",
        backgroundColor: theme.cardBackground,
        color: theme.color,
        boxShadow: "-2px 0 10px rgba(0,0,0,0.3)",
        transition: "right 0.3s ease-in-out",
        zIndex: 999,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ padding: "1rem", display: "flex", justifyContent: "space-between" }}>
        <h2 style={{ margin: 0 }}>🛒 Carrello</h2>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            color: theme.color,
            fontSize: "1.5rem",
            cursor: "pointer",
          }}
          title="Chiudi carrello"
        >
          <FaTimes />
        </button>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "0 1rem" }}>
        {cartItems.length === 0 ? (
          <p>Il carrello è vuoto.</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.productId}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "1rem",
                borderBottom: `1px solid ${theme.borderColor}`,
                paddingBottom: "1rem",
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "60px",
                  height: "60px",
                  objectFit: "cover",
                  marginRight: "1rem",
                  borderRadius: "6px",
                }}
              />
              <div style={{ flex: 1 }}>
                <strong>{item.name}</strong>
                <p style={{ margin: "0.3rem 0" }}>{parseFloat(item.price).toFixed(2)} €</p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <button
                    onClick={() => onQuantityChange(item.productId, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => onQuantityChange(item.productId, item.quantity + 1)}>+</button>
                </div>
              </div>
              <button
                onClick={() => onRemoveItem(item.productId)}
                style={{
                  marginLeft: "0.5rem",
                  backgroundColor: "transparent",
                  border: "none",
                  color: "crimson",
                  fontSize: "1rem",
                  cursor: "pointer",
                }}
                title="Elimina"
              >
                <FaTrashAlt />
              </button>
            </div>
          ))
        )}
      </div>

      {/* ✅ Bottone con posizione sticky */}
      {cartItems.length > 0 && (
        <div
          style={{
            position: "sticky",
            bottom: 0,
            backgroundColor: theme.cardBackground,
            padding: "1rem",
            borderTop: `1px solid ${theme.borderColor}`,
            textAlign: "center",
          }}
        >
          <button
            onClick={onCheckout}
            style={{
              width: "100%",
              maxWidth: "300px",
              padding: "0.75rem 1rem",
              backgroundColor: "crimson",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "1rem",
            }}
          >
            Procedi all'acquisto
          </button>
        </div>
      )}
    </div>
  );
};

export default CartDrawer;
