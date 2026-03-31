// server/controllers/deliveryAgentController.js
const DeliveryAgent = require("../models/deliveryAgent.js");
const Order = require("../models/order.js");

// Register new delivery agent
const registerAgent = async (req, res) => {
  try {
    const agent = new DeliveryAgent(req.body);
    await agent.save();
    res.status(201).json(agent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update agent location
const updateLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const { lng, lat } = req.body;
    const agent = await DeliveryAgent.findByIdAndUpdate(
      id,
      { currentLocation: { type: "Point", coordinates: [lng, lat] } },
      { new: true }
    );
    res.json(agent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mark agent availability
const updateAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const { isAvailable } = req.body;
    const agent = await DeliveryAgent.findByIdAndUpdate(
      id,
      { isAvailable },
      { new: true }
    );
    res.json(agent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Assign agent to an order
const assignOrder = async (req, res) => {
  try {
    const { orderId, agentId } = req.body;

    const order = await Order.findById(orderId);
    const agent = await DeliveryAgent.findById(agentId);

    if (!order || !agent) return res.status(404).json({ error: "Not found" });

    order.deliveryAgent = agent._id;
    agent.assignedOrders.push(order._id);
    agent.isAvailable = false;

    await order.save();
    await agent.save();

    res.json({ order, agent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  assignOrder,
  updateAvailability,
  updateLocation,
  registerAgent
};