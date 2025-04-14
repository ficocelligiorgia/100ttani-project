import React from "react";

function ProductDetail({ product, onClose }) {
  if (!product) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          padding: "2rem",
          borderRadius: "10px",
          width: "400px",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{ width: "100%", marginBottom: "1rem" }}
        />
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p><strong>Prezzo:</strong> {product.price} €</p>
        <button onClick={onClose} style={{ marginTop: "1rem" }}>Chiudi</button>
      </div>
    </div>
  );
}

export default ProductDetail;
