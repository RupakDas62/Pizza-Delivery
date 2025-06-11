const express = require('express');
const router = express.Router();
const pizzaOptionController = require('../controllers/pizzaOptionController');

router.get('/options', pizzaOptionController.getPizzaOptions);

// Seed initial data — optional; remove/comment in production
router.post('/seed-options', pizzaOptionController.seedPizzaOptions);

module.exports = router;
