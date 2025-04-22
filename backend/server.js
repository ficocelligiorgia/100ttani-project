console.log("✅ Il file server.js è stato avviato");

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware base
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connessione MongoDB
console.log("🔌 MONGO_URI:", process.env.MONGO_URI);
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connesso"))
  .catch((err) => {
    console.error("❌ Errore di connessione a MongoDB:", err);
    process.exit(1);
  });

// Modelli
require("./models/user");
require("./models/cart"); // ✅ AGGIUNTO per il carrello

// Rotte
app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/login"));
app.use("/profile", require("./routes/profile"));
app.use("/posts", require("./routes/posts"));
app.use("/media", require("./routes/media"));
app.use("/products", require("./routes/products"));
app.use("/cart", require("./routes/cart")); // ✅ AGGIUNTO per il carrello

// Route base
app.get("/", (req, res) => {
  res.send("🚦 API 100ttani Motoclub attiva!");
});

// Avvio server
app.listen(PORT, () => {
  console.log(`🚀 Server avviato su http://localhost:${PORT}`);
});
