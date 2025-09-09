const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  amount: Number,
});

const OrderSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  customerEmail: String,
  amountTotal: Number,
  currency: String,
  items: [ItemSchema],
  paymentStatus: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', OrderSchema);
