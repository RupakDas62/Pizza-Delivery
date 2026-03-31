
// server/models/deliveryAgent.js
const mongoose = require("mongoose");

const deliveryAgentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true }, // if you want separate login
  isAvailable: { type: Boolean, default: true },
  currentLocation: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], default: [0, 0] }, // [lng, lat]
  },
  assignedOrders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
}, { timestamps: true });

deliveryAgentSchema.index({ currentLocation: "2dsphere" });

const DeliveryAgent = mongoose.model("DeliveryAgent", deliveryAgentSchema);
module.exports = DeliveryAgent;
