
import React, { useState } from "react";
import axios from "axios";

function AdminProductForm({ onProductCreated, theme }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    specs: "",
    image: null,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setForm((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("specs", form.specs);
    formData.append("image", form.image);

    try {
      const res = await axios.post("http://localhost:5000/products", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("✅ Prodotto caricato con successo!");
      onProductCreated && onProductCreated(res.data.product);
      setForm({
        name: "",
        description: "",
        price: "",
        specs: "",
        image: null,
      });
    } catch (err) {
      console.error(err);
      setMessage("❌ Errore durante il caricamento.");
    }
  };

  return (
    <div style={{ padding: "2rem", background: theme.cardBackground, color: theme.color }}>
      <h2>📦 Aggiungi un nuovo prodotto</h2>

      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Nome prodotto" value={form.name} onChange={handleChange} required style={inputStyle} />
        <textarea name="description" placeholder="Descrizione" value={form.description} onChange={handleChange} required style={inputStyle} />
        <input type="number" name="price" placeholder="Prezzo" value={form.price} onChange={handleChange} required style={inputStyle} />
        <input type="text" name="specs" placeholder="Specifiche" value={form.specs} onChange={handleChange} style={inputStyle} />
        <input type="file" onChange={handleFileChange} required style={inputStyle} />

        <button type="submit" style={buttonStyle}>Carica Prodotto</button>
      </form>

      {message && <p style={{ marginTop: "1rem", fontWeight: "bold" }}>{message}</p>}
    </div>
  );
}

const inputStyle = {
  display: "block",
  width: "100%",
  marginBottom: "1rem",
  padding: "0.5rem",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  padding: "0.6rem 1.2rem",
  backgroundColor: "crimson",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

export default AdminProductForm;
