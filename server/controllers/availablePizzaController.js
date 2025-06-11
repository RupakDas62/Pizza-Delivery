const AvailablePizza = require('../models/AvailablePizza');

exports.createAvailablePizza = async (req, res) => {
  try {
    const { name, description, price, imageUrl, ingredients } = req.body;

    const newPizza = new AvailablePizza({
      name,
      description,
      price,
      imageUrl,
      ingredients,
    });

    const savedPizza = await newPizza.save();
    res.status(201).json(savedPizza);
  } catch (error) {
    console.error("Error creating pizza:", error);
    res.status(500).json({ error: "Failed to create pizza" });
  }
};

// Get all available pizzas
exports.getAllPizzas = async (req, res) => {
  try {
    const pizzas = await AvailablePizza.find();
    res.status(200).json(pizzas);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch pizzas', error: error.message });
  }
};

// Seed a few predefined pizzas (for dev/testing)
exports.seedPizzas = async (req, res) => {
  try {
    const existing = await AvailablePizza.find();
    if (existing.length > 0) return res.status(400).json({ message: 'Pizzas already exist' });

    const pizzas = [
      {
        name: 'Margherita',
        description: 'Classic delight with 100% real mozzarella cheese',
        price: 199,
        imageUrl: 'https://example.com/margherita.jpg',
        ingredients: ['Thin Crust', 'Tomato Basil Sauce', 'Mozzarella'],
      },
      {
        name: 'Farmhouse',
        description: 'Delightful combination of onion, capsicum, tomato & mushroom',
        price: 299,
        imageUrl: 'https://example.com/farmhouse.jpg',
        ingredients: ['Thick Crust', 'Spicy Marinara', 'Mozzarella', 'Onion', 'Capsicum', 'Mushroom'],
      },
      {
        name: 'Peppy Paneer',
        description: 'Flavorful trio of juicy paneer, crisp capsicum, and spicy red paprika',
        price: 329,
        imageUrl: 'https://example.com/peppy-paneer.jpg',
        ingredients: ['Whole Wheat', 'White Garlic', 'Mozzarella', 'Paneer', 'Capsicum', 'Paprika'],
      },
    ];

    await AvailablePizza.insertMany(pizzas);
    res.status(201).json({ message: 'Pizzas seeded', pizzas });
  } catch (error) {
    res.status(500).json({ message: 'Seeding failed', error: error.message });
  }
};
