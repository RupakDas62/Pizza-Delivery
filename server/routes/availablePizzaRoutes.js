const express = require('express');
const router = express.Router();
const pizzaController = require('../controllers/availablePizzaController');
const { createAvailablePizza } = require("../controllers/availablePizzaController");

// Route to fetch all available pizzas
router.get('/', pizzaController.getAllPizzas);

// Seed pizzas - for development use only
router.post('/seed', pizzaController.seedPizzas);

router.post("/create-pizza", createAvailablePizza);


module.exports = router;
