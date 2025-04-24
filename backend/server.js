console.log("✅ Il file server.js è stato avviato");

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const Stripe = require("stripe");

const app = express();
const PORT = process.env.PORT || 5000;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Middleware base
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files (per immagini caricate)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connessione MongoDB
console.log("🔌 MONGO_URI:", process.env.MONGO_URI);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connesso"))
  .catch((err) => {
    console.error("❌ Errore di connessione a MongoDB:", err);
    process.exit(1);
  });

// Modelli
require("./models/user");
require("./models/cart");
require("./models/Event");

// Rotte API
app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/login"));
app.use("/profile", require("./routes/profile"));
app.use("/posts", require("./routes/posts"));
app.use("/media", require("./routes/media"));
app.use("/products", require("./routes/products"));
app.use("/cart", require("./routes/cart"));
app.use("/events", require("./routes/events")); // ✅ Rotta eventi

// Pagamento Stripe
app.post("/create-checkout-session", async (req, res) => {
  const { cartItems } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: cartItems.map((item) => ({
        price_data: {
          currency: "eur",
          product_data: { name: item.name },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error("❌ Errore Stripe:", err);
    res.status(500).json({ error: "Errore nella sessione di pagamento" });
  }
});

// Route base
app.get("/", (req, res) => {
  res.send("🚦 API 100ttani Motoclub attiva!");
});

// Avvio server
app.listen(PORT, () => {
  console.log(`🚀 Server avviato su http://localhost:${PORT}`);
});
