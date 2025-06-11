const mongoose = require('mongoose');

const pizzaOptionSchema = new mongoose.Schema({
  baseOptions: [{
    name: { type: String, required: true },
    price: { type: Number, required: true }
  }],
  sauceOptions: [{
    name: { type: String, required: true },
    price: { type: Number, required: true }
  }],
  cheeseOptions: [{
    name: { type: String, required: true },
    price: { type: Number, required: true }
  }],
  veggieOptions: [{
    name: { type: String, required: true },
    price: { type: Number, required: true }
  }],
  meatOptions: [{
    name: { type: String, required: true },
    price: { type: Number, required: true }
  }]
}, { timestamps: true });

module.exports = mongoose.model('PizzaOption', pizzaOptionSchema);
