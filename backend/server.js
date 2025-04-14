
console.log("Il file server.js è stato avviato");

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


app.use("/uploads", express.static(path.join(__dirname, "uploads")));


console.log("MONGO_URI:", process.env.MONGO_URI);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connesso"))
  .catch((err) => console.error("❌ Errore di connessione a MongoDB:", err));


const User = require("./models/user");


const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const profileRoute = require("./routes/profile");
const postRoute = require("./routes/posts");
const mediaRoute = require("./routes/media");
const productRoutes = require("./routes/products");


app.use("/register", registerRoute);
app.use("/login", loginRoute);
app.use("/profile", profileRoute);
app.use("/posts", postRoute);
app.use("/media", mediaRoute);
app.use("/products", productRoutes);


app.get("/", (req, res) => {
  res.send("Benvenuto su 100ttani Motoclub API!");
});


app.listen(PORT, () => {
  console.log(`🚀 Server avviato su http://localhost:${PORT}`);
});
