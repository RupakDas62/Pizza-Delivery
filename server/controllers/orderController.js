const Order = require('../models/Order');
const AvailablePizza = require('../models/AvailablePizza');
const sendEmail = require('../utils/sendEmail');
// const  {deductIngredientsFromInventory}  = require("./inventoryController");
const updateInventory = require('../utils/updateInventory')

// @desc    Place a new order
// @route   POST /api/orders
// @access  Private
const placeOrder = async (req, res) => {
  // console.log("req reached for placing order");
  console.log(req.body);
  try {
    const { items, totalPrice, location } = req.body;
    console.log("Location is :- " + location)

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'No items to order.' });
    }

    if (!totalPrice || !location || !location.coordinates || !location.address) {
      return res.status(400).json({ message: 'Missing required order details.' });
    }

    // Prepare array of order items
    const orderItems = [];

    for (const item of items) {
      const { type, predefinedPizza, customPizza, quantity } = item;

      if (!type || !quantity || quantity <= 0) {
        return res.status(400).json({ message: 'Each item must include a type and quantity.' });
      }

      if (type === 'custom' && !customPizza?.base) {
        return res.status(400).json({ message: 'Custom pizza configuration is required.' });
      }

      if (type === 'predefined' && !predefinedPizza?.pizzaId) {
        return res.status(400).json({ message: 'Predefined pizzaId is required.' });
      }

      orderItems.push({
        type,
        predefinedPizza: type === 'predefined' ? predefinedPizza : undefined,
        customPizza: type === 'custom' ? customPizza : undefined,
        quantity
      });

      // Deduct inventory only for custom pizzas
      if (type === 'custom') {
        for (let i = 0; i < quantity; i++) {
          await updateInventory(customPizza);
        }
      }
    }

    const newOrder = new Order({
      user: req.user._id,
      items: orderItems,
      totalPrice,
      location,
      status: 'Pending',
      paymentStatus: 'Pending'
    });

    await newOrder.save();

    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (err) {
    console.error('Error placing order:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// @desc    Get orders for logged-in user
// @route   GET /api/orders/my
// @access  Private
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort('-createdAt');
    res.status(200).json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
  .populate("items.predefinedPizza.pizzaId") // 👈 this brings full pizza data
  .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateOrderStatusByAdmin = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const validStatuses = ['Received', 'In Kitchen', 'Sent to Delivery', 'Delivered'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value.' });
    }

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Order not found.' });

    order.status = status;
    await order.save();

    res.status(200).json({ message: 'Order status updated successfully.', status: order.status });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// @desc    Mark order as paid
// @route   PUT /api/orders/:orderId/pay
// @access  Private
const markOrderPaid = async (req, res) => {
  try {
    const { orderId } = req.params;
    console.log("Finding Order");
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.paymentStatus = 'Paid';
    order.paymentDetails = req.body.paymentDetails || {};
    await order.save();
    console.log("Order Payment marked");

    res.status(200).json({ message: 'Payment confirmed', order });
  } catch (err) {
    console.error('Error marking payment complete:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatusByAdmin,
  markOrderPaid 
};
