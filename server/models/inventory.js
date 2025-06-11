const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  base: {
    type: Map,
    of: Number,
    default: {},
  },
  sauce: {
    type: Map,
    of: Number,
    default: {},
  },
  cheese: {
    type: Map,
    of: Number,
    default: {},
  },
  veggies: {
    type: Map,
    of: Number,
    default: {},
  },
  meat: {
    type: Map,
    of: Number,
    default: {},
  },
});

// ✅ Prevent OverwriteModelError
module.exports = mongoose.models.Inventory || mongoose.model("Inventory", inventorySchema);
