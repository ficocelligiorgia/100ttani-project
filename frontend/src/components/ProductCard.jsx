import React from "react";

function ProductCard({ product, onSelect }) {
  return (
    <div
      onClick={() => onSelect(product)}
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "1rem",
        textAlign: "center",
        cursor: "pointer",
        background: "#fff",
      }}
    >
      <img
        src={product.image}
        alt={product.name}
        style={{ width: "100%", height: "180px", objectFit: "cover" }}
      />
      <h3>{product.name}</h3>
      <p>{product.price} €</p>
    </div>
  );
}

export default ProductCard;
