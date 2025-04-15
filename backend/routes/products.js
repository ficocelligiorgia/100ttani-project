const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { verifyToken, authorizeRoles } = require("../middleware/auth");

// 🔧 Configurazione Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// 📦 GET prodotti
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error("❌ Errore nel recupero prodotti:", err);
    res.status(500).json({ message: "Errore nel recupero prodotti" });
  }
});

// ➕ POST prodotto con più immagini
router.post(
  "/",
  verifyToken,
  authorizeRoles("admin", "staff"),
  upload.array("images", 5),
  (req, res, next) => {
    console.log("📥 Immagini ricevute (req.files):", req.files);
    next();
  },
  async (req, res) => {
    try {
      const { name, description, price, specs } = req.body;
      const imagePaths = req.files.map((file) => `/uploads/${file.filename}`);

      const newProduct = new Product({
        name,
        description,
        price,
        specs,
        images: imagePaths,
      });

      const saved = await newProduct.save();
      res.status(201).json({ message: "✅ Prodotto salvato", product: saved });
    } catch (err) {
      console.error("❌ Errore nel salvataggio:", err);
      res.status(500).json({ message: "Errore nel salvataggio del prodotto" });
    }
  }
);

// 🗑️ DELETE prodotto + immagini
router.delete("/:id", verifyToken, authorizeRoles("admin", "staff"), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Prodotto non trovato" });
    }

    // Elimina immagini fisiche
    product.images?.forEach((imgPath) => {
      const fullPath = path.join(__dirname, "..", imgPath);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    });

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "✅ Prodotto eliminato con successo" });
  } catch (err) {
    console.error("❌ Errore DELETE /products/:id:", err);
    res.status(500).json({ message: "Errore durante l'eliminazione" });
  }
});

module.exports = router;
