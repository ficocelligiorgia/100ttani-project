const express = require("express");
const router = express.Router();
const Cart = require("../models/cart");
const Product = require("../models/product");
const { verifyToken } = require("../middleware/auth"); // ✅ CORRETTO

// GET /cart - Ottieni il carrello dell'utente
router.get("/", verifyToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate("items.productId");
    res.json(cart || { userId: req.user.id, items: [] });
  } catch (err) {
    res.status(500).json({ error: "Errore nel recupero del carrello" });
  }
});

// POST /cart - Aggiungi o aggiorna un prodotto nel carrello
router.post("/", verifyToken, async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) cart = new Cart({ userId: req.user.id, items: [] });

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: "Errore nell'aggiornamento del carrello" });
  }
});

// DELETE /cart/:productId - Rimuovi un prodotto
router.delete("/:productId", verifyToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ error: "Carrello non trovato" });

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== req.params.productId
    );
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: "Errore nella rimozione del prodotto" });
  }
});

// DELETE /cart - Svuota tutto il carrello
router.delete("/", verifyToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ error: "Carrello non trovato" });

    cart.items = [];
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: "Errore nello svuotamento del carrello" });
  }
});

module.exports = router;
