// server/models/MenuItem.js
const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  orders: { type: Number, default: 0 },
  description: String,
  image: String,
  platform: [String], 
  deliveryPrice: { type: Number, default: 0 },
  offer: String,
  createdAt: { type: Date, default: Date.now },

  // 🔥 New field for modal buttons
  orderingOptions: [
    {
      type: {
        type: String, // "call", "whatsapp", "ubereats", etc.
        required: true,
      },
      label: String, // e.g. "Call to Order"
      action: String, // e.g. tel:+12345678 OR whatsapp://send?phone= OR external URL
    },
  ],
});

module.exports = mongoose.model("menuItems", menuItemSchema);
