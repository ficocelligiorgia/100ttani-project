const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const { verifyToken, authorizeRoles } = require("../middleware/auth");

// 🟢 GET tutti gli eventi
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: "Errore nel recupero eventi" });
  }
});

// 🔴 POST nuovo evento (admin e staff)
router.post("/", verifyToken, authorizeRoles("admin", "staff"), async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ error: "Errore nella creazione evento" });
  }
});

module.exports = router;
