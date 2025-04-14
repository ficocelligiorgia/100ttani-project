// src/components/ProductCard.jsx
import React from "react";

function ProductCard({ product, onSelect }) {
  return (
    <div
      onClick={() => onSelect(product)}
      style={{
        cursor: "pointer",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "1rem",
        backgroundColor: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        transition: "transform 0.2s",
      }}
    >
      <img
        src={product.imageUrl}
        alt={product.name}
        style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "6px" }}
      />
      <h3 style={{ margin: "0.8rem 0" }}>{product.name}</h3>
      <p style={{ color: "crimson", fontWeight: "bold" }}>{product.price.toFixed(2)} €</p>
    </div>
  );
}

export default ProductCard;
