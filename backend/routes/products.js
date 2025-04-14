const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Il nome del prodotto è obbligatorio"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "La descrizione è obbligatoria"],
    },
    price: {
      type: Number,
      required: [true, "Il prezzo è obbligatorio"],
      min: [0, "Il prezzo non può essere negativo"],
    },
    imageUrl: {
      type: String,
      required: [true, "L'immagine del prodotto è obbligatoria"],
    },
    specs: {
      type: String,
      default: "",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
