const Inventory = require("../models/Inventory");
const sendEmail = require("./sendEmail"); // reuse email utility
const User = require('../models/User');

const INVENTORY_THRESHOLD = process.env.INVENTORY_THRESHOLD || 3; // fallback value

const updateInventoryAfterOrder = async (customPizza) => {
  const inventory = await Inventory.findOne();
  const admin = await User.findOne({ role: 'admin' });

  // Reduce selected ingredients
  customPizza.veggies.forEach(v => {
    inventory.veggies.set(v, (inventory.veggies.get(v) || 0) - 1);
  });
  inventory.base.set(customPizza.base, (inventory.base.get(customPizza.base) || 0) - 1);
  inventory.sauce.set(customPizza.sauce, (inventory.sauce.get(customPizza.sauce) || 0) - 1);
  inventory.cheese.set(customPizza.cheese, (inventory.cheese.get(customPizza.cheese) || 0) - 1);
  customPizza.meat.forEach(m => {
    inventory.meat.set(m, (inventory.meat.get(m) || 0) - 1);
  });

  await inventory.save();

  // Check for low stock and notify
  const lowItems = [];

  // Check cheese
  for (let [key, value] of inventory.cheese.entries()) {
    if (value < INVENTORY_THRESHOLD) lowItems.push(`Cheese: ${key} (${value})`);
  }

  // Check base
  for (let [key, value] of inventory.base.entries()) {
    if (value < INVENTORY_THRESHOLD) lowItems.push(`Base: ${key} (${value})`);
  }

  // Check sauce
  for (let [key, value] of inventory.sauce.entries()) {
    if (value < INVENTORY_THRESHOLD) lowItems.push(`Sauce: ${key} (${value})`);
  }

  // Check veggies
  for (let [key, value] of inventory.veggies.entries()) {
    if (value < INVENTORY_THRESHOLD) {
      lowItems.push(`Veggie: ${key} (${value})`);
    } 
  }

  for (let [key, value] of inventory.meat.entries()) {
    if (value < INVENTORY_THRESHOLD) {
      lowItems.push(`Meat: ${key} (${value})`);
      console.log("Meat Pushed to low items : " + lowItems)
    }
  }

  // Send alert if any item is below threshold
  console.log("UpdateInventory.js" + typeof(admin.email))
  
  if (lowItems.length > 0) {
    await sendEmail({
      to: admin.email,
      subject: "⚠️ Inventory Alert",
      text: `The following items are below threshold:\n\n${lowItems.join("\n")}`
    });
  }
};

module.exports = updateInventoryAfterOrder;
