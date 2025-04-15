import React from "react";

function ProductCard({ product, onSelect, onDelete, userRole }) {
  const isAdmin = userRole === "admin" || userRole === "staff";
  const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

  // ✅ Gestione sicura anche se images è undefined o vuoto
  const imagePath = product?.images?.length > 0 ? product.images[0] : null;

  // ✅ Composizione del path corretto per l'immagine
  const imageUrl = imagePath
    ? imagePath.startsWith("http")
      ? imagePath
      : `${baseUrl}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`
    : "/images/placeholder.jpg";

  console.log("🧪 product image path:", imagePath);
  console.log("🔗 imageUrl:", imageUrl);

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
        position: "relative",
        width: "100%",
        maxWidth: "240px",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "200px",
          backgroundColor: "#f5f5f5",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "1rem",
          borderRadius: "6px",
          overflow: "hidden",
        }}
      >
        <img
          src={imageUrl}
          alt={product.name}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
          }}
          onError={(e) => {
            if (!e.target.src.includes("placeholder.jpg")) {
              e.target.src = "/images/placeholder.jpg";
            }
          }}
        />
      </div>

      <h3 style={{ margin: "0.5rem 0", fontSize: "1rem", textAlign: "center" }}>
        {product.name}
      </h3>
      <p style={{ color: "crimson", fontWeight: "bold" }}>
        {parseFloat(product.price).toFixed(2)} €
      </p>

      {isAdmin && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(product._id);
          }}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            backgroundColor: "#c10000",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            padding: "0.3rem 0.6rem",
            cursor: "pointer",
            fontSize: "1rem",
          }}
          title="Elimina prodotto"
        >
          🗑
        </button>
      )}
    </div>
  );
}

export default ProductCard;

