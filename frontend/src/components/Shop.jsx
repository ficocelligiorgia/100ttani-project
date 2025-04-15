import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import ProductDetail from "./ProductDetail";
import AdminProductForm from "./AdminProductForm";

function Shop({ theme, token, userRole, onNotify }) {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const isAdmin = userRole === "admin" || userRole === "staff";

  const fetchProducts = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:5000/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Errore nel recupero prodotti", err);
      onNotify?.("Errore nel recupero prodotti", "error");
    }
  }, [onNotify]);

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts((prev) => prev.filter((p) => p._id !== productId));
      onNotify?.("✅ Prodotto eliminato", "success");
    } catch (err) {
      console.error("Errore nella cancellazione del prodotto:", err);
      onNotify?.("❌ Errore durante l'eliminazione", "error");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div style={{ padding: "2rem", position: "relative" }}>
      <h1 style={{ color: theme.color }}>Shop</h1>

      {isAdmin && showForm && (
        <div style={{ marginBottom: "2rem" }}>
          <AdminProductForm
            token={token}
            theme={theme}
            onProductCreated={() => {
              fetchProducts();
              setShowForm(false);
            }}
            onNotify={onNotify}
          />
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onSelect={setSelectedProduct}
              onDelete={handleDeleteProduct}
              userRole={userRole}
            />
          ))
        ) : (
          <p style={{ textAlign: "center" }}>Nessun prodotto disponibile.</p>
        )}
      </div>

      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {isAdmin && (
        <button
          onClick={() => setShowForm(!showForm)}
          title="Aggiungi prodotto"
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            backgroundColor: "crimson",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            width: "60px",
            height: "60px",
            fontSize: "2rem",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
            cursor: "pointer",
            zIndex: 999,
          }}
        >
          +
        </button>
      )}
    </div>
  );
}

export default Shop;
