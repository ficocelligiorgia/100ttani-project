const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    required: true,
  },
  specs: {
    type: String,
    default: "",
  },
  images: {
    type: [String], // array di path immagine, es. ["/uploads/img1.jpg", "/uploads/img2.jpg"]
    default: [],
  },
}, {
  timestamps: true, // opzionale: salva anche createdAt e updatedAt
});

module.exports = mongoose.model("Product", productSchema);

