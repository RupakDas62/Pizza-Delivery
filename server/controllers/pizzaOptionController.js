const PizzaOption = require('../models/pizzaOption');

// Fetch available options
exports.getPizzaOptions = async (req, res) => {
  try {
    const options = await PizzaOption.findOne(); // only one doc
    if (!options) return res.status(404).json({ message: 'No pizza options found' });
    res.status(200).json(options);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get pizza options', error: error.message });
  }
};

// Add default options (for testing only)
exports.seedPizzaOptions = async (req, res) => {
  try {
    const {
      baseOptions,
      sauceOptions,
      cheeseOptions,
      veggieOptions,
      meatOptions
    } = req.body;

    // Create new PizzaOption document
    const newOptions = new PizzaOption({
      baseOptions,
      sauceOptions,
      cheeseOptions,
      veggieOptions,
      meatOptions
    });

    // Save to database
    const savedOptions = await newOptions.save();

    res.status(201).json({
      message: 'Pizza options created successfully',
      data: savedOptions
    });
  } catch (error) {
    console.error('Error creating pizza options:', error);
    res.status(500).json({
      message: 'Failed to create pizza options',
      error: error.message
    });
  }
};
