const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  location: String,
  coordinates: {
    lat: Number,
    lng: Number,
  },
  image: String, // URL o percorso immagine
  poll: {
    question: String,
    options: [
      {
        text: String,
        votes: { type: Number, default: 0 },
      },
    ],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Event", eventSchema);
