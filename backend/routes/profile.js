const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth"); 

router.get("/", verifyToken, (req, res) => {
  res.json({ message: `Ciao ${req.user.email}, sei autenticato!` });
});

module.exports = router;
