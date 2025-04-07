const express = require("express");
const router = express.Router();
const multer = require("multer");
const Media = require("../models/media");
const verifyToken = require("../middleware/auth");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage: storage });

router.post("/", verifyToken, upload.single("file"), async (req, res) => {
  try {
    const newMedia = new Media({
      userId: req.user.id,
      title: req.body.title,
      fileUrl: `/uploads/${req.file.filename}`,
      fileType: req.file.mimetype.startsWith("video") ? "video" : "image",
    });

    await newMedia.save();
    res.status(201).json({ message: "Media caricato!", media: newMedia });
  } catch (err) {
    res.status(500).json({ message: "Errore durante l'upload", error: err });
  }
});

router.get("/", async (req, res) => {
  try {
    const media = await Media.find().sort({ createdAt: -1 });
    res.json(media);
  } catch (err) {
    res.status(500).json({ message: "Errore nel recupero", error: err });
  }
});

module.exports = router;
