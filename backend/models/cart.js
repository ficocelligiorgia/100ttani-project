const mongoose = require("mongoose");

// Schema per singolo articolo nel carrello
const CartItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "La quantità deve essere almeno 1"],
      default: 1,
    },
  },
  { _id: false } // non generare ID separato per ogni item
);

// Schema principale del carrello utente
const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: {
      type: [CartItemSchema],
      default: [],
    },
  },
  {
    timestamps: true, // createdAt / updatedAt
  }
);

module.exports = mongoose.model("Cart", CartSchema);
