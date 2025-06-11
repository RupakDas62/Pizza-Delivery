const Inventory = require("../models/Inventory");
const sendEmail = require("../utils/sendEmail"); // make sure you have this utility
const User = require('../models/User')

const INVENTORY_THRESHOLD = process.env.INVENTORY_THRESHOLD;


const createInventory = async (req, res) => {
  const admin = await User.find({ role: 'admin' });
  try {
    const existingInventory = await Inventory.findOne();

    const newInventory = {
      base: req.body.base,
      sauce: req.body.sauce,
      cheese: req.body.cheese,
      veggies: req.body.veggies,
      meat: req.body.meat,
    };

    if (existingInventory) {
      await Inventory.updateOne({}, newInventory);
      return res.status(200).json({ message: "Inventory updated successfully." });
    } else {
      const inventory = new Inventory(newInventory);
      await inventory.save();
      return res.status(201).json({ message: "Inventory created successfully." });
    }
  } catch (err) {
    console.error("Inventory creation error:", err);
    res.status(500).json({ message: "Internal server error." });
  }
};

const getInventory = async (req, res) => {

  try {
    const inventory = await Inventory.findOne();
    if (!inventory) return res.status(404).json({ message: "Inventory not found." });
    res.status(200).json(inventory);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateInventory = async (req, res) => {
  try {
    const updates = req.body;

    // There should only be one inventory document
    const existingInventory = await Inventory.findOne();
    if (!existingInventory) {
      return res.status(404).json({ error: "Inventory not found" });
    }

    // Update each category and item
    for (const category of ["base", "sauce", "cheese", "veggies", "meat"]) {
      if (updates[category]) {
        for (const [item, qty] of Object.entries(updates[category])) {
          existingInventory[category].set(item, qty);
        }
      }
    }

    await existingInventory.save();
    res.status(200).json({ message: "Inventory updated successfully", inventory: existingInventory });
  } catch (err) {
    console.error("Error updating inventory:", err);
    res.status(500).json({ error: "Failed to update inventory" });
  }
};

module.exports = {
  createInventory,
  updateInventory,
  getInventory
};
