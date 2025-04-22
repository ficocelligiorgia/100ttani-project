import React, { useState, useEffect } from "react";

// Temi completi
const themes = {
  light: {
    background: "#f5f5f5",
    text: "#000",
    formBackground: "#ffffff",
    inputBackground: "#ffffff",
    inputText: "#000",
    borderColor: "#ccc",
  },
  dark: {
    background: "#0d0d0d",
    text: "#ffffff",
    formBackground: "#121212",
    inputBackground: "#1a1a1a",
    inputText: "#ffffff",
    borderColor: "#444",
  },
};

function CheckoutPage({ cartItems, onBack, onComplete }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    zip: "",
  });

  const [theme, setTheme] = useState(themes.light);

  // Legge il tema da localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setTheme(savedTheme === "dark" ? themes.dark : themes.light);
  }, []);

  // Applica colori a body e html
  useEffect(() => {
    document.body.style.backgroundColor = theme.background;
    document.body.style.color = theme.text;
    document.documentElement.style.backgroundColor = theme.background;
    document.documentElement.style.color = theme.text;

    return () => {
      document.body.style.backgroundColor = "";
      document.body.style.color = "";
      document.documentElement.style.backgroundColor = "";
      document.documentElement.style.color = "";
    };
  }, [theme]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("✅ Ordine completato:", { ...formData, cartItems });
    onComplete?.();
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: theme.background,
        color: theme.text,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: "600px",
          backgroundColor: theme.formBackground,
          padding: "2rem",
          borderRadius: "10px",
          boxShadow:
            theme === themes.dark
              ? "0 4px 12px rgba(0, 0, 0, 0.6)"
              : "0 4px 12px rgba(0, 0, 0, 0.15)",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          color: theme.text,
        }}
      >
        <h2 style={{ textAlign: "center" }}>Checkout</h2>
        <p style={{ textAlign: "center" }}>
          <strong>Totale:</strong> {total.toFixed(2)} €
        </p>

        {["fullName", "email", "address", "city", "zip"].map((field) => (
          <input
            key={field}
            name={field}
            type={field === "email" ? "email" : "text"}
            placeholder={fieldLabels[field]}
            value={formData[field]}
            onChange={handleChange}
            required
            style={{
              padding: "0.75rem",
              border: `1px solid ${theme.borderColor}`,
              borderRadius: "6px",
              backgroundColor: theme.inputBackground,
              color: theme.inputText,
            }}
          />
        ))}

        <button type="submit" style={buttonStyles.crimson}>
          Conferma ordine
        </button>
        <button type="button" onClick={onBack} style={buttonStyles.gray}>
          Torna al carrello
        </button>
      </form>
    </div>
  );
}

const fieldLabels = {
  fullName: "Nome completo",
  email: "Email",
  address: "Indirizzo",
  city: "Città",
  zip: "CAP",
};

const buttonStyles = {
  crimson: {
    backgroundColor: "crimson",
    color: "#fff",
    padding: "0.75rem",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  gray: {
    backgroundColor: "#666",
    color: "#fff",
    padding: "0.75rem",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default CheckoutPage;
