const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const { verifyToken } = require("../middleware/auth");
const multer = require("multer");
const path = require("path");

// 📦 Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage: storage });

// 📤 Crea un nuovo post
router.post("/", verifyToken, upload.single("media"), async (req, res) => {
  const { content } = req.body;

  try {
    const mediaUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newPost = new Post({
      userId: req.user.id,
      content,
      mediaUrl,
    });

    await newPost.save();
    res.status(201).json({
      message: "Post pubblicato con successo!",
      post: newPost,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Errore durante la pubblicazione" });
  }
});

// 🧾 Recupera solo i post personali dell'utente loggato
router.get("/mine", verifyToken, async (req, res) => {
  try {
    const myPosts = await Post.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(myPosts);
  } catch (err) {
    console.error("Errore GET /posts/mine:", err);
    res.status(500).json({ message: "Errore nel recupero dei post personali." });
  }
});

module.exports = router;

