
const express = require("express");
const router = express.Router();
const Product = require("../models/product");


router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Errore nel recupero prodotti" });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(404).json({ message: "Prodotto non trovato" });
  }
});

module.exports = router;
