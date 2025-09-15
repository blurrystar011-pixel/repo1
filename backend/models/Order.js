const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  amount: Number, // per-item price
});

const OrderSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  customerEmail: { type: String, required: true },
  name: { type: String, required: true },          // new: customer name
  phone: { type: String, required: true },         // optional → make required if OTP by phone
  address: { type: String, required: true },       // new: customer address
  amountTotal: { type: Number, required: true },
  currency: { type: String, default: "EUR" },
  items: [ItemSchema],
  paymentStatus: { type: String, default: "unpaid" }, // stripe webhook will update
  status: { type: String, default: "pending" },       // order workflow (pending → confirmed → delivered)
  note: { type: String },                              // order note from checkout
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', OrderSchema);
