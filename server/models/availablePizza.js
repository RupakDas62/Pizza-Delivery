const mongoose = require('mongoose');

const availablePizzaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  imageUrl: String,
  ingredients: [String], // Optional: e.g., ['Thin Crust', 'Tomato Basil', 'Mozzarella', 'Olives']
}, { timestamps: true });

module.exports = mongoose.model('AvailablePizza', availablePizzaSchema);
