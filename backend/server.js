console.log("✅ Il file server.js è stato avviato");

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


app.use(express.urlencoded({ extended: true }));


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


require("./models/user");


app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/login"));
app.use("/profile", require("./routes/profile"));
app.use("/posts", require("./routes/posts"));
app.use("/media", require("./routes/media"));
app.use("/products", require("./routes/products"));


app.get("/", (req, res) => {
  res.send("🚦 API 100ttani Motoclub attiva!");
});


app.listen(PORT, () => {
  console.log(`🚀 Server avviato su http://localhost:${PORT}`);
});
